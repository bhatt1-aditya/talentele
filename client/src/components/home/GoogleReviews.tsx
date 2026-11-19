import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle } from "@/components/common/Icons";
import { site } from "@/data/site";
import { SectionHeading } from "./SectionHeading";

type GoogleReview = {
  id: string;
  name: string;
  initials: string;
  color: string;
  course: string;
  rating: number;
  date: string;
  review: string;
};

const googleReviews: GoogleReview[] = [
  {
    id: "rev-1",
    name: "Subhashree Mohapatra",
    initials: "SM",
    color: "#0284c7",
    course: "Data Analytics Master Program",
    rating: 5,
    date: "2 weeks ago",
    review:
      "I joined Talentele from a non-IT background. The mentors took personal care to teach SQL and Power BI from the absolute basics with real-time business datasets. The placement support is 100% genuine — helped me crack TCS with a great hike!",
  },
  {
    id: "rev-2",
    name: "Debasis Rout",
    initials: "DR",
    color: "#059669",
    course: "SAP ERP Consultant",
    rating: 5,
    date: "1 month ago",
    review:
      "Best training institute in Nayapalli, Bhubaneswar for SAP modules. The trainers have 15+ years of real industry experience. The hands-on configuration practice on real enterprise cases across FICO, MM and SD made all the difference in interviews.",
  },
  {
    id: "rev-3",
    name: "Rakesh Kumar Jena",
    initials: "RJ",
    color: "#8247f5",
    course: "Business Intelligence Analyst",
    rating: 5,
    date: "3 weeks ago",
    review:
      "Practical, project-based training at its best! Instead of just slides, we built real banking and retail executive dashboards. Mentors helped rewrite my ATS resume and conducted 1-on-1 mock interviews that got me placed at Capgemini.",
  },
  {
    id: "rev-4",
    name: "Priyanka Mishra",
    initials: "PM",
    color: "#ea580c",
    course: "Data Analytics Consultant",
    rating: 5,
    date: "1 month ago",
    review:
      "Returning to tech after a 3-year career break felt daunting, but Talentele's supportive lab environment and dedicated doubt-clearing sessions gave me the confidence I needed. Secured an offer at Genpact!",
  },
  {
    id: "rev-5",
    name: "Bikash Chandra Sahoo",
    initials: "BS",
    color: "#0284c7",
    course: "Power BI & SQL Cohort",
    rating: 5,
    date: "2 months ago",
    review:
      "Excellent Power BI and DAX mentoring. The faculty teaches complex data modeling and row-level security with ease. Weekend batch timings were very convenient for working professionals like me.",
  },
  {
    id: "rev-6",
    name: "Ananya Priyadarshini",
    initials: "AP",
    color: "#db2777",
    course: "Data Science & Machine Learning",
    rating: 5,
    date: "1 month ago",
    review:
      "Learned Python, Machine Learning algorithms, and data cleansing from scratch. The capstone portfolio projects I built here directly impressed the interviewers at Cognizant. Truly thankful to the entire Talentele team!",
  },
];

export function GoogleReviews() {
  return (
    <section className="section-home google-reviews-section" id="reviews">
      <div className="shell">
        <div className="section-top">
          <SectionHeading
            eyebrow="STUDENT TESTIMONIALS"
            title="Google Reviews & Ratings"
            highlight="Google Reviews"
            description="Verified ratings and honest feedback from students who transformed their careers with Talentele."
          />

          {/* Google Summary Header Card */}
          <div className="google-badge-header">
            <div className="google-badge-icon">
              <Image
                src="/images/proof/google.svg"
                alt="Google Reviews"
                width={36}
                height={36}
              />
            </div>
            <div className="google-badge-info">
              <div className="google-score-line">
                <span className="google-score-num">4.9</span>
                <span className="google-stars-display" aria-hidden="true">
                  ★★★★★
                </span>
              </div>
              <span className="google-badge-count">140+ Verified Reviews on Google Maps</span>
            </div>
            <Link
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-google-maps"
              aria-label="View Talentele on Google Maps"
            >
              <span>View Profile</span>
              <ArrowUpRight width={14} height={14} />
            </Link>
          </div>
        </div>

        {/* 6 Grid Review Cards */}
        <div className="google-reviews-grid">
          {googleReviews.map((rev) => (
            <article key={rev.id} className="google-review-card">
              <div className="review-card-top">
                <div className="reviewer-info">
                  <div
                    className="reviewer-avatar"
                    style={{ backgroundColor: rev.color }}
                    aria-hidden="true"
                  >
                    {rev.initials}
                  </div>
                  <div>
                    <h4 className="reviewer-name">{rev.name}</h4>
                    <span className="reviewer-course">{rev.course}</span>
                  </div>
                </div>
                <Image
                  src="/images/proof/google.svg"
                  alt="Verified on Google"
                  width={20}
                  height={20}
                  className="google-card-logo"
                />
              </div>

              <div className="review-rating-bar">
                <span className="stars-gold" aria-hidden="true">★★★★★</span>
                <span className="verified-badge">
                  <CheckCircle width={13} height={13} />
                  <span>Verified Student</span>
                </span>
                <span className="review-date">{rev.date}</span>
              </div>

              <p className="review-text">"{rev.review}"</p>
            </article>
          ))}
        </div>

        {/* Bottom CTA Strip */}
        <div className="reviews-bottom-cta">
          <div className="reviews-cta-text">
            <strong>See what our learners achieve</strong>
            <p>Read all 140+ real reviews and ratings on Google Maps.</p>
          </div>
          <Link
            href={site.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-read-google"
          >
            <Image
              src="/images/proof/google.svg"
              alt="Google"
              width={18}
              height={18}
            />
            <span>Read All Google Reviews</span>
            <ArrowUpRight width={15} height={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
