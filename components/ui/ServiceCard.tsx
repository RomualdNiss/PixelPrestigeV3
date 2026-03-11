"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ServiceItem } from "@/types/content";

type ServiceCardProps = {
  item: ServiceItem;
};

export function ServiceCard({ item }: ServiceCardProps) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      whileHover={
        reduced
          ? undefined
          : {
              y: -6,
              rotateX: 1,
            }
      }
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="glass-panel h-full rounded-3xl p-6"
    >
      <p className="text-xs uppercase tracking-[0.2em] text-brand">{item.id}</p>
      <h3 className="mt-3 font-display text-2xl font-semibold text-white">{item.title}</h3>
      <p className="mt-3 text-sm text-text-muted">{item.summary}</p>
      <ul className="mt-4 space-y-2 text-sm text-white/90">
        {item.bullets.map((bullet) => (
          <li key={bullet} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            {bullet}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

