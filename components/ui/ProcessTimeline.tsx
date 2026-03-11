"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ProcessStep } from "@/types/content";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type ProcessTimelineProps = {
  items: ProcessStep[];
  compact?: boolean;
};

export function ProcessTimeline({ items, compact = false }: ProcessTimelineProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = wrapperRef.current;

    if (!section) {
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce || compact) {
      return;
    }

    const cards = section.querySelectorAll("[data-step-card]");

    const animation = gsap.fromTo(
      cards,
      { opacity: 0.4, y: 26 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.14,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "bottom 42%",
          scrub: 0.5,
        },
      },
    );

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [compact]);

  return (
    <div ref={wrapperRef} className="grid gap-4 md:grid-cols-2">
      {items.map((item, index) => (
        <article
          key={item.title}
          data-step-card
          className={cn(
            "rounded-3xl border border-white/15 bg-bg-soft/70 p-6",
            !compact && index === 1 ? "md:translate-y-8" : "",
            !compact && index === 3 ? "md:translate-y-8" : "",
          )}
        >
          <p className="text-xs uppercase tracking-[0.16em] text-brand">Step {index + 1}</p>
          <h3 className="mt-3 font-display text-2xl font-semibold text-white">{item.title}</h3>
          <p className="mt-3 text-sm text-text-muted">{item.detail}</p>
        </article>
      ))}
    </div>
  );
}

