import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro } from "@/components/page-intro";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { leadership, trustPoints } from "@/lib/site";
import { ExamFaq } from "@/components/exam-faq";

export const Route = createFileRoute("/trust")({ component: TrustPage });

function TrustPage() {
  return (
    <SiteShell>
      <PageIntro
        folio="05"
        kicker="Trust"
        title="Built to be examined."
        lead="Every payment is recorded. Every decision can be replayed. The ledger is the evidence a supervisor, an auditor and a correspondent bank can sit with."
      />

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <p className="font-mono text-xs tracking-[0.16em] text-muted">Ledger</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
            The book is the evidence.
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted">
            Production posts to an immutable BLAKE3 ledger. Multi-entity books across
            companies, countries and currencies. AI follows rules the institution
            writes. Architecture prepared for PRA, MAS and other sandbox programmes,
            and for licences in more than one country.
          </p>
        </div>
      </section>

      <section className="border-b border-line bg-paper-2">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <div className="grid gap-px bg-line sm:grid-cols-2">
            {trustPoints.map((item) => (
              <article key={item.title} className="bg-paper px-6 py-10 sm:px-8">
                <h3 className="font-display text-2xl tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <p className="font-mono text-xs tracking-[0.16em] text-muted">Lineage</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-medium tracking-[-0.03em]">
            Designed for KYC, AML, PSD2 and DORA-aligned controls.
          </h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              {
                t: "Direct CHAPS lineage",
                d: "The founder led the first non-bank PSP onboarded by the Bank of England as a Direct CHAPS member.",
              },
              {
                t: "Multi-jurisdiction books",
                d: "UK Ltd, Singapore Pte, US Inc — isolation on one control plane, not three vendor estates.",
              },
              {
                t: "Replay for the officer",
                d: "Risk scores, rail choice and postings are a single trace. Internal audit does not reconstruct.",
              },
            ].map((item) => (
              <li key={item.t} className="border-t border-line pt-5">
                <h3 className="font-display text-xl tracking-[-0.02em]">{item.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <p className="font-mono text-xs tracking-[0.16em] text-muted">Examination</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-medium tracking-[-0.03em]">
            What a CIO will ask.
          </h2>
          <div className="mt-10">
            <ExamFaq />
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <p className="font-mono text-xs tracking-[0.16em] text-muted">Principals</p>
          <div className="mt-8 grid gap-10 lg:grid-cols-2">
            {leadership.map((person) => (
              <article key={person.name} className="border-t border-line pt-6">
                <h3 className="font-display text-2xl tracking-[-0.02em]">{person.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-signal">
                  {person.role}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted">{person.line}</p>
              </article>
            ))}
          </div>
          <Button asChild className="mt-12">
            <Link to="/briefing">Request a briefing</Link>
          </Button>
        </div>
      </section>
    </SiteShell>
  );
}
