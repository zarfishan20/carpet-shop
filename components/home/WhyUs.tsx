import SectionHeading from "./SectionHeading";

const reasons = [
  {
    title: "Free consultation",
    text: "Our specialists help you choose the right floor for each room.",
  },
  {
    title: "Free measurement",
    text: "We visit, measure and estimate at no cost, so you know the exact price.",
  },
  {
    title: "Expert fitting",
    text: "Experienced fitters who leave your home clean and tidy.",
  },
];

export default function WhyUs() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <SectionHeading
        eyebrow="Why choose us"
        title="Quality results for your home"
      />
      <div className="mt-10 grid gap-8 md:grid-cols-3">
        {reasons.map((r, i) => (
          <div key={r.title} className="border-t-2 border-gold pt-5">
            <p className="font-display text-2xl font-bold text-gold">
              0{i + 1}
            </p>
            <h3 className="mt-2 text-xl font-semibold text-brand">{r.title}</h3>
            <p className="mt-2 text-bark/70">{r.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}