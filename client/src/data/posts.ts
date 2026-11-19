import type { StaticImageData } from "next/image";

import type { CourseSlug, PostSlug } from "@/data/slugs";

import careerPathsImg from "@/assets/images/blog/career-paths.jpg";
import whatToLearnFirstImg from "@/assets/images/blog/what-to-learn-first.jpg";
import portfolioImg from "@/assets/images/blog/portfolio.jpg";
import resumeImg from "@/assets/images/blog/resume.jpg";

export type PostCategory = "Career Guidance" | "Learning Paths" | "Interview Prep";

export const postCategories: PostCategory[] = ["Career Guidance", "Learning Paths", "Interview Prep"];

/**
 * Article body blocks. Inline text supports [link text](/path/) and **bold**.
 */
export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; id: string; text: string }
  | { type: "h3"; id: string; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; title: string; text: string };

export type Post = {
  slug: PostSlug;
  title: string;
  excerpt: string;
  category: PostCategory;
  /** ISO date (YYYY-MM-DD). */
  publishedAt: string;
  updatedAt?: string;
  image: StaticImageData;
  imageAlt: string;
  relatedCourses: CourseSlug[];
  body: PostBlock[];
  seo: { title: string; description: string };
};

export const posts: Post[] = [
  {
    slug: "data-analyst-vs-data-scientist-vs-business-analyst",
    title: "Data Analyst, Data Scientist or Business Analyst: Which Path Fits You?",
    excerpt:
      "Three popular data careers that are often confused. Here is what each role actually does day to day, the skills it relies on, and how to choose between them.",
    category: "Career Guidance",
    publishedAt: "2026-10-14",
    image: careerPathsImg,
    imageAlt: "Two colleagues celebrating with a high five at a desk with a laptop",
    relatedCourses: ["data-analytics", "data-science", "business-analytics"],
    seo: {
      title: "Data Analyst vs Data Scientist vs Business Analyst",
      description:
        "Compare data analyst, data scientist and business analyst roles: daily work, core skills and how to choose the right data career path for your background.",
    },
    body: [
      {
        type: "p",
        text: "If you are exploring a career in data, you will quickly meet three job titles: data analyst, data scientist and business analyst. They share tools and overlap in practice, which makes them easy to confuse. But each role asks a different core question, and that difference should shape what you learn first.",
      },
      {
        type: "p",
        text: "This guide explains the work behind each title, the skills that matter most, and a simple way to decide which direction suits you. Job titles vary between organisations, so treat these as typical descriptions rather than strict definitions.",
      },
      { type: "h2", id: "data-analyst", text: "The data analyst: what happened, and why?" },
      {
        type: "p",
        text: "A data analyst turns raw data into reliable answers. A typical week might include pulling data from a database, cleaning it, checking whether the numbers make sense, analysing a trend and presenting the findings in a report or dashboard.",
      },
      {
        type: "p",
        text: "Analysts spend a surprising amount of time on data quality. Duplicate records, missing values and inconsistent formats are everyday problems, and catching them is what makes an analysis trustworthy.",
      },
      { type: "h3", id: "analyst-skills", text: "Core skills" },
      {
        type: "ul",
        items: [
          "**SQL** to retrieve and combine data from databases",
          "**Excel** for quick analysis, reconciliation and reporting",
          "**A BI tool** such as Power BI or Tableau for dashboards",
          "**Python** for larger or repeatable analyses",
          "Basic statistics and, above all, clear communication",
        ],
      },
      { type: "h2", id: "data-scientist", text: "The data scientist: what is likely to happen?" },
      {
        type: "p",
        text: "Data scientists use programming and statistics to build models that predict outcomes or uncover patterns that are not obvious from summary reports. Examples include forecasting demand, estimating which customers are likely to leave, or grouping customers by behaviour.",
      },
      {
        type: "p",
        text: "The role is more technical and more experimental. Much of the work is preparing data, testing different approaches and — importantly — checking whether a model genuinely works on data it has not seen before.",
      },
      { type: "h3", id: "scientist-skills", text: "Core skills" },
      {
        type: "ul",
        items: [
          "**Python** programming, including data and machine-learning libraries",
          "**Statistics and probability**, the foundation of modelling",
          "**Machine learning** methods and how to evaluate them",
          "SQL and data preparation",
          "The ability to explain a model's limits honestly",
        ],
      },
      { type: "h2", id: "business-analyst", text: "The business analyst: what should we do?" },
      {
        type: "p",
        text: "Business analysts focus on decisions. They work closely with managers and teams to understand a problem, define how success will be measured, analyse the relevant data and recommend a course of action. In some organisations the title also covers gathering requirements for new systems or processes.",
      },
      {
        type: "p",
        text: "The technical toolkit overlaps with a data analyst's, but the emphasis shifts towards business understanding — revenue, cost, customers, operations — and towards persuading people with evidence.",
      },
      { type: "h3", id: "business-analyst-skills", text: "Core skills" },
      {
        type: "ul",
        items: [
          "Framing business problems and choosing the right KPIs",
          "**Excel**, **SQL** and a BI tool for analysis and reporting",
          "Stakeholder communication and structured writing",
          "Understanding of how business functions work together",
        ],
      },
      { type: "h2", id: "how-to-choose", text: "How to choose between them" },
      {
        type: "p",
        text: "Instead of asking which title sounds most impressive, ask which kind of problem you enjoy working on. These questions can help:",
      },
      {
        type: "ol",
        items: [
          "**Do you enjoy finding the story in numbers and presenting it clearly?** Data analytics is a strong starting point.",
          "**Do you enjoy programming, mathematics and experimenting with models?** Data science may suit you — but expect a steeper technical climb.",
          "**Are you most interested in how organisations make decisions?** Business analytics lets you combine analysis with business thinking.",
        ],
      },
      {
        type: "p",
        text: "Your background matters too. Commerce and management graduates often find business analytics a natural fit. Engineering and mathematics graduates may move into data science more easily. Data analytics is one of the most accessible starting points for many backgrounds because its core tools — Excel, SQL and dashboards — can be learned step by step.",
      },
      {
        type: "callout",
        title: "The paths are not fixed",
        text: "Many people start as data analysts and later move into data science or business analysis. The skills you build first — SQL, data cleaning, clear communication — remain useful whichever direction you take.",
      },
      { type: "h2", id: "next-steps", text: "Practical next steps" },
      {
        type: "ul",
        items: [
          "Read our guide on [whether to learn SQL, Excel or Python first](/blog/sql-excel-or-python-what-to-learn-first/).",
          "Compare the [Data Analytics](/data-analytics-course/), [Data Science](/data-science-course/) and [Business Analytics](/business-analytics-course/) courses.",
          "If you are still unsure, [ask the Talentele team for course guidance](/contact-us/) based on your background.",
        ],
      },
    ],
  },
  {
    slug: "sql-excel-or-python-what-to-learn-first",
    title: "SQL, Excel or Python: What Should You Learn First for a Data Career?",
    excerpt:
      "Each tool solves a different problem. A practical way to sequence your learning so that every new skill builds on the last one.",
    category: "Learning Paths",
    publishedAt: "2026-10-14",
    image: whatToLearnFirstImg,
    imageAlt: "Colourful source code on a computer screen",
    relatedCourses: ["excel", "sql", "python"],
    seo: {
      title: "SQL, Excel or Python: What to Learn First",
      description:
        "Not sure whether to learn SQL, Excel or Python first? A practical learning sequence for beginners starting a data analytics or data science career.",
    },
    body: [
      {
        type: "p",
        text: "Beginners often ask which tool to learn first: Excel, SQL or Python. The honest answer is that you will probably need all three — but the order matters, because each one is easier to learn when you understand what the previous one could not do.",
      },
      { type: "h2", id: "what-each-tool-does", text: "What each tool is for" },
      { type: "h3", id: "excel", text: "Excel: seeing and shaping data directly" },
      {
        type: "p",
        text: "Excel lets you see every value and change it immediately. That makes it ideal for small to medium datasets, quick checks, reconciliations and reports. Its main limits are scale and repeatability: very large datasets become slow, and complex manual steps are hard to repeat reliably.",
      },
      { type: "h3", id: "sql", text: "SQL: asking questions of a database" },
      {
        type: "p",
        text: "Most organisations store their data in relational databases. SQL is the language you use to retrieve exactly the rows and columns you need, combine tables and calculate summaries. It handles far more data than a spreadsheet and is one of the most frequently requested skills for analyst roles.",
      },
      { type: "h3", id: "python", text: "Python: automating and extending analysis" },
      {
        type: "p",
        text: "Python is a general-purpose programming language with excellent libraries for data. It is used to automate repetitive work, analyse large datasets, create advanced visualisations and build machine-learning models. It is the most powerful of the three — and it asks the most of a beginner.",
      },
      { type: "h2", id: "a-sensible-sequence", text: "A sensible learning sequence" },
      {
        type: "p",
        text: "For most people aiming at data analytics or business analytics, this order works well:",
      },
      {
        type: "ol",
        items: [
          "**Excel first** — build intuition for rows, columns, data types, formulas and summaries. You will reuse these ideas everywhere.",
          "**SQL next** — apply the same thinking to databases. Concepts such as filtering, grouping and joining will feel natural after pivot tables and lookups.",
          "**A BI tool** such as Power BI — turn your analysis into dashboards people can explore.",
          "**Python** — automate what you have been doing manually and move into larger or more advanced analysis.",
        ],
      },
      {
        type: "callout",
        title: "Aiming for data science?",
        text: "If your goal is data science or machine learning, start Python earlier and pair it with statistics. You will still need SQL, so learn it alongside Python rather than skipping it.",
      },
      { type: "h2", id: "common-mistakes", text: "Common mistakes to avoid" },
      {
        type: "ul",
        items: [
          "**Collecting tutorials without practice.** Watching someone else write a query is not the same as writing one. Practise on real datasets.",
          "**Skipping fundamentals.** Jumping straight to machine learning without understanding data cleaning leads to models built on bad data.",
          "**Learning tools in isolation.** Employers care about solving problems. Practise on small projects that use more than one tool together.",
          "**Avoiding communication.** An analysis is only useful if you can explain it. Write short summaries of what you found.",
        ],
      },
      { type: "h2", id: "how-to-practise", text: "How to practise each stage" },
      {
        type: "p",
        text: "At each stage, set yourself a small, concrete project. For Excel, reconcile two lists of transactions. For SQL, answer five business questions from a sample sales database. For Python, write a script that cleans a messy CSV file and produces a summary. These exercises also become the start of a portfolio — read our guide to [building a data analytics portfolio](/blog/how-to-build-a-data-analytics-portfolio/).",
      },
      { type: "h2", id: "where-to-start", text: "Where to start" },
      {
        type: "p",
        text: "Talentele offers individual courses in [Advanced Excel](/excel-course/), [SQL](/sql-course/) and [Python](/python-course/), as well as the broader [Data Analytics](/data-analytics-course/) programme that brings them together. If you are unsure which to choose, [talk to the team](/contact-us/) about your background and goals.",
      },
    ],
  },
  {
    slug: "how-to-build-a-data-analytics-portfolio",
    title: "How to Build a Data Analytics Portfolio That Recruiters Can Read",
    excerpt:
      "A portfolio shows what you can do, not just what you studied. How to choose projects, structure them and present your work so that it is easy to evaluate.",
    category: "Interview Prep",
    publishedAt: "2026-10-14",
    image: portfolioImg,
    imageAlt: "A laptop displaying code on a bright, tidy desk",
    relatedCourses: ["data-analytics", "power-bi", "python"],
    seo: {
      title: "How to Build a Data Analytics Portfolio",
      description:
        "A practical guide to building a data analytics portfolio: choosing projects, structuring each case study and presenting your work clearly to recruiters.",
    },
    body: [
      {
        type: "p",
        text: "When you are starting a data career, a portfolio is one of the clearest ways to show what you can do. A course certificate tells an employer what you studied. A well-presented project shows how you think: how you handle messy data, which questions you ask and how clearly you explain the answer.",
      },
      {
        type: "p",
        text: "A good portfolio does not need dozens of projects. Three or four focused, well-explained pieces of work are usually more convincing than a long list of half-finished notebooks.",
      },
      { type: "h2", id: "choosing-projects", text: "Choosing the right projects" },
      {
        type: "p",
        text: "Aim for variety that reflects the work of the role you want. A balanced analytics portfolio might include:",
      },
      {
        type: "ul",
        items: [
          "**A data-cleaning project** that shows how you turned an untidy dataset into something reliable",
          "**A SQL analysis** answering several business questions from a relational database",
          "**A dashboard** in Power BI or Tableau designed for a specific audience",
          "**An end-to-end case study** that takes a question from raw data to a recommendation",
        ],
      },
      {
        type: "p",
        text: "Choose datasets connected to a domain you find interesting — retail, healthcare, finance, sports or public data. Genuine interest shows in the quality of your questions.",
      },
      { type: "h2", id: "structure", text: "Structure every project the same way" },
      {
        type: "p",
        text: "Reviewers often have little time. A consistent structure helps them understand each project quickly:",
      },
      {
        type: "ol",
        items: [
          "**The question.** What were you trying to find out, and why does it matter?",
          "**The data.** Where did it come from, how large was it and what problems did it have?",
          "**The approach.** Which steps did you take and which tools did you use?",
          "**The findings.** What did you discover? Lead with the most important result.",
          "**The limits.** What could not be concluded, and what would you do with more time or data?",
        ],
      },
      {
        type: "callout",
        title: "Be honest about limitations",
        text: "Stating what your analysis cannot prove is a sign of maturity, not weakness. Interviewers frequently ask about it, and a thoughtful answer builds trust.",
      },
      { type: "h2", id: "presentation", text: "Presenting your work" },
      { type: "h3", id: "make-it-readable", text: "Make it readable" },
      {
        type: "p",
        text: "Write a short summary at the top of each project. Use clear chart titles that state the finding, not just the variables. Remove exploratory code that does not contribute to the story, or move it to an appendix.",
      },
      { type: "h3", id: "make-it-accessible", text: "Make it easy to access" },
      {
        type: "p",
        text: "Host your work somewhere that can be opened with a single link — for example a code repository, a published dashboard or a simple personal page. Add the link to your resume and professional profiles.",
      },
      { type: "h2", id: "talking-about-projects", text: "Talking about your projects in interviews" },
      {
        type: "p",
        text: "Expect to be asked why you made certain choices. Practise explaining a project in two minutes, then in more depth. Prepare for questions such as: How did you handle missing values? Why did you choose this chart? What would you change if you did it again?",
      },
      {
        type: "p",
        text: "Mock interviews are useful here because they reveal gaps in your explanation before a real interview does. Talentele includes HR and technical mock interviews as part of its [career support](/placement/).",
      },
      { type: "h2", id: "keep-it-current", text: "Keep it current" },
      {
        type: "p",
        text: "Update your portfolio as your skills improve. Replacing an early project with a stronger one is better than keeping everything. To build a strong foundation for your first projects, explore the [Data Analytics course](/data-analytics-course/) or read about [which tools to learn first](/blog/sql-excel-or-python-what-to-learn-first/).",
      },
    ],
  },
  {
    slug: "ats-friendly-resume-for-freshers",
    title: "Writing an ATS-Friendly Resume for Your First Tech or Data Role",
    excerpt:
      "Many employers screen resumes with applicant tracking systems. How to write a resume that is easy for both software and people to read.",
    category: "Interview Prep",
    publishedAt: "2026-10-14",
    image: resumeImg,
    imageAlt: "A person writing notes with a pen at a desk beside a cup",
    relatedCourses: ["data-analytics", "software-testing", "python"],
    seo: {
      title: "How to Write an ATS-Friendly Resume as a Fresher",
      description:
        "How applicant tracking systems read resumes, and practical steps to write a clear, ATS-friendly resume for your first tech or data analytics job.",
    },
    body: [
      {
        type: "p",
        text: "Many organisations use applicant tracking systems (ATS) to receive and organise job applications. These systems extract information from your resume so that recruiters can search and compare candidates. If your resume is hard to parse, important details can be lost before a person ever reads it.",
      },
      {
        type: "p",
        text: "The good news is that a resume which works well for an ATS is usually also easier for a recruiter to read. The principles are clarity, structure and relevance.",
      },
      { type: "h2", id: "how-ats-reads", text: "How an ATS reads your resume" },
      {
        type: "p",
        text: "An ATS converts your document to text and tries to identify sections such as experience, education and skills. Complex layouts — multiple columns, text inside images, tables and decorative graphics — can confuse that process. Systems differ, so the safest approach is a simple, conventional structure.",
      },
      { type: "h2", id: "formatting", text: "Formatting that works" },
      {
        type: "ul",
        items: [
          "Use a single-column layout with clear section headings such as **Summary**, **Skills**, **Projects**, **Experience** and **Education**.",
          "Choose a standard, readable font and keep the size consistent.",
          "Avoid putting key information in headers, footers, text boxes or images.",
          "Submit the file format the employer requests. If none is specified, a text-based PDF or a Word document is common.",
          "Keep it concise — one page is usually enough for a fresher.",
        ],
      },
      { type: "h2", id: "content", text: "Content that earns attention" },
      { type: "h3", id: "tailor", text: "Tailor it to each role" },
      {
        type: "p",
        text: "Read the job description carefully and reflect its genuine requirements in your resume — using the same terms where they truthfully describe your skills. If a role asks for SQL and Power BI and you have used both, make sure those words appear. Never list skills you do not have; interviews will test them.",
      },
      { type: "h3", id: "projects", text: "Lead with projects if you have little experience" },
      {
        type: "p",
        text: "For freshers, projects are often the strongest evidence of ability. For each one, give a one-line description, the tools you used and the result. For example: “Analysed 12 months of sales data in SQL and built a Power BI dashboard highlighting regional performance.” A [well-structured portfolio](/blog/how-to-build-a-data-analytics-portfolio/) gives you material for this section.",
      },
      { type: "h3", id: "action-verbs", text: "Describe what you did, specifically" },
      {
        type: "p",
        text: "Start bullet points with clear verbs — analysed, built, automated, tested, presented — and be specific about the task. Include numbers only when they are accurate and you can explain them.",
      },
      {
        type: "callout",
        title: "Accuracy matters more than polish",
        text: "Everything on your resume can become an interview question. Write only what you can discuss confidently and honestly.",
      },
      { type: "h2", id: "checklist", text: "A quick final checklist" },
      {
        type: "ol",
        items: [
          "Contact details are correct and professional.",
          "Section headings are standard and easy to find.",
          "Skills match the role and are genuinely yours.",
          "Projects describe the problem, tools and result.",
          "Spelling and grammar have been checked by another person.",
        ],
      },
      { type: "h2", id: "get-support", text: "Getting support" },
      {
        type: "p",
        text: "Talentele's [career support](/placement/) includes resume crafting and ATS assistance, alongside soft-skills training and mock interviews. To build the skills employers look for, explore our [courses](/courses/) or [ask the team for guidance](/contact-us/).",
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

/** Newest first. */
export function getSortedPosts(): Post[] {
  return [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getRelatedPosts(post: Post, limit = 3): Post[] {
  return posts
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({
      post: p,
      score:
        (p.category === post.category ? 2 : 0) +
        p.relatedCourses.filter((c) => post.relatedCourses.includes(c)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post: p }) => p);
}

export function readingTimeMinutes(post: Post): number {
  const text = post.body
    .map((block) => {
      if (block.type === "ul" || block.type === "ol") return block.items.join(" ");
      if (block.type === "callout") return `${block.title} ${block.text}`;
      return block.text;
    })
    .join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}
