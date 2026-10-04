import { Link } from "@tanstack/react-router";
import { nav, site } from "@/lib/site";
import { Mark } from "@/components/mark";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper text-ink">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Mark />
          <p className="mt-6 max-w-[46ch] text-sm leading-relaxed text-muted">
            Licensed core banking for global banks, Tier 1 institutions, and
            central banks. The institution keeps its brand, its mandate, and its books.
          </p>
          <p className="mt-4 max-w-[46ch] text-sm leading-relaxed text-muted">
            Cush Payments runs on Cush Core. This site is not the consumer payments
            site.{" "}
            <a
              className="text-ink underline decoration-signal underline-offset-4"
              href="https://cushpayments.com"
              target="_blank"
              rel="noreferrer"
            >
              cushpayments.com
            </a>
            {" · "}
            <a
              className="text-ink underline decoration-signal underline-offset-4"
              href="https://cushpayments.com/core"
              target="_blank"
              rel="noreferrer"
            >
              /core
            </a>
          </p>
        </div>
        <div className="lg:col-span-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">House</p>
          <ul className="mt-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className="inline-flex min-h-11 items-center text-sm underline decoration-signal underline-offset-4"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/briefing"
                className="inline-flex min-h-11 items-center text-sm underline decoration-signal underline-offset-4"
              >
                Briefing
              </Link>
            </li>
          </ul>
        </div>
        <div className="lg:col-span-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">London</p>
          <ul className="mt-3 text-sm">
            <li>
              <Link
                to="/briefing"
                className="inline-flex min-h-11 items-center underline decoration-signal underline-offset-4"
              >
                Contact
              </Link>
            </li>
            <li>
              <a
                className="inline-flex min-h-11 items-center underline decoration-signal underline-offset-4"
                href={`tel:${site.phone.replace(/\s/g, "")}`}
              >
                {site.phone}
              </a>
            </li>
            <li className="flex min-h-11 items-center text-muted">{site.city}</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-2 border-t border-line px-5 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {new Date().getFullYear()} {site.house}. Licensed core. Not a bank.
        </p>
        <p>Built to be examined.</p>
      </div>
    </footer>
  );
}
