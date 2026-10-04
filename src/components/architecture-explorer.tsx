import { useState } from "react";
import { layers } from "@/lib/site";
import { cn } from "@/lib/utils";

export function ArchitectureExplorer() {
  const [active, setActive] = useState<(typeof layers)[number]["id"]>(layers[0].id);
  const layer = layers.find((l) => l.id === active) ?? layers[0];

  return (
    <div className="grid border-y border-line bg-paper text-ink md:grid-cols-12">
      <div className="border-b border-line md:col-span-4 md:border-b-0 md:border-r" role="tablist" aria-label="Platform layers">
        <p className="border-b border-line px-5 py-4 font-mono text-[11px] uppercase tracking-[0.16em] text-signal">
          Four layers
        </p>
        {layers.map((item) => {
          const selected = item.id === active;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={selected}
              id={`layer-tab-${item.id}`}
              aria-controls={`layer-panel-${item.id}`}
              onClick={() => setActive(item.id)}
              className={cn(
                "flex min-h-14 w-full items-baseline gap-4 border-b border-l-2 border-line px-5 py-4 text-left last:border-b-0",
                selected ? "border-l-signal bg-paper-2" : "border-l-transparent hover:bg-paper-2/70",
              )}
            >
              <span className="font-mono text-xs text-signal">{item.index}</span>
              <span className={cn("font-display text-lg", selected ? "text-ink" : "text-muted")}>
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id={`layer-panel-${layer.id}`}
        aria-labelledby={`layer-tab-${layer.id}`}
        className="px-6 py-8 sm:px-10 sm:py-12 md:col-span-8"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">
          Layer {layer.index}
        </p>
        <h3 className="mt-3 max-w-[22ch] font-display text-3xl font-normal sm:text-4xl">{layer.title}</h3>
        <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-muted">{layer.body}</p>
        <ul className="mt-8 max-w-[65ch] divide-y divide-line border-y border-line">
          {layer.points.map((point) => (
            <li key={point} className="py-3 text-sm leading-relaxed text-ink-soft">
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
