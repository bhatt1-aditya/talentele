"use client";

import { useActionState, useEffect, useRef, useState, type FormEvent } from "react";
import { submitEnquiry, type EnquiryState } from "@/app/contact-us/actions";
import { ArrowRight, Check, CheckCircle, ChevronDown, Phone, RotateCcw, Sparkles } from "@/components/common/Icons";
import { GENERAL_GUIDANCE } from "@/lib/validation";
import { serverApi } from "@/lib/server-api";

const initialState: EnquiryState = { status: "idle" };

export const allCourseOptions = [
  { label: "Help Me Choose A Program", value: GENERAL_GUIDANCE },
  { label: "Data & Business Analytics", value: "data-analytics" },
  { label: "Data Science & Agentic AI + Gen AI", value: "generative-ai" },
  { label: "SAP - ERP", value: "sap" },
  { label: "Digital Marketing", value: GENERAL_GUIDANCE },
  { label: "Business Analytics", value: "business-analytics" },
  { label: "Data Science", value: "data-science" },
  { label: "Software Testing", value: "software-testing" },
  { label: "Python Programming", value: "python" },
  { label: "Power BI & Dashboards", value: "power-bi" },
  { label: "SQL & Databases", value: "sql" },
  { label: "Advanced Excel", value: "excel" },
];

export type QuickEnquiryCardProps = {
  defaultCourse?: string;
  badgeText?: string;
  title?: string;
  subtitle?: string;
  className?: string;
};

