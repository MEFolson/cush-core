import { createFileRoute, Link } from "@tanstack/react-router";
import { ArchitectureExplorer } from "@/components/architecture-explorer";
import { BlueprintStudio } from "@/components/blueprint-studio";
import { RailMesh } from "@/components/rail-mesh";
import { PageIntro } from "@/components/page-intro";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/site";
import { AdoptionPaths } from "@/components/adoption-paths";
import { pageMeta } from "@/lib/page-meta";

export const Route = createFileRoute("/platform")({
  head: () =>
    pageMeta({
      title: "Architecture",
      description:
        "Four layers under one examination: product catalogue, orchestration, immutable ledger and multi-rail connectivity.",
    }),
  component: PlatformPage,
});

function PlatformPage() {
  return (
    <SiteShell>
      <PageIntro
        folio="02"
        kicker="Platform"
        title="One system, from the account to the rail."
        lead="Many institutions still stitch a domestic core, a payments hub and a card processor. Cush Core is the book, the agents and the rails — licensed under your name."
      />

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <ArchitectureExplorer />
        </div>
      </section>

      <section className="border-b border-line bg-paper-2">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <p className="font-mono text-xs tracking-[0.16em] text-muted">Catalogue</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
            What the institution can offer.
          </h2>
          <ul className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
            {products.map((item, i) => (
              <li key={item.id} className="bg-paper px-6 py-8">
                <p className="font-mono text-xs text-muted">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-2xl tracking-[-0.02em]">{item.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <BlueprintStudio />
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <p className="font-mono text-xs tracking-[0.16em] text-muted">Adoption</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
            Sidecar. Replatform. Greenfield.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
            The same licensed core. Three ways in — so the board does not have to
            bet the house on a weekend.
          </p>
          <div className="mt-10">
            <AdoptionPaths />
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <p className="font-mono text-xs tracking-[0.16em] text-signal">Connectivity</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-medium tracking-[-0.03em] text-ink sm:text-4xl">
            On-ramp in. Off-ramp out.
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
            FPS, SEPA, Fedwire, cards and SWIFT inbound. CHAPS, TARGET2, FAST, PIX
            and SWIFT outbound. Agents route; the ledger is the book.
          </p>
          <div className="mt-10">
            <RailMesh />
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">
              Simple per-customer price. Approximately one dollar a month, wherever you operate.
            </p>
            <Button asChild variant="primary">
              <Link to="/briefing">Discuss a licence</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
