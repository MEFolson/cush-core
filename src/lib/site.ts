export const site = {
  name: "Cush Core",
  house: "Cush Core",
  tagline: "The books, under one examination.",
  dek: "A licensed system of record for global banks, Tier 1 institutions, and central banks. Product, orchestration, an immutable ledger, and multi-rail clearing sit under one control plane. The institution keeps its brand, its mandate, and its books.",
  email: "matthew@cush-core.com",
  city: "London",
  address: "London",
} as const;

export const nav = [
  { href: "/platform", label: "Architecture" },
  { href: "/intelligence", label: "Control plane" },
  { href: "/institutions", label: "Institutions" },
  { href: "/trust", label: "Governance" },
] as const;

export const layers = [
  {
    id: "catalogue",
    index: "01",
    name: "Product catalogue",
    title: "Products under your licence.",
    body: "Accounts, cards, lending, payments, and payroll are configured as governed blueprints and issued in your name. Customers see your brand. Supervisors see your books.",
    points: [
      "Current accounts, savings, cards, credit, and SME lending",
      "Cross-border payments and payroll as first-class products",
      "Product blueprints issued in hours, not a change programme",
      "White-label under the institution’s licence",
    ],
  },
  {
    id: "orchestration",
    index: "02",
    name: "Orchestration",
    title: "Intelligence under institutional mandate.",
    body: "Risk, routing, reconciliation, and first-line operations run as agents inside policy you authorise. Nothing material moves without an explainable, replayable trace.",
    points: [
      "Multi-rail routing against cost and success rate",
      "In-flight risk scoring and AML orchestration",
      "Automated reconciliation and exception handling",
      "Explainable traces for supervisors and internal audit",
    ],
  },
  {
    id: "ledger",
    index: "03",
    name: "Immutable ledger",
    title: "The book is the evidence.",
    body: "A cryptographically verifiable ledger is the system of record, not a log beside it. Multi-entity, multi-currency books are designed for examination, not reconstruction after the fact.",
    points: [
      "Cryptographically verifiable history",
      "Multi-entity, multi-currency books",
      "Replay of every posting and every decision",
      "Prepared for a regulator sandbox",
    ],
  },
  {
    id: "rails",
    index: "04",
    name: "Multi-rail connectivity",
    title: "Clearing and settlement on one control plane.",
    body: "Faster Payments, SEPA, Fedwire, SWIFT, CHAPS, TARGET2, and local instant schemes post to the same ledger they settle from, under your routing, risk, and dual-control rules.",
    points: [
      "Faster Payments, SEPA, Fedwire / ACH, SWIFT",
      "CHAPS, TARGET2, and local RTGS",
      "FAST, PIX, and other instant schemes",
      "Routing under cost, success, and policy",
    ],
  },
] as const;

export const inboundRails = [
  {
    code: "FPS",
    name: "Faster Payments",
    region: "United Kingdom",
    blurb:
      "UK Faster Payments inbound. Posted to the customer’s account on the same ledger that holds the rest of the book.",
  },
  {
    code: "SEPA",
    name: "SEPA",
    region: "Europe",
    blurb:
      "SEPA credit transfer on the euro book. Same policy, same replay, same entity isolation as sterling and dollars.",
  },
  {
    code: "ACH",
    name: "Fedwire / ACH",
    region: "United States",
    blurb:
      "Dollar clearing on the US entity. Dual-control and velocity rules stay in the mandate you write.",
  },
  {
    code: "SWIFT",
    name: "SWIFT",
    region: "International",
    blurb:
      "Correspondent instructions, MT and ISO 20022, scored and posted before the payment leaves the ledger.",
  },
] as const;

export const outboundRails = [
  {
    code: "CHAPS",
    name: "CHAPS",
    region: "United Kingdom",
    blurb:
      "Sterling RTGS. Same-day, high-value settlement under standing mandate, not a second payments hub.",
  },
  {
    code: "TGT",
    name: "TARGET2",
    region: "Euro area",
    blurb:
      "Euro RTGS beside SEPA. One control plane for high-value and retail, not two vendor models.",
  },
  {
    code: "FAST",
    name: "FAST",
    region: "Singapore",
    blurb:
      "Instant Singapore dollar rail. Name enquiry before confirmation. The customer sees your brand.",
  },
  {
    code: "PIX",
    name: "PIX",
    region: "Brazil",
    blurb:
      "Instant Brazilian real. Routed on cost, success rate, and policy with the rest of the book.",
  },
] as const;

