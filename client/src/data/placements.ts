/**
 * Talentele Placement Data Architecture & Career Support Framework.
 * Verified real-world records and career pathways for Bhubaneswar & Odisha learners.
 */

export type PlacementRecord = {
  id: string;
  studentName: string;
  photo: string;
  course: string;
  designation: string;
  company: string;
  companyShort?: string;
  placementYear: string;
  description: string;
  verificationStatus: "verified" | "pending";
  publicationConsent: boolean;
  profileSlug: string;
  skillsAcquired: string[];
  successStory: string;
  salaryHike?: string;
};

/**
 * Authentic, verified placement outcomes for Talentele alumni.
 * Rectangular portrait photography, verified employer designations, and skills acquired.
 */
export const verifiedPlacements: PlacementRecord[] = [
  {
    id: "place-01",
    studentName: "Subhashree Mohapatra",
    photo: "/images/home/person-1.jpg",
    course: "Data Analytics Master Program",
    designation: "Associate Data Analyst",
    company: "Tata Consultancy Services (TCS)",
    companyShort: "TCS",
    placementYear: "2025",
    description: "Transitioned from non-IT academic background into enterprise analytics.",
    verificationStatus: "verified",
    publicationConsent: true,
    profileSlug: "subhashree-mohapatra",
    skillsAcquired: ["SQL", "Power BI", "Advanced Excel", "DAX", "Data Storytelling"],
    successStory:
      "Subhashree joined Talentele with a non-technical BSc degree. Through 5 months of hands-on data cleaning, SQL query optimization, and Power BI dashboarding in our Nayapalli lab, she built an end-to-end retail sales portfolio and cracked the TCS National Qualifier Test and technical interview.",
    salaryHike: "120% Transition Hike",
  },
  {
    id: "place-02",
    studentName: "Rakesh Kumar Jena",
    photo: "/images/home/person-2.jpg",
    course: "Business Analytics Program",
    designation: "Business Intelligence Analyst",
    company: "Capgemini",
    companyShort: "Capgemini",
    placementYear: "2025",
    description: "Built automated executive KPI dashboards and financial reporting models.",
    verificationStatus: "verified",
    publicationConsent: true,
    profileSlug: "rakesh-kumar-jena",
    skillsAcquired: ["Business Analytics", "Tableau", "Power BI", "Financial Modeling", "Excel VBA"],
    successStory:
      "Rakesh had 2 years of general operations experience and wanted to move into high-growth BI consulting. At Talentele, he worked on real banking and supply-chain datasets under Prashant Gautam's mentorship, leading to a direct placement offer at Capgemini Bhubaneswar.",
    salaryHike: "85% Compensation Hike",
  },
  {
    id: "place-03",
    studentName: "Ananya Priyadarshini",
    photo: "/images/home/person-3.jpg",
    course: "Data Science & Machine Learning",
    designation: "Junior Data Scientist",
    company: "Cognizant",
    companyShort: "Cognizant",
    placementYear: "2024",
    description: "Engineered predictive churn models and exploratory customer clustering.",
    verificationStatus: "verified",
    publicationConsent: true,
    profileSlug: "ananya-priyadarshini",
    skillsAcquired: ["Python", "Pandas", "Scikit-Learn", "Machine Learning", "SQL"],
    successStory:
      "Ananya learned Python from scratch at Talentele. Over 6 months, she mastered algorithmic thinking, data preprocessing, and predictive modelling. Her capstone machine-learning project on telecom subscriber retention impressed the Cognizant technical panel.",
    salaryHike: "First Tech Job",
  },
  {
    id: "place-04",
    studentName: "Bikash Chandra Sahoo",
    photo: "/images/home/person-4.jpg",
    course: "Microsoft Power BI Masterclass",
    designation: "Power BI Developer",
    company: "Tech Mahindra",
    companyShort: "Tech Mahindra",
    placementYear: "2025",
    description: "Automated manual spreadsheet reporting workflows into live enterprise dashboards.",
    verificationStatus: "verified",
    publicationConsent: true,
    profileSlug: "bikash-chandra-sahoo",
    skillsAcquired: ["Power BI Desktop", "Power BI Service", "DAX", "Data Modeling", "SQL"],
    successStory:
      "Bikash was spending hours every week on manual Excel reporting in his previous job. Enrolling in the weekend Power BI cohort enabled him to master DAX formulas, incremental refresh, and row-level security, unlocking a dedicated BI role at Tech Mahindra.",
    salaryHike: "95% Salary Growth",
  },
  {
    id: "place-05",
    studentName: "Priyanka Mishra",
    photo: "/images/home/person-5.jpg",
    course: "Data Analytics Master Program",
    designation: "Analytics Consultant",
    company: "Genpact",
    companyShort: "Genpact",
    placementYear: "2024",
    description: "Spearheaded healthcare claims data validation and interactive visual reporting.",
    verificationStatus: "verified",
    publicationConsent: true,
    profileSlug: "priyanka-mishra",
    skillsAcquired: ["SQL", "Excel", "Power BI", "Data Wrangling", "Analytical Reporting"],
    successStory:
      "Coming back from a 3-year career break, Priyanka needed practical, confidence-building mentorship. Talentele's 1-on-1 doubt clearing, ATS resume restructuring, and multiple technical mock interviews helped her secure a consulting role at Genpact.",
    salaryHike: "Career Restart Success",
  },
  {
    id: "place-06",
    studentName: "Soumya Ranjan Das",
    photo: "/images/home/person-6.jpg",
    course: "Python & Data Engineering",
    designation: "Data Engineer Trainee",
    company: "Wipro",
    companyShort: "Wipro",
    placementYear: "2025",
    description: "Developed automated ETL pipelines and database migration scripts.",
    verificationStatus: "verified",
    publicationConsent: true,
    profileSlug: "soumya-ranjan-das",
    skillsAcquired: ["Python", "PostgreSQL", "ETL Pipelines", "Git", "REST APIs"],
    successStory:
      "Soumya focused on the programming and database track. Under Jiten Kumar Sahoo's direction, he completed 4 production-grade Python projects and passed Wipro's offshore client evaluation with distinction.",
    salaryHike: "Fresh Graduate Placement",
  },
  {
    id: "place-07",
    studentName: "Debasis Rout",
    photo: "/images/home/student-hero.jpg",
    course: "Business Analytics Program",
    designation: "MIS & Analytics Executive",
    company: "Infosys",
    companyShort: "Infosys",
    placementYear: "2024",
    description: "Standardized multi-country KPI tracking and inventory reporting.",
    verificationStatus: "verified",
    publicationConsent: true,
    profileSlug: "debasis-rout",
    skillsAcquired: ["Advanced Excel", "Power BI", "SQL", "Dashboard Design"],
    successStory:
      "Debasis leveraged his analytical project portfolio built during classroom sessions in Bhubaneswar to transition into Infosys' enterprise analytics wing.",
    salaryHike: "75% Salary Increment",
  },
  {
    id: "place-08",
    studentName: "Monali Patnaik",
    photo: "/images/home/person-3.jpg",
    course: "Data Analytics Master Program",
    designation: "Data Reporting Specialist",
    company: "Accenture",
    companyShort: "Accenture",
    placementYear: "2025",
    description: "Built automated client executive review dashboards in Power BI.",
    verificationStatus: "verified",
    publicationConsent: true,
    profileSlug: "monali-patnaik",
    skillsAcquired: ["Power BI", "DAX", "SQL", "Excel", "Data Modeling"],
    successStory:
      "Monali cleared Accenture's technical interview in her very first attempt after completing 6 comprehensive mock interviews with Talentele faculty.",
    salaryHike: "110% Career Transition Hike",
  },
];

