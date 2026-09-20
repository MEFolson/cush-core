import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro } from "@/components/page-intro";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { institutions } from "@/lib/site";

export const Route = createFileRoute("/institutions")({ component: InstitutionsPage });

function InstitutionsPage() {
  return (
    <SiteShell>
      <PageIntro
        folio="04"
        kicker="Institutions"
        title="For African banks and BSPs, not another overlay."
        lead="Cush Core is licensed to banks, payment companies and governments. The buyer is the institution that must still explain the books."
      />

      <section className="border-b border-line bg-night text-night-fg">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <p className="max-w-xl text-2xl font-medium tracking-[-0.02em] sm:text-3xl">
            The meeting that matters is with the supervisor, the correspondent, and
            the board. The core has to survive all three.
          </p>
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

      <section className="bg-night text-night-fg">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-16 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="max-w-lg text-sm leading-relaxed text-night-muted">
            If you already run international, correspondent or a multi-entity
            book, we will walk the stack against that mandate.
          </p>
          <Button asChild variant="invert">
            <Link to="/briefing">Request a briefing</Link>
          </Button>
        </div>
      </section>
    </SiteShell>
  );
}
