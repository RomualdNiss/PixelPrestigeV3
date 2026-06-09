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
        <li key={`${logo.src}-${index}`} className="flex items-center px-8 md:px-12">
          {/* Export statique : next/image indisponible (images.unoptimized). */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logo.src}
            alt=""
            loading="lazy"
            className="h-10 w-auto opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 md:h-12"
          />
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
        <p className="container-default text-center text-xs uppercase tracking-[0.22em] text-text-muted">
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
