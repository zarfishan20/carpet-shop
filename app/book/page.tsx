import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import CalEmbed from "@/components/CalEmbed";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a free measure",
  description: `Book a free home measure with ${site.name}. Pick a time that suits you.`,
};

export default function Book() {
  return (
    <main>
      <PageHeader
        eyebrow="Free home measure"
        title="Book a measure"
        text="Choose a time and we'll visit, measure up and show you samples. No obligation."
      />
      <div className="mx-auto max-w-5xl px-6 py-12">
        <CalEmbed />
      </div>
    </main>
  );
}