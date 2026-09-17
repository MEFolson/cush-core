import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-md border border-line bg-paper px-3.5 font-sans text-sm text-ink",
        "placeholder:text-muted transition-[border-color,box-shadow] duration-150",
        "focus-visible:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal",
        "disabled:opacity-40",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
