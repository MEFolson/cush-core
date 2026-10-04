import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro } from "@/components/page-intro";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { ExamFaq } from "@/components/exam-faq";
import { pageMeta } from "@/lib/page-meta";
import { leadership, trustPoints } from "@/lib/site";

export const Route = createFileRoute("/trust")({
  head: () =>
    pageMeta({
      title: "Governance",
      description:
        "Immutable BLAKE3 ledger, agents under mandate, and principals with regulated lineage. Built to be examined.",
    }),
  component: TrustPage,
});

function TrustPage() {
  return (
    <SiteShell>
      <PageIntro
        folio="05"
        kicker="Governance"
        title="Built to be examined."
        lead="Every payment is recorded. Every decision can be replayed. The ledger is the evidence a supervisor, an auditor, and a correspondent bank can sit with."
      />

      <section className="border-b border-line bg-paper">
        <div className="mx-auto grid max-w-6xl lg:grid-cols-12">
          <div className="border-b border-line px-5 py-12 sm:px-8 lg:col-span-4 lg:border-b-0 lg:border-r lg:py-16">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">Ledger</p>
            <h2 className="mt-4 font-display text-3xl font-normal">The book is the evidence.</h2>
            <p className="mt-5 max-w-[40ch] text-sm leading-relaxed text-muted">
              Production posts to an immutable BLAKE3 ledger. Multi-entity books
              across companies, countries, and currencies. Agents follow rules the
              institution writes.
            </p>
          </div>
          <dl className="lg:col-span-8">
            {trustPoints.map((item) => (
              <div key={item.title} className="grid gap-2 border-b border-line px-5 py-7 last:border-b-0 sm:px-10 lg:grid-cols-12 lg:gap-6">
                <dt className="font-display text-xl lg:col-span-5">{item.title}</dt>
                <dd className="max-w-[52ch] text-sm leading-relaxed text-muted lg:col-span-7">{item.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">Lineage</p>
            <h2 className="mt-4 font-display text-3xl font-normal">Controls the officer already knows.</h2>
          </div>
          <div className="max-w-[65ch] space-y-5 text-base leading-relaxed text-muted lg:col-span-8">
            <p>
              Designed for KYC, AML, PSD2, and DORA-aligned controls. Architecture
              prepared for PRA, MAS, and other sandbox programmes, and for licences
              in more than one country. Preparation is a design claim. It is not a
              licence already granted.
            </p>
            <p>
              Direct CHAPS lineage: the founder led the first non-bank PSP onboarded
              by the Bank of England as a Direct CHAPS member.
            </p>
            <p>
              Multi-jurisdiction books: UK Ltd, Singapore Pte, and US Inc. Isolation
              on one control plane, not three vendor estates.
            </p>
            <p>
              Replay for the officer: risk scores, rail choice, and postings are a
              single trace. Internal audit does not reconstruct the payment from
              three systems.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">Examination</p>
          <h2 className="mt-4 max-w-[20ch] font-display text-3xl font-normal">What a CIO will ask.</h2>
          <div className="mt-10">
            <ExamFaq />
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto grid max-w-6xl lg:grid-cols-12">
          <div className="border-b border-line px-5 py-12 sm:px-8 lg:col-span-4 lg:border-b-0 lg:border-r lg:py-16">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">Principals</p>
            <h2 className="mt-4 font-display text-3xl font-normal">Names on the memorandum.</h2>
            <Button asChild className="mt-8">
              <Link to="/briefing">Request a briefing</Link>
            </Button>
          </div>
          <div className="lg:col-span-8">
            {leadership.map((person) => (
              <article key={person.name} className="border-b border-line px-5 py-8 last:border-b-0 sm:px-10">
                <h3 className="font-display text-2xl font-normal">{person.name}</h3>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-signal">{person.role}</p>
                <p className="mt-4 max-w-[65ch] text-sm leading-relaxed text-muted">{person.line}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
