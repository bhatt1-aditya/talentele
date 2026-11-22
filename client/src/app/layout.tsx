import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/data/site";
import { organizationJsonLd } from "@/lib/seo";

import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Talentele — Data Analytics, Data Science & IT Training in Bhubaneswar",
    template: "%s | Talentele",
  },
  description: site.description,
  applicationName: site.name,
  icons: {
    icon: [{ url: "/brand/talentele-icon-square.png", type: "image/png" }],
    apple: [{ url: "/brand/talentele-icon-square.png" }],
  },
  openGraph: { siteName: site.name, locale: "en_IN", type: "website" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${inter.variable} ${inter.className} antialiased [--header-height:4.5rem]`}
    >
      <body className="flex min-h-screen flex-col font-sans">
        <a
          href="#main"
          className="sr-only z-[60] rounded-[var(--radius-md)] bg-ink px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}
