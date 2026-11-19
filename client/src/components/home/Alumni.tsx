"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "@/components/common/Icons";
import { CompanyLogo } from "@/components/common/CompanyLogo";
import { verifiedEmployers, verifiedPlacements } from "@/data/placements";
import { SectionHeading } from "./SectionHeading";

export function Alumni() {
  const rowRef = useRef<HTMLDivElement>(null);

  function scroll(dir: "left" | "right") {
    if (rowRef.current) {
      rowRef.current.scrollBy({
        left: dir === "left" ? -280 : 280,
        behavior: "smooth",
      });
    }
  }

  return (
    <section className="section-home alumni-section" id="alumni">
      <div className="shell">
        <div className="section-top">
          <SectionHeading
            eyebrow="COMMUNITY & OUTCOMES"
            title="Our Alumni Are Working At"
            highlight="Alumni Are Working At"
            description="Verified Talentele graduates placed across premier technology consulting and analytics organizations."
          />
          <div className="arrow-pair">
            <button
              type="button"
              aria-label="Previous alumni"
              onClick={() => scroll("left")}
            >
              <ChevronLeft width={20} height={20} />
            </button>
            <button
              type="button"
              aria-label="Next alumni"
              onClick={() => scroll("right")}
            >
              <ChevronRight width={20} height={20} />
            </button>
          </div>
        </div>

        {/* Real Alumni Profiles Carousel */}
        <div className="alumni-row" ref={rowRef} aria-label="Alumni success gallery">
          {verifiedPlacements.map((alumnus) => (
            <Link
              key={alumnus.id}
              href="/placement/"
              className="alumni-profile"
              title={`${alumnus.studentName} — ${alumnus.designation} at ${alumnus.company}`}
            >
              <Image
                src={alumnus.photo}
                alt={`${alumnus.studentName}, placed at ${alumnus.company}`}
                width={76}
                height={76}
              />
              <span className="alumni-name">{alumnus.studentName.split(" ")[0]}</span>
              <span className="alumni-company">{alumnus.companyShort || alumnus.company}</span>
            </Link>
          ))}
          <Link className="more-alumni" href="/placement/">
            +<small>View All Placements</small>
          </Link>
        </div>

        {/* Real Hiring Company Logos Grid */}
        <h3 className="company-heading">Top Companies Where Our Students Are Placed</h3>

        <div className="company-grid" aria-label="Hiring company partners">
          {verifiedEmployers.map((emp) => (
            <Link
              key={emp.shortName}
              href="/placement/"
              className="company-tile"
              title={`View alumni placed at ${emp.name}`}
            >
              <CompanyLogo name={emp.shortName} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
