import type { Dictionary, ProcessStep } from "@/types/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProcessTimeline } from "@/components/ui/ProcessTimeline";

type ProcessSectionProps = {
  dictionary: Dictionary;
  steps: ProcessStep[];
};

export function ProcessSection({ dictionary, steps }: ProcessSectionProps) {
  return (
    <section className="section-space border-t border-white/10">
      <div className="container-default space-y-10">
        <SectionHeading title={dictionary.home.processTitle} lead={dictionary.home.processLead} />
        <ProcessTimeline items={steps} />
      </div>
    </section>
  );
}

