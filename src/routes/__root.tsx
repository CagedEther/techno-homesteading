import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";

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
      { title: "Techno Homesteading — Old Wisdom, Useful Technology" },
      {
        name: "description",
        content:
          "Practical guidance for growing food, producing your own energy, and using technology to build a more capable life on the land.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Techno Homesteading — Old Wisdom, Useful Technology" },
      { name: "twitter:title", content: "Techno Homesteading — Old Wisdom, Useful Technology" },
      {
        property: "og:description",
        content:
          "Old wisdom, useful technology, and practical guidance for a more self-reliant life on the land.",
      },
      {
        name: "twitter:description",
        content:
          "Old wisdom, useful technology, and practical guidance for a more self-reliant life on the land.",
      },
      { property: "og:image", content: "/og.png" },
      { name: "twitter:image", content: "/og.png" },
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
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');
`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "xzrlt12uxw");
`,
          }}
        />
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
      <GoogleAnalytics />
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
