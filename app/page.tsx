import Hero from "@/components/home/Hero";
import Featured from "@/components/home/Featured";
import Services from "@/components/home/Services";
import WhyUs from "@/components/home/WhyUs";
import Suppliers from "@/components/home/Suppliers";
import Reviews from "@/components/home/Reviews";
import CtaBand from "@/components/home/CtaBand";

export default function Home() {
  return (
    <main>
      <Hero />
      <Featured />
      <Services />
      <WhyUs />
      <Suppliers />
      <Reviews />
      <CtaBand />
    </main>
  );
}