import type { Dictionary, FitItem } from "@/types/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

type WhenToCallSectionProps = {
  dictionary: Dictionary;
  items: FitItem[];
};

export function WhenToCallSection({ dictionary, items }: WhenToCallSectionProps) {
  return (
    <section className="section-space border-t border-white/10">
      <div className="container-default space-y-8">
        <SectionHeading title={dictionary.home.fitTitle} lead={dictionary.home.fitLead} />
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <article key={item.title} className="rounded-2xl border border-white/15 bg-bg-soft/70 p-6">
              <h3 className="font-display text-xl text-white">{item.title}</h3>
              <p className="mt-3 text-sm text-text-muted">{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
