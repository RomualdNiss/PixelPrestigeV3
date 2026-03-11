import Link from "next/link";
import { localizedPath, type Locale } from "@/lib/i18n";
import type { CaseStudy, Dictionary } from "@/types/content";
import { Reveal } from "@/components/animations/Reveal";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

type CasesPreviewSectionProps = {
  locale: Locale;
  dictionary: Dictionary;
  cases: CaseStudy[];
};

export function CasesPreviewSection({ locale, dictionary, cases }: CasesPreviewSectionProps) {
  return (
    <section className="section-space border-t border-white/10">
      <div className="container-default space-y-10">
        <SectionHeading title={dictionary.home.casesTitle} lead={dictionary.home.casesLead} />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {cases.map((item, index) => (
            <Reveal key={item.slug} delay={index * 0.06}>
              <CaseStudyCard item={item} />
            </Reveal>
          ))}
        </div>
        <Link href={localizedPath(locale, "/realisations")} className="btn-secondary">
          {dictionary.common.ctaCases}
        </Link>
      </div>
    </section>
  );
}

