import { FaqList, faqJsonLd } from "@/components/common/FaqList";
import { Section, SectionHeading } from "@/components/common/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import type { Course } from "@/data/courses";

type CourseFaqSectionProps = {
  course: Course;
};

export function CourseFaqSection({ course }: CourseFaqSectionProps) {
  if (!course.faqs || course.faqs.length === 0) return null;

  return (
    <Section tone="mist" labelledBy="course-faq-heading">
      <SectionHeading
        id="course-faq-heading"
        eyebrow="FREQUENTLY ASKED QUESTIONS"
        title={`Frequently Asked Questions — ${course.shortTitle || course.title}`}
        intro="Common questions from learners about syllabus coverage, prerequisites, batch formats, and placement guidance."
        align="center"
      />

      <div className="mx-auto mt-10 max-w-3xl">
        <FaqList items={course.faqs} />
      </div>

      <JsonLd data={faqJsonLd(course.faqs)} />
    </Section>
  );
}

export default CourseFaqSection;
