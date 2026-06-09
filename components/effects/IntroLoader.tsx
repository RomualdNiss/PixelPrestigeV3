"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ScrambleText } from "@/components/effects/ScrambleText";

const SESSION_KEY = "pp_intro_seen";
const DURATION_MS = 1500;

// Intro de marque au tout premier chargement de la session (sessionStorage).
// Rendu uniquement côté client : aucun overlay au SSR → le contenu reste présent et
// le LCP n'est pas bloqué pour les crawlers / sans JS. One-time, skippable, et
// totalement ignoré sous prefers-reduced-motion.
export function IntroLoader() {
  const reduced = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const startId = window.setTimeout(() => {
      if (reduced || sessionStorage.getItem(SESSION_KEY)) {
        return;
      }
      sessionStorage.setItem(SESSION_KEY, "1");
      setShow(true);
    }, 0);

    return () => window.clearTimeout(startId);
  }, [reduced]);

  useEffect(() => {
    if (!show) {
      return;
    }

    const dismiss = () => setShow(false);
    const autoHide = window.setTimeout(dismiss, DURATION_MS);

    window.addEventListener("keydown", dismiss);
    window.addEventListener("pointerdown", dismiss);
    window.addEventListener("wheel", dismiss, { passive: true });

    return () => {
      window.clearTimeout(autoHide);
      window.removeEventListener("keydown", dismiss);
      window.removeEventListener("pointerdown", dismiss);
      window.removeEventListener("wheel", dismiss);
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          aria-hidden
          role="presentation"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg dither"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.p
            className="pixel-label text-2xl text-text md:text-4xl"
            initial={{ opacity: 0, filter: "blur(6px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
          >
            <ScrambleText text="PIXEL PRESTIGE" durationMs={1000} />
          </motion.p>

          <div className="mt-6 h-1 w-40 overflow-hidden rounded-full bg-surface-subtle">
            <motion.div
              className="h-full bg-brand"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </div>

          <p className="pixel-label mt-4 text-[0.6rem] tracking-[0.3em] text-text-muted">LOADING</p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
