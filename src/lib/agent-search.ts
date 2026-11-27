import { searchCorpus, type SearchDocument } from "./agent-search-corpus";

export type { SearchDocument };

export const AGENT_INSTRUCTIONS =
  "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown.";
export const AGENT_ENDPOINT = "https://cush-core.com/.well-known/search?q={query}";
export const AGENT_METHOD = "GET";
export const AGENT_DOCUMENTATION =
  "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/";
export const SEARCH_PATH = "/.well-known/search";
export const SEARCH_CONTENT_TYPE = "text/markdown; charset=utf-8";
export const SEARCH_ALLOWED_METHODS = "GET, QUERY, POST, HEAD, OPTIONS";
export const MAX_RESULTS = 10;
export const MAX_QUERY_LENGTH = 500;
export const MATCH_THRESHOLD = 0.15;

const STOP_WORDS = new Set([
  "a",
  "an",
  "the",
  "and",
  "or",
  "of",
  "to",
  "in",
  "on",
  "for",
  "at",
  "as",
  "by",
  "is",
  "are",
  "be",
  "was",
  "were",
  "it",
  "its",
  "this",
  "that",
  "with",
  "from",
  "into",
  "about",
  "than",
  "then",
  "so",
  "if",
  "not",
  "no",
  "can",
  "will",
  "our",
  "your",
  "you",
  "we",
  "their",
  "them",
  "they",
  "but",
  "also",
  "how",
  "what",
  "when",
  "who",
  "which",
  "do",
  "does",
  "did",
]);

export type SearchHit = {
  path: string;
  title: string;
  content: string;
  score: number;
};

export function agentDiscoveryMeta(): Array<{ name: string; content: string }> {
  return [
    { name: "agent:instructions", content: AGENT_INSTRUCTIONS },
    { name: "agent:endpoint", content: AGENT_ENDPOINT },
    { name: "agent:method", content: AGENT_METHOD },
    { name: "agent:documentation", content: AGENT_DOCUMENTATION },
  ];
}

export function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .split(/[^a-z0-9]+/i)
    .map((token) => token.trim())
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function tokenBoundary(token: string): RegExp {
  return new RegExp(`(?:^|[^a-z0-9])${escapeRegExp(token)}(?=[^a-z0-9]|$)`, "gi");
}

function hasToken(text: string, token: string): boolean {
  tokenBoundary(token).lastIndex = 0;
  return tokenBoundary(token).test(text);
}

function tokenCount(text: string, token: string): number {
  const matches = text.match(tokenBoundary(token));
  return matches?.length ?? 0;
}

/** Raw relevance in 0..1 before per-query normalisation. */
export function rawScore(doc: SearchDocument, query: string): number {
  const phrase = query.trim().toLowerCase();
  if (!phrase) return 0;
  const tokens = tokenize(query);
  const title = doc.title.toLowerCase();
  const path = doc.path.toLowerCase();
  const body = doc.content.toLowerCase();
  const haystack = `${title}\n${path}\n${body}`;

  if (!tokens.length) {
    return haystack.includes(phrase) ? 0.5 : 0;
  }

  let titleHits = 0;
  let pathHits = 0;
  let bodyHits = 0;
  let frequency = 0;
  const unmatchedLong: string[] = [];
  for (const token of tokens) {
    const inTitle = hasToken(title, token);
    const inPath = hasToken(path, token);
    const inBody = hasToken(body, token);
    if (inTitle) titleHits += 1;
    if (inPath) pathHits += 1;
    if (inBody) bodyHits += 1;
    frequency += tokenCount(body, token) + tokenCount(title, token);
    if (!inTitle && !inPath && !inBody && token.length >= 5) unmatchedLong.push(token);
  }

  const phraseInTitle = phrase.length >= 3 && title.includes(phrase);
  const phraseInBody = phrase.length >= 3 && body.includes(phrase);
  const matchedTokens = tokens.filter(
    (token) => hasToken(title, token) || hasToken(path, token) || hasToken(body, token),
  ).length;
  const coverage = matchedTokens / tokens.length;
  if (!phraseInTitle && !phraseInBody && matchedTokens === 0) {
    return 0;
  }
  // Reject queries whose distinctive terms are absent, so noise like
  // "xyzzy-not-a-cush-topic" does not match every document that mentions Cush.
  if (!phraseInTitle && !phraseInBody && (coverage < 0.5 || unmatchedLong.length > 0)) {
    return 0;
  }

  let score = 0;
  if (phraseInTitle) score += 0.7;
  else if (phraseInBody) score += 0.4;
  score += 0.35 * (titleHits / tokens.length);
  score += 0.25 * (bodyHits / tokens.length);
  score += 0.1 * (pathHits / tokens.length);
  score += Math.min(0.2, frequency / 40);
  return Math.min(1, score);
}

export function searchDocuments(
  query: string,
  corpus: SearchDocument[] = searchCorpus,
): SearchHit[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const scored = corpus
    .map((doc) => ({
      path: doc.path,
      title: doc.title,
      content: doc.content,
      score: rawScore(doc, trimmed),
    }))
    .filter((hit) => hit.score >= MATCH_THRESHOLD)
    .sort((a, b) => b.score - a.score || a.path.localeCompare(b.path))
    .slice(0, MAX_RESULTS);

  if (!scored.length) return [];
  const max = scored[0]!.score;
  return scored.map((hit) => ({
    ...hit,
    score: max > 0 ? hit.score / max : 0,
  }));
}

