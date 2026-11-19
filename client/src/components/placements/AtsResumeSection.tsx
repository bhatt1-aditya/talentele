import { Check, ShieldCheck } from "@/components/common/Icons";
import { Section } from "@/components/common/Section";

export function AtsResumeSection() {
  return (
    <Section tone="dark" labelledBy="ats-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-red-400">
            ATS Resume Specialization
          </p>
          <h2 id="ats-title" className="mt-4 text-3xl font-extrabold text-white md:text-4xl">
            Engineered to beat the resume filters.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#aab4c5]">
            Over 75% of technology resumes are discarded by automated Applicant Tracking Systems before a human recruiter even sees them. We eliminate formatting errors, optimize semantic density, and showcase quantifiable project metrics.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Clean single-column ATS templates with zero parsing friction",
              "Action-oriented bullet points highlighting business impact (e.g. 'reduced query latency by 40%')",
              "Direct links to verifiable GitHub repositories and interactive Power BI/Tableau portfolios",
              "Personalized LinkedIn profile optimization for inbound recruiter outreach",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-[#c5cddd]">
                <Check width={16} height={16} className="mt-0.5 shrink-0 text-red-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0c1833] to-[#071225] p-8 shadow-2xl lg:col-span-6">
          <h3 className="text-xl font-bold text-white">How We Evaluate Your Resume</h3>
          <div className="mt-6 space-y-4">
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <div className="flex justify-between text-xs font-bold text-white">
                <span>Keyword Density & Tool Taxonomy</span>
                <span className="text-cyan-400">95% Benchmark</span>
              </div>
              <div className="mt-2 h-1.5 w-full rounded-full bg-white/10">
                <div className="h-1.5 rounded-full bg-cyan-400" style={{ width: "95%" }} />
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <div className="flex justify-between text-xs font-bold text-white">
                <span>Project Depth & Measurable Impact</span>
                <span className="text-red-400">90% Benchmark</span>
              </div>
              <div className="mt-2 h-1.5 w-full rounded-full bg-white/10">
                <div className="h-1.5 rounded-full bg-red-400" style={{ width: "90%" }} />
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <div className="flex justify-between text-xs font-bold text-white">
                <span>ATS Formatting & Parse Reliability</span>
                <span className="text-emerald-400">100% Benchmark</span>
              </div>
              <div className="mt-2 h-1.5 w-full rounded-full bg-white/10">
                <div className="h-1.5 rounded-full bg-emerald-400" style={{ width: "100%" }} />
              </div>
            </div>
          </div>
          <p className="mt-6 text-xs text-[#8c97a8]">
            Feedback provided in dedicated 1-on-1 resume review clinics before you begin applying.
          </p>
        </div>
      </div>
    </Section>
  );
}

export default AtsResumeSection;

