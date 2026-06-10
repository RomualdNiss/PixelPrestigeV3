"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

// Halos lumineux globaux qui dérivent en parallax au scroll — présents derrière
// tout le contenu, sur toutes les pages (pas seulement le hero). Calque fixe :
// les lumières restent visibles en dérivant. Statiques sous reduced-motion.
export function ParallaxGlow() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();

  // Dérive proportionnelle au scroll (continue, sans plafond) → mouvement bien
  // visible même sur les pages longues. Facteurs et sens différents = profondeur.
  const yA = useTransform(scrollY, (v) => v * 0.28);
  const xA = useTransform(scrollY, (v) => v * 0.12);
  const yB = useTransform(scrollY, (v) => v * -0.5);
  const yC = useTransform(scrollY, (v) => v * -0.32);

  // z-index auto : par ordre DOM, le calque est rendu après le fond (shader) donc
  // au-dessus, mais avant main/footer donc sous le contenu.
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      <motion.div className="parallax-glow parallax-glow-a" style={reduced ? undefined : { y: yA, x: xA }} />
      <motion.div className="parallax-glow parallax-glow-b" style={reduced ? undefined : { y: yB }} />
      <motion.div className="parallax-glow parallax-glow-c" style={reduced ? undefined : { y: yC }} />
    </div>
  );
}
