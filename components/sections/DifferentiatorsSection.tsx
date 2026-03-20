"use client";

import type { Dictionary } from "@/types/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";

type DifferentiatorsSectionProps = {
  dictionary: Dictionary;
};

export function DifferentiatorsSection({ dictionary }: DifferentiatorsSectionProps) {
  return (
    <section className="section-space border-t border-border-soft">
      <div className="container-default space-y-10">
        <SectionHeading
          title={dictionary.home.differentiatorsTitle}
          lead={dictionary.home.differentiatorsLead}
        />
        <Stagger className="grid gap-4 md:grid-cols-3">
          {dictionary.home.differentiators.map((item, index) => (
            <StaggerItem key={item.title}>
              <article className="glass-panel rounded-3xl p-6">
                <p className="text-xs uppercase tracking-[0.16em] text-text-muted">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold text-text">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-text-muted">{item.detail}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
