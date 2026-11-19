"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Play, Sparkles } from "@/components/common/Icons";
import { QuickEnquiryCard } from "@/components/common/QuickEnquiryCard";
import { ToolLogo } from "@/components/common/ToolLogo";

const heroCourses = [
  {
    name: "Data & Business Analytics",
    tools: "Power BI • SQL • Excel",
    href: "/data-analytics-course/",
    accent: "cyan",
  },
  {
    name: "Data Science & Agentic AI + Gen AI",
    tools: "Python • ML • Prompt Eng.",
    href: "/generative-ai-course/",
    accent: "violet",
  },
  {
    name: "SAP - ERP",
    tools: "FICO • MM • SD • ABAP",
    href: "/sap-course/",
    accent: "blue",
  },
  {
    name: "Digital Marketing",
    tools: "Performance Ads • SEO • Analytics",
    href: "/contact-us/?course=guidance",
    accent: "rose",
  },
];

export function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-grid" aria-hidden="true" />
      <div className="orb orb-one" aria-hidden="true" />
      <div className="orb orb-two" aria-hidden="true" />

      <div className="shell hero-layout">
        {/* Left Column: Copy & Actions */}
        <div className="hero-copy">
          <span className="hero-kicker">
            <Sparkles width={16} height={16} /> Career-first technology education
          </span>

          <h1>
            {/* Build Real Skills */}
            Learn Today's Emerging {" "}
            {/* <br /> */}
            {/* For */}
            Technologies<br />
            <span>
              {/* A Brighter Tomorrow */}
              Turn Your Learning into Career Opportunities.
            </span>
          </h1>

          <p>
            Industry-oriented programs in Data, AI, ERP & Digital Marketing with expert mentors,
            live projects and placement support.
          </p>

          <div className="hero-courses" role="region" aria-label="Featured programs">
            {heroCourses.map(({ name, tools, href, accent }) => (
              <Link
                key={name}
                href={href}
                className={`hero-course-card hero-course-${accent}`}
              >
                <span className="hero-course-icon-badge">
                  <ToolLogo name={name} width={20} height={20} className="hero-course-icon" />
                </span>
                <div className="hero-course-info">
                  <span className="hero-course-name">{name}</span>
                  <span className="hero-course-tools">{tools}</span>
                </div>
                <span className="hero-course-arrow" aria-hidden="true">
                  <ArrowUpRight width={14} height={14} />
                </span>
              </Link>
            ))}
          </div>

          <div className="hero-actions">
            <Link className="btn-primary" href="#courses">
              Explore Courses <ArrowRight width={18} height={18} />
            </Link>
            <Link className="btn-ghost" href="/about-us/">
              <Play width={16} height={16} /> Watch Our Story
            </Link>
          </div>
        </div>

        {/* Right Column: Quick Enquiry Card */}
        <QuickEnquiryCard />
      </div>
    </section>
  );
}
