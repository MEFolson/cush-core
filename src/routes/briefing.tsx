import { createFileRoute } from "@tanstack/react-router";
import { BriefingForm } from "@/components/briefing-form";
import { PageIntro } from "@/components/page-intro";
import { SiteShell } from "@/components/site-shell";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/page-meta";

const cover = [
  { index: "01", line: "The four-layer stack against your mandate." },
  { index: "02", line: "Product blueprints for the licences you already hold." },
  { index: "03", line: "A replayed instruction from Faster Payments to the last mile." },
  { index: "04", line: "Books, isolation, and what a sandbox will ask to see." },
];

export const Route = createFileRoute("/briefing")({
  head: () =>
    pageMeta({
      title: "Request a briefing",
      description:
        "Private walk-through of the Cush Core control plane for CIOs, correspondent banking, and core modernisation.",
    }),
  component: BriefingPage,
});

function BriefingPage() {
  return (
    <SiteShell>
      <PageIntro
        folio="06"
        kicker="Briefing"
        title="A private walk-through of the control plane."
        lead="For CIOs, heads of correspondent banking, international, and core modernisation. Not a waitlist. A principal replies."
      />

      <section className="bg-paper">
        <ol className="mx-auto grid max-w-6xl border-b border-line sm:grid-cols-2 lg:grid-cols-4">
          {cover.map((item) => (
            <li
              key={item.index}
              className="border-b border-line px-5 py-6 last:border-b-0 sm:px-8 sm:[&:nth-child(n+3)]:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
            >
              <p className="font-mono text-xs text-signal">{item.index}</p>
              <p className="mt-3 max-w-[28ch] text-sm leading-relaxed">{item.line}</p>
            </li>
          ))}
        </ol>

        <div className="mx-auto grid max-w-6xl lg:grid-cols-12">
          <div className="px-5 py-12 sm:px-8 lg:col-span-8 lg:border-r lg:border-line lg:pr-12">
            <h2 className="font-display text-2xl font-normal">Request</h2>
            <p className="mt-2 max-w-[65ch] text-sm leading-relaxed text-muted">
              The form is the contact. It is addressed to the house. Nothing is stored
              on a server from this page.
            </p>
            <div className="mt-8">
              <BriefingForm />
            </div>
          </div>
          <aside className="border-t border-line px-5 py-12 sm:px-8 lg:col-span-4 lg:border-t-0 lg:py-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">House</p>
            <dl className="mt-6 divide-y divide-line border-y border-line text-sm">
              <div className="py-4">
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Telephone</dt>
                <dd className="mt-2">
                  <a
                    className="underline decoration-signal underline-offset-4"
                    href={`tel:${site.phone.replace(/\s/g, "")}`}
                  >
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div className="py-4">
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">City</dt>
                <dd className="mt-2">{site.city}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>
    </SiteShell>
  );
}
