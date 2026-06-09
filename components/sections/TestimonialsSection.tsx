import { Star } from "lucide-react";
import type { Testimonial } from "@/types/content";
import { Reveal } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

type TestimonialsSectionProps = {
  title: string;
  lead?: string;
  testimonials: Testimonial[];
};

function Rating({ value }: { value: number }) {
  const rounded = Math.max(0, Math.min(5, Math.round(value)));
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rounded}/5`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={16}
          className={index < rounded ? "fill-brand text-brand" : "text-border"}
          aria-hidden
        />
      ))}
    </div>
  );
}

export function TestimonialsSection({ title, lead, testimonials }: TestimonialsSectionProps) {
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="section-space border-t border-border-soft">
      <div className="container-default space-y-10">
        <SectionHeading title={title} lead={lead} />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((item, index) => (
            <Reveal key={`${item.author}-${index}`} delay={index * 0.06}>
              <figure className="flex h-full flex-col gap-4 rounded-3xl border border-border bg-surface p-6">
                {typeof item.rating === "number" ? <Rating value={item.rating} /> : null}
                <blockquote className="flex-1 text-sm leading-6 text-text">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-auto">
                  <p className="font-display text-base font-semibold text-text">{item.author}</p>
                  {item.role ? <p className="text-sm text-text-muted">{item.role}</p> : null}
                  {item.source ? (
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-text-muted">
                      {item.sourceUrl ? (
                        <a
                          href={item.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="transition-colors hover:text-text"
                        >
                          {item.source}
                        </a>
                      ) : (
                        item.source
                      )}
                    </p>
                  ) : null}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
