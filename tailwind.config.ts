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
        serif: ["var(--font-serif)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        sand: "#F4EFEB",
        carbon: "#1A1918",
        charcoal: "#121212",
        coral: "#FF4438",
        slate: "#7D7A75",
        "pastel-base": "#E8D7C9",
        "pastel-light": "#F3E5D8",
        "pastel-shadow": "#E5D1C3",
      },
      transitionTimingFunction: {
        "expo-out": "cubic-bezier(0.16, 1, 0.3, 1)",
        signature: "cubic-bezier(0.76, 0, 0.24, 1)",
      },
      aspectRatio: {
        "16/11": "16 / 11",
      },
    },
  },
  plugins: [],
};

export default config;
