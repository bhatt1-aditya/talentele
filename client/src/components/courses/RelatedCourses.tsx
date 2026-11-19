import Link from "next/link";
import { ArrowRight } from "@/components/common/Icons";
import { Section } from "@/components/common/Section";
import { CourseCard } from "@/components/courses/CourseCard";
import type { Course } from "@/data/courses";

export function RelatedCourses({ courses }: { courses: Course[] }) {
  if (courses.length === 0) return null;

  return (
    <Section tone="mist" labelledBy="related-title">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 id="related-title" className="text-2xl font-extrabold text-[#101828] md:text-3xl">
            Related Course Tracks
          </h2>
          <p className="mt-1 text-xs text-[#667085]">
            Explore related tools and career specialisations.
          </p>
        </div>
        <Link
          href="/courses/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:underline"
        >
          <span>View All Courses</span>
          <ArrowRight width={14} height={14} />
        </Link>
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {courses.map((c) => (
          <CourseCard key={c.slug} course={c} />
        ))}
      </div>
    </Section>
  );
}

export default RelatedCourses;

