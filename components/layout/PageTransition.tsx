"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

// Devient vrai après le tout premier montage (persistant entre navigations car le
// layout reste monté). Permet de NE PAS animer le 1er rendu (protège le LCP du hero
// et évite tout flash sans JS) tout en animant les navigations suivantes — sans
// lire de ref ni appeler setState pendant le rendu.
let hasMounted = false;

// Transition d'entrée subtile à chaque navigation client (fondu + léger glissement).
// Désactivée si l'utilisateur préfère réduire les animations.
export function PageTransition({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const animateOnMount = hasMounted;

  useEffect(() => {
    hasMounted = true;
  }, []);

  if (reduced) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Balayage pixelisé rejoué à chaque navigation (pas au 1er chargement). */}
      {animateOnMount ? <span key={pathname} className="arcade-wipe" aria-hidden /> : null}
      <motion.div
        key={pathname}
        initial={animateOnMount ? { opacity: 0, y: 8 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
