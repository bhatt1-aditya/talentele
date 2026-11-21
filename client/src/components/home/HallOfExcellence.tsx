"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Close, Sparkles } from "@/components/common/Icons";

export function HallOfExcellence() {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <section className="section-home hall-section" id="hall-of-excellence">
      <div className="shell">
        {/* Section Header */}
        <div className="hall-header text-center">
          {/* <span className="hall-eyebrow">
            <Sparkles width={15} height={15} /> PROUD OUTCOMES & RECOGNITION
          </span> */}
          <h2 className="hall-title">
            Our <span>Hall of Excellence</span>
          </h2>
          <p className="hall-subtitle">
            Celebrating verified Talentele graduates placed across premier multinational technology,
            consulting, banking, and analytics organizations.
          </p>
        </div>

        {/* Master Showcase Banner Container */}
        <div className="hall-showcase-card">
          <div
            className="hall-image-wrapper"
            onClick={() => setIsZoomed(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setIsZoomed(true);
            }}
            aria-label="Click to enlarge Hall of Excellence placement banner"
            title="Click to view full screen"
          >
            <Image
              src="/images/home/hall-of-excellence.jpg"
              alt="Talentele Hall of Excellence - Exceptional Placement and Careers"
              width={1024}
              height={731}
              className="hall-banner-img"
              priority
            />
            <div className="hall-zoom-hint" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="11" y1="8" x2="11" y2="14" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
              <span>Click to view full screen</span>
            </div>
          </div>

          {/* Quick Stats Highlights */}
          <div className="hall-stats-grid">
            <div className="hall-stat-box">
              <span className="hall-stat-num">60+</span>
              <span className="hall-stat-label">Enterprise Placements</span>
            </div>
            <div className="hall-stat-divider" />
            <div className="hall-stat-box">
              <span className="hall-stat-num">15+</span>
              <span className="hall-stat-label">Global Tier-1 MNCs</span>
            </div>
            <div className="hall-stat-divider" />
            <div className="hall-stat-box">
              <span className="hall-stat-num">100%</span>
              <span className="hall-stat-label">Placement Assistance</span>
            </div>
            <div className="hall-stat-divider" />
            <div className="hall-stat-box">
              <span className="hall-stat-num">120%</span>
              <span className="hall-stat-label">Highest Transition Hike</span>
            </div>
          </div>

          {/* Footer Call to Action */}
          <div className="hall-actions-row">
            <Link href="/placement/" className="btn-hall-primary">
              <span>View Verified Placements & Stories</span>
              <ArrowRight width={16} height={16} />
            </Link>
            <Link href="/contact-us/" className="btn-hall-outline">
              <span>Enquire For Upcoming Batch</span>
              <ArrowRight width={16} height={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Full-Screen Zoom Lightbox Modal */}
      {isZoomed && (
        <div
          className="hall-lightbox-backdrop"
          onClick={() => setIsZoomed(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Hall of Excellence full-size banner"
        >
          <div className="hall-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="hall-lightbox-close"
              onClick={() => setIsZoomed(false)}
              aria-label="Close full view"
            >
              <Close width={22} height={22} />
            </button>
            <Image
              src="/images/home/hall-of-excellence.jpg"
              alt="Talentele Hall of Excellence - Exceptional Placement and Careers Full Banner"
              width={1400}
              height={1000}
              className="hall-lightbox-img"
            />
          </div>
        </div>
      )}
    </section>
  );
}
