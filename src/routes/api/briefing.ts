import { createFileRoute } from "@tanstack/react-router";
import {
  EMAIL_RE,
  clean,
  deliverEnquiry,
  json,
  oneLine,
  requestOrigin,
} from "@/lib/enquiry-delivery.server";

/**
 * POST /api/briefing
 * Emails a "Request a briefing" submission to the house inbox with reply-to
 * set to the visitor. Answers { ok: true } only when the mail relay accepted it.
 */
export const Route = createFileRoute("/api/briefing")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: Record<string, unknown>;
        try {
          body = (await request.json()) as Record<string, unknown>;
        } catch {
          return json(400, { ok: false, error: "Invalid request." });
        }

        // Honeypot: real visitors never see or fill this field.
        if (clean(body.website, 200)) return json(200, { ok: true });

        const name = oneLine(clean(body.name, 120));
        const institution = oneLine(clean(body.institution, 160));
        const role = oneLine(clean(body.role, 120));
        const email = oneLine(clean(body.email, 200));
        const corridor = oneLine(clean(body.corridor, 300));
        const brief = clean(body.brief, 4000);
        const reference = oneLine(clean(body.reference, 40)) || "CC-unreferenced";

        if (!name || !institution || !email) {
          return json(422, { ok: false, error: "Name, institution and work email are required." });
        }
        if (!EMAIL_RE.test(email)) {
          return json(422, { ok: false, error: "Enter a valid work email." });
        }

        const result = await deliverEnquiry({
          form: "Cush Core briefing",
          subject: `Cush Core briefing · ${institution} · ${reference}`,
          name,
          email,
          origin: "https://cush-core.com",
          fields: [
            ["Reference", reference],
            ["Full name", name],
            ["Institution", institution],
            ["Role", role],
            ["Work email", email],
            ["Markets of interest", corridor],
            ["What they wish to examine", brief],
            ["Submitted from", `${requestOrigin(request)}/briefing`],
          ],
        });

        if (!result.ok) {
          console.error("[briefing] delivery failed:", result.reason);
          return json(502, { ok: false, error: "delivery_failed" });
        }
        return json(200, { ok: true });
      },
    },
  },
});
