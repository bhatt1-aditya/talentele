"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  Clock,
  MapPin,
  Phone,
  Sparkles,
} from "@/components/common/Icons";
import { ToolLogo } from "@/components/common/ToolLogo";
import { upcomingCohorts } from "@/data/cohorts";
import { site } from "@/data/site";
import { SectionHeading } from "./SectionHeading";

const filterCategories = [
  "All Programs",
  "Data & Analytics",
  "AI & Machine Learning",
  "Business Intelligence",
  "Enterprise Software",
];

export function Cohorts() {
  const [activeCategory, setActiveCategory] = useState("All Programs");
  const [showAll, setShowAll] = useState(false);

  const filteredCohorts =
    activeCategory === "All Programs"
      ? upcomingCohorts
      : upcomingCohorts.filter((c) => c.category === activeCategory);

  const displayedCohorts = showAll ? filteredCohorts : filteredCohorts.slice(0, 2);

  return (
    <section className="section-home cohorts-section" id="upcoming-batches" aria-labelledby="cohorts-title">
      <div className="shell">
        {/* Section Header */}
        <div className="section-top">
          <SectionHeading
            eyebrow="UPCOMING TRAINING PROGRAMS"
            title="Upcoming Courses and Batches"
            highlight="Courses and Batches"
            description="Explore our upcoming training programs, available learning formats and batch schedules. Connect with our team for confirmed admission dates."
          />
          <Link className="text-link" href="/courses/">
            View All Courses <ArrowRight width={17} height={17} />
          </Link>
        </div>

        {/* Category Filter Pills */}
        <div className="cohort-filter-bar" role="tablist" aria-label="Course categories">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => {
                setActiveCategory(cat);
                setShowAll(false);
              }}
              className={`cohort-filter-btn ${activeCategory === cat ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Professional Course Batch Schedule List */}
        <div className="cohort-schedule-list" role="tabpanel">
          {displayedCohorts.map((cohort) => (
            <article key={cohort.id} className="cohort-schedule-row">
              {/* 1. Real Course Thumbnail & Category */}
              <div className="cohort-row-media">
                <Image
                  src={cohort.image}
                  alt={`Talentele ${cohort.courseTitle} batch`}
                  fill
                  sizes="(min-width: 1024px) 240px, 100vw"
                  className="cohort-row-img"
                />
                <span className="cohort-row-tag">{cohort.category}</span>
              </div>

              {/* 2. Course Details & Curriculum Summary */}
              <div className="cohort-row-body">
                <div className="cohort-row-title-wrap">
                  <h3>
                    <Link href={`/${cohort.slug}-course/`}>
                      {cohort.courseTitle}
                    </Link>
                  </h3>
                  <span className={`status-pill status-${cohort.statusTone}`}>
                    <span className="status-dot" />
                    {cohort.status}
                  </span>
                </div>

                {/* <p className="cohort-row-summary">{cohort.summary}</p> */}

                {/* Practical Tools Covered */}
                <div className="cohort-tool-tags">
                  <span className="tool-label">Key Tools:</span>
                  {cohort.tools.map((tool) => (
                    <span key={tool} className="tool-tag">
                      <ToolLogo name={tool} width={12} height={12} className="tool-tag-icon" />
                      <span>{tool}</span>
                    </span>
                  ))}
                </div>

                {/* Verified Batch Metadata */}
                <div className="cohort-row-meta">
                  <span>
                    <CalendarDays width={14} height={14} />
                    <span><b>Schedule:</b> {cohort.schedule}</span>
                  </span>
                  <span>
                    <Clock width={14} height={14} />
                    <span><b>Duration:</b> {cohort.duration}</span>
                  </span>
                  <span>
                    <MapPin width={14} height={14} />
                    <span><b>Mode:</b> {cohort.mode}</span>
                  </span>
                </div>

                {/* Practical Highlights */}
                {/* <p className="cohort-row-highlights">
                  <ShieldCheck width={13} height={13} className="shrink-0 text-emerald-600" />
                  <span>{cohort.highlights}</span>
                </p> */}
              </div>

              {/* 3. Direct Actions */}
              <div className="cohort-row-actions">
                <Link
                  href={`/contact-us/?course=${cohort.slug}`}
                  className="btn-primary cohort-action-primary"
                >
                  <span>Enquire for Batch</span>
                  <ArrowRight width={15} height={15} />
                </Link>

                <Link
                  href={`/${cohort.slug}-course/`}
                  className="btn-outline cohort-action-secondary"
                >
                  <span>View Syllabus</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Show More / Show Less Toggle Button */}
        {filteredCohorts.length > 2 && (
          <div className="cohort-toggle-wrap">
            <button
              type="button"
              className="cohort-toggle-btn"
              onClick={() => setShowAll((prev) => !prev)}
              aria-expanded={showAll}
            >
              <span>
                {showAll
                  ? "Show Less Batches"
                  : `View More Batches (+${filteredCohorts.length - 2} More)`}
              </span>
              <ChevronDown
                width={16}
                height={16}
                className={`cohort-toggle-icon ${showAll ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        )}

        {/* Informative Admissions Notice Banner */}
        <div className="cohort-admissions-banner">
          <div className="banner-content">
            <span className="banner-kicker">
              <Sparkles width={14} height={14} className="text-red-500" />
              Custom Timings & Corporate Cohorts
            </span>
            <h4>Need a specialized weekend schedule or 1-on-1 profile guidance?</h4>
            <p>
              Our academic advisors in Nayapalli, Bhubaneswar can evaluate your current work hours
              and recommend flexible weekday or weekend timings.
            </p>
          </div>

          <div className="banner-actions">
            <a href={site.phone.href} className="btn-phone-contact">
              <Phone width={15} height={15} />
              <span>Call {site.phone.display}</span>
            </a>
            <Link href="/contact-us/" className="btn-primary">
              <span>Book Free Counselling</span>
              <ArrowRight width={15} height={15} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cohorts;
