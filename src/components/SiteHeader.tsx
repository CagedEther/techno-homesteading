import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo-techno-homesteading.png";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/journal", label: "Journal" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  return (
    <header className="border-b border-rule bg-paper">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-12">
        <Link to="/" className="flex items-center gap-4">
          <img
            src={logo}
            alt="Techno Homesteading"
            className="h-14 w-auto md:h-20 lg:h-24"
          />
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
            <img
              src={logo}
              alt="Techno Homesteading"
              className="h-8 w-auto md:h-10"
            />
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