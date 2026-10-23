import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { rangePageQuery } from "@/sanity/lib/queries";
import ProductCard from "@/components/ProductCard";
import PageHeader from "@/components/PageHeader";

type Params = { params: Promise<{ brand: string; range: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { brand, range } = await params;
  const r = await client.fetch(rangePageQuery, { brand, range });
  return r
    ? { title: `${r.name} by ${r.brand?.name}`, description: r.description ?? undefined }
    : {};
}

export default async function RangePage({ params }: Params) {
  const { brand, range } = await params;
  const r = await client.fetch(rangePageQuery, { brand, range });
  if (!r) notFound();

  return (
    <main>
      <PageHeader
        eyebrow={r.brand?.name ?? "Range"}
        title={r.name ?? ""}
        text={r.description ?? undefined}
      >
        <Link href={`/brands/${brand}`} className="mb-4 inline-block text-sm text-bark/60 hover:text-ember">
          ← {r.brand?.name}
        </Link>
      </PageHeader>

      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {r.products.map((p) => (
            <ProductCard key={p._id} {...p} />
          ))}
        </div>
      </div>
    </main>
  );
}