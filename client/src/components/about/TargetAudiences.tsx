import Link from "next/link";
import { ArrowRight } from "@/components/common/Icons";
import { Section, SectionHeading } from "@/components/common/Section";

const audiences = [
  {
    title: "College Students & Fresh Graduates",
    body: "Acquire high-demand technical skills, build real GitHub/Power BI portfolios, and stand out in campus and off-campus placements.",
    tag: "Launch Career",
  },
  {
    title: "Career Switchers & Non-IT Backgrounds",
    body: "Transition smoothly into Analytics, Data Science, or Software Testing with step-by-step guidance from zero programming background.",
    tag: "Transition",
  },
  {
    title: "Working IT Professionals",
    body: "Upgrade your stack with Power BI, Python automation, Generative AI or SAP to unlock senior roles and higher compensation.",
    tag: "Upskill",
  },
];

export function TargetAudiences() {
  return (
    <Section labelledBy="audiences-title">
      <SectionHeading
        id="audiences-title"
        eyebrow="TARGET AUDIENCE"
        title="Tailored pathways for distinct career milestones."
        intro="Whether you are starting from scratch or breaking into senior technology bands, we match your pace and ambitions."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {audiences.map((a) => (
          <div
            key={a.title}
            className="flex flex-col justify-between rounded-xl border border-[#e4e8f0] bg-white p-8 shadow-sm transition-all hover:border-red-500/30 hover:shadow-md"
          >
            <div>
              <span className="inline-block rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600">
                {a.tag}
              </span>
              <h3 className="mt-4 text-lg font-bold text-[#101828]">{a.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#667085]">{a.body}</p>
            </div>
            <Link
              href="/courses/"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:underline"
            >
              <span>Browse Recommended Tracks</span>
              <ArrowRight width={14} height={14} />
            </Link>
          </div>
        ))}
      </div>
    </Section>
  );
}

export default TargetAudiences;

