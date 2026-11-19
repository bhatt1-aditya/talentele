import { Check } from "@/components/common/Icons";
import { Section, SectionHeading } from "@/components/common/Section";
import { learningFeatures } from "@/data/site";

export function WhyChooseUs() {
  return (
    <Section tone="mist" labelledBy="support-title">
      <SectionHeading
        id="support-title"
        eyebrow="THE TALENTELE ADVANTAGE"
        title="Support at every single stage of your learning journey."
        intro="We wrap your coursework in an ecosystem designed to guarantee concept mastery and interview readiness."
        align="center"
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {learningFeatures.map((f) => (
          <div
            key={f.title}
            className="rounded-xl border border-[#e4e8f0] bg-white p-6 shadow-sm"
          >
            <div className="flex size-9 items-center justify-center rounded-md bg-red-50 text-red-600">
              <Check width={18} height={18} />
            </div>
            <h3 className="mt-4 text-base font-bold text-[#101828]">{f.title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-[#667085]">{f.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export default WhyChooseUs;

