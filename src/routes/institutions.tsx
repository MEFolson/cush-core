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
        "Cush Core for global banks, Tier 1 institutions, digital brands, correspondents and central banks. Sidecar, replatform or greenfield under your licence.",
    }),
  component: InstitutionsPage,
});

function InstitutionsPage() {
  return (
    <SiteShell>
      <PageIntro
        folio="04"
        kicker="Institutions"
        title="For the global bank, not another overlay."
        lead="Cush Core is licensed to banks, payment companies and governments. The buyer is the institution that must still explain the books."
      />

      <section className="border-b border-line bg-paper text-ink">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <p className="max-w-xl text-2xl font-medium tracking-[-0.02em] sm:text-3xl">
              The meeting that matters is with the supervisor, the correspondent, and
              the board. The core has to survive all three.
            </p>
          </div>
          <figure className="lg:col-span-6">
            <img
              src="/images/global-towers.jpg"
              alt="Institutional skyline. Global banks and Tier 1 houses that must still explain the books."
              className="aspect-[16/10] w-full object-cover"
              width={1280}
              height={800}
              loading="lazy"
            />
            <figcaption className="mt-3 font-mono text-xs tracking-[0.14em] text-muted">
              Institutional mandate · One examination
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-paper">
        {institutions.map((item) => (
          <article
            key={item.id}
            id={item.id}
            className="scroll-mt-20 border-b border-line"
          >
            <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-12">
              <p className="font-mono text-xs text-muted lg:col-span-2">{item.index}</p>
              <div className="lg:col-span-4">
                <h2 className="font-display text-3xl font-medium tracking-[-0.03em]">
                  {item.name}
                </h2>
              </div>
              <div className="lg:col-span-6">
                <h3 className="font-display text-xl tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted">{item.body}</p>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="border-b border-line bg-paper-2 text-ink">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <p className="font-mono text-xs tracking-[0.16em] text-muted">Sibling stack</p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            Cush Payments runs on Cush Core. License the platform your remittance stack
            already proves.{" "}
            <a
              className="text-ink underline decoration-line underline-offset-4 hover:opacity-70"
              href="https://cushpayments.com"
              target="_blank"
              rel="noreferrer"
            >
              cushpayments.com
            </a>
            {" · "}
            <a
              className="text-ink underline decoration-line underline-offset-4 hover:opacity-70"
              href="https://cushpayments.com/core"
              target="_blank"
              rel="noreferrer"
            >
              cushpayments.com/core
            </a>
          </p>
        </div>
      </section>

      <section className="bg-paper text-ink">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-16 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="max-w-lg text-sm leading-relaxed text-muted">
            If you already run international, correspondent or a multi-entity
            book, we will walk the stack against that mandate.
          </p>
          <Button asChild variant="primary">
            <Link to="/briefing">Request a briefing</Link>
          </Button>
        </div>
      </section>
    </SiteShell>
  );
}
