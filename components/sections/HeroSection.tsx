"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/i18n";
import type { Dictionary } from "@/types/content";
import { MagneticButton } from "@/components/ui/MagneticButton";

const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas").then((mod) => mod.HeroCanvas), {
  ssr: false,
  loading: () => null,
});

type HeroSectionProps = {
  locale: Locale;
  dictionary: Dictionary;
};

function hasWebGL(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
  return Boolean(context);
}

export function HeroSection({ locale, dictionary }: HeroSectionProps) {
  const reducedMotion = useReducedMotion();
  const [use3D, setUse3D] = useState(false);
  const [webglIssue, setWebglIssue] = useState(false);
  const [cubeQuality, setCubeQuality] = useState<"high" | "low">("high");
  const [hero3DKey, setHero3DKey] = useState(0);

  useEffect(() => {
    if (reducedMotion) {
      const timeoutId = window.setTimeout(() => {
        setUse3D(false);
        setWebglIssue(false);
      }, 0);

      return () => {
        window.clearTimeout(timeoutId);
      };
    }

    const timeoutId = window.setTimeout(() => {
      const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

      if (coarsePointer) {
        setUse3D(false);
        setWebglIssue(false);
        return;
      }

      setUse3D(hasWebGL());
      setWebglIssue(false);
      setCubeQuality("high");
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [reducedMotion]);

  return (
    <section className="relative overflow-hidden pb-16 pt-20 md:pb-24 md:pt-24">
      <span className="glow-dot glow-a -left-28 top-6" />
      <span className="glow-dot glow-b -right-24 bottom-8" />

      {use3D ? (
        <HeroCanvas
          key={hero3DKey}
          className="absolute inset-y-0 right-[1%] hidden w-[408px] md:block lg:right-[4%] lg:w-[504px] xl:right-[7%] xl:w-[592px]"
          hitAreaClassName="absolute inset-x-0 top-[53%] z-30 h-[400px] -translate-y-1/2 lg:h-[496px] xl:h-[584px]"
          frameClassName="absolute right-0 top-[53%] z-0 h-[360px] w-[360px] -translate-y-1/2 lg:h-[440px] lg:w-[440px] xl:h-[520px] xl:w-[520px]"
          quality={cubeQuality}
          onContextLost={() => {
            if (cubeQuality === "high") {
              setCubeQuality("low");
              setHero3DKey((value) => value + 1);
              return;
            }

            setWebglIssue(true);
            setUse3D(false);
          }}
        />
      ) : (
        <motion.div
          className="pointer-events-none absolute right-[2%] top-[53%] z-0 hidden h-[340px] w-[340px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(165,41,255,0.34),rgba(140,0,255,0.18)_42%,transparent_70%)] blur-xl md:block lg:right-[5%] lg:h-[420px] lg:w-[420px] xl:right-[8%] xl:h-[500px] xl:w-[500px]"
          animate={
            reducedMotion
              ? undefined
              : {
                  scale: [1, 1.05, 1],
                  opacity: [0.85, 1, 0.85],
                }
          }
          transition={{ duration: 10, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }}
        />
      )}

      <div className="container-default relative z-20 min-h-[560px]">
        <div className="max-w-2xl py-14 md:py-20">
          <p className="eyebrow-badge text-xs uppercase tracking-[0.22em]">{dictionary.home.hero.kicker}</p>
          <h1 className="mt-4 max-w-2xl font-display text-5xl font-semibold leading-[1.02] text-white md:text-6xl lg:text-7xl">
            {dictionary.home.hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-base text-text-muted md:text-lg">{dictionary.home.hero.subtitle}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <MagneticButton href={localizedPath(locale, "/contact")} className="btn-primary">
              {dictionary.home.hero.primaryCta}
              <ArrowUpRight size={16} />
            </MagneticButton>
            <Link href={localizedPath(locale, "/realisations")} className="btn-secondary">
              {dictionary.home.hero.secondaryCta}
            </Link>
          </div>

          <ul className="mt-8 flex flex-wrap items-center gap-2">
            {dictionary.home.trustLine.map((item) => (
              <li key={item} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-text-muted">
                {item}
              </li>
            ))}
          </ul>

          {webglIssue ? (
            <p className="mt-5 max-w-md text-sm text-text-muted">
              {locale === "fr"
                ? "WebGL a ete coupe par le GPU (context lost). Le fallback visuel est active."
                : "WebGL was disabled by the GPU (context lost). Visual fallback is active."}
            </p>
          ) : cubeQuality === "low" ? (
            <p className="mt-5 max-w-md text-sm text-text-muted">
              {locale === "fr"
                ? "Mode 3D stabilise actif : style conserve, fidelite reduite pour soulager votre GPU."
                : "Stabilized 3D mode active: same style, reduced fidelity to ease GPU load."}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
