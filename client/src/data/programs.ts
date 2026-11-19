import type { ComponentType, SVGProps } from "react";
import type { StaticImageData } from "next/image";

import {
  ChartColumn,
  Network,
  Sparkles,
  Megaphone,
} from "@/components/common/Icons";

import dataAnalyticsImg from "@/assets/images/courses/data-analytics.jpg";
import generativeAiImg from "@/assets/images/courses/generative-ai.jpg";
import sapImg from "@/assets/images/courses/sap.jpg";
import digitalMarketingImg from "@/assets/images/courses/digital-marketing.jpg";

export type ProgramItem = {
  title: string;
  category: string;
  description: string;
  skills: string[];
  accent: "cyan" | "violet" | "gold" | "pink";
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  image: StaticImageData;
  slug: string;
  href: string;
  minorProjects: string;
  capstoneProjects: string;
  duration: string;
};

/**
 * 4 Core Flagship Programs featured across the Homepage (matches Hero section).
 * Uses genuine course photographs instead of artificial neon icons.
 */
export const featuredPrograms: ProgramItem[] = [
  {
    title: "Data & Business Analytics",
    category: "Analytics & BI",
    description: "Turn complex data into strategic business decisions with SQL, Excel, and Power BI dashboards.",
    skills: ["Excel", "Power BI", "SQL", "Tableau"],
    accent: "cyan",
    icon: ChartColumn,
    image: dataAnalyticsImg,
    slug: "data-analytics",
    href: "/data-analytics-course/",
    minorProjects: "15-18 Minor Projects",
    capstoneProjects: "2 Capstone Projects",
    duration: "4 - 6 Months duration",
  },
  {
    title: "Data Science & Agentic AI + Gen AI",
    category: "AI, ML & Agents",
    description: "Master predictive machine learning, autonomous multi-agent pipelines, and generative AI systems.",
    skills: ["Python", "Machine Learning", "OpenAI", "Prompt Eng."],
    accent: "violet",
    icon: Sparkles,
    image: generativeAiImg,
    slug: "generative-ai",
    href: "/generative-ai-course/",
    minorProjects: "15-18 Minor Projects",
    capstoneProjects: "2 Capstone Projects",
    duration: "10 + 2 Months duration",
  },
  {
    title: "SAP - FICO, MM, ABAP, SD",
    category: "Enterprise ERP",
    description: "Build an enterprise consulting career with hands-on SAP configuration across FICO, MM, SD & ABAP.",
    skills: ["SAP FICO", "SAP MM", "SAP SD", "SAP ABAP"],
    accent: "gold",
    icon: Network,
    image: sapImg,
    slug: "sap",
    href: "/sap-course/",
    minorProjects: "10+ Minor Projects",
    capstoneProjects: "1 Capstone Project",
    duration: "5 - 7 Months duration",
  },
  {
    title: "Digital Marketing",
    category: "Growth & Media",
    description: "Drive multi-channel ROI with performance advertising, SEO, paid social funnels, and web analytics.",
    skills: ["Google Ads", "Meta Ads", "SEO", "Analytics"],
    accent: "pink",
    icon: Megaphone,
    image: digitalMarketingImg,
    slug: "digital-marketing",
    href: "/contact-us/?course=guidance",
    minorProjects: "10+ Minor Projects",
    capstoneProjects: "1 Capstone Project",
    duration: "5 - 7 Months duration",
  },
];
