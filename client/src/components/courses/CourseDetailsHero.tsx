import { ArrowRight, Phone } from "@/components/common/Icons";
import { PageHero } from "@/components/common/PageHero";
import { QuickEnquiryCard } from "@/components/common/QuickEnquiryCard";
import { ToolLogo } from "@/components/common/ToolLogo";
import type { Course } from "@/data/courses";
import { site } from "@/data/site";

type CourseDetailsHeroProps = {
  course: Course;
  enquiryHref: string;
};

export function CourseDetailsHero({ course, enquiryHref }: CourseDetailsHeroProps) {
  return (
    <PageHero
      eyebrow={course.category}
      title={`${course.title} Training in Bhubaneswar`}
      intro={<p>{course.intro}</p>}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Courses", path: "/courses/" },
        { name: course.title, path: `/${course.slug}-course/` },
      ]}
      rightElement={<QuickEnquiryCard defaultCourse={course.slug} />}
      actions={
        <>
          <a href="#enquire" className="btn-primary">
            Enquire About This Course
            <ArrowRight width={16} height={16} />
          </a>
          <a
            href={site.phone.href}
            className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            <Phone width={16} height={16} className="text-red-400" />
            <span>{site.phone.display}</span>
          </a>
        </>
      }
    >
      <ul className="mt-8 flex flex-wrap gap-2.5" aria-label="Tools and technologies">
        {course.tools.map((tool) => (
          <li
            key={tool}
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-sm shadow-2xs transition-all hover:bg-white/15 hover:border-white/35"
          >
            <span className="flex size-5 items-center justify-center rounded bg-white/10 p-0.5 shadow-xs">
              <ToolLogo name={tool} width={14} height={14} className="shrink-0" />
            </span>
            <span>{tool}</span>
          </li>
        ))}
      </ul>
    </PageHero>
  );
}

export default CourseDetailsHero;

