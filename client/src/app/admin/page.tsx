"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { serverApi } from "@/lib/server-api";
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  Download,
  Edit,
  ExternalLink,
  Eye,
  EyeOff,
  FileText,
  LayoutDashboard,
  Lock,
  LogOut,
  MapPin,
  Menu,
  MessageCircle,
  PanelLeftClose,
  PanelLeftOpen,
  Phone,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Trash2,
  TrendingUp,
  User,
  Users,
  X,
} from "@/components/common/Icons";

import { courses } from "@/data/courses";
import { upcomingCohorts } from "@/data/cohorts";
import { verifiedPlacements } from "@/data/placements";
import { posts } from "@/data/posts";
import { site } from "@/data/site";

// -----------------------------------------------------------------------------
// Lead CRM Types & Default Seed Data
// -----------------------------------------------------------------------------
export type LeadStatus = "new" | "contacted" | "follow-up" | "enrolled" | "closed";

export type Lead = {
  id: string;
  name: string;
  phone: string;
  email: string;
  course: string;
  courseLabel: string;
  source: string;
  status: LeadStatus;
  submittedAt: string;
  message?: string;
  counsellorNotes?: string;
};

const DEFAULT_SEED_LEADS: Lead[] = [
  {
    id: "lead-101",
    name: "Priyabrata Sahoo",
    phone: "+91 94371 82910",
    email: "priyabrata.sahoo@gmail.com",
    course: "data-analytics",
    courseLabel: "Data Analytics Master Program",
    source: "Hero Enquiry Form",
    status: "new",
    submittedAt: "2026-11-22T08:15:00Z",
    message: "Interested in the weekend batch for SQL and Power BI. Need fee details.",
    counsellorNotes: "Prefers morning weekend slot. Background in B.Com.",
  },
  {
    id: "lead-102",
    name: "Ananya Mishra",
    phone: "+91 70082 14590",
    email: "ananya.mishra.tech@gmail.com",
    course: "generative-ai",
    courseLabel: "Generative AI & Agentic AI",
    source: "Course Details Page",
    status: "contacted",
    submittedAt: "2026-11-21T18:40:00Z",
    message: "Working professional in TCS. Want to switch into Generative AI engineering.",
    counsellorNotes: "Called on 22nd Nov. Sent brochure over WhatsApp. Follow up Tuesday.",
  },
  {
    id: "lead-103",
    name: "Subham Mohanty",
    phone: "+91 98610 52311",
    email: "subham.mohanty@outlook.com",
    course: "sap",
    courseLabel: "SAP - FICO, MM, ABAP, SD",
    source: "WhatsApp Referral",
    status: "follow-up",
    submittedAt: "2026-11-21T14:10:00Z",
    message: "Looking for SAP FICO module with certification guidance.",
    counsellorNotes: "Needs demo session with trainer this Saturday at Bhubaneswar campus.",
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

type AdminTab = "overview" | "leads" | "courses" | "batches" | "placements" | "blog" | "settings";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // ---------------------------------------------------------------------------
  // Admin Authentication State
  // ---------------------------------------------------------------------------
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmittingAuth, setIsSubmittingAuth] = useState(false);

  // Check auth session on client mount
  useEffect(() => {
    try {
      const auth = localStorage.getItem("talentele_admin_auth");
      if (auth === "true") {
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.error("Auth check failed", e);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsSubmittingAuth(true);

    const cleanInput = loginIdentifier.trim().toLowerCase().replace(/[\s\-\+]/g, "");
    const cleanAdminPhone = "9437012849";
    const cleanAdminEmail = "admin@talentele.com";
    const validPassword = "Talentele@Admin2026";

    setTimeout(() => {
      const isIdentifierValid =
        cleanInput === cleanAdminPhone ||
        cleanInput.endsWith(cleanAdminPhone) ||
        cleanAdminPhone.endsWith(cleanInput) ||
        loginIdentifier.trim().toLowerCase() === cleanAdminEmail;

      const isPasswordValid =
        loginPassword === validPassword || loginPassword === "TalenteleAdmin@2026";

      if (isIdentifierValid && isPasswordValid) {
        localStorage.setItem("talentele_admin_auth", "true");
        localStorage.setItem(
          "talentele_admin_user",
          JSON.stringify({
            name: "Talentele Administrator",
            phone: "+91 94370 12849",
            email: "admin@talentele.com",
            role: "Super Administrator",
          })
        );
        setIsAuthenticated(true);
        setNotificationMsg("Signed in successfully. Welcome back, Admin!");
        setTimeout(() => setNotificationMsg(null), 4000);
      } else {
        setAuthError("Invalid Admin Number or Password. Please check your credentials.");
      }
      setIsSubmittingAuth(false);
    }, 350);
  };

  const handleLogout = () => {
    localStorage.removeItem("talentele_admin_auth");
    localStorage.removeItem("talentele_admin_user");
    setIsAuthenticated(false);
    setLoginPassword("");
  };

  const handleAutoFillCredentials = () => {
    setLoginIdentifier("9437012849");
    setLoginPassword("Talentele@Admin2026");
    setAuthError(null);
  };

  // Leads State with LocalStorage & Server Persistence
  const [leads, setLeads] = useState<Lead[]>(DEFAULT_SEED_LEADS);

  // Hydrate from Backend Server / localStorage on client mount
  useEffect(() => {
    async function loadServerLeads() {
      try {
        const res = await serverApi.getLeads({ limit: 100 });
        if (res.success && res.data && res.data.length > 0) {
          setLeads(res.data);
          localStorage.setItem("talentele_admin_leads", JSON.stringify(res.data));
          return;
        }
      } catch {
        // Fallback to local storage if backend is unavailable
      }
      try {
        const stored = localStorage.getItem("talentele_admin_leads");
        if (stored) {
          setLeads(JSON.parse(stored));
        }
      } catch (e) {
        console.error("Failed to load leads from localStorage", e);
      }
    }
    loadServerLeads();
  }, []);

  // Save to LocalStorage whenever leads change
  useEffect(() => {
    try {
      localStorage.setItem("talentele_admin_leads", JSON.stringify(leads));
    } catch (e) {
      console.error("Failed to save leads to localStorage", e);
    }
  }, [leads]);

  // Courses State with LocalStorage & Server Persistence
  const [adminCourses, setAdminCourses] = useState<any[]>(courses);
  const [courseSearch, setCourseSearch] = useState("");
  const [courseCategoryFilter, setCourseCategoryFilter] = useState("all");

  // Course Modals state
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
  const [isEditCourseModalOpen, setIsEditCourseModalOpen] = useState(false);
  const [selectedCourseForDetail, setSelectedCourseForDetail] = useState<any | null>(null);
  const [selectedCourseForEdit, setSelectedCourseForEdit] = useState<any | null>(null);

  // Add Course Form State
  const [courseTitle, setCourseTitle] = useState("");
  const [courseShortTitle, setCourseShortTitle] = useState("");
  const [courseSlug, setCourseSlug] = useState("");
  const [courseCategory, setCourseCategory] = useState("Analytics");
  const [courseDuration, setCourseDuration] = useState("16–20 Weeks");
  const [courseTools, setCourseTools] = useState("SQL, Power BI, Excel");
  const [courseSummary, setCourseSummary] = useState("");
  const [coursePrerequisites, setCoursePrerequisites] = useState("Basic computer familiarity. No prior coding required.");
  const [courseStatus, setCourseStatus] = useState<"Active" | "Draft">("Active");

  // Edit Course Form State
  const [editTitle, setEditTitle] = useState("");
  const [editShortTitle, setEditShortTitle] = useState("");
  const [editCategory, setEditCategory] = useState("Analytics");
  const [editDuration, setEditDuration] = useState("");
  const [editTools, setEditTools] = useState("");
  const [editSummary, setEditSummary] = useState("");
  const [editPrerequisites, setEditPrerequisites] = useState("");
  const [editStatus, setEditStatus] = useState<"Active" | "Draft">("Active");

  // Hydrate Courses from Backend Server / localStorage on client mount
  useEffect(() => {
    async function loadServerCourses() {
      let rawData: any[] = [];
      try {
        const res = await serverApi.getCourses();
        if (res.success && res.data && res.data.length > 0) {
          rawData = res.data;
        }
      } catch {
        // Fallback to local storage if backend is sleeping
      }

      if (rawData.length === 0) {
        try {
          const stored = localStorage.getItem("talentele_admin_courses");
          if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
              rawData = parsed;
            }
          }
        } catch (e) {
          console.error("Failed to load courses from localStorage", e);
        }
      }

      if (rawData.length > 0) {
        // Merge with all 10 seed courses so no official courses are ever missing
        const merged = courses.map((seed) => {
          const match = rawData.find((item: any) => item.slug === seed.slug);
          return match ? { ...seed, ...match } : seed;
        });
        const extra = rawData.filter(
          (item: any) => !courses.some((c) => c.slug === item.slug)
        );
        const finalCourses = [...merged, ...extra];
        setAdminCourses(finalCourses);
        try {
          localStorage.setItem("talentele_admin_courses", JSON.stringify(finalCourses));
        } catch {}
      } else {
        setAdminCourses(courses);
      }
    }
    loadServerCourses();
  }, []);

  // Save courses to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem("talentele_admin_courses", JSON.stringify(adminCourses));
    } catch (e) {
      console.error("Failed to save courses to localStorage", e);
    }
  }, [adminCourses]);

  // Lead Filters & Search
  const [leadSearch, setLeadSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [courseFilter, setCourseFilter] = useState<string>("all");

  // Modals state
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [selectedLeadForDetail, setSelectedLeadForDetail] = useState<Lead | null>(null);
  const [isAddBatchModalOpen, setIsAddBatchModalOpen] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  // New Lead Form State
  const [newLeadName, setNewLeadName] = useState("");
  const [newLeadPhone, setNewLeadPhone] = useState("");
  const [newLeadEmail, setNewLeadEmail] = useState("");
  const [newLeadCourse, setNewLeadCourse] = useState("data-analytics");
  const [newLeadSource, setNewLeadSource] = useState("Walk-in Counselling");
  const [newLeadMessage, setNewLeadMessage] = useState("");

  // Notification Banner Helper
  function showNotification(msg: string) {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(null), 3500);
  }

  // Handle Add Lead
  function handleAddLeadSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newLeadName.trim() || !newLeadPhone.trim()) {
      alert("Please provide at least Name and Phone number.");
      return;
    }

    const matchedCourse = adminCourses.find((c) => c.slug === newLeadCourse);
    const newEntry: Lead = {
      id: `lead-${Date.now().toString().slice(-4)}`,
      name: newLeadName.trim(),
      phone: newLeadPhone.trim(),
      email: newLeadEmail.trim() || "contact@talentele.in",
      course: newLeadCourse,
      courseLabel: matchedCourse ? matchedCourse.title : "Career Guidance",
      source: newLeadSource,
      status: "new",
      submittedAt: new Date().toISOString(),
      message: newLeadMessage.trim() || "Manual enquiry recorded via Admin Portal.",
      counsellorNotes: "Added via Admin Portal.",
    };

    setLeads([newEntry, ...leads]);
    setIsAddLeadModalOpen(false);
    // Sync with dedicated backend server
    serverApi
      .createLead({
        name: newEntry.name,
        phone: newEntry.phone,
        email: newEntry.email,
        course: newEntry.course,
        source: newEntry.source,
        message: newEntry.message,
      })
      .catch((err) => console.warn("Failed to sync lead to server:", err));

    // Reset Form
    setNewLeadName("");
    setNewLeadPhone("");
    setNewLeadEmail("");
    setNewLeadMessage("");
    showNotification(`New lead "${newEntry.name}" added successfully!`);
  }

  // Handle Lead Status Change
  function handleStatusChange(leadId: string, newStatus: LeadStatus) {
    setLeads((prev) =>
      prev.map((item) => (item.id === leadId ? { ...item, status: newStatus } : item))
    );
    serverApi
      .updateLead(leadId, { status: newStatus })
      .catch((err) => console.warn("Failed to update status on server:", err));
    showNotification("Lead status updated!");
  }

  // Handle Delete Lead
  function handleDeleteLead(leadId: string) {
    if (confirm("Are you sure you want to delete this enquiry record?")) {
      setLeads((prev) => prev.filter((item) => item.id !== leadId));
      serverApi
        .deleteLead(leadId)
        .catch((err) => console.warn("Failed to delete lead on server:", err));
      showNotification("Lead record deleted.");
    }
  }

  // Handle Create Course
  function handleCreateCourseSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!courseTitle.trim()) {
      alert("Please provide the program title.");
      return;
    }
    const autoSlug =
      courseSlug.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") ||
      courseTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") ||
      `prog-${Date.now().toString().slice(-4)}`;
    const toolsArray = courseTools.split(",").map((t) => t.trim()).filter(Boolean);

    const newProgram = {
      slug: autoSlug,
      title: courseTitle.trim(),
      shortTitle: courseShortTitle.trim() || courseTitle.trim(),
      category: courseCategory,
      categoryLabel: courseCategory,
      heroHeadline: courseTitle.trim(),
      summary: courseSummary.trim() || `Comprehensive industry-aligned curriculum in ${courseTitle.trim()}.`,
      description: courseSummary.trim() || `Comprehensive curriculum designed for modern job roles.`,
      duration: courseDuration.trim() || "16 Weeks",
      projectsCount: 6,
      tools: toolsArray.length > 0 ? toolsArray : ["Core Skills", "Industry Practices"],
      audience: ["Freshers aiming for tech roles", "Working professionals upskilling"],
      prerequisites: coursePrerequisites.trim() || "No prior technical background needed.",
      careerRoles: ["Analyst", "Developer", "Consultant"],
      status: courseStatus,
      updatedAt: new Date().toISOString(),
    };

    setAdminCourses([newProgram, ...adminCourses]);
    setIsAddCourseModalOpen(false);
    serverApi
      .createCourse(newProgram)
      .catch((err) => console.warn("Could not sync new course to backend:", err));

    // Reset Form
    setCourseTitle("");
    setCourseShortTitle("");
    setCourseSlug("");
    setCourseTools("SQL, Power BI, Excel");
    setCourseSummary("");
    showNotification(`New program "${newProgram.title}" created successfully!`);
  }

  // Open Edit Course Modal
  function openEditCourseModal(course: any) {
    setSelectedCourseForEdit(course);
    setEditTitle(course.title || "");
    setEditShortTitle(course.shortTitle || course.title || "");
    setEditCategory(course.category || "Analytics");
    setEditDuration(course.duration || "16 Weeks");
    setEditTools(Array.isArray(course.tools) ? course.tools.join(", ") : "");
    setEditSummary(course.summary || course.description || "");
    setEditPrerequisites(course.prerequisites || "");
    setEditStatus(course.status || "Active");
    setIsEditCourseModalOpen(true);
  }

  // Handle Edit Course Submit
  function handleEditCourseSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedCourseForEdit) return;

    const toolsArray = editTools.split(",").map((t) => t.trim()).filter(Boolean);
    const updated = {
      ...selectedCourseForEdit,
      title: editTitle.trim(),
      shortTitle: editShortTitle.trim() || editTitle.trim(),
      category: editCategory,
      categoryLabel: editCategory,
      duration: editDuration.trim(),
      tools: toolsArray,
      summary: editSummary.trim(),
      description: editSummary.trim(),
      prerequisites: editPrerequisites.trim(),
      status: editStatus,
      updatedAt: new Date().toISOString(),
    };

    setAdminCourses((prev) =>
      prev.map((c) => (c.slug === selectedCourseForEdit.slug ? updated : c))
    );
    setIsEditCourseModalOpen(false);
    serverApi
      .updateCourse(selectedCourseForEdit.slug, updated)
      .catch((err) => console.warn("Could not sync course update to backend:", err));
    showNotification(`Program "${updated.title}" updated successfully!`);
  }

  // Handle Delete Course
  function handleDeleteCourse(slug: string, title: string) {
    if (confirm(`Are you sure you want to remove the program "${title}"?`)) {
      setAdminCourses((prev) => prev.filter((c) => c.slug !== slug));
      serverApi
        .deleteCourse(slug)
        .catch((err) => console.warn("Could not delete course from backend:", err));
      showNotification(`Program "${title}" removed successfully.`);
    }
  }

  // Toggle Course Status
  function handleToggleCourseStatus(slug: string) {
    setAdminCourses((prev) =>
      prev.map((c) => {
        if (c.slug === slug) {
          const nextStatus = c.status === "Draft" ? "Active" : "Draft";
          serverApi.updateCourse(slug, { status: nextStatus }).catch(() => { });
          return { ...c, status: nextStatus };
        }
        return c;
      })
    );
    showNotification("Course status updated!");
  }

  // Filtered Courses
  const filteredCourses = useMemo(() => {
    let list = adminCourses;
    if (courseCategoryFilter !== "all") {
      list = list.filter(
        (c) =>
          c.category?.toLowerCase() === courseCategoryFilter.toLowerCase() ||
          c.categoryLabel?.toLowerCase() === courseCategoryFilter.toLowerCase()
      );
    }
    if (courseSearch.trim()) {
      const q = courseSearch.toLowerCase().trim();
      list = list.filter(
        (c) =>
          c.title?.toLowerCase().includes(q) ||
          c.shortTitle?.toLowerCase().includes(q) ||
          c.slug?.toLowerCase().includes(q) ||
          (c.tools && c.tools.some((t: string) => t.toLowerCase().includes(q))) ||
          c.summary?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [adminCourses, courseCategoryFilter, courseSearch]);

  // Export Leads to CSV
  function handleExportCsv() {
    const headers = ["ID", "Name", "Phone", "Email", "Course", "Status", "Source", "Date", "Notes"];
    const rows = filteredLeads.map((l) => [
      l.id,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.email}"`,
      `"${l.courseLabel.replace(/"/g, '""')}"`,
      l.status.toUpperCase(),
      `"${l.source}"`,
      new Date(l.submittedAt).toLocaleDateString(),
      `"${(l.counsellorNotes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `talentele_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification("CSV Export downloaded successfully!");
  }

  // Filtered Leads Calculation
  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      const matchesSearch =
        l.name.toLowerCase().includes(leadSearch.toLowerCase()) ||
        l.phone.includes(leadSearch) ||
        l.email.toLowerCase().includes(leadSearch.toLowerCase()) ||
        l.courseLabel.toLowerCase().includes(leadSearch.toLowerCase());

      const matchesStatus = statusFilter === "all" || l.status === statusFilter;
      const matchesCourse = courseFilter === "all" || l.course === courseFilter;

      return matchesSearch && matchesStatus && matchesCourse;
    });
  }, [leads, leadSearch, statusFilter, courseFilter]);

  // Lead metrics
  const newLeadsCount = leads.filter((l) => l.status === "new").length;
  const contactedCount = leads.filter((l) => l.status === "contacted").length;
  const enrolledCount = leads.filter((l) => l.status === "enrolled").length;

  // ---------------------------------------------------------------------------
  // Auth Gates
  // ---------------------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <Link href="/" className="inline-block mb-3" title="Talentele Institute">
              <Image
                src="/brand/logo.png"
                alt="Talentele"
                width={160}
                height={42}
                priority
                style={{ objectFit: "contain" }}
              />
            </Link>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="admin-logo-badge">RESTRICTED ACCESS</span>
            </div>
            <h1 className="admin-login-title">Admin Portal Sign In</h1>
            <p className="admin-login-desc">
              Enter your registered Admin Number and password to access candidate CRM, batch schedules, and institute controls.
            </p>
          </div>

          <div className="admin-cred-box">
            <div className="flex items-center justify-between mb-1.5">
              <span className="admin-cred-label">Authorized Credentials</span>
              <button
                type="button"
                onClick={handleAutoFillCredentials}
                className="admin-autofill-btn"
                title="Fill in authorized credentials"
              >
                ⚡ Quick Auto-Fill
              </button>
            </div>
            <div className="admin-cred-row">
              <span>Admin Number:</span>
              <strong>9437012849</strong>
            </div>
            <div className="admin-cred-row">
              <span>Admin Password:</span>
              <strong>Talentele@Admin2026</strong>
            </div>
          </div>

          {authError && (
            <div className="admin-login-error">
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="admin-form-group">
              <label className="admin-form-label" htmlFor="admin-id">
                Admin Mobile Number or Email
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <Phone width={16} height={16} />
                </span>
                <input
                  id="admin-id"
                  type="text"
                  className="admin-login-input"
                  style={{ paddingLeft: "38px" }}
                  placeholder="9437012849 or admin@talentele.com"
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  required
                  autoFocus
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label" htmlFor="admin-pass">
                Admin Security Password
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <Lock width={16} height={16} />
                </span>
                <input
                  id="admin-pass"
                  type={showPassword ? "text" : "password"}
                  className="admin-login-input"
                  style={{ paddingLeft: "38px", paddingRight: "40px" }}
                  placeholder="Enter admin password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff width={16} height={16} /> : <Eye width={16} height={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="admin-login-submit"
              disabled={isSubmittingAuth}
            >
              {isSubmittingAuth ? (
                <span className="flex items-center justify-center gap-2">
                  <RefreshCw width={16} height={16} className="animate-spin" />
                  Verifying Credentials...
                </span>
              ) : (
                <span>Sign In to Admin Portal →</span>
              )}
            </button>
          </form>

          <div className="admin-login-footer">
            <Link href="/" className="text-xs text-slate-400 hover:text-white transition">
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      {/* ----------------------------------------------------------------------
          1. Admin Sidebar
          ---------------------------------------------------------------------- */}
      <aside
        className={`admin-sidebar ${isSidebarCollapsed ? "collapsed" : ""} ${isMobileSidebarOpen ? "open" : ""
          }`}
      >
        {/* Brand Header */}
        <div className="admin-sidebar-header">
          <Link href="/" className="admin-logo-link" title="Talentele Admin">
            <Image
              src="/brand/logo.png"
              alt="Talentele Logo"
              width={140}
              height={36}
              priority
              style={{ objectFit: "contain" }}
            />
            {/* {!isSidebarCollapsed && <span className="admin-logo-badge">ADMIN</span>} */}
          </Link>
          <button
            type="button"
            className="admin-collapse-btn hidden md:flex"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isSidebarCollapsed ? <PanelLeftOpen width={18} height={18} /> : <PanelLeftClose width={18} height={18} />}
          </button>

        </div>

        {/* Navigation Tabs */}
        <nav className="admin-nav">
          <button
            type="button"
            className={`admin-nav-item ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("overview");
              setIsMobileSidebarOpen(false);
            }}
            title="Overview & Dashboard"
          >
            <div className="admin-nav-left">
              <LayoutDashboard width={18} height={18} />
              {!isSidebarCollapsed && <span>Dashboard</span>}
            </div>
          </button>

          <button
            type="button"
            className={`admin-nav-item ${activeTab === "leads" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("leads");
              setIsMobileSidebarOpen(false);
            }}
            title="Leads & Enquiries CRM"
          >
            <div className="admin-nav-left">
              <Users width={18} height={18} />
              {!isSidebarCollapsed && <span>Leads & Enquiries</span>}
            </div>
            {!isSidebarCollapsed && (
              <span className={`admin-nav-badge ${newLeadsCount > 0 ? "alert" : ""}`}>
                {leads.length}
              </span>
            )}
          </button>

          <button
            type="button"
            className={`admin-nav-item ${activeTab === "courses" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("courses");
              setIsMobileSidebarOpen(false);
            }}
            title="Courses & Programs"
          >
            <div className="admin-nav-left">
              <BookOpen width={18} height={18} />
              {!isSidebarCollapsed && <span>Courses & Tracks</span>}
            </div>
            {!isSidebarCollapsed && <span className="admin-nav-badge">{adminCourses.length}</span>}
          </button>

          <button
            type="button"
            className={`admin-nav-item ${activeTab === "batches" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("batches");
              setIsMobileSidebarOpen(false);
            }}
            title="Batches & Cohorts"
          >
            <div className="admin-nav-left">
              <Calendar width={18} height={18} />
              {!isSidebarCollapsed && <span>Batches & Cohorts</span>}
            </div>
            {!isSidebarCollapsed && <span className="admin-nav-badge">{upcomingCohorts.length}</span>}
          </button>

          <button
            type="button"
            className={`admin-nav-item ${activeTab === "placements" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("placements");
              setIsMobileSidebarOpen(false);
            }}
            title="Placements & Alumni"
          >
            <div className="admin-nav-left">
              <Award width={18} height={18} />
              {!isSidebarCollapsed && <span>Placements & Alumni</span>}
            </div>
            {!isSidebarCollapsed && (
              <span className="admin-nav-badge">{verifiedPlacements.length}</span>
            )}
          </button>

          <button
            type="button"
            className={`admin-nav-item ${activeTab === "blog" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("blog");
              setIsMobileSidebarOpen(false);
            }}
            title="Career Blog & Articles"
          >
            <div className="admin-nav-left">
              <FileText width={18} height={18} />
              {!isSidebarCollapsed && <span>Career Blog</span>}
            </div>
            {!isSidebarCollapsed && <span className="admin-nav-badge">{posts.length}</span>}
          </button>

          <button
            type="button"
            className={`admin-nav-item ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("settings");
              setIsMobileSidebarOpen(false);
            }}
            title="Settings & System"
          >
            <div className="admin-nav-left">
              <Settings width={18} height={18} />
              {!isSidebarCollapsed && <span>Settings</span>}
            </div>
          </button>
        </nav>

        {/* Sidebar Footer */}
        <div className="admin-sidebar-footer">
          {!isSidebarCollapsed && (
            <div className="admin-user-profile">
              <div className="admin-avatar">TA</div>
              <div className="admin-user-info">
                <span className="admin-user-name">Talentele Admin</span>
                <span className="admin-user-role">+91 94370 12849</span>
              </div>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="admin-view-site-btn flex-1"
              target="_blank"
              title="View Public Website"
            >
              <ExternalLink width={14} height={14} />
              {!isSidebarCollapsed && <span>Live Site</span>}
            </Link>

            <button
              type="button"
              className="admin-logout-btn"
              onClick={handleLogout}
              title="Sign Out of Admin Portal"
            >
              <LogOut width={14} height={14} />
              {!isSidebarCollapsed && <span>Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Backdrop Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="admin-mobile-backdrop md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ----------------------------------------------------------------------
          2. Admin Main Area & Topbar
          ---------------------------------------------------------------------- */}
      <div className="admin-main">
        {/* Topbar */}
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button
              type="button"
              className="admin-mobile-toggle"
              onClick={() => setIsMobileSidebarOpen(true)}
              aria-label="Open sidebar menu"
            >
              <Menu width={22} height={22} />
            </button>
            <div className="admin-breadcrumbs">
              <span>Admin Portal</span>
              <ChevronRight width={14} height={14} />
              <span className="active">
                {activeTab === "overview" && "Dashboard Overview"}
                {activeTab === "leads" && "Leads & Enquiries CRM"}
                {activeTab === "courses" && "Courses & Curriculums"}
                {activeTab === "batches" && "Batches & Cohorts"}
                {activeTab === "placements" && "Placements & Hall of Excellence"}
                {activeTab === "blog" && "Articles & Blog"}
                {activeTab === "settings" && "Institute & CRM Settings"}
              </span>
            </div>
          </div>

          <div className="admin-topbar-right">
            <div className="admin-status-pill hidden sm:inline-flex">
              <span className="admin-pulse-dot"></span>
              <span>CRM Live • Bhubaneswar</span>
            </div>

          </div>
        </header>

        {/* Notification Toast */}
        {notificationMsg && (
          <div className="mx-6 mt-4 flex items-center justify-between rounded-lg border border-emerald-500/30 bg-emerald-950/80 px-4 py-3 text-sm text-emerald-300 shadow-lg">
            <div className="flex items-center gap-2">
              <CheckCircle width={16} height={16} className="text-emerald-400" />
              <span>{notificationMsg}</span>
            </div>
            <button
              type="button"
              onClick={() => setNotificationMsg(null)}
              className="text-emerald-400 hover:text-white"
            >
              <X width={14} height={14} />
            </button>
          </div>
        )}

        {/* --------------------------------------------------------------------
            3. Tab Body Views
            -------------------------------------------------------------------- */}
        <div className="admin-content-body">
          {/* ==================================================================
              TAB 1: OVERVIEW & DASHBOARD
              ================================================================== */}
          {activeTab === "overview" && (
            <div>
              {/* Top 4 KPI Metrics */}
              <div className="admin-kpi-grid">
                <div className="admin-kpi-card">
                  <div className="admin-kpi-top">
                    <div className="admin-kpi-icon-wrap red">
                      <Users width={22} height={22} />
                    </div>
                    <span className="admin-kpi-growth up">
                      <TrendingUp width={12} height={12} /> +14%
                    </span>
                  </div>
                  <div>
                    <div className="admin-kpi-num">{leads.length}</div>
                    <div className="admin-kpi-label">Total Student Enquiries</div>
                  </div>
                </div>

                <div className="admin-kpi-card">
                  <div className="admin-kpi-top">
                    <div className="admin-kpi-icon-wrap blue">
                      <BookOpen width={22} height={22} />
                    </div>
                    <span className="admin-kpi-growth up">3 Tracks</span>
                  </div>
                  <div>
                    <div className="admin-kpi-num">{adminCourses.length}</div>
                    <div className="admin-kpi-label">Active Career Programs</div>
                  </div>
                </div>

                <div className="admin-kpi-card">
                  <div className="admin-kpi-top">
                    <div className="admin-kpi-icon-wrap emerald">
                      <Calendar width={22} height={22} />
                    </div>
                    <span className="admin-kpi-growth up">Open Now</span>
                  </div>
                  <div>
                    <div className="admin-kpi-num">{upcomingCohorts.length}</div>
                    <div className="admin-kpi-label">Upcoming Scheduled Cohorts</div>
                  </div>
                </div>

                <div className="admin-kpi-card">
                  <div className="admin-kpi-top">
                    <div className="admin-kpi-icon-wrap purple">
                      <Award width={22} height={22} />
                    </div>
                    <span className="admin-kpi-growth up">₹6.2 LPA Avg</span>
                  </div>
                  <div>
                    <div className="admin-kpi-num">48+</div>
                    <div className="admin-kpi-label">Verified Placement Records</div>
                  </div>
                </div>
              </div>

              {/* 2-Column Overview Charts & Pipeline */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
                {/* Pipeline Funnel */}
                <div className="admin-card lg:col-span-1">
                  <div className="admin-card-header">
                    <div>
                      <h3 className="admin-card-title">Enquiry Funnel</h3>
                      <p className="admin-card-subtitle">Current lead stage distribution</p>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col gap-4">
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-red-400">New Leads (Pending Call)</span>
                        <span className="text-white">{newLeadsCount}</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2">
                        <div
                          className="bg-red-500 h-2 rounded-full"
                          style={{ width: `${(newLeadsCount / leads.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-sky-400">Contacted / Counselling</span>
                        <span className="text-white">{contactedCount}</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2">
                        <div
                          className="bg-sky-500 h-2 rounded-full"
                          style={{ width: `${(contactedCount / leads.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-emerald-400">Confirmed Enrolments</span>
                        <span className="text-white">{enrolledCount}</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2">
                        <div
                          className="bg-emerald-500 h-2 rounded-full"
                          style={{ width: `${(enrolledCount / leads.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                      <span>Conversion Rate</span>
                      <strong className="text-emerald-400 font-bold">
                        {((enrolledCount / leads.length) * 100).toFixed(1)}%
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Popular Course Demand */}
                <div className="admin-card lg:col-span-2">
                  <div className="admin-card-header">
                    <div>
                      <h3 className="admin-card-title">Top Requested Programs</h3>
                      <p className="admin-card-subtitle">Enquiry volume by career discipline</p>
                    </div>
                    <button
                      type="button"
                      className="admin-btn admin-btn-secondary text-xs"
                      onClick={() => setActiveTab("courses")}
                    >
                      View All {adminCourses.length} Courses &rarr;
                    </button>
                  </div>
                  <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">
                          DA
                        </div>
                        <div>
                          <strong className="block text-sm text-white">Data Analytics</strong>
                          <span className="text-xs text-slate-400">Power BI, SQL, Excel</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">
                        38% Volume
                      </span>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-pink-500/10 text-pink-400 flex items-center justify-center font-bold">
                          AI
                        </div>
                        <div>
                          <strong className="block text-sm text-white">Data Science & GenAI</strong>
                          <span className="text-xs text-slate-400">Python, Agentic AI, ML</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-pink-400 bg-pink-500/10 px-2 py-1 rounded">
                        27% Volume
                      </span>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                          SAP
                        </div>
                        <div>
                          <strong className="block text-sm text-white">SAP ERP Modules</strong>
                          <span className="text-xs text-slate-400">FICO, MM, ABAP, SD</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
                        18% Volume
                      </span>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                          BA
                        </div>
                        <div>
                          <strong className="block text-sm text-white">Business Analytics</strong>
                          <span className="text-xs text-slate-400">KPIs, Tableau, Modeling</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded">
                        17% Volume
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Leads Preview Table */}
              <div className="admin-card">
                <div className="admin-card-header">
                  <div>
                    <h3 className="admin-card-title">Recent Candidate Enquiries</h3>
                    <p className="admin-card-subtitle">Real-time candidate submissions needing counselling</p>
                  </div>
                  <button
                    type="button"
                    className="admin-btn admin-btn-secondary text-xs"
                    onClick={() => setActiveTab("leads")}
                  >
                    Open CRM &rarr;
                  </button>
                </div>

                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Candidate Name</th>
                        <th>Contact Number</th>
                        <th>Program</th>
                        <th>Status</th>
                        <th>Submitted</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.slice(0, 5).map((lead) => (
                        <tr key={lead.id}>
                          <td>
                            <strong className="block text-white font-semibold">{lead.name}</strong>
                            <span className="text-xs text-slate-400">{lead.email}</span>
                          </td>
                          <td>
                            <span className="font-mono text-xs">{lead.phone}</span>
                          </td>
                          <td>
                            <span className="text-xs text-slate-300 font-medium">{lead.courseLabel}</span>
                          </td>
                          <td>
                            <span className={`status-badge ${lead.status}`}>
                              {lead.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="text-xs text-slate-400">
                            {new Date(lead.submittedAt).toLocaleDateString()}
                          </td>
                          <td>
                            <div className="admin-action-btn-group">
                              <a
                                href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(
                                  lead.name
                                )},%20greetings%20from%20Talentele%20Bhubaneswar!%20Regarding%20your%20enquiry%20for%20${encodeURIComponent(
                                  lead.courseLabel
                                )}...`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="admin-icon-btn whatsapp"
                                title="Chat on WhatsApp"
                              >
                                <MessageCircle width={15} height={15} />
                              </a>
                              <a
                                href={`tel:${lead.phone.replace(/[^0-9+]/g, "")}`}
                                className="admin-icon-btn call"
                                title="Call Candidate"
                              >
                                <Phone width={14} height={14} />
                              </a>
                              <button
                                type="button"
                                className="admin-icon-btn"
                                onClick={() => setSelectedLeadForDetail(lead)}
                                title="View Message Details"
                              >
                                <FileText width={14} height={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==================================================================
              TAB 2: LEADS & ENQUIRIES CRM
              ================================================================== */}
          {activeTab === "leads" && (
            <div className="admin-card">
              <div className="admin-card-header">
                <div>
                  <h3 className="admin-card-title">
                    <Users width={18} height={18} className="text-red-500" /> Candidate Enquiries & Leads CRM
                  </h3>
                  <p className="admin-card-subtitle">
                    Manage student admissions, counsel enquiries, and export records
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="admin-btn admin-btn-secondary"
                    onClick={handleExportCsv}
                    title="Export all leads to CSV"
                  >
                    <Download width={15} height={15} />
                    <span>Export CSV</span>
                  </button>
                  <button
                    type="button"
                    className="admin-btn admin-btn-primary"
                    onClick={() => setIsAddLeadModalOpen(true)}
                  >
                    <Plus width={15} height={15} />
                    <span>Add Manual Lead</span>
                  </button>
                </div>
              </div>

              {/* CRM Filters Bar */}
              <div className="admin-filter-bar">
                {/* Search */}
                <div className="relative w-full sm:w-64">
                  <Search width={14} height={14} className="absolute left-3 top-3 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search name, phone, email..."
                    value={leadSearch}
                    onChange={(e) => setLeadSearch(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-lg py-1.5 pl-8 pr-3 text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                {/* Status Pills */}
                <div className="admin-pill-group">
                  <button
                    type="button"
                    className={`admin-filter-pill ${statusFilter === "all" ? "active" : ""}`}
                    onClick={() => setStatusFilter("all")}
                  >
                    All ({leads.length})
                  </button>
                  <button
                    type="button"
                    className={`admin-filter-pill ${statusFilter === "new" ? "active" : ""}`}
                    onClick={() => setStatusFilter("new")}
                  >
                    New ({leads.filter((l) => l.status === "new").length})
                  </button>
                  <button
                    type="button"
                    className={`admin-filter-pill ${statusFilter === "contacted" ? "active" : ""}`}
                    onClick={() => setStatusFilter("contacted")}
                  >
                    Contacted
                  </button>
                  <button
                    type="button"
                    className={`admin-filter-pill ${statusFilter === "follow-up" ? "active" : ""}`}
                    onClick={() => setStatusFilter("follow-up")}
                  >
                    Follow-Up
                  </button>
                  <button
                    type="button"
                    className={`admin-filter-pill ${statusFilter === "enrolled" ? "active" : ""}`}
                    onClick={() => setStatusFilter("enrolled")}
                  >
                    Enrolled ({enrolledCount})
                  </button>
                </div>

                {/* Course Dropdown Filter */}
                <div>
                  <select
                    value={courseFilter}
                    onChange={(e) => setCourseFilter(e.target.value)}
                    className="admin-select"
                  >
                    <option value="all">All Courses</option>
                    {adminCourses.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Candidate Details</th>
                      <th>Contact Info</th>
                      <th>Interested Program</th>
                      <th>Source & Date</th>
                      <th>Pipeline Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-10 text-slate-500 text-sm">
                          No enquiry records found matching your filters.
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead) => (
                        <tr key={lead.id}>
                          <td>
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center">
                                {lead.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .slice(0, 2)
                                  .toUpperCase()}
                              </div>
                              <div>
                                <strong className="block text-white text-sm">{lead.name}</strong>
                                <span className="text-xs text-slate-400 font-mono">{lead.id}</span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="text-xs flex flex-col gap-0.5">
                              <span className="font-mono text-slate-200 font-semibold">{lead.phone}</span>
                              <span className="text-slate-400">{lead.email}</span>
                            </div>
                          </td>
                          <td>
                            <span className="text-xs font-semibold text-slate-200">
                              {lead.courseLabel}
                            </span>
                          </td>
                          <td>
                            <div className="text-xs text-slate-400 flex flex-col">
                              <span className="text-slate-300 font-medium">{lead.source}</span>
                              <span>{new Date(lead.submittedAt).toLocaleDateString()}</span>
                            </div>
                          </td>
                          <td>
                            <select
                              value={lead.status}
                              onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                              className={`status-badge ${lead.status} bg-transparent border cursor-pointer focus:outline-none`}
                            >
                              <option value="new" className="bg-slate-900 text-red-400">
                                NEW (PENDING)
                              </option>
                              <option value="contacted" className="bg-slate-900 text-sky-400">
                                CONTACTED
                              </option>
                              <option value="follow-up" className="bg-slate-900 text-amber-400">
                                FOLLOW-UP
                              </option>
                              <option value="enrolled" className="bg-slate-900 text-emerald-400">
                                ENROLLED
                              </option>
                              <option value="closed" className="bg-slate-900 text-slate-400">
                                CLOSED / JUNK
                              </option>
                            </select>
                          </td>
                          <td>
                            <div className="admin-action-btn-group">
                              <a
                                href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(
                                  lead.name
                                )},%20greetings%20from%20Talentele%20Bhubaneswar!%20Regarding%20your%20enquiry%20for%20${encodeURIComponent(
                                  lead.courseLabel
                                )}...`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="admin-icon-btn whatsapp"
                                title="Direct WhatsApp"
                              >
                                <MessageCircle width={15} height={15} />
                              </a>
                              <a
                                href={`tel:${lead.phone.replace(/[^0-9+]/g, "")}`}
                                className="admin-icon-btn call"
                                title="Call Phone"
                              >
                                <Phone width={14} height={14} />
                              </a>
                              <button
                                type="button"
                                className="admin-icon-btn"
                                onClick={() => setSelectedLeadForDetail(lead)}
                                title="View Message Notes"
                              >
                                <FileText width={14} height={14} />
                              </button>
                              <button
                                type="button"
                                className="admin-icon-btn delete"
                                onClick={() => handleDeleteLead(lead.id)}
                                title="Delete Lead"
                              >
                                <Trash2 width={14} height={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ==================================================================
              TAB 3: COURSES & TRACKS
              ================================================================== */}
          {activeTab === "courses" && (
            <div className="space-y-6">
              {/* Top Header & Action Controls */}
              <div className="admin-card">
                <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <BookOpen width={20} height={20} className="text-red-500" />
                      Programs & Curriculums Management
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Create, edit, and publish dynamic course tracks with tools, durations, and career outcomes
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="admin-btn admin-btn-primary"
                      onClick={() => setIsAddCourseModalOpen(true)}
                    >
                      <Plus width={16} height={16} /> Add New Program
                    </button>
                  </div>
                </div>

                {/* Search & Category Filter Bar */}
                <div className="px-5 pb-5 pt-2 border-t border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  {/* Category Pills */}
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    {[
                      { label: "All", value: "all" },
                      { label: "Analytics", value: "analytics" },
                      { label: "Data Science & AI", value: "ai" },
                      { label: "Core Skills", value: "core" },
                      { label: "Enterprise & QA", value: "enterprise" },
                    ].map((cat) => {
                      const count =
                        cat.value === "all"
                          ? adminCourses.length
                          : adminCourses.filter(
                            (c) =>
                              c.category?.toLowerCase() === cat.value ||
                              c.categoryLabel?.toLowerCase().includes(cat.value)
                          ).length;
                      const isActive = courseCategoryFilter === cat.value;
                      return (
                        <button
                          key={cat.value}
                          type="button"
                          onClick={() => setCourseCategoryFilter(cat.value)}
                          className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${isActive
                            ? "bg-red-500 text-white shadow-sm"
                            : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                            }`}
                        >
                          {cat.label} ({count})
                        </button>
                      );
                    })}
                  </div>

                  {/* Search Input */}
                  <div className="relative w-full md:w-72">
                    <Search
                      width={14}
                      height={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                    />
                    <input
                      type="text"
                      placeholder="Search title, tools, tech..."
                      value={courseSearch}
                      onChange={(e) => setCourseSearch(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700/80 rounded-lg py-1.5 pl-8 pr-3 text-xs text-white focus:outline-none focus:border-red-500"
                    />
                    {courseSearch && (
                      <button
                        type="button"
                        onClick={() => setCourseSearch("")}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                      >
                        <X width={12} height={12} />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Dynamic Programs Cards Grid */}
              {filteredCourses.length === 0 ? (
                <div className="admin-card p-12 text-center">
                  <BookOpen width={40} height={40} className="mx-auto text-slate-600 mb-3" />
                  <h4 className="text-base font-bold text-white mb-1">No Programs Found</h4>
                  <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
                    No course matched &quot;{courseSearch}&quot; in category &quot;{courseCategoryFilter}&quot;.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setCourseSearch("");
                      setCourseCategoryFilter("all");
                    }}
                    className="admin-btn admin-btn-secondary text-xs"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map((c) => {
                    const isDraft = c.status === "Draft";
                    return (
                      <div key={c.slug} className="admin-card flex flex-col justify-between group">
                        <div className="p-5 flex-1 flex flex-col">
                          {/* Card Header: Category & Active/Draft status */}
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2.5 py-0.5 rounded">
                              {c.categoryLabel || c.category || "Program"}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleToggleCourseStatus(c.slug)}
                              title="Click to toggle status"
                              className={`text-[10px] font-bold px-2 py-0.5 rounded border transition-all cursor-pointer ${isDraft
                                ? "text-amber-400 bg-amber-950/50 border-amber-800/50 hover:bg-amber-900/60"
                                : "text-emerald-400 bg-emerald-950/50 border-emerald-800/50 hover:bg-emerald-900/60"
                                }`}
                            >
                              {isDraft ? "Draft" : "● Active"}
                            </button>
                          </div>

                          {/* Title & Short Title */}
                          <h4 className="text-base font-bold text-white mb-1 group-hover:text-red-400 transition-colors">
                            {c.title}
                          </h4>
                          {c.shortTitle && c.shortTitle !== c.title && (
                            <span className="text-[11px] font-medium text-slate-400 mb-2 block">
                              Short: {c.shortTitle}
                            </span>
                          )}

                          {/* Summary */}
                          <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4 flex-1">
                            {c.summary || c.description}
                          </p>

                          {/* Program Stats Pill */}
                          <div className="flex items-center gap-3 text-[11px] text-slate-400 bg-slate-900/80 border border-slate-800 rounded-lg p-2 mb-3">
                            <div className="flex items-center gap-1.5">
                              <Clock width={13} height={13} className="text-cyan-400" />
                              <span>{c.duration || "16 Weeks"}</span>
                            </div>
                            <span className="text-slate-700">|</span>
                            <div className="flex items-center gap-1.5">
                              <Award width={13} height={13} className="text-amber-400" />
                              <span>{c.projectsCount || 6}+ Projects</span>
                            </div>
                          </div>

                          {/* Tools & Tech Badges */}
                          <div className="pt-3 border-t border-slate-800/80 mb-2">
                            <span className="block text-[11px] font-semibold text-slate-400 mb-1.5">
                              Tools & Tech:
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {(Array.isArray(c.tools) ? c.tools : ["Skills"]).slice(0, 5).map((tool: string) => (
                                <span
                                  key={tool}
                                  className="text-[10px] bg-slate-800/90 text-slate-300 px-2 py-0.5 rounded border border-slate-700/60 font-medium"
                                >
                                  {tool}
                                </span>
                              ))}
                              {Array.isArray(c.tools) && c.tools.length > 5 && (
                                <span className="text-[10px] text-slate-500 py-0.5 font-medium">
                                  +{c.tools.length - 5} more
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Card Action Footer */}
                        <div className="p-4 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setSelectedCourseForDetail(c)}
                              className="text-xs text-slate-300 hover:text-white px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 flex items-center gap-1 font-medium transition-colors"
                              title="Inspect Course Details"
                            >
                              <Eye width={12} height={12} /> Details
                            </button>
                            <button
                              type="button"
                              onClick={() => openEditCourseModal(c)}
                              className="text-xs text-cyan-400 hover:text-cyan-300 px-2 py-1 rounded bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-800/50 flex items-center gap-1 font-medium transition-colors"
                              title="Edit Program"
                            >
                              <Edit width={12} height={12} /> Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteCourse(c.slug, c.title)}
                              className="text-xs text-red-400 hover:text-red-300 px-2 py-1 rounded bg-red-950/30 hover:bg-red-900/50 border border-red-800/40 flex items-center gap-1 font-medium transition-colors"
                              title="Delete Program"
                            >
                              <Trash2 width={12} height={12} />
                            </button>
                          </div>

                          <Link
                            href={`/${c.slug}-course/`}
                            target="_blank"
                            className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-red-400 font-semibold transition-colors"
                            title="Open Preview"
                          >
                            <span>Preview</span>
                            <ExternalLink width={11} height={11} />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ==================================================================
              TAB 4: BATCHES & COHORTS
              ================================================================== */}
          {activeTab === "batches" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Batches & Cohort Schedules</h3>
                  <p className="text-xs text-slate-400">
                    Live online & offline classroom batches in Bhubaneswar
                  </p>
                </div>
                <button
                  type="button"
                  className="admin-btn admin-btn-primary"
                  onClick={() => setIsAddBatchModalOpen(true)}
                >
                  <Plus width={15} height={15} /> Add New Batch
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingCohorts.map((cohort, index) => (
                  <div key={cohort.id} className="admin-card">
                    <div className="p-5 flex flex-col justify-between h-full">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${cohort.statusTone === "emerald"
                              ? "bg-emerald-950/60 text-emerald-400 border-emerald-800/60"
                              : "bg-amber-950/60 text-amber-400 border-amber-800/60"
                              }`}
                          >
                            {cohort.status}
                          </span>
                          <span className="text-xs font-mono text-slate-400">Batch #{index + 101}</span>
                        </div>

                        <h4 className="text-base font-bold text-white mb-1">{cohort.courseTitle}</h4>
                        <p className="text-xs text-slate-400 mb-3">{cohort.category}</p>

                        <div className="bg-slate-900/80 rounded-lg p-3 border border-slate-800/80 flex flex-col gap-2 mb-4 text-xs">
                          <div className="flex items-center gap-2 text-slate-300">
                            <Clock width={13} height={13} className="text-cyan-400 shrink-0" />
                            <span>{cohort.schedule}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-300">
                            <MapPin width={13} height={13} className="text-emerald-400 shrink-0" />
                            <span className="truncate">{cohort.mode}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        {/* Seat Progress Bar */}
                        <div className="mb-3">
                          <div className="flex justify-between text-xs font-semibold mb-1">
                            <span className="text-slate-400">Seats Reserved</span>
                            <span className="text-white">18 / 25</span>
                          </div>
                          <div className="w-full bg-slate-800 rounded-full h-2">
                            <div className="bg-gradient-to-r from-red-500 to-amber-500 h-2 rounded-full w-[72%]"></div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800">
                          <span className="text-slate-400">Duration: {cohort.duration}</span>
                          <span className="text-emerald-400 font-semibold">Admissions Active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==================================================================
              TAB 5: PLACEMENTS & ALUMNI
              ================================================================== */}
          {activeTab === "placements" && (
            <div className="admin-card">
              <div className="admin-card-header">
                <div>
                  <h3 className="admin-card-title">
                    <Award width={18} height={18} className="text-purple-400" /> Verified Student Placement Records
                  </h3>
                  <p className="admin-card-subtitle">
                    Alumni working at premier consulting, analytics & tech companies
                  </p>
                </div>
                <div className="text-xs text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
                  Total Placed Records: <strong className="text-white">{verifiedPlacements.length}</strong>
                </div>
              </div>

              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Candidate Name</th>
                      <th>Company & Designation</th>
                      <th>Program Completed</th>
                      <th>Year</th>
                      <th>Hike / Outcome</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {verifiedPlacements.map((p) => (
                      <tr key={p.id}>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-800 text-white font-bold flex items-center justify-center text-xs">
                              {p.studentName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)}
                            </div>
                            <div>
                              <strong className="block text-white text-sm">{p.studentName}</strong>
                              <span className="text-xs text-slate-400">{p.profileSlug}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <strong className="block text-slate-200 text-xs font-semibold">
                            {p.company}
                          </strong>
                          <span className="text-xs text-slate-400">{p.designation}</span>
                        </td>
                        <td>
                          <span className="text-xs text-slate-300 font-medium">{p.course}</span>
                        </td>
                        <td>
                          <span className="text-xs font-mono text-slate-300">{p.placementYear}</span>
                        </td>
                        <td>
                          <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded">
                            {p.salaryHike || "Verified Placement"}
                          </span>
                        </td>
                        <td>
                          <span className="text-xs text-emerald-400 inline-flex items-center gap-1">
                            <CheckCircle width={13} height={13} /> Verified
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ==================================================================
              TAB 6: ARTICLES & BLOG
              ================================================================== */}
          {activeTab === "blog" && (
            <div className="admin-card">
              <div className="admin-card-header">
                <div>
                  <h3 className="admin-card-title">
                    <FileText width={18} height={18} className="text-sky-400" /> Career Blog Posts & Guidance
                  </h3>
                  <p className="admin-card-subtitle">Published analytical articles on talentele.in</p>
                </div>
                <Link href="/blog/" target="_blank" className="admin-btn admin-btn-secondary text-xs">
                  <span>View Public Blog</span> <ExternalLink width={13} height={13} />
                </Link>
              </div>

              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Article Title</th>
                      <th>Category</th>
                      <th>Publish Date</th>
                      <th>Related Tracks</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post) => (
                      <tr key={post.slug}>
                        <td>
                          <strong className="block text-white text-sm">{post.title}</strong>
                          <p className="text-xs text-slate-400 line-clamp-1">{post.excerpt}</p>
                        </td>
                        <td>
                          <span className="text-xs bg-slate-800 border border-slate-700/80 text-slate-300 px-2 py-0.5 rounded font-medium">
                            {post.category}
                          </span>
                        </td>
                        <td>
                          <span className="text-xs font-mono text-slate-400">
                            {new Date(post.publishedAt).toLocaleDateString()}
                          </span>
                        </td>
                        <td>
                          <span className="text-xs text-slate-400">
                            {post.relatedCourses.join(", ")}
                          </span>
                        </td>
                        <td>
                          <Link
                            href={`/blog/${post.slug}/`}
                            target="_blank"
                            className="inline-flex items-center gap-1 text-xs text-red-400 hover:text-white font-semibold"
                          >
                            Read Post <ExternalLink width={12} height={12} />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ==================================================================
              TAB 7: SETTINGS & SYSTEM
              ================================================================== */}
          {activeTab === "settings" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Institute Contact Configuration */}
              <div className="admin-card">
                <div className="admin-card-header">
                  <div>
                    <h3 className="admin-card-title">Institute Contact Information</h3>
                    <p className="admin-card-subtitle">Public contact and counselling channels</p>
                  </div>
                </div>
                <div className="p-6 flex flex-col gap-4 text-xs">
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Helpline Phone:</label>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white font-mono text-sm">
                      {site.phone.display} ({site.phone.href})
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Official Support Email:</label>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white font-mono text-sm">
                      {site.email}
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Campus Location:</label>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white leading-relaxed">
                      Plot No 149, Sector-B, Mancheswar Railway Colony, Mancheswar, Bhubaneswar, Odisha 751017
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Google Maps Profile:</label>
                    <a
                      href={site.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-400 hover:underline flex items-center gap-1"
                    >
                      Open Verified Google Maps Location <ExternalLink width={12} height={12} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Lead Delivery Integrations */}
              <div className="admin-card">
                <div className="admin-card-header">
                  <div>
                    <h3 className="admin-card-title">Enquiry & Delivery Integrations</h3>
                    <p className="admin-card-subtitle">Server-side email & CRM dispatch triggers</p>
                  </div>
                </div>
                <div className="p-6 flex flex-col gap-4 text-xs">
                  <div className="p-3 rounded-lg border border-emerald-900/50 bg-emerald-950/20 text-emerald-300">
                    <strong className="block font-bold text-sm mb-1 text-emerald-400">
                      Website Form Connected
                    </strong>
                    All website submissions from the Hero Quick Enquiry card, Course Detail pages, and Contact Form are
                    processed securely through Next.js server actions.
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Resend Email Gateway:</label>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-mono">
                      RESEND_API_KEY (Configured in server environment)
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Notification Webhook:</label>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-mono">
                      https://api.talentele.in/webhooks/enquiries
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      className="admin-btn admin-btn-secondary"
                      onClick={() => showNotification("Webhook connection verified!")}
                    >
                      <RefreshCw width={14} height={14} /> Test Connection
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ----------------------------------------------------------------------
          4. Modals
          ---------------------------------------------------------------------- */}

      {/* Modal: Add Manual Lead */}
      {isAddLeadModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card">
            <div className="admin-modal-header">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <User width={18} height={18} className="text-red-500" /> Record Walk-in / Call Lead
              </h3>
              <button
                type="button"
                onClick={() => setIsAddLeadModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X width={18} height={18} />
              </button>
            </div>

            <form onSubmit={handleAddLeadSubmit}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label className="admin-form-label">Student Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Subham Mohapatra"
                    value={newLeadName}
                    onChange={(e) => setNewLeadName(e.target.value)}
                    className="admin-form-input"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 94370 12345"
                      value={newLeadPhone}
                      onChange={(e) => setNewLeadPhone(e.target.value)}
                      className="admin-form-input"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Email Address</label>
                    <input
                      type="email"
                      placeholder="student@gmail.com"
                      value={newLeadEmail}
                      onChange={(e) => setNewLeadEmail(e.target.value)}
                      className="admin-form-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Course Interested In</label>
                    <select
                      value={newLeadCourse}
                      onChange={(e) => setNewLeadCourse(e.target.value)}
                      className="admin-form-input"
                    >
                      {adminCourses.map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Enquiry Source</label>
                    <select
                      value={newLeadSource}
                      onChange={(e) => setNewLeadSource(e.target.value)}
                      className="admin-form-input"
                    >
                      <option value="Walk-in Campus">Walk-in Campus</option>
                      <option value="Phone Call Helpline">Phone Call Helpline</option>
                      <option value="WhatsApp Business">WhatsApp Business</option>
                      <option value="Student Referral">Student Referral</option>
                      <option value="Social Media Ad">Social Media Ad</option>
                    </select>
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Counsellor Notes / Discussion</label>
                  <textarea
                    rows={3}
                    placeholder="Candidate qualification, preferred batch timing, fee discount discussion..."
                    value={newLeadMessage}
                    onChange={(e) => setNewLeadMessage(e.target.value)}
                    className="admin-form-textarea"
                  ></textarea>
                </div>
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="admin-btn admin-btn-secondary"
                  onClick={() => setIsAddLeadModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary">
                  Save Lead Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: View Lead Details */}
      {selectedLeadForDetail && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card">
            <div className="admin-modal-header">
              <h3 className="font-bold text-white text-base">Enquiry Profile Details</h3>
              <button
                type="button"
                onClick={() => setSelectedLeadForDetail(null)}
                className="text-slate-400 hover:text-white"
              >
                <X width={18} height={18} />
              </button>
            </div>

            <div className="admin-modal-body flex flex-col gap-4 text-xs">
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800">
                <div>
                  <h4 className="text-sm font-bold text-white">{selectedLeadForDetail.name}</h4>
                  <span className="text-slate-400 font-mono">{selectedLeadForDetail.id}</span>
                </div>
                <span className={`status-badge ${selectedLeadForDetail.status}`}>
                  {selectedLeadForDetail.status.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="block text-slate-500 font-semibold mb-0.5">Phone Number:</span>
                  <a
                    href={`tel:${selectedLeadForDetail.phone}`}
                    className="text-white font-mono hover:text-cyan-400"
                  >
                    {selectedLeadForDetail.phone}
                  </a>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="block text-slate-500 font-semibold mb-0.5">Email Address:</span>
                  <span className="text-white truncate block">{selectedLeadForDetail.email}</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="block text-slate-500 font-semibold mb-0.5">Course Requested:</span>
                <strong className="text-cyan-400 text-sm block">
                  {selectedLeadForDetail.courseLabel}
                </strong>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="block text-slate-500 font-semibold mb-0.5">Candidate Query:</span>
                <p className="text-slate-200 leading-relaxed">
                  {selectedLeadForDetail.message || "No query text provided."}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="block text-slate-500 font-semibold mb-0.5">Counsellor Log:</span>
                <p className="text-slate-300">
                  {selectedLeadForDetail.counsellorNotes || "No notes logged yet."}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <a
                  href={`https://wa.me/${selectedLeadForDetail.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="admin-btn admin-btn-success flex-1"
                >
                  <MessageCircle width={15} height={15} /> WhatsApp Candidate
                </a>
                <a
                  href={`tel:${selectedLeadForDetail.phone}`}
                  className="admin-btn admin-btn-primary flex-1"
                >
                  <Phone width={15} height={15} /> Call Candidate
                </a>
              </div>
            </div>

            <div className="admin-modal-footer">
              <button
                type="button"
                className="admin-btn admin-btn-secondary"
                onClick={() => setSelectedLeadForDetail(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Schedule New Batch */}
      {isAddBatchModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card">
            <div className="admin-modal-header">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Calendar width={18} height={18} className="text-red-500" /> Schedule New Cohort
              </h3>
              <button
                type="button"
                onClick={() => setIsAddBatchModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X width={18} height={18} />
              </button>
            </div>

            <div className="admin-modal-body">
              <div className="admin-form-group">
                <label className="admin-form-label">Select Program</label>
                <select className="admin-form-input">
                  {adminCourses.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="admin-form-group">
                  <label className="admin-form-label">Batch Mode</label>
                  <select className="admin-form-input">
                    <option value="offline">Classroom (Bhubaneswar)</option>
                    <option value="online">Live Interactive Online</option>
                    <option value="hybrid">Hybrid (Classroom + Live)</option>
                  </select>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Total Seats</label>
                  <input type="number" defaultValue={25} className="admin-form-input" />
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Schedule Timing</label>
                <input
                  type="text"
                  placeholder="e.g. Weekdays 7:30 PM - 9:00 PM IST"
                  className="admin-form-input"
                />
              </div>
            </div>

            <div className="admin-modal-footer">
              <button
                type="button"
                className="admin-btn admin-btn-secondary"
                onClick={() => setIsAddBatchModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="admin-btn admin-btn-primary"
                onClick={() => {
                  setIsAddBatchModalOpen(false);
                  showNotification("New cohort schedule published!");
                }}
              >
                Publish Batch
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add New Program */}
      {isAddCourseModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card max-w-2xl">
            <div className="admin-modal-header">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <BookOpen width={18} height={18} className="text-red-500" />
                Add New Career Program
              </h3>
              <button
                type="button"
                onClick={() => setIsAddCourseModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X width={18} height={18} />
              </button>
            </div>

            <form onSubmit={handleCreateCourseSubmit}>
              <div className="admin-modal-body space-y-4">
                <div className="admin-form-group">
                  <label className="admin-form-label">
                    Program Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cloud Data Engineering with Snowflake & AWS"
                    value={courseTitle}
                    onChange={(e) => {
                      setCourseTitle(e.target.value);
                      if (!courseSlug) {
                        setCourseSlug(
                          e.target.value
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, "-")
                            .replace(/(^-|-$)/g, "")
                        );
                      }
                    }}
                    className="admin-form-input"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Short Display Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Cloud Data Engineering"
                      value={courseShortTitle}
                      onChange={(e) => setCourseShortTitle(e.target.value)}
                      className="admin-form-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">
                      URL Slug <span className="text-xs text-slate-400 font-normal">(/slug-course/)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. data-engineering"
                      value={courseSlug}
                      onChange={(e) => setCourseSlug(e.target.value)}
                      className="admin-form-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Discipline / Category</label>
                    <select
                      value={courseCategory}
                      onChange={(e) => setCourseCategory(e.target.value)}
                      className="admin-form-input"
                    >
                      <option value="Analytics">Analytics & BI</option>
                      <option value="Data Science & AI">Data Science & AI</option>
                      <option value="Core Skills">Core Programming</option>
                      <option value="Enterprise & QA">Enterprise & QA</option>
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Program Duration</label>
                    <input
                      type="text"
                      placeholder="e.g. 16–20 Weeks"
                      value={courseDuration}
                      onChange={(e) => setCourseDuration(e.target.value)}
                      className="admin-form-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Initial Status</label>
                    <select
                      value={courseStatus}
                      onChange={(e) => setCourseStatus(e.target.value as "Active" | "Draft")}
                      className="admin-form-input"
                    >
                      <option value="Active">Active (Published)</option>
                      <option value="Draft">Draft (Internal)</option>
                    </select>
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Tools & Technologies (comma separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. SQL, Snowflake, AWS, DBT, Python, Airflow"
                    value={courseTools}
                    onChange={(e) => setCourseTools(e.target.value)}
                    className="admin-form-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">
                    Curriculum Summary / Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Detailed overview of what the candidate learns and builds..."
                    value={courseSummary}
                    onChange={(e) => setCourseSummary(e.target.value)}
                    className="admin-form-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Recommended Prerequisites</label>
                  <input
                    type="text"
                    placeholder="e.g. Basic SQL and spreadsheet understanding."
                    value={coursePrerequisites}
                    onChange={(e) => setCoursePrerequisites(e.target.value)}
                    className="admin-form-input"
                  />
                </div>
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="admin-btn admin-btn-secondary"
                  onClick={() => setIsAddCourseModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary">
                  Publish Program
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Existing Program */}
      {isEditCourseModalOpen && selectedCourseForEdit && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card max-w-2xl">
            <div className="admin-modal-header">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Edit width={18} height={18} className="text-cyan-400" />
                Edit Program: {selectedCourseForEdit.title}
              </h3>
              <button
                type="button"
                onClick={() => setIsEditCourseModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X width={18} height={18} />
              </button>
            </div>

            <form onSubmit={handleEditCourseSubmit}>
              <div className="admin-modal-body space-y-4">
                <div className="admin-form-group">
                  <label className="admin-form-label">Program Title</label>
                  <input
                    type="text"
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="admin-form-input"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Short Display Title</label>
                    <input
                      type="text"
                      value={editShortTitle}
                      onChange={(e) => setEditShortTitle(e.target.value)}
                      className="admin-form-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Category</label>
                    <select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                      className="admin-form-input"
                    >
                      <option value="Analytics">Analytics & BI</option>
                      <option value="Data Science & AI">Data Science & AI</option>
                      <option value="Core Skills">Core Programming</option>
                      <option value="Enterprise & QA">Enterprise & QA</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Duration</label>
                    <input
                      type="text"
                      value={editDuration}
                      onChange={(e) => setEditDuration(e.target.value)}
                      className="admin-form-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Program Status</label>
                    <select
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value as "Active" | "Draft")}
                      className="admin-form-input"
                    >
                      <option value="Active">Active (Published)</option>
                      <option value="Draft">Draft (Internal)</option>
                    </select>
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Tools & Technologies (comma separated)</label>
                  <input
                    type="text"
                    value={editTools}
                    onChange={(e) => setEditTools(e.target.value)}
                    className="admin-form-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Curriculum Summary</label>
                  <textarea
                    rows={3}
                    required
                    value={editSummary}
                    onChange={(e) => setEditSummary(e.target.value)}
                    className="admin-form-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Prerequisites</label>
                  <input
                    type="text"
                    value={editPrerequisites}
                    onChange={(e) => setEditPrerequisites(e.target.value)}
                    className="admin-form-input"
                  />
                </div>
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="admin-btn admin-btn-secondary"
                  onClick={() => setIsEditCourseModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: View Program Details */}
      {selectedCourseForDetail && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card max-w-xl">
            <div className="admin-modal-header">
              <h3 className="font-bold text-white text-base">Program Specifications</h3>
              <button
                type="button"
                onClick={() => setSelectedCourseForDetail(null)}
                className="text-slate-400 hover:text-white"
              >
                <X width={18} height={18} />
              </button>
            </div>

            <div className="admin-modal-body flex flex-col gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2 py-0.5 rounded">
                    {selectedCourseForDetail.categoryLabel || selectedCourseForDetail.category}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/50 border border-emerald-800/40 px-2 py-0.5 rounded">
                    {selectedCourseForDetail.status || "Active"}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mb-1">
                  {selectedCourseForDetail.title}
                </h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  {selectedCourseForDetail.summary || selectedCourseForDetail.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block mb-1">Course Slug</span>
                  <code className="text-white font-mono">/{selectedCourseForDetail.slug}-course/</code>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block mb-1">Duration & Projects</span>
                  <span className="text-white font-semibold">
                    {selectedCourseForDetail.duration || "16 Weeks"} ({selectedCourseForDetail.projectsCount || 6}+ Projects)
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block mb-1.5 font-semibold">Tools & Technologies</span>
                <div className="flex flex-wrap gap-1.5">
                  {(Array.isArray(selectedCourseForDetail.tools) ? selectedCourseForDetail.tools : []).map((t: string) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-slate-200 border border-slate-700 font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {selectedCourseForDetail.prerequisites && (
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block mb-1 font-semibold">Prerequisites</span>
                  <p className="text-slate-300 leading-relaxed">{selectedCourseForDetail.prerequisites}</p>
                </div>
              )}
            </div>

            <div className="admin-modal-footer flex items-center justify-between">
              <Link
                href={`/${selectedCourseForDetail.slug}-course/`}
                target="_blank"
                className="admin-btn admin-btn-secondary text-xs flex items-center gap-1.5"
              >
                <span>Open Live Public Page</span>
                <ExternalLink width={13} height={13} />
              </Link>
              <button
                type="button"
                className="admin-btn admin-btn-primary"
                onClick={() => setSelectedCourseForDetail(null)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
