"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "@/components/common/Icons";
import { ToolLogo } from "@/components/common/ToolLogo";
import { featuredPrograms } from "@/data/programs";
import { SectionHeading } from "./SectionHeading";

export function Programs() {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(direction: "left" | "right") {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  }

  return (
    <section className="section-home programs-section" id="courses">
      <div className="shell">
        <div className="section-top">
          <SectionHeading
            eyebrow="EXPLORE YOUR PATH"
            title="Our Programs"
            highlight="Programs"
            description="Choose from industry-oriented programs designed for real-world careers and future-ready skills."
          />
          <div className="arrow-pair">
            <button
              type="button"
              aria-label="Previous program"
              onClick={() => scroll("left")}
            >
              <ChevronLeft width={20} height={20} />
            </button>
            <button
              type="button"
              aria-label="Next program"
              onClick={() => scroll("right")}
            >
              <ChevronRight width={20} height={20} />
            </button>
          </div>
        </div>

        <div className="program-grid" ref={scrollRef}>
          {featuredPrograms.map((prog, idx) => (
            <article key={prog.title} className="program-card">
              {/* Inset Course Visual */}
              <div className="program-visual">
                <Image
                  src={prog.image}
                  alt={`Talentele ${prog.title} course training`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="program-img"
                  priority={idx < 2}
                />
              </div>

              <div className="program-content">
                <h3>{prog.title}</h3>
                <p>{prog.description}</p>

                {/* Tool Icon Tiles */}
                <div className="program-tools" aria-label={`Tools covered in ${prog.title}`}>
                  {prog.skills.map((skill) => (
                    <span key={skill} className="tool-box" title={skill}>
                      <ToolLogo name={skill} width={22} height={22} className="tool-box-logo" />
                    </span>
                  ))}
                </div>

                {/* Projects & Duration Pills */}
                <div className="program-highlights">
                  <div className="highlights-row">
                    <span className="highlight-pill highlight-project">{prog.minorProjects}</span>
                    <span className="highlight-pill highlight-capstone">{prog.capstoneProjects}</span>
                  </div>
                  <div className="highlight-pill highlight-duration">{prog.duration}</div>
                </div>

                {/* Premium Dark Navy View Curriculum Button */}
                <Link href={prog.href} className="btn-curriculum">
                  <span>View Curriculum</span>
                  <span className="curriculum-arrow" aria-hidden="true">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
