import Link from "next/link";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import CtaBand from "@/components/home/CtaBand";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About us",
  description: `${site.name} has been supplying and fitting carpets and flooring in ${site.area} since ${site.since}.`,
};

const values = [
  {
    title: "Honest advice",
    text: "We help you pick the right floor for the room and your budget, not the most expensive one.",
  },
  {
    title: "Clear pricing",
    text: "A free home measure and a written quote, so you know the full cost before we start.",
  },
  {
    title: "Fitted properly",
    text: "Experienced fitters who prepare the floor, fit it neatly and leave your home tidy.",
  },
];

export default function About() {
  return (
    <main>
      <PageHeader
        eyebrow="About us"
        title={`Flooring specialists in ${site.area}`}
        text={`Family-run and serving North London since ${site.since}.`}
      />

      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="space-y-5 text-lg leading-relaxed text-bark/80">
          <p>
            {site.name} started in {site.since} with a simple idea: good
            flooring, fairly priced, fitted by people who care about the
            result. From our shop on {site.address[0]}, we supply and fit
            carpets, vinyl, LVT, laminate and engineered wood for homes,
            landlords and businesses.
          </p>
          <p>
            {/* Edit this paragraph to tell your own story. */}
            We work with trusted suppliers, so you can see and feel samples in
            the shop, then have your floor measured, supplied and fitted by
            one team.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {values.map((v, i) => (
            <div key={v.title} className="border-t-2 border-gold pt-5">
              <p className="font-display text-2xl font-bold text-gold">0{i + 1}</p>
              <h2 className="mt-2 text-xl font-semibold text-brand">{v.title}</h2>
              <p className="mt-2 text-bark/70">{v.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap gap-3">
          <Link
            href="/products"
            className="rounded-sm bg-ember px-7 py-3.5 font-semibold text-white hover:brightness-95"
          >
            Browse products
          </Link>
          <Link
            href="/contact"
            className="rounded-sm border-2 border-brand px-7 py-3.5 font-semibold text-brand hover:bg-brand hover:text-cream"
          >
            Contact us
          </Link>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}