function listedDocuments(corpus: SearchDocument[]): SearchDocument[] {
  return corpus.filter((doc) => doc.listed);
}

function indexList(corpus: SearchDocument[]): string {
  return listedDocuments(corpus)
    .map((doc) => `- \`${doc.path}\` — ${doc.title}`)
    .join("\n");
}

export function formatIndexMarkdown(corpus: SearchDocument[] = searchCorpus): string {
  return [
    "# Search this site",
    "",
    AGENT_INSTRUCTIONS,
    "",
    "## How to query",
    "",
    `- GET ${AGENT_ENDPOINT}`,
    `- QUERY or POST https://cush-core.com${SEARCH_PATH} with a UTF-8 plain-text body, or a JSON body \`{"q":"..."}\``,
    "",
    "Results include source paths and a relevance score between 0.000 and 1.000.",
    "",
    "## Available pages and sections",
    "",
    indexList(corpus),
    "",
    "The file at `/company.md` is unchanged Markdown for existing readers. HTML pages advertise this endpoint with `agent:*` meta tags.",
    "",
  ].join("\n");
}

export function formatNoResultsMarkdown(
  query: string,
  corpus: SearchDocument[] = searchCorpus,
): string {
  return [
    `# Search results for: "${query}"`,
    "",
    "No matching sections were found for this query.",
    "",
    "These are some of the sections available to search:",
    "",
    indexList(corpus),
    "",
  ].join("\n");
}

export function formatResultsMarkdown(query: string, hits: SearchHit[]): string {
  const blocks = hits.map((hit) => {
    const heading = `## ${hit.path} (score: ${hit.score.toFixed(3)})`;
    const titleLine =
      hit.content.startsWith("# ") || hit.content.startsWith("## ") ? "" : `# ${hit.title}`;
    const body = [titleLine, hit.content].filter(Boolean).join("\n\n");
    return `${heading}\n\n${body}`;
  });
  return [`# Search results for: "${query}"`, "", blocks.join("\n\n---\n\n"), ""].join("\n");
}

export function renderSearchMarkdown(
  query: string,
  corpus: SearchDocument[] = searchCorpus,
): string {
  const trimmed = query.trim();
  if (!trimmed) return formatIndexMarkdown(corpus);
  const hits = searchDocuments(trimmed, corpus);
  if (!hits.length) return formatNoResultsMarkdown(trimmed, corpus);
  return formatResultsMarkdown(trimmed, hits);
}

export function markdownHeaders(): Headers {
  return new Headers({
    "content-type": SEARCH_CONTENT_TYPE,
    "cache-control": "public, max-age=60",
    allow: SEARCH_ALLOWED_METHODS,
  });
}

function clipQuery(value: string): string {
  const trimmed = value.replace(/^\uFEFF/, "").trim();
  return trimmed.length > MAX_QUERY_LENGTH ? trimmed.slice(0, MAX_QUERY_LENGTH) : trimmed;
}

function queryFromUrl(url: URL): string {
  return clipQuery(url.searchParams.get("q") ?? "");
}

function queryFromJson(body: string): string {
  try {
    const parsed = JSON.parse(body) as unknown;
    if (parsed && typeof parsed === "object" && "q" in parsed) {
      const value = (parsed as { q: unknown }).q;
      return clipQuery(typeof value === "string" ? value : "");
    }
  } catch {
    // Fall through to treating the body as plain text.
  }
  return clipQuery(body);
}

export function queryFromBody(body: string, contentType: string): string {
  const type = contentType.toLowerCase();
  if (type.includes("application/json")) return queryFromJson(body);
  return clipQuery(body);
}

export async function parseSearchQuery(request: Request, url?: URL): Promise<string> {
  const target = url ?? new URL(request.url);
  const method = (request.method || "GET").toUpperCase();
  if (method === "GET" || method === "HEAD" || method === "OPTIONS") {
    return queryFromUrl(target);
  }
  let body = "";
  try {
    body = await request.text();
  } catch {
    body = "";
  }
  const fromBody = queryFromBody(body, request.headers.get("content-type") ?? "");
  return fromBody || queryFromUrl(target);
}

export async function handleAgentSearchRequest(
  request: Request,
  url: URL = new URL(request.url),
): Promise<Response> {
  const method = (request.method || "GET").toUpperCase();
  const headers = markdownHeaders();

  if (method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  if (!["GET", "HEAD", "POST", "QUERY"].includes(method)) {
    return new Response("Method not allowed. Use GET, QUERY, or POST.\n", {
      status: 405,
      headers,
    });
  }

  const query = await parseSearchQuery(request, url);
  const markdown = renderSearchMarkdown(query);
  if (method === "HEAD") {
    headers.set("content-length", String(new TextEncoder().encode(markdown).byteLength));
    return new Response(null, { status: 200, headers });
  }
  return new Response(markdown, { status: 200, headers });
}
