import Image from "next/image";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import CtaBand from "@/components/home/CtaBand";

export const metadata: Metadata = { title: "Our work" };

// Put photos in public/work/ and list them here.
const photos: { src: string; alt: string }[] = [
  // { src: "/work/lounge-carpet.jpg", alt: "Wool carpet fitted in a lounge" },
];

export default function OurWork() {
  return (
    <main>
      <PageHeader
        eyebrow="Gallery"
        title="Our work"
        text="Floors we've fitted across North London."
      />
      <div className="mx-auto max-w-7xl px-6 py-14">
        {photos.length === 0 ? (
          <p className="text-bark/70">Photos coming soon.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {photos.map((p) => (
              <Image
                key={p.src}
                src={p.src}
                alt={p.alt}
                width={800}
                height={600}
                className="aspect-4/3 w-full rounded-md object-cover"
              />
            ))}
          </div>
        )}
      </div>
      <CtaBand />
    </main>
  );
}