/**
 * Server-only delivery of website enquiries to a real inbox.
 *
 * Two transports, chosen at runtime from environment variables:
 *
 * 1. Resend (preferred once configured). Set RESEND_API_KEY and ENQUIRY_FROM
 *    (a sender on a domain verified in Resend, e.g.
 *    "Cush Core <enquiries@cush-core.com>").
 * 2. FormSubmit.co relay (default, no account or key). The recipient must
 *    click the one-time activation email FormSubmit sends on first use.
 *    Until that click, FormSubmit refuses delivery and the form shows an
 *    error rather than a false "sent" message.
 *
 * ENQUIRY_TO overrides the recipient (default below). ENQUIRY_SITE_ORIGIN
 * overrides the canonical site origin passed to the relay. No secrets live in
 * code.
 */

export const DEFAULT_ENQUIRY_TO = "mfolson@cushpayments.com";

export type Enquiry = {
  /** Short form name used in the subject line, e.g. "Cush Core briefing". */
  form: string;
  subject: string;
  name: string;
  email: string;
  /** Ordered label/value pairs rendered in the email body. */
  fields: Array<[string, string]>;
  /**
   * Canonical public origin of the site, sent to the relay as Origin/Referer.
   * Kept fixed (not the preview host) so FormSubmit's one-time activation,
   * which is tied to the sending site, carries over from preview to production.
   */
  origin: string;
};

export type DeliveryResult = { ok: true } | { ok: false; reason: string };

function env(name: string): string | undefined {
  const v = typeof process !== "undefined" ? process.env?.[name] : undefined;
  return v && v.trim() ? v.trim() : undefined;
}

function textBody(e: Enquiry): string {
  return [
    `${e.form} enquiry from the website.`,
    "",
    ...e.fields.map(([k, v]) => `${k}: ${v || "(not given)"}`),
    "",
    `Reply to this email to answer ${e.name} directly.`,
  ].join("\n");
}

async function viaResend(
  e: Enquiry,
  to: string,
  key: string,
  from: string,
): Promise<DeliveryResult> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: `${e.name.replace(/[<>"]/g, "")} <${e.email}>`,
      subject: e.subject,
      text: textBody(e),
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (res.ok) return { ok: true };
  return { ok: false, reason: `resend ${res.status}: ${(await res.text()).slice(0, 300)}` };
}

async function viaFormSubmit(e: Enquiry, to: string): Promise<DeliveryResult> {
  const payload: Record<string, string> = {
    _subject: e.subject,
    _replyto: e.email,
    _template: "table",
    _captcha: "false",
  };
  for (const [k, v] of e.fields) payload[k] = v || "(not given)";
  // FormSubmit uses the "email" and "name" keys for its own reply-to handling.
  payload.name = e.name;
  payload.email = e.email;

  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Origin: e.origin,
      Referer: `${e.origin}/`,
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(15_000),
  });
  const raw = await res.text();
  let data: { success?: unknown; message?: unknown } = {};
  try {
    data = JSON.parse(raw);
  } catch {
    /* non-JSON answer is treated as failure below */
  }
  if (res.ok && (data.success === true || data.success === "true")) return { ok: true };
  return {
    ok: false,
    reason: `formsubmit ${res.status}: ${String(data.message ?? raw).slice(0, 300)}`,
  };
}

export async function deliverEnquiry(input: Enquiry): Promise<DeliveryResult> {
  const e = { ...input, origin: env("ENQUIRY_SITE_ORIGIN") ?? input.origin };
  const to = env("ENQUIRY_TO") ?? DEFAULT_ENQUIRY_TO;
  const key = env("RESEND_API_KEY");
  const from = env("ENQUIRY_FROM");
  try {
    if (key && from) return await viaResend(e, to, key, from);
    return await viaFormSubmit(e, to);
  } catch (err) {
    return { ok: false, reason: err instanceof Error ? err.message : String(err) };
  }
}

/* ---------- shared validation helpers ---------- */

export const EMAIL_RE = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/;

export function clean(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  // Strip control characters (keep tabs and newlines) and trim.
  let out = "";
  for (const ch of v) {
    const c = ch.charCodeAt(0);
    if (c === 9 || c === 10 || c === 13 || (c >= 32 && c !== 127)) out += ch;
  }
  return out.trim().slice(0, max);
}

export function oneLine(v: string): string {
  return v.replace(/[\r\n]+/g, " ");
}

export function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

export function requestOrigin(request: Request): string {
  const h = request.headers;
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "https";
  return host ? `${proto}://${host}` : new URL(request.url).origin;
}
