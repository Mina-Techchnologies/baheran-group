import { BUSINESS_PAGES, type BusinessSlug } from "@/content/business-pages";
import { businessJsonLd, pageMetadata } from "@/lib/seo";
import { BusinessFaq } from "./BusinessFaq";
import { BusinessIntro } from "./BusinessIntro";
import { ContactSection } from "./ContactSection";
import { JsonLd } from "./JsonLd";
import { MoreBusinesses } from "./MoreBusinesses";
import { RevealObserver } from "./RevealObserver";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { SkipLink } from "./SkipLink";
import { ExportSection } from "./sections/ExportSection";
import { FleetSection } from "./sections/FleetSection";
import { ImportSection } from "./sections/ImportSection";
import { PaintsSection } from "./sections/PaintsSection";
import { RealEstateSection } from "./sections/RealEstateSection";
import { RentalSection } from "./sections/RentalSection";

/** The homepage section for each business, reused as the body of its own page. */
const SECTIONS: Record<BusinessSlug, () => React.ReactNode> = {
  export: ExportSection,
  import: ImportSection,
  fleet: FleetSection,
  rental: RentalSection,
  paints: PaintsSection,
  "real-estate": RealEstateSection,
};

export function businessMetadata(slug: BusinessSlug) {
  const page = BUSINESS_PAGES[slug];
  return pageMetadata({ title: page.title, description: page.description, path: `/${slug}` });
}

/**
 * One business's own page (/export, /paints, …): an introduction with its key figures, the same
 * section as on the homepage, common questions, links to the other businesses and the contact form.
 */
export function BusinessPage({ slug }: { slug: BusinessSlug }) {
  const Section = SECTIONS[slug];

  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main id="main">
        <BusinessIntro slug={slug} />
        <Section />
        <div className="section-pad border-t border-line">
          <div className="wrap">
            <BusinessFaq slug={slug} />
            <MoreBusinesses current={slug} />
          </div>
        </div>
        <ContactSection topic={slug} />
      </main>
      <SiteFooter />
      <RevealObserver />
      <JsonLd data={businessJsonLd(slug)} />
    </>
  );
}
