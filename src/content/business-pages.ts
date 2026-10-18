import { CONTACT, RENTAL_MACHINES } from "./company";

/** One page per business, at /<slug>. The slugs match the homepage section anchors (#export, …). */
export const BUSINESS_SLUGS = ["export", "import", "fleet", "rental", "paints", "real-estate"] as const;
export type BusinessSlug = (typeof BUSINESS_SLUGS)[number];

export type BusinessPage = {
  /** The <title> before " | Baheran Trading PLC": what people search for, about 40 characters at most. */
  title: string;
  /** Meta description. Under 160 characters, so search results show it whole. */
  description: string;
  /** Page headline; `accent` is the phrase shown in brand blue. */
  heading: { lead: string; accent: string };
  intro: string;
  /** Key figures on the navy card beside the headline. */
  facts: { value: string; label: string }[];
  /**
   * Shown on the page and given to search engines and AI assistants as FAQPage data. Answers use only
   * facts from the company profile.
   */
  faqs: { question: string; answer: string }[];
  /** How the page is described in schema.org data: a service Baheran provides, or a place it owns. */
  schema:
    | { type: "Service"; serviceType: string; areaServed?: string; brand?: string }
    | { type: "Place"; name: string; streetAddress: string };
};

const rentalMachines = [...RENTAL_MACHINES.map((machine) => machine.name.toLowerCase()), "excavators", "dump trucks"];

/** "a, b and c" */
function listOf(items: string[]) {
  return items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;
}

