/**
 * Client API Client for communicating with the dedicated Talentele Backend Server.
 * Server default: http://localhost:5000/api/v1
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://talentele-1.onrender.com/api/v1";

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

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const token = typeof window !== "undefined" ? localStorage.getItem("talentele_admin_token") : null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data: ApiResponse<T> = await res.json();
    return data;
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Failed to communicate with backend server",
    };
  }
}

export const serverApi = {
  // Health
  checkHealth: () => request<{ status: string; uptime: number }>("/health"),

  // Auth
  login: (credentials: { email: string; password: string }) =>
    request<{ token: string; user: any }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),

  getProfile: () => request<any>("/auth/me"),

  // Leads CRM
  getLeads: (params?: { search?: string; status?: string; course?: string; page?: number; limit?: number }) => {
    const query = new URLSearchParams();
    if (params?.search) query.set("search", params.search);
    if (params?.status && params.status !== "all") query.set("status", params.status);
    if (params?.course && params.course !== "all") query.set("course", params.course);
    if (params?.page) query.set("page", String(params.page));
    if (params?.limit) query.set("limit", String(params.limit));

    const qs = query.toString();
    return request<any[]>(`/leads${qs ? `?${qs}` : ""}`);
  },

  getLeadById: (id: string) => request<any>(`/leads/${id}`),

  createLead: (data: { name: string; phone: string; email: string; course: string; message?: string; source?: string }) =>
    request<any>("/leads", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateLead: (id: string, updates: Record<string, any>) =>
    request<any>(`/leads/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    }),

  deleteLead: (id: string) =>
    request<any>(`/leads/${id}`, {
      method: "DELETE",
    }),

  getExportCsvUrl: (status?: string, course?: string) => {
    const query = new URLSearchParams();
    if (status && status !== "all") query.set("status", status);
    if (course && course !== "all") query.set("course", course);
    const qs = query.toString();
    return `${API_BASE_URL}/leads/export${qs ? `?${qs}` : ""}`;
  },

  // Batches
  getCohorts: () => request<any[]>("/cohorts"),

  createCohort: (cohortData: any) =>
    request<any>("/cohorts", {
      method: "POST",
      body: JSON.stringify(cohortData),
    }),

  // Courses
  getCourses: (category?: string) =>
    request<any[]>(`/courses${category ? `?category=${category}` : ""}`),

  getCourseBySlug: (slug: string) => request<any>(`/courses/${slug}`),

  createCourse: (courseData: any) =>
    request<any>("/courses", {
      method: "POST",
      body: JSON.stringify(courseData),
    }),

  updateCourse: (slug: string, updates: any) =>
    request<any>(`/courses/${slug}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    }),

  deleteCourse: (slug: string) =>
    request<any>(`/courses/${slug}`, {
      method: "DELETE",
    }),

  // Analytics
  getAnalyticsStats: () => request<any>("/analytics/stats"),
};
