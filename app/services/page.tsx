import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Services from "@/components/home/Services";
import CtaBand from "@/components/home/CtaBand";

export const metadata: Metadata = {
  title: "Services",
  description: "Carpet, vinyl, laminate, LVT and engineered wood, supplied and fitted.",
};

export default function ServicesPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Services"
        title="What we supply and fit"
        text="Measured, supplied and fitted by our own team."
      />
      <Services />
      <CtaBand />
    </main>
  );
}