import Link from "next/link";
import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { brandsQuery, productsQuery } from "@/sanity/lib/queries";
import ProductCard from "@/components/ProductCard";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Products",
  description: "Carpets, vinyl, LVT, laminate and engineered wood flooring.",
};

const TYPES = [
  { label: "All", value: "" },
  { label: "Carpet", value: "carpet" },
  { label: "Vinyl", value: "vinyl" },
  { label: "LVT", value: "lvt" },
  { label: "Laminate", value: "laminate" },
  { label: "Engineered wood", value: "engineered-wood" },
];

function href(type?: string, brand?: string) {
  const p = new URLSearchParams();
  if (type) p.set("type", type);
  if (brand) p.set("brand", brand);
  const s = p.toString();
  return s ? `/products?${s}` : "/products";
}

const pill = "rounded-full border px-4 py-2 text-sm font-medium transition";
const on = "border-brand bg-brand text-cream";
const off = "border-bark/20 hover:border-brand";

export default async function Products({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; brand?: string }>;
}) {
  const { type, brand } = await searchParams;
  const [products, brands] = await Promise.all([
    client.fetch(productsQuery, { type: type ?? null, brand: brand ?? null }),
    client.fetch(brandsQuery),
  ]);

  return (
    <main>
      <PageHeader
        eyebrow="Our range"
        title="Products"
        text="Browse our carpets and hard flooring. Found something you like? Request a quote or book a free home measure."
      />

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <Link
              key={t.value}
              href={href(t.value || undefined, brand)}
              className={`${pill} ${(type ?? "") === t.value ? on : off}`}
            >
              {t.label}
            </Link>
          ))}
        </div>

        {brands.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-sm text-bark/60">Brand:</span>
            {brands.map((b) => (
              <Link
                key={b._id}
                href={href(type, brand === b.slug ? undefined : (b.slug ?? undefined))}
                className={`${pill} ${brand === b.slug ? on : off}`}
              >
                {b.name}
              </Link>
            ))}
          </div>
        )}

        {products.length === 0 ? (
          <p className="mt-12 text-bark/70">
            No products found.{" "}
            <Link href="/products" className="font-semibold text-ember underline">
              Clear filters
            </Link>
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p._id} {...p} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}