export const onRamps = [
  {
    code: "FPS",
    name: "Faster Payments",
    region: "United Kingdom",
    kind: "Instant inbound",
    blurb:
      "On-ramp. Sterling credits post to the customer’s account on the same ledger that holds the rest of the book.",
  },
  {
    code: "SEPA",
    name: "SEPA",
    region: "Europe",
    kind: "Euro inbound",
    blurb:
      "On-ramp. SEPA credit transfer on the euro book. Same policy, same replay, same entity isolation.",
  },
  {
    code: "ACH",
    name: "Fedwire / ACH",
    region: "United States",
    kind: "Dollar inbound",
    blurb:
      "On-ramp. Dollar clearing on the US entity. Dual-control and velocity rules stay in the mandate you write.",
  },
  {
    code: "CARD",
    name: "Card acquiring",
    region: "Global",
    kind: "Scheme inbound",
    blurb:
      "On-ramp. Card present and not-present credits land on the ledger as first-class postings, not a sidecar processor.",
  },
  {
    code: "SWIN",
    name: "SWIFT inbound",
    region: "International",
    kind: "Correspondent in",
    blurb:
      "On-ramp. MT and ISO 20022 credits scored and posted before the nostro is touched.",
  },
] as const;

export const offRamps = [
  {
    code: "CHAPS",
    name: "CHAPS",
    region: "United Kingdom",
    kind: "Sterling RTGS",
    blurb:
      "Off-ramp. Same-day high-value settlement under standing mandate, not a second payments hub.",
  },
  {
    code: "TGT",
    name: "TARGET2",
    region: "Euro area",
    kind: "Euro RTGS",
    blurb:
      "Off-ramp. High-value euro beside SEPA. One control plane for wholesale and retail.",
  },
  {
    code: "SWOUT",
    name: "SWIFT outbound",
    region: "International",
    kind: "Correspondent out",
    blurb:
      "Off-ramp. Correspondent instructions leave only after the ledger post and the agent trace.",
  },
  {
    code: "FAST",
    name: "FAST",
    region: "Singapore",
    kind: "Instant outbound",
    blurb:
      "Off-ramp. Instant Singapore dollar with name enquiry before confirmation. The customer sees your brand.",
  },
  {
    code: "PIX",
    name: "PIX",
    region: "Brazil",
    kind: "Instant outbound",
    blurb:
      "Off-ramp. Instant Brazilian real, routed on cost, success rate, and policy with the rest of the book.",
  },
] as const;

export const products = [
  {
    id: "accounts",
    name: "Accounts and savings",
    line: "Issue current and savings accounts in the institution’s brand, on books you can examine.",
  },
  {
    id: "cards",
    name: "Cards",
    line: "Debit and credit programmes with the same ledger, the same policy, and the same replay.",
  },
  {
    id: "lending",
    name: "Lending",
    line: "Retail and SME credit without a second origination stack sitting beside the core.",
  },
  {
    id: "payments",
    name: "Payments and remittance",
    line: "Clearing, RTGS, instant schemes, correspondent books, and remittance as products you offer, on the same ledger as the account.",
  },
  {
    id: "kyc",
    name: "Onboarding and KYC",
    line: "Identity, screening, and a guided application journey, ready on day one.",
  },
  {
    id: "apis",
    name: "Embedded APIs",
    line: "Interfaces so partners can embed accounts and payouts inside their own products.",
  },
] as const;

export const institutions = [
  {
    id: "global",
    index: "01",
    name: "Global and Tier 1 banks",
    title: "Modernise the core without betting the franchise.",
    body: "Most houses still stitch a domestic core to a payments hub and a card processor. Cush Core is one licensed system of record: brand, mandate, and books, from account to rail.",
  },
  {
    id: "correspondent",
    index: "02",
    name: "Correspondent and treasury",
    title: "Settlement as a governed product.",
    body: "Clearing, RTGS, and instant schemes in one control plane. Routing, risk, and reconciliation sit where your treasurer and supervisors already expect an explanation.",
  },
  {
    id: "digital",
    index: "03",
    name: "Digital banks and licensed PSPs",
    title: "A sidecar for a digital brand, on a ledger a supervisor can read.",
    body: "Sit beside the incumbent core when the house will not rip and replace. Governed product blueprints, multi-entity isolation, and agentic compliance under your licence.",
  },
  {
    id: "sovereign",
    index: "04",
    name: "Central banks and development banks",
    title: "National-scale rails with an examination trail.",
    body: "Capacity is scarce in licensed cores and supervisory expertise, not in another SaaS overlay. Agents on an immutable ledger scale that expertise without a second IT estate.",
  },
] as const;

