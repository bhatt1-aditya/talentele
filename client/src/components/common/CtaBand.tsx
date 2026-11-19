import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Phone, Target } from "@/components/common/Icons";

export type CtaBandProps = {
  eyebrow?: string;
  title?: string;
  highlightedText?: string;
  body?: string;
  primary?: { label: string; href: string };
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
};

/**
 * Standardized marketing CTA band used across all marketing pages.
 * Replicates the Home page Final CTA styling, photo, badges, and layout.
 */
export function CtaBand({
  eyebrow = "READY FOR YOUR NEXT CHAPTER?",
  title = "Your Career Growth",
  highlightedText = "Starts Here",
  body = "Join learners who are building successful careers with Talentele.",
  primary = { label: "Enquire Now", href: "/contact-us/" },
  imageSrc = "/images/home/cta-collaborate.jpg",
  imageAlt = "Two learners collaborating around a laptop",
  className = "",
}: CtaBandProps = {}) {
  const isDefaultTitle = title === "Your Career Growth";

  return (
    <section className={`section-home final-cta ${className}`} aria-labelledby="cta-band-title">
      <div className="shell cta-panel">
        <div className="cta-copy">
          <span className="eyebrow">{eyebrow}</span>
          <h2 id="cta-band-title">
            {isDefaultTitle ? (
              <>
                {title} <span>{highlightedText}</span>
              </>
            ) : (
              title
            )}
          </h2>
          <p>{body}</p>

          <div className="cta-benefits">
            <span>
              <Phone width={16} height={16} /> Free Counselling
            </span>
            <span>
              <Target width={16} height={16} /> Career Guidance
            </span>
            <span>
              <CalendarDays width={16} height={16} /> Upcoming Cohorts
            </span>
          </div>

          <Link className="btn-primary" href={primary.href}>
            {primary.label} <ArrowRight width={16} height={16} />
          </Link>
        </div>

        <div className="cta-photo">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
