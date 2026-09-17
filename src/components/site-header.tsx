import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Mark } from "@/components/mark";

export function SiteHeader({ invert = false }: { invert?: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b backdrop-blur-md",
        invert
          ? "border-night-line bg-night/92 text-night-fg"
          : "border-line bg-paper/92 text-ink",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link to="/" aria-label={`${site.name} home`} onClick={() => setOpen(false)}>
          <Mark invert={invert} />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "text-sm tracking-wide transition-opacity duration-150 hover:opacity-70",
                pathname === item.href
                  ? invert
                    ? "text-night-fg"
                    : "text-ink"
                  : invert
                    ? "text-night-muted"
                    : "text-muted",
              )}
            >
              {item.label}
            </Link>
          ))}
          <Button asChild size="sm" variant={invert ? "invert" : "primary"}>
            <Link to="/briefing">Request a briefing</Link>
          </Button>
        </nav>

        <button
          type="button"
          className={cn(
            "relative flex size-11 items-center justify-center rounded-md md:hidden",
            invert ? "text-night-fg" : "text-ink",
          )}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className={cn(
            "border-t px-5 py-4 md:hidden",
            invert ? "border-night-line bg-night" : "border-line bg-paper",
          )}
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex min-h-11 items-center text-base",
                  invert ? "text-night-fg" : "text-ink",
                )}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="mt-3 w-full" variant={invert ? "invert" : "primary"}>
              <Link to="/briefing" onClick={() => setOpen(false)}>
                Request a briefing
              </Link>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
