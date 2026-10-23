import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { brandPageQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import ProductCard from "@/components/ProductCard";
import PageHeader from "@/components/PageHeader";

type Params = { params: Promise<{ brand: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { brand } = await params;
  const b = await client.fetch(brandPageQuery, { brand });
  return b ? { title: b.name, description: b.description ?? undefined } : {};
}

export default async function BrandPage({ params }: Params) {
  const { brand } = await params;
  const b = await client.fetch(brandPageQuery, { brand });
  if (!b) notFound();

  return (
    <main>
      <PageHeader
        eyebrow="Brand"
        title={b.name ?? ""}
        text={b.description ?? undefined}
      >
        <Link href="/brands" className="mb-4 inline-block text-sm text-bark/60 hover:text-ember">
          ← All brands
        </Link>
      </PageHeader>

      <div className="mx-auto max-w-7xl px-6 py-14">
        {b.ranges.length > 0 && (
          <>
            <h2 className="text-3xl font-bold text-brand">Ranges</h2>
            <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
              {b.ranges.map((r) => (
                <Link key={r._id} href={`/brands/${brand}/${r.slug}`} className="group block">
                  <div className="overflow-hidden rounded-md bg-sand">
                    {r.image ? (
                      <Image
                        src={urlFor(r.image).width(600).height(600).url()}
                        alt={r.name ?? ""}
                        width={600}
                        height={600}
                        className="aspect-square w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="aspect-square" />
                    )}
                  </div>
                  <h3 className="font-display mt-3 text-lg font-semibold text-brand">
                    {r.name}
                  </h3>
                </Link>
              ))}
            </div>
          </>
        )}

        <h2 className="mt-14 text-3xl font-bold text-brand">
          All {b.name} products
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
          {b.products.map((p) => (
            <ProductCard key={p._id} {...p} />
          ))}
        </div>
      </div>
    </main>
  );
}