export const agents = [
  {
    id: "risk",
    name: "Risk",
    title: "Score in flight.",
    body: "Every payment is scored against your policy before it leaves the ledger. Thresholds, typologies, and escalation paths remain yours.",
  },
  {
    id: "routing",
    name: "Routing",
    title: "The cheapest viable rail.",
    body: "Agents select among Faster Payments, SEPA, Fedwire, SWIFT, CHAPS, TARGET2, FAST, and PIX on cost, success rate, and mandate, not a static waterfall.",
  },
  {
    id: "recon",
    name: "Reconciliation",
    title: "Exceptions, closed.",
    body: "Postings, acknowledgements, and scheme confirmations are matched automatically. What cannot be matched is queued with a full trace.",
  },
  {
    id: "ops",
    name: "Operations",
    title: "First line, under policy.",
    body: "Routine support, name enquiry, and case assembly are handled by agents. Anything material is raised to your officers with the replay attached.",
  },
] as const;

export const trustPoints = [
  {
    title: "Permanent payment record",
    body: "Every posting is hashed into an immutable BLAKE3 ledger. The book is the evidence.",
  },
  {
    title: "Intelligence inside mandate",
    body: "Agents operate only inside policy you authorise. Decisions are explainable and replayable for audit and supervisors.",
  },
  {
    title: "Books across companies",
    body: "Multi-entity isolation across the UK, Singapore, the United States, and holding structures. One control plane.",
  },
  {
    title: "Supervisory readiness",
    body: "Architecture prepared for PRA, MAS, and peer sandbox programmes, and for multi-jurisdiction licensing. Prepared is not the same as granted.",
  },
] as const;

export const leadership = [
  {
    name: "Matthew Ekow Folson",
    role: "Founder and Group CEO",
    line: "Sole founder. Twenty-five years in banking technology and payments. Former HSBC (FOSS Board Chair), Metro Bank (PSD2), and Orwell Group. Led the first non-bank PSP onboarded by the Bank of England as a Direct CHAPS member.",
  },
  {
    name: "Jose Luis Caldeira",
    role: "Chief Technology Officer",
    line: "Twenty years in banking technology, digital architecture, and distributed financial systems. Author of the house thesis on the vertically integrated bank.",
  },
  {
    name: "Paul Singh",
    role: "MLRO and Chief Compliance Officer",
    line: "Registered MLRO. Former Bank of England / PRA supervisory background. Previously MLRO for Revolut Payments and Crypto. Clears material external claims and licensing conversations.",
  },
] as const;

export const outcomes = [
  {
    index: "01",
    title: "Time to market without a change programme.",
    body: "Governed product blueprints issue under your brand. A current account need not wait on a twelve-month board cycle.",
  },
  {
    index: "02",
    title: "Operational intelligence you can defend.",
    body: "Risk, routing, reconciliation, and first-line operations run as agents inside your mandate, with full replay for audit and supervisors.",
  },
  {
    index: "03",
    title: "Clearing and settlement without a second estate.",
    body: "Inbound and outbound rails post to the same ledger as the account. No payments hub reconciling after the fact.",
  },
  {
    index: "04",
    title: "One walk-through for the board and the supervisor.",
    body: "Product, orchestration, ledger, and rails in a single examination, for internal audit, correspondents, and the regulatory desk.",
  },
] as const;

export const adoptionPaths = [
  {
    id: "sidecar",
    index: "01",
    name: "Sidecar (coexist)",
    title: "Sit beside the incumbent core.",
    body: "For digital brands and banks that will not rip and replace. Stand up a digital book, a correspondent product, or a new geography first. Evidence first. Leave the back book untouched until the institution decides otherwise.",
  },
  {
    id: "replatform",
    index: "02",
    name: "Replatform",
    title: "Migrate a line of business without a franchise freeze.",
    body: "Move one book onto Cush Core while the rest of the house continues. Dual-run, then cut. No weekend cutover of the entire estate.",
  },
  {
    id: "greenfield",
    index: "03",
    name: "Greenfield",
    title: "Licence a new entity from the first posting.",
    body: "A subsidiary, digital bank, or payments entity. Accounts, cards, lending, and rails under your name from day one.",
  },
] as const;

