"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";

interface ProofItem {
  target: number;
  isDecimal: boolean;
  suffix: string;
  defaultDisplay: string;
  stars: boolean;
  label: string;
  sub: string;
  href: string;
  icon: string;
  iconAlt: string;
  iconWidth: number;
  iconHeight: number;
}

const proofItems: ProofItem[] = [
  {
    target: 4.9,
    isDecimal: true,
    suffix: "",
    defaultDisplay: "4.9",
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
    target: 4.8,
    isDecimal: true,
    suffix: "",
    defaultDisplay: "4.8",
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
    target: 4.9,
    isDecimal: true,
    suffix: "",
    defaultDisplay: "4.9",
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
    target: 10,
    isDecimal: false,
    suffix: "K+",
    defaultDisplay: "10K+",
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
  const pathname = usePathname();
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [scores, setScores] = useState<string[]>(() =>
    proofItems.map((item) => item.defaultDisplay)
  );

  // Reset values when route changes (e.g., navigating away and returning to home)
  useEffect(() => {
    setIsInView(false);
    setIsCompleted(false);
    setScores(proofItems.map((item) => (item.isDecimal ? "0.0" : "0" + item.suffix)));
  }, [pathname]);

  // Continuously observe visibility so animation plays whenever the section is reached
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        } else {
          // Reset when scrolled out of view so it animates again when reached
          setIsInView(false);
          setIsCompleted(false);
          setScores(proofItems.map((item) => (item.isDecimal ? "0.0" : "0" + item.suffix)));
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -20px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Trigger count-up animation whenever section enters the viewport
  useEffect(() => {
    if (!isInView) return;

    setIsCompleted(false);
    const duration = 1600; // ms
    const startTime = performance.now();

    function easeOutQuart(x: number): number {
      return 1 - Math.pow(1 - x, 4);
    }

    let animId: number;

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = easeOutQuart(progress);

      setScores(
        proofItems.map((item) => {
          if (progress >= 1) return item.defaultDisplay;
          const current = eased * item.target;
          return item.isDecimal
            ? current.toFixed(1) + item.suffix
            : Math.floor(current) + item.suffix;
        })
      );

      if (progress < 1) {
        animId = requestAnimationFrame(update);
      } else {
        setIsCompleted(true);
      }
    };

    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className={`proof-strip ${isCompleted ? "proof-animated" : ""}`}
      aria-label="Ratings and student community verifications"
    >
      <div className="shell proof-grid">
        {proofItems.map((item, idx) => (
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
                <strong className={`proof-score ${isCompleted ? "completed" : ""}`}>
                  {scores[idx]}
                </strong>
                {item.stars && (
                  <span className={`proof-stars ${isCompleted ? "visible" : ""}`} aria-hidden="true">
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
