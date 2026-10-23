import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import CtaBand from "@/components/home/CtaBand";

export const metadata: Metadata = { title: "Team" };

// Replace with your real team.
const team = [
  { name: "Name", role: "Role", bio: "A line or two about them and their experience." },
  { name: "Name", role: "Role", bio: "A line or two about them and their experience." },
  { name: "Name", role: "Role", bio: "A line or two about them and their experience." },
];

export default function Team() {
  return (
    <main>
      <PageHeader
        eyebrow="Our team"
        title="Meet the team"
        text="The people who will measure, supply and fit your floor."
      />
      <div className="mx-auto grid max-w-7xl gap-5 px-6 py-14 md:grid-cols-3">
        {team.map((m, i) => (
          <div key={i} className="rounded-md border border-bark/10 bg-white p-7 shadow-sm">
            <div className="h-40 rounded-sm bg-sand" />
            <h2 className="mt-4 text-xl font-semibold text-brand">{m.name}</h2>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-ember">
              {m.role}
            </p>
            <p className="mt-3 text-bark/70">{m.bio}</p>
          </div>
        ))}
      </div>
      <CtaBand />
    </main>
  );
}