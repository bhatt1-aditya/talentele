import { AboutApproach } from "@/components/about/AboutApproach";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutStory } from "@/components/about/AboutStory";
import { CampusSpotlight } from "@/components/about/CampusSpotlight";
import { CoreValues } from "@/components/about/CoreValues";
import { MissionVision } from "@/components/about/MissionVision";
import { TargetAudiences } from "@/components/about/TargetAudiences";
import { TeamSection } from "@/components/about/TeamSection";
import { WhyChooseUs } from "@/components/about/WhyChooseUs";
import { CtaBand } from "@/components/common/CtaBand";
import { FaqList, faqJsonLd } from "@/components/common/FaqList";
import { Section, SectionHeading } from "@/components/common/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { aboutFaqs } from "@/data/faqs";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Talentele — Practical IT & Data Training in Bhubaneswar",
  description:
    "Learn about Talentele, a premier Bhubaneswar training institute focused on practical, affordable, real-time learning in data analytics, data science, AI and enterprise software.",
  path: "/about-us/",
});

export default function AboutPage() {
  return (
    <main>
      {/* 1. Hero & Breadcrumbs */}
      <AboutHero />

      {/* 2. Who We Are & Story */}
      <AboutStory />

      {/* 3. Mission & Vision */}
      <MissionVision />

      {/* 4. Core Values */}
      <CoreValues />

      {/* 5. Teaching Methodology & Approach */}
      <AboutApproach />

      {/* 6. Faculty & Mentors */}
      <TeamSection />

      {/* 7. Comprehensive Support & Features */}
      <WhyChooseUs />

      {/* 8. Target Audiences & Learning Tracks */}
      <TargetAudiences />

      {/* 9. Campus Location Spotlight */}
      <CampusSpotlight />

      {/* 10. About Talentele FAQ */}
      <Section tone="mist" labelledBy="about-faq-title">
        <SectionHeading
          id="about-faq-title"
          eyebrow="ABOUT TALENTELE"
          title="Frequently Asked Questions About Our Institute"
          intro="Learn more about our practical teaching methodology, Bhubaneswar campus facility, industry mentors, and career support."
          align="center"
        />
        <div className="mx-auto mt-10 max-w-3xl">
          <FaqList items={aboutFaqs} />
        </div>
      </Section>

      {/* 11. Call to Action */}
      <CtaBand />

      {/* FAQs Schema */}
      <JsonLd data={faqJsonLd(aboutFaqs)} />
    </main>
  );
}
