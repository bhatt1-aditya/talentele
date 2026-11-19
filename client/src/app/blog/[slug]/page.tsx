import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogDetailsBody } from "@/components/blog/BlogDetailsBody";
import { BlogDetailsHeader } from "@/components/blog/BlogDetailsHeader";
import { RelatedArticles } from "@/components/blog/RelatedArticles";
import { JsonLd } from "@/components/seo/JsonLd";
import { getCourse, type Course } from "@/data/courses";
import { getPost, getRelatedPosts, posts, readingTimeMinutes } from "@/data/posts";
import { site } from "@/data/site";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

// Fully static: unknown slugs render (and call notFound()) before any response is sent, so they return a real 404.
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata({
    ...post.seo,
    path: `/blog/${post.slug}/`,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt ?? post.publishedAt,
  });
}

export default async function ArticlePage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);
  const courses = post.relatedCourses.map(getCourse).filter((c): c is Course => Boolean(c));
  const minutes = readingTimeMinutes(post);
  const url = absoluteUrl(`/blog/${post.slug}/`);

  return (
    <article>
      {/* 1. Header with Breadcrumbs, Category, Title & Lead Image */}
      <BlogDetailsHeader post={post} readTimeMinutes={minutes} />

      {/* 2. Article Content, TOC, and Guidance Callout */}
      <BlogDetailsBody post={post} courses={courses} />

      {/* 3. Related Articles */}
      <RelatedArticles posts={related} />

      {/* SEO Schema */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          image: absoluteUrl(post.image.src),
          datePublished: post.publishedAt,
          dateModified: post.updatedAt ?? post.publishedAt,
          mainEntityOfPage: url,
          url,
          author: { "@type": "Organization", name: site.name, url: `${site.url}/` },
          publisher: {
            "@type": "Organization",
            name: site.name,
            logo: { "@type": "ImageObject", url: absoluteUrl("/brand/talentele-logo.png") },
          },
        }}
      />
    </article>
  );
}
