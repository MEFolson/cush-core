import cushBlockchainSource from "@/content/cush-blockchain.md?raw";

export type ArticleBlock = { kind: "h2" | "p"; text: string };
export type Article = {
  slug: string;
  href: string;
  title: string;
  standfirst: string;
  byline: string;
  blocks: ArticleBlock[];
};

function parse(slug: string, source: string): Article {
  const lines = source.split("\n");
  const title = (lines.find((l) => l.startsWith("# ")) ?? "").slice(2).trim();
  const standfirst = (lines.find((l) => l.startsWith("**Standfirst:**")) ?? "")
    .replace("**Standfirst:**", "")
    .trim();
  const byline = (lines.find((l) => /^\*By /.test(l)) ?? "").replace(/^\*|\*$/g, "").trim();
  const bodyStart = lines.findIndex((l) => l.trim() === "---");
  const blocks: ArticleBlock[] = lines
    .slice(bodyStart + 1)
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => (l.startsWith("## ") ? { kind: "h2", text: l.slice(3) } : { kind: "p", text: l }));
  return { slug, href: `/insights/${slug}`, title, standfirst, byline, blocks };
}

export const cushBlockchain = parse("cush-blockchain", cushBlockchainSource);
export const articles: Article[] = [cushBlockchain];
