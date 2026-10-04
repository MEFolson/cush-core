import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Mark } from "@/components/mark";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper text-ink">
      <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          to="/"
          aria-label={`${site.name} home`}
          className="inline-flex min-h-11 items-center"
          onClick={() => setOpen(false)}
        >
          <Mark />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "inline-flex min-h-11 items-center text-sm",
                pathname === item.href
                  ? "text-ink underline decoration-signal decoration-2 underline-offset-8"
                  : "text-muted hover:text-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
          <Button asChild>
            <Link to="/briefing">Request a briefing</Link>
          </Button>
        </nav>

        <button
          type="button"
          className="inline-flex min-h-11 items-center gap-2 px-2 text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
          <span className="text-sm">{open ? "Close" : "Menu"}</span>
        </button>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-line bg-paper px-5 py-3 lg:hidden">
          <nav className="flex flex-col" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex min-h-11 items-center border-b border-line text-base",
                  pathname === item.href ? "text-ink" : "text-muted",
                )}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="mt-3 w-full">
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
