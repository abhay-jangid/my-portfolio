"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle2, Cpu, Cloud } from "lucide-react";

export default function SystemStatusBar() {
  const [latency, setLatency] = useState(21);
  const [fps, setFps] = useState(60);

  // Dynamic realistic telemetry simulation for latency and engine metrics
  useEffect(() => {
    const pingInterval = setInterval(() => {
      // Small random jitter between 16ms and 24ms
      setLatency(Math.floor(Math.random() * 9) + 16);
    }, 2500);

    // Frame rate monitor
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const calculateFps = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(Math.min(frameCount, 144));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(calculateFps);
    };

    animId = requestAnimationFrame(calculateFps);

    return () => {
      clearInterval(pingInterval);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <aside
      aria-label="Live System Telemetry Status Bar"
      className="hardware-accelerated sticky top-0 z-[60] w-full border-b border-stone-200/80 bg-[#F7F6F2]/95 px-4 py-1.5 backdrop-blur-md transition-all select-none"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between font-mono text-[10px] md:text-[11px] text-stone-600">
        {/* Left Telemetry: Cluster Region & System Health */}
        <div className="flex items-center gap-4 md:gap-6 overflow-hidden">
          {/* Live Cluster Region */}
          <div className="flex items-center gap-1.5 text-stone-700">
            <Cloud className="h-3 w-3 text-blue-600" />
            <span className="text-stone-400 hidden sm:inline">REGION:</span>
            <span className="font-semibold text-stone-900">us-east-1</span>
            <span className="rounded bg-blue-50 px-1.5 py-0.2 text-[9px] text-blue-600 border border-blue-200 hidden sm:inline font-semibold">
              AWS EC2
            </span>
          </div>

          {/* System Uptime & Health */}
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-medium text-emerald-600 font-semibold">99.99% UPTIME</span>
            <span className="text-stone-400 hidden md:inline">— Optimal</span>
          </div>

          {/* CI/CD Build Status */}
          <div className="hidden lg:flex items-center gap-1.5 border-l border-stone-200 pl-4 text-stone-600">
            <svg
              className="h-3 w-3 text-purple-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="6" y1="3" x2="6" y2="15" />
              <circle cx="18" cy="6" r="3" />
              <circle cx="6" cy="18" r="3" />
              <path d="M18 9a9 9 0 0 1-9 9" />
            </svg>
            <span>PIPELINE</span>
            <span className="text-stone-900 font-medium">#404</span>
            <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 text-[9px] font-semibold">
              <CheckCircle2 className="h-2.5 w-2.5 text-emerald-600" />
              <span>PASSED [main]</span>
            </span>
          </div>
        </div>

        {/* Right Telemetry: Latency, FPS Engine & Protocol */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Frame Rate Engine */}
          <div className="hidden sm:flex items-center gap-1.5 text-stone-600">
            <Cpu className="h-3 w-3 text-blue-600" />
            <span className="text-stone-400">ENGINE:</span>
            <span className="text-stone-800 font-semibold">{fps} FPS</span>
          </div>

          {/* Network Latency Indicator */}
          <div className="flex items-center gap-1.5 text-stone-700">
            <svg
              className="h-3 w-3 text-blue-600 animate-pulse"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12.55a11 11 0 0 1 14.08 0" />
              <path d="M1.42 9a16 16 0 0 1 21.16 0" />
              <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
              <line x1="12" y1="20" x2="12.01" y2="20" />
            </svg>
            <span className="text-stone-400 hidden sm:inline">RTT:</span>
            <span
              className={`font-semibold ${
                latency < 22 ? "text-emerald-600" : "text-blue-600"
              }`}
            >
              {latency}ms
            </span>
          </div>

          {/* Security Protocol Badge */}
          <div className="hidden md:flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[9px] text-stone-600 border border-stone-200 shadow-xs">
            <CheckCircle2 className="h-2.5 w-2.5 text-emerald-600" />
            <span>TLS 1.3 / HTTP/3</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
