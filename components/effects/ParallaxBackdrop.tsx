"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export function ParallaxBackdrop() {
  const { scrollY } = useScroll();
  const reducedMotion = useReducedMotion();

  const layerA = useTransform(scrollY, [0, 2400], [0, -120]);
  const layerB = useTransform(scrollY, [0, 2400], [0, 180]);
  const layerC = useTransform(scrollY, [0, 2400], [0, -80]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="parallax-base" />

      <motion.div
        className="parallax-layer parallax-layer-a"
        style={reducedMotion ? undefined : { y: layerA }}
      />

      <motion.div
        className="parallax-layer parallax-layer-b"
        style={reducedMotion ? undefined : { y: layerB }}
      />

      <motion.div
        className="parallax-layer parallax-layer-c"
        style={reducedMotion ? undefined : { y: layerC }}
      />

      <div className="parallax-grid" />
    </div>
  );
}
