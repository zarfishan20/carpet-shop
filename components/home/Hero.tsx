import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { site } from "@/lib/site";

const years = new Date().getFullYear() - site.since;

const stats = [
  [`${years}+`, "Years trading"],
  [site.googleRating, "Google rating"],
  ["Free", "Home measure"],
  ["Free", "Written quote"],
];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-bark text-cream">
      <Image
        src="/hero.jpeg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-bark/90 via-bark/70 to-bark/40" />

      <div className="mx-auto max-w-7xl px-6 pt-20 pb-10 md:pt-28">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-ember/25 px-5 py-2.5 text-sm">
            <MapPin className="h-4 w-4 text-ember" />
            Proudly serving London since {site.since}
          </p>

          <h1 className="mt-8 text-5xl leading-[1.05] font-bold md:text-7xl">
            Transform Your Home with{" "}
            <span className="text-gold">Quality Flooring</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/85 md:text-xl">
            From {site.area} across North London, we&apos;ve been helping
            homes, landlords and businesses with premium carpets, hard
            flooring and vinyl since {site.since}.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-sm bg-ember px-8 py-4 text-lg font-semibold text-white hover:brightness-95"
            >
              Get Free Quote <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center rounded-sm border-2 border-cream/80 px-8 py-4 text-lg font-semibold hover:bg-cream/10"
            >
              View Our Range
            </Link>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 border-t border-cream/20 pt-8 md:grid-cols-4">
          {stats.map(([value, label]) => (
            <div key={label}>
              <p className="font-display text-4xl font-bold text-gold md:text-5xl">
                {value}
              </p>
              <p className="mt-1 text-sm text-cream/75">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}