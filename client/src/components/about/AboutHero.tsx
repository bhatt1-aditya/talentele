import Link from "next/link";
import studentsImg from "@/assets/images/students-collaborating.jpg";
import { ArrowRight } from "@/components/common/Icons";
import { PageHero } from "@/components/common/PageHero";
import { site } from "@/data/site";

export function AboutHero() {
  return (
    <PageHero
      eyebrow="ABOUT TALENTELE"
      title="Practical, affordable, real-time learning for tech careers."
      intro={site.mission}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about-us/" },
      ]}
      image={{
        src: studentsImg,
        alt: "Talentele learners collaborating in a classroom lab",
        caption: "Practical hands-on training sessions at Nayapalli, Bhubaneswar.",
      }}
      actions={
        <>
          <Link href="/courses/" className="btn-primary">
            Explore All Courses
            <ArrowRight width={16} height={16} />
          </Link>
          <Link
            href="/contact-us/"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Contact Our Mentors
          </Link>
        </>
      }
    />
  );
}

export default AboutHero;

