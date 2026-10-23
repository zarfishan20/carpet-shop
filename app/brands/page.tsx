import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { brandsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Brands",
  description: "The carpet and flooring brands we supply.",
};

export default async function Brands() {
  const brands = await client.fetch(brandsQuery);

  return (
    <main>
      <PageHeader
        eyebrow="Suppliers"
        title="Our brands"
        text="We stock ranges from trusted UK manufacturers."
      />
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-5 px-6 py-14 md:grid-cols-4">
        {brands.map((b) => (
          <Link
            key={b._id}
            href={`/brands/${b.slug}`}
            className="flex h-40 items-center justify-center rounded-md border border-bark/10 bg-white p-6 text-center transition hover:-translate-y-1 hover:shadow-lg"
          >
            {b.logo ? (
              <Image
                src={urlFor(b.logo).height(120).url()}
                alt={b.name ?? ""}
                width={200}
                height={120}
                className="max-h-20 w-auto object-contain"
              />
            ) : (
              <span className="font-display text-xl font-semibold text-brand">
                {b.name}
              </span>
            )}
          </Link>
        ))}
      </div>
    </main>
  );
}