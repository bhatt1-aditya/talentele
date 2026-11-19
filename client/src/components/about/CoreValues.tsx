import {
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "@/components/common/Icons";
import { Section, SectionHeading } from "@/components/common/Section";

const coreValues = [
  {
    icon: Target,
    title: "Practice-First Learning",
    description:
      "Every concept is taught through tasks and workflows used in production tech environments, not abstract academic theory.",
  },
  {
    icon: Users,
    title: "15+ Years Industry Mentors",
    description:
      "Classes are led by practitioners with deep industry and teaching backgrounds who understand actual employer demands.",
  },
  {
    icon: ShieldCheck,
    title: "Honest Career Guidance",
    description:
      "We promise genuine guidance, rigorous ATS resume support and mock interviews — never misleading 100% job guarantees.",
  },
  {
    icon: Sparkles,
    title: "Affordable & Accessible",
    description:
      "High-caliber technology education in Bhubaneswar with flexible batch schedules, recorded revisions, and direct 1-on-1 doubt clearing.",
  },
];

export function CoreValues() {
  return (
    <Section tone="mist" labelledBy="values-title">
      <SectionHeading
        id="values-title"
        eyebrow="OUR FOUNDATION"
        title="The values that guide every batch we teach."
        intro="We measure our success not by enrollment numbers, but by the tangible skills, confidence, and career progression our students achieve."
        align="center"
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {coreValues.map((v) => {
          const Icon = v.icon;
          return (
            <div
              key={v.title}
              className="flex flex-col rounded-xl border border-[#e4e8f0] bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex size-11 items-center justify-center rounded-lg bg-red-50 text-red-600">
                <Icon width={22} height={22} />
              </div>
              <h3 className="mt-4 text-lg font-bold text-[#101828]">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#667085]">{v.description}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

export default CoreValues;

