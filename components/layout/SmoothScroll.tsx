"use client";

import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Smooth scroll cinématique (Lenis) synchronisé avec GSAP ScrollTrigger
// (déjà utilisé par ProcessTimeline). Lenis v1 pilote la vraie position de scroll
// (pas de transform) → les éléments fixed/sticky restent intacts.
// Désactivé sous prefers-reduced-motion ; scroll tactile natif conservé.
export function SmoothScroll() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    });

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.off("scroll", onScroll);
      lenis.destroy();
    };
  }, [reduced]);

  return null;
}
