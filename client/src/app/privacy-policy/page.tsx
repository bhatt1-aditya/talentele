import Link from "next/link";

import { LegalPage, type LegalSection } from "@/components/common/LegalPage";
import { site } from "@/data/site";
import { ENQUIRY_COOKIE } from "@/lib/enquiry-cookie";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How the Talentele website collects and uses personal information, including enquiry form data, cookies and your choices.",
  path: "/privacy-policy/",
});

const email = (
  <a href={`mailto:${site.email}`}>{site.email}</a>
);

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <p>
        This website is operated by {site.name}, a training institute located at {site.address.line1},{" "}
        {site.address.line2}, {site.address.locality}, {site.address.city}, {site.address.region}{" "}
        {site.address.postalCode}, India. In this policy, “we”, “us” and “our” refer to {site.name}. You can contact us
        about privacy at {email}.
      </p>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    body: (
      <>
        <p>
          <strong>Information you give us.</strong> When you submit the enquiry form on our{" "}
          <Link href="/contact-us/">contact page</Link>, we collect:
        </p>
        <ul>
          <li>your full name;</li>
          <li>your email address;</li>
          <li>your mobile number;</li>
          <li>the course you are interested in;</li>
          <li>any message you choose to include; and</li>
          <li>your confirmation that we may contact you about your enquiry.</li>
        </ul>
        <p>
          If you call or email us directly, we receive the information you share in that conversation.
        </p>
        <p>
          <strong>Technical information.</strong> Like most websites, the servers that host this site may automatically
          record standard technical details such as your IP address, browser type, the pages requested and the time of the
          request. These logs are used to operate and secure the website.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-information",
    title: "How we use your information",
    body: (
      <>
        <p>We use enquiry information to:</p>
        <ul>
          <li>respond to your enquiry and provide course guidance;</li>
          <li>share information about courses, batches, fees and formats you asked about; and</li>
          <li>keep a record of our communication with you.</li>
        </ul>
        <p>
          We do not sell your personal information. We do not use enquiry details for unrelated marketing without your
          permission.
        </p>
      </>
    ),
  },
  {
    id: "how-enquiries-are-delivered",
    title: "How enquiries are delivered",
    body: (
      <p>
        This website does not store enquiries in its own database. When you submit the form, your details are sent
        securely to the Talentele team through an email-delivery or business-system service configured by Talentele. That
        service processes the information only to deliver it to us.
      </p>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and analytics",
    body: (
      <>
        <p>
          This website uses one functional cookie, <code>{ENQUIRY_COOKIE}</code>. It is set only after an enquiry has been
          sent successfully, so that the thank-you page can confirm your submission. It contains the course you selected
          and expires after 10 minutes.
        </p>
        <p>
          The website does not currently use analytics, advertising or social-media tracking cookies. Fonts and images are
          served from this website rather than loaded from third-party services. If this changes, we will update this
          policy.
        </p>
      </>
    ),
  },
  {
    id: "third-party-links",
    title: "Links to other websites",
    body: (
      <p>
        Our website links to services such as Instagram, LinkedIn, YouTube, Facebook and Google Maps. When you follow
        these links, the other service&apos;s own privacy policy applies.
      </p>
    ),
  },
  {
    id: "retention",
    title: "How long we keep information",
    body: (
      <p>
        We keep enquiry information only for as long as it is needed to respond to you and to maintain reasonable records
        of our communication, after which it is deleted. You can ask us to delete your information at any time.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your choices and rights",
    body: (
      <>
        <p>
          Depending on the law that applies to you — including India&apos;s Digital Personal Data Protection Act, 2023,
          once in force — you may have the right to:
        </p>
        <ul>
          <li>ask what personal information we hold about you;</li>
          <li>ask us to correct or update it;</li>
          <li>ask us to delete it; and</li>
          <li>withdraw your consent to being contacted.</li>
        </ul>
        <p>To make a request, email {email}. We may need to confirm your identity before acting on it.</p>
      </>
    ),
  },
  {
    id: "security",
    title: "Security",
    body: (
      <p>
        The website is served over an encrypted connection, and enquiry delivery credentials are kept on the server, not in
        your browser. No method of transmission or storage is completely secure, but we take reasonable steps to protect
        your information.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: <p>We may update this policy as the website or our practices change. The date at the top shows the latest version.</p>,
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <p>
        For privacy questions or requests, email {email} or call{" "}
        <a href={site.phone.href}>{site.phone.display}</a>.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      intro="How this website collects, uses and protects your personal information."
      path="/privacy-policy/"
      lastUpdated="14 October 2026"
      reviewNote="This policy describes how this website is built to handle data. Talentele should review it — including its registered legal entity name, its data-retention period and the delivery service it uses for enquiries — before relying on it. It is not legal advice."
      sections={sections}
    />
  );
}
