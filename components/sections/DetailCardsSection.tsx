import type { DetailCardItem } from "@/types/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

type DetailCardsSectionProps = {
  title: string;
  lead?: string;
  items: DetailCardItem[];
  columns?: 2 | 3;
  className?: string;
};

export function DetailCardsSection({
  title,
  lead,
  items,
  columns = 2,
  className,
}: DetailCardsSectionProps) {
  return (
    <section className={cn("section-space border-t border-white/10", className)}>
      <div className="container-default space-y-10">
        <SectionHeading title={title} lead={lead} />
        <div className={cn("grid gap-4", columns === 3 ? "md:grid-cols-2 xl:grid-cols-3" : "md:grid-cols-2")}>
          {items.map((item) => (
            <article key={item.title} className="glass-panel rounded-3xl p-6">
              {item.eyebrow ? <p className="eyebrow-badge text-xs uppercase tracking-[0.16em]">{item.eyebrow}</p> : null}
              <h3 className="mt-3 font-display text-2xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm text-text-muted">{item.detail}</p>
              {item.bullets?.length ? (
                <ul className="mt-4 space-y-2 text-sm text-white/90">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
