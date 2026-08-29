"use client";

import { useEffect, useRef, useState } from "react";
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
  const leftSpringX = useSpring(leftX, { stiffness: 450, damping: 28, mass: 0.4 });
  const leftSpringY = useSpring(leftY, { stiffness: 450, damping: 28, mass: 0.4 });

  // Right eye pupil motion values
  const rightX = useMotionValue(0);
  const rightY = useMotionValue(0);
  const rightSpringX = useSpring(rightX, { stiffness: 450, damping: 28, mass: 0.4 });
  const rightSpringY = useSpring(rightY, { stiffness: 450, damping: 28, mass: 0.4 });

  // Blinking state machine
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    let blinkTimer: NodeJS.Timeout;

    const triggerBlink = () => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
      }, 140);

      // Randomize next blink between 2500ms and 5500ms
      const nextInterval = Math.random() * 3000 + 2500;
      blinkTimer = setTimeout(triggerBlink, nextInterval);
    };

    blinkTimer = setTimeout(triggerBlink, 3000);

    return () => clearTimeout(blinkTimer);
  }, []);

  // Pointer vector kinematics tracking
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
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
        const clampedDist = Math.min(dist * 0.08, 18);
        leftX.set(Math.cos(theta) * clampedDist);
        leftY.set(Math.sin(theta) * clampedDist);
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
        const clampedDist = Math.min(dist * 0.08, 18);
        rightX.set(Math.cos(theta) * clampedDist);
        rightY.set(Math.sin(theta) * clampedDist);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [leftX, leftY, rightX, rightY]);

  // Eyelid heights based on blink and squint states
  const upperEyelidHeight = isBlinking
    ? "100%"
    : isSquinting
    ? "45%"
    : "0%";

  const lowerEyelidHeight = isBlinking
    ? "100%"
    : isSquinting
    ? "25%"
    : "0%";

  return (
    <div
      className={`inline-flex items-center justify-center gap-4 md:gap-6 select-none ${className}`}
      aria-label="Interactive Mascot Eyes"
    >
      {/* Left Eye Socket */}
      <div
        ref={leftSocketRef}
        className="relative w-16 h-24 md:w-20 md:h-28 rounded-[50%] bg-[#FAF7F2] border-[3.5px] border-carbon overflow-hidden shadow-[inset_0_4px_12px_rgba(0,0,0,0.12)] flex items-center justify-center"
      >
        {/* Upper Eyelid */}
        <motion.div
          className="absolute top-0 inset-x-0 bg-carbon z-20"
          initial={false}
          animate={{ height: upperEyelidHeight }}
          transition={{
            duration: isBlinking ? 0.08 : 0.25,
            ease: [0.16, 1, 0.3, 1],
          }}
        />

        {/* Lower Eyelid */}
        <motion.div
          className="absolute bottom-0 inset-x-0 bg-carbon z-20"
          initial={false}
          animate={{ height: lowerEyelidHeight }}
          transition={{
            duration: isBlinking ? 0.08 : 0.25,
            ease: [0.16, 1, 0.3, 1],
          }}
        />

        {/* Left Pupil / Heart morph */}
        <motion.div
          className="relative z-10 flex items-center justify-center"
          style={{ x: leftSpringX, y: leftSpringY }}
        >
          <AnimatePresence mode="wait">
            {isHeartEyes ? (
              <motion.div
                key="heart-left"
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1.2, rotate: 0 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                className="text-coral drop-shadow-sm"
              >
                <svg
                  width="28"
                  height="28"
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
                className="w-7 h-10 md:w-8 md:h-12 bg-carbon rounded-[50%] relative"
              >
                {/* Specular light glint */}
                <div className="absolute top-1.5 right-1.5 w-2 h-3 bg-white rounded-full opacity-90 -rotate-12" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Right Eye Socket */}
      <div
        ref={rightSocketRef}
        className="relative w-16 h-24 md:w-20 md:h-28 rounded-[50%] bg-[#FAF7F2] border-[3.5px] border-carbon overflow-hidden shadow-[inset_0_4px_12px_rgba(0,0,0,0.12)] flex items-center justify-center"
      >
        {/* Upper Eyelid */}
        <motion.div
          className="absolute top-0 inset-x-0 bg-carbon z-20"
          initial={false}
          animate={{ height: upperEyelidHeight }}
          transition={{
            duration: isBlinking ? 0.08 : 0.25,
            ease: [0.16, 1, 0.3, 1],
          }}
        />

        {/* Lower Eyelid */}
        <motion.div
          className="absolute bottom-0 inset-x-0 bg-carbon z-20"
          initial={false}
          animate={{ height: lowerEyelidHeight }}
          transition={{
            duration: isBlinking ? 0.08 : 0.25,
            ease: [0.16, 1, 0.3, 1],
          }}
        />

        {/* Right Pupil / Heart morph */}
        <motion.div
          className="relative z-10 flex items-center justify-center"
          style={{ x: rightSpringX, y: rightSpringY }}
        >
          <AnimatePresence mode="wait">
            {isHeartEyes ? (
              <motion.div
                key="heart-right"
                initial={{ scale: 0, rotate: 20 }}
                animate={{ scale: 1.2, rotate: 0 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                className="text-coral drop-shadow-sm"
              >
                <svg
                  width="28"
                  height="28"
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
                className="w-7 h-10 md:w-8 md:h-12 bg-carbon rounded-[50%] relative"
              >
                {/* Specular light glint */}
                <div className="absolute top-1.5 right-1.5 w-2 h-3 bg-white rounded-full opacity-90 -rotate-12" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
