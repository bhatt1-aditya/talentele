import Link from "next/link";
import { ArticleBody, TableOfContents } from "@/components/blog/ArticleBody";
import { ArrowRight } from "@/components/common/Icons";
import type { Course } from "@/data/courses";
import type { Post } from "@/data/posts";

type BlogDetailsBodyProps = {
  post: Post;
  courses: Course[];
};

export function BlogDetailsBody({ post, courses }: BlogDetailsBodyProps) {
  return (
    <div className="shell pb-20 pt-14 md:pt-16">
      <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1fr_18rem]">
        <div className="min-w-0">
          <div className="mb-8 lg:hidden">
            <TableOfContents blocks={post.body} />
          </div>

          <ArticleBody blocks={post.body} />

          <p className="mt-12 border-t border-[#e4e8f0] pt-4 text-xs text-[#667085]">
            Featured image is an illustrative educational photograph. Article authored by Talentele faculty.
          </p>

          {/* Conversion Callout Card */}
          <div className="mt-12 rounded-2xl border border-[#e4e8f0] bg-gradient-to-br from-[#0c1833] via-[#09152b] to-[#071225] p-8 text-white shadow-xl">
            <h3 className="text-xl font-bold text-white">Want help planning your career roadmap?</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#c5cddd]">
              Talk directly with our Bhubaneswar training mentors for a free skills evaluation and batch schedule details.
            </p>
            <div className="mt-6">
              <Link href="/contact-us/" className="btn-primary">
                Book Free Counselling <ArrowRight width={16} height={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* Desktop Sticky Sidebar */}
        <aside className="hidden lg:block" aria-label="Article navigation">
          <div className="sticky top-24 space-y-6">
            <TableOfContents blocks={post.body} />

            {courses.length > 0 && (
              <div className="rounded-xl border border-white/10 bg-[#0b1730] p-6 text-white shadow-md">
                <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-[#f55388]">
                  Related Courses
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {courses.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/${c.slug}-course/`}
                        className="group flex items-center justify-between text-xs font-semibold text-[#c5cddd] transition-colors hover:text-white"
                      >
                        <span>{c.title}</span>
                        <ArrowRight
                          width={13}
                          height={13}
                          className="text-red-400 transition-transform group-hover:translate-x-1"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default BlogDetailsBody;

