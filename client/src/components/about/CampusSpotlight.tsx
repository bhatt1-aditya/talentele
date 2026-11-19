import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin } from "@/components/common/Icons";
import { Section } from "@/components/common/Section";
import { addressLines, site } from "@/data/site";

export function CampusSpotlight() {
  return (
    <Section tone="mist" labelledBy="visit-title">
      <div className="grid gap-8 rounded-2xl border border-[#e4e8f0] bg-white p-8 md:grid-cols-2 md:items-center md:p-12 shadow-sm">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-red-600">
            Bhubaneswar Campus
          </p>
          <h2 id="visit-title" className="mt-3 text-2xl font-extrabold text-[#101828] md:text-3xl">
            Visit us in Nayapalli, Bhubaneswar
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#667085]">
            Drop in during operating hours (Mon – Sat: 9:00 AM – 7:00 PM) for in-person counselling,
            faculty interaction, and a live demo of our analytics lab.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/contact-us/" className="btn-primary">
              Book Campus Visit <ArrowRight width={16} height={16} />
            </Link>
          </div>
        </div>

        <a
          href={site.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col justify-between rounded-xl border border-[#e4e8f0] bg-[#f5f7fb] p-6 transition-all hover:border-red-500/40 hover:shadow-md"
        >
          <div className="flex items-start gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-red-600 text-white">
              <MapPin width={20} height={20} />
            </div>
            <div className="text-sm">
              <p className="font-bold text-[#101828]">Talentele Learning Institute</p>
              <address className="mt-1 not-italic leading-relaxed text-[#667085]">
                {addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-2 text-xs font-bold text-red-600 group-hover:underline">
            <span>Open in Google Maps</span>
            <ArrowUpRight width={14} height={14} />
          </div>
        </a>
      </div>
    </Section>
  );
}

export default CampusSpotlight;

