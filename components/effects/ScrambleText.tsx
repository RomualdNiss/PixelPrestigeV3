"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*/<>";

type ScrambleTextProps = {
  text: string;
  className?: string;
  durationMs?: number;
};

// Effet "décodage" rétro-arcade : les caractères défilent puis se stabilisent.
// Hydration-safe : l'état initial est le texte final (rendu identique SSR/client),
// l'animation démarre ensuite au montage. Désactivé sous prefers-reduced-motion.
// Le texte réel est exposé via aria-label pour les lecteurs d'écran.
export function ScrambleText({ text, className, durationMs = 900 }: ScrambleTextProps) {
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    // Reduced motion : on laisse le texte final (état initial), pas d'animation.
    if (reduced) {
      return;
    }

    const totalFrames = Math.max(1, Math.round(durationMs / 33));
    let frame = 0;

    const intervalId = window.setInterval(() => {
      frame += 1;
      const progress = frame / totalFrames;
      const revealCount = Math.floor(progress * text.length);

      const next = text
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (index < revealCount) return char;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join("");

      setDisplay(next);

      if (frame >= totalFrames) {
        setDisplay(text);
        window.clearInterval(intervalId);
      }
    }, 33);

    return () => window.clearInterval(intervalId);
  }, [text, reduced, durationMs]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden>{display}</span>
    </span>
  );
}
