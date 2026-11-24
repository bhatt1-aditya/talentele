import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Clock3,
  CodeXml,
  GraduationCap,
  Users,
} from "@/components/common/Icons";
import { SectionHeading } from "./SectionHeading";

const benefits = [
  {
    icon: GraduationCap,
    title: "Industry-Driven Curriculum",
    body: "Learn skills mapped to modern workplace needs.",
  },
  {
    icon: Users,
    title: "Expert Mentors",
    body: "Learn through practical guidance from specialists.",
  },
  {
    icon: CodeXml,
    title: "Hands-on Projects",
    body: "Build portfolio-ready work through applied learning.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Placement Support",
    body: "Prepare for interviews and career opportunities.",
  },
  {
    icon: Clock3,
    title: "Flexible Learning",
    body: "Choose a learning format that works around your goals.",
  },
];

export function WhyChoose() {
  return (
    <section className="section-home why-section" id="about">
      <div className="why-grid" aria-hidden="true" />
      <div className="shell">
        <div className="section-top">
          <SectionHeading
            // eyebrow="THE TALENTELE DIFFERENCE"
            title="Why Choose Talentele?"
            highlight="Talentele?"
            description="We don't just teach. We build careers."
            inverse
          />
          <Link className="text-link light" href="/about-us/">
            Know More <ArrowRight width={17} height={17} />
          </Link>
        </div>

        <div className="benefit-grid">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <article key={b.title} className="benefit-card">
                <span className="benefit-index">0{i + 1}</span>
                <div className="benefit-icon">
                  <Icon width={21} height={21} />
                </div>
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