export function QuickEnquiryCard({
  defaultCourse,
  badgeText = "FREE CAREER COUNSELLING",
  title = "Start Your Career With Talentele",
  subtitle = "Get free counselling from our experts.",
  className = "",
}: QuickEnquiryCardProps) {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState);
  const startedAtInputRef = useRef<HTMLInputElement>(null);

  // Dynamic Course and Batch State synced with Admin/Server
  const [courseOptions, setCourseOptions] = useState(allCourseOptions);
  const [batchOptions, setBatchOptions] = useState<string[]>([
    "Weekday — upcoming batch",
    "Weekend — upcoming batch",
  ]);

  useEffect(() => {
    // 1. Hydrate courses from localStorage
    try {
      const storedCourses = localStorage.getItem("talentele_admin_courses");
      if (storedCourses) {
        const parsed = JSON.parse(storedCourses);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const dynamicOptions = [
            { label: "Help Me Choose A Program", value: GENERAL_GUIDANCE },
            ...parsed.map((c: any) => ({
              label: c.shortTitle || c.title,
              value: c.slug,
            })),
          ];
          setCourseOptions(dynamicOptions);
        }
      }
    } catch {}

    // 2. Hydrate batches from localStorage
    try {
      const storedCohorts = localStorage.getItem("talentele_admin_cohorts");
      if (storedCohorts) {
        const parsed = JSON.parse(storedCohorts);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const dynamicBatches = parsed.map(
            (b: any) => `${b.courseTitle || b.title} — ${b.schedule || "Upcoming batch"}`
          );
          if (dynamicBatches.length > 0) {
            setBatchOptions([
              "Weekday — upcoming batch",
              "Weekend — upcoming batch",
              ...dynamicBatches,
            ]);
          }
        }
      }
    } catch {}

    // 3. Sync from backend server API
    Promise.allSettled([serverApi.getCourses(), serverApi.getCohorts()]).then(([cRes, bRes]) => {
      if (cRes.status === "fulfilled" && cRes.value.success && Array.isArray(cRes.value.data) && cRes.value.data.length > 0) {
        const dynamicOptions = [
          { label: "Help Me Choose A Program", value: GENERAL_GUIDANCE },
          ...cRes.value.data.map((c: any) => ({
            label: c.shortTitle || c.title,
            value: c.slug,
          })),
        ];
        setCourseOptions(dynamicOptions);
        try {
          localStorage.setItem("talentele_admin_courses", JSON.stringify(cRes.value.data));
        } catch {}
      }

      if (bRes.status === "fulfilled" && bRes.value.success && Array.isArray(bRes.value.data) && bRes.value.data.length > 0) {
        const dynamicBatches = bRes.value.data.map(
          (b: any) => `${b.courseTitle || b.title} — ${b.schedule || "Upcoming batch"}`
        );
        if (dynamicBatches.length > 0) {
          setBatchOptions([
            "Weekday — upcoming batch",
            "Weekend — upcoming batch",
            ...dynamicBatches,
          ]);
        }
        try {
          localStorage.setItem("talentele_admin_cohorts", JSON.stringify(bRes.value.data));
        } catch {}
      }
    });
  }, []);

  function handleClientSubmit(e: FormEvent<HTMLFormElement>) {
    if (!e.currentTarget.checkValidity()) {
      e.preventDefault();
      e.currentTarget.reportValidity();
      return;
    }
    // Populate started_at for honeypot bot detection right before submit
    if (startedAtInputRef.current && !startedAtInputRef.current.value) {
      startedAtInputRef.current.value = String(Date.now() - 4000);
    }
  }

  function handleInteraction() {
    if (startedAtInputRef.current && !startedAtInputRef.current.value) {
      startedAtInputRef.current.value = String(Date.now() - 4000);
    }
  }

  const selectedValue =
    defaultCourse && allCourseOptions.some((opt) => opt.value === defaultCourse)
      ? defaultCourse
      : GENERAL_GUIDANCE;

  if (state.status === "success") {
    return (
      <div className={`enquiry-card enquiry-success-card ${className}`.trim()} id="enquire">
        <div className="enquiry-success-icon-wrap">
          <CheckCircle width={52} height={52} className="enquiry-success-icon" />
        </div>
        <span className="form-badge">ENQUIRY RECEIVED</span>
        <h2>Thank You{state.name ? `, ${state.name}` : ""}!</h2>
        <p className="enquiry-success-msg">
          We have received your request for{" "}
          <strong>{state.courseLabel || "our career program"}</strong>.
          Our senior academic counsellor in Bhubaneswar will call or WhatsApp you shortly with full syllabus, upcoming batch timings and fee details.
        </p>

        <div className="enquiry-success-actions">
          <a href="tel:+917205617787" className="btn-primary enquiry-call-btn">
            <Phone width={16} height={16} /> Call +91 72056 17787
          </a>
          <button
            type="button"
            className="enquiry-reset-btn"
            onClick={() => window.location.reload()}
          >
            <RotateCcw width={14} height={14} /> Submit another enquiry
          </button>
        </div>

        <div className="form-trust">
          <span>
            <Check width={13} height={13} /> 100% Free
          </span>
          <span>
            <Check width={13} height={13} /> No Spam
          </span>
          <span>
            <Check width={13} height={13} /> Expert Guidance
          </span>
        </div>
      </div>
    );
  }

  return (
    <form
      className={`enquiry-card ${className}`.trim()}
      id="enquire"
      action={formAction}
      onSubmit={handleClientSubmit}
      onFocus={handleInteraction}
    >
      {/* Hidden flags: inline thank you & spam protection */}
      <input type="hidden" name="inline" value="true" />
      <input ref={startedAtInputRef} type="hidden" name="started_at" defaultValue="" />
      <input type="hidden" name="consent" value="on" />
      <input
        type="text"
        name="_hp_check"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
        defaultValue=""
      />

      <span className="form-badge">
        <Sparkles width={13} height={13} /> {badgeText}
      </span>
      <h2>{title}</h2>
      <p>{subtitle}</p>

      <label>
        Full Name
        <input
          name="name"
          type="text"
          placeholder="Enter your full name"
          required
          autoComplete="name"
        />
      </label>

      <label>
        Email Address
        <input
          name="email"
          type="email"
          placeholder="you@example.com"
          required
          autoComplete="email"
        />
      </label>

      <label>
        Mobile Number
        <input
          name="phone"
          type="tel"
          placeholder="Enter 10-digit mobile number"
          pattern="[0-9 +()-]{8,18}"
          required
          autoComplete="tel"
        />
      </label>

      <label>
        Course of Interest
        <span className="select-wrap">
          <select name="course" defaultValue={selectedValue} required>
            {courseOptions.map((opt) => (
              <option key={`${opt.label}-${opt.value}`} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown width={17} height={17} />
        </span>
      </label>

      <label>
        Select Preferred Batch
        <span className="select-wrap">
          <select name="batch" defaultValue={batchOptions[0] || "weekday"} required>
            {batchOptions.map((batchName) => (
              <option key={batchName} value={batchName}>
                {batchName}
              </option>
            ))}
          </select>
          <ChevronDown width={17} height={17} />
        </span>
      </label>

      <button className="btn-primary form-submit" type="submit" disabled={pending}>
        {pending ? "Sending..." : "Get Free Counselling "}
        <ArrowRight width={18} height={18} />
      </button>

      {state.status === "invalid" && (
        <p className="form-message error">
          {Object.values(state.errors ?? {})[0] ?? "Please review the highlighted fields."}
        </p>
      )}

      {state.status === "failed" && (
        <p className="form-message error">
          Unable to submit right now. Please call us directly at +91 72056 17787.
        </p>
      )}

      <div className="form-trust">
        {["Free Counselling", "No Spam", "Expert Guidance"].map((badge) => (
          <span key={badge}>
            <Check width={13} height={13} /> {badge}
          </span>
        ))}
      </div>
    </form>
  );
}

export default QuickEnquiryCard;
