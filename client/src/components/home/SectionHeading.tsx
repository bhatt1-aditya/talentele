interface SectionHeadingProps {
  title: string;
  highlight: string;
  description?: string;
  eyebrow?: string;
  inverse?: boolean;
}

export function SectionHeading({
  title,
  highlight,
  description,
  eyebrow,
  inverse = false,
}: SectionHeadingProps) {
  const parts = title.split(highlight);
  return (
    <div className={`section-heading ${inverse ? "inverse" : ""}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>
        {parts[0]}
        <span>{highlight}</span>
        {parts[1] ?? ""}
      </h2>
      {description && <p>{description}</p>}
    </div>
  );
}

