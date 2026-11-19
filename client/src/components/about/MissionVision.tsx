import { Section } from "@/components/common/Section";
import { site } from "@/data/site";

export function MissionVision() {
  return (
    <Section tone="dark" labelledBy="mission-title">
      <div className="grid gap-10 md:grid-cols-2 lg:gap-14">
        <div className="rounded-2xl border border-white/10 bg-[#0c1833] p-8 md:p-10 shadow-lg">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-red-400">
            Our Mission
          </p>
          <h2 id="mission-title" className="mt-3 text-2xl font-extrabold tracking-tight text-white md:text-3xl">
            Practical, affordable & real-time learning for everyone.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#c5cddd]">
            {site.mission} We exist to empower individuals from all academic backgrounds to master
            the exact technical instruments used across high-growth companies without paying
            inflated metropolitan course fees.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0c1833] p-8 md:p-10 shadow-lg">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-cyan-400">
            Our Vision
          </p>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-white md:text-3xl">
            To be Odisha&apos;s benchmark tech finishing school.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#c5cddd]">
            We envision a future where every learner from Eastern India can access world-class
            mentorship, build verified project portfolios, and enter the global technology
            workforce with total competitive confidence.
          </p>
        </div>
      </div>
    </Section>
  );
}

export default MissionVision;
