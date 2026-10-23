import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { brandsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

type Brand = {
  _id: string;
  name: string | null;
  slug: string | null;
  logo?: Parameters<typeof urlFor>[0] | null;
};

export default async function Suppliers() {
  const brands: Brand[] = await client.fetch(brandsQuery);
  if (brands.length === 0) return null;

  return (
    <section className="border-y border-bark/10 bg-sand">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-ember">
          Our suppliers
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-10">
          {brands.map((b) => (
            <Link key={b._id} href={`/brands/${b.slug}`} className="text-center">
              {b.logo ? (
                <Image
                  src={urlFor(b.logo).height(80).url()}
                  alt={b.name ?? ""}
                  width={160}
                  height={80}
                  className="h-12 w-auto object-contain"
                />
              ) : (
                <span className="font-display text-xl text-brand">
                  {b.name}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}