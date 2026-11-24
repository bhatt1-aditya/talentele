import type { StaticImageData } from "next/image";

import dataAnalyticsImg from "@/assets/images/courses/data-analytics.jpg";
import businessAnalyticsImg from "@/assets/images/courses/business-analytics.jpg";
import dataScienceImg from "@/assets/images/courses/data-science.jpg";
import generativeAiImg from "@/assets/images/courses/generative-ai.jpg";
import softwareTestingImg from "@/assets/images/courses/software-testing.jpg";
import powerBiImg from "@/assets/images/courses/power-bi.jpg";
import sapImg from "@/assets/images/courses/sap.jpg";
import pythonImg from "@/assets/images/courses/python.jpg";
import excelImg from "@/assets/images/courses/excel.jpg";
import sqlImg from "@/assets/images/courses/sql.jpg";

export type CohortItem = {
  id: string;
  slug: string;
  courseTitle: string;
  category: string;
  image: StaticImageData;
  summary: string;
  tools: string[];
  schedule: string;
  duration: string;
  mode: string;
  status: "Admissions Open" | "Fast-Filling Cohort" | "Upcoming Batch" | "Seats Limited";
  statusTone: "emerald" | "amber" | "blue";
  highlights: string;
};

/**
 * Authentic upcoming training batches and cohorts at Talentele, Bhubaneswar.
 * Real course photos, verified durations, and direct syllabus & enquiry paths.
 */
