import type { Metadata } from "next";

import { BUSINESS_PAGES, type BusinessSlug } from "@/content/business-pages";
import { ABOUT, CONTACT, PRINCIPALS, SKYLINE } from "@/content/company";

/**
 * The live address of the site, used for canonical links, the sitemap and structured data. Set
 * NEXT_PUBLIC_SITE_URL if the site is served anywhere other than baherangroup.com.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://baherangroup.com").replace(/\/$/, "");
export const SITE_NAME = "Baheran Trading PLC";

/**
 * Other names people search for. Baheran Trading PLC is the registered name; Baheran Group is only the
 * domain and email name, so it goes in structured data and never on the page as the company's name.
 */
export const BRAND_ALIASES = ["Baheran Trading", "Baheran", "Baheran Group"];

// The registered name first, then what the company does, so searches for any of its sectors match.
export const HOME_TITLE = "Baheran Trading PLC | Import, Export & Manufacturing in Ethiopia";
export const HOME_DESCRIPTION =
  "Baheran Trading PLC, Ethiopia: sesame and pulse export, machinery import, Tsehay Paints manufacturing, cargo transport, equipment rental and real estate.";

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export function absoluteUrl(path: string) {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

/**
 * Canonical link and social-share fields for one page. Open Graph is rebuilt in full for every page
 * because Next.js replaces, rather than merges, a parent's `openGraph` object.
 */
export function pageMetadata({ title, description, path }: { title?: string; description: string; path: string }): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : HOME_TITLE;
  return {
    title: title ?? { absolute: HOME_TITLE },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      title: fullTitle,
      description,
      url: path,
    },
  };
}

// The phone number in CONTACT is still a placeholder (all zeros). Keep it out of search engines until it is real.
const telephone = /^tel:\+2510+$/.test(CONTACT.phoneHref) ? undefined : CONTACT.phone;

/** The company and the website, given to search engines and AI assistants on every page. */
export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: SITE_NAME,
        legalName: SITE_NAME,
        alternateName: BRAND_ALIASES,
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/apple-icon.png`, width: 180, height: 180 },
        description: HOME_DESCRIPTION,
        foundingDate: "2009-10",
        foundingLocation: { "@type": "Place", name: "Addis Ababa, Ethiopia" },
        email: CONTACT.email,
        telephone,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Delta Complex, 10th floor, Maseltegna, Akaki Kaliti",
          addressLocality: "Addis Ababa",
          addressCountry: "ET",
        },
        contactPoint: { "@type": "ContactPoint", contactType: "customer service", email: CONTACT.email, telephone },
        memberOf: ABOUT.credentials
          .filter((item) => item.term === "Member of")
          .map((item) => ({ "@type": "Organization", name: item.detail })),
        areaServed: { "@type": "Country", name: "Ethiopia" },
        brand: { "@type": "Brand", name: "Tsehay Paints" },
        employee: PRINCIPALS.map((person) => ({
          "@type": "Person",
          name: person.name,
          jobTitle: person.role.replace(/ and shareholder$/, ""),
        })),
        knowsAbout: [
          "Import and export in Ethiopia",
          "Manufacturing in Ethiopia",
          "Sesame export",
          "Pulses and beans export",
          "Heavy machinery import",
          "Dry and bulk cargo transport",
          "Heavy equipment rental",
          "Paint manufacturing",
          "Commercial real estate",
        ],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: SITE_NAME,
        // Google picks the site name it shows in results from these.
        alternateName: BRAND_ALIASES,
        description: HOME_DESCRIPTION,
        publisher: { "@id": ORGANIZATION_ID },
        inLanguage: "en",
      },
    ],
  };
}

/** One business page: the page itself, what it offers, its place in the site and its questions and answers. */
export function businessJsonLd(slug: BusinessSlug) {
  const page = BUSINESS_PAGES[slug];
  const label = SKYLINE.find((item) => item.href === `#${slug}`)?.label ?? page.title;
  const url = absoluteUrl(`/${slug}`);
  const ids = { page: `${url}#webpage`, subject: `${url}#subject`, breadcrumb: `${url}#breadcrumb`, faq: `${url}#faq` };
  const { schema } = page;

  const subject =
    schema.type === "Service"
      ? {
          "@type": "Service",
          "@id": ids.subject,
          name: page.title,
          serviceType: schema.serviceType,
          description: page.description,
          url,
          provider: { "@id": ORGANIZATION_ID },
          areaServed: schema.areaServed && { "@type": "Country", name: schema.areaServed },
          brand: schema.brand && { "@type": "Brand", name: schema.brand },
        }
      : {
          "@type": "Place",
          "@id": ids.subject,
          name: schema.name,
          description: page.description,
          url,
          address: {
            "@type": "PostalAddress",
            streetAddress: schema.streetAddress,
            addressLocality: "Addis Ababa",
            addressCountry: "ET",
          },
        };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": ids.page,
        url,
        name: `${page.title} | ${SITE_NAME}`,
        description: page.description,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ids.subject },
        breadcrumb: { "@id": ids.breadcrumb },
        inLanguage: "en",
      },
      subject,
      {
        "@type": "BreadcrumbList",
        "@id": ids.breadcrumb,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: label, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": ids.faq,
        mainEntity: page.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };
}
