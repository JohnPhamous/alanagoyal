"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Sidebar from "@/components/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Separator } from "./ui/separator";

interface ResizableLayoutProps {
  children: React.ReactNode;
  data: any;
}

export default function ResizableLayout({
  children,
  data,
}: ResizableLayoutProps) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Effect to handle mobile view
  useEffect(() => {
    const handleResize = () => {
      const currentIsMobile = window.innerWidth <= 768;
      setIsMobile(currentIsMobile);
    };

    // Set initial state based on window size
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="bg-[#1c1c1c] text-white min-h-screen">
      <ResizablePanelGroup direction="horizontal" className="flex min-h-screen">
        {isMobile ? (
          <div className="w-1/5"> 
            {data && <Sidebar notes={data} isMobile={isMobile} />}
          </div>
        ) : (
          <>
            <ResizablePanel
              defaultSize={25}
              minSize={20}
              maxSize={50}
            >
              {data && <Sidebar notes={data} isMobile={isMobile} />}
            </ResizablePanel>
            <ResizableHandle className="bg-gray-500" />
          </>
        )}
        <ResizablePanel defaultSize={70}>
          {children}
          <Toaster />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
