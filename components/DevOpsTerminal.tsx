"use client";

import React, { useState, useRef, useEffect } from "react";
import { soundFx } from "@/lib/audioEngine";

type HistoryItem = {
  command: string;
  output: string | React.ReactNode;
};

const COMMANDS: Record<string, string> = {
  help: "Available commands: bio, skills, projects, architecture, contact, clear, sudo",
  bio: "Abhay Jangid: Cloud & DevOps Intern & BCA Scholar at JIET University. Specializing in Linux hosting, Docker containerization, and scalable architectures.",
  skills: "Core Stack: Docker, AWS (EC2/S3), Linux (Bash), Kubernetes, CI/CD, Terraform, TypeScript, React, Python.",
  projects: "Featured Deployments: EVOLV (Fitness Intelligence Engine), AI Ad Script Generator, Graph Route Optimizer.",
  architecture: "Topology: Local Dev -> GitHub Actions CI/CD -> Docker Multi-Stage -> Linux VPS Nginx Reverse Proxy.",
  contact: "Email: abhayjangid2929@gmail.com | Phone: +91 63779 81958 | Jodhpur, Rajasthan",
  sudo: "Access granted. Root privileges active. Hire Abhay immediately for maximum system reliability.",
};

export default function DevOpsTerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: "init-session",
      output: "Connected to abhay-cloud-cluster (x86_64-linux-gnu). Type 'help' for directory commands.",
    },
  ]);

  const terminalBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    soundFx.playClick();

    if (cmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    const output = COMMANDS[cmd] || `zsh: command not found: ${cmd}. Type 'help' for available commands.`;
    setHistory((prev) => [...prev, { command: input, output }]);
    setInput("");
  };

  return (
    <section id="terminal" className="relative z-10 w-full px-6 py-16 max-w-[1000px] mx-auto font-mono">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <span className="text-xs uppercase tracking-widest text-cyan-400 mb-1 block font-mono font-semibold">
            // System Telemetry
          </span>
          <h2 className="text-2xl md:text-4xl font-sans font-bold tracking-tight text-[#F8FAFC]">
            Interactive Control Center
          </h2>
        </div>
      </div>

      {/* Terminal Window with Cosmic Chrome & Top Active Display Line */}
      <div
        data-lenis-prevent
        className="rounded-2xl cosmic-glass shadow-2xl overflow-hidden flex flex-col h-[400px] border border-cyan-500/30 terminal-display-line relative"
      >
        {/* Subtle Non-Intrusive CRT Overlay */}
        <div className="crt-overlay absolute inset-0 opacity-15 pointer-events-none z-20" />

        {/* Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0A0E1A]/90 border-b border-slate-800/80 shrink-0 z-10">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-xs text-slate-400 font-mono">abhay@devops-node ~ zsh</span>
          </div>
          <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 shadow-glow-cyan">
            PROD-ENV // LIVE
          </span>
        </div>

        {/* Scrollable Terminal Body */}
        <div
          ref={terminalBodyRef}
          className="p-5 flex-1 overflow-y-auto text-xs md:text-sm text-slate-300 flex flex-col gap-3 bg-[#03040B]/85 z-10"
        >
          {history.map((item, idx) => (
            <div key={idx} className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                <span className="text-cyan-400">➜</span>
                <span className="text-slate-500">~</span>
                <span className="text-[#F8FAFC]">{item.command}</span>
              </div>
              <div className="text-slate-400 pl-5 leading-relaxed">{item.output}</div>
            </div>
          ))}
        </div>

        {/* Input Form with Cyan Prompt */}
        <form
          onSubmit={handleCommand}
          className="flex items-center gap-2 px-5 py-3 bg-[#0A0E1A]/95 border-t border-slate-800/80 shrink-0 z-10"
        >
          <span className="text-cyan-400 text-sm font-semibold">➜</span>
          <span className="text-slate-500 text-sm">~</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type 'help', 'skills', or 'projects'..."
            className="flex-1 bg-transparent text-[#F8FAFC] placeholder-slate-500 text-sm outline-none font-mono caret-cyan-400"
          />
          <button
            type="submit"
            className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-mono uppercase tracking-wider transition-all shadow-glow-cyan cursor-pointer"
          >
            Execute
          </button>
        </form>
      </div>
    </section>
  );
}
