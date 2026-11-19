import { PageHero } from "@/components/common/PageHero";

export function ContactHero() {
  return (
    <PageHero
      eyebrow="ADMISSIONS & COUNSELLING"
      title="Let's find the right course for your career."
      intro="Share your background and learning goals. Our academic team in Nayapalli, Bhubaneswar will connect with you to share detailed syllabus breakdowns, batch dates, fees, and career support options."
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Contact Us", path: "/contact-us/" },
      ]}
    />
  );
}

export default ContactHero;

