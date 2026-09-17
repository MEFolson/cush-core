import { cn } from "@/lib/utils";

export function Mark({
  className,
  invert = false,
  stacked = false,
}: {
  className?: string;
  invert?: boolean;
  stacked?: boolean;
}) {
  if (stacked) {
    return (
      <img
        src="/brand/lockup.png"
        alt="Cush Core"
        className={cn("mark h-16 w-auto sm:h-20", className)}
      />
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <img
        src={invert ? "/brand/mark.png" : "/brand/mark-ink.png"}
        alt=""
        className="mark size-8 shrink-0"
      />
      <span
        className={cn(
          "font-display text-base font-semibold tracking-[-0.03em] leading-none",
          invert ? "text-night-fg" : "text-ink",
        )}
      >
        Cush Core
      </span>
    </span>
  );
}
