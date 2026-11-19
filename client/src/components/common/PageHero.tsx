import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import type { Crumb } from "@/lib/seo";
import { cn } from "@/lib/utilities";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  crumbs: Crumb[];
  tone?: "mist" | "dark";
  image?: { src: StaticImageData; alt: string; caption?: string };
  actions?: ReactNode;
  children?: ReactNode;
  rightElement?: ReactNode;
};

/**
 * Standardized Page Hero for marketing subpages, aligned with the Home page visual identity.
 * Features dark navy theme, subtle grid backdrop, radial glow, Archivo display typography,
 * and unified .shell container alignment.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  image,
  actions,
  children,
  rightElement,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[var(--navy)] text-white">
      {/* Background Grid & Ambient Glows */}
      <div className="hero-grid" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-40 top-0 size-96 rounded-full opacity-30 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(245, 45, 70, 0.35) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-0 size-96 rounded-full opacity-25 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(16, 185, 232, 0.35) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div
        className={cn(
          "shell relative z-10",
          rightElement
            ? "hero-layout"
            : "grid items-center gap-10 py-12 md:py-16 lg:grid-cols-12 lg:gap-14"
        )}
      >
        <div className={cn(image ? "lg:col-span-7" : rightElement ? "w-full" : "lg:col-span-10")}>
          <Breadcrumbs items={crumbs} tone="dark" />
          
          <p className="mt-4 text-xs font-extrabold uppercase tracking-[0.16em] text-red-400">
            {eyebrow}
          </p>

          <h1 className="mt-4 text-3xl font-extrabold leading-[1.12] tracking-tight text-white md:text-5xl lg:text-[3.2rem]">
            {title}
          </h1>

          <div className="mt-5 max-w-2xl text-base leading-relaxed text-[#c5cddd] md:text-lg">
            {intro}
          </div>

          {actions && <div className="mt-8 flex flex-wrap items-center gap-4">{actions}</div>}
          {children}
        </div>

        {rightElement ? (
          rightElement
        ) : image ? (
          <figure className="lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-[#0b1730] shadow-2xl lg:aspect-[4/3.5]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                placeholder="blur"
                sizes="(min-width: 1024px) 34vw, 100vw"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071225]/60 via-transparent to-transparent" />
            </div>
            {image.caption && (
              <figcaption className="mt-2.5 text-xs text-[#8c97a8]">{image.caption}</figcaption>
            )}
          </figure>
        ) : null}
      </div>
    </section>
  );
}
