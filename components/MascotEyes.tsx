"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

interface MascotEyesProps {
  isHeartEyes?: boolean;
  isSquinting?: boolean;
  className?: string;
}

export default function MascotEyes({
  isHeartEyes = false,
  isSquinting = false,
  className = "",
}: MascotEyesProps) {
  const leftSocketRef = useRef<HTMLDivElement>(null);
  const rightSocketRef = useRef<HTMLDivElement>(null);

  // Left eye pupil motion values
  const leftX = useMotionValue(0);
  const leftY = useMotionValue(0);
  const leftSpringX = useSpring(leftX, { stiffness: 420, damping: 26, mass: 0.35 });
  const leftSpringY = useSpring(leftY, { stiffness: 420, damping: 26, mass: 0.35 });

  // Right eye pupil motion values
  const rightX = useMotionValue(0);
  const rightY = useMotionValue(0);
  const rightSpringX = useSpring(rightX, { stiffness: 420, damping: 26, mass: 0.35 });
  const rightSpringY = useSpring(rightY, { stiffness: 420, damping: 26, mass: 0.35 });

  // Blinking state machine
  const [isBlinking, setIsBlinking] = useState(false);

  // Autonomous natural blinking & idle gaze saccades
  useEffect(() => {
    let blinkTimer: NodeJS.Timeout;
    let saccadeTimer: NodeJS.Timeout;
    let lastMouseMove = Date.now();

    const triggerBlink = () => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
      }, 120);

      const nextInterval = Math.random() * 3000 + 2600;
      blinkTimer = setTimeout(triggerBlink, nextInterval);
    };

    const triggerSaccade = () => {
      // If user hasn't moved mouse in 2.5s, create subtle natural eye wandering
      if (Date.now() - lastMouseMove > 2500) {
        const randX = (Math.random() - 0.5) * 6;
        const randY = (Math.random() - 0.5) * 5;
        leftX.set(randX);
        leftY.set(randY);
        rightX.set(randX);
        rightY.set(randY);
      }
      saccadeTimer = setTimeout(triggerSaccade, Math.random() * 2000 + 1500);
    };

    blinkTimer = setTimeout(triggerBlink, 2800);
    saccadeTimer = setTimeout(triggerSaccade, 3500);

    const handlePointerMove = (e: PointerEvent) => {
      lastMouseMove = Date.now();
      const px = e.clientX;
      const py = e.clientY;

      // Track left eye
      if (leftSocketRef.current) {
        const rect = leftSocketRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = px - cx;
        const dy = py - cy;
        const theta = Math.atan2(dy, dx);
        const dist = Math.sqrt(dx * dx + dy * dy);
        const clampedDistX = Math.min(dist * 0.05, 11);
        const clampedDistY = Math.min(dist * 0.05, 14);
        leftX.set(Math.cos(theta) * clampedDistX);
        leftY.set(Math.sin(theta) * clampedDistY);
      }

      // Track right eye
      if (rightSocketRef.current) {
        const rect = rightSocketRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = px - cx;
        const dy = py - cy;
        const theta = Math.atan2(dy, dx);
        const dist = Math.sqrt(dx * dx + dy * dy);
        const clampedDistX = Math.min(dist * 0.05, 11);
        const clampedDistY = Math.min(dist * 0.05, 14);
        rightX.set(Math.cos(theta) * clampedDistX);
        rightY.set(Math.sin(theta) * clampedDistY);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      clearTimeout(blinkTimer);
      clearTimeout(saccadeTimer);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [leftX, leftY, rightX, rightY]);

  const upperEyelidHeight = isBlinking
    ? "100%"
    : isSquinting
    ? "50%"
    : "0%";

  const lowerEyelidHeight = isBlinking
    ? "100%"
    : isSquinting
    ? "30%"
    : "0%";

  return (
    <div
      className={`inline-flex items-center justify-center gap-4 sm:gap-6 select-none ${className}`}
      aria-label="Unseen Studio Interactive Eyes"
    >
      {/* Left Eye Oval */}
      <div
        ref={leftSocketRef}
        className="hardware-accelerated relative w-14 h-20 sm:w-16 sm:h-22 md:w-18 md:h-26 rounded-[50%] bg-gradient-to-b from-[#FFFDF8] via-[#FFF6F6] to-[#FCE7F3] border-2 border-[#1E293B] shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_-4px_8px_rgba(244,114,182,0.25)] overflow-hidden flex items-center justify-center"
      >
        {/* Upper Eyelid (Dark Space Skin Tone) */}
        <motion.div
          className="hardware-accelerated absolute top-0 inset-x-0 bg-[#020617] border-b-2 border-[#1E293B] z-20"
          initial={false}
          animate={{ height: upperEyelidHeight }}
          transition={{
            duration: isBlinking ? 0.08 : 0.22,
            ease: [0.16, 1, 0.3, 1],
          }}
        />

        {/* Lower Eyelid (Dark Space Skin Tone) */}
        <motion.div
          className="hardware-accelerated absolute bottom-0 inset-x-0 bg-[#020617] border-t-2 border-[#1E293B] z-20"
          initial={false}
          animate={{ height: lowerEyelidHeight }}
          transition={{
            duration: isBlinking ? 0.08 : 0.22,
            ease: [0.16, 1, 0.3, 1],
          }}
        />

        {/* Left Pupil */}
        <motion.div
          className="hardware-accelerated relative z-10 flex items-center justify-center"
          style={{ x: leftSpringX, y: leftSpringY }}
        >
          <AnimatePresence mode="wait">
            {isHeartEyes ? (
              <motion.div
                key="heart-left"
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1.25, rotate: 0 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                className="text-pink-500 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]"
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </motion.div>
            ) : (
              <motion.div
                key="pupil-left"
                initial={{ scale: 0.6 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.15 }}
                className="w-7 h-10 sm:w-8 sm:h-11 md:w-9 md:h-13 bg-[#0F172A] rounded-[50%] relative shadow-md flex items-center justify-center border border-[#1E293B]/40"
              >
                {/* Primary Specular Glint */}
                <div className="absolute top-1.5 right-1.5 w-2.5 h-3.5 bg-white rounded-full opacity-95 -rotate-12" />
                {/* Secondary Micro Reflection */}
                <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-white/70 rounded-full" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Right Eye Oval */}
      <div
        ref={rightSocketRef}
        className="hardware-accelerated relative w-14 h-20 sm:w-16 sm:h-22 md:w-18 md:h-26 rounded-[50%] bg-gradient-to-b from-[#FFFDF8] via-[#FFF6F6] to-[#FCE7F3] border-2 border-[#1E293B] shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_-4px_8px_rgba(244,114,182,0.25)] overflow-hidden flex items-center justify-center"
      >
        {/* Upper Eyelid (Dark Space Skin Tone) */}
        <motion.div
          className="hardware-accelerated absolute top-0 inset-x-0 bg-[#020617] border-b-2 border-[#1E293B] z-20"
          initial={false}
          animate={{ height: upperEyelidHeight }}
          transition={{
            duration: isBlinking ? 0.08 : 0.22,
            ease: [0.16, 1, 0.3, 1],
          }}
        />

        {/* Lower Eyelid (Dark Space Skin Tone) */}
        <motion.div
          className="hardware-accelerated absolute bottom-0 inset-x-0 bg-[#020617] border-t-2 border-[#1E293B] z-20"
          initial={false}
          animate={{ height: lowerEyelidHeight }}
          transition={{
            duration: isBlinking ? 0.08 : 0.22,
            ease: [0.16, 1, 0.3, 1],
          }}
        />

        {/* Right Pupil */}
        <motion.div
          className="hardware-accelerated relative z-10 flex items-center justify-center"
          style={{ x: rightSpringX, y: rightSpringY }}
        >
          <AnimatePresence mode="wait">
            {isHeartEyes ? (
              <motion.div
                key="heart-right"
                initial={{ scale: 0, rotate: 20 }}
                animate={{ scale: 1.25, rotate: 0 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                className="text-pink-500 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]"
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </motion.div>
            ) : (
              <motion.div
                key="pupil-right"
                initial={{ scale: 0.6 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.15 }}
                className="w-7 h-10 sm:w-8 sm:h-11 md:w-9 md:h-13 bg-[#0F172A] rounded-[50%] relative shadow-md flex items-center justify-center border border-[#1E293B]/40"
              >
                {/* Primary Specular Glint */}
                <div className="absolute top-1.5 right-1.5 w-2.5 h-3.5 bg-white rounded-full opacity-95 -rotate-12" />
                {/* Secondary Micro Reflection */}
                <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-white/70 rounded-full" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

export { MascotEyes as UnseenEyes };
