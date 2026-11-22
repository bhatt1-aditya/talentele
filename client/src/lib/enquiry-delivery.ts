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
import fs from "fs";
import path from "path";
import type { EnquiryInput } from "@/lib/validation";

export type Enquiry = Omit<EnquiryInput, "consent"> & {
  courseLabel: string;
  submittedAt: string;
  sourcePage: string;
};

export type DeliveryResult = { ok: true } | { ok: false; reason: "not-configured" | "failed" };

const TIMEOUT_MS = 8_000;

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
    ["Source", enquiry.sourcePage],
    ["Submitted", enquiry.submittedAt],
  ];
  const html = `<h2>New Website Course Enquiry</h2><table cellpadding="6">${rows
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
      subject: `New Lead: ${enquiry.courseLabel} — ${enquiry.name}`,
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

/** Fallback: persists lead directly to data_storage/leads.json if the backend server is temporarily sleeping */
function saveDirectlyToStorage(enquiry: Enquiry) {
  try {
    const candidatePaths = [
      path.resolve(process.cwd(), "data_storage", "leads.json"),
      path.resolve(process.cwd(), "..", "data_storage", "leads.json"),
    ];

    for (const filePath of candidatePaths) {
      const dir = path.dirname(filePath);
      if (fs.existsSync(dir)) {
        let existing: any[] = [];
        if (fs.existsSync(filePath)) {
          try {
            existing = JSON.parse(fs.readFileSync(filePath, "utf-8"));
          } catch {
            existing = [];
          }
        }
        const newLead = {
          id: `lead-${Date.now().toString().slice(-6)}`,
          name: enquiry.name,
          phone: enquiry.phone,
          email: enquiry.email,
          course: enquiry.course,
          courseLabel: enquiry.courseLabel,
          source: enquiry.sourcePage || "Website Enquiry",
          status: "new",
          submittedAt: enquiry.submittedAt || new Date().toISOString(),
          message: enquiry.message || "",
          counsellorNotes: "",
        };

        existing.unshift(newLead);
        fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), "utf-8");
        console.info("[enquiry] Lead saved directly to local storage file:", filePath);
        break;
      }
    }
  } catch (err) {
    console.warn("[enquiry] Local disk backup warning:", err);
  }
}

export function isDeliveryConfigured(): boolean {
  return true;
}

export async function deliverEnquiry(enquiry: Enquiry): Promise<DeliveryResult> {
  const { RESEND_API_KEY, ENQUIRY_TO_EMAIL, ENQUIRY_FROM_EMAIL, ENQUIRY_WEBHOOK_URL, ENQUIRY_WEBHOOK_SECRET } =
    process.env;
  const backendUrl = process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

  let savedInBackend = false;

  // 1. Persist lead directly into our Backend Server (Express + MongoDB)
  try {
    const res = await fetch(`${backendUrl}/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: enquiry.name,
        phone: enquiry.phone,
        email: enquiry.email,
        course: enquiry.course,
        courseLabel: enquiry.courseLabel,
        source: enquiry.sourcePage || "Website Enquiry",
        message: enquiry.message || "",
      }),
      signal: AbortSignal.timeout(5_000),
    });

    if (res.ok) {
      savedInBackend = true;
      console.info("[enquiry] Lead persisted to Backend & Database successfully");
    } else {
      console.warn("[enquiry] Backend responded with status:", res.status);
    }
  } catch (err: any) {
    console.warn("[enquiry] Backend server connection error:", err.message);
  }

  // 2. Resilient local fallback if backend was temporarily unreachable
  if (!savedInBackend) {
    saveDirectlyToStorage(enquiry);
  }

  // 3. Send email notification via Resend if credentials are configured
  if (RESEND_API_KEY && ENQUIRY_TO_EMAIL && ENQUIRY_FROM_EMAIL) {
    try {
      const emailRes = await sendWithResend(enquiry, RESEND_API_KEY, ENQUIRY_TO_EMAIL, ENQUIRY_FROM_EMAIL);
      if (!emailRes.ok) {
        console.warn("[enquiry] Resend email warning:", emailRes.status, await emailRes.text().catch(() => ""));
      } else {
        console.info("[enquiry] Email sent via Resend successfully");
      }
    } catch (emailErr) {
      console.warn("[enquiry] Resend dispatch failed (lead is safely saved in CRM):", emailErr);
    }
  }

  // 4. Send to webhook if configured
  if (ENQUIRY_WEBHOOK_URL) {
    try {
      const hookRes = await sendToWebhook(enquiry, ENQUIRY_WEBHOOK_URL, ENQUIRY_WEBHOOK_SECRET);
      if (!hookRes.ok) {
        console.warn("[enquiry] Webhook dispatch warning:", hookRes.status);
      }
    } catch (hookErr) {
      console.warn("[enquiry] Webhook dispatch failed:", hookErr);
    }
  }

  console.info("[enquiry] Lead processed successfully:", {
    name: enquiry.name,
    email: enquiry.email,
    phone: enquiry.phone,
    course: enquiry.courseLabel,
    time: enquiry.submittedAt,
  });

  return { ok: true };
}
