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
      { title: "Techno Homesteading: For the Off-Grid Inventor in You" },
      {
        name: "description",
        content:
          "Techno Homesteading is a quarterly journal devoted to architecture, interiors, and the quiet art of living well.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Techno Homesteading: For the Off-Grid Inventor in You" },
      { name: "twitter:title", content: "Techno Homesteading: For the Off-Grid Inventor in You" },
      { name: "description", content: "Techno Homesteading is a practical guide for building a modern, resilient homestead, blending off-grid systems, smart monitoring, and renewable energy." },
      { property: "og:description", content: "Techno Homesteading is a practical guide for building a modern, resilient homestead, blending off-grid systems, smart monitoring, and renewable energy." },
      { name: "twitter:description", content: "Techno Homesteading is a practical guide for building a modern, resilient homestead, blending off-grid systems, smart monitoring, and renewable energy." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/f531879f-5d3c-44b1-9ad4-1e8a845dffa6" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/f531879f-5d3c-44b1-9ad4-1e8a845dffa6" },
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
