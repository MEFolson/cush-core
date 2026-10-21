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
import { CopyAddition, CopyFaq, CopySection } from "@/components/copy-section";
import {
  brandsOneBook,
  contractIsProduct,
  defineOnce,
  onboardingJourney,
  openBanking,
  operatorPortal,
  paymentsProcessing,
  paymentsRailsLine,
  replayExact,
  scaleOut,
} from "@/lib/copy-v2";

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
        lead="Many institutions still stitch a domestic core, a payments hub, and a card processor. Cush Core is the book, the agents, and the rails, licensable under your name."
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
                <div className="lg:col-span-6">
                  <p className="max-w-[65ch] text-sm leading-relaxed text-muted">{item.line}</p>
                  {item.id === "kyc" ? <CopyAddition block={onboardingJourney} className="mt-6" /> : null}
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:grid lg:grid-cols-12">
          <CopyAddition block={defineOnce} className="lg:col-span-8 lg:col-start-5" />
        </div>
      </section>

      <CopySection block={operatorPortal} />

      <CopySection block={scaleOut} />

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <BlueprintStudio />
          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <CopyAddition block={contractIsProduct} />
            <CopyAddition block={brandsOneBook} />
          </div>
        </div>
      </section>

      <CopySection block={replayExact} />

      <section className="border-b border-line bg-paper">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">Adoption</p>
            <h2 className="mt-4 font-display text-3xl font-normal">Sidecar, replatform, or greenfield.</h2>
          </div>
          <p className="max-w-[65ch] text-sm leading-relaxed text-muted lg:col-span-7 lg:pt-10">
            The same licensable core. Three ways in, so the board does not have to
            bet the house on a weekend.
          </p>
        </div>
        <div className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
          <AdoptionPaths />
        </div>
      </section>

      <section className="border-b border-line bg-paper">
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
        <div className="mx-auto max-w-6xl px-5 pt-12 sm:px-8 lg:grid lg:grid-cols-12">
          <div className="lg:col-span-8 lg:col-start-5">
            <CopyAddition
              block={{ ...paymentsProcessing, faq: undefined }}
            />
            <div className="mt-6 max-w-[65ch] border-l-2 border-signal pl-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">Rails</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{paymentsRailsLine}</p>
            </div>
            {paymentsProcessing.faq ? (
              <div className="max-w-[65ch]">
                <CopyFaq faq={paymentsProcessing.faq} />
              </div>
            ) : null}
          </div>
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

      <CopySection block={openBanking} last />
    </SiteShell>
  );
}
