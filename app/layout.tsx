import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import AudioTriggerHandler from "@/components/AudioTriggerHandler";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Abhay Jangid — Cloud & DevOps Engineer",
  description:
    "High-performance interactive developer portfolio engineered with Next.js, React Three Fiber, and WebGL.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#020617] text-[#F8FAFC] font-sans antialiased selection:bg-cyan-500 selection:text-white min-h-screen relative">
        {/* Ambient Audio Handler */}
        <AudioTriggerHandler />

        {/* Momentum Smooth Scroll Container */}
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
