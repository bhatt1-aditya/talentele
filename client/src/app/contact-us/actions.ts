"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { courses } from "@/data/courses";
import { deliverEnquiry } from "@/lib/enquiry-delivery";
import { ENQUIRY_COOKIE } from "@/lib/enquiry-cookie";
import {
  GENERAL_GUIDANCE,
  normalisePhone,
  readEnquiry,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryInput,
} from "@/lib/validation";

export type EnquiryState = {
  status: "idle" | "invalid" | "not-configured" | "failed" | "success";
  errors?: EnquiryErrors;
  values?: Omit<EnquiryInput, "consent">;
  courseLabel?: string;
  name?: string;
};

export async function submitEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  const input = readEnquiry(formData);
  const values = {
    name: input.name,
    email: input.email,
    phone: input.phone,
    course: input.course,
    message: input.message,
  };

  // Spam protection: hidden honeypot field
  const honeypot = String(formData.get("_hp_check") ?? formData.get("company_website") ?? "").trim();
  // Only trigger spam failure if an obvious bot filled the dedicated bot verification field
  const dedicatedHp = String(formData.get("_hp_check") ?? "").trim();
  if (dedicatedHp) {
    console.warn("[enquiry] Spam honeypot triggered; discarding bot enquiry");
    return { status: "failed", values };
  }

  const validSlugs = courses.map((c) => c.slug);
  const errors = validateEnquiry(input, validSlugs);
  if (Object.keys(errors).length > 0) {
    return { status: "invalid", errors, values };
  }

  const courseLabel =
    input.course === GENERAL_GUIDANCE
      ? "Not sure yet — needs guidance"
      : (courses.find((c) => c.slug === input.course)?.title ?? input.course);

  const result = await deliverEnquiry({
    name: input.name,
    email: input.email,
    phone: normalisePhone(input.phone) ?? input.phone,
    course: input.course,
    courseLabel,
    message: input.message,
    submittedAt: new Date().toISOString(),
    sourcePage: "/contact-us/",
  });

  if (!result.ok) {
    return { status: result.reason, values };
  }

  // Short-lived marker so /thank-you/ confirms an enquiry was delivered.
  const cookieStore = await cookies();
  cookieStore.set(ENQUIRY_COOKIE, input.course, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 10,
  });

  // If submitted with inline=true, return success state directly instead of redirecting
  const isInline = formData.get("inline") === "true";
  if (isInline) {
    return { status: "success", values, courseLabel, name: input.name };
  }

  redirect("/thank-you/");
}
