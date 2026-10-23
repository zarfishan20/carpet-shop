import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { featuredQuery } from "@/sanity/lib/queries";
import ProductCard from "@/components/ProductCard";
import SectionHeading from "./SectionHeading";

export default async function Featured() {
  const featured = await client.fetch(featuredQuery);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <SectionHeading
        eyebrow="Our collections"
        title="Explore our collections"
        text="A wide choice of styles, colours and finishes to suit every home."
      />
      <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
        {featured.map((p) => (
          <ProductCard key={p._id} {...p} />
        ))}
      </div>
      <Link
        href="/products"
        className="mt-10 inline-block rounded-sm border-2 border-brand px-7 py-3 font-semibold text-brand hover:bg-brand hover:text-cream"
      >
        View all products
      </Link>
    </section>
  );
}