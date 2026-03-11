import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/PageIntro";
import { ProcessTimeline } from "@/components/ui/ProcessTimeline";
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
    title: dictionary.processPage.title,
    description: dictionary.processPage.lead,
    path: `/${locale}/process`,
  });
}

export default async function ProcessPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const { dictionary, process } = getLocaleContent(locale);

  return (
    <>
      <PageIntro title={dictionary.processPage.title} lead={dictionary.processPage.lead} />
      <section className="pb-24">
        <div className="container-default">
          <ProcessTimeline items={process} compact />
        </div>
      </section>
    </>
  );
}

