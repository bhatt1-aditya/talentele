import Link from "next/link";
import { ArrowRight, Check } from "@/components/common/Icons";
import type { Course } from "@/data/courses";
import type { Post } from "@/data/posts";
import { learningFeatures } from "@/data/site";

type CourseSidebarProps = {
  course: Course;
  enquiryHref: string;
  relatedPosts: Post[];
};

export function CourseSidebar({ course, enquiryHref, relatedPosts }: CourseSidebarProps) {
  return (
    <aside className="lg:col-span-4" aria-label="Course details and enquiry">
      <div className="space-y-6 lg:sticky lg:top-24">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0c1833] via-[#09152b] to-[#071225] p-7 text-white shadow-xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-red-400">
            Program Highlights
          </p>
          <h2 className="mt-3 text-lg font-bold text-white">Included with your training</h2>
          <ul className="mt-4 space-y-3 text-xs">
            {learningFeatures.slice(2, 8).map((f) => (
              <li key={f.title} className="flex gap-2.5 text-[#c5cddd]">
                <Check width={16} height={16} className="mt-0.5 shrink-0 text-red-400" />
                <span>{f.title}</span>
              </li>
            ))}
          </ul>
          {course.verifiedHighlights?.map((h) => (
            <p key={h} className="mt-4 border-t border-white/10 pt-4 text-xs leading-relaxed text-[#8c97a8]">
              {h}
            </p>
          ))}
          <div className="mt-6">
            <a href="#enquire" className="btn-primary w-full">
              Ask About Fees & Batches <ArrowRight width={14} height={14} />
            </a>
          </div>
        </div>

        <div className="rounded-xl border border-[#e4e8f0] bg-[#f5f7fb] p-6 text-xs leading-relaxed text-[#667085]">
          <p>
            <strong className="text-[#101828]">Duration, fees & timings</strong> depend on batch schedule (weekday vs weekend). Contact our Bhubaneswar team for current batch details.
          </p>
        </div>

        {relatedPosts.length > 0 && (
          <div className="rounded-xl border border-[#e4e8f0] bg-white p-6 shadow-2xs">
            <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-[#667085]">
              Related Career Reading
            </h2>
            <ul className="mt-3 space-y-3">
              {relatedPosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}/`}
                    className="text-xs font-semibold leading-snug text-[#101828] hover:text-red-600 transition-colors"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </aside>
  );
}

export default CourseSidebar;

