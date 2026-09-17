import { useState } from "react";
import { layers } from "@/lib/site";
import { cn } from "@/lib/utils";

export function ArchitectureExplorer({ tone = "light" }: { tone?: "light" | "night" }) {
  const [active, setActive] = useState<(typeof layers)[number]["id"]>(layers[0].id);
  const layer = layers.find((l) => l.id === active) ?? layers[0];
  const night = tone === "night";

  return (
    <div
      className={cn(
        "grid gap-0 border md:grid-cols-12",
        night
          ? "border-night-line bg-night text-night-fg"
          : "border-line bg-paper text-ink",
      )}
    >
      <div
        className={cn(
          "border-b md:col-span-4 md:border-b-0 md:border-r",
          night ? "border-night-line" : "border-line",
        )}
      >
        <p
          className={cn(
            "border-b px-5 py-4 font-mono text-xs tracking-[0.16em]",
            night ? "border-night-line text-night-muted" : "border-line text-muted",
          )}
        >
          Four layers · one system
        </p>
        <div role="tablist" aria-label="Platform layers" className="flex flex-col">
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
                  "flex min-h-14 items-baseline gap-4 border-b px-5 py-4 text-left transition-colors duration-150 last:border-b-0",
                  night ? "border-night-line" : "border-line",
                  selected
                    ? night
                      ? "bg-night-2"
                      : "bg-paper-2"
                    : night
                      ? "hover:bg-night-2/60"
                      : "hover:bg-paper-2/60",
                )}
              >
                <span
                  className={cn(
                    "font-mono text-xs",
                    night ? "text-night-muted" : "text-muted",
                  )}
                >
                  {item.index}
                </span>
                <span
                  className={cn(
                    "text-lg tracking-[-0.02em]",
                    selected
                      ? night
                        ? "text-night-fg"
                        : "text-ink"
                      : night
                        ? "text-night-muted"
                        : "text-muted",
                  )}
                >
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <div
        role="tabpanel"
        id={`layer-panel-${layer.id}`}
        aria-labelledby={`layer-tab-${layer.id}`}
        className="md:col-span-8"
      >
        <div className={cn("flex h-1.5 w-full", night ? "bg-night-2" : "bg-paper-2")}>
          <div
            className="w-1/4 bg-signal"
            style={{ marginLeft: `${layers.findIndex((l) => l.id === layer.id) * 25}%` }}
          />
        </div>
        <div className="px-6 py-8 sm:px-10 sm:py-12">
          <p
            className={cn(
              "font-mono text-xs tracking-[0.16em]",
              night ? "text-night-muted" : "text-muted",
            )}
          >
            Layer {layer.index}
          </p>
          <h3 className="mt-3 text-3xl font-medium tracking-[-0.03em] sm:text-4xl">{layer.title}</h3>
          <p
            className={cn(
              "mt-4 max-w-xl text-base leading-relaxed",
              night ? "text-night-muted" : "text-muted",
            )}
          >
            {layer.body}
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {layer.points.map((point) => (
              <li
                key={point}
                className={cn(
                  "border-l-2 pl-4 text-sm leading-relaxed",
                  night
                    ? "border-signal/50 text-night-fg"
                    : "border-signal/50 text-ink-soft",
                )}
              >
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
