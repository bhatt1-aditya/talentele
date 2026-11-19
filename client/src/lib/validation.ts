/**
 * Enquiry validation shared by the client form and the server action.
 * Kept dependency-free on purpose.
 */
export type EnquiryInput = {
  name: string;
  email: string;
  phone: string;
  course: string;
  message: string;
  consent: boolean;
};

export type EnquiryField = keyof EnquiryInput;
export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

export const GENERAL_GUIDANCE = "guidance";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MESSAGE_MAX = 1000;

/** Accepts 10-digit Indian mobile numbers, optionally prefixed by +91, 91 or 0. */
export function normalisePhone(raw: string): string | null {
  const digits = raw.replace(/[\s\-()]/g, "");
  const match = digits.match(/^(?:\+?91|0)?([6-9]\d{9})$/);
  return match ? `+91${match[1]}` : null;
}

export function readEnquiry(formData: FormData): EnquiryInput {
  const text = (key: string) => String(formData.get(key) ?? "").trim();
  return {
    name: text("name"),
    email: text("email"),
    phone: text("phone"),
    course: text("course"),
    message: text("message"),
    consent: formData.get("consent") === "on",
  };
}

export function validateEnquiry(input: EnquiryInput, validCourses: readonly string[]): EnquiryErrors {
  const errors: EnquiryErrors = {};

  if (input.name.length < 2) errors.name = "Please enter your full name.";
  else if (input.name.length > 100) errors.name = "Please keep your name under 100 characters.";

  if (!input.email) errors.email = "Please enter your email address.";
  else if (!EMAIL_PATTERN.test(input.email) || input.email.length > 200)
    errors.email = "Please enter a valid email address, e.g. name@example.com.";

  if (!input.phone) errors.phone = "Please enter your mobile number.";
  else if (!normalisePhone(input.phone))
    errors.phone = "Please enter a valid 10-digit Indian mobile number.";

  if (!input.course) errors.course = "Please choose a course, or select that you need guidance.";
  else if (input.course !== GENERAL_GUIDANCE && !validCourses.includes(input.course))
    errors.course = "Please choose a course from the list.";

  if (input.message.length > MESSAGE_MAX)
    errors.message = `Please keep your message under ${MESSAGE_MAX} characters.`;

  if (!input.consent) errors.consent = "Please confirm that Talentele may contact you about your enquiry.";

  return errors;
}