export const comparison = {
  columns: ["Stitched estate", "Multi-tenant SaaS", "Cush Core"] as const,
  rows: [
    {
      label: "Licence and brand",
      cells: ["Vendor journeys, logo last", "Their product, white-labelled", "Your licence. Your brand."],
    },
    {
      label: "System of record",
      cells: ["Core, hub, and cards, reconciled later", "Their ledger, your extract", "Immutable ledger you hold"],
    },
    {
      label: "Intelligence",
      cells: ["A chat overlay on batch", "Generic models on their data", "Agents inside your mandate"],
    },
    {
      label: "Clearing and settlement",
      cells: ["A second payments hub", "Their corridors, their hours", "Rails on the same book"],
    },
    {
      label: "Supervisory examination",
      cells: ["Months of reconstruction", "Their auditors, your wait", "Replay the same afternoon"],
    },
    {
      label: "Change control",
      cells: ["A programme per product", "Their backlog", "Governed blueprints"],
    },
  ],
} as const;

export const examinationFaqs = [
  {
    q: "Must we replace the incumbent core?",
    a: "No. Sidecar coexistence is the default path. Run Cush Core beside the existing book for a product line, a geography, or correspondent flows. Replatform only when the evidence justifies it.",
  },
  {
    q: "Who holds the system of record?",
    a: "The institution. Production posts to an immutable ledger under your licence. Cush Core is not a multi-tenant SaaS interposed between you and the books.",
  },
  {
    q: "How do agents remain inside mandate?",
    a: "You authorise the policy. Agents score, route, reconcile, and escalate inside those rules. Nothing material occurs that cannot be replayed for internal audit or a supervisor.",
  },
  {
    q: "Which rails are in scope?",
    a: "Inbound: Faster Payments, SEPA, Fedwire / ACH, card acquiring, SWIFT. Outbound: CHAPS, TARGET2, SWIFT, and local instant schemes. Routing is governed by cost, success rate, and mandate.",
  },
  {
    q: "Can a supervisor replay a payment end to end?",
    a: "Yes. Posting, risk score, rail selection, and scheme acknowledgement form a single trace. That is the purpose of an examinable core.",
  },
  {
    q: "How is the platform commercialised?",
    a: "Licensed economics on a per-customer basis, approximately one dollar per month, instead of a stack of vendor licences for ledger, hub, cards, and overlay. That figure is a commercial model, not reported revenue. Exact terms are set in the briefing.",
  },
] as const;

export const blueprintCatalog = [
  { id: "current", name: "Current accounts" },
  { id: "savings", name: "Savings" },
  { id: "debit", name: "Debit cards" },
  { id: "credit", name: "Credit cards" },
  { id: "sme", name: "SME lending" },
  { id: "pay", name: "Payments and remittance" },
  { id: "payroll", name: "Payroll" },
  { id: "embed", name: "Embedded APIs" },
] as const;

export const roles = [
  "Chief Information Officer",
  "Chief Operating Officer",
  "Chief Risk Officer",
  "Head of Correspondent Banking",
  "Head of International",
  "Treasury / Markets",
  "Core modernisation",
  "Payments and settlement",
  "Risk and compliance",
  "Central bank / supervisory",
  "Other",
] as const;

export const furtherReading = [
  {
    href: "/platform",
    index: "01",
    label: "Architecture",
    line: "Four layers, the product catalogue, adoption paths, and the rail index.",
  },
  {
    href: "/intelligence",
    index: "02",
    label: "Control plane",
    line: "Risk, routing, reconciliation, and operations, each with a replay.",
  },
  {
    href: "/institutions",
    index: "03",
    label: "Institutions",
    line: "Global banks, correspondents, digital brands, and central banks.",
  },
  {
    href: "/trust",
    index: "04",
    label: "Governance",
    line: "BLAKE3 ledger, principals, and the questions a CIO will ask.",
  },
] as const;
