import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import CtaBand from "@/components/home/CtaBand";

export const metadata: Metadata = { title: "Case studies" };

// Replace these with your real projects.
const cases = [
  {
    title: "Project name",
    place: "Location",
    text: "What the customer needed, what you fitted, and how it turned out.",
  },
  {
    title: "Project name",
    place: "Location",
    text: "What the customer needed, what you fitted, and how it turned out.",
  },
  {
    title: "Project name",
    place: "Location",
    text: "What the customer needed, what you fitted, and how it turned out.",
  },
];

export default function CaseStudies() {
  return (
    <main>
      <PageHeader
        eyebrow="Case studies"
        title="Recent projects"
        text="A look at some of the homes and businesses we've worked with."
      />
      <div className="mx-auto grid max-w-7xl gap-5 px-6 py-14 md:grid-cols-3">
        {cases.map((c, i) => (
          <article key={i} className="rounded-md border border-bark/10 bg-white p-7 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ember">
              {c.place}
            </p>
            <h2 className="mt-2 text-xl font-semibold text-brand">{c.title}</h2>
            <p className="mt-3 text-bark/70">{c.text}</p>
          </article>
        ))}
      </div>
      <CtaBand />
    </main>
  );
}