"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

// Halos lumineux globaux qui dérivent en parallax au scroll — présents derrière
// tout le contenu, sur toutes les pages (pas seulement le hero). Calque fixe :
// les lumières restent visibles en dérivant. Statiques sous reduced-motion.
export function ParallaxGlow() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();

  const yA = useTransform(scrollY, [0, 3000], [0, -280]);
  const xA = useTransform(scrollY, [0, 3000], [0, 70]);
  const yB = useTransform(scrollY, [0, 3000], [0, 220]);
  const yC = useTransform(scrollY, [0, 3000], [0, -150]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-[5] overflow-hidden">
      <motion.div className="parallax-glow parallax-glow-a" style={reduced ? undefined : { y: yA, x: xA }} />
      <motion.div className="parallax-glow parallax-glow-b" style={reduced ? undefined : { y: yB }} />
      <motion.div className="parallax-glow parallax-glow-c" style={reduced ? undefined : { y: yC }} />
    </div>
  );
}
