import { comparison } from "@/lib/site";

export function CompareTable() {
  return (
    <div>
      <div className="hidden overflow-hidden border-y border-line lg:block">
        <div className="grid grid-cols-4 border-b border-line">
          <p className="px-4 py-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            Question
          </p>
          {comparison.columns.map((col, i) => (
            <p
              key={col}
              className={
                i === 2
                  ? "border-l-2 border-signal px-4 py-4 font-display text-lg text-ink"
                  : "px-4 py-4 text-sm text-muted"
              }
            >
              {col}
            </p>
          ))}
        </div>
        {comparison.rows.map((row) => (
          <div key={row.label} className="grid grid-cols-4 border-b border-line last:border-b-0">
            <p className="px-4 py-4 text-sm font-medium">{row.label}</p>
            {row.cells.map((cell, i) => (
              <p
                key={comparison.columns[i]}
                className={
                  i === 2
                    ? "border-l-2 border-signal px-4 py-4 text-sm leading-relaxed text-ink"
                    : "px-4 py-4 text-sm leading-relaxed text-muted"
                }
              >
                {cell}
              </p>
            ))}
          </div>
        ))}
      </div>
      <ul className="divide-y divide-line border-y border-line lg:hidden">
        {comparison.rows.map((row) => (
          <li key={row.label} className="py-6">
            <p className="font-display text-xl">{row.label}</p>
            <dl className="mt-4 space-y-3">
              {comparison.columns.map((col, i) => (
                <div key={col} className={i === 2 ? "border-l-2 border-signal pl-3" : undefined}>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                    {col}
                  </dt>
                  <dd className={i === 2 ? "mt-1 text-sm" : "mt-1 text-sm text-muted"}>{row.cells[i]}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </div>
  );
}
