import { HomeAbout } from "@/components/home/HomeAbout";
import { HomeCourses } from "@/components/home/HomeCourses";
import { HomeFAQ } from "@/components/home/HomeFAQ";
import { HomeFeatures } from "@/components/home/HomeFeatures";
import { HomeHero } from "@/components/home/HomeHero";
import { HomePlacements } from "@/components/home/HomePlacements";
import { HallOfExcellence } from "@/components/home/HallOfExcellence";
import { HomeTestimonials } from "@/components/home/HomeTestimonials";
import { GoogleReviews } from "@/components/home/GoogleReviews";
import { FinalCta } from "@/components/home/FinalCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { generalFaqs } from "@/data/faqs";
import { faqJsonLd } from "@/components/common/FaqList";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "IT, Data Analytics, AI, SAP & Digital Marketing Courses in Bhubaneswar | Talentele",
  description:
    "Discover industry-oriented courses in Data, AI, ERP, and Digital Marketing with expert mentorship and placement support, designed for aspiring tech professionals.",
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <main>
      {/* 1. Hero Section with 3-column layout & live enquiry form */}
      <HomeHero />

      {/* 2. Featured Programs Showcase */}
      <HomeCourses />

      {/* 3. Proof Strip & Upcoming Cohorts */}
      <HomeFeatures />

      {/* 4. Why Choose Talentele */}
      <HomeAbout />

      {/* 5. Alumni Community & Hiring Companies */}
      <HomePlacements />

      {/* 6. Hall of Excellence Showcase */}
      {/* <HallOfExcellence /> */}

      {/* 7. Expert Mentors & Faculty */}
      <HomeTestimonials />

      {/* 7. Google Reviews & Student Testimonials */}
      <GoogleReviews />

      {/* 8. General FAQs */}
      <HomeFAQ />

      {/* 8. High-Impact Final Call to Action */}
      <FinalCta />

      {/* SEO Schema */}
      <JsonLd data={faqJsonLd(generalFaqs)} />
    </main>
  );
}
