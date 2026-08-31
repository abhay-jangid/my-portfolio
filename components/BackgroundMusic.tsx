"use client";

import { useEffect } from "react";
import { soundFx } from "@/lib/audioEngine";

interface BackgroundMusicProps {
  shouldPlay: boolean; // Triggered when user clicks Initialize Terminal
}

export default function BackgroundMusic({ shouldPlay }: BackgroundMusicProps) {
  useEffect(() => {
    if (shouldPlay) {
      soundFx.startBgm();
    } else {
      soundFx.stopBgm();
    }
  }, [shouldPlay]);

  return null; // Renders nothing visual on screen
}
