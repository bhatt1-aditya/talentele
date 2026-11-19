import { PostCard } from "@/components/blog/PostCard";
import { Section } from "@/components/common/Section";
import type { Post } from "@/data/posts";

export function RelatedArticles({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;

  return (
    <Section tone="mist" labelledBy="related-posts-title">
      <div className="mb-8">
        <h2 id="related-posts-title" className="text-2xl font-extrabold text-[#101828] md:text-3xl">
          Related Career Guides
        </h2>
        <p className="mt-1 text-sm text-[#667085]">
          Explore more articles on analytics, programming, and tech interview preparation.
        </p>
      </div>
      <ul className="grid gap-6 md:grid-cols-3">
        {posts.map((p) => (
          <li key={p.slug} className="flex">
            <PostCard post={p} className="w-full" />
          </li>
        ))}
      </ul>
    </Section>
  );
}

export default RelatedArticles;

