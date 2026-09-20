import { Link } from "@tanstack/react-router";
import { nav, site } from "@/lib/site";
import { Mark } from "@/components/mark";

export function SiteFooter() {
  return (
    <footer className="border-t border-night-line bg-night text-night-fg">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-12">
        <div className="md:col-span-5">
          <Mark invert stacked />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-night-muted">
            Licensed core banking for global banks, Tier 1 institutions and
            central banks. Your brand. Your policy. Your books.
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-night-muted">
            House
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link to={item.href} className="hover:text-paper">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/briefing" className="hover:text-paper">
                Briefing
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-night-muted">
            Principals
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a className="hover:text-paper" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>
            <li>
              <a className="hover:text-paper" href={`tel:${site.phone.replace(/\s/g, "")}`}>
                {site.phone}
              </a>
            </li>
            <li className="text-night-muted">{site.address}</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-2 border-t border-night-line px-5 py-6 text-xs text-night-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {new Date().getFullYear()} {site.house}. Licensed core. Not a bank.
        </p>
        <p>Built to be examined.</p>
      </div>
    </footer>
  );
}
