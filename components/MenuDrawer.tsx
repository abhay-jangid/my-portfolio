"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundFx } from "@/lib/audioEngine";
import { X, ArrowUpRight, Github, Linkedin, Mail, Phone, MapPin } from "lucide-react";

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
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop",
  },
  {
    num: "02",
    label: "Technical Skills",
    href: "#skills",
    tagline: "Cloud, DevOps, Full-Stack & AI Stack",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600&auto=format&fit=crop",
  },
  {
    num: "03",
    label: "About",
    href: "#about",
    tagline: "Background, Philosophy & Education",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop",
  },
  {
    num: "04",
    label: "Contact",
    href: "#contact",
    tagline: "Inquiries, Collaborations & Direct Lines",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1600&auto=format&fit=crop",
  },
];

export default function MenuDrawer({ isOpen, onClose }: MenuDrawerProps) {
  const [activePreview, setActivePreview] = useState(MENU_ROUTES[0].image);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setCurrentTime(timeStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLinkClick = (href: string) => {
    soundFx.playClick();
    onClose();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="menu-drawer-backdrop"
          initial={{ clipPath: "inset(0% 0% 0% 100%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 0% 100%)" }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[80] bg-sand flex flex-col justify-between p-6 md:p-12 overflow-y-auto"
        >
          {/* Top Header Bar with Close Trigger */}
          <header className="flex items-center justify-between border-b border-carbon/10 pb-6">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-coral animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-carbon font-semibold">
                Abhay Jangid — Navigation Index
              </span>
            </div>

            <button
              type="button"
              data-cursor="Close"
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              onMouseEnter={() => soundFx.playHover()}
              className="group flex items-center gap-2 px-4 py-2 rounded-full border border-carbon/20 hover:border-carbon hover:bg-carbon hover:text-sand transition-all duration-200 cursor-pointer font-mono text-xs uppercase"
            >
              <span>Close</span>
              <X className="w-4 h-4 transition-transform duration-200 group-hover:rotate-90" />
            </button>
          </header>

          {/* Center Stage: Navigation Route Matrix & Thumbnail Viewport */}
          <div className="my-auto py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Navigation Routes (Left Column) */}
            <nav className="lg:col-span-7 flex flex-col gap-4 md:gap-6">
              {MENU_ROUTES.map((route) => (
                <a
                  key={route.num}
                  href={route.href}
                  data-cursor="Select"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(route.href);
                  }}
                  onMouseEnter={() => {
                    soundFx.playHover();
                    setActivePreview(route.image);
                  }}
                  className="group flex items-baseline gap-4 md:gap-8 text-carbon hover:text-coral transition-colors duration-300 py-2 border-b border-carbon/5"
                >
                  <span className="font-mono text-sm md:text-base text-neutral-400 group-hover:text-coral transition-colors duration-300">
                    {route.num}
                  </span>
                  <div className="flex flex-col">
                    <span className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight transition-transform duration-300 group-hover:translate-x-4 group-hover:italic leading-none">
                      {route.label}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {route.tagline}
                    </span>
                  </div>
                </a>
              ))}
            </nav>

            {/* Live Thumbnail Viewport (Right Column - Desktop) */}
            <div className="hidden lg:flex lg:col-span-5 flex-col items-center justify-center">
              <div className="relative w-full aspect-[16/11] overflow-hidden rounded-2xl bg-neutral-200 border-2 border-carbon/10 shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activePreview}
                    src={activePreview}
                    alt="Menu Preview"
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full w-full object-cover"
                  />
                </AnimatePresence>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-carbon/30 to-transparent" />
                <div className="absolute bottom-4 left-4 font-mono text-[11px] uppercase tracking-widest text-white/90 bg-carbon/60 backdrop-blur-md px-3 py-1 rounded-full">
                  Live Viewport Preview
                </div>
              </div>
            </div>
          </div>

          {/* Footer Metadata & Direct Contacts */}
          <footer className="border-t border-carbon/10 pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-xs text-neutral-600">
            <div>
              <span className="block text-[10px] text-neutral-400 uppercase tracking-widest mb-1">
                Studio Location
              </span>
              <div className="flex items-center gap-1.5 text-carbon">
                <MapPin className="w-3.5 h-3.5 text-coral" />
                <span>Jodhpur, Rajasthan, India</span>
              </div>
            </div>

            <div>
              <span className="block text-[10px] text-neutral-400 uppercase tracking-widest mb-1">
                Live Studio Time
              </span>
              <span className="font-semibold text-carbon">
                {currentTime || "18:00:00"} IST (GMT+5:30)
              </span>
            </div>

            <div>
              <span className="block text-[10px] text-neutral-400 uppercase tracking-widest mb-1">
                Direct Contact
              </span>
              <a
                href="mailto:abhayjangid2929@gmail.com"
                className="hover:text-coral transition-colors flex items-center gap-1 text-carbon"
              >
                <Mail className="w-3.5 h-3.5 text-coral" />
                <span>abhayjangid2929@gmail.com</span>
              </a>
            </div>

            <div className="flex items-center gap-4 sm:justify-end">
              <a
                href="https://github.com/abhay-jangid"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => soundFx.playHover()}
                className="p-2 rounded-full border border-carbon/20 hover:border-carbon text-carbon hover:bg-carbon hover:text-sand transition-all"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/abhay-jangid-046305396/"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => soundFx.playHover()}
                className="p-2 rounded-full border border-carbon/20 hover:border-carbon text-carbon hover:bg-carbon hover:text-sand transition-all"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
