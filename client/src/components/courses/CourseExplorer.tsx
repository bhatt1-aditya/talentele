"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { CourseCard } from "@/components/courses/CourseCard";
import { courseCategories, courses, type Course, type CourseCategory } from "@/data/courses";
import { cn } from "@/lib/utilities";

type Filter = CourseCategory | "All";

/** Course listing with category filtering aligned with the Home page design system. */
export function CourseExplorer() {
  const [filter, setFilter] = useState<Filter>("All");
  const [courseList, setCourseList] = useState<Course[]>(courses);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("talentele_admin_courses");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge dynamic courses while preserving image metadata for default courses
          const merged = parsed.map((item: any) => {
            const seedMatch = courses.find((c) => c.slug === item.slug);
            return seedMatch ? { ...seedMatch, ...item } : item;
          });
          setCourseList(merged);
        }
      }
    } catch (e) {
      console.warn("Could not load dynamic courses from localStorage:", e);
    }
  }, []);

  const visible =
    filter === "All"
      ? courseList
      : courseList.filter((c) => c.category === filter || (c as any).categoryLabel === filter);
  const filters: Filter[] = ["All", ...courseCategories];

  return (
    <div>
      {/* Category Filter Pills */}
      <div role="group" aria-label="Filter courses by category" className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const count =
            f === "All"
              ? courseList.length
              : courseList.filter((c) => c.category === f || (c as any).categoryLabel === f).length;
          const active = filter === f;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f)}
              className={cn(
                "inline-flex min-h-10 items-center gap-2 rounded-lg px-4 text-xs font-bold transition-all",
                active
                  ? "bg-red-600 text-white shadow-xs"
                  : "border border-[#e4e8f0] bg-white text-[#55555f] hover:border-red-500/40 hover:text-[#101828]"
              )}
            >
              <span>{f}</span>
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.2 text-[10px] font-extrabold",
                  active ? "bg-white/20 text-white" : "bg-[#f5f7fb] text-[#667085]"
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} {visible.length === 1 ? "course" : "courses"} shown
      </p>

      {/* Grid of Course Cards */}
      {visible.length > 0 ? (
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((course) => (
            <li key={course.slug} className="flex">
              <CourseCard course={course} headingLevel="h2" className="w-full" />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-10 rounded-2xl border border-dashed border-[#e4e8f0] bg-white p-10 text-center">
          <p className="text-base font-bold text-[#101828]">No courses found in this category.</p>
          <p className="mt-2 text-xs text-[#667085]">
            Try another category, or{" "}
            <Link href="/contact-us/" className="font-bold text-red-600 hover:underline">
              ask the team
            </Link>{" "}
            about custom syllabus tracks.
          </p>
          <button
            type="button"
            onClick={() => setFilter("All")}
            className="btn-primary mt-5 !min-h-10 !px-5 !text-xs"
          >
            Show All Courses
          </button>
        </div>
      )}
    </div>
  );
}
