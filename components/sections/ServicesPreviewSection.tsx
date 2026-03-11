import Link from "next/link";
import { localizedPath, type Locale } from "@/lib/i18n";
import type { ServiceItem } from "@/types/content";
import type { Dictionary } from "@/types/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";

type ServicesPreviewSectionProps = {
  locale: Locale;
  dictionary: Dictionary;
  services: ServiceItem[];
};

export function ServicesPreviewSection({ locale, dictionary, services }: ServicesPreviewSectionProps) {
  return (
    <section className="section-space">
      <div className="container-default space-y-10">
        <SectionHeading title={dictionary.home.servicesTitle} lead={dictionary.home.servicesLead} />
        <Stagger className="grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <StaggerItem key={service.id}>
              <ServiceCard item={service} />
            </StaggerItem>
          ))}
        </Stagger>
        <Link href={localizedPath(locale, "/services")} className="btn-secondary">
          {dictionary.common.ctaProject}
        </Link>
      </div>
    </section>
  );
}

