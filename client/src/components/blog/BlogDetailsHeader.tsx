import Image from "next/image";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Clock } from "@/components/common/Icons";
import type { Post } from "@/data/posts";
import { formatDate } from "@/lib/utilities";

type BlogDetailsHeaderProps = {
  post: Post;
  readTimeMinutes: number;
};

export function BlogDetailsHeader({ post, readTimeMinutes }: BlogDetailsHeaderProps) {
  return (
    <header className="relative overflow-hidden bg-[var(--navy)] text-white">
      <div className="hero-grid" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-40 top-0 size-96 rounded-full opacity-25 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(245, 45, 70, 0.35) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="shell relative z-10 pb-12 pt-10 md:pb-16 md:pt-14">
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Career Blog", path: "/blog/" },
              { name: post.title, path: `/blog/${post.slug}/` },
            ]}
            tone="dark"
          />

          <p className="mt-4 text-xs font-extrabold uppercase tracking-[0.16em] text-red-400">
            {post.category}
          </p>

          <h1 className="mt-4 text-3xl font-extrabold leading-[1.14] tracking-tight text-white md:text-5xl">
            {post.title}
          </h1>

          <p className="mt-4 text-base leading-relaxed text-[#c5cddd] md:text-lg">
            {post.excerpt}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-5 text-xs text-[#aab4c5]">
            <span>
              Published <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </span>
            {post.updatedAt && post.updatedAt !== post.publishedAt && (
              <span>
                Updated <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Clock width={14} height={14} /> {readTimeMinutes} min read
            </span>
            <span>By Talentele Academic Faculty</span>
          </div>
        </div>
      </div>

      {/* Lead Image */}
      <div className="shell relative z-10 pb-12">
        <div className="relative mx-auto aspect-[16/8] max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-[#0b1730] shadow-2xl">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            priority
            placeholder="blur"
            sizes="(min-width: 1100px) 1024px, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </header>
  );
}

export default BlogDetailsHeader;

