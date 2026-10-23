import { site } from "@/lib/site";
import SectionHeading from "./SectionHeading";

const reviews = [
  { name: "Customer name", text: "Add a real review here, copied from your Google reviews." },
  { name: "Customer name", text: "Add a real review here, copied from your Google reviews." },
  { name: "Customer name", text: "Add a real review here, copied from your Google reviews." },
];

export default function Reviews() {
  return (
    <section id="reviews" className="mx-auto max-w-7xl px-6 py-20">
      <SectionHeading
        eyebrow="Testimonials"
        title="What our customers say"
        text={`Rated ${site.googleRating} on Google by hundreds of happy customers.`}
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {reviews.map((r, i) => (
          <figure
            key={i}
            className="rounded-md border border-bark/10 bg-cream p-7 shadow-sm"
          >
            <p aria-label="5 stars" className="text-gold">
              ★★★★★
            </p>
            <blockquote className="mt-3 leading-relaxed text-bark/80">
              {r.text}
            </blockquote>
            <figcaption className="mt-5 text-sm font-semibold text-brand">
              {r.name}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}