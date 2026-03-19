import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/PageIntro";
import { DetailCardsSection } from "@/components/sections/DetailCardsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageActionPanel } from "@/components/sections/PageActionPanel";
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
  const { aboutPageContent } = getLocaleContent(locale);
  const seo = aboutPageContent.seo;

  return buildMetadata({
    locale,
    title: seo.title,
    description: seo.description,
    path: `/${locale}/a-propos`,
    keywords: seo.keywords,
    openGraphTitle: seo.openGraphTitle,
    openGraphDescription: seo.openGraphDescription,
    twitterTitle: seo.twitterTitle,
    twitterDescription: seo.twitterDescription,
    image: seo.image,
  });
}

export default async function AboutPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const { dictionary, aboutPageContent } = getLocaleContent(locale);
  const breadcrumbs = breadcrumbSchema([
    { name: locale === "fr" ? "Accueil" : "Home", path: `/${locale}` },
    { name: dictionary.aboutPage.title, path: `/${locale}/a-propos` },
  ]);
  const faqData = faqSchema(aboutPageContent.faq);

  return (
    <>
      <PageIntro
        title={dictionary.aboutPage.title}
        lead={dictionary.aboutPage.lead}
        className="pb-10 md:pb-12 lg:pb-14"
      />
      <DetailCardsSection
        title={aboutPageContent.positioningTitle}
        lead={aboutPageContent.positioningLead}
        items={aboutPageContent.positioningItems}
        className="border-t-0 pt-0"
        columns={3}
      />
      <DetailCardsSection
        title={aboutPageContent.standardsTitle}
        lead={aboutPageContent.standardsLead}
        items={aboutPageContent.standardsItems}
        columns={3}
      />
      <DetailCardsSection
        title={aboutPageContent.territoryTitle}
        lead={aboutPageContent.territoryLead}
        items={aboutPageContent.territoryItems}
        columns={3}
      />
      <FaqSection title={aboutPageContent.faqTitle} lead={aboutPageContent.faqLead} items={aboutPageContent.faq} />
      <PageActionPanel
        title={aboutPageContent.ctaTitle}
        lead={aboutPageContent.ctaLead}
        primaryLabel={aboutPageContent.ctaPrimary}
        primaryHref={localizedPath(locale, "/contact")}
        secondaryLabel={aboutPageContent.ctaSecondary}
        secondaryHref={localizedPath(locale, "/process")}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />
    </>
  );
}
