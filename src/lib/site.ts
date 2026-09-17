export const site = {
  name: "Cush Core",
  house: "Cush Core",
  tagline: "The core a global bank can examine.",
  email: "mfolson@cushpayments.com",
  phone: "+44 7802 467665",
  city: "London",
  address: "London",
} as const;

export const nav = [
  { href: "/platform", label: "Platform" },
  { href: "/intelligence", label: "Intelligence" },
  { href: "/institutions", label: "Institutions" },
  { href: "/trust", label: "Trust" },
] as const;

export const layers = [
  {
    id: "catalogue",
    index: "01",
    name: "Product catalogue",
    title: "Issue in your name.",
    body: "Accounts, cards, lending, payments and payroll — configured as JSON blueprints, live in hours, not a twelve-month programme. The customer sees your brand. The books sit on your ledger.",
    points: [
      "Current accounts, savings, cards, credit and SME lending",
      "Cross-border payments and payroll as first-class products",
      "Hours-to-market product blueprints",
      "White-label under the institution’s licence",
    ],
  },
  {
    id: "orchestration",
    index: "02",
    name: "Orchestration",
    title: "Agents, under your mandate.",
    body: "Cush Core is AI-native. Agents score risk in flight, select the cheapest viable rail, reconcile exceptions, and handle first-line operations. Policy stays with you. Every decision can be replayed.",
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
    title: "The system of record.",
    body: "A BLAKE3-hashed ledger is the book, not a log beside the book. Permanent payment record. Multi-entity books across companies, countries and currencies. Built to be examined.",
    points: [
      "Cryptographically verifiable history",
      "Multi-entity, multi-currency books",
      "Replay of every posting and every decision",
      "Ready for a regulator sandbox",
    ],
  },
  {
    id: "rails",
    index: "04",
    name: "Multi-rail connectivity",
    title: "Every scheme. One book.",
    body: "Clearing, RTGS and instant payments on the same ledger. Faster Payments, SEPA, Fedwire, SWIFT, CHAPS, TARGET2, FAST, PIX — routed under your policy, not a second vendor estate.",
    points: [
      "Faster Payments, SEPA, Fedwire / ACH, SWIFT",
      "CHAPS, TARGET2 and local RTGS",
      "FAST, PIX and other instant schemes",
      "Routing under cost, success and policy",
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
      "Sterling RTGS. Same-day, high-value settlement under standing mandate — not a second payments hub.",
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
      "Instant Brazilian real. Routed on cost, success rate and policy with the rest of the book.",
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
      "On-ramp. SEPA credit transfer on the euro book — same policy, same replay, same entity isolation.",
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
      "Off-ramp. Same-day high-value settlement under standing mandate — not a second payments hub.",
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
      "Off-ramp. Instant Brazilian real, routed on cost, success rate and policy with the rest of the book.",
  },
] as const;

export const products = [
  {
    id: "accounts",
    name: "Accounts & savings",
    line: "Issue current and savings accounts in the institution’s brand, on books you can examine.",
  },
  {
    id: "cards",
    name: "Cards",
    line: "Debit and credit programmes with the same ledger, the same policy, the same replay.",
  },
  {
    id: "lending",
    name: "Lending",
    line: "Retail and SME credit without a second origination stack sitting beside the core.",
  },
  {
    id: "payments",
    name: "Payments",
    line: "Clearing, RTGS, instant schemes and correspondent books as products you offer — on the same ledger as the account.",
  },
  {
    id: "kyc",
    name: "Onboarding & KYC",
    line: "Identity, screening and a guided application journey — ready on day one.",
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
    name: "Global banks",
    title: "Replace the core without a twelve-month programme.",
    body: "Most institutions still stitch a domestic core to a payments hub and a card processor. Cush Core is one licensed system: your brand, your policy, your books — from the account to the rail.",
  },
  {
    id: "correspondent",
    index: "02",
    name: "Correspondent & treasury",
    title: "Sell settlement as a product, not a project.",
    body: "Clearing, RTGS and instant schemes in one control plane. Routing, risk and reconciliation sit where your treasurer already has to explain them.",
  },
  {
    id: "digital",
    index: "03",
    name: "Digital banks & PSPs",
    title: "Hours-to-market products on a regulator-readable ledger.",
    body: "JSON product blueprints, multi-tenant isolation, agentic compliance. Launch accounts, cards or payroll under your licence without inheriting a 1980s core.",
  },
  {
    id: "sovereign",
    index: "04",
    name: "Governments & development banks",
    title: "National-scale rails with an examination trail.",
    body: "The capacity crunch is licensed cores and compliance officers, not another SaaS overlay. Agentic AI on an immutable ledger is how that expertise scales without a new IT estate.",
  },
] as const;

export const agents = [
  {
    id: "risk",
    name: "Risk",
    title: "Score in flight.",
    body: "Every payment is scored against your policy before it leaves the ledger. Thresholds, typologies and escalation paths remain yours.",
  },
  {
    id: "routing",
    name: "Routing",
    title: "Cheapest viable rail.",
    body: "Agents select among Faster Payments, SEPA, Fedwire, SWIFT, CHAPS, TARGET2, FAST and PIX on cost, success rate and mandate — not a static waterfall.",
  },
  {
    id: "recon",
    name: "Reconciliation",
    title: "Exceptions, closed.",
    body: "Postings, acknowledgements and scheme confirmations are matched automatically. What cannot be matched is queued with a full trace.",
  },
  {
    id: "ops",
    name: "Operations",
    title: "First line, under policy.",
    body: "Routine support, name enquiry and case assembly are handled by agents. Anything material is raised to your officers with the replay attached.",
  },
] as const;

export const trustPoints = [
  {
    title: "Permanent payment record",
    body: "Every posting is hashed into an immutable BLAKE3 ledger. The book is the evidence.",
  },
  {
    title: "AI that follows your rules",
    body: "Agents operate inside a policy you write. Decisions are explainable and replayable for audit and supervisors.",
  },
  {
    title: "Books across companies",
    body: "Multi-entity isolation across the UK, Singapore, the United States and holding structures — one control plane.",
  },
  {
    title: "Ready for a sandbox",
    body: "Architecture prepared for PRA, MAS and other sandbox programmes, and for licences in more than one country.",
  },
] as const;

export const leadership = [
  {
    name: "Matthew Ekow Folson",
    role: "Founder & Chief Executive",
    line: "Twenty-five years in banking technology and payments. Former HSBC (FOSS Board Chair), Metro Bank (PSD2), Orwell Group. Led the first non-bank PSP onboarded by the Bank of England as a Direct CHAPS member.",
  },
  {
    name: "Jose Luis Caldeira",
    role: "Chief Technology Officer",
    line: "Twenty years in banking technology, digital architecture and distributed financial systems. Author of the house thesis on the vertically integrated bank.",
  },
] as const;

export const stats = [
  { value: "~$1", label: "Per customer / month" },
  { value: "Hours", label: "Product blueprints to live" },
  { value: "75+", label: "Years combined in regulated payments" },
  { value: "CHAPS", label: "Direct membership lineage" },
] as const;

export const outcomes = [
  {
    index: "01",
    title: "Hours, not a programme.",
    body: "JSON product blueprints go live under your brand. No twelve-month change board for a current account.",
  },
  {
    index: "02",
    title: "Agents, under mandate.",
    body: "Risk, routing, recon and first-line ops run as agents. Policy stays with you. Every decision can be replayed.",
  },
  {
    index: "03",
    title: "On-ramp and off-ramp.",
    body: "Clearing, RTGS, cards and correspondent rails post to the same ledger they pay from.",
  },
  {
    index: "04",
    title: "One examination.",
    body: "Product, orchestration, ledger and rails in a single walk-through — for a supervisor, a correspondent, a board.",
  },
] as const;

export const adoptionPaths = [
  {
    id: "coexist",
    index: "01",
    name: "Coexist",
    title: "Sit beside the incumbent core.",
    body: "Stand up a digital book, a correspondent product or a new geography first. Prove the ledger. Leave the back book where it is until you choose otherwise.",
  },
  {
    id: "replatform",
    index: "02",
    name: "Replatform",
    title: "Move a book without a freeze.",
    body: "Migrate a line of business onto Cush Core while the rest of the house continues. Dual-running, then cut. No big-bang weekend.",
  },
  {
    id: "greenfield",
    index: "03",
    name: "Greenfield",
    title: "Licence a new house on day one.",
    body: "A subsidiary, a digital bank, a payments entity — accounts, cards, lending and rails under your name from the first posting.",
  },
] as const;

export const comparison = {
  columns: ["Stitched estate", "Multi-tenant SaaS", "Cush Core"] as const,
  rows: [
    {
      label: "Whose brand",
      cells: ["Vendor journeys, your logo last", "Their product, white-labelled", "Yours. Licensed."],
    },
    {
      label: "The books",
      cells: ["Core + hub + cards, recon after", "Their ledger, your extract", "BLAKE3 ledger you hold"],
    },
    {
      label: "AI",
      cells: ["Chat overlay on batch", "Generic models on their data", "Agents inside your mandate"],
    },
    {
      label: "Rails",
      cells: ["A second payments hub", "Their corridors, their hours", "On-ramp and off-ramp on the book"],
    },
    {
      label: "Examination",
      cells: ["Months of reconstruction", "Their auditors, your wait", "Replay the same afternoon"],
    },
    {
      label: "Change",
      cells: ["A programme per product", "Their backlog", "A blueprint. Hours."],
    },
  ],
} as const;

export const examinationFaqs = [
  {
    q: "Do we have to rip out the incumbent core?",
    a: "No. Coexistence is the default. Run Cush Core beside the existing book for a product line, a geography or correspondent flows. Replatform when the evidence is in.",
  },
  {
    q: "Whose ledger is it?",
    a: "Yours. Production posts to an immutable BLAKE3 ledger under the institution’s licence. We are not a multi-tenant SaaS sitting between you and the book.",
  },
  {
    q: "How do agents stay inside policy?",
    a: "You write the mandate. Agents score, route, reconcile and advise inside those rules. Nothing material happens that cannot be replayed for internal audit or a supervisor.",
  },
  {
    q: "Which rails on day one?",
    a: "On-ramp: Faster Payments, SEPA, Fedwire / ACH, card acquiring, SWIFT inbound. Off-ramp: CHAPS, TARGET2, SWIFT outbound, FAST, PIX. Routing is under cost, success rate and policy — not a static waterfall.",
  },
  {
    q: "Can a supervisor replay a payment?",
    a: "Yes. Posting, risk score, rail choice and scheme acknowledgement are a single trace. That is the point of an examinable core.",
  },
  {
    q: "How are we charged?",
    a: "Simple per-customer price. Approximately one dollar a month, wherever you operate. No stack of vendor licences for ledger, hub, cards and overlay.",
  },
] as const;

export const blueprintCatalog = [
  { id: "current", name: "Current accounts" },
  { id: "savings", name: "Savings" },
  { id: "debit", name: "Debit cards" },
  { id: "credit", name: "Credit cards" },
  { id: "sme", name: "SME lending" },
  { id: "pay", name: "Payments" },
  { id: "payroll", name: "Payroll" },
  { id: "embed", name: "Embedded APIs" },
] as const;

export const roles = [
  "Chief Information Officer",
  "Chief Operating Officer",
  "Head of Correspondent Banking",
  "Head of International",
  "Treasury / Markets",
  "Core modernisation",
  "Payments product",
  "Risk & compliance",
  "Other",
] as const;
