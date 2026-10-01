import { createFileRoute, Link } from "@tanstack/react-router";
import { AgentField } from "@/components/agent-field";
import { LedgerReplay } from "@/components/ledger-replay";
import { PageIntro } from "@/components/page-intro";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { agents } from "@/lib/site";
import { pageMeta } from "@/lib/page-meta";

export const Route = createFileRoute("/intelligence")({
  head: () =>
    pageMeta({
      title: "Control plane",
      description:
        "Risk, routing, reconciliation and operations agents under your institutional mandate, with full replay.",
    }),
  component: IntelligencePage,
});

function IntelligencePage() {
  return (
    <SiteShell>
      <PageIntro
        folio="03"
        kicker="Intelligence"
        title="Agents, under your mandate."
        lead="Cush Core is AI-native. Risk, routing, reconciliation and first-line operations run as agents inside policy you write. Nothing material happens that cannot be replayed."
      />

      <section className="relative overflow-hidden border-b border-line bg-paper text-ink">
        <AgentField className="h-[280px] sm:h-[340px]" />
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
          <p className="max-w-2xl text-2xl font-medium tracking-[-0.02em] sm:text-3xl">
            Generic intelligence is cheap. The advantage is proprietary data,
            institutional knowledge, and the loop that executes — pay, flag, resolve.
          </p>
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <div className="grid gap-px bg-line sm:grid-cols-2">
            {agents.map((agent, i) => (
              <article key={agent.id} className="bg-paper px-6 py-10 sm:px-8">
                <p className="font-mono text-xs text-muted">
                  {String(i + 1).padStart(2, "0")} / {agent.name}
                </p>
                <h2 className="mt-3 font-display text-3xl font-medium tracking-[-0.03em]">
                  {agent.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted">{agent.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper-2">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="font-mono text-xs tracking-[0.16em] text-muted">Control plane</p>
            <h2 className="mt-3 font-display text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
              Policy stays with you.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              The bank owns thresholds, typologies, escalations and the permission
              an agent has to act. We supply the loop. You supply the mandate.
            </p>
          </div>
          <LedgerReplay />
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-16 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="max-w-lg text-sm leading-relaxed text-muted">
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
