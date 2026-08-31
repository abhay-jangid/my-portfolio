"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundFx } from "@/lib/audioEngine";
import MascotEyes from "@/components/MascotEyes";
import EarthCanvas from "@/components/EarthCanvas";
import ProjectsGrid from "@/components/ProjectsGrid";
import MenuDrawer from "@/components/MenuDrawer";
import CustomCursor from "@/components/CustomCursor";
import AmbientParticles from "@/components/AmbientParticles";
import TechStack from "@/components/TechStack";
import CloudArchitecture from "@/components/CloudArchitecture";
import DevOpsTerminal from "@/components/DevOpsTerminal";
import BackgroundMusic from "@/components/BackgroundMusic";
import {
  ArrowUpRight,
  Volume2,
  VolumeX,
  Menu,
  Terminal,
  Cpu,
  Cloud,
  Github,
  Linkedin,
  Mail,
  Phone,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isBtnHovered, setIsBtnHovered] = useState(false);
  const [isSquinting, setIsSquinting] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isAudioInitialized, setIsAudioInitialized] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("18:00:00");

  // Mount IST live clock & audio sync
  useEffect(() => {
    setIsAudioMuted(soundFx.getAudioState().isMuted);

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
    setIsAudioInitialized(true);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setHasEntered(true);
  };

  const handleEnterWithoutAudio = () => {
    soundFx.disableAudio();
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setHasEntered(true);
  };

  const handleToggleMute = () => {
    soundFx.playClick();
    const muted = soundFx.toggleMute();
    setIsAudioMuted(muted);
  };

  return (
    <div className="relative min-h-screen bg-[#020617] text-[#F8FAFC] overflow-x-hidden selection:bg-cyan-500 selection:text-white font-sans">
      {/* Full-Screen Scroll-Driven Persistent Earth 3D Canvas */}
      <EarthCanvas />

      {/* Background Audio Engine (Auto-plays on Initialize Terminal, 40% Volume, Visibility-Aware) */}
      <BackgroundMusic shouldPlay={isAudioInitialized} />

      {/* Contextual Cursor Spring Follower */}
      <CustomCursor />

      {/* Subtle Ambient Particles */}
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
            className="hardware-accelerated fixed inset-0 z-40 bg-[#020617] flex flex-col justify-between p-6 md:p-12 overflow-hidden"
          >
            {/* Ambient Nebula Center Glow */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-blue-500/10 rounded-full blur-[150px]" />

            {/* Top Bar Metadata */}
            <header className="relative z-10 flex items-center justify-between text-slate-400 font-mono text-[11px] md:text-xs uppercase tracking-widest border-b border-slate-800/80 pb-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                <span className="text-[#F8FAFC] font-semibold">MISSION AUTH // ABHAY JANGID</span>
              </div>
              <span className="hidden sm:inline text-slate-500">JIET UNIVERSITY · RAJASTHAN</span>
              <span className="text-cyan-400 font-bold shadow-glow-cyan">STATUS: READY</span>
            </header>

            {/* Center Stage: Mascot Eyes, Headline, & Subtitle */}
            <div className="relative z-10 flex flex-col items-center text-center my-auto py-8">
              {/* Mascot Vector Eyes */}
              <div className="mb-8">
                <MascotEyes
                  isHeartEyes={isBtnHovered}
                  isSquinting={isSquinting}
                />
              </div>

              {/* Monospace Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 font-mono text-xs text-cyan-400 uppercase tracking-wider mb-4 shadow-glow-cyan">
                <Cloud className="w-3.5 h-3.5" />
                <span>Cloud & DevOps Engineer · Systems Technologist</span>
              </div>

              {/* Headline */}
              <h1 className="font-sans font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#F8FAFC] mb-6 leading-[0.95]">
                Abhay Jangid
              </h1>

              {/* Subtitle */}
              <p className="font-sans text-sm md:text-base text-slate-400 max-w-lg mx-auto font-normal leading-relaxed px-4">
                Cloud & DevOps Intern and BCA scholar at JIET University developing
                high-availability Linux hosting environments, automated CI/CD pipelines,
                and scalable AI-driven web architectures.
              </p>

              {/* Interactive Consent Controls */}
              <div className="mt-10 flex flex-col items-center gap-4">
                <button
                  type="button"
                  id="btn-enter"
                  data-cursor="Connect"
                  onClick={handleEnterWithAudio}
                  onMouseEnter={() => {
                    setIsBtnHovered(true);
                    soundFx.playHover();
                  }}
                  onMouseLeave={() => setIsBtnHovered(false)}
                  className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-cyan-500/50 bg-gradient-to-r from-blue-600 via-cyan-600 to-violet-600 text-white font-mono text-xs uppercase tracking-wider transition-all duration-300 hover:shadow-glow-cyan active:scale-95 cursor-pointer shadow-lg"
                >
                  <span>Initialize Terminal</span>
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
                  className="font-mono text-xs text-slate-500 uppercase tracking-widest underline decoration-slate-700 underline-offset-4 hover:text-slate-300 transition-colors duration-200 cursor-pointer"
                >
                  Initialize without telemetry audio
                </button>
              </div>
            </div>

            {/* Bottom Bar */}
            <footer className="relative z-10 flex items-center justify-between text-slate-500 font-mono text-[11px] md:text-xs uppercase tracking-widest border-t border-slate-800/80 pt-4">
              <span>JODHPUR, RAJASTHAN (IST)</span>
              <div className="flex items-center gap-2">
                <span className="text-slate-500">LIVE CLOCK:</span>
                <span className="font-semibold text-cyan-400">{currentTime}</span>
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
        <header className="w-full px-6 md:px-12 py-5 flex items-center justify-between border-b border-slate-800/80 bg-[#020617]/85 backdrop-blur-xl sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <a
              href="#"
              data-cursor="Console"
              onClick={() => soundFx.playClick()}
              onMouseEnter={() => soundFx.playHover()}
              className="font-mono text-xs uppercase tracking-wider text-[#F8FAFC] font-bold flex items-center gap-2"
            >
              <span>Abhay Jangid</span>
              <span className="text-slate-400 font-normal hidden sm:inline">[Cloud & DevOps]</span>
            </a>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <span className="hidden md:inline font-mono text-xs text-slate-400">
              Jodhpur, IN • <span className="text-cyan-400">{currentTime}</span> IST
            </span>

            {/* Audio Toggle */}
            <button
              type="button"
              data-cursor={isAudioMuted ? "Unmute" : "Mute"}
              onClick={handleToggleMute}
              onMouseEnter={() => soundFx.playHover()}
              className="p-2 rounded-full border border-slate-800 bg-[#0A0E1A] hover:border-cyan-500 text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer shadow-xs"
              title={isAudioMuted ? "Unmute Audio" : "Mute Audio"}
            >
              {isAudioMuted ? (
                <VolumeX className="w-4 h-4 text-slate-500" />
              ) : (
                <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
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
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-800 bg-[#0A0E1A] hover:border-cyan-500/50 hover:bg-[#131B2E] text-[#F8FAFC] font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm"
            >
              <span>Index</span>
              <Menu className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          </div>
        </header>

        {/* 1. HERO SECTION: Fully visible without vertical scrolling */}
        <section
          id="hero"
          className="relative w-full h-[calc(100vh-60px)] min-h-[600px] max-h-[900px] px-6 md:px-12 flex flex-col justify-between py-6 overflow-hidden"
        >
          {/* Header Info & Title */}
          <div className="max-w-4xl z-10 mt-auto mb-6 pointer-events-none">
            <span className="text-xs uppercase tracking-widest text-cyan-400 font-mono mb-2 block font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-glow-cyan" />
              <span>// Cloud & DevOps Engineer</span>
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#F8FAFC] leading-[1.05]">
              Architecting the <span className="text-nebula-gradient">resilient & scalable</span>
            </h1>
            <p className="mt-4 text-slate-400 text-sm md:text-base max-w-xl leading-relaxed">
              Full-Stack & Cloud Engineer at JIET University designing resilient distributed systems, automated CI/CD pipelines, and high-performance AI web architectures.
            </p>

            {/* Cosmic Monospace Stack Pills */}
            <div className="mt-6 flex flex-wrap gap-2 pointer-events-auto font-mono text-xs">
              {["DOCKER", "AWS (EC2/S3)", "LINUX / BASH", "GITHUB ACTIONS", "TYPESCRIPT", "PYTHON"].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg cosmic-glass border-slate-800 text-slate-300 hover:text-[#F8FAFC] hover:border-cyan-500/50 hover:shadow-glow-cyan transition-all duration-200 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4 pointer-events-auto">
              <a
                href="#projects"
                data-cursor="Explore"
                onClick={() => soundFx.playClick()}
                onMouseEnter={() => soundFx.playHover()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-mono text-xs uppercase tracking-wider transition-all shadow-glow-blue cursor-pointer"
              >
                <span>View Deployments</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#terminal"
                data-cursor="Terminal"
                onClick={() => soundFx.playClick()}
                onMouseEnter={() => soundFx.playHover()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full cosmic-glass border-slate-700/80 text-[#F8FAFC] font-mono text-xs uppercase tracking-wider hover:border-cyan-500/60 hover:shadow-glow-cyan transition-all shadow-sm cursor-pointer"
              >
                <span>Command Shell</span>
                <Terminal className="w-4 h-4 text-cyan-400" />
              </a>
            </div>
          </div>

          {/* Bottom Bar Info */}
          <div className="relative z-10 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-xs text-slate-400 pointer-events-auto">
            <span className="flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>JIET UNIVERSITY · JODHPUR, RAJASTHAN</span>
            </span>
            <span className="text-cyan-400 font-medium flex items-center gap-1.5">
              <span>SCROLL TO INSPECT INFRASTRUCTURE</span>
              <span>↓</span>
            </span>
          </div>
        </section>

        {/* 2. PROJECTS SHOWCASE SECTION */}
        <ProjectsGrid />

        {/* 3. TECHNICAL SKILLS MATRIX */}
        <TechStack />

        {/* 4. INTERACTIVE CLOUD ARCHITECTURE TOPOLOGY */}
        <CloudArchitecture />

        {/* 5. DEVOPS COMMAND CENTER TERMINAL */}
        <DevOpsTerminal />

        {/* 6. ABOUT & PHILOSOPHY SECTION */}
        <section id="about" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto section-frosted-glass rounded-[40px] my-12 border border-blue-500/20 shadow-2xl text-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 font-mono text-xs text-cyan-400 uppercase tracking-wider mb-4 font-semibold shadow-glow-cyan">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Engineer Profile & Biography</span>
              </div>
              <h2 className="font-sans font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight text-[#F8FAFC] mb-6">
                Engineering with <br />
                <span className="text-nebula-gradient">rigor and intent</span>
              </h2>
              <p className="font-sans text-base md:text-lg text-slate-300 leading-relaxed mb-6">
                I am a Cloud & DevOps Intern and BCA scholar at <strong className="text-white">JIET University, Jodhpur</strong>.
                My focus centers on architecting resilient Linux hosting environments, automated
                virtualization workflows with Docker, and building dynamic, motion-driven digital products.
              </p>
              <p className="font-sans text-sm md:text-base text-slate-300 leading-relaxed mb-8">
                Whether deploying containerized infrastructure, calculating shortest paths across
                spatial graphs, or synthesizing custom Web Audio and WebGL experiences, I bridge technical
                depth with aesthetic refinement.
              </p>

              <div className="space-y-3 font-mono text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Cloud & DevOps Intern · System Automation & Virtualization</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Bachelor of Computer Applications (BCA) · JIET University</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Based in Jodhpur, Rajasthan, India (IST GMT+5:30)</span>
                </div>
              </div>
            </div>

            {/* Profile Philosophy Card with Cosmic Glass */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl cosmic-glass p-8 md:p-12 shadow-2xl relative overflow-hidden border border-slate-800 hover:border-cyan-500/60">
                <div className="font-mono text-xs uppercase tracking-widest text-cyan-400 mb-6 flex items-center justify-between font-semibold">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>INFRASTRUCTURE PHILOSOPHY</span>
                  </span>
                  <span className="text-cyan-400 font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                    v2.4.0
                  </span>
                </div>
                <blockquote className="font-sans font-light text-2xl sm:text-3xl text-[#F8FAFC] leading-snug mb-8">
                  &ldquo;Great software feels seamless because every pipeline, container, and interaction is engineered with purposeful precision.&rdquo;
                </blockquote>
                <div className="flex items-center justify-between border-t border-slate-800 pt-6 font-mono text-xs text-slate-400">
                  <span className="text-[#F8FAFC] font-semibold">Abhay Jangid</span>
                  <span>JIET University, Jodhpur</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. CONTACT SECTION */}
        <section id="contact" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-slate-800/80">
          <div className="rounded-3xl cosmic-glass border border-cyan-500/30 p-8 sm:p-14 md:p-20 text-[#F8FAFC] flex flex-col md:flex-row justify-between items-start md:items-center gap-10 shadow-2xl relative overflow-hidden">
            {/* Ambient Nebula Bloom */}
            <div className="pointer-events-none absolute -right-20 -top-20 w-[500px] h-[500px] bg-gradient-to-br from-cyan-500/15 to-violet-500/15 rounded-full blur-[120px]" />

            <div className="max-w-2xl relative z-10">
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                Open For Inquiries & Internships
              </span>
              <h2 className="font-sans font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-6 text-[#F8FAFC]">
                Let&apos;s engineer something <br />
                <span className="text-nebula-gradient">extraordinary.</span>
              </h2>
              <p className="font-sans text-sm md:text-base text-slate-400 leading-relaxed max-w-lg">
                Available for Cloud & DevOps opportunities, full-stack engineering roles,
                and innovative creative technology collaborations.
              </p>
            </div>

            <div className="flex flex-col gap-4 w-full md:w-auto relative z-10 font-mono">
              <a
                href="mailto:abhayjangid2929@gmail.com"
                data-cursor="Email"
                onClick={() => soundFx.playClick()}
                onMouseEnter={() => soundFx.playHover()}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs uppercase tracking-wider hover:from-blue-500 hover:to-cyan-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all duration-300 shadow-glow-cyan text-center cursor-pointer"
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
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full cosmic-glass border-slate-700/80 text-[#F8FAFC] text-xs uppercase tracking-wider hover:border-cyan-500/60 hover:shadow-glow-cyan transition-all duration-300 text-center cursor-pointer"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>+91 63779 01958</span>
              </a>
            </div>
          </div>
        </section>

        {/* 8. SITE FOOTER */}
        <footer className="border-t border-slate-800/80 px-6 md:px-12 py-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-slate-400">
          <div className="flex items-center gap-2 text-slate-300 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
            <span>Abhay Jangid — Cloud & DevOps Portfolio</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/abhay-jangid"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => soundFx.playHover()}
              className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/abhay-jangid-046305396/"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => soundFx.playHover()}
              className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          </div>

          <div className="text-slate-500">
            JIET UNIVERSITY · JODHPUR, RAJASTHAN
          </div>
        </footer>
      </div>
    </div>
  );
}
