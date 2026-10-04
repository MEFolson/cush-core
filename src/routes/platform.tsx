import { createFileRoute, Link } from "@tanstack/react-router";
import { ArchitectureExplorer } from "@/components/architecture-explorer";
import { BlueprintStudio } from "@/components/blueprint-studio";
import { RailIndex } from "@/components/rail-index";
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
        "Four layers under one examination: product catalogue, orchestration, immutable ledger, and multi-rail connectivity.",
    }),
  component: PlatformPage,
});

function PlatformPage() {
  return (
    <SiteShell>
      <PageIntro
        folio="02"
        kicker="Architecture"
        title="From the account to the rail."
        lead="Many institutions still stitch a domestic core, a payments hub, and a card processor. Cush Core is the book, the agents, and the rails, licensed under your name."
      />

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          <ArchitectureExplorer />
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">Catalogue</p>
            <h2 className="mt-4 font-display text-3xl font-normal">What the institution can issue.</h2>
          </div>
          <p className="max-w-[65ch] text-sm leading-relaxed text-muted lg:col-span-8 lg:pt-10">
            Each product is a governed blueprint on the same ledger. Customers see
            the institution. The examination sees one book.
          </p>
        </div>
        <ul className="mx-auto max-w-6xl border-t border-line">
          {products.map((item, i) => (
            <li key={item.id} className="border-b border-line">
              <div className="grid gap-2 px-5 py-6 sm:px-8 lg:grid-cols-12 lg:gap-8">
                <p className="font-mono text-xs text-signal lg:col-span-2">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display text-2xl font-normal lg:col-span-4">{item.name}</h3>
                <p className="max-w-[65ch] text-sm leading-relaxed text-muted lg:col-span-6">{item.line}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <BlueprintStudio />
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">Adoption</p>
            <h2 className="mt-4 font-display text-3xl font-normal">Sidecar, replatform, or greenfield.</h2>
          </div>
          <p className="max-w-[65ch] text-sm leading-relaxed text-muted lg:col-span-7 lg:pt-10">
            The same licensed core. Three ways in, so the board does not have to
            bet the house on a weekend.
          </p>
        </div>
        <div className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
          <AdoptionPaths />
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">Connectivity</p>
            <h2 className="mt-4 font-display text-3xl font-normal text-ink">On-ramp in. Off-ramp out.</h2>
          </div>
          <p className="max-w-[48ch] text-sm leading-relaxed text-muted lg:col-span-5">
            Faster Payments, SEPA, Fedwire, cards, and SWIFT inbound. CHAPS, TARGET2,
            FAST, PIX, and SWIFT outbound. Agents route. The ledger is the book.
          </p>
        </div>
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <RailIndex />
        </div>
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="max-w-[48ch] text-sm leading-relaxed text-muted">
            Commercial terms, including the per-customer model, are set in the briefing
            and recorded under Governance.
          </p>
          <Button asChild>
            <Link to="/briefing">Discuss a licence</Link>
          </Button>
        </div>
      </section>
    </SiteShell>
  );
}
