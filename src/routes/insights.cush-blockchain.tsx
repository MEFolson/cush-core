import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/page-intro";
import { SiteShell } from "@/components/site-shell";
import { cushBlockchain as article } from "@/lib/articles";
import { pageMeta } from "@/lib/page-meta";

export const Route = createFileRoute("/insights/cush-blockchain")({
  head: () => pageMeta({ title: article.title, description: article.standfirst }),
  component: ArticlePage,
});

function ArticlePage() {
  return (
    <SiteShell>
      <PageIntro folio="Insights" kicker={article.byline} title={article.title} lead={article.standfirst} />
      <article className="bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:py-16">
          <div className="max-w-[68ch] lg:ml-[25%] lg:pl-12">
            {article.blocks.map((b, i) =>
              b.kind === "h2" ? (
                <h2 key={i} className="mt-12 font-display text-2xl font-normal first:mt-0">
                  {b.text}
                </h2>
              ) : (
                <p key={i} className="mt-5 text-base leading-relaxed">
                  {b.text}
                </p>
              ),
            )}
          </div>
        </div>
      </article>
    </SiteShell>
  );
}
