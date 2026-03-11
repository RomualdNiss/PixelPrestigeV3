"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export function PixelCursor() {
  const reducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const springX = useSpring(x, { stiffness: 280, damping: 28, mass: 0.28 });
  const springY = useSpring(y, { stiffness: 280, damping: 28, mass: 0.28 });

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const media = window.matchMedia("(pointer:fine)");

    if (!media.matches) {
      return;
    }

    const update = (event: PointerEvent) => {
      x.set(event.clientX - 14);
      y.set(event.clientY - 14);
    };

    const timeoutId = window.setTimeout(() => {
      setEnabled(true);
    }, 0);
    window.addEventListener("pointermove", update, { passive: true });

    return () => {
      window.removeEventListener("pointermove", update);
      window.clearTimeout(timeoutId);
      window.setTimeout(() => {
        setEnabled(false);
      }, 0);
    };
  }, [reducedMotion, x, y]);

  const style = useMemo(
    () => ({
      x: springX,
      y: springY,
    }),
    [springX, springY],
  );

  if (!enabled || reducedMotion) {
    return null;
  }

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[70] h-7 w-7 rounded-md border border-white/50 bg-brand/25 mix-blend-screen"
      style={style}
    />
  );
}

