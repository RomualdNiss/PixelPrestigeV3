import { cn } from "@/lib/utils";

type PageIntroProps = {
  title: string;
  lead: string;
  className?: string;
};

export function PageIntro({ title, lead, className }: PageIntroProps) {
  return (
    <header className={cn("section-space", className)}>
      <div className="container-default">
        <h1 className="section-title max-w-4xl">{title}</h1>
        <p className="section-lead text-lg">{lead}</p>
      </div>
    </header>
  );
}

