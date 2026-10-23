import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

type Props = {
  name?: string | null;
  slug?: string | null;
  type?: string | null;
  image?: { asset?: { _ref: string } } | null;
};

export default function ProductCard({ name, slug, type, image }: Props) {
  if (!slug) return null;
  return (
    <Link href={`/products/${slug}`} className="group block">
      <div className="overflow-hidden rounded-md bg-sand">
        {image && (
          <Image
            src={urlFor(image).width(600).height(600).url()}
            alt={name ?? ""}
            width={600}
            height={600}
            className="aspect-square w-full object-cover transition duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <h2 className="font-display mt-3 text-lg font-semibold text-brand">
        {name}
      </h2>
      <p className="text-xs uppercase tracking-[0.2em] text-bark/60">
        {(type ?? "").replace("-", " ")}
      </p>
    </Link>
  );
}