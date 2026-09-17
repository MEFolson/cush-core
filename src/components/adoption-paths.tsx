import { adoptionPaths } from "@/lib/site";

export function AdoptionPaths({ tone = "paper" }: { tone?: "paper" | "night" }) {
  const night = tone === "night";
  return (
    <ul className="grid gap-px bg-line sm:grid-cols-3">
      {adoptionPaths.map((path) => (
        <li key={path.id} className={night ? "bg-night px-6 py-8" : "bg-paper px-6 py-8"}>
          <p className="font-mono text-xs tracking-[0.16em] text-signal">
            {path.index} / {path.name}
          </p>
          <h3
            className={
              night
                ? "mt-3 text-xl tracking-[-0.02em] text-night-fg"
                : "mt-3 text-xl tracking-[-0.02em]"
            }
          >
            {path.title}
          </h3>
          <p className={night ? "mt-3 text-sm leading-relaxed text-night-muted" : "mt-3 text-sm leading-relaxed text-muted"}>
            {path.body}
          </p>
        </li>
      ))}
    </ul>
  );
}
