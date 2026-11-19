import { Section, SectionHeading } from "@/components/common/Section";
import { placementRoadmapSteps } from "@/data/placements";

export function PlacementProcess() {
  return (
    <Section tone="mist" labelledBy="process-title">
      <SectionHeading
        id="process-title"
        eyebrow="END-TO-END ROADMAP"
        title="Our 8-Step Placement & Career Process"
        intro="Career preparation is woven directly into your practical training from the very first week, ensuring you possess both portfolio evidence and interview mastery."
        align="center"
      />

      <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {placementRoadmapSteps.map((step) => (
          <li
            key={step.step}
            className="flex flex-col justify-between rounded-xl border border-[#e4e8f0] bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-red-500/30 hover:shadow-md"
          >
            <div>
              <span className="font-display text-2xl font-extrabold text-red-600">
                {step.step}
              </span>
              <h3 className="mt-3 text-base font-bold leading-snug text-[#101828]">
                {step.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#667085]">
                {step.description}
              </p>
            </div>
            <div className="mt-6 border-t border-[#e4e8f0] pt-3 text-[11px] font-semibold text-red-600">
              Stage {step.step}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export default PlacementProcess;
