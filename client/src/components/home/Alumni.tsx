"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "@/components/common/Icons";
import { CompanyLogo } from "@/components/common/CompanyLogo";
import { verifiedEmployers, verifiedPlacements } from "@/data/placements";
import { SectionHeading } from "./SectionHeading";

export function Alumni() {
  const rowRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);

  function scroll(dir: "left" | "right") {
    if (rowRef.current) {
      rowRef.current.scrollBy({
        left: dir === "left" ? -280 : 280,
        behavior: "smooth",
      });
    }
  }

  // Smooth continuous auto-scroll with pause on hover
  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    let animId: number;
    let lastTime = performance.now();

    const step = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (!isHoveredRef.current && el) {
        // Move smoothly at ~36px per second
        el.scrollLeft += (delta / 1000) * 36;

        // When scrolled past half the duplicated list, reset seamlessly
        const half = el.scrollWidth / 3;
        if (el.scrollLeft >= half) {
          el.scrollLeft -= half;
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Triple the items for a seamless, glitch-free continuous loop across all screen sizes
  const displayPlacements = [
    ...verifiedPlacements,
    ...verifiedPlacements,
    ...verifiedPlacements,
  ];

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

        {/* Real Alumni Profiles Carousel with Auto-Scroll & Interactive Tooltips */}
        <div
          className="alumni-carousel-wrapper"
          onMouseEnter={() => {
            isHoveredRef.current = true;
          }}
          onMouseLeave={() => {
            isHoveredRef.current = false;
          }}
          onTouchStart={() => {
            isHoveredRef.current = true;
          }}
          onTouchEnd={() => {
            isHoveredRef.current = false;
          }}
        >
          <div
            className="alumni-row"
            ref={rowRef}
            aria-label="Alumni success gallery"
          >
            {displayPlacements.map((alumnus, idx) => (
              <Link
                key={`${alumnus.id}-${idx}`}
                href="/placement/"
                className="alumni-profile"
              >
                <div className="alumni-avatar-wrapper">
                  <Image
                    src={alumnus.photo}
                    alt={`${alumnus.studentName}, placed at ${alumnus.company}`}
                    width={78}
                    height={78}
                  />
                  {/* Floating Animated Tooltip */}
                  <div className="alumni-tooltip" aria-hidden="true">
                    <strong>{alumnus.studentName}</strong>
                    <span className="tooltip-role">{alumnus.designation}</span>
                    <span className="tooltip-company">
                      {alumnus.companyShort || alumnus.company}
                    </span>
                  </div>

                </div>
                <span className="alumni-name">
                  {alumnus.studentName.split(" ")[0]}
                </span>
                <span className="alumni-company">
                  {alumnus.companyShort || alumnus.company}
                </span>
              </Link>
            ))}
            <Link className="more-alumni" href="/placement/">
              +<small>View All Placements</small>
            </Link>
          </div>
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
