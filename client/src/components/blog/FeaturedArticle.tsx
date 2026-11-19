import { PostCard } from "@/components/blog/PostCard";
import type { Post } from "@/data/posts";

export function FeaturedArticle({ post }: { post: Post }) {
  return (
    <div className="mb-14">
      <div className="mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#667085]">
          Spotlight Guide
        </span>
      </div>
      <PostCard post={post} featured headingLevel="h2" />
    </div>
  );
}

export default FeaturedArticle;

