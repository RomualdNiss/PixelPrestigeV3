import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PageTransition } from "@/components/layout/PageTransition";
import { ConsentBanner } from "@/components/analytics/ConsentBanner";
import { LocaleDocumentSync } from "@/components/layout/LocaleDocumentSync";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { PixelCursor } from "@/components/effects/PixelCursor";
import { ArcadeBackground } from "@/components/effects/ArcadeBackground";
import { ParallaxGlow } from "@/components/effects/ParallaxGlow";
import { CRTOverlay } from "@/components/effects/CRTOverlay";
import { IntroLoader } from "@/components/effects/IntroLoader";
import { getLocaleContent } from "@/content/site-content";
import { getLocaleStaticParams } from "@/lib/i18n";
import { organizationSchema } from "@/lib/seo";
import { resolveLocale } from "@/lib/resolve-locale";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return getLocaleStaticParams();
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
    <div className="noise relative flex min-h-dvh flex-col">
      <LocaleDocumentSync locale={locale} />
      <SmoothScroll />
      <ArcadeBackground />
      <ParallaxGlow />
      <SiteHeader locale={locale} dictionary={dictionary} />
      <main className="relative z-10 flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <SiteFooter locale={locale} dictionary={dictionary} />
      <PixelCursor />
      <CRTOverlay />
      <IntroLoader />
      <ConsentBanner locale={locale} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }} />
    </div>
  );
}

