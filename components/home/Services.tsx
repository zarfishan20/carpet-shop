import Link from "next/link";
import SectionHeading from "./SectionHeading";

const services = [
  {
    title: "Domestic carpets",
    text: "Affordable carpet ranges for homes and landlords, with fitting guaranteed.",
    href: "/products?type=carpet",
  },
  {
    title: "Vinyl",
    text: "Waterproof vinyl flooring in a wide choice of finishes at good prices.",
    href: "/products?type=vinyl",
  },
  {
    title: "Laminate",
    text: "Water-resistant, matt, gloss and herringbone styles, fitted by experienced fitters.",
    href: "/products?type=laminate",
  },
  {
    title: "LVT",
    text: "Luxury vinyl tiles that look like real wood or stone and are easy to keep clean.",
    href: "/products?type=lvt",
  },
  {
    title: "Engineered wood",
    text: "A real wood surface on a stable core, for a warm, lasting finish.",
    href: "/products?type=engineered-wood",
  },
  {
    title: "Landlord and commercial",
    text: "Safety flooring and contract work for landlords, schools, offices and councils.",
    href: "/contact",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-sand">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="What we fit"
          title="We supply and fit"
          text="Expert craftsmanship and reliable service on every project."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className="rounded-md border border-bark/10 bg-cream p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold text-brand">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-bark/70">
                {s.text}
              </p>
              <span className="mt-5 inline-block text-sm font-semibold text-ember">
                View more →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}