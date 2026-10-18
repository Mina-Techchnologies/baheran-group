import { CompanySection } from "@/components/CompanySection";
import { ContactSection } from "@/components/ContactSection";
import { Hero } from "@/components/Hero";
import { LeadershipSection } from "@/components/LeadershipSection";
import { RevealObserver } from "@/components/RevealObserver";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { ExportSection } from "@/components/sections/ExportSection";
import { FleetSection } from "@/components/sections/FleetSection";
import { ImportSection } from "@/components/sections/ImportSection";
import { PaintsSection } from "@/components/sections/PaintsSection";
import { RealEstateSection } from "@/components/sections/RealEstateSection";
import { RentalSection } from "@/components/sections/RentalSection";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-primary px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <CompanySection />
        {/* The six businesses, in the same order as the hero skyline. */}
        <ExportSection />
        <ImportSection />
        <FleetSection />
        <RentalSection />
        <PaintsSection />
        <RealEstateSection />
        <LeadershipSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <RevealObserver />
    </>
  );
}
