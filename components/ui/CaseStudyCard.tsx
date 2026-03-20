"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CaseStudy } from "@/types/content";

type CaseStudyCardProps = {
  item: CaseStudy;
};

export function CaseStudyCard({ item }: CaseStudyCardProps) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      whileHover={
        reduced
          ? undefined
          : {
              y: -6,
            }
      }
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="group rounded-3xl border border-border bg-surface p-6 transition-colors hover:border-brand/60"
    >
      <p className="text-xs uppercase tracking-[0.17em] text-text-muted">{item.domain}</p>
      <h3 className="mt-2 font-display text-2xl font-semibold text-text">{item.title}</h3>
      <p className="mt-3 text-sm text-text-muted">{item.challenge}</p>
      <p className="mt-4 text-sm font-medium text-text">{item.impact}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {item.stack.map((tag) => (
          <span key={tag} className="rounded-full border border-border px-3 py-1 text-xs text-text-muted">
            {tag}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

