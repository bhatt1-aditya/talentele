/**
 * Faculty and Industry Mentors at Talentele, Bhubaneswar.
 * Verified from official Talentele publications and instructor profiles.
 */
export type FacultyMember = {
  name: string;
  role: string;
  experience: string;
  specialty: string;
  companies?: string[];
  bio?: string;
  coursesTaught?: string[];
};

export const faculty: FacultyMember[] = [
  {
    name: "Gouri Shankar Jena",
    role: "Lead Faculty In-Charge",
    experience: "18+ years",
    specialty: "Data Analytics & Enterprise Solutions",
    companies: ["UBS", "Capgemini", "TCS", "Accenture"],
    bio: "Senior technology leader with nearly two decades of enterprise engineering and analytics experience. Directs practical data architectures, SQL mastery, and end-to-end data warehousing.",
    coursesTaught: ["Data Analytics", "SQL for Analytics", "Enterprise QA"],
  },
  {
    name: "Prashant Gautam",
    role: "Faculty In-Charge, Business Analytics",
    experience: "15+ years",
    specialty: "Business Analytics & Financial Modeling",
    companies: ["Accenture", "HSBC", "Citibank", "UBS", "ICICI"],
    bio: "Seasoned analytics practitioner with 15+ years across global investment banks and consulting firms. Mentors students in business metric frameworks, statistical reporting, and executive KPI intelligence.",
    coursesTaught: ["Business Analytics", "Advanced Excel", "Data Analytics"],
  },
  {
    name: "Prathyush Panigrahy",
    role: "Faculty In-Charge, Power BI & Tableau",
    experience: "7+ years",
    specialty: "Power BI, Tableau & Data Visualization",
    companies: ["Walmart", "Oracle"],
    bio: "Business intelligence specialist focused on end-to-end dashboard automation, DAX modeling, data pipelines, and storytelling for multinational retail and cloud enterprises.",
    coursesTaught: ["Power BI Masterclass", "Data Analytics", "Business Analytics"],
  },
  {
    name: "Jiten Kumar Sahoo",
    role: "Faculty In-Charge, Python & Programming",
    experience: "7+ years",
    specialty: "Python, Automation & Data Structures",
    bio: "Programming mentor specializing in Python for data analysis, automated data workflows, NumPy, Pandas, and backend data manipulation.",
    coursesTaught: ["Python Programming", "Data Science", "Data Analytics"],
  },
  {
    name: "Avijith Swain",
    role: "Data Science Trainer",
    experience: "4+ years",
    specialty: "Machine Learning & Predictive Modeling",
    bio: "Applied data science instructor guiding learners through supervised & unsupervised learning, model evaluation, exploratory data analysis, and AI workflows.",
    coursesTaught: ["Data Science", "Python Programming", "Generative AI"],
  },
];
