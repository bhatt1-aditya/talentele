import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";

const proofItems = [
  {
    score: "4.9",
    stars: true,
    label: "Google Reviews",
    sub: "140+ Verified Ratings",
    href: site.mapsUrl,
    icon: "/images/proof/google.svg",
    iconAlt: "Official Google Reviews logo",
    iconWidth: 28,
    iconHeight: 28,
  },
  {
    score: "4.8",
    stars: true,
    label: "Justdial",
    sub: "Top Rated in Bhubaneswar",
    href: "https://www.justdial.com/Bhubaneswar/Talentele",
    icon: "/images/proof/justdial-icon.svg",
    iconAlt: "Official Justdial logo",
    iconWidth: 32,
    iconHeight: 32,
  },
  {
    score: "4.9",
    stars: true,
    label: "AmbitionBox",
    sub: "Top Career Institute",
    href: "https://www.ambitionbox.com/",
    icon: "/images/proof/ambitionbox.png",
    iconAlt: "Official AmbitionBox logo",
    iconWidth: 30,
    iconHeight: 30,
  },
  {
    score: "10K+",
    stars: false,
    label: "YouTube Community",
    sub: "Free Masterclasses & Projects",
    href: site.social.find((s) => s.label === "YouTube")?.href ?? "https://www.youtube.com/",
    icon: "/images/proof/youtube.svg",
    iconAlt: "Official YouTube logo",
    iconWidth: 32,
    iconHeight: 23,
  },
];

export function ProofStrip() {
  return (
    <section className="proof-strip" aria-label="Ratings and student community verifications">
      <div className="shell proof-grid">
        {proofItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="proof-item"
            title={`View Talentele on ${item.label}`}
          >
            <span className="proof-mark" aria-hidden="true">
              <Image
                src={item.icon}
                alt={item.iconAlt}
                width={item.iconWidth}
                height={item.iconHeight}
                className="proof-icon-img"
              />
            </span>
            <div className="proof-content">
              <div className="proof-score-row">
                <strong className="proof-score">{item.score}</strong>
                {item.stars && (
                  <span className="proof-stars" aria-hidden="true">
                    ★★★★★
                  </span>
                )}
              </div>
              <b className="proof-label">{item.label}</b>
              <small className="proof-sub">{item.sub}</small>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
