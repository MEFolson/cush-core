import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { ArchitectureExplorer } from "@/components/architecture-explorer";
import { AdoptionPaths } from "@/components/adoption-paths";
import { CompareTable } from "@/components/compare-table";
import { ExamFaq } from "@/components/exam-faq";
import { LedgerField } from "@/components/ledger-field";
import { RailMesh } from "@/components/rail-mesh";
import { institutions, leadership, onRamps, offRamps, outcomes, site, stats } from "@/lib/site";


export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <SiteShell invertHeader>
      <section className="overflow-hidden border-b border-night-line bg-night text-night-fg">
        <div className="relative">
          <div className="absolute inset-0 opacity-[0.35]">
            <LedgerField className="absolute inset-0" />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-night via-night/92 to-night" />
          <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-20 sm:px-8 sm:pb-24 sm:pt-28">
            <p className="font-mono text-xs font-medium tracking-[0.22em] text-signal">
              Licensed core · Global banks · Tier 1 · Central banks
            </p>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-6xl lg:text-[4.25rem]">
              {site.tagline}
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-night-muted sm:text-xl">
              {site.dek}
            </p>
            <div className="mt-12 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="invert">
                <Link to="/briefing">
                  Request a private briefing
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="nightOutline">
                <Link to="/platform">Review the architecture</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-line bg-paper">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px sm:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="border-r border-line px-5 py-10 last:border-r-0 sm:px-8 sm:py-12">
              <p className="text-3xl font-bold tracking-[-0.04em] tabular-nums text-ink sm:text-4xl">
                {item.value}
              </p>
              <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.16em] text-muted">{item.label}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-line px-5 py-4 font-mono text-xs tracking-[0.16em] text-muted sm:px-8">
          {[...onRamps, ...offRamps].map((rail) => (
            <span key={rail.code}>{rail.code}</span>
          ))}
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <p className="font-mono text-xs tracking-[0.16em] text-muted">01 / Outcomes</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
            What the institution acquires.
          </h2>
          <ul className="mt-12 grid gap-10 sm:grid-cols-2">
            {outcomes.map((item) => (
              <li key={item.index} className="border-t border-line pt-6">
                <p className="font-mono text-xs text-signal">{item.index}</p>
                <h3 className="mt-2 text-2xl tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-xs tracking-[0.16em] text-muted">02 / Platform</p>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
                Four layers. One supervisory walk-through.
              </h2>
            </div>
            <Link
              to="/platform"
              className="inline-flex min-h-11 items-center gap-2 text-sm text-ink hover:opacity-70"
            >
              Full architecture
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <ArchitectureExplorer />
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-5">
            <p className="font-mono text-xs tracking-[0.16em] text-muted">03 / Thesis</p>
            <h2 className="mt-4 text-3xl font-bold tracking-[-0.03em] sm:text-5xl">
              Vertical apps did not just add capability.
            </h2>
          </div>
          <div className="lg:col-span-7 lg:pt-8">
            <blockquote className="border-l-2 border-signal pl-5 text-2xl font-medium leading-snug tracking-[-0.02em] sm:text-3xl">
              They added an architecture of dependencies.
            </blockquote>
            <p className="mt-8 text-base leading-relaxed text-muted">
              Institutions spent a decade assembling best-of-breed stacks. Each purchase
              was rational. Together they produced dependency debt: reconciliations,
              vendor models, and a change programme for every product. Generative AI has
              made that estate more expensive — because coordination, not code, is now
              the bottleneck.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Cush Core is the opposite move: a vertically integrated system of record —
              product, orchestration, ledger and rails under one examination. Policy stays
              with the institution. Customers see your brand. Supervisors see your books.
            </p>
            <p className="mt-6 text-xs tracking-[0.08em] text-muted">
              After Jose Luis Caldeira, “The Vertically Integrated Bank”, 2026.
            </p>
          </div>
          <div className="lg:col-span-12">
            <CompareTable />
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper-2">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="mb-12">
            <p className="font-mono text-xs font-medium tracking-[0.2em] text-signal">04 / Connectivity</p>
            <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-[-0.03em] text-ink sm:text-4xl">
              Clearing and settlement. One system of record.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              Inbound and outbound schemes post to the same ledger they settle from.
              Select a rail to inspect the control plane.
            </p>
          </div>
          <RailMesh />
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <p className="font-mono text-xs tracking-[0.16em] text-muted">05 / Institutions</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
            Specified for the institution — not the vendor stack.
          </h2>
          <div className="mt-12 divide-y divide-line border-y border-line">
            {institutions.map((item) => (
              <Link
                key={item.id}
                to="/institutions"
                hash={item.id}
                className="group grid gap-3 py-8 sm:grid-cols-12 sm:gap-8"
              >
                <p className="font-mono text-xs text-muted sm:col-span-2">{item.index}</p>
                <div className="sm:col-span-4">
                  <p className="text-2xl tracking-[-0.02em]">{item.name}</p>
                </div>
                <p className="text-sm leading-relaxed text-muted sm:col-span-5">{item.title}</p>
                <p className="flex items-start justify-end sm:col-span-1">
                  <ArrowRight className="size-4 text-ink transition-transform duration-150 group-hover:translate-x-1" />
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper-2">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <p className="font-mono text-xs tracking-[0.16em] text-muted">06 / Adoption</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
            Adoption paths that respect franchise risk.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
            Coexist to prove the ledger. Replatform a line of business. Or licence a
            greenfield entity. The system of record does not change.
          </p>
          <div className="mt-10">
            <AdoptionPaths />
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-mono text-xs tracking-[0.16em] text-muted">07 / Principals</p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em]">
              Principals with regulated lineage.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Built by people who have onboarded institutions to Bank of England rails
              and operated cores inside global banks.
            </p>
          </div>
          <div className="divide-y divide-line border-y border-line lg:col-span-8">
            {leadership.map((person) => (
              <article key={person.name} className="py-8">
                <h3 className="text-2xl tracking-[-0.02em]">{person.name}</h3>
                <p className="mt-1 font-mono text-xs tracking-[0.14em] text-signal">{person.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{person.line}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <p className="font-mono text-xs tracking-[0.16em] text-muted">08 / Examination</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
            Questions from the CIO, CRO and supervisory desk.
          </h2>
          <div className="mt-10">
            <ExamFaq />
          </div>
        </div>
      </section>

      <section className="border-t border-night-line bg-night text-night-fg">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-20 sm:px-8 sm:py-28 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="font-mono text-xs font-medium tracking-[0.2em] text-signal">Private briefing</p>
            <h2 className="mt-4 text-3xl font-bold tracking-[-0.03em] sm:text-5xl">
              A private walk-through of the control plane.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-night-muted sm:text-base">
              Brief us on the mandate. We will walk ledger, agents, rails and the
              evidence a supervisor will require — with a principal in the room.
            </p>
          </div>
          <Button asChild size="lg" variant="invert">
            <Link to="/briefing">
              Request a private briefing
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </SiteShell>
  );
}
