"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.INITIAL_PLACEMENTS = exports.INITIAL_COURSES = exports.INITIAL_COHORTS = exports.INITIAL_LEADS = exports.JsonStore = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const env_js_1 = require("../config/env.js");
// Ensure storage directory exists
const storageDir = path_1.default.resolve(process.cwd(), env_js_1.config.storageDir);
if (!fs_1.default.existsSync(storageDir)) {
    fs_1.default.mkdirSync(storageDir, { recursive: true });
}
class JsonStore {
    filePath;
    defaultData;
    constructor(filename, defaultData = []) {
        this.filePath = path_1.default.join(storageDir, filename);
        this.defaultData = defaultData;
        this.init();
    }
    init() {
        if (!fs_1.default.existsSync(this.filePath)) {
            this.write(this.defaultData);
        }
    }
    read() {
        try {
            if (!fs_1.default.existsSync(this.filePath)) {
                return this.defaultData;
            }
            const raw = fs_1.default.readFileSync(this.filePath, "utf-8");
            return JSON.parse(raw);
        }
        catch (err) {
            console.error(`Error reading data from ${this.filePath}:`, err);
            return this.defaultData;
        }
    }
    write(data) {
        try {
            const tempPath = `${this.filePath}.tmp`;
            fs_1.default.writeFileSync(tempPath, JSON.stringify(data, null, 2), "utf-8");
            fs_1.default.renameSync(tempPath, this.filePath);
            return true;
        }
        catch (err) {
            console.error(`Error writing data to ${this.filePath}:`, err);
            return false;
        }
    }
}
exports.JsonStore = JsonStore;
// -----------------------------------------------------------------------------
// Initial Seeds for out-of-the-box readiness
// -----------------------------------------------------------------------------
exports.INITIAL_LEADS = [
    {
        id: "lead-101",
        name: "Ashutosh Pradhan",
        phone: "+91 94370 12849",
        email: "ashutosh.pradhan@gmail.com",
        course: "data-analytics",
        courseLabel: "Data Analytics Master Program",
        source: "Hero Enquiry Form",
        status: "new",
        submittedAt: "2026-11-22T09:15:00Z",
        message: "Interested in the weekend batch for SQL and Power BI. Working professional.",
        counsellorNotes: "Spoke on phone, scheduled campus visit for Saturday at 11:30 AM.",
    },
    {
        id: "lead-102",
        name: "Priyadarshini Rout",
        phone: "+91 89172 38472",
        email: "priya.rout99@yahoo.com",
        course: "sap",
        courseLabel: "SAP ERP - FICO, MM, ABAP, SD",
        source: "SAP Course Page",
        status: "contacted",
        submittedAt: "2026-11-21T14:30:00Z",
        message: "Looking for SAP FICO module with certification and placement guidance.",
        counsellorNotes: "Sent FICO module syllabus via WhatsApp. Requested fee structure.",
    },
    {
        id: "lead-103",
        name: "Soumya Ranjan Mohanty",
        phone: "+91 70081 29481",
        email: "soumya.rm@outlook.com",
        course: "data-science",
        courseLabel: "Data Science & Machine Learning",
        source: "Direct WhatsApp",
        status: "follow-up",
        submittedAt: "2026-11-21T10:00:00Z",
        message: "Final year MCA student at KIIT. Wants deep dive into Python and ML.",
        counsellorNotes: "Follow-up scheduled on Monday post semester viva exam.",
    },
    {
        id: "lead-104",
        name: "Swagatika Nayak",
        phone: "+91 82490 61723",
        email: "swagatika.nayak@gmail.com",
        course: "business-analytics",
        courseLabel: "Business Analytics & BI",
        source: "Google Ad Campaign",
        status: "enrolled",
        submittedAt: "2026-11-20T11:25:00Z",
        message: "Enrolled in Upcoming November Cohort. Paid registration token.",
        counsellorNotes: "Enrolment confirmed. Added to Batch #DA-26 WhatsApp group.",
    },
    {
        id: "lead-105",
        name: "Bikash Ranjan Das",
        phone: "+91 99380 41209",
        email: "bikash.das.od@gmail.com",
        course: "data-science",
        courseLabel: "Data Science & Machine Learning",
        source: "Contact Us Page",
        status: "contacted",
        submittedAt: "2026-11-20T09:00:00Z",
        message: "2024 BTech graduate looking for full placement assistance.",
        counsellorNotes: "Resume screened. Eligible for placement guarantee support.",
    },
    {
        id: "lead-106",
        name: "Deepak Pattanaik",
        phone: "+91 79781 92834",
        email: "deepak.pattanaik@yahoo.co.in",
        course: "python",
        courseLabel: "Python Programming",
        source: "Walk-in Enquiry",
        status: "new",
        submittedAt: "2026-11-19T16:50:00Z",
        message: "Walk-in enquiry at Nayapalli campus. Wants live classroom training.",
        counsellorNotes: "Met front desk counsellor. Promised visit with parents on Sunday.",
    },
    {
        id: "lead-107",
        name: "Monali Samal",
        phone: "+91 91782 34091",
        email: "monali.samal@gmail.com",
        course: "power-bi",
        courseLabel: "Microsoft Power BI",
        source: "Hero Enquiry Form",
        status: "enrolled",
        submittedAt: "2026-11-18T12:30:00Z",
        message: "Enrolled in Power BI weekend masterclass.",
        counsellorNotes: "Batch seat reserved #PBI-04.",
    },
];
exports.INITIAL_COHORTS = [
    {
        id: "cohort-da",
        slug: "data-analytics",
        courseTitle: "Data Analytics Master Program",
        category: "Analytics & BI",
        summary: "Comprehensive practical training covering SQL query mastery, Advanced Excel modeling, and enterprise Power BI dashboard architecture.",
        tools: ["SQL", "Power BI", "Excel", "Python", "DAX"],
        schedule: "Weekday & Weekend Batches",
        duration: "16–20 Weeks",
        mode: "Classroom (Nayapalli) & Live Online",
        status: "Admissions Open",
        statusTone: "emerald",
        highlights: "1-on-1 Doubt Sessions • 8 Capstone Projects • ATS Resume & Mocks",
        enrolledCount: 18,
        maxSeats: 25,
        startDate: "2026-12-05",
    },
    {
        id: "cohort-ba",
        slug: "business-analytics",
        courseTitle: "Business Analytics & Intelligence",
        category: "Analytics & BI",
        summary: "Bridge executive business strategy and data engineering with exploratory analytics, KPIs, predictive regression, and Tableau visualization.",
        tools: ["Power BI", "Tableau", "SQL", "Excel", "Alteryx"],
        schedule: "Evening Cohort (Mon–Thu)",
        duration: "14–16 Weeks",
        mode: "Hybrid (Nayapalli Lab + Online)",
        status: "Fast-Filling Cohort",
        statusTone: "amber",
        highlights: "Harvard Case Studies • Executive Reporting • Mock Consulting Pitches",
        enrolledCount: 21,
        maxSeats: 25,
        startDate: "2026-12-08",
    },
    {
        id: "cohort-ds",
        slug: "data-science",
        courseTitle: "Data Science & Machine Learning",
        category: "Data Science & AI",
        summary: "End-to-end data science lifecycle from exploratory Python data wrangling to supervised ML models, NLP, and containerized API deployment.",
        tools: ["Python", "Pandas", "Scikit-Learn", "TensorFlow", "MLflow"],
        schedule: "Weekend Intensive",
        duration: "24 Weeks",
        mode: "Classroom & Live Hands-on Labs",
        status: "Upcoming Batch",
        statusTone: "blue",
        highlights: "Kaggle Mentorship • End-to-End ML Pipelines • AWS Model Deployment",
        enrolledCount: 14,
        maxSeats: 20,
        startDate: "2026-12-12",
    },
    {
        id: "cohort-pbi",
        slug: "power-bi",
        courseTitle: "Microsoft Power BI",
        category: "Analytics & BI",
        summary: "Master enterprise Power BI modeling, advanced DAX calculated measures, Power Query ETL pipelines, and corporate Power BI Service governance.",
        tools: ["Power BI Desktop", "DAX Studio", "Power Query", "Fabric"],
        schedule: "Weekend Specialized Track",
        duration: "8–10 Weeks",
        mode: "Live Online & Nayapalli Lab",
        status: "Seats Limited",
        statusTone: "amber",
        highlights: "PL-300 Certification Prep • Real Finance & Retail Datasets",
        enrolledCount: 19,
        maxSeats: 20,
        startDate: "2026-12-01",
    },
    {
        id: "cohort-sap",
        slug: "sap",
        courseTitle: "SAP ERP - FICO, MM, ABAP, SD",
        category: "Enterprise & Core",
        summary: "Deep enterprise consulting skills across SAP S/4HANA financial accounting (FICO), procurement (MM), sales distribution (SD), and ABAP programming.",
        tools: ["SAP GUI", "SAP S/4HANA", "FICO", "MM", "ABAP", "SD"],
        schedule: "Morning & Weekend Batches",
        duration: "5–7 Months",
        mode: "Classroom (Nayapalli, Bhubaneswar)",
        status: "Admissions Open",
        statusTone: "emerald",
        highlights: "Dedicated SAP GUI Server Access • Real Client Migration Scenarios",
        enrolledCount: 15,
        maxSeats: 25,
        startDate: "2026-12-15",
    },
    {
        id: "cohort-py",
        slug: "python",
        courseTitle: "Python Programming",
        category: "Enterprise & Core",
        summary: "Zero-to-production programming foundations covering OOP, data structures, REST API development, web scraping, and automation scripts.",
        tools: ["Python", "FastAPI", "PostgreSQL", "Git", "Selenium"],
        schedule: "Weekday Morning (Mon–Fri)",
        duration: "10–12 Weeks",
        mode: "Classroom & Lab Guided",
        status: "Admissions Open",
        statusTone: "emerald",
        highlights: "Build 5 Production Apps • Git Workflow • DSA Interview Prep",
        enrolledCount: 12,
        maxSeats: 20,
        startDate: "2026-12-10",
    },
];
exports.INITIAL_COURSES = [
    {
        slug: "data-analytics",
        title: "Data Analytics Master Program in Bhubaneswar",
        shortTitle: "Data Analytics Master Program",
        category: "analytics",
        categoryLabel: "Analytics & BI",
        heroHeadline: "From Raw Spreadsheets to Executive Power BI Dashboards & Enterprise SQL Queries",
        description: "Comprehensive practical training covering SQL query mastery, Advanced Excel modeling, and enterprise Power BI dashboard architecture.",
        duration: "16–20 Weeks",
        projectsCount: 8,
        tools: ["SQL", "Power BI", "Excel", "Python", "DAX"],
        audience: ["Freshers aiming for Analyst roles", "Non-IT professionals switching to IT", "Working executives"],
        prerequisites: "Basic computer familiarity. No prior coding required.",
        careerRoles: ["Data Analyst", "BI Developer", "Business Reporting Executive", "Operations Analyst"],
    },
    {
        slug: "business-analytics",
        title: "Business Analytics & Intelligence Program in Bhubaneswar",
        shortTitle: "Business Analytics & BI",
        category: "analytics",
        categoryLabel: "Analytics & BI",
        heroHeadline: "Turn Business Data into Boardroom Decisions with BI, KPIs & Predictive Insights",
        description: "Bridge executive business strategy and data engineering with exploratory analytics, KPIs, predictive regression, and Tableau visualization.",
        duration: "14–16 Weeks",
        projectsCount: 7,
        tools: ["Power BI", "Tableau", "SQL", "Excel", "Alteryx"],
        audience: ["MBA graduates & commerce students", "Management professionals", "Business consultants"],
        prerequisites: "Basic understanding of business operations and spreadsheets.",
        careerRoles: ["Business Analyst", "Strategy Analyst", "Commercial Insights Specialist"],
    },
    {
        slug: "data-science",
        title: "Data Science & Machine Learning Course in Bhubaneswar",
        shortTitle: "Data Science & Machine Learning",
        category: "ai",
        categoryLabel: "Data Science & AI",
        heroHeadline: "Build, Train & Deploy Real Machine Learning Models with Python & Scikit-Learn",
        description: "End-to-end data science lifecycle from exploratory Python data wrangling to supervised ML models, NLP, and containerized API deployment.",
        duration: "24 Weeks",
        projectsCount: 10,
        tools: ["Python", "Pandas", "Scikit-Learn", "TensorFlow", "MLflow", "FastAPI"],
        audience: ["BTech / MCA / MSc graduates", "Developers looking to pivot to AI/ML", "Data Analysts leveling up"],
        prerequisites: "Basic programming or mathematical background.",
        careerRoles: ["Junior Data Scientist", "ML Engineer", "Quantitative Analyst"],
    },
    {
        slug: "power-bi",
        title: "Microsoft Power BI Certification Course in Bhubaneswar",
        shortTitle: "Microsoft Power BI",
        category: "analytics",
        categoryLabel: "Analytics & BI",
        heroHeadline: "Enterprise Data Modeling, Advanced DAX Measures & Power BI Service Administration",
        description: "Master enterprise Power BI modeling, advanced DAX calculated measures, Power Query ETL pipelines, and corporate Power BI Service governance.",
        duration: "8–10 Weeks",
        projectsCount: 6,
        tools: ["Power BI Desktop", "DAX Studio", "Power Query", "Microsoft Fabric"],
        audience: ["Reporting analysts", "Finance executives", "Developers"],
        prerequisites: "Working knowledge of Excel formulas.",
        careerRoles: ["Power BI Developer", "Dashboard Consultant", "BI Specialist"],
    },
    {
        slug: "sap",
        title: "SAP ERP Training in Bhubaneswar — FICO, MM, ABAP, SD",
        shortTitle: "SAP - FICO, MM, ABAP, SD",
        category: "core",
        categoryLabel: "Enterprise & Core",
        heroHeadline: "Hands-on SAP S/4HANA Configuration, Business Workflows & Enterprise Consulting",
        description: "Deep enterprise consulting skills across SAP S/4HANA financial accounting (FICO), procurement (MM), sales distribution (SD), and ABAP programming.",
        duration: "5–7 Months",
        projectsCount: 11,
        tools: ["SAP GUI", "SAP S/4HANA", "FICO", "MM", "ABAP", "SD"],
        audience: ["Commerce / CA / ICWA aspirants for FICO", "Engineers & developers for ABAP", "Supply chain graduates for MM/SD"],
        prerequisites: "Domain understanding in finance, procurement, or programming.",
        careerRoles: ["SAP Consultant", "SAP Functional Analyst", "ABAP Developer"],
    },
    {
        slug: "python",
        title: "Python Programming & Automation in Bhubaneswar",
        shortTitle: "Python Programming",
        category: "core",
        categoryLabel: "Enterprise & Core",
        heroHeadline: "From Python Syntax to Real Automation Scripts, Backend APIs & Data Wrangling",
        description: "Zero-to-production programming foundations covering OOP, data structures, REST API development, web scraping, and automation scripts.",
        duration: "10–12 Weeks",
        projectsCount: 6,
        tools: ["Python", "FastAPI", "PostgreSQL", "Git", "Selenium", "Pandas"],
        audience: ["Complete beginners to programming", "Freshers seeking IT entry", "Automation engineers"],
        prerequisites: "None. Starts from fundamentals.",
        careerRoles: ["Python Developer", "Software Engineer (Trainee)", "Automation Engineer"],
    },
];
exports.INITIAL_PLACEMENTS = [
    {
        id: "place-01",
        studentName: "Subhashree Mohapatra",
        photo: "/images/home/person-1.jpg",
        course: "Data Analytics Master Program",
        designation: "Associate Data Analyst",
        company: "Tata Consultancy Services (TCS)",
        companyShort: "TCS",
        placementYear: "2025",
        skillsAcquired: ["SQL", "Power BI", "Advanced Excel", "DAX", "Data Storytelling"],
        successStory: "Transitioned from non-IT academic background into enterprise analytics.",
        salaryHike: "120% Transition Hike",
        verificationStatus: "verified",
    },
    {
        id: "place-02",
        studentName: "Rakesh Kumar Jena",
        photo: "/images/home/person-2.jpg",
        course: "Business Analytics & BI",
        designation: "Business Intelligence Analyst",
        company: "Deloitte USI",
        companyShort: "Deloitte",
        placementYear: "2025",
        skillsAcquired: ["Tableau", "SQL", "Alteryx", "KPI Analytics", "Executive Reporting"],
        successStory: "Cracked Deloitte campus placement with strong project portfolio.",
        salaryHike: "140% Starting Hike",
        verificationStatus: "verified",
    },
    {
        id: "place-03",
        studentName: "Priyanka Priyadarshini",
        photo: "/images/home/person-3.jpg",
        course: "Data Science & Machine Learning",
        designation: "Junior Data Scientist",
        company: "PwC India",
        companyShort: "PwC",
        placementYear: "2025",
        skillsAcquired: ["Python", "Pandas", "Scikit-Learn", "SQL", "ML Pipelines"],
        successStory: "Built fraud detection model during capstone that impressed PwC recruiters.",
        salaryHike: "110% Career Hike",
        verificationStatus: "verified",
    },
    {
        id: "place-04",
        studentName: "Ashish Kumar Nayak",
        photo: "/images/home/person-4.jpg",
        course: "SAP - FICO, MM, ABAP, SD",
        designation: "SAP S/4HANA Associate Consultant",
        company: "Capgemini",
        companyShort: "Capgemini",
        placementYear: "2024",
        skillsAcquired: ["SAP FICO", "General Ledger", "AR/AP", "Asset Accounting", "S/4HANA"],
        successStory: "Transitioned from commerce accounting to SAP consulting.",
        salaryHike: "160% Hike",
        verificationStatus: "verified",
    },
    {
        id: "place-05",
        studentName: "Smruti Ranjan Sahoo",
        photo: "/images/home/person-5.jpg",
        course: "Data Analytics Master Program",
        designation: "Data Analyst",
        company: "Accenture",
        companyShort: "Accenture",
        placementYear: "2025",
        skillsAcquired: ["Power BI", "SQL", "Excel", "Data Modeling"],
        successStory: "Placed in Accenture with excellent technical rating in SQL.",
        salaryHike: "135% Hike",
        verificationStatus: "verified",
    },
    {
        id: "place-06",
        studentName: "Ananya Tripathy",
        photo: "/images/home/person-6.jpg",
        course: "Microsoft Power BI",
        designation: "BI Reporting Analyst",
        company: "EY (Ernst & Young)",
        companyShort: "EY",
        placementYear: "2024",
        skillsAcquired: ["Power BI Desktop", "DAX", "Power Query", "Financial Modeling"],
        successStory: "Mastered PL-300 curriculum and joined EY Global Delivery Services.",
        salaryHike: "125% Hike",
        verificationStatus: "verified",
    },
];
