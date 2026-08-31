import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "Fira Code", "monospace"],
      },
      colors: {
        // Deep Space Mission Control Base Surfaces
        "bg-primary": "var(--bg-primary)",
        "bg-surface": "var(--bg-surface)",
        "bg-subtle": "var(--bg-subtle)",
        "bg-light": "var(--bg-light)",
        "bg-light-wash": "var(--bg-light-wash)",

        // Typography
        "text-main": "var(--text-main)",
        "text-muted": "var(--text-muted)",
        "text-ink": "var(--text-ink)",

        // Accent Quartet
        accent: {
          blue: "var(--accent-blue)",
          cyan: "var(--accent-cyan)",
          violet: "var(--accent-violet)",
          gold: "var(--accent-gold)",
        },

        // Legacy / Palette Aliases
        obsidian: "#03040B",
        surface: "#0A0E1A",
        "surface-card": "#131B2E",
        "surface-elevated": "#1A243B",
        "surface-border": "rgba(59, 130, 246, 0.2)",
      },
      transitionTimingFunction: {
        "expo-out": "cubic-bezier(0.16, 1, 0.3, 1)",
        signature: "cubic-bezier(0.76, 0, 0.24, 1)",
      },
      aspectRatio: {
        "16/11": "16 / 11",
      },
      boxShadow: {
        "glow-blue": "0 0 25px -5px rgba(59, 130, 246, 0.35)",
        "glow-cyan": "0 0 25px -5px rgba(6, 182, 212, 0.35)",
        "glow-violet": "0 0 25px -5px rgba(139, 92, 246, 0.35)",
        "glow-gold": "0 0 25px -5px rgba(251, 191, 36, 0.30)",
        "glass-sm": "0 10px 25px -5px rgba(0, 0, 0, 0.6), 0 0 20px -5px rgba(59, 130, 246, 0.12)",
        "glass-lg": "0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 30px -10px rgba(59, 130, 246, 0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
