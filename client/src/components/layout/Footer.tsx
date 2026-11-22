"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  Clock,
  Mail,
  MapPin,
  Phone,
} from "@/components/common/Icons";
import { courses } from "@/data/courses";
import { addressLines, navigation, site } from "@/data/site";

export function Footer() {
  const pathname = usePathname();

  // Hide footer when in admin dashboard
  if (pathname.startsWith("/admin")) {
    return null;
  }

  const currentYear = 2026;

  return (
    <footer className="site-footer" id="contact" aria-labelledby="footer-title">
      <h2 id="footer-title" className="sr-only">
        Site footer
      </h2>

      <div className="shell footer-grid">
        {/* Brand Column */}
        <div className="footer-brand">
          <Link href="/" className="site-logo" aria-label="Talentele home">
            <Image
              src="/brand/logo.png"
              alt="Talentele"
              width={160}
              height={41}
              className="logo-img"
            />
          </Link>

          <p>
            Career-focused learning in Data, AI, ERP and Digital Marketing, designed around
            practical skills and placement assistance in Bhubaneswar.
          </p>

          <ul className="flex flex-wrap gap-x-4 gap-y-2 pt-2 text-xs">
            {site.social.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#929daf] transition-colors hover:text-white"
                >
                  {s.label}
                  <ArrowUpRight width={12} height={12} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3>Quick Links</h3>
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>

        {/* Our Programs */}
        <div>
          <h3>Our Programs</h3>
          {courses.slice(0, 6).map((course) => (
            <Link key={course.slug} href={`/${course.slug}-course/`}>
              {course.title}
            </Link>
          ))}
        </div>

        {/* Contact Info */}
        <div>
          <h3>Contact Us</h3>
          <p className="contact-row">
            <MapPin width={15} height={15} />
            <span>
              {addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </span>
          </p>

          <p className="contact-row">
            <Phone width={15} height={15} />
            <a
              href={site.phone.href}
              className="text-[#929daf] transition-colors hover:text-white"
            >
              {site.phone.display}
            </a>
          </p>

          <p className="contact-row">
            <Mail width={15} height={15} />
            <a
              href={`mailto:${site.email}`}
              className="text-[#929daf] transition-colors hover:text-white"
            >
              {site.email}
            </a>
          </p>

          <p className="contact-row">
            <Clock width={15} height={15} />
            <span>Mon – Sat: 9:00 AM – 7:00 PM</span>
          </p>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="shell footer-bottom">
        <span>
          © {currentYear} Talentele. All rights reserved.
        </span>

        <div>
          <Link href="/privacy-policy/">Privacy Policy</Link>
          <Link href="/terms-and-conditions/">Terms & Conditions</Link>
          <Link href="/sitemap.xml">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
}
