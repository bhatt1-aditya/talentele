"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { startTransition, useActionState, useEffect, useRef, useState, type FormEvent } from "react";

import { submitEnquiry, type EnquiryState } from "@/app/contact-us/actions";
import { ArrowRight } from "@/components/common/Icons";
import { courses } from "@/data/courses";
import { site } from "@/data/site";
import { cn } from "@/lib/utilities";
import { GENERAL_GUIDANCE, validateEnquiry, type EnquiryErrors, type EnquiryField } from "@/lib/validation";

const initialState: EnquiryState = { status: "idle" };
const courseSlugs: readonly string[] = courses.map((c) => c.slug);
const fieldOrder: EnquiryField[] = ["name", "email", "phone", "course", "message", "consent"];

const inputClass =
  "mt-2 block w-full min-h-12 rounded-lg border bg-white px-4 text-sm text-[#101828] placeholder-[#929daf] transition-all focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-xs font-semibold text-red-600">
      {message}
    </p>
  );
}

type EnquiryFormProps = { defaultCourse?: string };

export function EnquiryForm({ defaultCourse = "" }: EnquiryFormProps) {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState);
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    course: courseSlugs.includes(defaultCourse) ? defaultCourse : "",
    message: "",
    consent: false,
  });
  const [clientErrors, setClientErrors] = useState<EnquiryErrors>({});
  const [lastServerState, setLastServerState] = useState(state);
  const formRef = useRef<HTMLFormElement>(null);
  const startedAt = useRef(0);
  const statusRef = useRef<HTMLDivElement>(null);

  // Server-side validation errors replace client errors when a new result arrives.
  if (state !== lastServerState) {
    setLastServerState(state);
    setClientErrors(state.errors ?? {});
  }
  const errors = clientErrors;

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (state.status === "failed" || state.status === "not-configured") statusRef.current?.focus();
  }, [state]);

  const update = (field: EnquiryField, value: string | boolean) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setClientErrors((e) => ({ ...e, [field]: undefined }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending) return;
    const found = validateEnquiry(values, courseSlugs);
    if (Object.keys(found).length > 0) {
      setClientErrors(found);
      const first = fieldOrder.find((f) => found[f]);
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    const formData = new FormData(event.currentTarget);
    formData.set("started_at", String(startedAt.current));
    startTransition(() => formAction(formData));
  };

  const describedBy = (field: EnquiryField, hint?: string) =>
    [hint, errors[field] ? `${field}-error` : undefined].filter(Boolean).join(" ") || undefined;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby="form-privacy" className="space-y-6">
      {(state.status === "failed" || state.status === "not-configured") && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="rounded-xl border border-red-500/30 bg-red-50 p-5 text-[#101828] focus:outline-none"
        >
          <p className="font-bold text-red-700">
            {state.status === "not-configured"
              ? "Online enquiries are temporarily unavailable."
              : "Sorry — your enquiry could not be sent."}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-[#55555f]">
            {state.status === "not-configured" ? "Your details have not been sent. " : "Please try again in a moment, or "}
            contact the team directly on{" "}
            <a href={site.phone.href} className="font-bold text-red-600 underline underline-offset-2">
              {site.phone.display}
            </a>{" "}
            or{" "}
            <a href={`mailto:${site.email}`} className="font-bold text-red-600 underline underline-offset-2">
              {site.email}
            </a>
            .
          </p>
        </div>
      )}

      {/* Spam protection honeypot (using non-autofill name to prevent browser autofill triggers) */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0, overflow: "hidden" }}>
        <label htmlFor="_hp_check">Leave this field blank</label>
        <input
          id="_hp_check"
          type="text"
          name="_hp_check"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-[#101828]">
            Full Name <span className="text-red-600" aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="e.g. Rahul Sharma"
            autoComplete="name"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            className={cn(inputClass, errors.name ? "border-red-500 ring-2 ring-red-500/20" : "border-[#e4e8f0]")}
          />
          <FieldError id="name-error" message={errors.name} />
        </div>

        <div>
          <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-[#101828]">
            Email Address <span className="text-red-600" aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="rahul@example.com"
            inputMode="email"
            autoComplete="email"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            className={cn(inputClass, errors.email ? "border-red-500 ring-2 ring-red-500/20" : "border-[#e4e8f0]")}
          />
          <FieldError id="email-error" message={errors.email} />
        </div>

        <div>
          <label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-[#101828]">
            Mobile Number <span className="text-red-600" aria-hidden="true">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+91 98765 43210"
            inputMode="tel"
            autoComplete="tel"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describedBy("phone", "phone-hint")}
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={cn(inputClass, errors.phone ? "border-red-500 ring-2 ring-red-500/20" : "border-[#e4e8f0]")}
          />
          <p id="phone-hint" className="mt-1.5 text-[11px] text-[#667085]">
            10-digit Indian mobile number
          </p>
          <FieldError id="phone-error" message={errors.phone} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="course" className="text-xs font-bold uppercase tracking-wider text-[#101828]">
            Interested Program <span className="text-red-600" aria-hidden="true">*</span>
          </label>
          <select
            id="course"
            name="course"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.course)}
            aria-describedby={describedBy("course")}
            value={values.course}
            onChange={(e) => update("course", e.target.value)}
            className={cn(
              inputClass,
              "appearance-none bg-[length:18px] bg-[right_1rem_center] bg-no-repeat pr-12 cursor-pointer",
              errors.course ? "border-red-500 ring-2 ring-red-500/20" : "border-[#e4e8f0]"
            )}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23101828' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
            }}
          >
            <option value="" disabled>
              Select a course track
            </option>
            {courses.map((course) => (
              <option key={course.slug} value={course.slug}>
                {course.title}
              </option>
            ))}
            <option value={GENERAL_GUIDANCE}>Not sure yet — I need career counselling</option>
          </select>
          <FieldError id="course-error" message={errors.course} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-[#101828]">
            Your Message <span className="font-normal text-[#667085] normal-case">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            maxLength={1000}
            placeholder="Tell us about your background, current college/company, or specific questions..."
            aria-invalid={Boolean(errors.message)}
            aria-describedby={describedBy("message", "message-hint")}
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            className={cn(inputClass, "py-3", errors.message ? "border-red-500 ring-2 ring-red-500/20" : "border-[#e4e8f0]")}
          />
          <FieldError id="message-error" message={errors.message} />
        </div>
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={describedBy("consent")}
            checked={values.consent}
            onChange={(e) => update("consent", e.target.checked)}
            className="mt-1 size-4 shrink-0 rounded border-[#e4e8f0] text-red-600 focus:ring-red-500 accent-red-600"
          />
          <label htmlFor="consent" className="text-xs leading-relaxed text-[#55555f]">
            I agree that Talentele may contact me by phone, email or message regarding my course enquiry, as described in the{" "}
            <Link href="/privacy-policy/" className="font-semibold text-red-600 underline underline-offset-2">
              privacy policy
            </Link>
            .
          </label>
        </div>
        <FieldError id="consent-error" message={errors.consent} />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={pending}
          aria-busy={pending}
          className="btn-primary w-full sm:w-auto"
        >
          {pending ? (
            <>
              <span aria-hidden="true" className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Submitting Enquiry…
            </>
          ) : (
            <>
              Submit Course Enquiry
              <ArrowRight width={16} height={16} />
            </>
          )}
        </button>

        <p id="form-privacy" className="text-[11px] leading-relaxed text-[#667085]">
          Your details are protected under our{" "}
          <Link href="/privacy-policy/" className="underline underline-offset-2">
            privacy policy
          </Link>
          . No spam, ever.
        </p>
      </div>
    </form>
  );
}

export function EnquiryFormFromParams() {
  const params = useSearchParams();
  return <EnquiryForm defaultCourse={params.get("course") ?? ""} />;
}
