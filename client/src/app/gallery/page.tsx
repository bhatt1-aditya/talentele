import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { GalleryHero } from "@/components/gallery/GalleryHero";
import { CtaBand } from "@/components/common/CtaBand";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Gallery — Life at Talentele",
  description:
    "The Talentele gallery of classroom sessions, events and student work in Bhubaneswar. We publish only genuine photographs of Talentele activities.",
  path: "/gallery/",
});

export default function GalleryPage() {
  return (
    <main>
      {/* 1. Gallery Hero */}
      <GalleryHero />

      {/* 2. Gallery Grid & Curated State */}
      <GalleryGrid />

      {/* 3. Final Call to Action */}
      <CtaBand />
    </main>
  );
}
