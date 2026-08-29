"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { soundFx } from "@/lib/audioEngine";

const capabilities = [
  {
    title: "Cloud & DevOps",
    icon: "☁️",
    desc: "Infrastructure as Code, container orchestration, Linux systems, and automated CI/CD delivery pipelines.",
    tags: ["Docker", "Linux (Bash)", "AWS", "Git / GitHub Actions", "CI/CD", "Nginx"],
  },
  {
    title: "Full-Stack & Systems",
    icon: "⚡",
    desc: "Modern type-safe frontend web architectures paired with scalable backend APIs and performant database architectures.",
    tags: ["TypeScript", "React", "Next.js", "Python", "Tailwind CSS", "REST APIs", "Node.js"],
  },
  {
    title: "AI & Algorithms",
    icon: "🧠",
    desc: "Computer vision pipelines, prompt engineering automation, and discrete graph traversal optimization algorithms.",
    tags: ["Computer Vision", "Prompt Engineering", "Graph Algorithms", "Data Structures", "OpenCV", "Automation"],
  },
];

export default function TechStack() {
  return (
    <section id="skills" className="relative z-10 w-full px-6 py-28 md:px-12 max-w-[1360px] mx-auto border-t border-carbon/10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-3 block">
            Technical Stack · Capabilities
          </span>
          <h2 className="text-4xl md:text-6xl font-normal tracking-tight text-neutral-900 font-sans">
            Engineering Capabilities
          </h2>
        </div>
        <p className="mt-4 md:mt-0 max-w-md text-sm text-neutral-600 font-sans">
          Core technologies and architectural paradigms applied across cloud virtualization, backend engineering, and interactive web software.
        </p>
      </div>

      {/* Dark Obsidian Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {capabilities.map((item, index) => (
          <TechCard key={index} item={item} />
        ))}
      </div>
    </section>
  );
}

function TechCard({ item }: { item: any }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsHovered(true);
        soundFx.playHover();
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => soundFx.playClick()}
      className="relative overflow-hidden rounded-3xl bg-[#1A1918] p-8 text-[#F4EFEB] shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer group border border-white/10"
    >
      {/* Dynamic Mouse Spotlight Glow */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.08), transparent 80%)`,
          }}
        />
      )}

      {/* Icon Header */}
      <div className="relative z-10 w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center text-xl mb-6 shadow-md transition-transform duration-300 group-hover:scale-110">
        {item.icon}
      </div>

      {/* Title & Description */}
      <h3 className="relative z-10 text-2xl font-normal text-white mb-3 tracking-tight">
        {item.title}
      </h3>
      <p className="relative z-10 text-xs text-neutral-400 font-sans leading-relaxed mb-8">
        {item.desc}
      </p>

      {/* Divider */}
      <div className="relative z-10 w-full h-[1px] bg-white/10 mb-6" />

      {/* Pill Tags */}
      <div className="relative z-10 flex flex-wrap gap-2">
        {item.tags.map((tag: string, i: number) => (
          <span
            key={i}
            className="px-3 py-1 rounded-full text-[11px] font-mono bg-white/10 text-neutral-300 border border-white/10 transition-colors duration-300 group-hover:bg-white/20 group-hover:text-white"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
