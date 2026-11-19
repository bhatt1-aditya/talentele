import { ArrowRight } from "@/components/common/Icons";
import { PageHero } from "@/components/common/PageHero";
import { QuickEnquiryCard } from "@/components/common/QuickEnquiryCard";
import { courses } from "@/data/courses";

export function CourseHero() {
  return (
    <PageHero
      eyebrow="COURSE CATALOGUE"
      title="Courses engineered for the skills employers demand."
      intro={`${courses.length} specialized career programs across analytics, data science, programming, enterprise ERP, and software testing. Each combines live interactive classes with hands-on projects and career preparation.`}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Courses", path: "/courses/" },
      ]}
      rightElement={<QuickEnquiryCard />}
      actions={
        <a href="#enquire" className="btn-primary">
          Help Me Choose a Course
          <ArrowRight width={16} height={16} />
        </a>
      }
    />
  );
}

export default CourseHero;

