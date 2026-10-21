/**
 * Proposed copy v2 (COPY_v2.md, 21 Oct 2026). Preview only, pending Matthew's review.
 */
export type Faq = { q: string; a: string };
export type CopyBlock = {
  id: string;
  eyebrow: string;
  headline: string;
  body: string[];
  items?: { label: string; text: string }[];
  faq?: Faq;
};

export const examinerNode: CopyBlock = {
  id: "supervisory-access",
  eyebrow: "Supervisory access",
  headline: "Give the examiner a node.",
  body: [
    "Cush Core is designed so a supervisor can hold a read only node of the ledger. The examiner reads the same book the institution posts to and replays any posting, risk score or rail choice without waiting for an extract. The institution grants the access. The node can read. It cannot post.",
  ],
  faq: {
    q: "Can our supervisor read the ledger directly?",
    a: "That is the design. The institution can grant an examiner a read only node of the book, with full replay. Scope, location and terms are agreed between the institution and its supervisor. The node never carries the right to post.",
  },
};

export const oneRecord: CopyBlock = {
  id: "one-chain",
  eyebrow: "One chain",
  headline: "Money, risk and incidents. One record.",
  body: [
    "Every posting is hashed into the BLAKE3 ledger, with the actor, the time and the outcome. The design carries the same tamper evident chain to risk decisions and operational incidents, so the payment, the score behind it and anything that went wrong are read as one history. Internal audit and the supervisor examine one record, not three systems.",
  ],
  faq: {
    q: "Are risk decisions and incidents on the same chain as postings?",
    a: "That is the direction of the design. Postings and contract executions are recorded on the BLAKE3 ledger today. Carrying the same chain to risk decisions and incidents is part of the build, and the briefing sets out what is complete.",
  },
};

export const governedAgents: CopyBlock = {
  id: "governed-agents",
  eyebrow: "Governed agents",
  headline: "Agents answer to the same controls as officers.",
  body: [
    "In Cush Core, agentic AI is part of the platform, not a chatbot bolted on. Each agent has its own identity, permissions and audit trail, just like a human operator, and sees only the data its permissions allow. Agents act inside the mandate the institution authorises, and every action is recorded.",
  ],
  faq: {
    q: "Are AI agents governed like staff?",
    a: "Yes. Each agent has an identity, a set of permissions and an audit trail. Its capabilities are assigned and reviewed in the agent studio, and it sees only what its permissions allow.",
  },
};

export const contractIsProduct: CopyBlock = {
  id: "contract",
  eyebrow: "Contract",
  headline: "The contract is the product.",
  body: [
    "Every product in Cush Core is a versioned blueprint, and every payment, fee and interest accrual runs as a smart contract bound to it. Each sale creates a customer instance of the contract, not a copy of the code. A new version never breaks a contract already issued.",
  ],
  faq: {
    q: "Is a product a configuration or a contract?",
    a: "A contract. The blueprint states the terms and the smart contract engine executes them. Legal agreements, interpretation and discretion stay with the institution and its counsel.",
  },
};

export const intentAndExecution: CopyBlock = {
  id: "intent-execution",
  eyebrow: "Intent and execution",
  headline: "AI reads the intent. The ledger keeps the promise.",
  body: [
    "Explainable AI helps operators and customers work through what they need, in plain language. The money moves only through deterministic smart contracts: the same inputs always produce the same outputs, and every execution is recorded on the ledger. Flexible in how people ask. Exact in what the book records.",
  ],
  faq: {
    q: "Can a model change what the ledger records?",
    a: "No. Models explain, summarise and guide. Postings are made by deterministic smart contracts on the ledger, inside the permissions the institution sets.",
  },
};

export const brandsOneBook: CopyBlock = {
  id: "brands-entities",
  eyebrow: "Brands and entities",
  headline: "Several brands. One book.",
  body: [
    "Cush Core separates three roles: the provider that operates the platform, the selling entity whose brand the customer sees, and the manufacturing entity that holds the product licence and originates the product. Strict data separation holds between every entity on the platform. A new brand or partner channel reuses the same core instead of a new stack.",
  ],
  faq: {
    q: "Can we run more than one brand on Cush Core?",
    a: "Yes. Each brand sells through its own selling entity, products are held by the manufacturing entity, and data is kept strictly separate between them. Customers see the brand they chose. Supervisors see the books of each entity.",
  },
};

export const brandsEcho =
  "A group with several brands and entities runs them on one licensable book, each kept apart, all under one examination.";

export const replayExact: CopyBlock = {
  id: "smart-contract-execution",
  eyebrow: "Smart contract execution",
  headline: "Every transaction, replayed exactly as it ran.",
  body: [
    "Every financial operation in Cush Core, whether a payment, a fee or an interest accrual, is a smart contract bound to the product catalogue. Contracts are built from reusable pipelines, every version is immutable, and any execution can be replayed exactly as it ran on day one. The institution can show a transaction was correct without asking a developer.",
  ],
  faq: {
    q: "Can we prove how a past transaction was calculated?",
    a: "Yes. The contract version that ran is immutable and the execution is recorded on the ledger with actor, time and outcome. Replay it and the same inputs give the same result.",
  },
};