export const upcomingCohorts: CohortItem[] = [
  {
    id: "cohort-da",
    slug: "data-analytics",
    courseTitle: "Data Analytics Master Program",
    category: "Data & Analytics",
    image: dataAnalyticsImg,
    summary:
      "Comprehensive practical training covering SQL query mastery, Advanced Excel modeling, and enterprise Power BI dashboard architecture.",
    tools: ["SQL", "Power BI", "Excel", "Python", "DAX"],
    schedule: "Weekday & Weekend Batches",
    duration: "16–20 Weeks (Practical)",
    mode: "Classroom (Nayapalli, Bhubaneswar) & Live Online",
    status: "Admissions Open",
    statusTone: "emerald",
    highlights: "1-on-1 Doubt Sessions • 8 Capstone Projects • ATS Resume & Mocks",
  },
  {
    id: "cohort-ba",
    slug: "business-analytics",
    courseTitle: "Business Analytics & Intelligence",
    category: "Analytics & BI",
    image: businessAnalyticsImg,
    summary:
      "Transform business data into executive decision models with financial analytics, statistical reporting, and KPI storytelling.",
    tools: ["Power BI", "Tableau", "Excel VBA", "Financial Modeling", "KPIs"],
    schedule: "Weekday & Weekend Batches",
    duration: "16 Weeks (Hands-on)",
    mode: "Classroom (Nayapalli) & Live Online",
    status: "Fast-Filling Cohort",
    statusTone: "amber",
    highlights: "Mentored by ex-Accenture/HSBC Faculty • Real Case Studies",
  },
  {
    id: "cohort-ds",
    slug: "data-science",
    courseTitle: "Data Science & Machine Learning",
    category: "AI & Machine Learning",
    image: dataScienceImg,
    summary:
      "End-to-end data science pipelines: machine learning algorithms, predictive modeling, statistical inference, and real-world project portfolios.",
    tools: ["Python", "Pandas", "Scikit-Learn", "TensorFlow", "MLflow"],
    schedule: "Weekend Specialized Cohort",
    duration: "20–24 Weeks",
    mode: "Classroom & Live Interactive Online",
    status: "Upcoming Batch",
    statusTone: "blue",
    highlights: "Production ML Pipelines • Deployment • Portfolio Code",
  },
  {
    id: "cohort-genai",
    slug: "generative-ai",
    courseTitle: "Generative AI & Agentic AI Masterclass",
    category: "AI & Machine Learning",
    image: generativeAiImg,
    summary:
      "Master LLMs, prompt engineering, LangChain, RAG architecture, and autonomous multi-agent systems for modern tech roles.",
    tools: ["OpenAI", "LangChain", "Python", "LlamaIndex", "ChromaDB"],
    schedule: "Weekend Intensive Track",
    duration: "12–14 Weeks",
    mode: "Live Interactive Online & Classroom",
    status: "Admissions Open",
    statusTone: "emerald",
    highlights: "Autonomous Agents • RAG Systems • Vector Database Integration",
  },
  {
    id: "cohort-st",
    slug: "software-testing",
    courseTitle: "Software Testing & QA Automation",
    category: "Enterprise Software",
    image: softwareTestingImg,
    summary:
      "Learn how software is tested: manual test design, defect reporting, Selenium UI automation, and API testing with Postman and Jenkins.",
    tools: ["Selenium", "Postman", "JIRA", "JUnit", "Jenkins", "SQL"],
    schedule: "Weekday & Weekend Cohorts",
    duration: "12–16 Weeks",
    mode: "Classroom Lab & Live Online",
    status: "Fast-Filling Cohort",
    statusTone: "amber",
    highlights: "Live Web & API Testing Labs • CI/CD Integration • Real Bug Tracking",
  },
  {
    id: "cohort-pbi",
    slug: "power-bi",
    courseTitle: "Microsoft Power BI Masterclass",
    category: "Business Intelligence",
    image: powerBiImg,
    summary:
      "Master DAX expressions, star schema data modeling, automated gateway refreshes, and enterprise client reporting.",
    tools: ["Power BI Desktop", "Power BI Service", "DAX", "SQL", "Power Query"],
    schedule: "Flexible Weekend & Evening Batches",
    duration: "8–10 Weeks (Intensive)",
    mode: "Classroom Lab & Live Online",
    status: "Admissions Open",
    statusTone: "emerald",
    highlights: "Live Enterprise Datasets • Row-Level Security • Portfolio Dashboards",
  },
  {
    id: "cohort-sap",
    slug: "sap",
    courseTitle: "SAP Enterprise ERP Training",
    category: "Enterprise Software",
    image: sapImg,
    summary:
      "Enterprise software consulting training covering financial accounting (FICO), materials management (MM), and business processes.",
    tools: ["SAP FICO", "SAP MM", "SAP SD", "SAP S/4HANA", "ABAP Basics"],
    schedule: "Weekend & Weekday Intensive",
    duration: "16–20 Weeks",
    mode: "Classroom (Nayapalli, Bhubaneswar)",
    status: "Upcoming Batch",
    statusTone: "blue",
    highlights: "Sandbox Lab Practice • Business Process Workflows • Exam Prep",
  },
  {
    id: "cohort-py",
    slug: "python",
    courseTitle: "Python for Data Science & Automation",
    category: "Data & Analytics",
    image: pythonImg,
    summary:
      "Learn Python programming from scratch: core syntax, data structures, automated ETL scripts, web scraping, and data manipulation.",
    tools: ["Python 3", "NumPy", "Pandas", "Matplotlib", "Jupyter", "Git"],
    schedule: "Weekday & Weekend Batches",
    duration: "10–12 Weeks",
    mode: "Classroom Lab & Live Online",
    status: "Admissions Open",
    statusTone: "emerald",
    highlights: "Hands-on Coding Lab • Scripting Projects • 1-on-1 Mentorship",
  },
  {
    id: "cohort-excel",
    slug: "excel",
    courseTitle: "Advanced Excel & Financial Modeling",
    category: "Data & Analytics",
    image: excelImg,
    summary:
      "Go beyond basics with enterprise formula logic, dynamic arrays, pivot tables, automated macros, and professional MIS reporting.",
    tools: ["Excel", "Power Query", "XLOOKUP", "Pivot Tables", "Macros"],
    schedule: "Weekend Specialized Track",
    duration: "6–8 Weeks",
    mode: "Classroom Lab & Live Online",
    status: "Admissions Open",
    statusTone: "emerald",
    highlights: "Automated MIS Dashboards • Dynamic Arrays • Financial Models",
  },
  {
    id: "cohort-sql",
    slug: "sql",
    courseTitle: "SQL for Data Analytics & Database Engineering",
    category: "Data & Analytics",
    image: sqlImg,
    summary:
      "Learn to retrieve, combine and summarise data from relational databases with SQL — an essential skill for analysts and developers.",
    tools: ["SQL", "PostgreSQL", "MySQL", "DBeaver", "Database Schema"],
    schedule: "Weekday & Weekend Batches",
    duration: "6–8 Weeks",
    mode: "Classroom Lab & Live Online",
    status: "Upcoming Batch",
    statusTone: "blue",
    highlights: "Complex Multi-Table Joins • Window Functions • Query Tuning",
  },
];

