import type { Metadata } from "next";

import { site } from "@/data/site";

type PageSeo = {
  title: string;
  description: string;
  /** Path with trailing slash, e.g. "/courses/". */
  path: string;
  type?: "website" | "article";
  noIndex?: boolean;
  /** Use the title as-is, without the "| Talentele" template. */
  absoluteTitle?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
};

export function absoluteUrl(path: string): string {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildMetadata({
  title,
  description,
  path,
  type = "website",
  noIndex = false,
  absoluteTitle = false,
  publishedTime,
  modifiedTime,
}: PageSeo): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    robots: noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      type,
      url: path,
      siteName: site.name,
      title: fullTitle,
      description,
      locale: "en_IN",
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "@id": `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: `${site.url}/`,
    logo: absoluteUrl("/brand/talentele-logo.png"),
    image: absoluteUrl("/brand/talentele-logo.png"),
    description: site.description,
    email: site.email,
    telephone: site.phone.e164,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.line1}, ${site.address.line2}, ${site.address.locality}`,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "20.3015",
      longitude: "85.8235",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    areaServed: [
      { "@type": "City", "name": "Bhubaneswar" },
      { "@type": "City", "name": "Cuttack" },
      { "@type": "AdministrativeArea", "name": "Odisha" },
      { "@type": "Country", "name": "India" },
    ],
    sameAs: site.social.map((s) => s.href),
  };
}
