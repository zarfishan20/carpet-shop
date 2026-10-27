import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { productQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = await client.fetch(productQuery, { slug });
  if (!p) return {};
  return {
    title: p.name,
    description: p.description?.slice(0, 155) ?? `${p.name} flooring`,
  };
}

export default async function Product({ params }: Params) {
  const { slug } = await params;
  const p = await client.fetch(productQuery, { slug });
  if (!p) notFound();

  const specs: [string, string | number | null | undefined][] = [
    ["Type", p.type?.replace("-", " ")],
    ["Brand", p.brand],
    ["Range", p.range],
    ["Colour", p.color],
    ["Material", p.material],
    ["Roll widths", p.rollWidths?.join(", ")],
    ["Thickness", p.thickness],
    ["Wear layer", p.wearLayer],
    ["AC rating", p.acRating],
    ["Wood species", p.woodSpecies],
    ["Finish", p.finish],
    ["Installation", p.installation],
    ["Pack coverage", p.packCoverage ? `${p.packCoverage} m²` : undefined],
    ["Waterproof", p.waterproof ? "Yes" : undefined],
  ];

  const images = p.images ?? [];

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <Link href="/products" className="text-sm text-bark/60 hover:text-ember">
        ← All products
      </Link>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <div>
          {images[0] && (
            <Image
              src={urlFor(images[0]).width(1000).height(1000).url()}
              alt={p.name ?? ""}
              width={1000}
              height={1000}
              priority
              className="w-full rounded-md object-cover"
            />
          )}
          {images.length > 1 && (
            <div className="mt-3 grid grid-cols-4 gap-3">
              {images.slice(1, 5).map((img, i) => (
                <Image
                  key={i}
                  src={urlFor(img).width(300).height(300).url()}
                  alt=""
                  width={300}
                  height={300}
                  className="aspect-square w-full rounded-sm object-cover"
                />
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 className="text-4xl font-bold text-brand">{p.name}</h1>
          {p.description && (
            <p className="mt-4 whitespace-pre-line leading-relaxed text-bark/75">
              {p.description}
            </p>
          )}

          <dl className="mt-8 divide-y divide-bark/10 border-y border-bark/10">
            {specs
              .filter(([, v]) => v)
              .map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 py-3">
                  <dt className="text-bark/60">{label}</dt>
                  <dd className="text-right font-medium capitalize">{value}</dd>
                </div>
              ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/request-a-quote?product=${encodeURIComponent(p.name ?? "")}`}
              className="rounded-sm bg-ember px-7 py-3.5 font-semibold text-white hover:brightness-95"
            >
              Request a quote
            </Link>
            <Link
              href="/book"
              className="rounded-sm border-2 border-brand px-7 py-3.5 font-semibold text-brand hover:bg-brand hover:text-cream"
            >
              Book free measurement
            </Link>
          </div>
          <p className="mt-4 text-sm text-bark/60">
            Prices vary by size and fitting. Call us on{" "}
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="underline"
            >
              {site.phone}
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
