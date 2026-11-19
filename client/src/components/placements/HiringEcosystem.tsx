import { Section, SectionHeading } from "@/components/common/Section";
import { verifiedEmployers } from "@/data/placements";

const sectors = [
  "IT Services & Consulting",
  "Analytics Boutiques",
  "FinTech & Banking",
  "Supply Chain & Retail",
  "Enterprise Software (ERP)",
  "HealthTech & Pharma",
  "Digital & E-Commerce",
  "SaaS & Cloud Platforms",
];

export function HiringEcosystem() {
  return (
    <Section tone="mist" labelledBy="ecosystem-title">
      <SectionHeading
        id="ecosystem-title"
        eyebrow="HIRING SECTORS & ORGANIZATIONS"
        title="Industries Employing Talentele Graduates"
        intro="Our curriculum aligns directly with the toolkits and problem sets sought by enterprise consulting firms and product organizations."
        align="center"
      />

      {/* Verified Employers List */}
      <div className="mt-12 rounded-2xl border border-[#e4e8f0] bg-white p-8 shadow-xs">
        <div className="text-center">
          <p className="text-xs font-extrabold uppercase tracking-wider text-[#667085]">
            Verified Alumni Employers
          </p>
          <p className="mt-1 text-xs text-[#8c97a8]">
            Organizations with verified Talentele graduates across Bhubaneswar and national IT hubs
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {verifiedEmployers.map((emp) => (
            <div
              key={emp.shortName}
              className="flex flex-col items-center justify-center rounded-xl border border-[#e4e8f0] bg-[#f8fafc] px-4 py-3.5 text-center transition-colors hover:border-red-500/30 hover:bg-white"
            >
              <span className="text-sm font-bold text-[#101828]">{emp.shortName}</span>
              <span className="mt-0.5 text-[10px] text-[#667085]">{emp.sector}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Industry Sectors Grid */}
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {sectors.map((sector) => (
          <div
            key={sector}
            className="flex items-center justify-center rounded-xl border border-[#e4e8f0] bg-white p-4 text-center text-xs font-semibold text-[#101828] shadow-2xs"
          >
            {sector}
          </div>
        ))}
      </div>
    </Section>
  );
}

export default HiringEcosystem;
