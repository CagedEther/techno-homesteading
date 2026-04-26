import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <SiteHeader />
      <div className="flex flex-1 items-center justify-center px-6 py-24">
        <div className="max-w-md text-center">
          <p className="eyebrow">Error 404</p>
          <h1
            className="mt-4 text-5xl font-bold text-ink"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Page not found
          </h1>
          <p className="mt-4 text-base text-ink-soft">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center justify-center border border-ink bg-ink px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-paper transition-colors hover:bg-primary hover:border-primary"
          >
            Return Home
          </Link>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Atelier — A Quarterly Journal of Architecture & Interiors" },
      {
        name: "description",
        content:
          "Atelier is a quarterly journal devoted to architecture, interiors, and the quiet art of living well.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
