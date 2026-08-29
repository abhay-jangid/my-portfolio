"use client";

/**
 * Unseen Studio–style Hero
 * ------------------------------------------------------------------------
 * Recreates the three signature moments identified on unseen.co/projects/:
 *
 *   1. A "hold to enter" radial-fill gate — the cursor reads "Click & Hold"
 *      and the visitor chooses "Enter" or "Enter without audio", gating
 *      the site's soundscape behind an explicit gesture (autoplay-safe).
 *   2. A per-character wordmark reveal ("U N S E E N") that plays once the
 *      hold completes, masked up from below with an expo-out ease.
 *   3. An ambient grain/noise layer + a contextual custom cursor that
 *      swaps in a text label ("Drag", "Menu", nav labels) on hover —
 *      both persist from the preloader into the hero itself.
 *
 * Dependencies:   npm i framer-motion
 * Target:         Next.js 14/15 App Router · Tailwind CSS 3.4+
 *
 * FIDELITY NOTE: colors, durations and easing curves below are informed
 * estimates from visual/UX analysis (dark "charcoal" background, cream
 * type, expo-style reveals), not values read from devtools. Treat this
 * as a strong, production-shaped starting point — sample the live site
 * with an eyedropper / Performance panel to tighten exact tokens.
 */

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  type Easing,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

// ---------------------------------------------------------------------------
// Design tokens (estimated — see fidelity note above)
// ---------------------------------------------------------------------------
const TOKENS = {
  bg: "#121212", // near-black charcoal
  fg: "#F3F1EA", // warm cream
  muted: "#8C8A82", // desaturated warm grey
};

const EASE_OUT_EXPO: Easing = [0.16, 1, 0.3, 1];
const EASE_SIGNATURE: Easing = [0.65, 0, 0.35, 1];

const WORDMARK = ["U", "N", "S", "E", "E", "N"];
const NAV_ITEMS = [
  { n: "01", label: "Index", href: "/" },
  { n: "02", label: "Projects", href: "/projects/" },
  { n: "03", label: "Contact", href: "/contact/" },
  { n: "04", label: "World", href: "/world/" },
];

const HEADLINE =
  "A brand, digital and motion studio creating refreshingly unexpected ideas and striking visuals that help bold brands cut through the noise.";

const HOLD_DURATION_MS = 1100;

// ---------------------------------------------------------------------------
// Atmosphere: fixed film-grain layer, mix-blend-mode over everything
// ---------------------------------------------------------------------------
function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] opacity-[0.05] mix-blend-overlay"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  );
}

// ---------------------------------------------------------------------------
// Custom cursor: spring-followed dot that expands into a text pill when
// hovering anything with a `data-cursor="Label"` attribute.
// ---------------------------------------------------------------------------
function CustomCursor() {
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
      const target = (e.target as HTMLElement)?.closest<HTMLElement>(
        "[data-cursor]"
      );
      setLabel(target?.dataset.cursor ?? null);
    };

    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [x, y]);

  if (coarsePointer || reduceMotion) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[70] flex items-center justify-center rounded-full mix-blend-difference"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{ width: label ? 96 : 10, height: label ? 96 : 10 }}
      transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: TOKENS.fg }}
      />
      {label && (
        <motion.span
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="relative text-[11px] font-medium uppercase tracking-wide"
          style={{ color: TOKENS.bg }}
        >
          {label}
        </motion.span>
      )}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Hold-to-enter control: SVG ring fills via requestAnimationFrame while the
// pointer is held down; completing the hold fires onComplete.
// ---------------------------------------------------------------------------
function HoldToEnter({
  label,
  withAudio,
  onComplete,
}: {
  label: string;
  withAudio: boolean;
  onComplete: (withAudio: boolean) => void;
}) {
  const [progress, setProgress] = useState(0);
  const rafId = useRef<number>();
  const startedAt = useRef<number>();

  const tick = useCallback(
    (time: number) => {
      if (startedAt.current === undefined) startedAt.current = time;
      const p = Math.min(1, (time - startedAt.current) / HOLD_DURATION_MS);
      setProgress(p);
      if (p < 1) {
        rafId.current = requestAnimationFrame(tick);
      } else {
        onComplete(withAudio);
      }
    },
    [onComplete, withAudio]
  );

  const beginHold = () => {
    startedAt.current = undefined;
    rafId.current = requestAnimationFrame(tick);
  };

  const cancelHold = () => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    setProgress(0);
  };

  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const radius = 22;
  const circumference = 2 * Math.PI * radius;

  return (
    <button
      type="button"
      data-cursor="Click & Hold"
      onPointerDown={beginHold}
      onPointerUp={cancelHold}
      onPointerLeave={cancelHold}
      className="group relative flex items-center gap-3 py-2 text-xs uppercase tracking-wide"
      style={{ color: TOKENS.fg }}
    >
      <svg width={52} height={52} viewBox="0 0 52 52" className="-rotate-90">
        <circle
          cx={26}
          cy={26}
          r={radius}
          stroke={TOKENS.muted}
          strokeWidth={1}
          fill="none"
          opacity={0.35}
        />
        <circle
          cx={26}
          cy={26}
          r={radius}
          stroke={TOKENS.fg}
          strokeWidth={1.5}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress)}
        />
      </svg>
      <span className="opacity-70 transition-opacity group-hover:opacity-100">
        {label}
      </span>
    </button>
  );
}