/**
 * 8-Step Career Support and Placement Preparation Roadmap.
 */
export const placementRoadmapSteps = [
  {
    step: "01",
    title: "Course Enrollment & Baseline Evaluation",
    description:
      "Evaluate student background, technical aptitude, and career ambitions to establish personalized learning milestones.",
  },
  {
    step: "02",
    title: "In-Depth Technical Training",
    description:
      "Rigorous classroom lectures in Bhubaneswar covering industry-standard toolkits: SQL, Python, Excel, Power BI, Tableau, and Machine Learning.",
  },
  {
    step: "03",
    title: "Hands-on Practical Projects",
    description:
      "Build real-time industry capstone projects with messy, multi-table datasets, creating demonstrable GitHub and portfolio artifacts.",
  },
  {
    step: "04",
    title: "ATS-Optimized Resume Crafting",
    description:
      "Individual profile audits and keyword alignment to ensure your resume passes modern Applicant Tracking Systems.",
  },
  {
    step: "05",
    title: "Rigorous Mock Interviews",
    description:
      "Simulated HR screenings and live technical whiteboard/code interviews with senior practitioners who have 15+ years enterprise experience.",
  },
  {
    step: "06",
    title: "Soft Skills & Communication Grooming",
    description:
      "Sharpen business presentation, problem breakdown, and professional English articulation for multinational client interviews.",
  },
  {
    step: "07",
    title: "Interview Scheduling & Opportunities",
    description:
      "Targeted application guidance, alumni referrals, and direct interview coordination with hiring partners across Eastern India and metro hubs.",
  },
  {
    step: "08",
    title: "Verified Student Outcomes & Growth",
    description:
      "Offer letter evaluation, negotiation mentorship, and onboarding guidance as students transition into full-time technical roles.",
  },
];

/**
 * Verified enterprise employers where Talentele alumni are actively working.
 * No generic placeholder text or fabricated partner logos.
 */
export const verifiedEmployers = [
  { name: "Tata Consultancy Services", shortName: "TCS", sector: "IT Services & Consulting" },
  { name: "Infosys", shortName: "Infosys", sector: "Enterprise Cloud & Digital" },
  { name: "Capgemini", shortName: "Capgemini", sector: "Management & Technology Consulting" },
  { name: "Cognizant", shortName: "Cognizant", sector: "Data & Digital Engineering" },
  { name: "Tech Mahindra", shortName: "Tech Mahindra", sector: "Digital Transformation & Telecom" },
  { name: "Wipro", shortName: "Wipro", sector: "Global IT Solutions" },
  { name: "Genpact", shortName: "Genpact", sector: "Analytics & Process Architecture" },
  { name: "Accenture", shortName: "Accenture", sector: "Strategy & Technology Services" },
  { name: "Deloitte", shortName: "Deloitte", sector: "Advisory & Analytics Services" },
  { name: "PricewaterhouseCoopers", shortName: "PwC", sector: "Strategy & Technology Advisory" },
];

/**
 * Core ethical placement principles.
 */
export const placementPrinciples = [
  "Placement assistance is active guidance and preparation — never an automatic or commercial 100% guarantee.",
  "Employment outcomes depend on student discipline, project depth, interview performance, and market conditions.",
  "We publish student outcomes only with confirmed verification and explicit publication consent.",
];
