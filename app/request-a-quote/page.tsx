import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import QuoteForm from "@/components/QuoteForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a quote",
  description: `Request a free flooring quote from ${site.name}. Free home measure, written quote and expert fitting.`,
};

const steps = [
  { title: "Tell us what you need", text: "Fill in the form, or call us." },
  { title: "Free home measure", text: "We visit, measure and show you samples." },
  { title: "Written quote", text: "A clear price with no surprises." },
  { title: "Expert fitting", text: "Fitted by our team, and the room left tidy." },
];

export default async function RequestAQuote({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const { product } = await searchParams;

  return (
    <main>
      <PageHeader
        eyebrow="Free quote"
        title="Request a quote"
        text="Tell us about your project and we'll get back to you with a free measure and a written quote."
      />

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[1.6fr_1fr]">
        <QuoteForm product={product} />

        <aside className="grid content-start gap-6">
          <div className="rounded-md bg-sand p-8">
            <h2 className="text-2xl font-bold text-brand">What happens next</h2>
            <ol className="mt-5 grid gap-5">
              {steps.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="font-display text-2xl font-bold text-gold">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-brand">{s.title}</p>
                    <p className="text-sm text-bark/70">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-md border border-bark/10 bg-white p-8">
            <h2 className="text-xl font-bold text-brand">Prefer to talk?</h2>
            <p className="mt-2 text-bark/70">
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="text-lg font-semibold text-ember"
              >
                {site.phone}
              </a>
            </p>
            <p className="mt-1 text-sm text-bark/60">
              {site.hours.map(([d, t]) => `${d} ${t}`).join(" · ")}
            </p>
            <a
              href={site.measurementUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block rounded-sm border-2 border-brand px-6 py-3 font-semibold text-brand hover:bg-brand hover:text-cream"
            >
              Book a measure online
            </a>
          </div>
        </aside>
      </div>
    </main>
  );
}