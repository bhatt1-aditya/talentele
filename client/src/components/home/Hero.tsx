"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
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

      <div className="shell hero-modern-shell">
        {/* Main Grid: Left (Headline + Full Uncropped Poster Image) vs Right (Quick Enquiry Form) */}
        <div className="hero-main-grid">
          {/* Left Column: Heading + Full Poster Image */}
          <div className="hero-left-column">
            {/* Main Title (Top aligned, tighter spacing) */}
            <h1 className="hero-modern-title">
              Learn Today&apos;s <span className="hero-highlight-red">Emerging Technologies</span>
              <span className="hero-title-break">Turn Your Learning into Career Opportunities.</span>
            </h1>

            {/* Subtitle */}
            <p className="hero-modern-desc">
              Practical, industry-aligned programs designed to move your career forward.
            </p>

            {/* Poster Image Card: Full image, uncropped, zero side space, matches form styling */}
            <Link
              href="/placement/"
              className="hero-poster-card-full"
              title="View Talentele Hall of Excellence Placements"
            >
              <Image
                src="/images/hall-of-excellence-poster.jpg"
                alt="Talentele Hall of Excellence - Over 48+ Alumni Placed at Top Companies"
                width={1024}
                height={731}
                className="poster-img-full-fit"
                priority
              />
            </Link>
          </div>

          {/* Right Column: Quick Enquiry Form Card */}
          <div className="hero-right-column">
            <QuickEnquiryCard />
          </div>
        </div>

        {/* Centered Action Buttons (Between Main Showcase and Programs Row) */}
        <div className="hero-cta-center-row">
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
        </div>

        {/* 4 Courses in 1 Line Column Format (Small & Compact) */}
        <div className="hero-programs-one-line">
          {heroPrograms.map((prog) => {
            const IconComponent = prog.icon;
            return (
              <Link
                key={prog.num}
                href={prog.href}
                className="hero-prog-card hero-prog-card-sm-line"
              >
                <div className="prog-card-top">
                  <span className="prog-card-icon-wrap">
                    <IconComponent width={14} height={14} />
                  </span>
                  <span className="prog-card-num">{prog.num}</span>
                </div>

                <div className="prog-card-body">
                  <h3 className="prog-card-title">{prog.title}</h3>
                  <p className="prog-card-desc">{prog.desc}</p>
                </div>

                <div className="prog-card-footer">
                  <span className="prog-card-link">
                    Explore course <ArrowRight width={11} height={11} className="prog-card-arrow" />
                  </span>
                </div>

                <div className="prog-card-corner-shape" aria-hidden="true" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Hero;
