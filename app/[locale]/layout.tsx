import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ConsentBanner } from "@/components/analytics/ConsentBanner";
import { PixelCursor } from "@/components/effects/PixelCursor";
import { ParallaxBackdrop } from "@/components/effects/ParallaxBackdrop";
import { getLocaleContent } from "@/content/site-content";
import { locales } from "@/lib/i18n";
import { organizationSchema } from "@/lib/seo";
import { resolveLocale } from "@/lib/resolve-locale";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const locale = await resolveLocale(params);

  return {
    alternates: {
      languages: {
        fr: "/fr",
        en: "/en",
      },
    },
    other: {
      "x-locale": locale,
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const locale = await resolveLocale(params);
  const { dictionary } = getLocaleContent(locale);

  return (
    <div className="noise relative min-h-screen overflow-hidden">
      <ParallaxBackdrop />
      <SiteHeader locale={locale} dictionary={dictionary} />
      <main className="relative z-10">{children}</main>
      <SiteFooter locale={locale} dictionary={dictionary} />
      <PixelCursor />
      <ConsentBanner locale={locale} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }} />
    </div>
  );
}

