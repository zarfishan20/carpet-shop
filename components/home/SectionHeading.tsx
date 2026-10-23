type Props = {
  eyebrow: string;
  title: string;
  text?: string;
};

export default function SectionHeading({ eyebrow, title, text }: Props) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ember">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-4xl font-bold text-brand">{title}</h2>
      {text && <p className="mt-3 max-w-2xl text-bark/70">{text}</p>}
    </div>
  );
}