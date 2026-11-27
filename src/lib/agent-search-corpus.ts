import companyMarkdown from "../../public/company.md?raw";
import cushBlockchainSource from "../content/cush-blockchain.md?raw";
import {
  accessControl,
  authentication,
  brandsEcho,
  brandsOneBook,
  complianceByDesign,
  contractIsProduct,
  cushBlockchain as cushBlockchainCopy,
  customerNetwork,
  defineOnce,
  examinerNode,
  governedAgents,
  heroOption,
  intentAndExecution,
  objectLedger,
  observability,
  oneArchitecture,
  oneRecord,
  onboardingJourney,
  openBanking,
  operatorPortal,
  paymentsProcessing,
  paymentsRailsLine,
  replayExact,
  scaleOut,
  securityLayers,
  setsApart,
  type CopyBlock,
} from "./copy-v2";
import {
  adoptionPaths,
  agents,
  blueprintCatalog,
  comparison,
  examinationFaqs,
  furtherReading,
  institutions,
  layers,
  leadership,
  offRamps,
  onRamps,
  products,
  sandbox,
  site,
  trustPoints,
} from "./site";

export type SearchDocument = {
  /** Site path or section anchor, e.g. `/platform` or `/company.md#1-cush-in-one-paragraph`. */
  path: string;
  title: string;
  content: string;
  /** When true, the empty-query index lists this document. */
  listed?: boolean;
};

function articleMeta(source: string): { title: string; standfirst: string; byline: string } {
  const lines = source.split("\n");
  const title = (lines.find((line) => line.startsWith("# ")) ?? "").slice(2).trim();
  const standfirst = (lines.find((line) => line.startsWith("**Standfirst:**")) ?? "")
    .replace("**Standfirst:**", "")
    .trim();
  const byline = (lines.find((line) => /^\*By /.test(line)) ?? "").replace(/^\*|\*$/g, "").trim();
  return { title, standfirst, byline };
}

