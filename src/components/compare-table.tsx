import { comparison } from "@/lib/site";

export function CompareTable() {
  return (
    <div>
      <div className="hidden overflow-hidden border border-line lg:block">
        <div className="grid grid-cols-4 border-b border-line bg-paper-2">
          <p className="px-4 py-4 text-xs uppercase tracking-[0.14em] text-muted"> </p>
          {comparison.columns.map((col, i) => (
            <p
              key={col}
              className={
                i === 2
                  ? "px-4 py-4 text-sm font-medium tracking-[-0.02em] text-signal"
                  : "px-4 py-4 text-sm tracking-[-0.02em] text-muted"
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
                    ? "px-4 py-4 text-sm leading-relaxed"
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
            <p className="text-sm font-medium">{row.label}</p>
            <dl className="mt-3 space-y-2">
              {comparison.columns.map((col, i) => (
                <div key={col}>
                  <dt className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
                    {col}
                  </dt>
                  <dd className={i === 2 ? "mt-0.5 text-sm" : "mt-0.5 text-sm text-muted"}>
                    {row.cells[i]}
                  </dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </div>
  );
}
