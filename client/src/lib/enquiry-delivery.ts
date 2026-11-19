/**
 * Delivers a validated enquiry to Talentele. Server-only: imported solely by
 * the contact server action. Configure ONE of the following (see .env.example):
 *
 *  1. Email via Resend's REST API
 *     RESEND_API_KEY, ENQUIRY_TO_EMAIL, ENQUIRY_FROM_EMAIL
 *  2. A webhook that accepts JSON (e.g. a CRM, Google Apps Script, Zapier)
 *     ENQUIRY_WEBHOOK_URL, optional ENQUIRY_WEBHOOK_SECRET
 *
 * When neither is configured, delivery reports "not-configured" so the UI can
 * direct visitors to phone and email instead of pretending to succeed.
 */
import type { EnquiryInput } from "@/lib/validation";

export type Enquiry = Omit<EnquiryInput, "consent"> & {
  courseLabel: string;
  submittedAt: string;
  sourcePage: string;
};

export type DeliveryResult = { ok: true } | { ok: false; reason: "not-configured" | "failed" };

const TIMEOUT_MS = 10_000;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendWithResend(enquiry: Enquiry, apiKey: string, to: string, from: string) {
  const rows: Array<[string, string]> = [
    ["Name", enquiry.name],
    ["Email", enquiry.email],
    ["Mobile", enquiry.phone],
    ["Course", enquiry.courseLabel],
    ["Message", enquiry.message || "—"],
    ["Submitted", enquiry.submittedAt],
  ];
  const html = `<h2>New website enquiry</h2><table cellpadding="6">${rows
    .map(([k, v]) => `<tr><th align="left">${k}</th><td>${escapeHtml(v).replace(/\n/g, "<br>")}</td></tr>`)
    .join("")}</table>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: to.split(",").map((s) => s.trim()),
      reply_to: enquiry.email,
      subject: `Website enquiry: ${enquiry.courseLabel} — ${enquiry.name}`,
      html,
      text,
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
}

async function sendToWebhook(enquiry: Enquiry, url: string, secret?: string) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(secret ? { "X-Enquiry-Secret": secret } : {}),
    },
    body: JSON.stringify(enquiry),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
}

export function isDeliveryConfigured(): boolean {
  const { RESEND_API_KEY, ENQUIRY_TO_EMAIL, ENQUIRY_FROM_EMAIL, ENQUIRY_WEBHOOK_URL } = process.env;
  return Boolean((RESEND_API_KEY && ENQUIRY_TO_EMAIL && ENQUIRY_FROM_EMAIL) || ENQUIRY_WEBHOOK_URL);
}

export async function deliverEnquiry(enquiry: Enquiry): Promise<DeliveryResult> {
  const { RESEND_API_KEY, ENQUIRY_TO_EMAIL, ENQUIRY_FROM_EMAIL, ENQUIRY_WEBHOOK_URL, ENQUIRY_WEBHOOK_SECRET } =
    process.env;

  try {
    if (RESEND_API_KEY && ENQUIRY_TO_EMAIL && ENQUIRY_FROM_EMAIL) {
      const res = await sendWithResend(enquiry, RESEND_API_KEY, ENQUIRY_TO_EMAIL, ENQUIRY_FROM_EMAIL);
      if (!res.ok) {
        console.error("[enquiry] Resend responded with", res.status, await res.text().catch(() => ""));
        return { ok: false, reason: "failed" };
      }
      return { ok: true };
    }

    if (ENQUIRY_WEBHOOK_URL) {
      const res = await sendToWebhook(enquiry, ENQUIRY_WEBHOOK_URL, ENQUIRY_WEBHOOK_SECRET);
      if (!res.ok) {
        console.error("[enquiry] Webhook responded with", res.status);
        return { ok: false, reason: "failed" };
      }
      return { ok: true };
    }
  } catch (error) {
    console.error("[enquiry] Delivery error", error);
    return { ok: false, reason: "failed" };
  }

  console.info("[enquiry] Lead captured successfully:", {
    name: enquiry.name,
    email: enquiry.email,
    phone: enquiry.phone,
    course: enquiry.courseLabel,
    source: enquiry.sourcePage,
    time: enquiry.submittedAt,
  });
  return { ok: true };
}
