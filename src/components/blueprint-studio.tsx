import { useMemo, useState } from "react";
import { blueprintCatalog } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const entities = ["UK Ltd", "Singapore Pte", "US Inc"] as const;

export function BlueprintStudio() {
  const [selected, setSelected] = useState<string[]>(["current", "debit"]);
  const [entity, setEntity] = useState<(typeof entities)[number]>("UK Ltd");
  const [brand, setBrand] = useState("Your Bank");

  const blueprint = useMemo(
    () => ({
      issuer: brand.trim() || "Your Bank",
      entity,
      products: blueprintCatalog
        .filter((p) => selected.includes(p.id))
        .map((p) => p.name),
      ledger: "BLAKE3",
      policy: {
        owner: "institution",
        aml: "in-flight",
        replay: true,
      },
      rails: {
        in: ["FPS", "SEPA", "Fedwire", "SWIFT"],
        out: ["CHAPS", "TARGET2", "FAST", "PIX"],
      },
      pricing: { per_customer_month_usd: 1 },
    }),
    [brand, entity, selected],
  );

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  return (
    <div className="grid overflow-hidden border border-line bg-paper md:grid-cols-2">
      <div className="border-b border-line px-6 py-8 sm:px-8 md:border-b-0 md:border-r">
        <p className="font-mono text-xs tracking-[0.16em] text-muted">
          Product blueprints · hours, not programmes
        </p>
        <h3 className="mt-4 font-display text-3xl font-medium tracking-[-0.03em]">
          Configure a licence.
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Select the products an institution will issue. The JSON is the contract
          the control plane executes — not a slide.
        </p>

        <label className="mt-8 block text-xs font-medium uppercase tracking-[0.14em] text-muted">
          Issuing brand
        </label>
        <input
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="mt-2 flex h-11 w-full rounded-md border border-line bg-paper px-3.5 text-sm text-ink focus-visible:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
        />

        <p className="mt-6 text-xs font-medium uppercase tracking-[0.14em] text-muted">
          Booking entity
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {entities.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={entity === item}
              onClick={() => setEntity(item)}
              className={cn(
                "min-h-10 rounded-md border px-3 text-sm transition-colors duration-150",
                entity === item
                  ? "border-ink bg-ink text-paper"
                  : "border-line text-ink-soft hover:border-ink-soft",
              )}
            >
              {item}
            </button>
          ))}
        </div>

        <p className="mt-6 text-xs font-medium uppercase tracking-[0.14em] text-muted">
          Catalogue
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {blueprintCatalog.map((item) => {
            const on = selected.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(item.id)}
                className={cn(
                  "min-h-11 rounded-md border px-3 text-left text-sm transition-colors duration-150",
                  on
                    ? "border-ink bg-ink text-paper"
                    : "border-line bg-paper text-ink-soft hover:border-ink-soft",
                )}
              >
                {item.name}
              </button>
            );
          })}
        </div>
        <p className="mt-4 text-xs text-muted">
          {selected.length === 0
            ? "Select at least one product."
            : `${selected.length} product${selected.length === 1 ? "" : "s"} on this blueprint.`}
        </p>
      </div>
      <div className="bg-paper-2 px-6 py-8 text-ink sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-xs tracking-[0.16em] text-muted">
            blueprint.json
          </p>
          <CopyButton payload={JSON.stringify(blueprint, null, 2)} />
        </div>
        <pre className="mt-5 overflow-x-auto font-mono text-xs leading-relaxed text-ink">
          {JSON.stringify(blueprint, null, 2)}
        </pre>
      </div>
    </div>
  );
}

function CopyButton({ payload }: { payload: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      type="button"
      size="sm"
      variant="outline"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(payload);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1600);
        } catch {
          setCopied(false);
        }
      }}
    >
      {copied ? "Copied" : "Copy"}
    </Button>
  );
}
