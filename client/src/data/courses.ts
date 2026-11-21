import type { StaticImageData } from "next/image";

import type { CourseSlug } from "@/data/slugs";

import dataAnalyticsImg from "@/assets/images/courses/data-analytics.jpg";
import businessAnalyticsImg from "@/assets/images/courses/business-analytics.jpg";
import dataScienceImg from "@/assets/images/courses/data-science.jpg";
import softwareTestingImg from "@/assets/images/courses/software-testing.jpg";
import sapImg from "@/assets/images/courses/sap.jpg";
import pythonImg from "@/assets/images/courses/python.jpg";
import excelImg from "@/assets/images/courses/excel.jpg";
import sqlImg from "@/assets/images/courses/sql.jpg";
import powerBiImg from "@/assets/images/courses/power-bi.jpg";
import generativeAiImg from "@/assets/images/courses/generative-ai.jpg";

export type CourseCategory = "Analytics" | "Data Science & AI" | "Core Skills" | "Enterprise & QA";

export const courseCategories: CourseCategory[] = [
  "Analytics",
  "Data Science & AI",
  "Core Skills",
  "Enterprise & QA",
];

export type FaqItem = { question: string; answer: string };

export type TopicArea = { title: string; points: string[] };

export type Course = {
  slug: CourseSlug;
  title: string;
  shortTitle: string;
  category: CourseCategory;
  /** One-line description, adapted from the course listing on talentele.in. */
  tagline: string;
  summary: string;
  intro: string;
  image: StaticImageData;
  imageAlt: string;
  overview: string[];
  audience: string[];
  /**
   * Subject areas the course is built around. The detailed module list for a
   * given batch is shared by the Talentele team during counselling.
   */
  topics: TopicArea[];
  tools: string[];
  outcomes: string[];
  /** Example exercises — illustrative, not a record of completed student work. */
  practice: string[];
  recommendedBackground: string;
  /** Course-specific facts confirmed on talentele.in. */
  verifiedHighlights?: string[];
  faqs: FaqItem[];
  related: CourseSlug[];
  seo: { title: string; description: string };
  highlighted?: boolean;
  badge?: string;
};

const commonFaqs = (name: string): FaqItem[] => [
  {
    question: `What are the fees and duration of the ${name} course?`,
    answer:
      "Fees, duration and batch timings depend on the batch and format you choose. Contact the Talentele team for the current details before you enrol.",
  },
  {
    question: "Are classes live or recorded?",
    answer:
      "Talentele offers live classes along with recorded sessions you can use for revision. Ask the team which formats are available for the batch you are interested in.",
  },
  {
    question: "Is a job guaranteed after the course?",
    answer:
      "No. Talentele provides placement assistance — resume and ATS support, mock interviews and soft-skills preparation — but no training institute can guarantee a job. Your outcome depends on your effort, skills and the job market.",
  },
];

