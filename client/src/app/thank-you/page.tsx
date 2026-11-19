import { cookies } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";

import { ButtonLink } from "@/components/common/Button";
import { ArrowRight, Check, Phone } from "@/components/common/Icons";
import { courses } from "@/data/courses";
import { getSortedPosts } from "@/data/posts";
import { site } from "@/data/site";
import { ENQUIRY_COOKIE } from "@/lib/enquiry-cookie";
import { buildMetadata } from "@/lib/seo";
import { GENERAL_GUIDANCE } from "@/lib/validation";

export const metadata = buildMetadata({
  title: "Thank You",
  description: "Confirmation of your Talentele course enquiry.",
  path: "/thank-you/",
  noIndex: true,
});

/** Confirms success only when the enquiry action has set its short-lived cookie. */
async function Confirmation() {
  const cookieStore = await cookies();
  const sent = cookieStore.get(ENQUIRY_COOKIE)?.value;

  if (!sent) {
    return (
      <>
        <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">No recent enquiry found.</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          We couldn&apos;t find an enquiry submitted from this browser in the last few minutes. If you meant to contact us,
          please use the enquiry form or reach the team directly.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href="/contact-us/" size="lg">
            Go to the enquiry form
            <ArrowRight width={18} height={18} />
          </ButtonLink>
          <a href={site.phone.href} className="inline-flex min-h-12 items-center gap-2 px-2 font-semibold hover:text-brand-600">
            <Phone width={18} height={18} /> {site.phone.display}
          </a>
        </div>
      </>
    );
  }

  const course = sent === GENERAL_GUIDANCE ? undefined : courses.find((c) => c.slug === sent);

  return (
    <>
      <span className="grid size-14 place-items-center rounded-full bg-success text-white">
        <Check width={28} height={28} />
      </span>
      <h1 className="mt-8 text-4xl font-extrabold leading-tight md:text-5xl">Thank you — your enquiry has been sent.</h1>
      <p className="mt-5 text-lg leading-relaxed text-muted">
        The Talentele team has received your enquiry
        {course ? (
          <>
            {" "}
            about <strong className="text-ink">{course.title}</strong>
          </>
        ) : null}{" "}
        and will contact you by phone or email. If your question is urgent, call us on{" "}
        <a href={site.phone.href} className="font-semibold text-ink underline underline-offset-4">
          {site.phone.display}
        </a>
        .
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        {course ? (
          <ButtonLink href={`/${course.slug}-course/`} size="lg">
            Back to {course.title}
          </ButtonLink>
        ) : (
          <ButtonLink href="/courses/" size="lg">
            Explore courses
          </ButtonLink>
        )}
        <ButtonLink href="/" variant="secondary" size="lg">
          Return home
        </ButtonLink>
      </div>
    </>
  );
}

export default function ThankYouPage() {
  const reading = getSortedPosts().slice(0, 3);
  return (
    <section className="bg-mist">
      <div className="container-site grid gap-16 py-20 md:py-28 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Suspense fallback={<div className="h-72 animate-pulse rounded-[var(--radius-lg)] bg-line/60" aria-hidden="true" />}>
            <Confirmation />
          </Suspense>
        </div>
        <aside className="lg:col-span-5" aria-labelledby="while-you-wait">
          <div className="rounded-[var(--radius-xl)] bg-white p-8 shadow-[var(--shadow-card)]">
            <h2 id="while-you-wait" className="text-lg font-bold">
              While you wait
            </h2>
            <ul className="mt-5 divide-y divide-line">
              {reading.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}/`} className="block py-4 font-semibold leading-snug hover:text-brand-600">
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
