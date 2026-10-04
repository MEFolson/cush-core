import { createFileRoute, Link } from "@tanstack/react-router";
import { LedgerReplay } from "@/components/ledger-replay";
import { PageIntro } from "@/components/page-intro";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { agents } from "@/lib/site";
import { pageMeta } from "@/lib/page-meta";

const procedure = [
  { index: "01", name: "On-ramp", line: "The instruction arrives on a named scheme." },
  ...agents.map((agent, i) => ({
    index: String(i + 2).padStart(2, "0"),
    name: agent.name,
    line: agent.title,
  })),
  { index: "06", name: "Off-ramp", line: "Settlement leaves only after the trace exists." },
];

export const Route = createFileRoute("/intelligence")({
  head: () =>
    pageMeta({
      title: "Control plane",
      description:
        "Risk, routing, reconciliation, and operations agents under your institutional mandate, with full replay.",
    }),
  component: IntelligencePage,
});

function IntelligencePage() {
  return (
    <SiteShell>
      <PageIntro
        folio="03"
        kicker="Control plane"
        title="Agents, under your mandate."
        lead="Cush Core is AI-native. Risk, routing, reconciliation, and first-line operations run as agents inside policy you write. Nothing material happens that cannot be replayed."
      />

      <section className="border-b border-line bg-paper">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">Procedure</p>
            <h2 className="mt-4 font-display text-3xl font-normal">One instruction, six stations.</h2>
            <p className="mt-4 max-w-[48ch] text-sm leading-relaxed text-muted">
              A static reading of the control plane. Generic models are widely
              available. The advantage here is the institution’s data, its policy,
              and a loop that can pay, flag, or resolve, then show its work.
            </p>
          </div>
          <ol className="border-t border-line lg:col-span-7">
            {procedure.map((step) => (
              <li key={step.index} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-4">
                <span className="font-mono text-xs text-signal">{step.index}</span>
                <div>
                  <p className="font-display text-xl">{step.name}</p>
                  <p className="mt-1 text-sm text-muted">{step.line}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-6xl px-5 pt-16 sm:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">Agents</p>
          <h2 className="mt-4 max-w-[18ch] font-display text-3xl font-normal">Policy stays with the bank.</h2>
        </div>
        <div className="mx-auto max-w-6xl">
          {agents.map((agent) => (
            <article key={agent.id} className="grid gap-3 border-b border-line px-5 py-10 sm:px-8 lg:grid-cols-12 lg:gap-8">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-signal lg:col-span-3">
                {agent.name}
              </p>
              <div className="lg:col-span-9">
                <h3 className="font-display text-2xl font-normal">{agent.title}</h3>
                <p className="mt-3 max-w-[65ch] text-sm leading-relaxed text-muted">{agent.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <div className="mb-10 grid gap-4 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">Replay</p>
              <h2 className="mt-3 font-display text-3xl font-normal">An illustrative posting.</h2>
            </div>
            <p className="max-w-[65ch] text-sm leading-relaxed text-muted lg:col-span-7 lg:pt-8">
              The bank owns thresholds, typologies, escalations, and the permission
              an agent has to act. The walk-through below is illustrative. Production
              uses BLAKE3.
            </p>
          </div>
          <LedgerReplay />
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-14 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="max-w-[52ch] text-sm leading-relaxed text-muted">
            Walk a live instruction from Faster Payments to the customer’s account,
            with the agent traces a supervisor will one day request.
          </p>
          <Button asChild>
            <Link to="/briefing">Request a briefing</Link>
          </Button>
        </div>
      </section>
    </SiteShell>
  );
}
