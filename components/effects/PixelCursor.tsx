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

    const finePointerMedia = window.matchMedia("(pointer: fine)");
    const desktopMedia = window.matchMedia("(min-width: 768px)");
    let listening = false;

    const update = (event: PointerEvent) => {
      x.set(event.clientX - 14);
      y.set(event.clientY - 14);
    };

    const enableCursor = () => {
      if (!listening) {
        window.addEventListener("pointermove", update, { passive: true });
        listening = true;
      }

      setEnabled(true);
    };

    const disableCursor = () => {
      if (listening) {
        window.removeEventListener("pointermove", update);
        listening = false;
      }

      setEnabled(false);
    };

    const syncCursorState = () => {
      if (finePointerMedia.matches && desktopMedia.matches) {
        enableCursor();
        return;
      }

      disableCursor();
    };

    const timeoutId = window.setTimeout(syncCursorState, 0);
    finePointerMedia.addEventListener("change", syncCursorState);
    desktopMedia.addEventListener("change", syncCursorState);

    return () => {
      window.clearTimeout(timeoutId);
      finePointerMedia.removeEventListener("change", syncCursorState);
      desktopMedia.removeEventListener("change", syncCursorState);
      if (listening) {
        window.removeEventListener("pointermove", update);
      }
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
      className="pixel-cursor pointer-events-none fixed left-0 top-0 z-[70] h-7 w-7 rounded-md border"
      style={style}
    />
  );
}

