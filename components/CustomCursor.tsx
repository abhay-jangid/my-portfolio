"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export default function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const [label, setLabel] = useState<string | null>(null);
  const [coarsePointer, setCoarsePointer] = useState(true);

  useEffect(() => {
    setCoarsePointer(window.matchMedia("(pointer: coarse)").matches);

    const handleMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = (e.target as HTMLElement)?.closest<HTMLElement>("[data-cursor]");
      setLabel(target?.dataset.cursor ?? null);
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, [x, y]);

  if (coarsePointer || reduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="hardware-accelerated pointer-events-none fixed left-0 top-0 z-[70] flex items-center justify-center rounded-full"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: label ? 104 : 10,
        height: label ? 36 : 10,
      }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className={`absolute inset-0 ${
          label
            ? "rounded-full bg-stone-900 text-white border border-blue-500/50 shadow-xl backdrop-blur-md"
            : "rounded-full bg-blue-600 shadow-md"
        }`}
      />
      {label && (
        <motion.span
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.15 }}
          className="relative text-[10px] font-mono font-semibold uppercase tracking-wider text-white px-3 text-center flex items-center gap-1.5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {label}
        </motion.span>
      )}
    </motion.div>
  );
}
