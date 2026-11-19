import { ContactForm } from "@/components/contact/ContactForm";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { FaqList, faqJsonLd } from "@/components/common/FaqList";
import { Section, SectionHeading } from "@/components/common/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { contactFaqs } from "@/data/faqs";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact Talentele — Admissions & Course Guidance in Bhubaneswar",
  description:
    "Contact Talentele in Nayapalli, Bhubaneswar for course fees, batch schedules and syllabus details. Call +91 72056 17787 or visit our classroom lab.",
  path: "/contact-us/",
});

export default function ContactPage() {
  return (
    <main>
      {/* 1. Contact Hero */}
      <ContactHero />

      {/* 2. Main 2-Column Section: Info + Interactive Form */}
      <Section className="!pt-12 md:!pt-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <ContactInfo />
          <ContactForm />
        </div>
      </Section>

      {/* 3. Contact & Counselling FAQs */}
      <Section tone="mist" labelledBy="contact-faq-title">
        <SectionHeading
          id="contact-faq-title"
          eyebrow="ADMISSIONS & VISITOR FAQS"
          title="Frequently Asked Questions About Contacting Us"
          intro="Have queries about visiting our campus, scheduling a counselling session, or response times? Find answers below."
          align="center"
        />
        <div className="mx-auto mt-10 max-w-3xl">
          <FaqList items={contactFaqs} />
        </div>
      </Section>

      {/* FAQs Schema */}
      <JsonLd data={faqJsonLd(contactFaqs)} />
    </main>
  );
}
