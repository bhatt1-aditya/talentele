import { Check, Info } from "@/components/common/Icons";
import { Section } from "@/components/common/Section";
import { placementPrinciples } from "@/data/placements";

export function PlacementCharter() {
  return (
    <Section id="principles" labelledBy="principles-title" className="!py-12 md:!py-16">
      <div className="rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-50/50 via-white to-red-50/20 p-8 shadow-sm md:p-10">
        <div className="grid gap-6 md:grid-cols-12 md:items-center">
          <div className="md:col-span-4">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-red-600">
              Our Ethical Charter
            </p>
            <h2 id="principles-title" className="mt-3 text-2xl font-extrabold text-[#101828]">
              Assistance, not a fabricated guarantee.
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#667085]">
              We value integrity above easy marketing slogans. Here is our direct commitment to every enrolled student.
            </p>
          </div>
          <ul className="space-y-3.5 md:col-span-8">
            {placementPrinciples.map((p) => (
              <li key={p} className="flex items-start gap-3 rounded-xl bg-white p-4 border border-[#e4e8f0] shadow-2xs">
                <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-red-600 text-white">
                  <Check width={14} height={14} />
                </div>
                <span className="text-sm font-medium leading-relaxed text-[#101828]">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

export default PlacementCharter;

