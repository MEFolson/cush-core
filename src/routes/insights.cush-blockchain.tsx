import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/page-intro";
import { SiteShell } from "@/components/site-shell";
import { pageMeta } from "@/lib/page-meta";
import source from "@/content/cush-blockchain.md?raw";

type Block = { kind: "h2" | "p"; text: string };

const lines = source.split("\n");
const title = (lines.find((l) => l.startsWith("# ")) ?? "").slice(2).trim();
const standfirst = (lines.find((l) => l.startsWith("**Standfirst:**")) ?? "")
  .replace("**Standfirst:**", "")
  .trim();
const byline = (lines.find((l) => /^\*By /.test(l)) ?? "").replace(/^\*|\*$/g, "").trim();
const bodyStart = lines.findIndex((l) => l.trim() === "---");
const blocks: Block[] = lines
  .slice(bodyStart + 1)
  .map((l) => l.trim())
  .filter(Boolean)
  .map((l) => (l.startsWith("## ") ? { kind: "h2", text: l.slice(3) } : { kind: "p", text: l }));

export const Route = createFileRoute("/insights/cush-blockchain")({
  head: () => pageMeta({ title, description: standfirst }),
  component: ArticlePage,
});

function ArticlePage() {
  return (
    <SiteShell>
      <PageIntro folio="Insights" kicker={byline} title={title} lead={standfirst} />
      <article className="bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:py-16">
          <div className="max-w-[68ch] lg:ml-[25%] lg:pl-12">
            {blocks.map((b, i) =>
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
