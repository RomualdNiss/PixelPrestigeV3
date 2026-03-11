import type { Metadata } from "next";
import { getLocaleContent } from "@/content/site-content";
import { getLocaleStaticParams } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { resolveLocale } from "@/lib/resolve-locale";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesPreviewSection } from "@/components/sections/ServicesPreviewSection";
import { CasesPreviewSection } from "@/components/sections/CasesPreviewSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { GuaranteesSection } from "@/components/sections/GuaranteesSection";
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

  return buildMetadata({
    locale,
    title: dictionary.home.hero.title,
    description: dictionary.home.hero.subtitle,
    path: `/${locale}`,
  });
}

export default async function LocaleHomePage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const localeContent = getLocaleContent(locale);

  return (
    <>
      <HeroSection locale={locale} dictionary={localeContent.dictionary} />
      <ServicesPreviewSection locale={locale} dictionary={localeContent.dictionary} services={localeContent.services} />
      <CasesPreviewSection locale={locale} dictionary={localeContent.dictionary} cases={localeContent.cases} />
      <ProcessSection dictionary={localeContent.dictionary} steps={localeContent.process} />
      <GuaranteesSection dictionary={localeContent.dictionary} guarantees={localeContent.guarantees} />
      <FinalCtaSection locale={locale} dictionary={localeContent.dictionary} />
    </>
  );
}

