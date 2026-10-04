import { adoptionPaths } from "@/lib/site";

export function AdoptionPaths() {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {adoptionPaths.map((path) => (
        <li id={path.id} key={path.id} className="grid scroll-mt-24 gap-3 py-8 lg:grid-cols-12 lg:gap-8">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-signal lg:col-span-3">
            {path.index}
            <span className="mt-2 block normal-case tracking-normal text-ink">{path.name}</span>
          </p>
          <div className="lg:col-span-9">
            <h3 className="font-display text-2xl font-normal">{path.title}</h3>
            <p className="mt-3 max-w-[65ch] text-sm leading-relaxed text-muted">{path.body}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
