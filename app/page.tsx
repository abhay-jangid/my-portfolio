"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundFx } from "@/lib/audioEngine";
import MascotEyes from "@/components/MascotEyes";
import Hero3DCanvas from "@/components/Hero3DCanvas";
import ProjectsGrid from "@/components/ProjectsGrid";
import MenuDrawer from "@/components/MenuDrawer";
import CustomCursor from "@/components/CustomCursor";
import AmbientParticles from "@/components/AmbientParticles";
import TechStack from "@/components/TechStack";
import {
  ArrowUpRight,
  Volume2,
  VolumeX,
  Sparkles,
  Menu,
  Terminal,
  Cpu,
  Cloud,
  Layers,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isBtnHovered, setIsBtnHovered] = useState(false);
  const [isSquinting, setIsSquinting] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("18:00:00");

  // Mount IST live clock
  useEffect(() => {
    const updateISTTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setCurrentTime(new Intl.DateTimeFormat("en-GB", options).format(now));
    };

    updateISTTime();
    const timer = setInterval(updateISTTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleEnterWithAudio = () => {
    soundFx.enableAudio();
    soundFx.playEnterChime();
    setTimeout(() => {
      soundFx.startAmbientDrone();
    }, 400);
    setHasEntered(true);
  };

  const handleEnterWithoutAudio = () => {
    soundFx.disableAudio();
    setHasEntered(true);
  };

  const handleToggleMute = () => {
    soundFx.playClick();
    const muted = soundFx.toggleMute();
    setIsAudioMuted(muted);
  };

  return (
    <div className="relative min-h-screen bg-sand text-carbon overflow-x-hidden selection:bg-carbon selection:text-sand">
      {/* Contextual Cursor Spring Follower */}
      <CustomCursor />

      {/* Subtle Procedural Drifting Ambient Particles */}
      <AmbientParticles />

      {/* Slide-Out Fullscreen Navigation Menu */}
      <MenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* ========================================================================= */}
      {/* STATE 1: GATEWAY SCREEN (Initial interactive entry gate)                   */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {!hasEntered && (
          <motion.div
            key="gateway-screen"
            initial={{ y: "0%" }}
            exit={{
              y: "-100%",
              transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
            }}
            className="fixed inset-0 z-40 bg-sand flex flex-col justify-between p-6 md:p-12 overflow-hidden"
          >
            {/* Top Bar Metadata */}
            <header className="flex items-center justify-between text-neutral-500 font-mono text-[11px] md:text-xs uppercase tracking-widest border-b border-carbon/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-coral animate-pulse" />
                <span>ABHAY JANGID®</span>
              </div>
              <span className="hidden sm:inline">JIET UNIVERSITY, JODHPUR</span>
              <span>©2026</span>
            </header>

            {/* Center Stage: Mascot Eyes, Editorial Headline, & Subtitle */}
            <div className="flex flex-col items-center text-center my-auto py-8">
              {/* Dual Mascot Vector Eyes */}
              <div className="mb-8">
                <MascotEyes
                  isHeartEyes={isBtnHovered}
                  isSquinting={isSquinting}
                />
              </div>

              {/* Editorial Headline */}
              <h1 className="font-serif italic text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-carbon mb-6 leading-[0.95]">
                Abhay Jangid
              </h1>

              {/* Thesis Subtitle */}
              <p className="font-sans text-sm md:text-base text-neutral-600 max-w-lg mx-auto font-normal leading-relaxed px-4">
                Cloud & DevOps Intern and BCA student at JIET University developing
                high-performance Linux architectures, AI automation tools, and
                scalable web applications.
              </p>

              {/* Interactive Consent Controls */}
              <div className="mt-10 flex flex-col items-center gap-4">
                <button
                  type="button"
                  id="btn-enter"
                  data-cursor="Enter"
                  onClick={handleEnterWithAudio}
                  onMouseEnter={() => {
                    setIsBtnHovered(true);
                    soundFx.playHover();
                  }}
                  onMouseLeave={() => setIsBtnHovered(false)}
                  className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full border-2 border-carbon bg-carbon text-sand font-mono text-xs uppercase tracking-wider transition-all duration-300 hover:bg-coral hover:border-coral hover:text-white hover:shadow-lg active:scale-95 cursor-pointer"
                >
                  <span>Enter</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>

                <button
                  type="button"
                  id="btn-enter-silent"
                  data-cursor="Mute"
                  onClick={handleEnterWithoutAudio}
                  onMouseEnter={() => {
                    setIsSquinting(true);
                    soundFx.playHover();
                  }}
                  onMouseLeave={() => setIsSquinting(false)}
                  className="font-mono text-xs text-neutral-500 uppercase tracking-widest underline decoration-neutral-300 underline-offset-4 hover:text-carbon hover:decoration-carbon transition-colors duration-200 cursor-pointer"
                >
                  Enter without audio
                </button>
              </div>
            </div>

            {/* Bottom Bar: Geographic Anchor & Studio Clock */}
            <footer className="flex items-center justify-between text-neutral-500 font-mono text-[11px] md:text-xs uppercase tracking-widest border-t border-carbon/10 pt-4">
              <span>RAJASTHAN, INDIA</span>
              <div className="flex items-center gap-2">
                <span>IST</span>
                <span className="font-medium text-carbon">{currentTime}</span>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* STATE 2: MAIN SHOWCASE PORTFOLIO                                          */}
      {/* ========================================================================= */}
      <div className="relative z-10">
        {/* Sticky Global Top Header */}
        <header className="sticky top-0 z-30 bg-sand/85 backdrop-blur-md border-b border-carbon/10 px-6 md:px-12 py-5 flex items-center justify-between transition-all">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-coral animate-pulse" />
            <a
              href="#"
              data-cursor="Home"
              onClick={() => soundFx.playClick()}
              onMouseEnter={() => soundFx.playHover()}
              className="font-mono text-xs uppercase tracking-widest text-carbon font-semibold"
            >
              Abhay Jangid®
            </a>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-slate">
              <span>JODHPUR, IN</span>
              <span>•</span>
              <span className="text-carbon font-medium">{currentTime} IST</span>
            </div>

            {/* Audio Toggle */}
            <button
              type="button"
              data-cursor={isAudioMuted ? "Unmute" : "Mute"}
              onClick={handleToggleMute}
              onMouseEnter={() => soundFx.playHover()}
              className="p-2 rounded-full border border-carbon/20 hover:border-carbon text-carbon transition-colors cursor-pointer bg-sand/60"
              title={isAudioMuted ? "Unmute Audio" : "Mute Audio"}
            >
              {isAudioMuted ? (
                <VolumeX className="w-4 h-4 text-slate" />
              ) : (
                <Volume2 className="w-4 h-4 text-coral animate-pulse" />
              )}
            </button>

            {/* Menu Trigger */}
            <button
              type="button"
              data-cursor="Menu"
              onClick={() => {
                soundFx.playClick();
                setIsMenuOpen(true);
              }}
              onMouseEnter={() => soundFx.playHover()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-carbon bg-carbon text-sand font-mono text-xs uppercase tracking-wider hover:bg-coral hover:border-coral transition-all duration-200 cursor-pointer shadow-sm"
            >
              <span>Index</span>
              <Menu className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {/* HERO SECTION WITH 3D WEBGL ARCHITECTURE CANVAS */}
        <section id="hero" className="relative min-h-[90vh] flex flex-col justify-between px-6 md:px-12 py-12 md:py-20 overflow-hidden">
          {/* 3D WebGL Water Scene Background */}
          <Hero3DCanvas />

          <div className="relative z-20 my-auto max-w-6xl pointer-events-none">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-carbon/5 border border-carbon/10 font-mono text-xs text-slate uppercase tracking-wider mb-6 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-coral" />
              <span>Cloud & DevOps Engineer · Creative Technologist</span>
            </div>

            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight mb-8 text-neutral-900">
              Creating the <br />
              <span className="italic font-normal text-coral">unexpected</span>
            </h1>

            <p className="font-sans text-lg md:text-2xl text-carbon/80 max-w-2xl font-light leading-relaxed">
              Full-Stack & Cloud Engineer at JIET University designing resilient
              distributed systems, automated CI/CD pipelines, and high-performance
              AI web applications.
            </p>

            <div className="mt-12 flex flex-wrap gap-4 pointer-events-auto">
              <a
                href="#projects"
                data-cursor="Explore"
                onClick={() => soundFx.playClick()}
                onMouseEnter={() => soundFx.playHover()}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-carbon text-sand font-mono text-xs uppercase tracking-wider hover:bg-coral transition-colors shadow-sm"
              >
                <span>View Selected Works</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                data-cursor="Contact"
                onClick={() => soundFx.playClick()}
                onMouseEnter={() => soundFx.playHover()}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-sand/80 border border-carbon/20 text-carbon font-mono text-xs uppercase tracking-wider hover:bg-carbon hover:text-sand transition-all backdrop-blur-sm shadow-sm"
              >
                <span>Get In Touch</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="relative z-20 pt-8 border-t border-carbon/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate pointer-events-auto">
            <span>JIET UNIVERSITY · JODHPUR, RAJASTHAN</span>
            <span>SCROLL TO EXPLORE ARCHITECTURE ↓</span>
          </div>
        </section>

        {/* PROJECTS SHOWCASE SECTION */}
        <ProjectsGrid />

        {/* TECHNICAL SKILLS MATRIX */}
        <TechStack />

        {/* ABOUT & PHILOSOPHY SECTION */}
        <section id="about" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-carbon/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-carbon/5 border border-carbon/10 font-mono text-xs text-slate uppercase tracking-wider mb-4">
                <span>Profile & Biography</span>
              </div>
              <h2 className="font-serif italic text-4xl sm:text-5xl md:text-6xl tracking-tight text-carbon mb-6">
                Engineering with <br />
                rigor and intent
              </h2>
              <p className="font-sans text-base md:text-lg text-neutral-700 leading-relaxed mb-6">
                I am a Cloud & DevOps Intern and BCA scholar at <strong>JIET University, Jodhpur</strong>.
                My focus centers on architecting resilient Linux hosting environments, automated
                virtualization workflows with Docker, and building dynamic, motion-driven digital products.
              </p>
              <p className="font-sans text-sm md:text-base text-neutral-600 leading-relaxed mb-8">
                Whether deploying containerized infrastructure, calculating shortest paths across
                spatial graphs, or synthesizing custom Web Audio and WebGL experiences, I bridge technical
                depth with aesthetic refinement.
              </p>

              <div className="space-y-3 font-mono text-xs text-neutral-700">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-coral shrink-0" />
                  <span>Cloud & DevOps Intern · System Automation & Virtualization</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-coral shrink-0" />
                  <span>Bachelor of Computer Applications (BCA) · JIET University</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-coral shrink-0" />
                  <span>Based in Jodhpur, Rajasthan, India (IST GMT+5:30)</span>
                </div>
              </div>
            </div>

            {/* Interactive Portrait / Studio Card */}
            <div className="lg:col-span-6">
              <div className="p-8 md:p-12 rounded-3xl bg-carbon text-sand border border-carbon shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-coral/10 rounded-full blur-3xl pointer-events-none" />
                <div className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-6">
                  STUDIO ARCHITECTURE · 2026
                </div>
                <blockquote className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-sand leading-snug mb-8">
                  &ldquo;Great software feels seamless because every component, transition, and pipeline is engineered with purposeful precision.&rdquo;
                </blockquote>
                <div className="flex items-center justify-between border-t border-sand/15 pt-6 font-mono text-xs text-neutral-400">
                  <span>Abhay Jangid</span>
                  <span>JIET University, Jodhpur</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT & CTA SECTION */}
        <section id="contact" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-carbon/10">
          <div className="p-8 sm:p-14 md:p-20 rounded-3xl bg-carbon text-sand flex flex-col md:flex-row justify-between items-start md:items-center gap-10 shadow-2xl relative overflow-hidden">
            <div className="max-w-2xl relative z-10">
              <span className="font-mono text-xs uppercase tracking-widest text-coral font-medium mb-4 block">
                Start a Conversation
              </span>
              <h2 className="font-serif italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-6">
                Let&apos;s build something <br />
                extraordinary.
              </h2>
              <p className="font-sans text-sm md:text-base text-neutral-400 leading-relaxed max-w-lg">
                Open for Cloud & DevOps opportunities, full-stack engineering roles,
                and innovative creative technology collaborations.
              </p>
            </div>

            <div className="flex flex-col gap-4 w-full md:w-auto relative z-10">
              <a
                href="mailto:abhayjangid2929@gmail.com"
                data-cursor="Email"
                onClick={() => soundFx.playClick()}
                onMouseEnter={() => soundFx.playHover()}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-coral text-white font-mono text-xs uppercase tracking-wider hover:bg-white hover:text-carbon transition-colors duration-300 shadow-lg text-center"
              >
                <Mail className="w-4 h-4" />
                <span>abhayjangid2929@gmail.com</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="tel:+916377901958"
                data-cursor="Call"
                onClick={() => soundFx.playClick()}
                onMouseEnter={() => soundFx.playHover()}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-sand/10 border border-sand/20 text-sand font-mono text-xs uppercase tracking-wider hover:bg-sand hover:text-carbon transition-all duration-300 text-center"
              >
                <Phone className="w-4 h-4 text-coral" />
                <span>+91 63779 01958</span>
              </a>
            </div>
          </div>
        </section>

        {/* SITE FOOTER */}
        <footer className="border-t border-carbon/10 px-6 md:px-12 py-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-neutral-500">
          <div className="flex items-center gap-2 text-carbon">
            <span className="h-1.5 w-1.5 rounded-full bg-coral animate-pulse" />
            <span>Abhay Jangid — Portfolio 2.0</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/abhay-jangid"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => soundFx.playHover()}
              className="hover:text-coral transition-colors flex items-center gap-1.5"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/abhay-jangid-046305396/"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => soundFx.playHover()}
              className="hover:text-coral transition-colors flex items-center gap-1.5"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          </div>

          <div className="text-neutral-400">
            JIET UNIVERSITY · JODHPUR, RAJASTHAN
          </div>
        </footer>
      </div>
    </div>
  );
}
