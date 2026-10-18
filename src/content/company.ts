import type { StaticImageData } from "next/image";

import chickpeas from "@/assets/images/export/chickpeas.jpg";
import cleaningPlant from "@/assets/images/export/cleaning-plant.jpg";
import mungBeans from "@/assets/images/export/mung-beans.jpg";
import nigerSeed from "@/assets/images/export/niger-seed.jpg";
import redKidneyBeans from "@/assets/images/export/red-kidney-beans.jpg";
import soybeans from "@/assets/images/export/soybeans.jpg";
import whitePeaBeans from "@/assets/images/export/white-pea-beans.jpg";
import whiteSesame from "@/assets/images/export/white-sesame.jpg";
import dumpTrucks from "@/assets/images/fleet/dump-trucks.jpg";
import heavyTruck from "@/assets/images/fleet/heavy-truck.jpg";
import tipperTrucks from "@/assets/images/fleet/tipper-trucks.jpg";
import pickup from "@/assets/images/import/pickup.jpg";
import rebar from "@/assets/images/import/rebar.jpg";
import tyre from "@/assets/images/import/tyre.jpg";
import importLoader from "@/assets/images/import/wheel-loader.jpg";
import certifications from "@/assets/images/paints/certifications.jpg";
import enamel from "@/assets/images/paints/enamel.jpg";
import fana from "@/assets/images/paints/fana.jpg";
import glue from "@/assets/images/paints/glue.jpg";
import quartz from "@/assets/images/paints/quartz.jpg";
import superEmulsion from "@/assets/images/paints/super-emulsion.jpg";
import superPlastic from "@/assets/images/paints/super-plastic.jpg";
import eyorTower from "@/assets/images/realestate/eyor-tower.jpg";
import bulldozers from "@/assets/images/rental/bulldozers.jpg";
import mobileCrane from "@/assets/images/rental/mobile-crane.jpg";
import motorGrader from "@/assets/images/rental/motor-grader.jpg";
import roadRoller from "@/assets/images/rental/road-roller.jpg";
import rentalLoader from "@/assets/images/rental/wheel-loader.jpg";

export type Photo = {
  src: StaticImageData;
  alt: string;
  /** CSS object-position used when the photo is cropped to fit a frame. */
  focus?: string;
};

// TODO: the phone number is still a placeholder. Replace it with the real one before going live.
export const CONTACT = {
  email: "support@baherangroup.com",
  phone: "+251 00 000 0000",
  phoneHref: "tel:+251000000000",
  addressLines: ["Maseltegna, Akaki Kaliti", "Delta Complex, 10th floor", "Addis Ababa, Ethiopia"],
};

