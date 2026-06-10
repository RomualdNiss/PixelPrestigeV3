"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

// Hauteur d'un "champ" de halos, répété verticalement pour une couverture infinie.
const FIELD_H = 1200;
// Vitesse du parallax (fraction de la vitesse de scroll).
const FACTOR = 0.5;

type Orb = {
  top: number; // position verticale en % du champ
  left?: number; // % depuis la gauche
  right?: number; // % depuis la droite
  size: number; // rem
  color: string;
  opacity: number;
};

// Halos répartis sur toute la hauteur du champ → toujours une lumière en vue.
const ORBS: Orb[] = [
  { top: 10, left: 4, size: 36, color: "rgba(165, 41, 255, 0.6)", opacity: 0.6 },
  { top: 42, right: 2, size: 40, color: "rgba(140, 0, 255, 0.5)", opacity: 0.55 },
  { top: 74, left: 32, size: 34, color: "rgba(130, 60, 255, 0.5)", opacity: 0.5 },
];

function Field() {
  return (
    <div className="relative w-full" style={{ height: `${FIELD_H}px` }}>
      {ORBS.map((orb, index) => (
        <span
          key={index}
          className="parallax-glow"
          style={{
            top: `${(orb.top / 100) * FIELD_H}px`,
            left: orb.left != null ? `${orb.left}%` : undefined,
            right: orb.right != null ? `${orb.right}%` : undefined,
            width: `${orb.size}rem`,
            height: `${orb.size}rem`,
            background: `radial-gradient(circle, ${orb.color}, transparent 68%)`,
            opacity: orb.opacity,
          }}
        />
      ))}
    </div>
  );
}

// Lumières en parallax infini : un champ de halos dupliqué et translaté en boucle.
// Présentes à toute position de scroll et sur toutes les pages. Statiques sous
// reduced-motion. z-index auto : rendu après le fond, sous le contenu.
export function ParallaxGlow() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();

  // Translation bouclée dans (-FIELD_H, 0] → les deux champs empilés se relaient
  // sans couture, donc toujours des halos en vue.
  const y = useTransform(scrollY, (v) => {
    const wrapped = (-(v * FACTOR) % FIELD_H);
    return wrapped > 0 ? wrapped - FIELD_H : wrapped;
  });

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      <motion.div className="parallax-glow-layer absolute inset-x-0 top-0" style={reduced ? undefined : { y }}>
        <Field />
        <Field />
      </motion.div>
    </div>
  );
}
