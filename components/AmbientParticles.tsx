"use client";

import { motion } from "framer-motion";

interface Particle {
  id: number;
  top: string;
  left: string;
  size: number;
  duration: number;
  delay: number;
  xOffset1: string;
  xOffset2: string;
  yOffset1: string;
  yOffset2: string;
}

// 18 deterministic particles for seamless SSR and hydration
const STATIC_PARTICLES: Particle[] = [
  { id: 0, top: "12%", left: "8%", size: 3.5, duration: 16, delay: 0, xOffset1: "3vw", xOffset2: "-2vw", yOffset1: "-10vh", yOffset2: "4vh" },
  { id: 1, top: "28%", left: "82%", size: 4.5, duration: 19, delay: 1.2, xOffset1: "-3.5vw", xOffset2: "2vw", yOffset1: "-12vh", yOffset2: "5vh" },
  { id: 2, top: "45%", left: "22%", size: 2.5, duration: 14, delay: 2.4, xOffset1: "2.8vw", xOffset2: "-1.8vw", yOffset1: "-8vh", yOffset2: "3vh" },
  { id: 3, top: "65%", left: "75%", size: 4.0, duration: 21, delay: 0.8, xOffset1: "-4vw", xOffset2: "3vw", yOffset1: "-14vh", yOffset2: "6vh" },
  { id: 4, top: "82%", left: "15%", size: 3.0, duration: 18, delay: 1.8, xOffset1: "3.2vw", xOffset2: "-2.4vw", yOffset1: "-10vh", yOffset2: "4.5vh" },
  { id: 5, top: "18%", left: "60%", size: 5.0, duration: 22, delay: 3.0, xOffset1: "-3vw", xOffset2: "2.5vw", yOffset1: "-12vh", yOffset2: "5vh" },
  { id: 6, top: "35%", left: "40%", size: 2.8, duration: 15, delay: 0.5, xOffset1: "2.4vw", xOffset2: "-1.5vw", yOffset1: "-9vh", yOffset2: "3.5vh" },
  { id: 7, top: "52%", left: "90%", size: 4.2, duration: 20, delay: 2.1, xOffset1: "-3.8vw", xOffset2: "2.8vw", yOffset1: "-11vh", yOffset2: "4vh" },
  { id: 8, top: "72%", left: "32%", size: 3.2, duration: 17, delay: 1.5, xOffset1: "3.5vw", xOffset2: "-2vw", yOffset1: "-10vh", yOffset2: "5vh" },
  { id: 9, top: "88%", left: "68%", size: 4.8, duration: 22, delay: 2.8, xOffset1: "-3.2vw", xOffset2: "2.2vw", yOffset1: "-13vh", yOffset2: "5.5vh" },
  { id: 10, top: "8%", left: "45%", size: 2.6, duration: 13, delay: 0.2, xOffset1: "2.2vw", xOffset2: "-1.6vw", yOffset1: "-8vh", yOffset2: "3vh" },
  { id: 11, top: "22%", left: "25%", size: 4.4, duration: 19, delay: 1.9, xOffset1: "-3.6vw", xOffset2: "2.6vw", yOffset1: "-11vh", yOffset2: "4.2vh" },
  { id: 12, top: "58%", left: "12%", size: 3.8, duration: 16, delay: 2.7, xOffset1: "3vw", xOffset2: "-2.2vw", yOffset1: "-9.5vh", yOffset2: "3.8vh" },
  { id: 13, top: "78%", left: "55%", size: 3.0, duration: 18, delay: 0.9, xOffset1: "-2.8vw", xOffset2: "2vw", yOffset1: "-10.5vh", yOffset2: "4.5vh" },
  { id: 14, top: "92%", left: "38%", size: 4.6, duration: 21, delay: 3.2, xOffset1: "3.6vw", xOffset2: "-2.8vw", yOffset1: "-12.5vh", yOffset2: "5.2vh" },
  { id: 15, top: "15%", left: "92%", size: 3.4, duration: 15, delay: 1.1, xOffset1: "-3vw", xOffset2: "2.1vw", yOffset1: "-9vh", yOffset2: "3.5vh" },
  { id: 16, top: "42%", left: "65%", size: 5.2, duration: 22, delay: 2.5, xOffset1: "4vw", xOffset2: "-3vw", yOffset1: "-13.5vh", yOffset2: "6vh" },
  { id: 17, top: "62%", left: "48%", size: 2.8, duration: 14, delay: 0.7, xOffset1: "-2.6vw", xOffset2: "1.8vw", yOffset1: "-8.5vh", yOffset2: "3.2vh" }
];

export default function AmbientParticles() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {STATIC_PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-neutral-800/15 blur-[0.5px]"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: ["0vh", p.yOffset1, p.yOffset2, "0vh"],
            x: ["0vw", p.xOffset1, p.xOffset2, "0vw"],
            opacity: [0.08, 0.35, 0.15, 0.08],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
