import { Section, SectionHeading } from "@/components/common/Section";
import { PlacementGallery } from "./PlacementGallery";

export function StudentSuccessStories() {
  return (
    <Section labelledBy="outcomes-title">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between">
        <SectionHeading
          id="outcomes-title"
          eyebrow="STUDENT SUCCESS GALLERY"
          title="Verified Alumni Placements"
          intro="Explore genuine career transitions from Talentele graduates who built practical portfolios and successfully entered enterprise technology teams."
        />
      </div>

      {/* 6-Card Interactive Rectangular Portrait Placement Gallery */}
      <PlacementGallery />
    </Section>
  );
}

export default StudentSuccessStories;
