import {
  Check,
  CodeXml,
  Layers,
  ShieldCheck,
  Users,
} from "@/components/common/Icons";
import { Section, SectionHeading } from "@/components/common/Section";

const placementPillars = [
  {
    title: "Resume & ATS Optimization",
    description:
      "Transform your resume with clean formatting, role-specific metrics, and verified keywords that pass applicant tracking systems (ATS) into recruiter shortlists.",
    icon: ShieldCheck,
    tag: "Profile Engineering",
  },
  {
    title: "1-on-1 Technical Mock Interviews",
    description:
      "Face rigorous question sets covering SQL queries, Python logic, dashboard diagnostics, and case problems designed to mirror corporate hiring rounds.",
    icon: CodeXml,
    tag: "Technical Drills",
  },
  {
    title: "HR & Behavioral Communication",
    description:
      "Master the art of articulating your background, explaining career transitions, describing project hurdles, and demonstrating strong workplace professionalism.",
    icon: Users,
    tag: "Soft Skills",
  },
  {
    title: "Real-World Capstone Projects",
    description:
      "Graduate with 3+ end-to-end industry portfolio projects hosted on GitHub and Tableau/Power BI Public that prove your capabilities to hiring managers.",
    icon: Layers,
    tag: "Portfolio Proof",
  },
];

export function CareerPillars() {
  return (
    <Section labelledBy="pillars-title">
      <SectionHeading
        id="pillars-title"
        eyebrow="CAREER PILLARS"
        title="Master the critical touchpoints where offers are made."
        intro="Technical knowledge gets you in the door; clear communication and live problem-solving secure the appointment letter."
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {placementPillars.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.title}
              className="flex flex-col justify-between rounded-xl border border-[#e4e8f0] bg-[#f5f7fb] p-7 transition-all hover:bg-white hover:shadow-md"
            >
              <div>
                <span className="inline-block rounded-full bg-red-100 px-3 py-0.5 text-[11px] font-bold text-red-700">
                  {p.tag}
                </span>
                <div className="mt-4 flex size-11 items-center justify-center rounded-lg bg-white shadow-2xs text-red-600 border border-[#e4e8f0]">
                  <Icon width={22} height={22} />
                </div>
                <h3 className="mt-4 text-lg font-bold text-[#101828]">{p.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#667085]">{p.description}</p>
              </div>
              <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-red-600">
                <span>Included in every course</span>
                <Check width={14} height={14} />
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

export default CareerPillars;

