import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro } from "@/components/page-intro";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { pageMeta } from "@/lib/page-meta";
import { institutions } from "@/lib/site";

export const Route = createFileRoute("/institutions")({
  head: () =>
    pageMeta({
      title: "Institutions",
      description:
        "Cush Core for global banks, Tier 1 institutions, digital brands, correspondents, and central banks. Sidecar, replatform, or greenfield under your licence.",
    }),
  component: InstitutionsPage,
});

function InstitutionsPage() {
  return (
    <SiteShell>
      <PageIntro
        folio="04"
        kicker="Institutions"
        title="For the house that must still explain the books."
        lead="Cush Core is licensed to banks, payment companies, and governments. The buyer is the institution that sits with the supervisor, the correspondent, and the board."
      />

      <section className="border-b border-line bg-paper">
        <div className="mx-auto grid max-w-6xl lg:grid-cols-12">
          <figure className="border-b border-line px-5 py-10 sm:px-8 lg:col-span-5 lg:border-b-0 lg:border-r lg:py-16">
            <img
              src="/images/global-towers.jpg"
              alt="Institutional skyline. Global banks and Tier 1 houses that must still explain the books."
              className="aspect-[4/5] w-full object-cover"
              width={1280}
              height={800}
              loading="lazy"
            />
            <figcaption className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              Plate · Institutional mandate
            </figcaption>
          </figure>
          <div className="px-5 py-12 sm:px-8 lg:col-span-7 lg:py-16 lg:pl-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">The meeting</p>
            <p className="mt-5 max-w-[36ch] font-display text-3xl font-normal leading-snug sm:text-4xl">
              The core has to survive the supervisor, the correspondent, and the board.
            </p>
            <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-muted">
              A payments overlay can demo a journey. It cannot answer for the books.
              Cush Core is specified for the institution that already has a licence,
              a brand, and a duty to explain postings. Cush Payments, the remittance
              business, runs on this platform. It is a separate site.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              <a
                className="text-ink underline decoration-signal underline-offset-4"
                href="https://cushpayments.com"
                target="_blank"
                rel="noreferrer"
              >
                cushpayments.com
              </a>
              {" · "}
              <a
                className="text-ink underline decoration-signal underline-offset-4"
                href="https://cushpayments.com/core"
                target="_blank"
                rel="noreferrer"
              >
                cushpayments.com/core
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">Buyers</p>
          <h2 className="mt-4 max-w-[22ch] font-display text-3xl font-normal">Four mandates. One system of record.</h2>
        </div>
        <div className="mx-auto hidden max-w-6xl border-t border-line px-5 sm:px-8 lg:grid lg:grid-cols-12">
          <p className="col-span-1 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">No.</p>
          <p className="col-span-4 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Institution</p>
          <p className="col-span-7 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Stance</p>
        </div>
        <ul className="mx-auto max-w-6xl border-t border-line">
          {institutions.map((item) => (
            <li key={item.id} id={item.id} className="scroll-mt-24 border-b border-line">
              <div className="grid gap-3 px-5 py-8 sm:px-8 lg:grid-cols-12 lg:gap-8">
                <p className="font-mono text-xs text-signal lg:col-span-1">{item.index}</p>
                <div className="lg:col-span-4">
                  <h3 className="font-display text-2xl font-normal">{item.name}</h3>
                  <p className="mt-2 text-sm italic text-ink-soft">{item.title}</p>
                </div>
                <p className="max-w-[65ch] text-sm leading-relaxed text-muted lg:col-span-7">{item.body}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="max-w-[48ch] text-sm leading-relaxed text-muted">
            If you already run international, correspondent, or a multi-entity book,
            the briefing walks the stack against that mandate.
          </p>
          <Button asChild>
            <Link to="/briefing">Request a briefing</Link>
          </Button>
        </div>
      </section>
    </SiteShell>
  );
}
