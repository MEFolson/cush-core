import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { CompareTable } from "@/components/compare-table";
import { RailIndex } from "@/components/rail-index";
import { pageMeta } from "@/lib/page-meta";
import { furtherReading, layers, leadership, offRamps, onRamps, site } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () =>
    pageMeta({
      title: "Cush Core · Licensed core banking for global banks, Tier 1 and central banks",
      description: site.dek,
    }),
  component: Home,
});

function Home() {
  const railCodes = [...onRamps, ...offRamps];

  return (
    <SiteShell>
      <section className="border-b border-line bg-paper text-ink">
        <div className="mx-auto grid max-w-6xl lg:grid-cols-12">
          <div className="px-5 py-14 sm:px-8 sm:py-20 lg:col-span-7 lg:py-24 lg:pr-14">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">
              Licensed core · London
            </p>
            <div className="mt-5 h-px w-12 bg-signal" aria-hidden="true" />
            <h1 className="mt-6 max-w-[16ch] font-display text-4xl font-normal leading-[1.05] sm:text-6xl">
              {site.tagline}
            </h1>
            <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-muted sm:text-lg">
              {site.dek}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link to="/briefing">Request a private briefing</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/platform">Review the architecture</Link>
              </Button>
            </div>
          </div>

          <aside className="border-t border-line lg:col-span-5 lg:border-l lg:border-t-0">
            <div className="px-5 py-6 sm:px-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">
                Examination index
              </p>
              <p className="mt-3 max-w-[40ch] text-sm leading-relaxed text-muted">
                One licensed system of record. Four layers under one examination.
                A description of the product, not a record of volume.
              </p>
            </div>
            <ol>
              {layers.map((layer) => (
                <li key={layer.id} className="border-t border-line px-5 py-4 sm:px-8">
                  <div className="grid grid-cols-[2.5rem_1fr] gap-3">
                    <span className="font-mono text-xs text-signal">{layer.index}</span>
                    <div>
                      <p className="font-display text-xl leading-snug">{layer.name}</p>
                      <p className="mt-1 text-sm text-muted">{layer.title}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            <div className="border-t border-line px-5 py-5 sm:px-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">Rail codes</p>
              <ul className="mt-3 divide-y divide-line border-y border-line">
                {railCodes.map((rail) => (
                  <li key={rail.code} className="grid grid-cols-[4.5rem_1fr] gap-3 py-2">
                    <span className="font-mono text-xs">{rail.code}</span>
                    <span className="text-sm text-muted">{rail.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">Comparison</p>
            <h2 className="mt-4 font-display text-3xl font-normal sm:text-4xl">
              Vertical apps added dependencies.
            </h2>
          </div>
          <div className="lg:col-span-8 lg:pt-8">
            <blockquote className="max-w-[36ch] border-l-2 border-signal pl-5 font-display text-2xl font-normal italic leading-snug sm:text-3xl">
              They added an architecture of dependencies.
            </blockquote>
            <p className="mt-8 max-w-[65ch] text-base leading-relaxed text-muted">
              Institutions spent a decade assembling best-of-breed stacks. Each purchase
              was rational. Together they produced dependency debt: reconciliations,
              vendor models, and a change programme for every product. Generative AI has
              made that estate more expensive, because coordination, not code, is now
              the bottleneck.
            </p>
            <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-muted">
              Cush Core is the opposite move. A vertically integrated system of record:
              product, orchestration, ledger, and rails under one examination. Policy stays
              with the institution. Customers see your brand. Supervisors see your books.
            </p>
            <p className="mt-6 text-sm text-muted">
              After Jose Luis Caldeira, “The Vertically Integrated Bank”, 2026.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-5 pb-16 sm:px-8 lg:pb-24">
          <CompareTable />
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:items-end lg:py-20">
          <div className="lg:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">Rails</p>
            <h2 className="mt-4 max-w-[20ch] font-display text-3xl font-normal sm:text-4xl">
              Clearing and settlement on the same book.
            </h2>
          </div>
          <p className="max-w-[48ch] text-sm leading-relaxed text-muted lg:col-span-5">
            Inbound schemes post to the ledger. Outbound schemes leave from it.
            There is no second payments hub reconciling after the fact.
          </p>
        </div>
        <div className="mx-auto max-w-6xl px-5 pb-16 sm:px-8 lg:pb-24">
          <RailIndex />
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-6 sm:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">
            Further examination
          </p>
        </div>
        <ul className="mx-auto max-w-6xl border-t border-line">
          {furtherReading.map((item) => (
            <li key={item.href} className="border-b border-line">
              <Link
                to={item.href}
                className="grid min-h-14 items-baseline gap-3 px-5 py-5 sm:px-8 lg:grid-cols-12"
              >
                <span className="font-mono text-xs text-signal lg:col-span-1">{item.index}</span>
                <span className="font-display text-2xl lg:col-span-3">{item.label}</span>
                <span className="text-sm leading-relaxed text-muted lg:col-span-8">{item.line}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto grid max-w-6xl lg:grid-cols-12">
          <div className="border-b border-line px-5 py-14 sm:px-8 lg:col-span-4 lg:border-b-0 lg:border-r lg:py-20">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">Principals</p>
            <h2 className="mt-4 font-display text-3xl font-normal">The people who will sit the examination.</h2>
            <p className="mt-5 max-w-[40ch] text-sm leading-relaxed text-muted">
              75+ years in regulated payments belongs with these careers. It is not
              an operating metric of the platform. Direct CHAPS membership lineage
              sits with the founder: the first non-bank PSP onboarded by the Bank
              of England as a Direct CHAPS member.
            </p>
          </div>
          <div className="lg:col-span-8">
            {leadership.map((person) => (
              <article key={person.name} className="border-b border-line px-5 py-8 last:border-b-0 sm:px-10">
                <h3 className="font-display text-2xl font-normal">{person.name}</h3>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-signal">
                  {person.role}
                </p>
                <p className="mt-4 max-w-[65ch] text-sm leading-relaxed text-muted">{person.line}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink text-paper">
        <div className="mx-auto grid max-w-6xl lg:grid-cols-12">
          <div className="border-b border-night-line px-5 py-10 sm:px-8 lg:col-span-4 lg:border-b-0 lg:border-r lg:py-20">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper">
              Private briefing
            </p>
            <div className="mt-5 h-px w-12 bg-paper/70" aria-hidden="true" />
            <p className="mt-5 font-mono text-xs text-night-muted">{site.city}</p>
          </div>
          <div className="px-5 py-12 sm:px-8 lg:col-span-8 lg:px-12 lg:py-20">
            <h2 className="max-w-[18ch] font-display text-3xl font-normal text-paper sm:text-5xl">
              Walk the control plane with a principal.
            </h2>
            <p className="mt-5 max-w-[65ch] text-base leading-relaxed text-night-muted">
              Brief us on the mandate. We will walk ledger, agents, rails, and the
              evidence a supervisor will require. A principal replies. This is not a
              public waitlist.
            </p>
            <Button asChild size="lg" variant="invert" className="mt-8">
              <Link to="/briefing">Request a private briefing</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
