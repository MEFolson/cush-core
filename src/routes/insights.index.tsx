import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro } from "@/components/page-intro";
import { SiteShell } from "@/components/site-shell";
import { articles } from "@/lib/articles";
import { pageMeta } from "@/lib/page-meta";

export const Route = createFileRoute("/insights/")({
  head: () =>
    pageMeta({
      title: "Insights",
      description: "Articles from Cush on the design of Cush Core and the Cush Blockchain.",
    }),
  component: InsightsPage,
});

function InsightsPage() {
  return (
    <SiteShell>
      <PageIntro
        folio="Insights"
        kicker="Insights"
        title="Insights"
        lead="Articles from Cush on the design of Cush Core and the Cush Blockchain."
      />
      <section className="bg-paper">
        <ul className="mx-auto max-w-6xl">
          {articles.map((a) => (
            <li key={a.slug} className="border-b border-line px-5 py-10 sm:px-8">
              <Link to={a.href} className="group block max-w-[68ch] lg:ml-[25%] lg:pl-12">
                <h2 className="font-display text-2xl font-normal group-hover:text-signal">{a.title}</h2>
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-muted">{a.byline}</p>
                <p className="mt-4 text-base leading-relaxed text-muted">{a.standfirst}</p>
                <p className="mt-4 text-sm text-signal">Read the article</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </SiteShell>
  );
}
