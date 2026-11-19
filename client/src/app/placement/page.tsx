import { AtsResumeSection } from "@/components/placements/AtsResumeSection";
import { CareerPillars } from "@/components/placements/CareerPillars";
import { HiringEcosystem } from "@/components/placements/HiringEcosystem";
import { PlacementCharter } from "@/components/placements/PlacementCharter";
import { PlacementFAQ } from "@/components/placements/PlacementFAQ";
import { PlacementHero } from "@/components/placements/PlacementHero";
import { PlacementProcess } from "@/components/placements/PlacementProcess";
import { StudentSuccessStories } from "@/components/placements/StudentSuccessStories";
import { CtaBand } from "@/components/common/CtaBand";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Placement Assistance & Career Support — Talentele Bhubaneswar",
  description:
    "How Talentele supports your job search: real-time portfolio projects, ATS resume crafting, soft-skills development, and rigorous HR & technical mock interviews.",
  path: "/placement/",
});

export default function PlacementsPage() {
  return (
    <main>
      {/* 1. Placement Hero */}
      <PlacementHero />

      {/* 2. Assistance, Not a Guarantee (Ethical Charter) */}
      <PlacementCharter />

      {/* 3. Student Placement Process (5-Step Roadmap) */}
      <PlacementProcess />

      {/* 4. Core Pillars: Resume, Mocks, Soft Skills, Projects */}
      <CareerPillars />

      {/* 5. Resume & ATS Preparation In-Depth */}
      <AtsResumeSection />

      {/* 6. Hiring Ecosystem & Industry Sectors */}
      <HiringEcosystem />

      {/* 7. Student Outcomes & Reporting Integrity */}
      <StudentSuccessStories />

      {/* 8. Placement FAQs */}
      <PlacementFAQ />

      {/* 9. Final Call to Action */}
      <CtaBand />
    </main>
  );
}
