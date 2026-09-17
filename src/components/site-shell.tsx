import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function SiteShell({
  children,
  invertHeader = false,
}: {
  children: ReactNode;
  invertHeader?: boolean;
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-paper">
      <SiteHeader invert={invertHeader} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
