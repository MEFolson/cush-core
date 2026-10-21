import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, FlaskConical } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { pageMeta } from "@/lib/page-meta";
import { sandbox } from "@/lib/site";

export const Route = createFileRoute("/sandbox")({
  head: () =>
    pageMeta({
      title: "Sandbox",
      description:
        "A hands-on look at what’s possible. The Cush Core sandbox for global banks, Tier 1 institutions, and central banks.",
    }),
  component: SandboxPage,
});

function SandboxPage() {
  return (
    <SiteShell>
      <section className="border-b border-line bg-paper text-ink">
        <div className="mx-auto grid max-w-6xl lg:grid-cols-12">
          <div className="border-b border-line px-5 py-8 sm:px-8 lg:col-span-3 lg:border-b-0 lg:border-r lg:py-16">
            <span className="inline-flex size-12 items-center justify-center border border-line text-signal">
              <FlaskConical className="size-6" aria-hidden="true" />
            </span>
            <div className="mt-6 h-px w-10 bg-signal" aria-hidden="true" />
          </div>
          <div className="px-5 py-14 sm:px-8 sm:py-20 lg:col-span-9 lg:py-24 lg:pl-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">
              Cush Core · Sandbox
            </p>
            <h1 className="mt-5 max-w-[18ch] font-display text-4xl font-normal leading-[1.05] sm:text-6xl">
              A hands-on look at what’s possible.
            </h1>
            <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-muted sm:text-lg">
              We’re getting the Cush Core sandbox ready. Soon, global banks, Tier 1
              institutions, and central banks will be able to explore the platform.
            </p>
            <div className="mt-9 inline-flex items-center gap-3 border border-line px-4 py-2.5 text-sm text-muted">
              <span className="size-2.5 rounded-full bg-signal" aria-hidden="true" />
              The sandbox is being prepared. Request access to be notified.
            </div>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg">
                <a
                  href={sandbox.portalHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={sandbox.portalLabel}
                  aria-label={`${sandbox.portalLabel} (opens in a new tab)`}
                >
                  {sandbox.portalLabel}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/briefing">
                  Ask about access
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Link
                to="/platform"
                className="inline-flex min-h-11 items-center text-sm underline decoration-signal underline-offset-4 sm:ml-3"
              >
                Explore Cush Core
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
