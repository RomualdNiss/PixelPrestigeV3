import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/PageIntro";
import { Reveal } from "@/components/animations/Reveal";
import { BlogPostCard } from "@/components/ui/BlogPostCard";
import { getLocaleContent } from "@/content/site-content";
import { getBlogPosts } from "@/content/blog-content";
import { getLocaleStaticParams } from "@/lib/i18n";
import { resolveLocale } from "@/lib/resolve-locale";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

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
    title: dictionary.blogPage.title,
    description: dictionary.blogPage.lead,
    path: `/${locale}/blog`,
  });
}

export default async function BlogPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const { dictionary } = getLocaleContent(locale);
  const posts = getBlogPosts(locale);
  const breadcrumbs = breadcrumbSchema([
    { name: locale === "fr" ? "Accueil" : "Home", path: `/${locale}` },
    { name: dictionary.blogPage.title, path: `/${locale}/blog` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <PageIntro title={dictionary.blogPage.title} lead={dictionary.blogPage.lead} />
      <section className="pb-24">
        <div className="container-default">
          {posts.length === 0 ? (
            <p className="text-text-muted">{dictionary.blogPage.empty}</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post, index) => (
                <Reveal key={post.slug} delay={index * 0.05}>
                  <BlogPostCard locale={locale} post={post} dictionary={dictionary} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
