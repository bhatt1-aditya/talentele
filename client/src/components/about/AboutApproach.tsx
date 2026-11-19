import { ArrowRight } from "@/components/common/Icons";
import { Section, SectionHeading } from "@/components/common/Section";
import { learningSteps } from "@/data/learning";

export function AboutApproach() {
  return (
    <Section labelledBy="approach-title">
      <SectionHeading
        id="approach-title"
        eyebrow="TEACHING METHODOLOGY"
        title="How we transform beginners into job-ready professionals."
        intro="Every Talentele curriculum follows a progressive 3-stage framework engineered to build lasting muscle memory."
      />

      <ol className="mt-12 grid gap-6 md:grid-cols-3">
        {learningSteps.map((step, i) => (
          <li
            key={step.title}
            className="relative flex flex-col justify-between rounded-xl border border-[#e4e8f0] bg-[#f5f7fb] p-8"
          >
            <div>
              <span className="font-display text-3xl font-extrabold text-red-600">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-xl font-bold text-[#101828]">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#667085]">{step.body}</p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-red-600">
              <span>Phase {i + 1} of Curriculum</span>
              <ArrowRight width={14} height={14} />
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export default AboutApproach;

