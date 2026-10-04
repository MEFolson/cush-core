import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        title:
          "Cush Core · Licensed core banking for global banks, Tier 1 and central banks",
      },
      {
        name: "description",
        content:
          "Cush Core is licensed core banking for global banks, Tier 1 institutions and central banks. Immutable ledger. Institutional mandate. Clearing and settlement on one system of record.",
      },
      { name: "theme-color", content: "#f4f1ea" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Cush Core" },
      {
        property: "og:title",
        content:
          "Cush Core · Licensed core banking for global banks, Tier 1 and central banks",
      },
      {
        property: "og:description",
        content:
          "Cush Core is licensed core banking for global banks, Tier 1 institutions and central banks. Immutable ledger. Institutional mandate. Clearing and settlement on one system of record.",
      },
      { property: "og:image", content: "/og.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Newsreader:ital,opsz,wght@0,6..72,400..600;1,6..72,400..500&family=Source+Sans+3:ital,wght@0,400;0,500;0,600;1,400&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: () => (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="min-h-dvh bg-paper font-sans text-ink">
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
