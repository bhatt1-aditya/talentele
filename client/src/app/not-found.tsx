import type { Metadata } from "next";
import Link from "next/link";

import { ButtonLink } from "@/components/common/Button";
import { ArrowRight } from "@/components/common/Icons";
import { courses } from "@/data/courses";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="container-site grid gap-14 py-20 md:py-28 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-brand-600">Error 404</p>
          <h1 className="mt-4 text-5xl font-extrabold leading-[1.02] md:text-7xl">
            This page took a{" "}
            <span className="font-serif font-normal italic text-brand">different path.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            The page you were looking for doesn&apos;t exist or has moved. Our courses and guides are still right here.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/" size="lg">
              Back to home
            </ButtonLink>
            <ButtonLink href="/courses/" variant="secondary" size="lg">
              Explore courses
              <ArrowRight width={18} height={18} />
            </ButtonLink>
          </div>
        </div>
        <nav aria-labelledby="popular-courses" className="rounded-[var(--radius-xl)] border border-line p-8 lg:col-span-5">
          <h2 id="popular-courses" className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">
            Popular courses
          </h2>
          <ul className="mt-4 divide-y divide-line">
            {courses.slice(0, 5).map((c) => (
              <li key={c.slug}>
                <Link href={`/${c.slug}-course/`} className="flex min-h-12 items-center justify-between font-semibold hover:text-brand-600">
                  {c.title}
                  <ArrowRight width={16} height={16} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
