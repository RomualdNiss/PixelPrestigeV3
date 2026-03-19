import type { Metadata } from "next";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { PageIntro } from "@/components/layout/PageIntro";
import { DetailCardsSection } from "@/components/sections/DetailCardsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageActionPanel } from "@/components/sections/PageActionPanel";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getLocaleContent } from "@/content/site-content";
import { getLocaleStaticParams, localizedPath } from "@/lib/i18n";
import { resolveLocale } from "@/lib/resolve-locale";
import { breadcrumbSchema, buildMetadata, faqSchema } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return getLocaleStaticParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { servicesPageContent } = getLocaleContent(locale);
  const seo = servicesPageContent.seo;

  return buildMetadata({
    locale,
    title: seo.title,
    description: seo.description,
    path: `/${locale}/services`,
    keywords: seo.keywords,
    openGraphTitle: seo.openGraphTitle,
    openGraphDescription: seo.openGraphDescription,
    twitterTitle: seo.twitterTitle,
    twitterDescription: seo.twitterDescription,
    image: seo.image,
  });
}

export default async function ServicesPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const { dictionary, services, servicesPageContent } = getLocaleContent(locale);
  const breadcrumbs = breadcrumbSchema([
    { name: locale === "fr" ? "Accueil" : "Home", path: `/${locale}` },
    { name: dictionary.servicesPage.title, path: `/${locale}/services` },
  ]);
  const faqData = faqSchema(servicesPageContent.faq);

  return (
    <>
      <PageIntro title={dictionary.servicesPage.title} lead={dictionary.servicesPage.lead} />
      <section className="pb-24">
        <div className="container-default space-y-10">
          <SectionHeading title={servicesPageContent.catalogTitle} lead={servicesPageContent.catalogLead} />
          <Stagger className="grid gap-4 md:grid-cols-2">
            {services.map((service) => (
              <StaggerItem key={service.id}>
                <ServiceCard item={service} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
      <DetailCardsSection
        title={servicesPageContent.situationsTitle}
        lead={servicesPageContent.situationsLead}
        items={servicesPageContent.situationItems}
      />
      <DetailCardsSection
        title={servicesPageContent.deliveryTitle}
        lead={servicesPageContent.deliveryLead}
        items={servicesPageContent.deliveryItems}
      />
      <FaqSection title={servicesPageContent.faqTitle} lead={servicesPageContent.faqLead} items={servicesPageContent.faq} />
      <PageActionPanel
        title={servicesPageContent.ctaTitle}
        lead={servicesPageContent.ctaLead}
        primaryLabel={servicesPageContent.ctaPrimary}
        primaryHref={localizedPath(locale, "/contact")}
        secondaryLabel={servicesPageContent.ctaSecondary}
        secondaryHref={localizedPath(locale, "/process")}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />
    </>
  );
}
