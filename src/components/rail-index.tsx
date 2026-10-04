import { offRamps, onRamps } from "@/lib/site";

type Rail = {
  code: string;
  name: string;
  region: string;
  kind: string;
  blurb: string;
};

function RailColumn({
  label,
  note,
  rails,
}: {
  label: string;
  note: string;
  rails: readonly Rail[];
}) {
  return (
    <div className="border-b border-line lg:border-b-0 lg:border-r lg:last:border-r-0">
      <div className="border-b border-line px-5 py-5 sm:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">{label}</p>
        <p className="mt-2 max-w-[42ch] text-sm leading-relaxed text-muted">{note}</p>
      </div>
      <ul>
        {rails.map((rail) => (
          <li key={rail.code} className="border-b border-line px-5 py-5 last:border-b-0 sm:px-8">
            <div className="grid grid-cols-[4.5rem_1fr] gap-4">
              <p className="font-mono text-xs leading-6 text-ink">{rail.code}</p>
              <div>
                <p className="font-display text-xl leading-snug">{rail.name}</p>
                <p className="mt-1 text-sm text-muted">
                  {rail.kind}
                  {" · "}
                  {rail.region}
                </p>
                <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-muted">{rail.blurb}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function RailIndex() {
  return (
    <div className="grid border-y border-line lg:grid-cols-2">
      <RailColumn
        label="On-ramp"
        note="Credits post to the customer account on the same ledger as the rest of the book."
        rails={onRamps}
      />
      <RailColumn
        label="Off-ramp"
        note="Instructions leave only after the ledger post and the agent trace."
        rails={offRamps}
      />
    </div>
  );
}
