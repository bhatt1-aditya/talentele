import type { ReactNode } from "react";

import { cn } from "@/lib/utilities";

export type SectionTone = "light" | "mist" | "dark";

const tones: Record<SectionTone, string> = {
  light: "bg-white text-[#101828]",
  mist: "bg-[#f5f7fb] text-[#101828]",
  dark: "bg-[#071225] text-white",
};

type SectionProps = {
  tone?: SectionTone;
  id?: string;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
};

export function Section({ tone = "light", id, labelledBy, className, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn(tones[tone], "py-16 md:py-20", className)}>
      <div className="shell">{children}</div>
    </section>
  );
}

type SectionHeadingProps = {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: SectionTone;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
};

/**
 * Editorial-style kicker without artificial pill capsules or decorative dots.
 */
export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: SectionTone;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mb-2.5 text-xs font-extrabold uppercase tracking-[0.16em]",
        tone === "dark" ? "text-red-400" : "text-red-600",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  tone = "light",
  align = "left",
  as: Tag = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center [&>p:first-child]:justify-center", className)}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <Tag
        id={id}
        className={cn(
          "font-display text-2xl font-extrabold leading-[1.12] tracking-tight md:text-4xl",
          tone === "dark" ? "text-white" : "text-[#101828]",
        )}
      >
        {title}
      </Tag>
      {intro && (
        <p className={cn("mt-4 text-base leading-relaxed md:text-lg", tone === "dark" ? "text-[#aab4c5]" : "text-[#667085]")}>
          {intro}
        </p>
      )}
    </div>
  );
}
