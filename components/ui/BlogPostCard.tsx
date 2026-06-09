import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { localizedPath, type Locale } from "@/lib/i18n";
import type { BlogPost, Dictionary } from "@/types/content";
import { formatPostDate } from "@/lib/format-date";

type BlogPostCardProps = {
  locale: Locale;
  post: BlogPost;
  dictionary: Dictionary;
};

export function BlogPostCard({ locale, post, dictionary }: BlogPostCardProps) {
  const href = localizedPath(locale, `/blog/${post.slug}`);

  return (
    <article className="group h-full">
      <Link
        href={href}
        className="flex h-full flex-col rounded-3xl border border-border bg-surface p-6 transition-colors hover:border-brand/60"
      >
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-text-muted">
          <time dateTime={post.date}>{formatPostDate(post.date, locale)}</time>
          {post.readingMinutes ? (
            <>
              <span aria-hidden>·</span>
              <span>
                {post.readingMinutes} {dictionary.blogPage.minutesLabel}
              </span>
            </>
          ) : null}
        </div>
        <h2 className="mt-3 font-display text-2xl font-semibold text-text">{post.title}</h2>
        <p className="mt-3 flex-1 text-sm leading-6 text-text-muted">{post.description}</p>
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand">
          {dictionary.blogPage.readMore}
          <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </Link>
    </article>
  );
}
