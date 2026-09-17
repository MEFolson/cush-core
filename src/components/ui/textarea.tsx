import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "flex min-h-32 w-full rounded-lg border border-line bg-paper px-3.5 py-3 font-sans text-sm text-ink",
        "placeholder:text-muted transition-[border-color] duration-150",
        "focus-visible:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal",
        "disabled:opacity-40",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
