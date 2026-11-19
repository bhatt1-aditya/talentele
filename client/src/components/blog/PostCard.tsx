import Image from "next/image";
import Link from "next/link";

import { ArrowRight, Clock } from "@/components/common/Icons";
import { readingTimeMinutes, type Post } from "@/data/posts";
import { cn, formatDate } from "@/lib/utilities";

type PostCardProps = {
  post: Post;
  headingLevel?: "h2" | "h3";
  featured?: boolean;
  className?: string;
};

export function PostCard({
  post,
  headingLevel: Heading = "h3",
  featured = false,
  className,
}: PostCardProps) {
  const readTime = readingTimeMinutes(post);

  if (featured) {
    return (
      <article
        className={cn(
          "group relative overflow-hidden rounded-2xl border border-[#e4e8f0] bg-white p-6 shadow-sm transition-all hover:border-red-500/30 hover:shadow-lg lg:grid lg:grid-cols-12 lg:items-center lg:gap-10 lg:p-8",
          className
        )}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[#e4e8f0] bg-[#f5f7fb] lg:col-span-7">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            priority
            placeholder="blur"
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>

        <div className="mt-6 flex flex-1 flex-col justify-between lg:col-span-5 lg:mt-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-red-50 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-red-600">
                {post.category}
              </span>
              <span className="text-xs text-[#667085]">Featured Guide</span>
            </div>

            <Heading className="mt-3 text-2xl font-extrabold leading-tight text-[#101828] group-hover:text-red-600 transition-colors md:text-3xl">
              <Link href={`/blog/${post.slug}/`} className="focus-visible:outline-none">
                {post.title}
              </Link>
            </Heading>

            <p className="mt-3 text-sm leading-relaxed text-[#667085] md:text-base">
              {post.excerpt}
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-[#e4e8f0] pt-4 text-xs text-[#667085]">
            <div className="flex items-center gap-3">
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <Clock width={14} height={14} /> {readTime} min read
              </span>
            </div>

            <Link
              href={`/blog/${post.slug}/`}
              className="inline-flex items-center gap-1.5 font-bold text-red-600 group-hover:translate-x-1 transition-transform"
            >
              <span>Read Guide</span>
              <ArrowRight width={14} height={14} />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-xl border border-[#e4e8f0] bg-white p-5 shadow-2xs transition-all hover:-translate-y-1 hover:border-red-500/30 hover:shadow-md",
        className
      )}
    >
      <div>
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-[#e4e8f0] bg-[#f5f7fb]">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="rounded bg-red-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-600">
            {post.category}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-[#667085]">
            <Clock width={12} height={12} /> {readTime} min
          </span>
        </div>

        <Heading className="mt-3 text-lg font-bold leading-snug text-[#101828] group-hover:text-red-600 transition-colors">
          <Link href={`/blog/${post.slug}/`} className="focus-visible:outline-none">
            {post.title}
          </Link>
        </Heading>

        <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-[#667085]">
          {post.excerpt}
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-[#e4e8f0] pt-3 text-xs">
        <time dateTime={post.publishedAt} className="text-[#8c97a8]">
          {formatDate(post.publishedAt)}
        </time>

        <Link
          href={`/blog/${post.slug}/`}
          className="inline-flex items-center gap-1 font-bold text-red-600 group-hover:translate-x-0.5 transition-transform"
        >
          <span>Read</span>
          <ArrowRight width={12} height={12} />
        </Link>
      </div>
    </article>
  );
}
