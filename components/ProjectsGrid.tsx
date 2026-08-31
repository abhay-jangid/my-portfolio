"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useVelocity,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import { soundFx } from "@/lib/audioEngine";
import projectsData from "@/data/projects.json";

// Category Accent Helper
function getCategoryTagStyle(category: string) {
  switch (category) {
    case "AI & ML":
      return "bg-violet-500/15 text-violet-300 border-violet-500/30";
    case "Algorithms":
      return "bg-cyan-500/15 text-cyan-300 border-cyan-500/30";
    case "Cloud & DevOps":
    case "Systems":
      return "bg-blue-500/15 text-blue-300 border-blue-500/30";
    case "Full-Stack":
      return "bg-sky-500/15 text-sky-300 border-sky-500/30";
    default:
      return "bg-amber-500/15 text-amber-300 border-amber-500/30";
  }
}

export default function ProjectsGrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [mouseNorm, setMouseNorm] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Global mouse tracking for gyroscopic field effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setMouseNorm({
        x: (e.clientX / innerWidth) * 2 - 1,
        y: (e.clientY / innerHeight) * 2 - 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const categories = [
    { label: "All", count: projectsData.length },
    { label: "AI & ML", count: projectsData.filter((p) => p.category === "AI & ML").length },
    { label: "Algorithms", count: projectsData.filter((p) => p.category === "Algorithms").length },
    { label: "Systems", count: projectsData.filter((p) => p.category === "Systems").length },
    { label: "Full-Stack", count: projectsData.filter((p) => p.category === "Full-Stack").length },
    { label: "Cloud & DevOps", count: projectsData.filter((p) => p.category === "Cloud & DevOps").length },
  ];

  const filtered =
    activeCategory === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === activeCategory);

  const leftCol = filtered.filter((_, i) => i % 2 === 0);
  const rightCol = filtered.filter((_, i) => i % 2 === 1);

  // Scroll velocity for aerodynamic roll torsion
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 45, stiffness: 350 });

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative z-10 w-full px-6 py-28 md:px-12 max-w-[1360px] mx-auto overflow-visible section-frosted-glass rounded-[40px] my-12 border border-blue-500/20 shadow-2xl"
    >
      {/* Faint 4% Radial Nebula Bloom anchored behind card stack */}
      <div className="pointer-events-none absolute inset-0 rounded-[40px] overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-tr from-cyan-500/10 via-blue-500/10 to-emerald-500/10 rounded-full blur-[140px]" />
      </div>

      {/* Title & Filter Matrix */}
      <div className="relative z-10 flex flex-col items-center text-center mb-20 md:mb-28">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 font-mono text-xs text-cyan-400 uppercase tracking-wider mb-4 font-semibold shadow-glow-cyan">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>// Deployment Registry · 2024–2026</span>
        </div>
        <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-[#F8FAFC] font-sans mb-8">
          Featured Deployments
        </h2>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.label;
            return (
              <button
                key={cat.label}
                type="button"
                data-cursor="Filter"
                onClick={() => {
                  soundFx.playClick();
                  setActiveCategory(cat.label);
                }}
                onMouseEnter={() => soundFx.playHover()}
                className={`relative px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer border ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 border-transparent text-white shadow-glow-cyan"
                    : "bg-[#0F172A]/80 border-slate-700/80 text-slate-300 hover:bg-[#1E293B] hover:text-white hover:border-cyan-500/40 shadow-xs"
                }`}
              >
                <span>{cat.label}</span>
                <sup className="ml-1 text-[9px] opacity-80 font-mono">{cat.count}</sup>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dual Column 3D Spacetime Stage */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-18 items-start group/grid">
        {/* Left Column Track */}
        <div className="flex flex-col gap-16 md:gap-24">
          <AnimatePresence mode="popLayout">
            {leftCol.map((project, i) => (
              <SpacetimeCard
                key={project.id}
                project={project}
                index={i}
                isRightCol={false}
                mouseNorm={mouseNorm}
                smoothVelocity={smoothVelocity}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Right Column Track (offset for editorial asymmetry) */}
        <div className="flex flex-col gap-16 md:gap-24 md:pt-32">
          <AnimatePresence mode="popLayout">
            {rightCol.map((project, i) => (
              <SpacetimeCard
                key={project.id}
                project={project}
                index={i}
                isRightCol={true}
                mouseNorm={mouseNorm}
                smoothVelocity={smoothVelocity}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function SpacetimeCard({
  project,
  isRightCol,
  mouseNorm,
  smoothVelocity,
}: {
  project: {
    id: string;
    title: string;
    description?: string;
    category: string;
    tags?: string[];
    image?: string;
  };
  index: number;
  isRightCol: boolean;
  mouseNorm: { x: number; y: number };
  smoothVelocity: unknown;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Measure card's normalized travel across the viewport
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const translateZ = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    [-60, 20, -180, -520]
  );

  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    [-8, 0, 16, 36]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    [0.96, 1, 0.94, 0.82]
  );

  const torsionAngle = isRightCol ? 4.5 : -4.5;
  const rotateZ = useTransform(
    smoothVelocity as ReturnType<typeof useSpring>,
    [-2500, 0, 2500],
    [-torsionAngle, 0, torsionAngle]
  );

  const mouseInfluence = isRightCol ? mouseNorm.x - 0.25 : mouseNorm.x + 0.25;
  const targetYaw = mouseInfluence * 9.0;
  const yawMv = useMotionValue(targetYaw);
  const springYaw = useSpring(yawMv, { damping: 30, stiffness: 220 });

  useEffect(() => {
    yawMv.set(targetYaw);
  }, [targetYaw, yawMv]);

  const blurAmount = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    ["blur(0px)", "blur(0px)", "blur(1.5px)", "blur(6px)"]
  );

  const tagStyle = getCategoryTagStyle(project.category);

  return (
    <div
      ref={cardRef}
      className="w-full select-none"
      style={{ perspective: "1100px", perspectiveOrigin: "50% 30%" }}
    >
      <motion.article
        style={{
          translateZ,
          rotateX,
          rotateY: springYaw,
          rotateZ,
          scale,
          filter: blurAmount,
          transformOrigin: "50% 100%",
          transformStyle: "preserve-3d",
        }}
        transition={{ duration: 0.15 }}
        onMouseEnter={() => soundFx.playHover()}
        onClick={() => soundFx.playClick()}
        data-cursor="Inspect"
        className="hardware-accelerated group relative rounded-3xl p-6 md:p-8 cosmic-glass group-hover/grid:opacity-30 hover:!opacity-100 flex flex-col justify-between cursor-pointer transition-all duration-300 z-10 hover:z-30 border border-slate-800 hover:border-cyan-500/60 shadow-xl"
      >
        <div>
          {/* Image Preview Container */}
          {project.image && (
            <div className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 mb-6 shadow-inner">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider bg-slate-900/90 backdrop-blur-md text-cyan-400 px-2.5 py-1 rounded-md border border-cyan-500/30 shadow-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  DEPLOYED
                </span>
                <span className={`font-mono text-[10px] font-semibold px-2.5 py-1 rounded-md border backdrop-blur-md ${tagStyle}`}>
                  {project.category}
                </span>
              </div>
            </div>
          )}

          {/* Card Header & Content */}
          <div className="flex items-center justify-between mb-3">
            <span className={`px-3 py-1 rounded-full text-xs font-mono font-semibold border ${tagStyle}`}>
              {project.category}
            </span>
            <span className="text-2xl text-slate-400 font-light transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-cyan-400">
              ↗
            </span>
          </div>

          <h3 className="text-2xl font-bold text-[#F8FAFC] mb-2 group-hover:text-cyan-400 transition-colors tracking-tight">
            {project.title}
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed mb-6 font-normal">
            {project.description ||
              "Engineered cloud architectures, optimized low-latency runtime services, and containerized microservices."}
          </p>
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800/80">
          {(project.tags || [project.category]).map((t: string, i: number) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#1E293B]/70 text-slate-300 border border-slate-700 font-medium transition-colors duration-200 group-hover:border-cyan-500/40 group-hover:text-cyan-300"
            >
              {t}
            </span>
          ))}
        </div>
      </motion.article>
    </div>
  );
}
