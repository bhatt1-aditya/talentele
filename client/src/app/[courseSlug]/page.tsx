import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CourseCurriculum } from "@/components/courses/CourseCurriculum";
import { CourseDetailsHero } from "@/components/courses/CourseDetailsHero";
import { CourseFaqSection } from "@/components/courses/CourseFaqSection";
import { CourseSidebar } from "@/components/courses/CourseSidebar";
import { RelatedCourses } from "@/components/courses/RelatedCourses";
import { CtaBand } from "@/components/common/CtaBand";
import { Section } from "@/components/common/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { getCourse, getRelatedCourses } from "@/data/courses";
import { courseSlugs, type CourseSlug } from "@/data/slugs";
import { posts } from "@/data/posts";
import { site } from "@/data/site";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

// Fully static: unknown slugs render (and call notFound()) before any response is sent, so they return a real 404.
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return courseSlugs.map((slug) => ({ courseSlug: `${slug}-course` }));
}

function resolveCourseSlug(raw: string): CourseSlug | null {
  const normalized = raw.endsWith("-course") ? raw.slice(0, -7) : raw;
  return (courseSlugs as readonly string[]).includes(normalized) ? (normalized as CourseSlug) : null;
}

type Props = {
  params: Promise<{ courseSlug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { courseSlug } = await params;
  const slug = resolveCourseSlug(courseSlug);
  if (!slug) return {};
  const course = getCourse(slug);
  if (!course) return {};
  return buildMetadata({ ...course.seo, path: `/${course.slug}-course/` });
}

export default async function CoursePage({ params }: Props) {
  const { courseSlug } = await params;
  const slug = resolveCourseSlug(courseSlug);
  if (!slug) notFound();
  const course = getCourse(slug);
  if (!course) notFound();

  const related = getRelatedCourses(course);
  const relatedPosts = posts.filter((p) => p.relatedCourses.includes(course.slug)).slice(0, 2);
  const enquiryHref = `/contact-us/?course=${course.slug}`;

  return (
    <main>
      {/* 1. Course Details Hero */}
      <CourseDetailsHero course={course} enquiryHref={enquiryHref} />

      {/* 2. Main Curriculum & Sidebar */}
      <Section className="!pt-12 md:!pt-16">
        <div className="grid gap-14 lg:grid-cols-12">
          <CourseCurriculum course={course} />
          <CourseSidebar course={course} enquiryHref={enquiryHref} relatedPosts={relatedPosts} />
        </div>
      </Section>

      {/* 3. Related Course Tracks */}
      <RelatedCourses courses={related} />

      {/* 4. Course FAQs */}
      <CourseFaqSection course={course} />

      {/* 5. Final CTA */}
      <CtaBand
        title={`Ready to start learning ${course.title}?`}
        body="Ask our academic counselling team in Nayapalli, Bhubaneswar about the next batch dates, fees, syllabus details and career placement assistance."
        primary={{ label: "Enquire About Next Batch", href: enquiryHref }}
      />

      {/* Course Schema */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: `${course.title} course`,
          description: course.summary,
          url: absoluteUrl(`/${course.slug}-course/`),
          provider: {
            "@type": "EducationalOrganization",
            name: site.name,
            sameAs: `${site.url}/`,
          },
          teaches: course.outcomes,
        }}
      />
    </main>
  );
}
