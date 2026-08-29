"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { soundFx } from "@/lib/audioEngine";

useGLTF.preload("/models/assistant.glb");

function AssistantModel() {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/models/assistant.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    const animName = Object.keys(actions)[0] || "";
    if (animName && actions[animName]) {
      actions[animName]?.reset().fadeIn(0.5).play();
    }
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.frustumCulled = false;
      }
    });
  }, [actions, scene]);

  // Subtle 360-degree cursor tracking
  useFrame(({ pointer }, delta) => {
    if (!group.current) return;
    const targetY = pointer.x * 0.6;
    const targetX = -pointer.y * 0.4;

    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      targetY,
      delta * 3.0
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      targetX,
      delta * 3.0
    );
  });

  return (
    <group ref={group} position={[0, -0.2, 0]} scale={1.3}>
      <primitive object={scene} />
    </group>
  );
}

const ABHAY_CONTEXT = {
  hero: "Hello! I'm your AI guide. Abhay is a Cloud & DevOps intern and BCA student at JIET University, building cloud architectures and interactive web software.",
  projects: "Check out Abhay's portfolio projects! EVOLV (fitness intelligence engine), AI Ad Script Generators, and Graph Route Optimizers.",
  skills: "Abhay's core stack includes Docker, Linux, CI/CD pipelines, TypeScript, React, Python, and SQL.",
  contact: "Want to collaborate or hire Abhay? Reach out directly at abhayjangid2929@gmail.com or call +91 63779 81958!"
};

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDialogue, setCurrentDialogue] = useState(ABHAY_CONTEXT.hero);
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hi! Ask me anything about Abhay's projects, tech stack, or background." }
  ]);
  const [inputQuery, setInputQuery] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll section observer for 5-second dwelling narrative triggers
  useEffect(() => {
    const sections = ["hero", "projects", "skills", "contact"];
    const observers: IntersectionObserver[] = [];

    sections.forEach((secId) => {
      const el = document.getElementById(secId);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (timerRef.current) clearTimeout(timerRef.current);
              timerRef.current = setTimeout(() => {
                if (secId === "projects") setCurrentDialogue(ABHAY_CONTEXT.projects);
                else if (secId === "skills") setCurrentDialogue(ABHAY_CONTEXT.skills);
                else if (secId === "contact") setCurrentDialogue(ABHAY_CONTEXT.contact);
                else setCurrentDialogue(ABHAY_CONTEXT.hero);
                soundFx.playHover();
              }, 5000);
            } else {
              if (timerRef.current) clearTimeout(timerRef.current);
            }
          });
        },
        { threshold: 0.6 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;

    soundFx.playClick();
    const userText = inputQuery;
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInputQuery("");

    setTimeout(() => {
      let reply = "Abhay is a BCA student at JIET and a full-stack & cloud engineer. You can check his projects above or email him at abhayjangid2929@gmail.com!";
      const q = userText.toLowerCase();

      if (q.includes("project") || q.includes("evolv") || q.includes("app")) {
        reply = "Abhay built EVOLV (a fitness intelligence engine with vision-based proportion analysis), an AI Ad Script Generator, and a Shortest Path Route Optimizer.";
      } else if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("devops")) {
        reply = "Abhay works with Docker, Linux, CI/CD pipelines, TypeScript, React, Next.js, Python, and SQL.";
      } else if (q.includes("contact") || q.includes("email") || q.includes("hire") || q.includes("intern")) {
        reply = "Abhay is currently seeking Cloud & DevOps or Full-Stack internships. Contact him at abhayjangid2929@gmail.com or +91 63779 81958.";
      }

      setMessages((prev) => [...prev, { sender: "ai", text: reply }]);
      setCurrentDialogue(reply);
      soundFx.playHover();
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto">
      {/* Scroll-Aware Speech Bubble */}
      <AnimatePresence>
        {currentDialogue && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            className="mb-3 max-w-[280px] rounded-2xl bg-[#1A1918] p-4 text-[#F4EFEB] shadow-2xl border border-white/10 font-sans text-xs leading-relaxed"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[10px] text-coral uppercase tracking-widest">
                AI Companion
              </span>
              <button
                type="button"
                onClick={() => setCurrentDialogue("")}
                className="text-neutral-400 hover:text-white text-xs cursor-pointer"
              >
                ×
              </button>
            </div>
            <p>{currentDialogue}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating 3D Avatar Trigger Button */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          soundFx.playClick();
          setIsOpen(!isOpen);
        }}
        className="relative flex items-center gap-3 rounded-full bg-[#1A1918] p-2 pr-5 text-white shadow-2xl border border-white/15 cursor-pointer group"
      >
        <div className="w-10 h-10 rounded-full overflow-hidden bg-black/40 border border-white/20">
          <Canvas
            camera={{ position: [0, 0, 3], fov: 45 }}
            gl={{ powerPreference: "high-performance", alpha: true, antialias: true }}
          >
            <ambientLight intensity={1.8} />
            <directionalLight position={[3, 3, 3]} intensity={2.0} />
            <directionalLight position={[-3, -2, 1]} intensity={1.0} />
            <React.Suspense fallback={null}>
              <AssistantModel />
            </React.Suspense>
          </Canvas>
        </div>
        <span className="text-xs font-mono uppercase tracking-wider">
          {isOpen ? "Close AI" : "Ask AI Guide"}
        </span>
      </motion.button>

      {/* Interactive Chat Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="mt-4 w-[340px] md:w-[380px] flex flex-col rounded-3xl bg-[#1A1918] text-[#F4EFEB] shadow-2xl border border-white/15 overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-wider text-white">
                  AI Portfolio Guide
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-neutral-400 hover:text-white text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 max-h-[300px] min-h-[220px] overflow-y-auto p-5 flex flex-col gap-3 font-sans text-xs">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    m.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 leading-relaxed ${
                      m.sender === "user"
                        ? "bg-coral text-white rounded-br-none"
                        : "bg-white/10 text-neutral-200 rounded-bl-none border border-white/5"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <form
              onSubmit={handleSendMessage}
              className="flex items-center gap-2 p-3 border-t border-white/10 bg-white/5"
            >
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask about projects, tech stack, internship..."
                className="flex-1 bg-white/10 text-white placeholder-neutral-400 text-xs px-4 py-2.5 rounded-full outline-none border border-white/10 focus:border-coral transition-colors"
              />
              <button
                type="submit"
                onMouseEnter={() => soundFx.playHover()}
                className="bg-coral hover:bg-orange-600 text-white px-4 py-2.5 rounded-full text-xs font-mono uppercase transition-colors shadow-md cursor-pointer"
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
