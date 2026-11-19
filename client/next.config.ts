import type { NextConfig } from "next";

import { courseSlugs } from "./src/data/slugs";

const nextConfig: NextConfig = {
  experimental: {
    agentUpgrade: "security",
  },
  cacheComponents: true,
  partialPrefetching: true,
  trailingSlash: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      { source: "/about/", destination: "/about-us/", permanent: true },
      { source: "/contact/", destination: "/contact-us/", permanent: true },
      { source: "/register/", destination: "/contact-us/", permanent: true },
      { source: "/placements/", destination: "/placement/", permanent: true },
      { source: "/testimonials/", destination: "/placement/", permanent: true },
      { source: "/faqs/", destination: "/#faq", permanent: true },
      { source: "/new-home/", destination: "/", permanent: true },
      // Redirect /courses/<slug>/ to canonical /<slug>-course/
      ...courseSlugs.map((slug) => ({
        source: `/courses/${slug}/`,
        destination: `/${slug}-course/`,
        permanent: true,
      })),
      // Legacy blog posts and pages from Google Search Console
      {
        source: "/what-is-sap-abap-what-salary-job-growth-can-you-expect-in-the-coming-years/",
        destination: "/sap-course/",
        permanent: true,
      },
      {
        source: "/is-it-true-that-learning-sap-abap-helps-you-get-an-onsite-job/",
        destination: "/sap-course/",
        permanent: true,
      },
      {
        source: "/what-high-paying-jobs-can-you-get-after-learning-data-analytics/",
        destination: "/data-analytics-course/",
        permanent: true,
      },
      {
        source: "/which-jobs-will-be-automated-by-2026-if-you-dont-learn-data-analytics/",
        destination: "/data-analytics-course/",
        permanent: true,
      },
      {
        source: "/zero-to-hero-how-to-become-a-data-engineer-in-6-months/",
        destination: "/data-science-course/",
        permanent: true,
      },
      {
        source: "/switching-from-non-it-to-an-it-job-is-data-science-the-right-path/",
        destination: "/data-science-course/",
        permanent: true,
      },
      {
        source: "/business-analytics-vs-data-analytics-which-one-is-the-best-career-path-for-you/",
        destination: "/blog/data-analyst-vs-data-scientist-vs-business-analyst/",
        permanent: true,
      },
      {
        source: "/python-projects-for-freshers-7-portfolio-ideas/",
        destination: "/blog/how-to-build-a-data-analytics-portfolio/",
        permanent: true,
      },
      {
        source: "/python-vs-sql-which-should-you-learn-first-to-start-a-data-career/",
        destination: "/blog/sql-excel-or-python-what-to-learn-first/",
        permanent: true,
      },
      {
        source: "/sql-for-data-science-is-it-just-queries-or-a-career-game-changer/",
        destination: "/sql-course/",
        permanent: true,
      },
      {
        source: "/you-will-lose-future-jobs-if-you-dont-learn-gen-ai-tools/",
        destination: "/generative-ai-course/",
        permanent: true,
      },
      {
        source: "/why-college-students-should-learn-gen-ai-real-career-benefits/",
        destination: "/generative-ai-course/",
        permanent: true,
      },
      {
        source: "/gen-ai-which-skills-will-give-the-highest-paying-jobs-in-the-next-10-years/",
        destination: "/generative-ai-course/",
        permanent: true,
      },
      {
        source: "/early-tech-skills-for-school-students-python-or-ai/",
        destination: "/python-course/",
        permanent: true,
      },
      {
        source: "/future-jobs-2030-which-tech-skills-will-help-you-earn-a-million-salary/",
        destination: "/blog/",
        permanent: true,
      },
      {
        source: "/author/:path*",
        destination: "/blog/",
        permanent: true,
      },
      {
        source: "/category/:path*",
        destination: "/blog/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
