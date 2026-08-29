"use client";

import { useEffect } from "react";
import { soundFx } from "@/lib/audioEngine";

export default function AudioTriggerHandler() {
  useEffect(() => {
    const handleFirstInteraction = () => {
      soundFx.initBgm();
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("scroll", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction, { once: true });
    window.addEventListener("scroll", handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("scroll", handleFirstInteraction);
    };
  }, []);

  return null;
}
