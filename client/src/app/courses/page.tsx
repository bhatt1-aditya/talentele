import { CourseBatchNotice } from "@/components/courses/CourseBatchNotice";
import { CourseHero } from "@/components/courses/CourseHero";
import { CourseListing } from "@/components/courses/CourseListing";
import { CtaBand } from "@/components/common/CtaBand";
import { FaqList, faqJsonLd } from "@/components/common/FaqList";
import { Section, SectionHeading } from "@/components/common/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { courses } from "@/data/courses";
import { coursesCatalogFaqs } from "@/data/faqs";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Courses — Data Analytics, Data Science, Power BI, Python & More",
  description:
    "Explore Talentele courses in Bhubaneswar: Data Analytics, Business Analytics, Data Science, Power BI, Python, SQL, Advanced Excel, SAP, Software Testing and Generative AI.",
  path: "/courses/",
});

export default function CoursesPage() {
  return (
    <main>
      {/* 1. Courses Hero */}
      <CourseHero />

      {/* 2. Course Listing & Batch Notice */}
      <Section className="!pt-12 md:!pt-16">
        <CourseListing />
        <CourseBatchNotice />
      </Section>

      {/* 3. Programs FAQ */}
      <Section tone="mist" labelledBy="catalog-faq-title">
        <SectionHeading
          id="catalog-faq-title"
          eyebrow="ADMISSIONS & PROGRAM FAQS"
          title="Frequently Asked Questions About Our Programs"
          intro="Everything you need to know about course selection, schedules, batch formats, certificates, and flexible fees."
          align="center"
        />
        <div className="mx-auto mt-10 max-w-3xl">
          <FaqList items={coursesCatalogFaqs} />
        </div>
      </Section>

      {/* 4. Call to Action */}
      <CtaBand />

      {/* FAQs Schema */}
      <JsonLd data={faqJsonLd(coursesCatalogFaqs)} />

      {/* SEO Schema */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: courses.map((course, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: absoluteUrl(`/${course.slug}-course/`),
            name: course.title,
          })),
        }}
      />
    </main>
  );
}
