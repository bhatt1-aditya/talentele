import type { MetadataRoute } from "next";

import { courses } from "@/data/courses";
import { posts } from "@/data/posts";
import { absoluteUrl } from "@/lib/seo";

const staticRoutes: Array<{ path: string; priority: number }> = [
  { path: "/", priority: 1 },
  { path: "/courses/", priority: 0.9 },
  { path: "/about-us/", priority: 0.7 },
  { path: "/placement/", priority: 0.7 },
  { path: "/blog/", priority: 0.7 },
  { path: "/contact-us/", priority: 0.8 },
  { path: "/gallery/", priority: 0.4 },
  { path: "/privacy-policy/", priority: 0.2 },
  { path: "/terms-and-conditions/", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map(({ path, priority }) => ({ url: absoluteUrl(path), priority })),
    ...courses.map((course) => ({ url: absoluteUrl(`/${course.slug}-course/`), priority: 0.8 })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}/`),
      lastModified: post.updatedAt ?? post.publishedAt,
      priority: 0.6,
    })),
  ];
}
