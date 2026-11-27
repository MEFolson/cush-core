import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import {
  AGENT_DOCUMENTATION,
  AGENT_ENDPOINT,
  AGENT_INSTRUCTIONS,
  AGENT_METHOD,
  agentDiscoveryMeta,
  formatIndexMarkdown,
  handleAgentSearchRequest,
  parseSearchQuery,
  queryFromBody,
  renderSearchMarkdown,
  SEARCH_CONTENT_TYPE,
  SEARCH_PATH,
  searchDocuments,
  tokenize,
} from "./agent-search.ts";
import { searchCorpus } from "./agent-search-corpus.ts";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "../..");
const companyMarkdown = readFileSync(join(repoRoot, "public/company.md"), "utf8");

describe("tokenize", () => {
  it("drops stop words and keeps meaningful terms", () => {
    assert.deepEqual(tokenize("What is the licensable architecture?"), [
      "licensable",
      "architecture",
    ]);
  });
});

describe("corpus", () => {
  it("indexes real company.md sections without changing the file", () => {
    const sections = searchCorpus.filter((doc) => doc.path.startsWith("/company.md"));
    assert.ok(sections.length >= 8);
    assert.ok(sections.some((doc) => doc.path === "/company.md"));
    assert.ok(sections.some((doc) => doc.path === "/company.md#1-cush-in-one-paragraph"));
    const joined = sections.map((doc) => doc.content).join("\n");
    assert.ok(joined.includes("DRAFT, NOT PUBLISHED. Pending Matthew Ekow Folson's approval."));
    assert.ok(
      joined.includes("Cush is pre revenue. No customers, volumes or revenue are claimed."),
    );
    assert.equal(companyMarkdown.includes("DRAFT, NOT PUBLISHED"), true);
  });

  it("indexes public site pages from existing copy", () => {
    const paths = new Set(searchCorpus.map((doc) => doc.path));
    for (const path of [
      "/",
      "/platform",
      "/intelligence",
      "/institutions",
      "/trust",
      "/insights",
      "/insights/cush-blockchain",
      "/briefing",
      "/sandbox",
    ]) {
      assert.ok(paths.has(path), `missing ${path}`);
    }
  });
});

describe("searchDocuments", () => {
  it("ranks licensable content and formats a Cloudflare-style result", () => {
    const hits = searchDocuments("licensable");
    assert.ok(hits.length > 0);
    assert.equal(hits[0]!.score, 1);
    assert.ok(hits.every((hit) => hit.score >= 0 && hit.score <= 1));
    assert.ok(hits.some((hit) => /licensable/i.test(`${hit.title}\n${hit.content}`)));
    const markdown = renderSearchMarkdown("licensable");
    assert.match(markdown, /^# Search results for: "licensable"/);
    assert.match(markdown, /## \/\S+ \(score: \d\.\d{3}\)/);
    assert.match(markdown, /\n---\n/);
  });

  it("returns architecture and company matches from real pages", () => {
    const architecture = searchDocuments("architecture");
    assert.ok(
      architecture.some((hit) => hit.path === "/platform" || hit.path.startsWith("/platform#")),
    );
    const company = searchDocuments("company");
    assert.ok(company.some((hit) => hit.path.startsWith("/company.md")));
  });

  it("returns a no-match guide listing available sections", () => {
    const markdown = renderSearchMarkdown("xyzzy-not-a-cush-topic");
    assert.match(markdown, /No matching sections were found/);
    assert.match(markdown, /`\/platform` — Architecture/);
    assert.match(markdown, /`\/company.md`/);
  });
});

describe("index and discovery", () => {
  it("describes usage and lists pages when the query is empty", () => {
    const markdown = formatIndexMarkdown();
    assert.match(markdown, /^# Search this site/);
    assert.ok(markdown.includes(AGENT_INSTRUCTIONS));
    assert.ok(markdown.includes(AGENT_ENDPOINT));
    assert.match(markdown, /QUERY or POST/);
    assert.match(markdown, /`\/` — Cush Core/);
    assert.match(markdown, /`\/company.md`/);
    for (const banned of [
      " licensed",
      " live ",
      "regulated",
      "incorporated",
      "co-founder",
      "part time",
    ]) {
      assert.equal(markdown.toLowerCase().includes(banned.trim().toLowerCase()), false, banned);
    }
  });

  it("exposes Cloudflare discovery meta tags", () => {
    const meta = agentDiscoveryMeta();
    assert.deepEqual(
      meta.map((item) => item.name),
      ["agent:instructions", "agent:endpoint", "agent:method", "agent:documentation"],
    );
    assert.equal(meta[0]!.content, AGENT_INSTRUCTIONS);
    assert.equal(meta[1]!.content, AGENT_ENDPOINT);
    assert.equal(meta[2]!.content, AGENT_METHOD);
    assert.equal(meta[3]!.content, AGENT_DOCUMENTATION);
  });
});

describe("parseSearchQuery and HTTP handler", () => {
  it("reads GET query strings and QUERY/POST bodies", async () => {
    const getQuery = await parseSearchQuery(
      new Request("https://cush-core.com/.well-known/search?q=licensable"),
    );
    assert.equal(getQuery, "licensable");
    assert.equal(queryFromBody("architecture", "text/plain"), "architecture");
    assert.equal(queryFromBody(JSON.stringify({ q: "company" }), "application/json"), "company");
    const fromJson = await parseSearchQuery(
      new Request("https://cush-core.com/.well-known/search", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ q: "BLAKE3 ledger" }),
      }),
    );
    assert.equal(fromJson, "BLAKE3 ledger");
  });

  it("returns markdown for GET and an index for an empty query", async () => {
    const search = await handleAgentSearchRequest(
      new Request("https://cush-core.com/.well-known/search?q=licensable"),
    );
    assert.equal(search.status, 200);
    assert.equal(search.headers.get("content-type"), SEARCH_CONTENT_TYPE);
    assert.equal(search.headers.get("allow")?.includes("QUERY"), true);
    const body = await search.text();
    assert.match(body, /# Search results for: "licensable"/);

    const index = await handleAgentSearchRequest(
      new Request("https://cush-core.com/.well-known/search"),
    );
    assert.equal(index.status, 200);
    assert.match(await index.text(), /# Search this site/);
  });

  it("supports OPTIONS and HEAD", async () => {
    const options = await handleAgentSearchRequest(
      new Request("https://cush-core.com/.well-known/search", { method: "OPTIONS" }),
    );
    assert.equal(options.status, 204);
    assert.equal(options.headers.get("allow")?.includes("GET"), true);
    assert.equal(await options.text(), "");

    const head = await handleAgentSearchRequest(
      new Request("https://cush-core.com/.well-known/search?q=architecture", { method: "HEAD" }),
    );
    assert.equal(head.status, 200);
    assert.equal(head.headers.get("content-type"), SEARCH_CONTENT_TYPE);
    assert.equal(await head.text(), "");
  });

  it("rejects unsupported methods", async () => {
    const response = await handleAgentSearchRequest(
      new Request("https://cush-core.com/.well-known/search", { method: "DELETE" }),
    );
    assert.equal(response.status, 405);
  });

  it("keeps the well-known path stable", () => {
    assert.equal(SEARCH_PATH, "/.well-known/search");
    assert.equal(AGENT_ENDPOINT, "https://cush-core.com/.well-known/search?q={query}");
  });
});
