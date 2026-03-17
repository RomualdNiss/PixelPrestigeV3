import { cn } from "@/lib/utils";

type PageIntroProps = {
  title: string;
  lead: string;
  className?: string;
  contentClassName?: string;
  titleClassName?: string;
  leadClassName?: string;
  useDefaultSpacing?: boolean;
};

export function PageIntro({
  title,
  lead,
  className,
  contentClassName,
  titleClassName,
  leadClassName,
  useDefaultSpacing = true,
}: PageIntroProps) {
  return (
    <header className={cn(useDefaultSpacing && "section-space", className)}>
      <div className={cn("container-default", contentClassName)}>
        <h1 className={cn("section-title max-w-4xl", titleClassName)}>{title}</h1>
        <p className={cn("section-lead text-lg", leadClassName)}>{lead}</p>
      </div>
    </header>
  );
}

