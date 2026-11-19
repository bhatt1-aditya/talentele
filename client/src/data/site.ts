/**
 * Business facts used across the site.
 * Source: the public talentele.in homepage (reviewed October 2026).
 * Anything not listed here has not been verified and should not be published.
 */
export const site = {
  name: "Talentele",
  legalName: "Talentele", // Registered legal entity name not confirmed.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://talentele.in").replace(/\/$/, ""),
  tagline: "Practical, affordable, real-time learning for data and technology careers.",
  description:
    "Talentele is a Bhubaneswar training institute for data analytics, data science, business analytics, Power BI, Python, SQL, Excel, SAP, software testing and generative AI, focused on practical, project-based learning.",
  mission:
    "Talentele is not just an institute — it's a movement by a dynamic team for practical, affordable and real-time learning.",
  phone: {
    display: "+91 72056 17787",
    href: "tel:+917205617787",
    e164: "+917205617787",
  },
  email: "info@talentele.in",
  address: {
    line1: "2nd Floor, Plot No. N5/44",
    line2: "Opp. Reserve Bank Officers' Quarters, Indradhanu Market",
    locality: "IRC Village, Nayapalli",
    city: "Bhubaneswar",
    region: "Odisha",
    postalCode: "751015",
    country: "IN",
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Talentele%2C+Indradhanu+Market%2C+Nayapalli%2C+Bhubaneswar+751015",
  social: [
    { label: "Instagram", href: "https://www.instagram.com/talentelelearning/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/talentele-learning/" },
    { label: "YouTube", href: "https://www.youtube.com/channel/UCmTnM9j6HaczC-WLN_TalWQ" },
    { label: "Facebook", href: "https://www.facebook.com/talentele.in/" },
  ],
} as const;

export const addressLines = [
  site.address.line1,
  site.address.line2,
  site.address.locality,
  `${site.address.city}, ${site.address.region} ${site.address.postalCode}`,
];

/** Learning features listed on Talentele's own website. */
export const learningFeatures = [
  {
    title: "Experienced faculty",
    body: "Trainers with 15+ years of industry and teaching experience lead the core programmes.",
  },
  {
    title: "Industry-oriented curriculum",
    body: "Topics are chosen around the tools and tasks used in analytics and technology roles.",
  },
  {
    title: "Live and recorded classes",
    body: "Attend live sessions and revisit recordings when you need to revise a concept.",
  },
  {
    title: "Project portfolio",
    body: "Work through a diversified set of projects that you can discuss in interviews.",
  },
  {
    title: "1-on-1 doubt clearing",
    body: "Bring specific questions to individual doubt-clearing sessions with faculty.",
  },
  {
    title: "Mock interviews",
    body: "Practise with HR and technical mock interviews before you face real ones.",
  },
  {
    title: "Soft skills and communication",
    body: "Build the communication habits that help you explain your work clearly.",
  },
  {
    title: "Resume and ATS support",
    body: "Get help crafting a resume that is readable by people and applicant tracking systems.",
  },
] as const;

export const navigation = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us/" },
  { label: "Courses", href: "/courses/" },
  { label: "Placements", href: "/placement/" },
  { label: "Career Blog", href: "/blog/" },
  { label: "Gallery", href: "/gallery/" },
  { label: "Contact Us", href: "/contact-us/" },
] as const;
