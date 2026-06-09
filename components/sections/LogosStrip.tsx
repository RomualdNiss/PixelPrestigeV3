import type { ClientLogo } from "@/types/content";
import { LogoMarquee } from "@/components/sections/LogoMarquee";

type LogosStripProps = {
  title: string;
  logos: ClientLogo[];
};

export function LogosStrip({ title, logos }: LogosStripProps) {
  if (logos.length === 0) {
    return null;
  }

  return (
    <section className="section-space border-t border-border-soft" aria-label={title}>
      <div className="space-y-8">
        <p className="pixel-label container-default text-center text-[0.7rem] tracking-[0.16em] text-text-muted">
          {title}
        </p>

        <LogoMarquee logos={logos} />

        {/* Équivalent accessible (les logos défilants sont décoratifs / dupliqués). */}
        <ul className="sr-only">
          {logos.map((logo) => (
            <li key={logo.src}>{logo.name}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
