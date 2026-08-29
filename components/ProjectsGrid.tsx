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
import LeavesBackground from "@/components/LeavesBackground";
import projectsData from "@/data/projects.json";

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
      className="relative z-10 w-full px-6 py-28 md:px-12 max-w-[1360px] mx-auto overflow-visible"
    >
      {/* 3D Interactive Falling Leaves Background */}
      <LeavesBackground />

      {/* Title & Filter Matrix */}
      <div className="relative z-10 flex flex-col items-center text-center mb-20 md:mb-28">
        <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-3">
          Curated Works · 2024–2026
        </span>
        <h2 className="text-4xl md:text-7xl font-normal tracking-tight text-neutral-900 font-sans mb-10">
          Selected Projects
        </h2>

        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.label;
            return (
              <button
                key={cat.label}
                data-cursor="Filter"
                onClick={() => {
                  soundFx.playClick();
                  setActiveCategory(cat.label);
                }}
                onMouseEnter={() => soundFx.playHover()}
                className={`relative px-4 py-1.5 rounded-full text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-[#1A1918] text-[#F4EFEB]"
                    : "bg-neutral-200/70 text-neutral-700 hover:bg-neutral-300/80"
                }`}
              >
                <span>{cat.label}</span>
                <sup className="ml-1 text-[9px] opacity-75">{cat.count}</sup>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dual Column Spacetime Stage */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-18 items-start">
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
  project: any;
  index: number;
  isRightCol: boolean;
  mouseNorm: { x: number; y: number };
  smoothVelocity: any;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Measure card's normalized travel across the viewport (0 = enter bottom, 1 = exit top)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // 1. HYPERBOLIC CATENARY Z-DEPTH (Center is flush at 0, top plunges to -520px)
  const translateZ = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    [-60, 20, -180, -520]
  );

  // 2. HORIZON PITCH (Tilts forward entering, rolls back departing)
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    [-8, 0, 16, 36]
  );

  // 3. SCALE CONTRACTION
  const scale = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    [0.96, 1, 0.94, 0.82]
  );

  // 4. VELOCITY TORSION (Aerodynamic banking on fast scrolls)
  const torsionAngle = isRightCol ? 4.5 : -4.5;
  const rotateZ = useTransform(
    smoothVelocity,
    [-2500, 0, 2500],
    [-torsionAngle, 0, torsionAngle]
  );

  // 5. GYROSCOPIC MAGNETIC YAW (Follows mouse cursor with spring damping)
  const mouseInfluence = isRightCol ? mouseNorm.x - 0.25 : mouseNorm.x + 0.25;
  const targetYaw = mouseInfluence * 9.0;
  const yawMv = useMotionValue(targetYaw);
  const springYaw = useSpring(yawMv, { damping: 30, stiffness: 220 });

  useEffect(() => {
    yawMv.set(targetYaw);
  }, [targetYaw, yawMv]);

  // 6. SYNTHETIC OPTICAL DEPTH-OF-FIELD (Defocus blur + falloff shadow at distance)
  const blurAmount = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    ["blur(0px)", "blur(0px)", "blur(1.5px)", "blur(6px)"]
  );

  const depthShadow = useTransform(
    scrollYProgress,
    [0.35, 0.65, 1],
    [0, 0.18, 0.48]
  );

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
        data-cursor="Explore"
        className="group flex flex-col cursor-pointer will-change-transform"
      >
        {/* Crisp Frame with Ambient Occlusion */}
        <div className="relative w-full aspect-[16/11] overflow-hidden rounded-2xl bg-neutral-200 shadow-xl transition-shadow duration-500 group-hover:shadow-2xl">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />

          {/* Depth of field shadow falloff */}
          <motion.div
            style={{ opacity: depthShadow }}
            className="pointer-events-none absolute inset-0 bg-neutral-950 transition-opacity duration-300"
          />

          {/* Subtle cursor reflection glint */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Editorial Metadata */}
        <div className="mt-5 flex items-start justify-between">
          <div>
            <h3 className="text-xl md:text-2xl font-normal text-neutral-900 group-hover:underline tracking-tight">
              {project.title}
            </h3>
            <p className="mt-1 text-xs text-neutral-500 font-sans">
              {project.tags ? project.tags.join(" · ") : project.category}
            </p>
          </div>
          <span className="text-2xl text-neutral-500 font-light transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1">
            ↘
          </span>
        </div>
      </motion.article>
    </div>
  );
}
