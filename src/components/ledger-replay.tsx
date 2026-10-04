import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const STEPS = [
  {
    id: "instruct",
    label: "Instruction",
    title: "£12,400 received · Faster Payments",
    detail:
      "Originating institution: corporate in Manchester. Beneficiary: current account at the licensed bank, London. Purpose: supplier settlement.",
  },
  {
    id: "policy",
    label: "Policy",
    title: "Mandate evaluated",
    detail:
      "Current-account inbound, permitted. Dual-control threshold not met. Velocity within standing mandate.",
  },
  {
    id: "risk",
    label: "Risk agent",
    title: "In-flight score 0.04 · pass",
    detail:
      "Name enquiry matched. No sanctions hit. Velocity within policy. Trace attached for the officer who may later ask.",
  },
  {
    id: "route",
    label: "Routing agent",
    title: "Posted internally · no external rail",
    detail:
      "Inbound Faster Payments. The credit is the book. Routing agent stands down; no second vendor required.",
  },
  {
    id: "post",
    label: "Ledger",
    title: "Posted · BLAKE3 chain extended",
    detail:
      "Debit Faster Payments settlement, credit current account. The book is the evidence, not a log beside the book.",
  },
  {
    id: "out",
    label: "Credit",
    title: "Account credited · advice issued",
    detail:
      "Beneficiary name confirmed. The customer sees the licensed institution’s brand, not ours.",
  },
] as const;

function hashPreview(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16).padStart(8, "0").repeat(4).slice(0, 24);
}

export function LedgerReplay() {
  const [cursor, setCursor] = useState(0);
  const step = STEPS[cursor];
  const chain = useMemo(
    () =>
      STEPS.map((s, i) => ({
        ...s,
        hash: hashPreview(`${s.id}:${i}:cush-core-illustrative`),
      })),
    [],
  );

  return (
    <div className="border border-line bg-paper">
      <div className="flex flex-col gap-4 border-b border-line px-6 py-6 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div>
          <p className="font-mono text-xs tracking-[0.16em] text-muted">
            Replay · illustrative
          </p>
          <h3 className="mt-2 font-display text-2xl font-medium tracking-[-0.02em] sm:text-3xl">
            Every decision, again.
          </h3>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={cursor === 0}
            onClick={() => setCursor((c) => Math.max(0, c - 1))}
          >
            Previous
          </Button>
          <Button
            type="button"
            variant="primary"
            size="sm"
            disabled={cursor === STEPS.length - 1}
            onClick={() => setCursor((c) => Math.min(STEPS.length - 1, c + 1))}
          >
            Next posting
          </Button>
        </div>
      </div>
      <div className="grid md:grid-cols-12">
        <ol className="border-b border-line md:col-span-4 md:border-b-0 md:border-r">
          {chain.map((item, i) => {
            const on = i === cursor;
            const done = i < cursor;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setCursor(i)}
                  className={cn(
                    "flex min-h-14 w-full items-center gap-3 px-5 text-left text-sm transition-colors duration-150",
                    on ? "bg-paper-2 text-ink" : "text-muted hover:text-ink",
                  )}
                >
                  <span
                    className={cn(
                      "w-4 shrink-0 border-t",
                      on ? "border-signal" : done ? "border-ink" : "border-line",
                    )}
                    aria-hidden="true"
                  />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ol>
        <div className="px-6 py-8 md:col-span-8 sm:px-10">
          <p className="font-mono text-xs tracking-[0.14em] text-signal">
            {step.label} · {cursor + 1} / {STEPS.length}
          </p>
          <h4 className="mt-3 font-display text-2xl tracking-[-0.02em]">{step.title}</h4>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">{step.detail}</p>
          <dl className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="border-t border-line pt-3">
              <dt className="font-mono text-xs tracking-[0.14em] text-muted">Hash</dt>
              <dd className="mt-1 font-mono text-xs text-ink-soft">{chain[cursor].hash}</dd>
            </div>
            <div className="border-t border-line pt-3">
              <dt className="font-mono text-xs tracking-[0.14em] text-muted">Parent</dt>
              <dd className="mt-1 font-mono text-xs text-ink-soft">
                {cursor === 0 ? "genesis" : chain[cursor - 1].hash}
              </dd>
            </div>
          </dl>
          <p className="mt-6 text-xs text-muted">
            Production ledger uses BLAKE3. This walk-through is illustrative of the
            replay a supervisor is shown.
          </p>
        </div>
      </div>
    </div>
  );
}
