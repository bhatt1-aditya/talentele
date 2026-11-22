"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  BriefcaseBusiness,
  ChartColumn,
  ChevronDown,
  Close,
  Menu,
  Phone,
  Sparkles,
  User,
} from "@/components/common/Icons";
import { courses } from "@/data/courses";
import { site } from "@/data/site";
import { cn } from "@/lib/utilities";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us/" },
  { label: "Courses", href: "/courses/", hasDropdown: true },
  { label: "Placements", href: "/placement/" },
  { label: "Career Blog", href: "/blog/" },
  { label: "Gallery", href: "/gallery/" },
  { label: "Contact Us", href: "/contact-us/" },
];

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileCoursesExpanded, setIsMobileCoursesExpanded] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close menus on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  }, [pathname]);

  // Close dropdown on outside click or Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Return null if inside admin dashboard (must be after all hooks!)
  if (pathname.startsWith("/admin")) {
    return null;
  }

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  const isCoursesActive = pathname.startsWith("/courses");

  return (
    <header className="site-header">
      <div className="shell nav-wrap">
        {/* Brand Logo */}
        <Link href="/" className="site-logo" aria-label="Talentele home">
          <Image
            src="/brand/logo.png"
            alt="Talentele"
            width={160}
            height={41}
            priority
            className="logo-img"
          />
        </Link>

        {/* Desktop & Mobile Navigation Links */}
        <nav
          className={cn("nav-links", isMenuOpen && "open")}
          aria-label="Main navigation"
        >
          {navItems.map((item) => {
            if (item.hasDropdown) {
              return (
                <div
                  key={item.href}
                  className="nav-item-dropdown"
                  ref={dropdownRef}
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <div className="nav-dropdown-trigger-wrap">
                    <Link
                      href={item.href}
                      className={cn(
                        "nav-link-item",
                        isCoursesActive && "active"
                      )}
                      aria-current={isCoursesActive ? "page" : undefined}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      className="nav-dropdown-toggle-btn"
                      aria-label="Toggle courses menu"
                      aria-expanded={isDropdownOpen}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsDropdownOpen(!isDropdownOpen);
                      }}
                    >
                      <ChevronDown
                        width={14}
                        height={14}
                        className={cn(
                          "transition-transform duration-200",
                          isDropdownOpen && "rotate-180"
                        )}
                      />
                    </button>
                  </div>

                  {/* Desktop Dropdown Panel */}
                  <div
                    className={cn(
                      "nav-dropdown-menu",
                      isDropdownOpen && "show"
                    )}
                    role="menu"
                    aria-label="Courses submenu"
                  >
                    <div className="dropdown-grid">
                      {/* Column 1: Analytics & BI */}
                      <div className="dropdown-col">
                        <div className="dropdown-col-header header-analytics">
                          <span className="dropdown-col-icon-wrap">
                            <ChartColumn width={14} height={14} />
                          </span>
                          <span>Analytics & BI</span>
                        </div>
                        <ul className="dropdown-list">
                          {courses
                            .filter((c) =>
                              ["data-analytics", "business-analytics", "power-bi", "excel"].includes(c.slug)
                            )
                            .map((c) => (
                              <li key={c.slug}>
                                <Link
                                  href={`/${c.slug}-course/`}
                                  className="dropdown-course-item"
                                  onClick={() => setIsDropdownOpen(false)}
                                >
                                  <strong className="dropdown-course-title">{c.title}</strong>
                                  {c.tagline ? <span className="dropdown-course-desc">{c.tagline}</span> : null}
                                </Link>
                              </li>
                            ))}
                        </ul>
                      </div>

                      {/* Column 2: Data Science & AI */}
                      <div className="dropdown-col">
                        <div className="dropdown-col-header header-datascience">
                          <span className="dropdown-col-icon-wrap">
                            <Sparkles width={14} height={14} />
                          </span>
                          <span>Data Science & AI</span>
                        </div>
                        <ul className="dropdown-list">
                          {courses
                            .filter((c) =>
                              ["data-science", "python", "generative-ai"].includes(c.slug)
                            )
                            .sort((a, b) => {
                              const order = ["data-science", "python", "generative-ai"];
                              return order.indexOf(a.slug) - order.indexOf(b.slug);
                            })
                            .map((c) => (
                              <li key={c.slug}>
                                <Link
                                  href={`/${c.slug}-course/`}
                                  className="dropdown-course-item"
                                  onClick={() => setIsDropdownOpen(false)}
                                >
                                  <strong className="dropdown-course-title">{c.title}</strong>
                                  {c.tagline ? <span className="dropdown-course-desc">{c.tagline}</span> : null}
                                </Link>
                              </li>
                            ))}
                        </ul>
                      </div>

                      {/* Column 3: Enterprise & Core */}
                      <div className="dropdown-col">
                        <div className="dropdown-col-header header-enterprise">
                          <span className="dropdown-col-icon-wrap">
                            <BriefcaseBusiness width={14} height={14} />
                          </span>
                          <span>Enterprise & Core</span>
                        </div>
                        <ul className="dropdown-list">
                          {courses
                            .filter((c) =>
                              ["sql", "sap", "software-testing"].includes(c.slug)
                            )
                            .map((c) => (
                              <li key={c.slug}>
                                <Link
                                  href={`/${c.slug}-course/`}
                                  className="dropdown-course-item"
                                  onClick={() => setIsDropdownOpen(false)}
                                >
                                  <strong className="dropdown-course-title">{c.title}</strong>
                                  {c.tagline ? <span className="dropdown-course-desc">{c.tagline}</span> : null}
                                </Link>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="dropdown-footer">
                      <div>
                        <span>Want help deciding which course fits your background?</span>
                      </div>
                      <Link
                        href="/courses/"
                        className="dropdown-all-link"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Browse All 10 Courses <ArrowRight width={14} height={14} />
                      </Link>
                    </div>
                  </div>

                  {/* Mobile Accordion View */}
                  <div className="mobile-courses-accordion">
                    <button
                      type="button"
                      className="mobile-accordion-toggle"
                      onClick={() => setIsMobileCoursesExpanded(!isMobileCoursesExpanded)}
                      aria-expanded={isMobileCoursesExpanded}
                    >
                      <span>Explore Course Tracks</span>
                      <ChevronDown
                        width={14}
                        height={14}
                        className={cn(
                          "transition-transform",
                          isMobileCoursesExpanded && "rotate-180"
                        )}
                      />
                    </button>
                    {isMobileCoursesExpanded && (
                      <div className="mobile-course-sublinks">
                        {courses.map((c) => (
                          <Link
                            key={c.slug}
                            href={`/${c.slug}-course/`}
                            className="mobile-course-item"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <span>{c.title}</span>
                          </Link>
                        ))}
                        <Link
                          href="/courses/"
                          className="mobile-all-courses-link"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          View All Courses &rarr;
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              );
            }

            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn("nav-link-item", active && "active")}
                aria-current={active ? "page" : undefined}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}

          {/* Mobile Admin Login link */}
          <div className="mobile-nav-cta md:hidden pt-4 mt-3 border-t border-white/10 flex flex-col gap-2.5">
            <Link
              href="/admin"
              className="header-login-btn justify-center w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              <User width={15} height={15} />
              <span>Admin Login</span>
            </Link>
          </div>
        </nav>

        {/* Header Action Buttons */}
        <div className="nav-actions">
          <a
            href={site.phone.href}
            className="contact-pending transition-colors hover:text-white"
            title="Call Talentele"
          >
            <Phone width={15} height={15} />
            <span>{site.phone.display}</span>
          </a>

          {/* Login Button */}
          <Link
            href="/admin"
            className="header-login-btn"
            title="Admin Portal Login"
          >
            <User width={15} height={15} />
            <span>Login</span>
          </Link>

          <Link className="btn-primary btn-sm" href="/contact-us/">
            Enquire Now <ArrowRight width={16} height={16} />
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="menu-button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <Close width={24} height={24} /> : <Menu width={24} height={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
