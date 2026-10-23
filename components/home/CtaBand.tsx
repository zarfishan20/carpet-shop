import { site } from "@/lib/site";

export default function CtaBand() {
  return (
    <section className="bg-bark text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Free measurement
          </p>
          <h2 className="mt-3 text-4xl font-bold">Book a free home measure</h2>
          <p className="mt-4 max-w-md text-cream/75">
            We offer a free home advice, measuring and estimating service. A
            visit from our flooring experts will help you choose the perfect
            floor.
          </p>
          <a
            href={site.measurementUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-block rounded-sm bg-ember px-8 py-4 text-lg font-semibold text-white hover:brightness-95"
          >
            Book free measurement
          </a>
        </div>
        <div className="text-cream/75">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Visit our shop
          </p>
          <p className="mt-3">{site.address.join(", ")}</p>
          <p className="mt-2">
            <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
          </p>
          <p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>
      </div>
    </section>
  );
}