export function mailto(subject: string) {
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}`;
}

/** `businesses` marks the item that opens the submenu of the six businesses in the header. */
export const NAV: { href: string; label: string; businesses?: boolean }[] = [
  { href: "#export", label: "Businesses", businesses: true },
  { href: "#company", label: "Company" },
  { href: "#leadership", label: "Leadership" },
];

/**
 * The six businesses, ordered from the field to the skyline. `photo` is the small thumbnail;
 * `feature` is the large hero showcase photo, picked to suit a wide frame. Portrait features are
 * shown whole on a blurred copy of themselves rather than cropped.
 */
export const SKYLINE: {
  href: string;
  label: string;
  summary: string;
  photo: Photo;
  feature: Photo & { portrait?: boolean };
}[] = [
  {
    href: "#export",
    label: "Export",
    summary: "Sesame, pulses and beans, cleaned at our own plant",
    photo: { src: whiteSesame, alt: "Ethiopian white sesame seed in a basket", focus: "55% 50%" },
    feature: { src: cleaningPlant, alt: "Inside Baheran Trading PLC's grain cleaning plant in Ethiopia, with sacks stacked ready for export" },
  },
  {
    href: "#import",
    label: "Import",
    summary: "Heavy machinery, vehicles, tyres, steel and chemicals",
    photo: { src: importLoader, alt: "Yellow wheel loaders, heavy machinery imported into Ethiopia", focus: "62% 50%" },
    feature: { src: importLoader, alt: "Row of new yellow wheel loaders: heavy machinery that Baheran Trading PLC imports into Ethiopia" },
  },
  {
    href: "#fleet",
    label: "Fleet",
    summary: "80 trucks moving dry and bulk cargo",
    photo: { src: heavyTruck, alt: "Front of a yellow heavy-duty cargo truck", focus: "50% 50%" },
    feature: { src: dumpTrucks, alt: "Orange dump trucks from Baheran Trading PLC's 80-truck cargo fleet, parked in a row" },
  },
  {
    href: "#rental",
    label: "Rental",
    summary: "Cranes, graders, loaders and more for construction",
    photo: { src: mobileCrane, alt: "Yellow mobile crane for rent in Ethiopia", focus: "48% 50%" },
    feature: { src: mobileCrane, alt: "Yellow truck-mounted mobile crane, available to rent from Baheran Trading PLC in Ethiopia" },
  },
  {
    href: "#paints",
    label: "Paints",
    summary: "Tsehay Paints, 500+ kinds made in our factory",
    photo: { src: superEmulsion, alt: "Bucket of Tsehay Super emulsion paint, made in Ethiopia", focus: "50% 50%" },
    feature: { src: superEmulsion, alt: "Bucket of Tsehay Super emulsion paint, made by Baheran Trading PLC at its paint factory in Ethiopia", portrait: true },
  },
  {
    href: "#real-estate",
    label: "Real estate",
    summary: "Eyor Tower on Churchill Road, Addis Ababa",
    photo: { src: eyorTower, alt: "Eyor Tower, a commercial building in Addis Ababa", focus: "50% 30%" },
    feature: { src: eyorTower, alt: "Eyor Tower, Baheran Trading PLC's glass commercial building on Churchill Road, Addis Ababa", portrait: true },
  },
];

/** Key figures from the company profile, shown on the stats card under the hero. */
export const HERO_STATS: { value: string; label: string }[] = [
  { value: "8", label: "Export commodities, led by sesame" },
  { value: "15", label: "Products in our import portfolio" },
  { value: "80", label: "Trucks in our own cargo fleet" },
  { value: "500+", label: "Kinds of Tsehay paint" },
];

/** Registration facts from the company profile, laid out as tiles in the About section. */
export const ABOUT = {
  founded: { year: "2009", detail: "Founded in October 2009 in Addis Ababa" },
  legalForm: "Private limited company (PLC), incorporated under the Ethiopian Commercial Code",
  /** Paid-up capital in ETB. */
  capital: { atFounding: 5_000_000, now: 211_844_000 },
  credentials: [
    { id: "trade", term: "Licensed by", detail: "Ministry of Trade, for import and export" },
    {
      id: "esqa",
      term: "Certified by",
      detail: "Ethiopian Standardization and Quality Authority, for cleaning and processing sesame",
    },
    { id: "ecx", term: "Member of", detail: "Ethiopian Commodity Exchange (ECX)" },
    { id: "chamber", term: "Member of", detail: "Addis Ababa Chamber of Commerce and Sectoral Association" },
  ],
  startPhoto: {
    src: whiteSesame,
    alt: "Ethiopian white sesame in a woven basket, from Baheran Trading PLC's grain and oilseed export business",
    focus: "50% 50%",
  } satisfies Photo,
};

export const COMMODITIES: { name: string; photo: Photo }[] = [
  { name: "White sesame", photo: { src: whiteSesame, alt: "Ethiopian white sesame seed in a woven basket, Baheran Trading PLC's leading export" } },
  { name: "Niger seed", photo: { src: nigerSeed, alt: "Close-up of black Ethiopian niger seed for export" } },
  { name: "Chickpeas", photo: { src: chickpeas, alt: "Ethiopian chickpeas in a scoop, ready for export", focus: "45% 50%" } },
  { name: "Mung beans", photo: { src: mungBeans, alt: "Green mung beans in a white bowl, a pulse exported from Ethiopia", focus: "62% 50%" } },
  { name: "White pea beans", photo: { src: whitePeaBeans, alt: "White pea beans in a wooden spoon, exported from Ethiopia" } },
  { name: "Red kidney beans", photo: { src: redKidneyBeans, alt: "Close-up of red kidney beans exported from Ethiopia" } },
  { name: "Soybeans", photo: { src: soybeans, alt: "Close-up of Ethiopian soybeans for export" } },
];

export const CLEANING_PLANT: Photo = {
  src: cleaningPlant,
  alt: "Baheran Trading PLC's sesame cleaning plant in Ethiopia: cleaning machines, a storage hopper and stacked red sacks",
};

export const IMPORT_LINES: { name: string; note?: string }[] = [
  { name: "Heavy-duty machinery", note: "Loaders, cranes and dump trucks for construction" },
  { name: "Motor vehicles", note: "Pickups and commercial trucks" },
  { name: "Tyres", note: "For trucks and heavy machinery" },
  { name: "Reinforcement steel", note: "Rebar for building and civil works" },
  { name: "Industrial chemicals" },
];

export const IMPORT_PHOTOS: Record<"loader" | "pickup" | "tyre" | "rebar", Photo> = {
  loader: { src: importLoader, alt: "Row of yellow wheel loaders: construction machinery that Baheran Trading PLC imports into Ethiopia", focus: "60% 50%" },
  pickup: { src: pickup, alt: "Blue double-cab pickup truck, one of the motor vehicles imported into Ethiopia", focus: "55% 60%" },
  tyre: { src: tyre, alt: "Heavy truck tyre with a deep tread, imported for trucks and heavy machinery in Ethiopia" },
  rebar: { src: rebar, alt: "Close-up of ribbed reinforcement steel bars, imported for building and civil works in Ethiopia", focus: "50% 40%" },
};

export const FLEET_PHOTOS: Record<"dumpTrucks" | "tippers" | "heavyTruck", Photo> = {
  dumpTrucks: { src: dumpTrucks, alt: "Three orange dump trucks from Baheran Trading PLC's cargo fleet, parked in a row" },
  tippers: { src: tipperTrucks, alt: "Row of white eight-wheel tipper trucks for bulk cargo transport in Ethiopia", focus: "35% 50%" },
  heavyTruck: { src: heavyTruck, alt: "Yellow heavy-duty cargo truck seen from the front, part of the fleet for dry cargo", focus: "50% 45%" },
};

export const RENTAL_MACHINES: { name: string; use: string; photo: Photo }[] = [
  {
    name: "Mobile cranes",
    use: "Lifting and placing heavy loads on site",
    photo: { src: mobileCrane, alt: "Yellow truck-mounted mobile crane on a dirt site, for rent from Baheran Trading PLC" },
  },
  {
    name: "Motor graders",
    use: "Levelling and shaping road beds",
    photo: { src: motorGrader, alt: "Yellow motor grader for rent in Ethiopia, parked on a gravel yard" },
  },
  {
    name: "Wheel loaders",
    use: "Loading soil, gravel and aggregate",
    photo: { src: rentalLoader, alt: "Red wheel loader with its bucket raised, available to rent for construction", focus: "50% 45%" },
  },
  {
    name: "Bulldozers",
    use: "Clearing ground and pushing earth",
    photo: { src: bulldozers, alt: "Row of yellow crawler bulldozers for heavy equipment rental in Ethiopia" },
  },
  {
    name: "Road rollers",
    use: "Compacting soil and fresh asphalt",
    photo: { src: roadRoller, alt: "Road roller compacting fresh asphalt; road rollers are among the machines for rent", focus: "45% 50%" },
  },
];

export const PAINTS: { name: string; kind: string; photo: Photo }[] = [
  { name: "Tsehay Super", kind: "Emulsion paint", photo: { src: superEmulsion, alt: "Bucket of Tsehay Super emulsion paint, made in Ethiopia by Baheran Trading PLC" } },
  { name: "Tsehay Super", kind: "Emulsion and plastic paint", photo: { src: superPlastic, alt: "Bucket of Tsehay Super emulsion and plastic paint from the Tsehay Paints factory" } },
  { name: "Tsehay Fana", kind: "Ceiling paint", photo: { src: fana, alt: "Bucket of Tsehay Fana ceiling paint, made in Ethiopia" } },
  { name: "Tsehay Quartz", kind: "Textured emulsion wall paint", photo: { src: quartz, alt: "Bucket of Tsehay Quartz textured wall paint, made in Ethiopia" } },
  { name: "Tsehay Enamel", kind: "Synthetic enamel paint", photo: { src: enamel, alt: "Tin of Tsehay Enamel synthetic enamel paint by Tsehay Paints" } },
  { name: "Tsehay Glue", kind: "Super adhesive", photo: { src: glue, alt: "Bucket of Tsehay Glue super adhesive by Tsehay Paints" } },
];

export const PAINT_CERTIFICATIONS: Photo = {
  src: certifications,
  alt: "ISOQAR Registered and UKAS Product Certification 0026 marks carried by Tsehay Paints products",
};

export const EYOR_TOWER: Photo = {
  src: eyorTower,
  alt: "Eyor Tower, Baheran Trading PLC's glass-fronted commercial building on Churchill Road at Tewodros Square, Addis Ababa",
};

export const PRINCIPALS: { name: string; role: string; bio: string }[] = [
  {
    name: "Abebe Alemu",
    role: "Managing Director and shareholder",
    bio: "Ato Abebe runs the whole organisation. He traded cereals, oilseeds and pulses for fifteen years, managing his own firm, Marie Shitahun Import & Export, before starting Baheran's export business in October 2009. He still takes an active part in management and export.",
  },
  {
    name: "Hibret Shitahun",
    role: "General Manager and shareholder",
    bio: "Ato Hibret brings twenty years in business, with deep experience in fleet management, trucking operations and customer relationships.",
  },
  {
    name: "Dessie Alemu",
    role: "Deputy General Manager and shareholder",
    bio: "Ato Dessie spent sixteen years in banking in a range of management roles. He looks after the company's banking, risk and loan services, export sales to international buyers and international correspondence.",
  },
];

export type Executive = {
  name: string;
  position: string;
  education: string[];
  /** Null where the company profile does not list experience. */
  experience: { years: number; detail: string } | null;
  /** Also a shareholder (one of the three principals). */
  shareholder?: boolean;
};

export const EXECUTIVES: Executive[] = [
  {
    name: "Ato Abebe Alemu",
    position: "Managing Director",
    education: ["Diploma in Business Management"],
    experience: { years: 15, detail: "In business, managing the sole proprietorship Marie Shitahun Import & Export" },
    shareholder: true,
  },
  {
    name: "Ato Dessie Alemu",
    position: "Deputy General Manager",
    education: ["MBA in Project Management", "BA in Management"],
    experience: { years: 16, detail: "In banking, in managerial roles" },
    shareholder: true,
  },
  {
    name: "Ato Hibret Shitahun",
    position: "General Manager",
    education: ["Secondary school"],
    experience: { years: 20, detail: "In business" },
    shareholder: true,
  },
  {
    name: "Ato Kassa Hailu",
    position: "Corporate Operations Director",
    education: ["BA in Accounting"],
    experience: { years: 25, detail: "As an accountant in various companies" },
  },
  {
    name: "W/ro Yetnayet Kifle",
    position: "Finance and Accounts Manager",
    education: [],
    experience: null,
  },
  {
    name: "W/ro Selamawit",
    position: "Senior HR Officer",
    education: ["BA in Law"],
    experience: { years: 6, detail: "In various companies" },
  },
  {
    name: "Ato Demelash Berihun",
    position: "Commercial Manager",
    education: ["BA in Economics"],
    experience: { years: 18, detail: "In banking" },
  },
];

export const ORG = {
  top: "Managing Director",
  topStaff: "Executive Secretary",
  second: "General Manager",
  secondStaffLeft: "Corporate Marketing and Business Development",
  secondStaffRight: "Internal Audit",
  departments: [
    "Corporate Commercial Department",
    "Corporate Finance Director",
    "Corporate Operation Director",
    "Corporate Project and Strategy",
  ],
};

export const CONTACT_TOPICS: { id: string; label: string; subject: string }[] = [
  { id: "export", label: "Buy sesame, pulses or beans", subject: "Export enquiry" },
  { id: "import", label: "Import machinery or vehicles", subject: "Import enquiry" },
  { id: "fleet", label: "Move dry or bulk cargo", subject: "Cargo transport enquiry" },
  { id: "rental", label: "Rent heavy equipment", subject: "Equipment rental enquiry" },
  { id: "paints", label: "Order Tsehay Paints", subject: "Tsehay Paints enquiry" },
  { id: "real-estate", label: "Ask about Eyor Tower", subject: "Eyor Tower enquiry" },
  { id: "general", label: "Something else", subject: "General enquiry" },
];
