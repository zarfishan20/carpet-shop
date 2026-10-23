import Link from "next/link";
import { site } from "@/lib/site";

const links = [
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/products", label: "Products" },
  { href: "/our-work", label: "Our work" },
  { href: "/team", label: "Team" },
  { href: "/book", label: "Book a measure" },
];

export default function Header() {
  const tel = `tel:${site.phone.replace(/\s/g, "")}`;

  return (
    <header className="sticky top-0 z-50 border-b border-bark/10 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="leading-none">
          <span className="font-display block text-3xl font-bold text-brand">
            {site.name}
          </span>
          <span className="mt-1 block text-xs uppercase tracking-[0.25em] text-bark/60">
           Floors &amp; Carpets
          </span>
        </Link>

        <nav className="hidden items-center gap-9 text-[17px] text-bark/80 lg:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-ember">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
        
          <Link
            href="/request-a-quote"
            className="rounded-sm bg-ember px-7 py-3.5 text-[16px] font-semibold text-white shadow-md hover:brightness-95"
          >
            Free Quote
          </Link>

          <details className="relative lg:hidden">
            <summary className="cursor-pointer list-none rounded-sm border border-bark/20 px-4 py-3 text-sm">
              Menu
            </summary>
            <div className="absolute right-0 mt-2 grid w-60 gap-1 rounded-md border border-bark/10 bg-cream p-3 shadow-xl">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded px-3 py-2 hover:bg-sand"
                >
                  {l.label}
                </Link>
              ))}
              <a href={tel} className="rounded px-3 py-2 hover:bg-sand">
                {site.phone}
              </a>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}