export const courses: Course[] = [
  {
    slug: "data-analytics",
    title: "Data Analytics",
    shortTitle: "Data Analytics",
    category: "Analytics",
    highlighted: true,
    badge: "Popular",
    tagline: "Master Excel, SQL, Power BI & Python for corporate analyst careers.",
    summary:
      "Learn to clean, query, analyse and present data with Excel, SQL, Python and dashboarding tools — the core toolkit of an analyst.",
    intro:
      "A practical programme for turning raw data into clear answers. You learn the full analyst workflow — from spreadsheet work and SQL queries to analysis in Python and dashboards that decision-makers can read.",
    image: dataAnalyticsImg,
    imageAlt: "A laptop screen showing analytics charts and histograms",
    overview: [
      "Organisations collect more data than they can use. Analysts close that gap: they find the right data, check its quality, analyse it and explain what it means in plain language.",
      "This course follows that workflow end to end. Each tool is introduced in the context of a real analytical task, so you learn why a technique is used — not just which button to press.",
    ],
    audience: [
      "Graduates and final-year students who want to start a career in analytics",
      "Working professionals moving into a data-focused role",
      "Professionals who already use spreadsheets and want to analyse data more rigorously",
    ],
    topics: [
      {
        title: "Spreadsheet analysis",
        points: ["Data cleaning and formatting", "Formulas and lookups", "Pivot tables and summaries"],
      },
      {
        title: "SQL for analysis",
        points: ["Filtering, sorting and aggregation", "Joins across tables", "Subqueries and common table expressions"],
      },
      {
        title: "Analysis with Python",
        points: ["Python fundamentals for data work", "Working with tabular data", "Exploratory analysis"],
      },
      {
        title: "Statistics essentials",
        points: ["Descriptive statistics", "Distributions and sampling", "Interpreting relationships in data"],
      },
      {
        title: "Visualisation and dashboards",
        points: ["Choosing the right chart", "Building interactive dashboards", "Data storytelling for stakeholders"],
      },
    ],
    tools: ["Excel", "SQL", "Python", "Power BI", "Tableau"],
    outcomes: [
      "Clean and prepare messy datasets for analysis",
      "Write SQL queries that answer business questions",
      "Explore data and test assumptions in Python",
      "Build dashboards that communicate findings clearly",
      "Present an analysis and defend your conclusions",
    ],
    practice: [
      "Clean a raw sales export and reconcile totals across months",
      "Query an orders database to find top customers and repeat-purchase patterns",
      "Build a performance dashboard with filters for region and product",
    ],
    recommendedBackground:
      "Comfort with using a computer and basic arithmetic. If you are unsure where to begin, the team can advise whether to start with Excel or SQL first.",
    verifiedHighlights: [
      "Talentele lists a 6-month data analyst internship certificate as part of its offering — ask the team about eligibility for your batch.",
    ],
    faqs: [
      {
        question: "Do I need a programming background for Data Analytics?",
        answer:
          "A programming background helps but is not something you should assume you need. Speak with the team about your background so they can recommend the right starting point.",
      },
      {
        question: "Is there a Data Analytics programme with AI?",
        answer:
          "Talentele has announced batches for Data Analytics with AI. Contact the team for the current schedule and how it differs from the core programme.",
      },
      ...commonFaqs("Data Analytics"),
    ],
    related: ["business-analytics", "power-bi", "sql"],
    seo: {
      title: "Data Analytics Course in Bhubaneswar",
      description:
        "Learn data analytics with Excel, SQL, Python and dashboards at Talentele, Bhubaneswar. Practical projects, live and recorded classes, and placement assistance.",
    },
  },
  {
    slug: "business-analytics",
    title: "Business Analytics",
    shortTitle: "Business Analytics",
    category: "Analytics",
    highlighted: true,
    badge: "Trending",
    tagline: "Bridge business strategy and enterprise BI dashboard analytics.",
    summary:
      "Connect data to decisions: frame business problems, analyse performance metrics and communicate recommendations to stakeholders.",
    intro:
      "Business analytics sits between the data and the decision. This course teaches you to frame the right questions, measure what matters and turn analysis into recommendations that a business can act on.",
    image: businessAnalyticsImg,
    imageAlt: "Two professionals reviewing printed charts beside laptops",
    overview: [
      "Strong business analysts combine analytical skill with an understanding of how organisations work — revenue, cost, customers and operations.",
      "You learn to break vague business problems into measurable questions, analyse them with spreadsheets, SQL and BI tools, and present the result in a form leaders can use.",
    ],
    audience: [
      "Commerce, management and engineering graduates interested in analytical roles",
      "Professionals in sales, operations, finance or marketing who work with reports",
      "Aspiring business analysts and MIS professionals",
    ],
    topics: [
      {
        title: "Business problem framing",
        points: ["Defining questions and hypotheses", "Choosing metrics and KPIs", "Understanding stakeholder needs"],
      },
      {
        title: "Analytical toolkit",
        points: ["Advanced spreadsheet analysis", "SQL for business reporting", "Introductory statistics"],
      },
      {
        title: "Business intelligence",
        points: ["Data modelling basics", "Dashboards for performance tracking", "Self-service reporting"],
      },
      {
        title: "Decision support",
        points: ["Trend and variance analysis", "Scenario and what-if analysis", "Writing recommendations"],
      },
    ],
    tools: ["Excel", "SQL", "Power BI", "Tableau"],
    outcomes: [
      "Translate a business problem into an analysis plan",
      "Select and track KPIs for a team or function",
      "Build management dashboards and reports",
      "Communicate insights and recommendations with confidence",
    ],
    practice: [
      "Analyse monthly revenue against targets and explain the variance",
      "Design a KPI dashboard for a retail operations team",
      "Run a what-if analysis on pricing changes",
    ],
    recommendedBackground:
      "Familiarity with basic spreadsheet use is helpful. Discuss your background with the team for a recommendation.",
    faqs: [
      {
        question: "How is Business Analytics different from Data Analytics?",
        answer:
          "Both use similar tools. Business Analytics puts more weight on framing business problems, KPIs and recommendations; Data Analytics goes deeper into the technical workflow of preparing and analysing data. Read our guide to analytics career paths or ask the team which suits your goals.",
      },
      ...commonFaqs("Business Analytics"),
    ],
    related: ["data-analytics", "power-bi", "excel"],
    seo: {
      title: "Business Analytics Course in Bhubaneswar",
      description:
        "Business analytics training at Talentele, Bhubaneswar: KPIs, SQL, Excel and Power BI dashboards applied to real business decisions, with placement assistance.",
    },
  },
  {
    slug: "data-science",
    title: "Data Science",
    shortTitle: "Data Science",
    category: "Data Science & AI",
    highlighted: true,
    badge: "High Demand",
    tagline: "Machine learning, predictive models & Python for advanced AI roles.",
    summary:
      "Build a foundation in Python, statistics and machine learning, and learn to develop and evaluate predictive models.",
    intro:
      "A structured path into data science covering Python programming, the statistics behind modelling, and machine learning algorithms — with an emphasis on understanding when and why each method works.",
    image: dataScienceImg,
    imageAlt: "Close-up of Python source code on a dark editor screen",
    overview: [
      "Data science applies programming and statistics to make predictions and uncover patterns. It rewards people who are comfortable with both code and reasoning about uncertainty.",
      "The course moves from Python and statistics foundations to supervised and unsupervised machine learning, model evaluation and communicating model results.",
    ],
    audience: [
      "Engineering, mathematics, statistics and computer science graduates",
      "Analysts who want to move into predictive modelling",
      "Developers interested in machine learning",
    ],
    topics: [
      {
        title: "Python for data science",
        points: ["Core Python", "Numerical and tabular data libraries", "Data visualisation"],
      },
      {
        title: "Statistics and probability",
        points: ["Probability foundations", "Hypothesis testing", "Regression concepts"],
      },
      {
        title: "Machine learning",
        points: ["Supervised learning: regression and classification", "Unsupervised learning: clustering", "Feature engineering"],
      },
      {
        title: "Model evaluation",
        points: ["Train/test splits and cross-validation", "Choosing evaluation metrics", "Avoiding overfitting"],
      },
    ],
    tools: ["Python", "Jupyter", "SQL"],
    outcomes: [
      "Write clean Python for data preparation and analysis",
      "Apply statistical reasoning to real datasets",
      "Train, tune and evaluate machine learning models",
      "Explain model behaviour and limitations to non-specialists",
    ],
    practice: [
      "Predict house prices with regression and compare model errors",
      "Build a customer churn classifier and choose an appropriate metric",
      "Segment customers with clustering and describe each segment",
    ],
    recommendedBackground:
      "Comfort with school-level mathematics. Prior programming helps; if you have none, consider starting with the Python course — the team can advise.",
    faqs: [
      {
        question: "Should I learn Data Analytics before Data Science?",
        answer:
          "Not necessarily, but data science assumes comfort with data handling and some mathematics. Our article on what to learn first explains the trade-offs, and the team can recommend a path based on your background.",
      },
      ...commonFaqs("Data Science"),
    ],
    related: ["python", "generative-ai", "data-analytics"],
    seo: {
      title: "Data Science Course in Bhubaneswar",
      description:
        "Data science training at Talentele, Bhubaneswar covering Python, statistics and machine learning, with hands-on modelling exercises and placement assistance.",
    },
  },
  {
    slug: "software-testing",
    title: "Software Testing",
    shortTitle: "Software Testing",
    category: "Enterprise & QA",
    tagline: "Manual and automation testing skills for quality-focused software careers.",
    summary:
      "Learn how software is tested — from test design and defect reporting to automation and API testing used by QA teams.",
    intro:
      "Quality assurance protects users and businesses from broken software. This course teaches testing fundamentals and introduces the automation and API testing practices used by modern QA teams.",
    image: softwareTestingImg,
    imageAlt: "Overhead view of a developer workstation with code on two monitors",
    overview: [
      "Testers think about how software can fail. They design test cases, find and report defects clearly, and increasingly automate repetitive checks.",
      "The course covers the software testing life cycle, test design, defect management, and introduces automation and API testing with widely used tools.",
    ],
    audience: [
      "Graduates who want to start a career in software quality assurance",
      "Manual testers who want to learn automation",
      "Developers who want stronger testing skills",
    ],
    topics: [
      {
        title: "Testing fundamentals",
        points: ["Software development and testing life cycles", "Test levels and types", "Agile ways of working"],
      },
      {
        title: "Test design and management",
        points: ["Writing test scenarios and cases", "Defect reporting and tracking", "Test planning"],
      },
      {
        title: "Automation testing",
        points: ["Introduction to browser automation", "Test frameworks", "Running tests in a CI pipeline"],
      },
      {
        title: "API testing",
        points: ["How web APIs work", "Testing requests and responses", "Basic API automation"],
      },
    ],
    tools: ["Selenium", "Postman", "JIRA", "JUnit", "Jenkins"],
    outcomes: [
      "Design test cases from requirements",
      "Report defects that developers can act on",
      "Write and run basic automated UI tests",
      "Test web APIs and validate responses",
    ],
    practice: [
      "Write a test plan and test cases for a sample e-commerce checkout",
      "Automate a login and search flow in a browser",
      "Test a public REST API and document defects",
    ],
    recommendedBackground:
      "Logical thinking and comfort with computers. Programming basics help for the automation sections.",
    faqs: commonFaqs("Software Testing"),
    related: ["python", "sql", "sap"],
    seo: {
      title: "Software Testing Course in Bhubaneswar",
      description:
        "Software testing training at Talentele, Bhubaneswar: test design, defect management, automation with Selenium and API testing with Postman.",
    },
  },
  {
    slug: "sap",
    title: "SAP",
    shortTitle: "SAP",
    category: "Enterprise & QA",
    tagline: "Build in-demand SAP skills for global careers.",
    summary:
      "Understand how organisations run on SAP — core business processes, system navigation and module fundamentals for enterprise careers.",
    intro:
      "SAP systems run finance, supply chain and operations for organisations worldwide. This course builds your understanding of SAP concepts and the business processes behind them.",
    image: sapImg,
    imageAlt: "A team working at desks in an open-plan office",
    overview: [
      "Enterprise resource planning (ERP) systems connect the processes of a business in one place. SAP is among the most widely used ERP platforms.",
      "Talentele's SAP training focuses on the concepts and processes that enterprise roles rely on. Speak with the team to confirm which SAP modules are offered in the current batch.",
    ],
    audience: [
      "Commerce, management and engineering graduates targeting ERP roles",
      "Professionals in finance, procurement, sales or operations who use SAP",
      "Anyone exploring enterprise technology careers",
    ],
    topics: [
      {
        title: "ERP and SAP foundations",
        points: ["What ERP systems do", "SAP system landscape", "Navigation and terminology"],
      },
      {
        title: "Business processes",
        points: ["Organisational structure in SAP", "End-to-end process flows", "Master data concepts"],
      },
      {
        title: "Module fundamentals",
        points: ["Module-specific configuration concepts", "Transactions and reports", "Integration between modules"],
      },
    ],
    tools: ["SAP"],
    outcomes: [
      "Explain how SAP supports core business processes",
      "Navigate SAP and understand key transactions",
      "Describe how modules integrate across a business",
    ],
    practice: [
      "Map a procure-to-pay process from requisition to payment",
      "Walk through the master data needed for a sales order",
    ],
    recommendedBackground:
      "An understanding of basic business functions helps. The team can advise which SAP track suits your background.",
    faqs: [
      {
        question: "Which SAP modules are taught?",
        answer:
          "Module availability can vary by batch. Contact the team to confirm the modules, schedule and format for the next SAP batch.",
      },
      ...commonFaqs("SAP"),
    ],
    related: ["business-analytics", "excel", "software-testing"],
    seo: {
      title: "SAP Course in Bhubaneswar",
      description:
        "SAP training at Talentele, Bhubaneswar. Learn ERP concepts, SAP navigation and business process fundamentals for enterprise careers.",
    },
  },
  {
    slug: "python",
    title: "Python Programming",
    shortTitle: "Python",
    category: "Core Skills",
    highlighted: true,
    badge: "Core Skill",
    tagline: "Complete programming fundamentals, data structures and automation.",
    summary:
      "Start programming with Python: syntax, logic, data structures and writing small programs — the foundation for analytics, data science and automation.",
    intro:
      "Python is the most approachable way into programming and the common language of data work. This course is designed for beginners and builds confidence one concept at a time.",
    image: pythonImg,
    imageAlt: "A learner holding up a sticky note with the word Python written on it",
    overview: [
      "Learning to program is learning to break problems into small, precise steps. Python's readable syntax lets you focus on that thinking rather than on punctuation.",
      "You start with the basics and progress to functions, data structures, files and working with libraries — preparing you for data analytics, data science or automation.",
    ],
    audience: [
      "Complete beginners who want to learn programming",
      "Students preparing for data analytics or data science",
      "Professionals who want to automate repetitive tasks",
    ],
    topics: [
      {
        title: "Programming basics",
        points: ["Variables and data types", "Conditions and loops", "Writing and running scripts"],
      },
      {
        title: "Structuring code",
        points: ["Functions", "Modules and packages", "Error handling"],
      },
      {
        title: "Working with data",
        points: ["Lists, dictionaries and sets", "Reading and writing files", "Introduction to data libraries"],
      },
    ],
    tools: ["Python", "Jupyter", "VS Code"],
    outcomes: [
      "Write Python programs to solve everyday problems",
      "Use core data structures confidently",
      "Read and write files and handle errors",
      "Be ready to start analytics or data science work in Python",
    ],
    practice: [
      "Build a command-line expense tracker",
      "Write a script that summarises a CSV file",
      "Automate renaming and organising files in a folder",
    ],
    recommendedBackground: "No prior programming experience is assumed for this beginner course.",
    faqs: [
      {
        question: "Can I learn Python with no coding experience?",
        answer:
          "Yes — Talentele describes its Python course as a coding course for beginners. Speak with the team about the batch format that suits you.",
      },
      ...commonFaqs("Python"),
    ],
    related: ["data-science", "data-analytics", "sql"],
    seo: {
      title: "Python Course for Beginners in Bhubaneswar",
      description:
        "Beginner-friendly Python programming course at Talentele, Bhubaneswar. Learn coding fundamentals and prepare for data analytics, data science and automation.",
    },
  },
  {
    slug: "excel",
    title: "Advanced Excel",
    shortTitle: "Excel",
    category: "Core Skills",
    tagline: "Spreadsheet skills that every analyst and business professional relies on.",
    summary:
      "Go beyond the basics: formulas, lookups, pivot tables, charts and data cleaning techniques used in reporting and analysis.",
    intro:
      "Excel remains the everyday tool of business analysis. This course takes you from familiar basics to the advanced functions, pivot tables and reporting techniques that save hours of work.",
    image: excelImg,
    imageAlt: "A hand-drawn line chart on paper beside a ruler and pens",
    overview: [
      "Most analysis in organisations still begins or ends in a spreadsheet. Doing it accurately and efficiently is a skill employers notice.",
      "The course focuses on the functions and features used in real reporting work — and on building workbooks that others can understand and maintain.",
    ],
    audience: [
      "Students and graduates preparing for office and analytics roles",
      "Professionals who produce reports and MIS",
      "Anyone starting a data analytics journey",
    ],
    topics: [
      {
        title: "Formulas and functions",
        points: ["Logical and text functions", "Lookup functions", "Date and time calculations"],
      },
      {
        title: "Analysis and summary",
        points: ["Pivot tables and pivot charts", "Conditional formatting", "Sorting, filtering and data validation"],
      },
      {
        title: "Reporting",
        points: ["Charts that communicate", "Dashboard-style reports", "Workbook structure and documentation"],
      },
    ],
    tools: ["Microsoft Excel"],
    outcomes: [
      "Use lookup and logical functions accurately",
      "Summarise large datasets with pivot tables",
      "Build clear, reusable reports",
    ],
    practice: [
      "Reconcile two lists of transactions and flag mismatches",
      "Build a monthly MIS report with pivot tables and charts",
    ],
    recommendedBackground: "Basic familiarity with opening and editing spreadsheets.",
    faqs: commonFaqs("Advanced Excel"),
    related: ["data-analytics", "power-bi", "business-analytics"],
    seo: {
      title: "Advanced Excel Course in Bhubaneswar",
      description:
        "Advanced Excel training at Talentele, Bhubaneswar: formulas, lookups, pivot tables and reporting skills for analytics and business roles.",
    },
  },
  {
    slug: "sql",
    title: "SQL",
    shortTitle: "SQL",
    category: "Core Skills",
    tagline: "Query and work with relational databases — the language of data.",
    summary:
      "Learn to retrieve, combine and summarise data from relational databases with SQL — an essential skill for analysts and developers.",
    intro:
      "Nearly every organisation stores its data in relational databases. SQL is how you ask those databases questions. This course takes you from your first query to multi-table analysis.",
    image: sqlImg,
    imageAlt: "Rows of labelled wooden drawers in an index card catalogue",
    overview: [
      "SQL is one of the most transferable technical skills: it is used in analytics, data science, software development and testing.",
      "You learn how relational data is organised and how to write queries that are correct, readable and efficient.",
    ],
    audience: [
      "Aspiring data analysts and business analysts",
      "Developers and testers who work with databases",
      "Professionals who want direct access to their organisation's data",
    ],
    topics: [
      {
        title: "Relational foundations",
        points: ["Tables, keys and relationships", "Data types", "Reading a database schema"],
      },
      {
        title: "Querying data",
        points: ["SELECT, WHERE and ORDER BY", "Aggregation with GROUP BY", "Joins"],
      },
      {
        title: "Advanced queries",
        points: ["Subqueries and CTEs", "Window functions", "Writing readable SQL"],
      },
    ],
    tools: ["SQL", "MySQL or a comparable relational database"],
    outcomes: [
      "Write queries that answer real business questions",
      "Combine data across tables with joins",
      "Use aggregation and window functions for analysis",
    ],
    practice: [
      "Find the top-selling products by month in an orders database",
      "Calculate customer retention with window functions",
    ],
    recommendedBackground: "No database experience required; comfort with spreadsheets helps.",
    faqs: commonFaqs("SQL"),
    related: ["data-analytics", "python", "power-bi"],
    seo: {
      title: "SQL Course in Bhubaneswar",
      description:
        "Learn SQL at Talentele, Bhubaneswar: querying, joins, aggregation and window functions for analytics, development and testing roles.",
    },
  },
  {
    slug: "power-bi",
    title: "Microsoft Power BI",
    shortTitle: "Power BI",
    category: "Analytics",
    tagline: "Data connection, transformation and interactive dashboards.",
    summary:
      "Connect to data, shape it with Power Query, model it and publish interactive dashboards that teams can explore.",
    intro:
      "Power BI turns scattered data into dashboards people actually use. This course covers the full workflow — connecting sources, transforming data, building models and designing reports.",
    image: powerBiImg,
    imageAlt: "A laptop on a desk displaying a business dashboard with charts",
    overview: [
      "Business intelligence tools let organisations monitor performance without waiting for manual reports. Power BI is widely used for this work.",
      "You learn to prepare data properly before visualising it — because a good dashboard depends on a sound data model.",
    ],
    audience: [
      "Analysts and MIS professionals who build reports",
      "Data Analytics and Business Analytics learners",
      "Managers who want to build their own dashboards",
    ],
    topics: [
      {
        title: "Getting data",
        points: ["Connecting to files and databases", "Transforming data with Power Query", "Data cleaning steps"],
      },
      {
        title: "Data modelling",
        points: ["Relationships and star schemas", "Introduction to DAX", "Calculated measures"],
      },
      {
        title: "Reports and dashboards",
        points: ["Visual design for clarity", "Interactivity: filters, slicers and drill-through", "Sharing and publishing"],
      },
    ],
    tools: ["Power BI Desktop", "Power Query", "DAX", "Excel"],
    outcomes: [
      "Connect and transform data from multiple sources",
      "Build a sound data model with relationships and measures",
      "Design interactive dashboards for decision-makers",
    ],
    practice: [
      "Build a sales performance dashboard from multiple spreadsheets",
      "Create measures for year-on-year growth and targets",
    ],
    recommendedBackground: "Comfort with Excel is recommended.",
    faqs: commonFaqs("Power BI"),
    related: ["data-analytics", "business-analytics", "excel"],
    seo: {
      title: "Power BI Course in Bhubaneswar",
      description:
        "Microsoft Power BI training at Talentele, Bhubaneswar: Power Query, data modelling, DAX and interactive dashboards built through practical exercises.",
    },
  },
  {
    slug: "generative-ai",
    title: "Generative AI",
    shortTitle: "Generative AI",
    category: "Data Science & AI",
    tagline: "Understand and apply generative AI tools in real work.",
    summary:
      "Learn how large language models and generative AI tools work, how to use them responsibly, and how to apply them to analysis and productivity tasks.",
    intro:
      "Generative AI is changing how analysts, developers and business teams work. This course explains how these systems work and how to use them effectively, critically and responsibly.",
    image: generativeAiImg,
    imageAlt: "Abstract three-dimensional illustration of the letters AI",
    overview: [
      "Generative AI tools can draft text, write code and summarise information — but they also make mistakes. Using them well requires understanding both their strengths and their limits.",
      "The course covers how large language models work at a conceptual level, prompting techniques, practical workflows and responsible use. Ask the team for the current syllabus.",
    ],
    audience: [
      "Analysts and developers who want to work faster with AI tools",
      "Students curious about how generative AI works",
      "Professionals who want to apply AI to everyday tasks",
    ],
    topics: [
      {
        title: "How generative AI works",
        points: ["Large language models in plain terms", "Capabilities and limitations", "Common failure modes"],
      },
      {
        title: "Working with AI tools",
        points: ["Prompting techniques", "AI for data analysis and coding", "Checking and validating outputs"],
      },
      {
        title: "Responsible use",
        points: ["Privacy and data handling", "Bias and accuracy", "When not to use AI"],
      },
    ],
    tools: ["Generative AI assistants", "Python"],
    outcomes: [
      "Explain how generative AI systems produce their output",
      "Write effective prompts for analysis and coding tasks",
      "Verify AI output before relying on it",
    ],
    practice: [
      "Use an AI assistant to explore a dataset, then verify each finding manually",
      "Compare prompting strategies for summarising a long report",
    ],
    recommendedBackground: "General computer literacy. Python basics help for the technical sections.",
    faqs: commonFaqs("Generative AI"),
    related: ["data-science", "python", "data-analytics"],
    seo: {
      title: "Generative AI Course in Bhubaneswar",
      description:
        "Generative AI training at Talentele, Bhubaneswar. Learn how AI tools work, prompting for analysis and coding, and responsible use.",
    },
  },
];

export function getCourseHref(slug: string): string {
  return `/${slug}-course/`;
}

export function getCourse(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug);
}

export function getRelatedCourses(course: Course): Course[] {
  return course.related
    .map((slug) => getCourse(slug))
    .filter((c): c is Course => Boolean(c));
}

/** Courses highlighted on the homepage, in display order. */
export const featuredCourseSlugs: CourseSlug[] = ["data-analytics", "data-science", "business-analytics", "power-bi", "python"];