export const BUSINESS_PAGES: Record<BusinessSlug, BusinessPage> = {
  export: {
    title: "Ethiopian Sesame and Pulses Exporter",
    description:
      "Baheran Trading PLC exports Ethiopian white sesame, niger seed, chickpeas, mung beans, soybeans and other beans, cleaned at our own certified plant.",
    heading: { lead: "Ethiopian sesame and pulses,", accent: "cleaned and exported" },
    intro:
      "Baheran Trading PLC has exported Ethiopian oilseeds and pulses since October 2009. Sesame is cleaned and processed at our own plant, certified by the Ethiopian Standardization and Quality Authority, before it ships to buyers abroad.",
    facts: [
      { value: "8", label: "Export commodities, led by sesame" },
      { value: "2009", label: "Exporting since October 2009" },
      { value: "ECX", label: "Member of the Ethiopian Commodity Exchange" },
    ],
    faqs: [
      {
        question: "What does Baheran Trading export?",
        answer:
          "Eight Ethiopian commodities, led by sesame, peas and beans. They include white sesame, niger seed, chickpeas, mung beans, white pea beans, red kidney beans and soybeans.",
      },
      {
        question: "Is the sesame cleaned before export?",
        answer:
          "Yes. We clean and process sesame at our own plant before it ships. The Ethiopian Standardization and Quality Authority certifies Baheran to clean and process sesame seeds.",
      },
      {
        question: "Is Baheran licensed to export?",
        answer:
          "Yes. The Ministry of Trade licenses Baheran Trading PLC for export and import trade. We are a member of the Ethiopian Commodity Exchange (ECX) and of the Addis Ababa Chamber of Commerce and Sectoral Association.",
      },
      {
        question: "How do I buy sesame or pulses from Baheran?",
        answer: `Email ${CONTACT.email} and tell us which commodity you need. Our deputy general manager, Dessie Alemu, looks after export sales to international buyers.`,
      },
    ],
    schema: { type: "Service", serviceType: "Export of sesame, pulses and beans" },
  },

  import: {
    title: "Heavy Machinery Importer in Ethiopia",
    description:
      "Baheran Trading PLC imports heavy-duty construction machinery, motor vehicles, tyres, reinforcement steel and industrial chemicals into Ethiopia.",
    heading: { lead: "Heavy machinery and vehicles,", accent: "imported into Ethiopia" },
    intro:
      "Licensed by the Ministry of Trade, Baheran Trading PLC imports and distributes heavy-duty construction machinery, pickups and commercial trucks, tyres, reinforcement steel and industrial chemicals. Our import portfolio covers 15 products.",
    facts: [
      { value: "15", label: "Products in our import portfolio" },
      { value: "5", label: "Product lines, from loaders to chemicals" },
      { value: "2009", label: "Company founded in Addis Ababa" },
    ],
    faqs: [
      {
        question: "What does Baheran Trading import?",
        answer:
          "Heavy-duty machinery, motor vehicles, tyres, reinforcement steel and industrial chemicals: 15 products in all. We are best known for heavy-duty construction machinery.",
      },
      {
        question: "Which machinery and vehicles does Baheran import?",
        answer:
          "Heavy-duty construction machinery such as wheel loaders, cranes and dump trucks, and motor vehicles such as pickups and commercial trucks.",
      },
      {
        question: "Can I rent machinery instead of buying it?",
        answer: `Yes. Our equipment rental business rents ${listOf(rentalMachines)} to the construction sector.`,
      },
      {
        question: "How do I make an import enquiry?",
        answer: `Email ${CONTACT.email} with the product you need.`,
      },
    ],
    schema: {
      type: "Service",
      serviceType: "Import of heavy machinery, vehicles and construction materials",
      areaServed: "Ethiopia",
    },
  },

  fleet: {
    title: "Dry and Bulk Cargo Transport in Ethiopia",
    description:
      "Baheran Trading PLC moves dry and bulk cargo in Ethiopia with its own fleet of 80 trucks, including dump trucks, tipper trucks and heavy-duty trucks.",
    heading: { lead: "Cargo transport by our own", accent: "fleet of 80 trucks" },
    intro:
      "Baheran Trading PLC runs a transport service for dry and bulk cargo with 80 trucks of its own: dump trucks, tipper trucks and heavy-duty trucks. Our general manager, Hibret Shitahun, brings deep experience in fleet management and trucking.",
    facts: [
      { value: "80", label: "Trucks in our own cargo fleet" },
      { value: "3", label: "Kinds of truck: dump, tipper and heavy-duty" },
      { value: "20", label: "Years in business for our general manager" },
    ],
    faqs: [
      {
        question: "How many trucks does Baheran have?",
        answer: "80 trucks of our own, including dump trucks, tipper trucks and heavy-duty trucks.",
      },
      {
        question: "What cargo does the fleet carry?",
        answer: "Dry and bulk cargo, carried on trucks we own.",
      },
      {
        question: "How do I book cargo transport?",
        answer: `Email ${CONTACT.email} and tell us what you need to move.`,
      },
    ],
    schema: { type: "Service", serviceType: "Dry and bulk cargo transport", areaServed: "Ethiopia" },
  },

  rental: {
    title: "Heavy Equipment Rental in Ethiopia",
    description:
      "Rent mobile cranes, motor graders, wheel loaders, bulldozers, road rollers, excavators and dump trucks from Baheran Trading PLC in Ethiopia.",
    heading: { lead: "Heavy construction equipment,", accent: "for rent" },
    intro: `Baheran Trading PLC rents heavy-duty machines to the construction sector: ${listOf(rentalMachines)}.`,
    facts: [
      { value: String(rentalMachines.length), label: "Kinds of machine to rent" },
      { value: "15", label: "Products we also import, led by heavy machinery" },
      { value: "2009", label: "Company founded in Addis Ababa" },
    ],
    faqs: [
      {
        question: "What equipment can I rent from Baheran?",
        answer: `${listOf(rentalMachines).replace(/^./, (c) => c.toUpperCase())}.`,
      },
      {
        question: "Who does Baheran rent equipment to?",
        answer:
          "The construction sector. Our machines lift heavy loads, level road beds, load soil and gravel, clear ground and compact soil and fresh asphalt.",
      },
      {
        question: "How do I rent a machine?",
        answer: `Email ${CONTACT.email} with the machine you need. Each machine on this page also has its own enquiry link.`,
      },
    ],
    schema: { type: "Service", serviceType: "Heavy construction equipment rental", areaServed: "Ethiopia" },
  },

  paints: {
    title: "Tsehay Paints: Paint Manufacturer in Ethiopia",
    description:
      "Tsehay Paints, made at Baheran Trading PLC's paint factory in Ethiopia: 500+ kinds of emulsion, plastic and enamel paint, up to 10 million litres a year.",
    heading: { lead: "Paints and wall coatings,", accent: "made in Ethiopia" },
    intro:
      "Tsehay Paints Factory, owned by Baheran Trading PLC, makes more than 500 kinds of paint and paint-related products, up to 10 million litres a year, for households, large construction companies and real estate developers.",
    facts: [
      { value: "500+", label: "Kinds of paint and paint-related products" },
      { value: "10M", label: "Litres of paint a year, at full capacity" },
      { value: "UKAS", label: "Accredited product certification, with ISOQAR registration" },
    ],
    faqs: [
      {
        question: "Who makes Tsehay Paints?",
        answer: "Tsehay Paints Factory, which is owned by Baheran Trading PLC.",
      },
      {
        question: "What products does Tsehay make?",
        answer:
          "More than 500 kinds of paint and paint-related products. They include Tsehay Super emulsion paint, Super emulsion and plastic paint, Fana ceiling paint, Quartz textured wall paint, Enamel synthetic paint and Glue super adhesive.",
      },
      {
        question: "How much paint can the factory make?",
        answer: "Up to 10 million litres a year.",
      },
      {
        question: "Are Tsehay Paints certified?",
        answer: "Yes. Tsehay products carry ISOQAR registration and UKAS-accredited product certification.",
      },
      {
        question: "Who can order Tsehay Paints?",
        answer: `Households, large construction companies and real estate developers all buy Tsehay. To order, email ${CONTACT.email}.`,
      },
    ],
    schema: { type: "Service", serviceType: "Paint manufacturing", areaServed: "Ethiopia", brand: "Tsehay Paints" },
  },

  "real-estate": {
    title: "Eyor Tower: Commercial Real Estate in Addis Ababa",
    description:
      "Eyor Tower is Baheran Trading PLC's newly completed commercial building on Churchill Road at Tewodros Square, in the centre of Addis Ababa.",
    heading: { lead: "Commercial real estate in", accent: "central Addis Ababa" },
    intro:
      "Baheran Trading PLC owns Eyor Tower, a newly completed commercial building on Churchill Road at Tewodros Square, in the centre of Addis Ababa.",
    facts: [
      { value: "Eyor Tower", label: "Our newly completed commercial building" },
      { value: "Churchill Road", label: "At Tewodros Square, in the centre of Addis Ababa" },
    ],
    faqs: [
      {
        question: "Where is Eyor Tower?",
        answer: "On Churchill Road at Tewodros Square, in the centre of Addis Ababa, Ethiopia.",
      },
      {
        question: "Who owns Eyor Tower?",
        answer: "Baheran Trading PLC, as part of its real estate development business.",
      },
      {
        question: "How can I ask about Eyor Tower?",
        answer: `Email ${CONTACT.email} with the subject "Eyor Tower enquiry".`,
      },
    ],
    schema: { type: "Place", name: "Eyor Tower", streetAddress: "Churchill Road, Tewodros Square" },
  },
};
