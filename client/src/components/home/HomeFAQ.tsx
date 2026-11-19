import { FaqList } from "@/components/common/FaqList";
import { generalFaqs } from "@/data/faqs";
import { SectionHeading } from "@/components/home/SectionHeading";

export function HomeFAQ() {
  return (
    <section className="section-home faq-section" id="faq">
      <div className="shell">
        <SectionHeading
          eyebrow="FREQUENTLY ASKED QUESTIONS"
          title="Got Questions? We Have Answers"
          highlight="We Have Answers"
          description="Everything you need to know about course selection, schedules, batch formats and placement assistance."
        />
        <div className="mx-auto mt-10 max-w-3xl">
          <FaqList items={generalFaqs} />
        </div>
      </div>
    </section>
  );
}

export default HomeFAQ;

