"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Cloud,
  CodeXml,
  Play,
  ShieldCheck,
  Sparkles,
} from "@/components/common/Icons";
import { QuickEnquiryCard } from "@/components/common/QuickEnquiryCard";

const heroPrograms = [
  {
    num: "01",
    title: "Full Stack Development",
    desc: "Build modern, production-ready web applications.",
    href: "/courses/",
    icon: CodeXml,
  },
  {
    num: "02",
    title: "Data Science & AI",
    desc: "Turn data into intelligent, real-world solutions.",
    href: "/generative-ai-course/",
    icon: Sparkles,
  },
  {
    num: "03",
    title: "Cloud & DevOps",
    desc: "Deploy, automate and scale modern technology.",
    href: "/courses/",
    icon: Cloud,
  },
  {
    num: "04",
    title: "Software Testing",
    desc: "Create reliable products with industry-led QA skills.",
    href: "/software-testing-course/",
    icon: ShieldCheck,
  },
];

export function Hero() {
  return (
    <section className="hero-modern-section" id="home">
      {/* Soft ambient background radial glows in Talentele project brand colors */}
      <div className="hero-ambient-glow" aria-hidden="true" />
      <div className="hero-grid-pattern" aria-hidden="true" />

      <div className="shell hero-modern-layout">
        {/* Left Column: Heading, Showcase Cards & Action Controls */}
        <div className="hero-left-content">
          {/* Eyebrow Kicker */}
          <div className="hero-modern-kicker">
            <span className="hero-kicker-dash" aria-hidden="true" />
            <span>CAREER-FIRST TECHNOLOGY EDUCATION</span>
          </div>

          {/* Main Title */}
          <h1 className="hero-modern-title">
            Learn Today&apos;s <span className="hero-highlight-red">Emerging Technologies</span>
            <span className="hero-title-break">Turn Your Learning into Career Opportunities.</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-modern-desc">
            Practical, industry-aligned programs designed to move your career forward.
          </p>

          {/* 3-Column Visual Showcase (Left Poster + Right 2x2 Grid) */}
          <div className="hero-showcase-container">
            {/* Left Card: Success Stories / Hall of Excellence Poster */}
            <Link
              href="/placement/"
              className="hero-poster-card"
              title="View Talentele Hall of Excellence Placements"
            >
              <div className="poster-header-banner">
                <span className="poster-header-title">Your Success Stories</span>
              </div>

              <div className="poster-image-viewport">
                <Image
                  src="/images/hall-of-excellence-poster.jpg"
                  alt="Talentele Hall of Excellence - Over 45+ Alumni Placed at Top Companies"
                  width={340}
                  height={420}
                  className="poster-img"
                  priority
                />
              </div>

              <div className="poster-footer-bar">
                <span className="poster-pill-badge">
                  Hall of Excellence <ChevronRight width={12} height={12} />
                </span>
              </div>
            </Link>

            {/* Right: 2x2 Grid of Program Cards */}
            <div className="hero-programs-grid">
              {heroPrograms.map((prog) => {
                const IconComponent = prog.icon;
                return (
                  <Link
                    key={prog.num}
                    href={prog.href}
                    className="hero-prog-card"
                  >
                    {/* Top Row: Icon + Number */}
                    <div className="prog-card-top">
                      <span className="prog-card-icon-wrap">
                        <IconComponent width={17} height={17} />
                      </span>
                      <span className="prog-card-num">{prog.num}</span>
                    </div>

                    {/* Middle: Title & Desc */}
                    <div className="prog-card-body">
                      <h3 className="prog-card-title">{prog.title}</h3>
                      <p className="prog-card-desc">{prog.desc}</p>
                    </div>

                    {/* Bottom: Explore Link */}
                    <div className="prog-card-footer">
                      <span className="prog-card-link">
                        Explore course <ArrowRight width={13} height={13} className="prog-card-arrow" />
                      </span>
                    </div>

                    {/* Decorative subtle corner wave in project color */}
                    <div className="prog-card-corner-shape" aria-hidden="true" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Bottom Action Row: Buttons & Trust Checklist */}
          <div className="hero-bottom-actions">
            <div className="hero-cta-group">
              <Link className="btn-primary hero-btn-cta" href="/courses/">
                Explore Courses <ArrowRight width={17} height={17} />
              </Link>
              <Link className="hero-btn-story" href="/about-us/">
                <span className="story-play-icon">
                  <Play width={13} height={13} className="fill-current" />
                </span>
                <span>Watch Our Story</span>
              </Link>
            </div>

            {/* Trust Checklist Badges */}
            {/* <div className="hero-trust-list">
              <div className="trust-badge-item">
                <span className="trust-check-icon">
                  <Check width={12} height={12} />
                </span>
                <span>Career-focused learning</span>
              </div>
              <div className="trust-badge-item">
                <span className="trust-check-icon">
                  <Check width={12} height={12} />
                </span>
                <span>Practical projects</span>
              </div>
              <div className="trust-badge-item">
                <span className="trust-check-icon">
                  <Check width={12} height={12} />
                </span>
                <span>Placement support</span>
              </div>
            </div> */}
          </div>
        </div>

        {/* Right Column: Quick Enquiry Form Card */}
        <div className="hero-right-column">
          <QuickEnquiryCard />
        </div>
      </div>
    </section>
  );
}

export default Hero;
