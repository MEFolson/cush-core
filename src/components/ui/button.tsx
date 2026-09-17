import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans text-sm font-medium transition-[opacity,transform,background-color,color,border-color] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary: "bg-ink text-paper hover:bg-ink-soft",
        invert: "bg-paper text-ink hover:bg-paper-2",
        night: "bg-night text-night-fg hover:bg-night-2",
        outline:
          "border border-line bg-transparent text-ink hover:border-ink-soft hover:bg-paper-2",
        ghost: "bg-transparent text-ink hover:bg-paper-2",
        nightOutline:
          "border border-night-line bg-transparent text-night-fg hover:border-night-muted",
      },
      size: {
        default: "h-11 rounded-md px-5",
        lg: "h-12 rounded-md px-6",
        sm: "h-9 rounded-sm px-3.5 text-xs",
        icon: "size-11 rounded-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