export const objectLedger: CopyBlock = {
  id: "object-centric-ledger",
  eyebrow: "Object centric ledger",
  headline: "Every customer, account and contract keeps its own chain.",
  body: [
    "The Cush Core ledger is object centric: every customer, account and contract has its own chain of events, hash linked with BLAKE3. Records are append only and never modified. Chains are spread across nodes with automatic shard failover, and real time projections give current state without replaying the full chain.",
  ],
  faq: {
    q: "What happens to the ledger if a node fails?",
    a: "Chains are distributed across nodes. When a node fails, its shards are reassigned automatically and work continues without operator intervention.",
  },
};

export const authentication: CopyBlock = {
  id: "authentication",
  eyebrow: "Authentication",
  headline: "Strong proof for everyone who signs in.",
  body: [
    "Customers, operators and partners all authenticate through one high assurance framework: FIDO2 passkeys, authenticator app codes (TOTP), device biometrics, one time codes and passwords hashed with Argon2id. Step up authentication asks for stronger proof automatically on high value operations.",
  ],
  faq: {
    q: "Do operators sign in the same way as customers?",
    a: "Yes. One framework serves customers, operators and partners, with passkeys, authenticator apps, biometrics and step up checks for high value operations.",
  },
};

export const accessControl: CopyBlock = {
  id: "access-control",
  eyebrow: "Access control",
  headline: "Who can see what, down to the field.",
  body: [
    "Every request passes three layers: who you are, what you may do, and which fields you may see. Sensitive fields are filtered on the server before the response leaves. People act as themselves, as an agent, or with delegated authority such as a power of attorney, and every authorisation decision is written to the audit log. No silent grants.",
  ],
  faq: {
    q: "Can a power of attorney act for a customer?",
    a: "Yes. The representation model lets a person act as themselves, as an agent, or with delegated authority such as a power of attorney. Each decision is logged.",
  },
};

export const operatorPortal: CopyBlock = {
  id: "operator-control-centre",
  eyebrow: "Operator control centre",
  headline: "One portal for the whole operation.",
  body: [
    "Cush Core gives operations a single secure portal: Customer 360, product management, onboarding workflows, a ledger explorer, an agent studio for AI agents, management information, a network graph and access management. Every action in it is traceable. No spreadsheets and no separate tools.",
  ],
  faq: {
    q: "Can operations staff inspect the ledger themselves?",
    a: "Yes. The ledger explorer shows every transaction, every event and every chain, without a database query.",
  },
};

export const customerNetwork: CopyBlock = {
  id: "customer-network",
  eyebrow: "Know your customer network",
  headline: "See the network behind every customer.",
  body: [
    "Cush Core models beneficial owners, directors, guarantors, joint holders, signatories, introducers, group companies and powers of attorney, and shows them on a visual network graph. Connected party risk is flagged when a new customer links to a high risk existing party. Ownership chains can be traced for due diligence, and guarantor and group relationships feed credit decisions.",
  ],
  faq: {
    q: "Can we trace ultimate beneficial ownership?",
    a: "Yes. Beneficial ownership chains are modelled and can be traced on the network graph for due diligence on business customers.",
  },
};

export const paymentsProcessing: CopyBlock = {
  id: "payments-processing",
  eyebrow: "Payments processing",
  headline: "From instruction to settlement, in one place.",
  body: [
    "Each payment is a ledger command, recorded from instruction to confirmation. Smart contracts validate scheme confirmations and post settlement events automatically, and a dedicated payments service applies scheme rules, cut offs and retries. Shadow ledger sync keeps an existing core or accounting system in step.",
  ],
  faq: {
    q: "Must we retire our existing core to use Cush Core payments?",
    a: "No. Shadow ledger sync keeps an external core banking or accounting system in step automatically.",
  },
};

/** Rails line from the deck. Flagged: Matthew to confirm the added rails. */
export const paymentsRailsLine =
  "Faster Payments, Bacs Direct Debit and Direct Credit, SEPA Credit Transfer, SEPA Instant, SWIFT gpi, Mastercard and Visa card rails, and internal book transfers.";

export const observability: CopyBlock = {
  id: "observability",
  eyebrow: "Observability",
  headline: "Nothing runs unobserved.",
  body: [
    "Every request and event is logged in structured form, searchable by customer, transaction or component, with retention set to the institution's policy. Distributed traces follow a request across every service, so a customer complaint can be tied to the exact call chain. Dashboards and alerts sit beside management information, and every runtime configuration change records who changed what and when.",
  ],
  faq: {
    q: "Can we trace a complaint to what the system actually did?",
    a: "Yes. Distributed tracing links a customer complaint to the specific chain of calls behind it.",
  },
};

export const openBanking: CopyBlock = {
  id: "open-banking",
  eyebrow: "Open banking",
  headline: "Open banking, with consent on the record.",
  body: [
    "Cush Core includes account information and payment initiation APIs, a consumer API for mobile and web, and a provider API for third party providers. The consent lifecycle is managed and audited, and every consent grant carries its own scoped access token.",
  ],
  faq: {
    q: "How is customer consent tracked?",
    a: "Each consent is managed through its full lifecycle and audited, and access is scoped to the consent that granted it.",
  },
};

