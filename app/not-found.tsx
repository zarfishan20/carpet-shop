import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-28 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ember">
        404
      </p>
      <h1 className="mt-3 text-4xl font-bold text-brand">Page not found</h1>
      <p className="mt-4 text-bark/70">
        Sorry, we couldn&apos;t find that page. It may have moved.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/" className="rounded-sm bg-ember px-7 py-3.5 font-semibold text-white">
          Home
        </Link>
        <Link href="/products" className="rounded-sm border-2 border-brand px-7 py-3.5 font-semibold text-brand">
          Products
        </Link>
      </div>
    </main>
  );
}