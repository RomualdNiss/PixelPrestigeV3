import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/PageIntro";
import { DetailCardsSection } from "@/components/sections/DetailCardsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageActionPanel } from "@/components/sections/PageActionPanel";
import { ProcessTimeline } from "@/components/ui/ProcessTimeline";
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
  const { processPageContent } = getLocaleContent(locale);
  const seo = processPageContent.seo;

  return buildMetadata({
    locale,
    title: seo.title,
    description: seo.description,
    path: `/${locale}/process`,
    keywords: seo.keywords,
    openGraphTitle: seo.openGraphTitle,
    openGraphDescription: seo.openGraphDescription,
    twitterTitle: seo.twitterTitle,
    twitterDescription: seo.twitterDescription,
    image: seo.image,
  });
}

export default async function ProcessPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const { dictionary, process, processPageContent } = getLocaleContent(locale);
  const breadcrumbs = breadcrumbSchema([
    { name: locale === "fr" ? "Accueil" : "Home", path: `/${locale}` },
    { name: dictionary.processPage.title, path: `/${locale}/process` },
  ]);
  const faqData = faqSchema(processPageContent.faq);

  return (
    <>
      <PageIntro title={dictionary.processPage.title} lead={dictionary.processPage.lead} />
      <section className="pb-24">
        <div className="container-default space-y-10">
          <SectionHeading title={processPageContent.timelineTitle} lead={processPageContent.timelineLead} />
          <ProcessTimeline items={process} compact stepLabel={locale === "fr" ? "Étape" : "Step"} />
        </div>
      </section>
      <DetailCardsSection
        title={processPageContent.phaseTitle}
        lead={processPageContent.phaseLead}
        items={processPageContent.phaseItems}
      />
      <DetailCardsSection
        title={processPageContent.collaborationTitle}
        lead={processPageContent.collaborationLead}
        items={processPageContent.collaborationItems}
        columns={3}
      />
      <DetailCardsSection
        title={processPageContent.standardsTitle}
        lead={processPageContent.standardsLead}
        items={processPageContent.standardsItems}
        columns={3}
      />
      <FaqSection title={processPageContent.faqTitle} lead={processPageContent.faqLead} items={processPageContent.faq} />
      <PageActionPanel
        title={processPageContent.ctaTitle}
        lead={processPageContent.ctaLead}
        primaryLabel={processPageContent.ctaPrimary}
        primaryHref={localizedPath(locale, "/contact")}
        secondaryLabel={processPageContent.ctaSecondary}
        secondaryHref={localizedPath(locale, "/services")}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />
    </>
  );
}
