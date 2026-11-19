import { ArrowRight, Phone } from "@/components/common/Icons";
import { PageHero } from "@/components/common/PageHero";
import { QuickEnquiryCard } from "@/components/common/QuickEnquiryCard";
import { site } from "@/data/site";

export function PlacementHero() {
  return (
    <PageHero
      eyebrow="CAREER & PLACEMENT SUPPORT"
      title="Career support that prepares you to compete."
      intro="Talentele provides comprehensive placement assistance alongside every course — helping you build verified proof of your capabilities, pass ATS screens, and speak with confidence in hiring interviews."
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Placements", path: "/placement/" },
      ]}
      rightElement={<QuickEnquiryCard badgeText="PLACEMENT ASSISTANCE" />}
      actions={
        <>
          <a href="#enquire" className="btn-primary">
            Request Placement Call <ArrowRight width={16} height={16} />
          </a>
          <a
            href={site.phone.href}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            <Phone width={16} height={16} className="text-red-400" />
            Call {site.phone.display}
          </a>
        </>
      }
    />
  );
}

export default PlacementHero;

