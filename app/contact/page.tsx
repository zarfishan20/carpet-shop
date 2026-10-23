import Link from "next/link";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Visit ${site.name} at ${site.address.join(", ")} or call ${site.phone}.`,
};

export default function Contact() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    site.address.join(", ")
  )}&output=embed`;

  return (
    <main>
      <PageHeader
        eyebrow="Get in touch"
        title="Contact us"
        text="Visit our shop, call, or email. For a price, request a free quote."
      />

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-2">
        <div className="rounded-md border border-bark/10 bg-white p-8">
          <h2 className="text-2xl font-bold text-brand">Visit our shop</h2>
          <address className="mt-3 not-italic text-bark/75">
            {site.address.map((l) => (
              <div key={l}>{l}</div>
            ))}
          </address>
          <p className="mt-3">
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="text-lg font-semibold text-brand"
            >
              {site.phone}
            </a>
          </p>
          <p>
            <a href={`mailto:${site.email}`} className="text-bark/75 underline">
              {site.email}
            </a>
          </p>
          <dl className="mt-5 grid grid-cols-2 gap-y-1 text-sm text-bark/75">
            {site.hours.map(([day, time]) => (
              <div key={day} className="contents">
                <dt className="font-medium">{day}</dt>
                <dd>{time}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/request-a-quote"
              className="rounded-sm bg-ember px-6 py-3 font-semibold text-white hover:brightness-95"
            >
              Request a quote
            </Link>
            <a
              href={site.measurementUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm border-2 border-brand px-6 py-3 font-semibold text-brand hover:bg-brand hover:text-cream"
            >
              Book free measurement
            </a>
          </div>
        </div>

        <iframe
          title="Map"
          src={mapSrc}
          loading="lazy"
          className="h-96 w-full rounded-md border border-bark/10 lg:h-full"
        />
      </div>
    </main>
  );
}