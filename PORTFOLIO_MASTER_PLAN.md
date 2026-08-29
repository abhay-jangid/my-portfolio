# PORTFOLIO MASTER PLAN: 1:1 UNSEEN.CO REPLICA (ABHAY JANGID)

## 1. PROJECT VISION & IDENTITY
- **Target Experience:** 1:1 functional & motion replica of the iconic `unseen.co/projects` digital studio experience.
- **Developer:** Abhay Jangid (Cloud & DevOps Engineer · Full-Stack & AI Technologist).
- **Institution:** JIET University, Jodhpur, Rajasthan, India.
- **Contact Channels:**
  - **Email:** `abhayjangid2929@gmail.com`
  - **Phone:** `+91 63779 01958`
  - **GitHub:** [https://github.com/abhay-jangid](https://github.com/abhay-jangid)
  - **LinkedIn:** [https://linkedin.com/in/abhay-jangid-046305396/](https://linkedin.com/in/abhay-jangid-046305396/)
- **Timezone & Location Anchor:** `Asia/Kolkata` (IST, GMT+5:30) for the live studio clock and geographic coordinates.

---

## 2. DESIGN TOKENS & ATOMIC CONSTANTS

### Canvas Colors & Surfaces
- **Base Sand:** `#F4EFEB` (Primary light canvas / editorial contrast)
- **Carbon / Dark Surface:** `#1A1918` (Primary dark canvas & drawer container)
- **Deep Charcoal:** `#121212` (State 1 Gateway & foundational background)
- **Accent Coral:** `#FF4438` (Interactive triggers, badges, audio indicators, live status)
- **Muted Slate:** `#7D7A75` (Secondary metadata, borders, inactive states)
- **3D Pastel Architecture Palette:**
  - Base Structure: `#E8D7C9`
  - Highlit Façade: `#F3E5D8`
  - Soft Shadow Recesses: `#E5D1C3`

### Typography Matrix (Configured via `next/font/google`)
- **Display / Editorial Serif:** `Instrument_Serif` (`--font-serif`, weight `400`, italic & normal)
- **UI Sans:** `Inter` (`--font-sans`, weights `300`, `400`, `500`, `600`)
- **Numerals & Clock Mono:** `JetBrains_Mono` (`--font-mono`, weights `400`, `500`)

### Motion Easings & Springs
- **`EASE_OUT_EXPO`:** `cubic-bezier(0.16, 1, 0.3, 1)` (Snappy UI reveals and card popups)
- **`EASE_SIGNATURE`:** `cubic-bezier(0.76, 0, 0.24, 1)` (Curtain wipes, drawer clip-paths)
- **Eye Pupil Spring:** `{ stiffness: 450, damping: 28, mass: 0.4 }`
- **Contextual Cursor Spring:** `{ stiffness: 500, damping: 40, mass: 0.4 }`
- **Lenis Virtual Scroll Config:**
  - `duration: 1.2`
  - `smoothWheel: true`
  - `wheelMultiplier: 1.0`
  - `touchMultiplier: 1.5`

---

## 3. MASTER FILE STRUCTURE

```
d:/MY/Project/Web project/Portfolio/
├── app/
│   ├── layout.tsx             # Root layout, Google Fonts, SmoothScroll wrapper, fixed grain overlay
│   ├── page.tsx               # Orchestrates State 1 (Gateway) & State 2 (Main Showcase)
│   └── globals.css            # Tailwind directives, Lenis resets, custom selection styles
├── components/
│   ├── Hero3DCanvas.tsx       # R3F canvas, sinusoidal water shader plane, cursor-following glossy sphere
│   ├── MascotEyes.tsx         # Dual vector eye sockets, atan2 pointer kinematics, blinks, heart-morphs
│   ├── MenuDrawer.tsx         # Full-screen clip-path nav, route image hover previews, live IST clock
│   ├── ProjectsGrid.tsx       # 2-column bento grid, category filters, layout animations, hover badges
│   └── SmoothScroll.tsx       # Lenis virtual smooth scroll provider with rAF cleanup
├── data/
│   └── projects.json          # Portfolio case studies (Ad Generator, Route Optimizer, Expiry Alert, EVOLV)
├── lib/
│   ├── audioEngine.ts         # In-browser Web Audio API oscillator synthesis (ticks, pops, chimes, drones)
│   └── utils.ts               # Class merging utilities (clsx + tailwind-merge)
└── public/
    └── projects/              # 1600x1100 WebP showcase media
```

---

## 4. MATHEMATICAL MODELS & SHADER FORMULAS

### 1. Vector Eye Kinematics (`MascotEyes.tsx`)
For an eye socket with bounding box center $(cx, cy)$ and global cursor coordinates $(px, py)$:
- Direction vectors:
  $$\Delta x = px - cx, \quad \Delta y = py - cy$$
- Angle of gaze:
  $$\theta = \operatorname{atan2}(\Delta y, \Delta x)$$
- Hypotenuse distance:
  $$\text{dist} = \sqrt{\Delta x^2 + \Delta y^2}$$
- Radial pupil constraint (maximum displacement $18\text{px}$):
  $$\text{clampedDist} = \min(\text{dist} \times 0.08, 18\text{px})$$
- Projected pupil coordinates:
  $$\text{pupilX} = \cos(\theta) \times \text{clampedDist}$$
  $$\text{pupilY} = \sin(\theta) \times \text{clampedDist}$$

### 2. Autonomous Blinking & Expression State Machine
- **Blink Cycle:**
  - Close duration: $80\text{ms}$
  - Open duration: $140\text{ms}$
  - Random interval: $[2500\text{ms}, 5500\text{ms}]$
- **Squint / Focus Override (on hover):**
  - Upper eyelid vertical scale: clamped to $45\%$
  - Lower eyelid vertical scale: clamped to $25\%$
- **Love / Delight Morph (on click & hold):**
  - Pupil scale transform to SVG heart geometry path with $1.25\times$ scale burst.

### 3. Water Ripple Vertex Shader (`Hero3DCanvas.tsx`)
Sinusoidal displacement on a subdiv plane ($64 \times 64$ segments):
$$z = \sin(x \cdot 2.0 + uTime \cdot 1.5) \cdot 0.08 + \cos(y \cdot 1.8 + uTime \cdot 1.2) \cdot 0.08$$
- Normal recalculation via finite difference on vertex displacement for realistic specular highlights.

### 4. Audio Engine Synthesizer (`audioEngine.ts`)
- **Radial Hold Ticking:** Exponential frequency ramping pulse oscillator ($120\text{Hz} \to 440\text{Hz}$) every $50\text{ms}$.
- **Gateway Entry Chime:** Dual chord sine waves ($523.25\text{Hz}$ C5 + $659.25\text{Hz}$ E5) with exponential decay envelope ($0.8\text{s}$).
- **Card Hover Pop:** High-Q bandpass filtered noise burst ($45\text{ms}$, center freq $1800\text{Hz}$).
- **Ambient Drone (Optional):** Low pass filtered dual detuned triangle oscillators ($55\text{Hz}$ and $55.4\text{Hz}$) with subtle LFO modulation.

---

## 5. 5-PHASE EXECUTION ROADMAP

- **Phase 1: Architecture Lock & Master Plan (Current Phase)**
  - Write and lock `PORTFOLIO_MASTER_PLAN.md` in workspace root.
  - Establish complete design constants, mathematical equations, component hierarchy, and roadmap.

- **Phase 2: Foundation, Tokens, Google Fonts & Lenis Scroll**
  - Configure `tailwind.config.ts`, `globals.css` with exact palette tokens and Lenis virtual scrolling directives.
  - Implement `SmoothScroll.tsx` with requestAnimationFrame loop and proper cleanup.
  - Set up `app/layout.tsx` with `Instrument_Serif`, `Inter`, `JetBrains_Mono`, and global pointer-events-safe film grain overlay.

- **Phase 3: Mascot Gaze Kinematics & Audio Synthesis**
  - Build `lib/audioEngine.ts` using zero-dependency Web Audio API oscillator chains.
  - Build `components/MascotEyes.tsx` featuring vector atan2 tracking, spring-smoothed pupils, procedural eyelids, and expression states.
  - Construct State 1 Gateway in `app/page.tsx` with "Click & Hold" radial SVG progress loader, audio consent bifurcation, and per-letter headline reveal.

- **Phase 4: WebGL 3D Architectural Water Scene**
  - Implement `components/Hero3DCanvas.tsx` using `@react-three/fiber` and `@react-three/drei`.
  - Craft custom GLSL vertex and fragment shaders for the pastel architectural pool and sinusoidal wave ripples.
  - Integrate interactive glossy sphere with smooth raycasted pointer lag and refraction properties.

- **Phase 5: Projects Showcase, Slide-Out Menu & Production Polish**
  - Populate `data/projects.json` with Abhay Jangid's flagship works (AI Ad Generator, Smart Route Optimizer, Expiry Alert System, EVOLV).
  - Implement `components/ProjectsGrid.tsx` with responsive 2-column bento cards, category tabs, hover badges, and layout animations.
  - Implement `components/MenuDrawer.tsx` featuring full-screen clip-path transitions, live IST studio clock, and thumbnail hover transitions.
  - Perform browser verification for zero hydration mismatch, responsive mobile viewports, and sustained 60 FPS performance.

---

## 6. CRITICAL GUARDRAILS & QUALITY CRITERIA

1. **Click Interception Prevention:**
   - All ambient background layers (SVG turbulence noise, fixed gradients, decorative particles) MUST explicitly include `pointer-events-none` so interactive CTA buttons, cards, and links remain unobstructed.
2. **Zero Hydration Mismatch:**
   - Guard all browser APIs (`AudioContext`, `window.matchMedia`, `window.innerWidth`, `new Date()`) behind an `isMounted` or `useEffect` check.
3. **Aspect Ratio Stability & CLS = 0:**
   - Every media thumbnail inside `ProjectsGrid.tsx` must maintain a rigid `16:11` or `1:1` aspect-ratio container with progressive blur placeholder load states.
4. **Accessible Graceful Degradation:**
   - Wrap interactive WebGL/audio components with `prefers-reduced-motion` and audio-disabled fallback states.
