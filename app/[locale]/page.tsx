import type { Metadata } from "next";
import { getLocaleContent } from "@/content/site-content";
import { getLocaleStaticParams } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { resolveLocale } from "@/lib/resolve-locale";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesPreviewSection } from "@/components/sections/ServicesPreviewSection";
import { DifferentiatorsSection } from "@/components/sections/DifferentiatorsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { WhenToCallSection } from "@/components/sections/WhenToCallSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return getLocaleStaticParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { dictionary } = getLocaleContent(locale);
  const seo = dictionary.home.seo;

  return buildMetadata({
    locale,
    title: seo?.title ?? dictionary.home.hero.title,
    description: seo?.description ?? dictionary.home.hero.subtitle,
    path: `/${locale}`,
    absoluteTitle: Boolean(seo?.title),
    keywords: seo?.keywords,
    openGraphTitle: seo?.openGraphTitle,
    openGraphDescription: seo?.openGraphDescription,
    twitterTitle: seo?.twitterTitle,
    twitterDescription: seo?.twitterDescription,
    image: seo?.image,
  });
}

export default async function LocaleHomePage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const localeContent = getLocaleContent(locale);

  return (
    <>
      <HeroSection locale={locale} dictionary={localeContent.dictionary} />
      <ServicesPreviewSection locale={locale} dictionary={localeContent.dictionary} services={localeContent.services} />
      <DifferentiatorsSection dictionary={localeContent.dictionary} />
      {/* <CasesPreviewSection locale={locale} dictionary={localeContent.dictionary} cases={localeContent.cases} /> */}
      <ProcessSection dictionary={localeContent.dictionary} steps={localeContent.process} />
      <WhenToCallSection dictionary={localeContent.dictionary} items={localeContent.fitItems} />
      <FinalCtaSection locale={locale} dictionary={localeContent.dictionary} />
    </>
  );
}