export const onboardingJourney: CopyBlock = {
  id: "onboarding",
  eyebrow: "Onboarding",
  headline: "From application to account, every decision kept.",
  body: [
    "Apply, verify, assess, approve, activate. Identity is checked through integrated KYC providers, then risk grading, PEP and sanctions screening and eligibility rules are evaluated. The workflow routes each case to the right approver and stores every decision for audit and dispute resolution.",
  ],
};

export const securityLayers: CopyBlock = {
  id: "defence-in-depth",
  eyebrow: "Defence in depth",
  headline: "Security at every layer.",
  body: [
    "TLS on every connection, including calls between internal services. Short lived sessions bound to the device, with automatic revocation on suspicious activity. Authorisation enforced on the server, sensitive fields filtered before they reach the wire, and immutable, tamper evident logs of every access and change.",
  ],
};

export const scaleOut: CopyBlock = {
  id: "scale",
  eyebrow: "Scale",
  headline: "Scale out, not up.",
  body: [
    "Stateless services scale independently by adding instances. Each business object owns its own chain, so many objects are processed in parallel, with automatic shard failover and specialist workloads routed to the right node. PostgreSQL gives ACID guarantees at the data layer, and rolling deploys avoid customer facing downtime.",
  ],
};

export const complianceByDesign: CopyBlock = {
  id: "compliance-by-design",
  eyebrow: "Compliance by design",
  headline: "Compliance is a property of the platform.",
  body: [
    "Strong customer authentication, field level data minimisation, PEP and sanctions screening, risk grading, suspicious activity flagging, management information exports and a full change history are built into Cush Core. Together they are built to support evidence for supervisory review.",
  ],
};

export const setsApart: CopyBlock = {
  id: "distinctive",
  eyebrow: "Distinctive",
  headline: "What sets Cush Core apart.",
  body: [],
  items: [
    {
      label: "Many brands, one core.",
      text: "Cush Core separates the platform provider, the brand that sells and the entity that holds the product licence, with strict data separation between every entity. A new brand or partner channel runs on the same core.",
    },
    {
      label: "Every transaction can be replayed exactly as it ran.",
      text: "Every financial operation is a versioned smart contract tied to the product catalogue. Same inputs, same outputs, every time. Versions are immutable, so any transaction can be replayed and shown to be correct without asking a developer.",
    },
    {
      label: "The ledger is the system of record, not a log bolted on.",
      text: "Every customer, account and contract has its own hash linked chain of events, secured with BLAKE3. Records are append only, spread across nodes and queryable in real time.",
    },
    {
      label: "AI agents with identities, permissions and audit trails.",
      text: "Each agent has its own identity and sees only what its permissions allow, exactly like a human operator. Agents explain transactions in plain language, summarise audit data for compliance and supervisors, surface anomalies across the ledger and guide complex applications. Every action is recorded.",
    },
    {
      label: "See the network behind every customer.",
      text: "Cush Core models beneficial owners, directors, guarantors, signatories and powers of attorney on a visual network graph. Connected party risk is flagged when a new customer links to a high risk party.",
    },
  ],
};

export const oneArchitecture: CopyBlock = {
  id: "one-platform",
  eyebrow: "One platform",
  headline: "One architecture, not forty vendors.",
  body: [
    "Products, ledger, payments, risk, fraud, compliance and regulatory reporting in one coherent design, with no stitched together vendors.",
  ],
  items: [
    { label: "Onboard.", text: "KYC and KYB, identity checks, PEP and sanctions screening, personal and corporate profiles." },
    { label: "Sell.", text: "Catalogue driven products, from current accounts and savings to loans, mortgages and cards." },
    { label: "Execute.", text: "A smart contract engine runs every payment, fee and interest accrual, with automatic reconciliation." },
    { label: "Settle.", text: "A distributed, object centric ledger, hash linked with BLAKE3, with a full audit trail." },
    { label: "Secure.", text: "Passkeys, biometrics and step up authentication, with three layers of access control." },
    { label: "Observe.", text: "Dashboards, alerts and management information from the start." },
  ],
};

export const defineOnce: CopyBlock = {
  id: "define-once",
  eyebrow: "Catalogue",
  headline: "Define once. Issue many times.",
  body: [
    "Products are versioned blueprints, with pricing, eligibility and features set at blueprint level and tailored by segment, selling entity or channel. A pricing or eligibility change needs no code and never breaks a contract already issued. Families include current accounts, savings, loans, mortgages, cards, fixed rate bonds, car and secured loans, retail bonds, ETFs and OTC derivatives.",
  ],
};

export const heroOption = {
  headline: "The licensable core for banks that must prove everything.",
  dek: "Cush Core is one integrated platform for onboarding, products, transactions, ledger, payments, security and operations. Global banks, Tier 1 institutions and central banks run several brands on one core and can evidence every decision.",
  closing: "Cush Core. The operating system for financial services. Licensable. Global.",
} as const;
