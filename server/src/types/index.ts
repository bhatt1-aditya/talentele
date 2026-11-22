export type LeadStatus = "new" | "contacted" | "follow-up" | "enrolled" | "closed";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  course: string;
  courseLabel: string;
  source: string;
  status: LeadStatus;
  message?: string;
  counsellorNotes?: string;
  submittedAt: string;
  updatedAt?: string;
}

export interface CreateLeadDto {
  name: string;
  phone: string;
  email: string;
  course: string;
  courseLabel?: string;
  source?: string;
  message?: string;
}

export interface UpdateLeadDto {
  name?: string;
  phone?: string;
  email?: string;
  course?: string;
  courseLabel?: string;
  source?: string;
  status?: LeadStatus;
  message?: string;
  counsellorNotes?: string;
}

export interface Cohort {
  id: string;
  slug: string;
  courseTitle: string;
  category: string;
  summary: string;
  tools: string[];
  schedule: string;
  duration: string;
  mode: string;
  status: "Admissions Open" | "Fast-Filling Cohort" | "Upcoming Batch" | "Seats Limited";
  statusTone: "emerald" | "amber" | "blue";
  highlights: string;
  enrolledCount?: number;
  maxSeats?: number;
  startDate?: string;
}

export interface Course {
  slug: string;
  title: string;
  shortTitle: string;
  category: "analytics" | "ai" | "core";
  categoryLabel: string;
  heroHeadline: string;
  description: string;
  duration: string;
  projectsCount: number;
  tools: string[];
  audience: string[];
  prerequisites: string;
  careerRoles: string[];
  faqCount?: number;
}

export interface Placement {
  id: string;
  studentName: string;
  photo: string;
  course: string;
  designation: string;
  company: string;
  companyShort?: string;
  placementYear: string;
  skillsAcquired: string[];
  successStory: string;
  salaryHike?: string;
  verificationStatus: "verified" | "pending";
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: "superadmin" | "counsellor" | "instructor";
  createdAt: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
  };
}

export interface AnalyticsSummary {
  kpis: {
    totalLeads: number;
    newLeads: number;
    followUpLeads: number;
    enrolledLeads: number;
    conversionRate: string;
    activeCohorts: number;
    verifiedPlacements: number;
  };
  leadsByStatus: Record<LeadStatus, number>;
  leadsByCourse: { course: string; courseLabel: string; count: number }[];
  recentLeads: Lead[];
}
