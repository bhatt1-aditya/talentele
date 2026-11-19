import type { ReactNode } from "react";

import { Info } from "@/components/common/Icons";
import { PageHero } from "@/components/common/PageHero";

export type LegalSection = { id: string; title: string; body: ReactNode };

type LegalPageProps = {
  title: string;
  intro: string;
  path: string;
  lastUpdated: string;
  reviewNote: string;
  sections: LegalSection[];
};

export function LegalPage({ title, intro, path, lastUpdated, reviewNote, sections }: LegalPageProps) {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={title}
        intro={
          <>
            <p>{intro}</p>
            <p className="mt-3 text-base">Last updated: {lastUpdated}</p>
          </>
        }
        crumbs={[
          { name: "Home", path: "/" },
          { name: title, path },
        ]}
      />
      <div className="container-site py-16 md:py-20">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[15rem_1fr]">
          <nav aria-labelledby="legal-toc" className="lg:sticky lg:top-[calc(var(--header-height)+1.5rem)] lg:self-start">
            <h2 id="legal-toc" className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">
              Contents
            </h2>
            <ol className="mt-4 space-y-1 text-sm">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="flex min-h-9 items-baseline gap-2 py-1 text-ink/80 hover:text-brand-600">
                    <span className="text-xs font-bold text-brand">{i + 1}.</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="min-w-0 max-w-[var(--container-prose)]">
            <aside className="mb-10 flex gap-3 rounded-[var(--radius-md)] border border-line bg-mist p-5 text-sm leading-relaxed">
              <Info width={18} height={18} className="mt-0.5 shrink-0 text-brand" />
              <p>{reviewNote}</p>
            </aside>
            <div className="prose-talentele">
              {sections.map((s, i) => (
                <section key={s.id} aria-labelledby={s.id}>
                  <h2 id={s.id} className={i === 0 ? "!mt-0" : undefined}>
                    {i + 1}. {s.title}
                  </h2>
                  {s.body}
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
