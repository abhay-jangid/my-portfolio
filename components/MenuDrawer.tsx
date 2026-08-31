"use client";

import React, { useEffect } from "react";
import { soundFx } from "@/lib/audioEngine";

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const MENU_ROUTES = [
  {
    num: "01",
    label: "Projects",
    href: "#projects",
    tagline: "Flagship Software & AI Systems",
  },
  {
    num: "02",
    label: "Technical Skills",
    href: "#skills",
    tagline: "Cloud, DevOps, Full-Stack & AI Stack",
  },
  {
    num: "03",
    label: "Cloud Architecture",
    href: "#architecture",
    tagline: "Interactive Topology & Container Matrix",
  },
  {
    num: "04",
    label: "DevOps Terminal",
    href: "#terminal",
    tagline: "Interactive Shell & Command Center",
  },
  {
    num: "05",
    label: "About Profile",
    href: "#about",
    tagline: "Background, Philosophy & Education",
  },
  {
    num: "06",
    label: "Direct Contact",
    href: "#contact",
    tagline: "Inquiries, Collaborations & Direct Lines",
  },
];

export default function MenuDrawer({ isOpen, onClose }: MenuDrawerProps) {
  // ESC key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#03040B]/80 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 md:p-16 overflow-y-auto animate-fadeIn select-none">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-6 shrink-0 cosmic-glass px-6 py-4 rounded-2xl">
        <span className="text-xs uppercase font-mono tracking-widest text-cyan-400 font-semibold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-glow-cyan" />
          <span>// Mission Control · Systems Index</span>
        </span>
        <button
          type="button"
          onClick={() => {
            soundFx.playClick();
            onClose();
          }}
          onMouseEnter={() => soundFx.playHover()}
          className="px-4 py-2 rounded-lg bg-[#131B2E] hover:bg-cyan-600 hover:text-white text-slate-300 text-xs font-mono uppercase tracking-wider transition-all border border-slate-700 shadow-sm cursor-pointer"
        >
          Close [Esc]
        </button>
      </div>

      {/* Grid of Navigation Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-auto py-10 max-w-6xl w-full mx-auto">
        {MENU_ROUTES.map((route) => (
          <a
            key={route.num}
            href={route.href}
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            onMouseEnter={() => soundFx.playHover()}
            className="group p-6 md:p-8 rounded-2xl cosmic-glass border-slate-800 hover:border-cyan-500/80 transition-all shadow-lg hover:shadow-glow-cyan flex flex-col justify-between cursor-pointer"
          >
            <div>
              <span className="text-xs font-mono text-cyan-400 mb-2 block font-semibold">
                {route.num}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC] group-hover:text-cyan-400 transition-colors tracking-tight">
                {route.label}
              </h2>
            </div>
            <p className="text-xs font-mono text-slate-400 mt-4 leading-relaxed">
              {route.tagline}
            </p>
          </a>
        ))}
      </div>

      {/* Footer Info */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-800/80 pt-6 shrink-0 text-xs font-mono text-slate-400 gap-2">
        <span>JIET University, Jodhpur · Cloud & DevOps Engineer</span>
        <span className="text-cyan-400">abhayjangid2929@gmail.com</span>
      </div>
    </div>
  );
}
