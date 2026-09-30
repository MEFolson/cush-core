import { createFileRoute } from "@tanstack/react-router";
import { BriefingForm } from "@/components/briefing-form";
import { PageIntro } from "@/components/page-intro";
import { SiteShell } from "@/components/site-shell";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/page-meta";

export const Route = createFileRoute("/briefing")({
  head: () =>
    pageMeta({
      title: "Request a briefing",
      description:
        "Private walk-through of the Cush Core control plane for CIOs, correspondent banking and core modernisation.",
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
        lead="For CIOs, heads of correspondent banking, international and core modernisation. Not a waitlist. A principal replies."
      />

      <section className="bg-paper">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <p className="font-mono text-xs tracking-[0.16em] text-muted">House</p>
            <h2 className="mt-3 font-display text-2xl tracking-[-0.02em]">
              What we will cover.
            </h2>
            <ul className="mt-6 space-y-4 text-sm leading-relaxed text-muted">
              <li>The four-layer stack against your mandate.</li>
              <li>Product blueprints for the licences you already hold.</li>
              <li>A replayed instruction from Faster Payments to last mile.</li>
              <li>Books, isolation and what a sandbox will ask to see.</li>
            </ul>
            <dl className="mt-10 space-y-4 border-t border-line pt-6 text-sm">
              <div>
                <dt className="font-mono text-xs tracking-[0.14em] text-muted">Email</dt>
                <dd className="mt-1">
                  <a className="hover:opacity-70" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-xs tracking-[0.14em] text-muted">Telephone</dt>
                <dd className="mt-1">
                  <a className="hover:opacity-70" href={`tel:${site.phone.replace(/\s/g, "")}`}>
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-xs tracking-[0.14em] text-muted">Seat</dt>
                <dd className="mt-1">{site.address}</dd>
              </div>
            </dl>
          </aside>
          <div className="lg:col-span-8">
            <BriefingForm />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
