import Link from "next/link";
import { cn } from "@/lib/utils";

type PageActionPanelProps = {
  title: string;
  lead: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
};

export function PageActionPanel({
  title,
  lead,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  className,
}: PageActionPanelProps) {
  return (
    <section className={cn("section-space", className)}>
      <div className="container-default">
        <div className="glass-panel rounded-3xl p-8 md:p-10">
          <h2 className="section-title max-w-3xl">{title}</h2>
          <p className="section-lead">{lead}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={primaryHref} className="btn-primary">
              {primaryLabel}
            </Link>
            {secondaryLabel && secondaryHref ? (
              <Link href={secondaryHref} className="btn-secondary">
                {secondaryLabel}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
