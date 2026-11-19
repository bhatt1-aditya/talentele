import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@/components/common/Icons";
import { faculty } from "@/data/faculty";
import { SectionHeading } from "./SectionHeading";

const mentorCards = [
  {
    name: faculty[0]?.name ?? "Gouri Shankar Jena",
    specialty: "Data Analytics & Architecture",
    experience: faculty[0]?.experience ?? "18+ years exp.",
    background: "ex-UBS, Capgemini, TCS, Accenture",
    photo: "/images/home/person-1.jpg",
  },
  {
    name: faculty[1]?.name ?? "Prashant Gautam",
    specialty: "Business Analytics & BI",
    experience: faculty[1]?.experience ?? "15+ years exp.",
    background: "ex-Accenture, HSBC, Citibank, UBS",
    photo: "/images/home/person-2.jpg",
  },
  {
    name: faculty[2]?.name ?? "Prathyush Panigrahy",
    specialty: "Power BI & Tableau",
    experience: faculty[2]?.experience ?? "7+ years exp.",
    background: "ex-Walmart, Oracle",
    photo: "/images/home/person-3.jpg",
  },
  {
    name: faculty[3]?.name ?? "Jiten Kumar Sahoo",
    specialty: "Python & Automation",
    experience: faculty[3]?.experience ?? "7+ years exp.",
    background: "Python Programming Lead",
    photo: "/images/home/person-4.jpg",
  },
  {
    name: faculty[4]?.name ?? "Avijith Swain",
    specialty: "Data Science & ML",
    experience: faculty[4]?.experience ?? "4+ years exp.",
    background: "Machine Learning Specialist",
    photo: "/images/home/person-5.jpg",
  },
  {
    name: "Talentele Career Team",
    specialty: "Career & Mock Interviews",
    experience: "Placement Support",
    background: "Resume & ATS Counselling",
    photo: "/images/home/person-6.jpg",
  },
];

export function Mentors() {
  const marqueeMentors = [...mentorCards, ...mentorCards];

  return (
    <section className="section-home mentor-section">
      <div className="shell">
        <div className="section-top">
          <SectionHeading
            eyebrow="LEARN FROM PRACTITIONERS"
            title="Meet Our Expert Mentors"
            highlight="Expert Mentors"
            description="Learn directly from verified practitioners with 4 to 18+ years of enterprise experience in data analytics, business intelligence, and software engineering."
          />
          <Link className="text-link" href="/about-us/">
            View All Mentors <ArrowRight width={17} height={17} />
          </Link>
        </div>

        {/* Continuous Infinite Auto-Scrolling Marquee Track */}
        <div className="mentor-marquee-container" aria-label="Faculty mentors marquee">
          <div className="mentor-marquee-track">
            {marqueeMentors.map((m, idx) => (
              <article key={`${m.name}-${idx}`} className="mentor-card">
                <div className="mentor-photo">
                  <Image
                    src={m.photo}
                    alt={`Faculty mentor ${m.name} — ${m.specialty}`}
                    width={300}
                    height={205}
                  />
                  <span>FACULTY</span>
                </div>
                <div className="mentor-content">
                  <div>
                    <h3>{m.name}</h3>
                    <ArrowUpRight width={17} height={17} />
                  </div>
                  <p>{m.specialty}</p>
                  <small>{m.experience} • {m.background}</small>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
