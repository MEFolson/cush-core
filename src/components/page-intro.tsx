import { cn } from "@/lib/utils";

export function PageIntro({
  folio,
  kicker,
  title,
  lead,
  invert = false,
}: {
  folio: string;
  kicker: string;
  title: string;
  lead: string;
  invert?: boolean;
}) {
  return (
    <header
      className={cn(
        "border-b",
        invert ? "border-night-line bg-night text-night-fg" : "border-line bg-paper text-ink",
      )}
    >
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <p
          className={cn(
            "font-mono text-xs tracking-[0.18em]",
            invert ? "text-night-muted" : "text-muted",
          )}
        >
          {folio} / {kicker}
        </p>
        <h1 className="mt-5 max-w-3xl font-display text-4xl font-medium leading-[1.12] tracking-[-0.03em] sm:text-6xl">
          {title}
        </h1>
        <p
          className={cn(
            "mt-6 max-w-2xl text-base leading-relaxed sm:text-lg",
            invert ? "text-night-muted" : "text-muted",
          )}
        >
          {lead}
        </p>
      </div>
    </header>
  );
}
