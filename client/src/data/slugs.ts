/**
 * Published slugs, kept dependency-free so `next.config.ts` can import them.
 * `Course.slug` and `Post.slug` are typed against these lists, so adding a
 * course or article without listing its slug here fails type checking.
 */
export const courseSlugs = [
  "data-analytics",
  "business-analytics",
  "data-science",
  "software-testing",
  "sap",
  "python",
  "excel",
  "sql",
  "power-bi",
  "generative-ai",
] as const;

export const postSlugs = [
  "data-analyst-vs-data-scientist-vs-business-analyst",
  "sql-excel-or-python-what-to-learn-first",
  "how-to-build-a-data-analytics-portfolio",
  "ats-friendly-resume-for-freshers",
] as const;

export type CourseSlug = (typeof courseSlugs)[number];
export type PostSlug = (typeof postSlugs)[number];
