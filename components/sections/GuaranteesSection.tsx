import type { Dictionary, GuaranteeItem } from "@/types/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

type GuaranteesSectionProps = {
  dictionary: Dictionary;
  guarantees: GuaranteeItem[];
};

export function GuaranteesSection({ dictionary, guarantees }: GuaranteesSectionProps) {
  return (
    <section className="section-space border-t border-white/10">
      <div className="container-default space-y-8">
        <SectionHeading title={dictionary.home.guaranteesTitle} lead={dictionary.home.guaranteesLead} />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {guarantees.map((item) => (
            <article key={item.label} className="rounded-2xl border border-white/15 bg-bg-soft/70 p-5">
              <p className="text-xs uppercase tracking-[0.14em] text-text-muted">{item.label}</p>
              <p className="mt-3 font-display text-xl text-white">{item.value}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