// ---------------------------------------------------------------------------
// Preloader: gate -> wordmark reveal -> clip-path wipe out
// ---------------------------------------------------------------------------
function Preloader({ onFinished }: { onFinished: () => void }) {
  const [phase, setPhase] = useState<"gate" | "reveal" | "exit">("gate");

  const handleEnter = () => {
    setPhase("reveal");
    window.setTimeout(() => setPhase("exit"), 900);
    window.setTimeout(onFinished, 900 + 700);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ backgroundColor: TOKENS.bg }}
      animate={{
        clipPath:
          phase === "exit" ? "inset(0% 0% 100% 0%)" : "inset(0% 0% 0% 0%)",
      }}
      transition={{ duration: 0.7, ease: EASE_SIGNATURE }}
    >
      <div className="mb-10 flex text-[13vw] font-medium leading-none md:text-[6rem]">
        {WORDMARK.map((char, i) => (
          <span key={i} className="overflow-hidden">
            <motion.span
              className="inline-block"
              style={{ color: TOKENS.fg }}
              initial={{ y: "110%" }}
              animate={{ y: phase !== "gate" ? "0%" : "110%" }}
              transition={{
                duration: 0.8,
                ease: EASE_OUT_EXPO,
                delay: 0.05 * i,
              }}
            >
              {char}
            </motion.span>
          </span>
        ))}
      </div>

      {phase === "gate" && (
        <div className="flex items-center gap-8">
          <HoldToEnter label="Enter" withAudio onComplete={handleEnter} />
          <HoldToEnter
            label="Enter without audio"
            withAudio={false}
            onComplete={handleEnter}
          />
        </div>
      )}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Fixed top nav with numbered index (mirrors 01 Index / 02 Projects / ...)
// ---------------------------------------------------------------------------
function TopNav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-6 text-xs uppercase tracking-wide md:px-12">
      <a href="/" data-cursor="Home" className="font-medium">
        Unseen Studio®
      </a>
      <ul className="hidden gap-8 md:flex">
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              data-cursor={item.label}
              className="opacity-70 transition-opacity hover:opacity-100"
            >
              {item.n} {item.label}
            </a>
          </li>
        ))}
      </ul>
      <button type="button" data-cursor="Menu" className="md:hidden">
        Menu
      </button>
    </nav>
  );
}

// ---------------------------------------------------------------------------
// Hero copy: headline masks up word-by-word once `visible` flips true
// ---------------------------------------------------------------------------
function HeroCopy({ visible }: { visible: boolean }) {
  const words = HEADLINE.split(" ");

  return (
    <div className="flex min-h-[70vh] max-w-4xl flex-col justify-end pb-24">
      <h1 className="flex flex-wrap text-[7vw] font-medium leading-[1.05] md:text-6xl">
        {words.map((word, i) => (
          <span key={i} className="mr-[0.28em] overflow-hidden">
            <motion.span
              className="inline-block"
              initial={{ y: "110%" }}
              animate={{ y: visible ? "0%" : "110%" }}
              transition={{
                duration: 0.9,
                ease: EASE_OUT_EXPO,
                delay: 0.5 + i * 0.03,
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 12 }}
        transition={{
          duration: 0.6,
          ease: EASE_OUT_EXPO,
          delay: 0.5 + words.length * 0.03 + 0.2,
        }}
        className="mt-8 text-sm uppercase tracking-widest"
        style={{ color: TOKENS.muted }}
      >
        Scroll to explore
      </motion.p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Composed export
// ---------------------------------------------------------------------------
export default function UnseenHero() {
  const [entered, setEntered] = useState(false);
  const reduceMotion = useReducedMotion();
  const skipIntro = Boolean(reduceMotion);

  return (
    <>
      <GrainOverlay />
      <CustomCursor />

      {!entered && !skipIntro && (
        <Preloader onFinished={() => setEntered(true)} />
      )}

      <main
        className="relative min-h-screen overflow-hidden px-6 pt-32 md:px-12"
        style={{ backgroundColor: TOKENS.bg, color: TOKENS.fg }}
      >
        <TopNav />
        <HeroCopy visible={entered || skipIntro} />
      </main>
    </>
  );
}