const cushBlockchainMeta = articleMeta(cushBlockchainSource);

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function joinParts(parts: Array<string | undefined | false>): string {
  return parts
    .filter((part): part is string => Boolean(part && part.trim()))
    .join("\n\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function documentFromParts(
  path: string,
  title: string,
  parts: Array<string | undefined | false>,
  listed = false,
): SearchDocument {
  return { path, title, content: joinParts(parts), listed };
}

function formatCopy(block: CopyBlock): string {
  return joinParts([
    block.eyebrow,
    block.headline,
    ...(block.body ?? []),
    ...(block.items ?? []).map((item) => `**${item.label}** ${item.text}`),
    block.faq ? `Q: ${block.faq.q}\nA: ${block.faq.a}` : "",
  ]);
}

function documentFromCopy(pathPrefix: string, block: CopyBlock): SearchDocument {
  return documentFromParts(`${pathPrefix}#${block.id}`, block.headline, [formatCopy(block)]);
}

export function splitMarkdownSections(filePath: string, source: string): SearchDocument[] {
  const text = source.replace(/\r\n/g, "\n").trim();
  if (!text) return [];
  const parts = text.split(/^(?=## )/m);
  return parts.map((part, index) => {
    const body = part.trim();
    const first = body.split("\n", 1)[0] ?? "";
    const title = first.replace(/^#+\s+/, "").trim() || filePath;
    const path = index === 0 ? filePath : `${filePath}#${slugify(title)}`;
    return documentFromParts(path, title, [body], true);
  });
}

// Unique on-page sentences that are not already exported from site.ts / copy-v2.
// Quoted verbatim from the route files so the index stays aligned with the site.
const pageCopy = {
  homeKicker: "Licensable core",
  homeIndex:
    "One licensable system of record. Four layers under one examination. A description of the product, not a record of volume.",
  homeComparisonTitle: "Vertical apps added dependencies.",
  homeComparisonQuote: "They added an architecture of dependencies.",
  homeComparisonBody: [
    "Institutions spent a decade assembling best-of-breed stacks. Each purchase was rational. Together they produced dependency debt: reconciliations, vendor models, and a change programme for every product. Generative AI has made that estate more expensive, because coordination, not code, is now the bottleneck.",
    "Cush Core is the opposite move. A vertically integrated system of record: product, orchestration, ledger, and rails under one examination. Policy stays with the institution. Customers see your brand. Supervisors see your books.",
    "After Jose Luis Caldeira, “The Vertically Integrated Bank”, 2026.",
  ],
  homeBlueprintsTitle: "Outcomes, not silos",
  homeBlueprintsLead:
    "Governed blueprints let a bank combine lending, savings and payments around what a customer is trying to achieve, while the ledger records the evidence behind every step.",
  homeRailsTitle: "Clearing and settlement on the same book.",
  homeRailsLead:
    "Inbound schemes post to the ledger. Outbound schemes leave from it. There is no second payments hub reconciling after the fact.",
  homePrincipalsTitle: "The people who will sit the examination.",
  homePrincipalsLead:
    "80+ years in payments belongs with these careers. It is not an operating metric of the platform. Direct CHAPS membership lineage sits with the founder: the first non-bank PSP onboarded by the Bank of England as a Direct CHAPS member.",
  homeBriefingTitle: "Walk the control plane with a principal.",
  homeBriefingLead:
    "Brief us on the mandate. We will walk ledger, agents, rails, and the evidence a supervisor will require. A principal replies. This is not a public waitlist.",
  platformTitle: "From the account to the rail.",
  platformLead:
    "Many institutions still stitch a domestic core, a payments hub, and a card processor. Cush Core is the book, the agents, and the rails, licensable under your name.",
  platformDescription:
    "Four layers under one examination: product catalogue, orchestration, immutable ledger, and multi-rail connectivity.",
  platformCatalogueTitle: "What the institution can issue.",
  platformCatalogueLead:
    "Each product is a governed blueprint on the same ledger. Customers see the institution. The examination sees one book.",
  platformAdoptionTitle: "Sidecar, replatform, or greenfield.",
  platformAdoptionLead:
    "The same licensable core. Three ways in, so the board does not have to bet the house on a weekend.",
  platformRailsTitle: "On-ramp in. Off-ramp out.",
  platformRailsLead:
    "Faster Payments, SEPA, Fedwire, cards, and SWIFT inbound. CHAPS, TARGET2, FAST, PIX, and SWIFT outbound. Routing follows rules you set. The ledger is the book.",
  platformCommercial:
    "Commercial terms, including the per-customer model, are set in the briefing and recorded under Governance.",
  intelligenceTitle: "Agents, under your mandate.",
  intelligenceLead:
    "Cush Core is AI-native. Risk, routing, reconciliation, and first-line operations run as agents inside policy you write. Nothing material happens that cannot be replayed.",
  intelligenceDescription:
    "Risk, routing, reconciliation, and operations agents under your institutional mandate, with full replay.",
  intelligenceProcedureTitle: "One instruction, six stations.",
  intelligenceProcedureLead: [
    "A static reading of the control plane. Generic models are widely available. The advantage here is the institution’s data, its policy, and a loop that can pay, flag, or resolve, then show its work.",
    "Not a chatbot on yesterday's ledger. Governed agents that weigh trade offs inside consent and regulatory boundaries, with every decision replayable for the supervisor the same afternoon.",
  ],
  intelligenceAgentsTitle: "Policy stays with the bank.",
  intelligenceProcedure: [
    { index: "01", name: "On-ramp", line: "The instruction arrives on a named scheme." },
    { index: "06", name: "Off-ramp", line: "Settlement leaves only after the trace exists." },
  ],
  institutionsTitle: "For the house that must still explain the books.",
  institutionsLead:
    "Cush Core is licensable by banks, payment companies, and governments. The buyer is the institution that sits with the supervisor, the correspondent, and the board.",
  institutionsDescription:
    "Cush Core for global banks, Tier 1 institutions, digital brands, correspondents, and central banks. Sidecar, replatform, or greenfield under your licence.",
  institutionsMeeting: "The core has to survive the supervisor, the correspondent, and the board.",
  institutionsBody:
    "A payments overlay can demo a journey. It cannot answer for the books. Cush Core is specified for the institution that already has a licence, a brand, and a duty to explain postings. Cush Payments, the remittance business, runs on this platform. It is a separate site.",
  trustTitle: "Built to be examined.",
  trustLead:
    "Every payment is recorded. Every decision can be replayed. The ledger is the evidence a supervisor, an auditor, and a correspondent bank can sit with.",
  trustDescription:
    "Immutable BLAKE3 ledger, agents under mandate, and principals with decades in payments. Built to be examined.",
  trustLedgerLead:
    "The design writes every posting to the Cush Blockchain, an append only ledger hash linked with BLAKE3. Multi-entity books across companies, countries, and currencies. Agents follow rules the institution writes.",
  insightsDescription: "Articles from Cush on the design of Cush Core and the Cush Blockchain.",
  insightsLead:
    "Notes from the Cush team on how Cush Core and the Cush Blockchain are designed for banks, payment companies and central banks.",
  briefingTitle: "A private walk-through of the control plane.",
  briefingLead:
    "For CIOs, heads of correspondent banking, international, and core modernisation. Not a waitlist. A principal replies.",
  briefingDescription:
    "Private walk-through of the Cush Core control plane for CIOs, correspondent banking, and core modernisation.",
  briefingCover: [
    { index: "01", line: "The four-layer stack against your mandate." },
    { index: "02", line: "Product blueprints for the licences you already hold." },
    { index: "03", line: "A replayed instruction from Faster Payments to the last mile." },
    { index: "04", line: "Books, isolation, and what a sandbox will ask to see." },
  ],
  briefingForm: "The form is the contact. It is delivered by email to a principal.",
  sandboxTitle: "A hands-on look at what’s possible.",
  sandboxDescription:
    "A hands-on look at what’s possible. The Cush Core sandbox for global banks, Tier 1 institutions, and central banks.",
  sandboxLead:
    "We’re getting the Cush Core sandbox ready. Soon, global banks, Tier 1 institutions, and central banks will be able to explore the platform.",
  sandboxStatus: "The sandbox is being prepared. Request access to be notified.",
} as const;

function railsText(): string {
  return [...onRamps, ...offRamps]
    .map((rail) => `${rail.code}. ${rail.name} (${rail.region}, ${rail.kind}). ${rail.blurb}`)
    .join("\n");
}

function comparisonText(): string {
  const header = comparison.columns.join(" | ");
  const rows = comparison.rows.map(
    (row) =>
      `${row.label}: ${row.cells.map((cell, i) => `${comparison.columns[i]} — ${cell}`).join("; ")}`,
  );
  return [header, ...rows].join("\n");
}

function leadershipText(): string {
  return leadership.map((person) => `${person.name}, ${person.role}. ${person.line}`).join("\n\n");
}

export function buildSearchCorpus(): SearchDocument[] {
  const docs: SearchDocument[] = [];

  docs.push(
    documentFromParts(
      "/",
      "Cush Core · Licensable core banking for global banks, Tier 1 and central banks",
      [
        site.name,
        site.tagline,
        site.dek,
        pageCopy.homeKicker,
        heroOption.headline,
        heroOption.dek,
        heroOption.closing,
        pageCopy.homeIndex,
        ...layers.map((layer) => `${layer.index}. ${layer.name}. ${layer.title}`),
        ...furtherReading.map((item) => `${item.index}. ${item.label}. ${item.line}`),
      ],
      true,
    ),
    documentFromParts("/#distinctive", setsApart.headline, [formatCopy(setsApart)]),
    documentFromParts("/#comparison", pageCopy.homeComparisonTitle, [
      pageCopy.homeComparisonQuote,
      ...pageCopy.homeComparisonBody,
      comparisonText(),
    ]),
    documentFromCopy("/", oneArchitecture),
    documentFromParts("/#blueprints", pageCopy.homeBlueprintsTitle, [pageCopy.homeBlueprintsLead]),
    documentFromParts("/#rails", pageCopy.homeRailsTitle, [pageCopy.homeRailsLead, railsText()]),
    documentFromParts("/#principals", pageCopy.homePrincipalsTitle, [
      pageCopy.homePrincipalsLead,
      leadershipText(),
    ]),
    documentFromParts("/#briefing", pageCopy.homeBriefingTitle, [pageCopy.homeBriefingLead]),
  );

  docs.push(
    documentFromParts(
      "/platform",
      "Architecture",
      [
        pageCopy.platformTitle,
        pageCopy.platformLead,
        pageCopy.platformDescription,
        ...layers.map(
          (layer) =>
            `${layer.index}. ${layer.name}. ${layer.title}\n${layer.body}\n${layer.points.join("\n")}`,
        ),
      ],
      true,
    ),
    documentFromParts("/platform#catalogue", pageCopy.platformCatalogueTitle, [
      pageCopy.platformCatalogueLead,
      ...products.map((item) => `${item.name}. ${item.line}`),
      formatCopy(onboardingJourney),
      formatCopy(defineOnce),
      ...blueprintCatalog.map((item) => item.name),
    ]),
    documentFromCopy("/platform", operatorPortal),
    documentFromCopy("/platform", scaleOut),
    documentFromCopy("/platform", contractIsProduct),
    documentFromCopy("/platform", brandsOneBook),
    documentFromCopy("/platform", replayExact),
    documentFromParts("/platform#adoption", pageCopy.platformAdoptionTitle, [
      pageCopy.platformAdoptionLead,
      ...adoptionPaths.map((path) => `${path.index}. ${path.name}. ${path.title}\n${path.body}`),
    ]),
    documentFromParts("/platform#connectivity", pageCopy.platformRailsTitle, [
      pageCopy.platformRailsLead,
      railsText(),
      formatCopy(paymentsProcessing),
      `Rails. ${paymentsRailsLine}`,
      pageCopy.platformCommercial,
    ]),
    documentFromCopy("/platform", openBanking),
  );

  docs.push(
    documentFromParts(
      "/intelligence",
      "Control plane",
      [pageCopy.intelligenceTitle, pageCopy.intelligenceLead, pageCopy.intelligenceDescription],
      true,
    ),
    documentFromCopy("/intelligence", intentAndExecution),
    documentFromParts("/intelligence#procedure", pageCopy.intelligenceProcedureTitle, [
      ...pageCopy.intelligenceProcedureLead,
      `${pageCopy.intelligenceProcedure[0].index}. ${pageCopy.intelligenceProcedure[0].name}. ${pageCopy.intelligenceProcedure[0].line}`,
      ...agents.map((agent, i) => {
        const index = String(i + 2).padStart(2, "0");
        return `${index}. ${agent.name}. ${agent.title}`;
      }),
      `${pageCopy.intelligenceProcedure[1].index}. ${pageCopy.intelligenceProcedure[1].name}. ${pageCopy.intelligenceProcedure[1].line}`,
    ]),
    documentFromParts(
      "/intelligence#agents",
      pageCopy.intelligenceAgentsTitle,
      agents.map((agent) => `${agent.name}. ${agent.title}\n${agent.body}`),
    ),
    documentFromCopy("/intelligence", governedAgents),
  );

  docs.push(
    documentFromParts(
      "/institutions",
      "Institutions",
      [
        pageCopy.institutionsTitle,
        pageCopy.institutionsLead,
        pageCopy.institutionsDescription,
        pageCopy.institutionsMeeting,
        pageCopy.institutionsBody,
        ...institutions.map((item) => `${item.index}. ${item.name}. ${item.title}\n${item.body}`),
        brandsEcho,
      ],
      true,
    ),
    documentFromCopy("/institutions", customerNetwork),
  );

  docs.push(
    documentFromParts(
      "/trust",
      "Governance",
      [
        pageCopy.trustTitle,
        pageCopy.trustLead,
        pageCopy.trustDescription,
        pageCopy.trustLedgerLead,
        ...trustPoints.map((point) => `${point.title}. ${point.body}`),
      ],
      true,
    ),
    documentFromCopy("/trust", cushBlockchainCopy),
    documentFromCopy("/trust", objectLedger),
    documentFromCopy("/trust", oneRecord),
    documentFromCopy("/trust", examinerNode),
    documentFromCopy("/trust", authentication),
    documentFromCopy("/trust", accessControl),
    documentFromCopy("/trust", securityLayers),
    documentFromCopy("/trust", observability),
    documentFromCopy("/trust", complianceByDesign),
    documentFromParts(
      "/trust#examination",
      "Questions a CIO will ask",
      examinationFaqs.map((item) => `Q: ${item.q}\nA: ${item.a}`),
    ),
  );

  docs.push(
    documentFromParts(
      "/insights",
      "Insights",
      [
        pageCopy.insightsDescription,
        pageCopy.insightsLead,
        `${cushBlockchainMeta.title}. ${cushBlockchainMeta.byline}. ${cushBlockchainMeta.standfirst}`,
      ],
      true,
    ),
  );

  const articleSections = splitMarkdownSections("/insights/cush-blockchain", cushBlockchainSource);
  if (articleSections[0]) articleSections[0].listed = true;
  docs.push(...articleSections);

  docs.push(
    documentFromParts(
      "/briefing",
      "Request a briefing",
      [
        pageCopy.briefingTitle,
        pageCopy.briefingLead,
        pageCopy.briefingDescription,
        ...pageCopy.briefingCover.map((item) => `${item.index}. ${item.line}`),
        pageCopy.briefingForm,
      ],
      true,
    ),
    documentFromParts(
      "/sandbox",
      "Sandbox",
      [
        pageCopy.sandboxTitle,
        pageCopy.sandboxDescription,
        pageCopy.sandboxLead,
        pageCopy.sandboxStatus,
        `${sandbox.portalLabel}: ${sandbox.portalHref}`,
      ],
      true,
    ),
  );

  docs.push(...splitMarkdownSections("/company.md", companyMarkdown));
  return docs.filter((doc) => doc.content.length > 0);
}

export const searchCorpus: SearchDocument[] = buildSearchCorpus();
