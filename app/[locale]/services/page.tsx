import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/PageIntro";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { getLocaleContent } from "@/content/site-content";
import { resolveLocale } from "@/lib/resolve-locale";
import { buildMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { dictionary } = getLocaleContent(locale);

  return buildMetadata({
    locale,
    title: dictionary.servicesPage.title,
    description: dictionary.servicesPage.lead,
    path: `/${locale}/services`,
  });
}

export default async function ServicesPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const { dictionary, services } = getLocaleContent(locale);

  return (
    <>
      <PageIntro title={dictionary.servicesPage.title} lead={dictionary.servicesPage.lead} />
      <section className="pb-24">
        <div className="container-default">
          <Stagger className="grid gap-4 md:grid-cols-2">
            {services.map((service) => (
              <StaggerItem key={service.id}>
                <ServiceCard item={service} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}

