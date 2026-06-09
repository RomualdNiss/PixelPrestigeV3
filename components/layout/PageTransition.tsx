"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

// Transition d'entrée subtile à chaque navigation client (fondu + léger glissement).
// IMPORTANT : on n'anime PAS le premier rendu (chargement initial) pour ne pas
// masquer le hero (élément LCP) ni créer de flash sans JS — `initial={false}` rend
// le contenu visible immédiatement. L'animation ne se déclenche qu'aux navigations
// suivantes. Désactivée si l'utilisateur préfère réduire les animations.
export function PageTransition({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const firstRender = useRef(true);
  const isFirstRender = firstRender.current;

  useEffect(() => {
    firstRender.current = false;
  }, [pathname]);

  if (reduced) {
    return <>{children}</>;
  }

  return (
    <motion.div
      key={pathname}
      initial={isFirstRender ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
