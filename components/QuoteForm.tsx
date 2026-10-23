"use client";

import { useActionState } from "react";
import Link from "next/link";
import { sendQuote, type FormState } from "@/app/request-a-quote/actions";
import { site } from "@/lib/site";

const initial: FormState = { status: "idle" };

const input =
  "w-full rounded-sm border border-bark/20 bg-white px-4 py-3 text-bark outline-none focus:border-ember focus:ring-2 focus:ring-ember/20";
const label = "mb-1 block text-sm font-medium";

const flooringTypes = [
  "Carpet",
  "Vinyl",
  "LVT",
  "Laminate",
  "Engineered wood",
  "Rugs and runners",
  "Not sure yet",
];

function Group({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="grid gap-4">
      <legend className="mb-1 text-sm font-semibold uppercase tracking-[0.2em] text-ember">
        {title}
      </legend>
      {children}
    </fieldset>
  );
}

export default function QuoteForm({ product = "" }: { product?: string }) {
  const [state, action, pending] = useActionState(sendQuote, initial);

  if (state.status === "success") {
    return (
      <div className="rounded-md border border-bark/10 bg-white p-8 md:p-10">
        <h2 className="text-3xl font-bold text-brand">Thank you</h2>
        <p className="mt-3 text-bark/75">
          We&apos;ve received your request and will be in touch shortly to
          arrange your free measure and written quote.
        </p>
        <p className="mt-3 text-bark/75">
          Need us sooner? Call{" "}
          <a
            href={`tel:${site.phone.replace(/\s/g, "")}`}
            className="font-semibold text-brand underline"
          >
            {site.phone}
          </a>
          .
        </p>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-sm bg-ember px-7 py-3.5 font-semibold text-white"
        >
          Keep browsing
        </Link>
      </div>
    );
  }

  return (
    <form
      action={action}
      className="grid gap-9 rounded-md border border-bark/10 bg-white p-8 md:p-10"
    >
      <input type="hidden" name="product" value={product} />

      <Group title="1. Your details">
        <div>
          <label htmlFor="firstname" className={label}>Full name *</label>
          <input id="firstname" name="firstname" required autoComplete="name" className={input} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className={label}>Email *</label>
            <input id="email" name="email" type="email" required autoComplete="email" className={input} />
          </div>
          <div>
            <label htmlFor="phone" className={label}>Phone *</label>
            <input id="phone" name="phone" type="tel" required autoComplete="tel" className={input} />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="postcode" className={label}>Postcode *</label>
            <input id="postcode" name="postcode" required autoComplete="postal-code" className={input} />
          </div>
          <div>
            <label htmlFor="property" className={label}>Property type</label>
            <select id="property" name="property" defaultValue="" className={input}>
              <option value="">Select…</option>
              <option>Home</option>
              <option>Rental property (landlord)</option>
              <option>Commercial</option>
            </select>
          </div>
        </div>
      </Group>

      <Group title="2. Your project">
        <div>
          <p className={label}>What flooring are you looking for?</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {flooringTypes.map((t) => (
              <label key={t} className="flex items-center gap-2 text-bark/80">
                <input
                  type="checkbox"
                  name="flooring"
                  value={t}
                  className="h-4 w-4 accent-ember"
                />
                {t}
              </label>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="rooms" className={label}>Rooms or areas</label>
            <input id="rooms" name="rooms" placeholder="e.g. lounge, stairs, 2 bedrooms" className={input} />
          </div>
          <div>
            <label htmlFor="size" className={label}>Approx. size (m²)</label>
            <input id="size" name="size" inputMode="decimal" placeholder="Not sure? Leave blank" className={input} />
          </div>
        </div>

        <div>
          <p className={label}>Do you need old flooring removed?</p>
          <div className="flex flex-wrap gap-5 text-bark/80">
            {["Yes", "No", "Not sure"].map((o) => (
              <label key={o} className="flex items-center gap-2">
                <input type="radio" name="removal" value={o} className="h-4 w-4 accent-ember" />
                {o}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="timeline" className={label}>When do you need it?</label>
          <select id="timeline" name="timeline" defaultValue="" className={input}>
            <option value="">Select…</option>
            <option>As soon as possible</option>
            <option>Within 2 weeks</option>
            <option>Within a month</option>
            <option>Just researching</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className={label}>Anything else we should know?</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            defaultValue={product ? `I'm interested in ${product}.` : ""}
            className={input}
          />
        </div>
      </Group>

      <Group title="3. How should we reach you?">
        <div className="flex flex-wrap gap-5 text-bark/80">
          {["Phone call", "Email", "WhatsApp"].map((o, i) => (
            <label key={o} className="flex items-center gap-2">
              <input
                type="radio"
                name="contactMethod"
                value={o}
                defaultChecked={i === 0}
                className="h-4 w-4 accent-ember"
              />
              {o}
            </label>
          ))}
        </div>

        <label className="flex items-start gap-2 text-sm text-bark/75">
          <input type="checkbox" name="consent" className="mt-1 h-4 w-4 accent-ember" />
          <span>
            I agree that {site.name} can contact me about my enquiry. *
          </span>
        </label>
      </Group>

      {/* Spam trap */}
      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      {state.status === "error" && (
        <p role="alert" className="text-sm font-medium text-red-700">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-sm bg-ember px-8 py-4 text-lg font-semibold text-white hover:brightness-95 disabled:opacity-60"
      >
        {pending ? "Sending…" : "Request my free quote"}
      </button>
    </form>
  );
}