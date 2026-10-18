import { CompanySection } from "@/components/CompanySection";
import { ContactSection } from "@/components/ContactSection";
import { Hero } from "@/components/Hero";
import { LeadershipSection } from "@/components/LeadershipSection";
import { RevealObserver } from "@/components/RevealObserver";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SkipLink } from "@/components/SkipLink";
import { ExportSection } from "@/components/sections/ExportSection";
import { FleetSection } from "@/components/sections/FleetSection";
import { ImportSection } from "@/components/sections/ImportSection";
import { PaintsSection } from "@/components/sections/PaintsSection";
import { RealEstateSection } from "@/components/sections/RealEstateSection";
import { RentalSection } from "@/components/sections/RentalSection";
import { HOME_DESCRIPTION, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ description: HOME_DESCRIPTION, path: "/" });

export default function Home() {
  return (
    <>
      <SkipLink />
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
