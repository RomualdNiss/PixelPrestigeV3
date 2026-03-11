type SectionHeadingProps = {
  title: string;
  lead?: string;
  align?: "left" | "center";
};

export function SectionHeading({ title, lead, align = "left" }: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <h2 className="section-title">{title}</h2>
      {lead ? <p className="section-lead text-base md:text-lg">{lead}</p> : null}
    </div>
  );
}

