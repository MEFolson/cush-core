import { useState } from "react";
import { inboundRails, outboundRails } from "@/lib/site";
import { cn } from "@/lib/utils";

type Rail = (typeof inboundRails)[number] | (typeof outboundRails)[number];

export function CorridorBoard() {
  const [selected, setSelected] = useState<Rail>(inboundRails[0]);

  return (
    <div className="border border-line bg-paper text-ink">
      <div className="grid gap-0 md:grid-cols-12">
        <div className="border-b border-line px-6 py-8 md:col-span-5 md:border-b-0 md:border-r md:px-8">
          <p className="font-mono text-xs tracking-[0.16em] text-muted">
            Rails · illustrative
          </p>
          <h3 className="mt-4 font-display text-3xl font-medium tracking-[-0.03em]">
            Clearing, RTGS and instant schemes.
          </h3>
          <p className="mt-3 text-muted">One book, wherever you operate.</p>
          <p className="mt-8 max-w-sm text-sm leading-relaxed text-muted">
            Select a rail. Cush Core scores cost, success rate and policy, then posts to
            the ledger before the payment leaves.
          </p>
        </div>
        <div className="md:col-span-7">
          <div className="grid grid-cols-2 divide-x divide-night-line border-b border-line">
            <RailColumn
              label="Clearing"
              rails={inboundRails}
              selected={selected}
              onSelect={setSelected}
            />
            <RailColumn
              label="RTGS & instant"
              rails={outboundRails}
              selected={selected}
              onSelect={setSelected}
            />
          </div>
          <div className="px-6 py-6 sm:px-8">
            <p className="font-mono text-xs tracking-[0.14em] text-signal">{selected.code}</p>
            <p className="mt-2 font-display text-2xl tracking-[-0.02em]">{selected.name}</p>
            <p className="mt-1 text-sm text-muted">{selected.region}</p>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">
              {selected.blurb}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RailColumn({
  label,
  rails,
  selected,
  onSelect,
}: {
  label: string;
  rails: readonly Rail[];
  selected: Rail;
  onSelect: (rail: Rail) => void;
}) {
  return (
    <div>
      <p className="border-b border-line px-5 py-3 font-mono text-xs tracking-[0.16em] text-muted">
        {label}
      </p>
      <ul>
        {rails.map((rail) => {
          const active = selected.code === rail.code;
          return (
            <li key={rail.code}>
              <button
                type="button"
                onClick={() => onSelect(rail)}
                className={cn(
                  "flex min-h-14 w-full items-center justify-between px-5 text-left text-sm transition-colors duration-150",
                  active ? "bg-paper-2 text-ink" : "text-muted hover:text-ink",
                )}
              >
                <span>{rail.name}</span>
                <span className="font-mono text-xs">{rail.code}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
