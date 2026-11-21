import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "@/components/common/Icons";
import type { Course } from "@/data/courses";
import { cn } from "@/lib/utilities";

type CourseCardProps = {
  course: Course;
  layout?: "stacked" | "wide";
  headingLevel?: "h2" | "h3";
  className?: string;
};

/**
 * Standardized course card aligned with the Home page visual design system.
 */
export function CourseCard({
  course,
  layout = "stacked",
  headingLevel: Heading = "h3",
  className,
}: CourseCardProps) {
  const wide = layout === "wide";
  return (
    <article
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-xl border border-[#e4e8f0] bg-white shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-red-500/30 hover:shadow-md",
        wide ? "md:flex-row" : "",
        className
      )}
    >
      <div>
        <div
          className={cn(
            "relative overflow-hidden bg-[#f5f7fb]",
            wide ? "aspect-[16/10] md:aspect-auto md:w-1/2" : "aspect-[16/10]"
          )}
        >
          <Image
            src={course.image}
            alt={course.imageAlt}
            fill
            placeholder="blur"
            sizes={
              wide
                ? "(min-width: 768px) 40vw, 100vw"
                : "(min-width: 1024px) 26vw, (min-width: 640px) 45vw, 100vw"
            }
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <span className="absolute left-3.5 top-3.5 rounded bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#101828] shadow-xs">
            {course.category}
          </span>
          {course.highlighted && (
            <span className="absolute right-3.5 top-3.5 rounded-full bg-red-600 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs">
              {course.badge || "Featured"}
            </span>
          )}
        </div>

        <div className={cn("flex flex-1 flex-col p-6", wide && "md:p-8")}>
          <Heading className={cn("font-bold leading-tight text-[#101828] group-hover:text-red-600 transition-colors", wide ? "text-2xl md:text-3xl" : "text-lg")}>
            <Link href={`/${course.slug}-course/`} className="after:absolute after:inset-0 focus-visible:outline-none">
              {course.title}
            </Link>
          </Heading>

          <p className="mt-1.5 text-xs font-semibold text-red-600">{course.tagline}</p>
          <p className="mt-2.5 line-clamp-3 text-xs leading-relaxed text-[#667085]">{course.summary}</p>

          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tools covered">
            {course.tools.slice(0, wide ? 6 : 4).map((tool) => (
              <li
                key={tool}
                className="rounded-md border border-[#e4e8f0] bg-[#f5f7fb] px-2 py-0.5 text-[10px] font-semibold text-[#55555f]"
              >
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-[#e4e8f0] px-6 py-3.5 text-xs">
        <span className="font-semibold text-[#667085]">Bhubaneswar Cohort</span>
        <span className="inline-flex items-center gap-1 font-bold text-red-600 group-hover:translate-x-0.5 transition-transform">
          <span>View Curriculum</span>
          <ArrowRight width={12} height={12} />
        </span>
      </div>

      {/* Focus ring */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-xl ring-red-500 ring-offset-2 group-has-[a:focus-visible]:ring-[3px]"
      />
    </article>
  );
}
