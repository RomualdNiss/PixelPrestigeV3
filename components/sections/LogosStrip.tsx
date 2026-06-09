import type { ClientLogo } from "@/types/content";

type LogosStripProps = {
  title: string;
  logos: ClientLogo[];
};

// Une "piste" de logos répétés assez large pour remplir l'écran. On en affiche deux
// identiques côte à côte et on translate la track de -50% : la seconde piste prend
// exactement la place de la première → boucle sans couture.
function MarqueeGroup({ logos }: { logos: ClientLogo[] }) {
  const repeated = Array.from({ length: 3 }).flatMap(() => logos);

  return (
    <ul className="logo-marquee__group">
      {repeated.map((logo, index) => (
        <li key={`${logo.src}-${index}`} className="flex items-center px-4 md:px-5">
          {/* Tuile claire : contraste garanti quels que soient les logos (clairs, sombres, colorés). */}
          <span className="flex h-16 min-w-[132px] items-center justify-center rounded-[3px] border border-black/10 bg-white px-6 shadow-[3px_3px_0_0_rgba(165,41,255,0.35)] md:h-[72px]">
            {/* Export statique : next/image indisponible (images.unoptimized). */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo.src} alt="" loading="lazy" className="h-8 w-auto md:h-9" />
          </span>
        </li>
      ))}
    </ul>
  );
}

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

        <div className="logo-marquee" aria-hidden="true">
          <div className="logo-marquee__track">
            <MarqueeGroup logos={logos} />
            <MarqueeGroup logos={logos} />
          </div>
        </div>

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
