import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import AudioTriggerHandler from "@/components/AudioTriggerHandler";
import AiAssistant from "@/components/AiAssistant";

export const metadata: Metadata = {
  title: "Abhay Jangid — Cloud, DevOps & Creative Technologist",
  description: "Personal developer portfolio and interactive digital experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-sand text-carbon font-sans antialiased selection:bg-carbon selection:text-sand">
        {/* CRITICAL GUARDRAIL: Fixed pointer-events-none film grain overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-50 opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E\")",
          }}
        />

        <AudioTriggerHandler />
        <SmoothScroll>
          {children}
          <AiAssistant />
        </SmoothScroll>
      </body>
    </html>
  );
}
