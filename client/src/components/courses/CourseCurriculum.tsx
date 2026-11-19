import { FaqList } from "@/components/common/FaqList";
import { Check, Info } from "@/components/common/Icons";
import type { Course } from "@/data/courses";

type CourseCurriculumProps = {
  course: Course;
};

export function CourseCurriculum({ course }: CourseCurriculumProps) {
  return (
    <div className="space-y-16 lg:col-span-8">
      {/* Overview */}
      <section aria-labelledby="overview-title">
        <h2 id="overview-title" className="text-2xl font-extrabold text-[#101828] md:text-3xl">
          Course overview
        </h2>
        <div className="mt-4 space-y-4 text-base leading-relaxed text-[#55555f]">
          {course.overview.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>

      {/* Learning Outcomes */}
      <section aria-labelledby="outcomes-title">
        <h2 id="outcomes-title" className="text-2xl font-extrabold text-[#101828] md:text-3xl">
          What you will be able to do
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {course.outcomes.map((outcome) => (
            <li
              key={outcome}
              className="flex gap-3 rounded-xl border border-[#e4e8f0] bg-[#f5f7fb] p-4 text-sm font-medium text-[#101828]"
            >
              <Check className="mt-0.5 shrink-0 text-red-600" width={18} height={18} />
              <span className="leading-relaxed">{outcome}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Topics Covered */}
      <section aria-labelledby="topics-title">
        <h2 id="topics-title" className="text-2xl font-extrabold text-[#101828] md:text-3xl">
          Topic areas
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#667085]">
          Core subject modules covered in live classes. A detailed batch schedule and syllabus PDF is shared during counselling.
        </p>
        <ol className="mt-6 divide-y divide-[#e4e8f0] border-y border-[#e4e8f0]">
          {course.topics.map((topic, i) => (
            <li key={topic.title} className="grid gap-3 py-6 sm:grid-cols-[4rem_1fr]">
              <span className="font-display text-2xl font-extrabold text-red-600">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-lg font-bold text-[#101828]">{topic.title}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {topic.points.map((point) => (
                    <li
                      key={point}
                      className="rounded-md border border-[#e4e8f0] bg-white px-2.5 py-1 text-xs text-[#55555f]"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Practical Exercises */}
      <section aria-labelledby="practice-title">
        <h2 id="practice-title" className="text-2xl font-extrabold text-[#101828] md:text-3xl">
          Practical exercises & capstone portfolio
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#667085]">
          Examples of real-time projects built during the program:
        </p>
        <ul className="mt-5 space-y-3">
          {course.practice.map((item) => (
            <li
              key={item}
              className="flex gap-3.5 rounded-xl border border-[#e4e8f0] bg-white p-5 text-sm text-[#101828] shadow-2xs"
            >
              <span aria-hidden="true" className="mt-1.5 size-2 shrink-0 rounded-full bg-red-600" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 flex items-center gap-2 text-xs text-[#667085]">
          <Info width={14} height={14} className="shrink-0 text-red-600" />
          Illustrative practical exercises; projects may vary by student and batch.
        </p>
      </section>

      {/* Audience & Background */}
      <section aria-labelledby="audience-title" className="grid gap-8 rounded-2xl border border-[#e4e8f0] bg-[#f5f7fb] p-8 md:grid-cols-2">
        <div>
          <h2 id="audience-title" className="text-xl font-bold text-[#101828]">
            Who this course is for
          </h2>
          <ul className="mt-4 space-y-3">
            {course.audience.map((a) => (
              <li key={a} className="flex gap-2.5 text-xs font-medium leading-relaxed text-[#55555f]">
                <Check className="mt-0.5 shrink-0 text-red-600" width={16} height={16} />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#101828]">Recommended background</h2>
          <p className="mt-4 text-xs leading-relaxed text-[#55555f]">{course.recommendedBackground}</p>
        </div>
      </section>

      {/* FAQs */}
      <section aria-labelledby="course-faq-title">
        <h2 id="course-faq-title" className="text-2xl font-extrabold text-[#101828] md:text-3xl">
          {course.shortTitle} FAQs
        </h2>
        <div className="mt-6">
          <FaqList items={course.faqs} />
        </div>
      </section>
    </div>
  );
}

export default CourseCurriculum;

