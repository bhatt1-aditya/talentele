import { Section, SectionHeading } from "@/components/common/Section";

const placementFaqs = [
  {
    question: "Is placement assistance included with my course?",
    answer:
      "Yes. Every comprehensive track at Talentele includes dedicated career guidance, ATS resume review, portfolio mentoring, and mock interview practice at no additional cost.",
  },
  {
    question: "Does Talentele guarantee a job upon course completion?",
    answer:
      "No ethical training institute can honestly guarantee a job. Hiring decisions belong solely to employers based on your interview performance. We guarantee high-caliber preparation, real projects, and honest placement assistance.",
  },
  {
    question: "Can students from non-IT or non-technical backgrounds get placed?",
    answer:
      "Absolutely. Many of our students transition from commerce, arts, mechanical, or civil streams. Data analytics, business analytics, and software testing focus heavily on logical thinking, domain curiosity, and tool proficiency, which we teach step-by-step.",
  },
  {
    question: "How do mock interviews work?",
    answer:
      "You participate in one-on-one sessions led by experienced mentors. Each mock interview simulates real corporate formats, followed by detailed verbal and written feedback on technical accuracy and communication style.",
  },
  {
    question: "Will I receive an internship or live project certificate?",
    answer:
      "Yes. You will complete intensive capstone projects replicating industry production environments, and receive project completion documentation to validate your hands-on experience.",
  },
];

export function PlacementFAQ() {
  return (
    <Section tone="mist" labelledBy="faq-title">
      <SectionHeading
        id="faq-title"
        eyebrow="FREQUENTLY ASKED QUESTIONS"
        title="Everything you need to know about career support."
        align="center"
      />

      <div className="mx-auto mt-12 max-w-3xl space-y-4">
        {placementFaqs.map((faq) => (
          <div
            key={faq.question}
            className="rounded-xl border border-[#e4e8f0] bg-white p-6 shadow-2xs"
          >
            <h3 className="text-base font-bold text-[#101828]">{faq.question}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#667085]">{faq.answer}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export default PlacementFAQ;

