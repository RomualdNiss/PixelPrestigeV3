"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ParallaxBackdrop } from "@/components/effects/ParallaxBackdrop";

const ShaderCanvas = dynamic(
  () => import("@/components/three/ArcadeBackgroundCanvas").then((m) => m.ArcadeBackgroundCanvas),
  { ssr: false, loading: () => null },
);

function hasWebGL(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
  return Boolean(ctx);
}

// Fond du site : shader pixel/dither interactif sur desktop WebGL, sinon repli sur
// le parallax CSS existant. Le parallax sert aussi de rendu initial (SSR + 1er
// paint) pour éviter tout fond vide.
export function ArcadeBackground() {
  const reduced = useReducedMotion();
  const [useShader, setUseShader] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if (reduced) {
        setUseShader(false);
        return;
      }
      const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
      setUseShader(!coarsePointer && hasWebGL());
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [reduced]);

  if (useShader) {
    return (
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <ShaderCanvas />
      </div>
    );
  }

  return <ParallaxBackdrop />;
}
