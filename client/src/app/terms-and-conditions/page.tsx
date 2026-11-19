import Link from "next/link";

import { LegalPage, type LegalSection } from "@/components/common/LegalPage";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms and Conditions",
  description:
    "Terms for using the Talentele website, including course information, enquiries, intellectual property and limitations.",
  path: "/terms-and-conditions/",
});

const sections: LegalSection[] = [
  {
    id: "about-these-terms",
    title: "About these terms",
    body: (
      <p>
        These terms apply to your use of the {site.name} website at {site.url.replace(/^https?:\/\//, "")}. By using the
        website, you agree to them. If you enrol in a course, separate enrolment terms provided by {site.name} — covering
        matters such as fees, payments and refunds — will also apply.
      </p>
    ),
  },
  {
    id: "using-the-website",
    title: "Using the website",
    body: (
      <>
        <p>You agree to use this website lawfully and not to:</p>
        <ul>
          <li>submit false, misleading or someone else&apos;s information through our forms;</li>
          <li>send spam or automated submissions;</li>
          <li>attempt to disrupt, damage or gain unauthorised access to the website or its systems; or</li>
          <li>copy or scrape the website&apos;s content for commercial use without permission.</li>
        </ul>
      </>
    ),
  },
  {
    id: "course-information",
    title: "Course information",
    body: (
      <>
        <p>
          Course descriptions on this website explain the subjects, topic areas and learning approach of each course. They
          are provided for general information. Detailed syllabi, durations, schedules, formats, fees and certification can
          change between batches and are confirmed by the {site.name} team before you enrol.
        </p>
        <p>
          Example exercises and projects described on the website are illustrative and may differ from those used in a
          particular batch.
        </p>
      </>
    ),
  },
  {
    id: "placement-assistance",
    title: "Placement assistance",
    body: (
      <p>
        {site.name} offers placement assistance, such as resume support, soft-skills training and mock interviews. Placement
        assistance is not a guarantee of employment, interviews, salary or any particular career outcome.
      </p>
    ),
  },
  {
    id: "enquiries",
    title: "Enquiries",
    body: (
      <p>
        Submitting an enquiry does not create an enrolment or any obligation for you or for {site.name}. We use the
        information you provide as described in our <Link href="/privacy-policy/">privacy policy</Link>.
      </p>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    body: (
      <>
        <p>
          The {site.name} name and logo, and the text and design of this website, belong to {site.name} or are used with
          permission. You may view and share links to the website for personal, non-commercial purposes. Any other use
          requires our written permission.
        </p>
        <p>
          Some photographs on this website are licensed stock images used for illustration. They do not depict {site.name}{" "}
          students, staff or events unless stated otherwise.
        </p>
      </>
    ),
  },
  {
    id: "accuracy",
    title: "Accuracy and availability",
    body: (
      <p>
        We try to keep the website accurate and up to date, but we cannot guarantee that all information is complete or
        current at all times, or that the website will always be available or free of errors. Please confirm important
        details with us directly.
      </p>
    ),
  },
  {
    id: "external-links",
    title: "Links to other websites",
    body: (
      <p>
        The website links to third-party websites and services. We are not responsible for their content, availability or
        privacy practices.
      </p>
    ),
  },
  {
    id: "limitation",
    title: "Limitation of liability",
    body: (
      <p>
        To the extent permitted by law, {site.name} is not liable for any loss arising from your use of, or reliance on,
        information on this website. Nothing in these terms limits any rights you have under applicable consumer law.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: <p>We may update these terms from time to time. The date at the top shows the latest version.</p>,
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <p>
        Questions about these terms can be sent to <a href={`mailto:${site.email}`}>{site.email}</a> or by calling{" "}
        <a href={site.phone.href}>{site.phone.display}</a>.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms and conditions"
      intro="The terms that apply when you use the Talentele website."
      path="/terms-and-conditions/"
      lastUpdated="14 October 2026"
      reviewNote="These terms cover use of this website only. Talentele should review them and add its registered legal entity details and governing-law clause before relying on them, and should publish separate enrolment, fee and refund terms. This text is not legal advice."
      sections={sections}
    />
  );
}
