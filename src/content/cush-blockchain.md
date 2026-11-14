# The Cush Blockchain: a ledger built for banks, not for public consensus

**Standfirst:** Every customer keeps its own tamper evident chain, commits can be backed by a transaction signature, and no single global chain stands between a bank and its books.

*By Matthew Ekow Folson, Founder and Group CEO, Cush Payments*

---

Core banking technology is ripe for disruption. Most banks run their books on systems designed decades ago, wrapped in layers of vendors added one at a time. Each layer adds a reconciliation, a contract and another place where the truth can drift. When a supervisor asks what happened to a payment, the answer is often pieced together from several systems after the fact.

At Cush, we think the ledger itself should be the evidence. That is the idea behind the Cush Blockchain, the ledger inside Cush Core. Jose Luis Caldeira, our CTO and Chief Architect, has set out its design in a whitepaper. I want to explain in plain terms what it does and why we chose to build it this way.

## A blockchain designed for banks

The word blockchain carries baggage. For many people it means public networks, open participation and one global chain that every transaction must wait on. The Cush Blockchain is none of those things. It is a permissioned ledger designed for banks. Nodes are known and registered. The coordinators act as a registry and control which nodes may join, so the network is not open to anyone.

The defining choice is that there is no single global chain. Every customer keeps its own tamper evident chain of events, and so does every account and every contract. Each chain is append only and hash linked with BLAKE3, so records are added and never modified. Where a transaction touches several customers or accounts, a shared transaction identifier ties the entries together. Micro blocks summarise runs of events, and projections give current state for queries without changing the chain underneath.

Why does this matter? Because a posting for one customer never has to wait on the rest of the network. And because the history of each customer can be read, verified and handed to an auditor as one coherent record.

## Knowing who wrote what

Trust in a ledger comes from knowing who wrote what, and being able to prove it. On the Cush Blockchain, a commit can be backed by a transaction signature, and nodes check each message so that a removed or out of date node cannot write.

Messages between nodes carry an epoch, and the keys behind them are enforced. Each failover session has its own epoch number, which only ever goes up, so an old message cannot be replayed to overturn a newer decision, and only one change of ownership should be accepted in each epoch. The coordinators exchange their own messages over standard TLS. Every change of ownership is visible to operators in the registry and in ledger telemetry.

## Built on PostgreSQL, designed for failure

Banks do not need novelty in their storage layer. They need something their teams already know how to run, back up and inspect. The Cush Blockchain spreads its chains across shards, and each shard is backed by PostgreSQL.

Each shard has one owning node, and failover is built into the nodes themselves. Coordinator servers keep track of which nodes are alive, what each node can do and which node owns which shard. When a node stops responding, the coordinators confirm the loss with each other rather than trusting a single view. Spare nodes are ranked in a fixed, deterministic order, so every honest coordinator reaches the same answer. The chosen replacement must have the right capabilities, the capacity to take on the work and a match for the shard's database. Promotion is agreed by a quorum vote. If a quorum cannot be reached, the shard waits rather than risk two owners.

The replacement connects to the same PostgreSQL database and schema, so no data has to move. Nodes send the coordinators a heartbeat roughly every two seconds, so Jose expects a spare node to take over a failed node's shards in one to two seconds. That is his expected figure, not a measurement. A failed node never resumes ownership. It can only return as a spare.

## Narrow by design

We made a deliberate choice not to build general purpose consensus. Protocols built to order every transaction across a whole network are powerful, but they carry message overhead and operational complexity that a bank's ledger does not need. The Cush Blockchain uses a focused mechanism for one job: moving shard ownership safely when a node fails.

Ledger writes stay with the node that owns the shard. The coordinators anchor the cluster and remain the source of truth for who owns what. Once nodes know each other they can pass work directly, but that never replaces the coordinators' view or the owning node's responsibility for writes.

This is what designing for banks means to us. Every part of the system should be something a CIO can explain to a board, and something an examiner can inspect.

## AI that observes, never writes

Cush Core is AI native, and the ledger is where that principle is tested hardest. Our rule is simple: AI does not own the ledger. It observes it.

Agents are first class parties with their own identity, an owner and a defined set of capabilities, so each agent sees only the tools and data it has been granted. They can read ledger and cluster state, explain transaction activity, summarise recent failovers and highlight likely points of failure. Their conversations are stored for audit and later review.

What they cannot do is post. In the Cush Blockchain design, postings are made by deterministic smart contracts, inside the permissions the institution sets. The ledger and coordinators remain authoritative. Any change still flows through the normal platform interfaces and the approval rules the institution sets. Models explain and suggest. The institution decides.

## Built to be examined

A ledger is only as useful as the evidence it can give. Data on the Cush Blockchain is encrypted. Operators get read only portal and explorer views of the ledger and the cluster, which show state but never own it. A read only examiner viewer is planned, so an institution can give its supervisor access to the records it chooses to grant. The viewer will be able to read. It will not be able to post.

## One architecture, not forty vendors

The Cush Blockchain is not a separate product bolted on to Cush Core. It is the ledger inside it, licensable with the platform, for banks, payment companies and central banks around the world. Customers, accounts, contracts, failover and AI assistance sit on one architecture, not forty vendors.

Our briefing sets out what is complete and what is still in the build. If you run a core, supervise one or are planning to replace one, I would welcome the conversation.

