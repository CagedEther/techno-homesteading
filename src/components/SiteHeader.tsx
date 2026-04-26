import { Link } from "@tanstack/react-router";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/journal", label: "Journal" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  return (
    <header className="border-b border-rule bg-paper">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-12">
        <Link to="/" className="flex items-baseline gap-2">
          <span
            className="text-2xl font-bold tracking-tight text-ink"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Techno Homesteading
          </span>
          <span className="hidden text-[0.65rem] font-medium uppercase tracking-[0.25em] text-ink-soft sm:inline">
            Quarterly Journal
          </span>
        </Link>
        <nav className="flex items-center gap-7">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-[0.78rem] font-medium uppercase tracking-[0.18em] text-ink-soft transition-colors hover:text-primary"
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-primary" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="rule" />
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-rule bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p
              className="text-2xl font-bold text-ink"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Techno Homesteading
            </p>
            <p className="mt-2 max-w-md text-sm text-ink-soft">
              A quarterly journal of architecture, interiors, and the quiet art
              of living well.
            </p>
          </div>
          <p className="text-xs uppercase tracking-[0.22em] text-ink-soft">
            © {new Date().getFullYear()} Techno Homesteading
          </p>
        </div>
      </div>
    </footer>
  );
}