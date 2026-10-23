type Props = {
  eyebrow: string;
  title: string;
  text?: string;
  children?: React.ReactNode;
};

export default function PageHeader({ eyebrow, title, text, children }: Props) {
  return (
    <section className="border-b border-bark/10 bg-sand">
      <div className="mx-auto max-w-7xl px-6 py-14">
        {children}
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ember">
          {eyebrow}
        </p>
        <h1 className="mt-3 text-4xl font-bold text-brand md:text-5xl">
          {title}
        </h1>
        {text && <p className="mt-4 max-w-2xl text-lg text-bark/70">{text}</p>}
      </div>
    </section>
  );
}