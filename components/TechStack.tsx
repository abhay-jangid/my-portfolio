"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { soundFx } from "@/lib/audioEngine";
import { Cloud, Cpu, Sparkles, Terminal } from "lucide-react";

const capabilities = [
  {
    title: "Cloud & DevOps",
    badge: "INFRASTRUCTURE",
    icon: <Cloud className="w-6 h-6 text-cyan-400" />,
    iconRing: "bg-cyan-500/10 border-cyan-500/30 group-hover:border-cyan-400 group-hover:shadow-glow-cyan",
    desc: "Infrastructure as Code, container orchestration, Linux kernel environments, and automated CI/CD deployment pipelines.",
    status: "PROD DEPLOYED",
    statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    tagStyle: "bg-cyan-500/10 text-cyan-300 border-cyan-500/25 group-hover:border-cyan-400",
    tags: ["Docker", "Linux / Bash", "AWS EC2/S3", "GitHub Actions", "CI/CD", "Nginx", "Terraform"],
  },
  {
    title: "Full-Stack & Systems",
    badge: "DISTRIBUTED WEB",
    icon: <Cpu className="w-6 h-6 text-blue-400" />,
    iconRing: "bg-blue-500/10 border-blue-500/30 group-hover:border-blue-400 group-hover:shadow-glow-blue",
    desc: "High-throughput TypeScript architectures paired with reactive React/Next.js frontend systems and low-latency API layers.",
    status: "ACTIVE CLUSTER",
    statusColor: "text-blue-400 bg-blue-500/10 border-blue-500/30",
    tagStyle: "bg-blue-500/10 text-blue-300 border-blue-500/25 group-hover:border-blue-400",
    tags: ["TypeScript", "Next.js 14", "React", "Python", "Tailwind CSS", "REST APIs", "Node.js", "PostgreSQL"],
  },
  {
    title: "AI & Algorithms",
    badge: "INTELLIGENCE",
    icon: <Sparkles className="w-6 h-6 text-violet-400" />,
    iconRing: "bg-violet-500/10 border-violet-500/30 group-hover:border-violet-400 group-hover:shadow-glow-violet",
    desc: "Computer vision spatial engines, LLM prompt engineering automation, and discrete graph traversal shortest-path algorithms.",
    status: "EVALUATED 98.4%",
    statusColor: "text-violet-400 bg-violet-500/10 border-violet-500/30",
    tagStyle: "bg-violet-500/10 text-violet-300 border-violet-500/25 group-hover:border-violet-400",
    tags: ["Computer Vision", "OpenCV", "Graph Traversal", "Prompt Automation", "Data Structures", "PyTorch"],
  },
];

export default function TechStack() {
  return (
    <section
      id="skills"
      className="relative z-10 w-full px-6 py-24 md:py-28 md:px-12 max-w-7xl mx-auto section-frosted-glass rounded-[40px] my-12 border border-blue-500/20 shadow-2xl text-[#F8FAFC]"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-cyan-500/20 font-mono text-xs text-cyan-400 uppercase tracking-wider mb-4 font-semibold shadow-glow-cyan">
            <Terminal className="w-3.5 h-3.5" />
            <span>Telemetry · Architectural Capabilities</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#F8FAFC] font-sans">
            Engineering Systems
          </h2>
        </div>
        <p className="max-w-md text-sm text-slate-300 font-sans leading-relaxed">
          Core technologies and architectural paradigms applied across cloud virtualization, backend system reliability, and interactive computing.
        </p>
      </div>

      {/* Cosmic Glass Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {capabilities.map((item, index) => (
          <TechCard key={index} item={item} />
        ))}
      </div>
    </section>
  );
}

function TechCard({ item }: { item: typeof capabilities[0] }) {
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
      className="hardware-accelerated relative overflow-hidden rounded-3xl p-8 cosmic-glass text-[#F8FAFC] cursor-pointer group flex flex-col justify-between transition-all duration-300 border border-slate-800 hover:border-cyan-500/60 shadow-xl"
    >
      {/* Dynamic Subtle Spotlight Glow */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.15), transparent 75%)`,
          }}
        />
      )}

      <div>
        {/* Card Header Bar */}
        <div className="flex items-center justify-between mb-6 relative z-10">
          <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${item.iconRing}`}>
            {item.icon}
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-300 border border-cyan-500/30 px-2.5 py-1 rounded-full bg-slate-900/80 font-semibold shadow-xs">
            {item.badge}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="relative z-10 text-2xl font-bold text-[#F8FAFC] mb-3 tracking-tight group-hover:text-cyan-400 transition-colors">
          {item.title}
        </h3>
        <p className="relative z-10 text-xs text-slate-300 font-sans leading-relaxed mb-6">
          {item.desc}
        </p>
      </div>

      <div>
        {/* Status Telemetry Divider */}
        <div className="relative z-10 flex items-center justify-between border-t border-slate-800 pt-4 mb-4 font-mono text-[10px]">
          <span className="text-slate-400">OPERATIONAL STATUS</span>
          <span className={`font-semibold flex items-center gap-1.5 px-2 py-0.5 rounded-full border ${item.statusColor}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
            {item.status}
          </span>
        </div>

        {/* Monospace Pill Tags */}
        <div className="relative z-10 flex flex-wrap gap-2">
          {item.tags.map((tag: string, i: number) => (
            <span
              key={i}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono border transition-colors duration-200 ${item.tagStyle}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
