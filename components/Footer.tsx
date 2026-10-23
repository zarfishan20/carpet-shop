import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-bark text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <p className="font-display text-3xl font-bold text-gold">
            {site.name}
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.25em] text-cream/60">
           Floors &amp; Carpets
          </p>
          <p className="mt-4 text-sm text-cream/70">{site.tagline}</p>
        </div>

        <div className="text-sm">
          <p className="font-semibold text-gold">Products</p>
          <ul className="mt-3 grid gap-2 text-cream/75">
            <li><Link href="/products?type=carpet">Carpets</Link></li>
            <li><Link href="/products?type=vinyl">Vinyl</Link></li>
            <li><Link href="/products?type=lvt">LVT</Link></li>
            <li><Link href="/products?type=laminate">Laminate</Link></li>
            <li><Link href="/products?type=engineered-wood">Engineered wood</Link></li>
          </ul>
        </div>

        <div className="text-sm">
          <p className="font-semibold text-gold">Visit us</p>
          <address className="mt-3 not-italic text-cream/75">
            {site.address.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </address>
          <p className="mt-3">
            <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
          </p>
          <p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>

        <div className="text-sm">
          <p className="font-semibold text-gold">Opening hours</p>
          <dl className="mt-3 grid grid-cols-2 gap-y-1 text-cream/75">
            {site.hours.map(([day, time]) => (
              <div key={day} className="contents">
                <dt>{day}</dt>
                <dd>{time}</dd>
              </div>
            ))}
          </dl>
          <Link
            href="/contact"
            className="mt-5 inline-block rounded-sm bg-ember px-6 py-3 font-semibold text-white"
          >
            Free Quote
          </Link>
        </div>
      </div>
      <p className="border-t border-cream/10 px-6 py-5 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </p>
    </footer>
  );
}