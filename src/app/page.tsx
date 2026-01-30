import { Header } from "@/components/sections/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { DemoSection } from "@/components/sections/DemoSection";
import { BadgeShowcase } from "@/components/sections/BadgeShowcase";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { WaitlistSection } from "@/components/sections/WaitlistSection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <DemoSection />
        <BadgeShowcase />
        <TestimonialsSection />
        <WaitlistSection />
      </main>
      <Footer />
    </>
  );
}
