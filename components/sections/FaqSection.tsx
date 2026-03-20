import type { FaqItem } from "@/types/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

type FaqSectionProps = {
  title: string;
  lead?: string;
  items: FaqItem[];
  className?: string;
};

export function FaqSection({ title, lead, items, className }: FaqSectionProps) {
  return (
    <section className={cn("section-space border-t border-border-soft", className)}>
      <div className="container-default space-y-10">
        <SectionHeading title={title} lead={lead} />
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <article key={item.question} className="rounded-3xl border border-border bg-surface p-6">
              <h3 className="font-display text-xl font-semibold text-text">{item.question}</h3>
              <p className="mt-3 text-sm text-text-muted">{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
