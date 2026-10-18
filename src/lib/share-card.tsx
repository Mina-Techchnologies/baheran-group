import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { BUSINESS_PAGES, type BusinessSlug } from "@/content/business-pages";
import { SKYLINE } from "@/content/company";
import { SITE_URL } from "./seo";

/** Open Graph card size: what Facebook, LinkedIn, X, Telegram and WhatsApp all crop to. */
export const SHARE_CARD_SIZE = { width: 1200, height: 630 };

const NAVY = "#0b2440";
const BLUE_GLOW = "rgba(55, 118, 186, "; // logo blue #3776ba, alpha appended
const BLUE_LIGHT = "#8fbbe8";
const SUBTLE = "#b4c3d6";

// Every file is read once, when the module loads, so the cards can be rendered at build time. Each
// path is scoped to its own folder so the server build traces only those files.
const fontFile = (weight: number) =>
  readFile(join(process.cwd(), "node_modules/@fontsource/plus-jakarta-sans/files", `plus-jakarta-sans-latin-${weight}-normal.woff`));
const imageFile = (path: string) => readFile(join(process.cwd(), "src/assets", path));
const dataUri = (bytes: Buffer, type: string) => `data:${type};base64,${bytes.toString("base64")}`;

// The large hero showcase photo of each business (`feature` in SKYLINE). The file is read directly
// because next/og needs the bytes, not the optimised URL.
const PHOTO_FILES: Record<BusinessSlug, string> = {
  export: "images/export/cleaning-plant.jpg",
  import: "images/import/wheel-loader.jpg",
  fleet: "images/fleet/dump-trucks.jpg",
  rental: "images/rental/mobile-crane.jpg",
  paints: "images/paints/super-emulsion.jpg",
  "real-estate": "images/realestate/eyor-tower.jpg",
};

const [extraBold, semiBold, logo, photos] = await Promise.all([
  fontFile(800),
  fontFile(600),
  imageFile("brand/logo-mark.png").then((bytes) => dataUri(bytes, "image/png")),
  Promise.all(
    Object.entries(PHOTO_FILES).map(async ([slug, path]) => [slug, dataUri(await imageFile(path), "image/jpeg")] as const),
  ).then((entries) => Object.fromEntries(entries) as Record<BusinessSlug, string>),
]);

type ShareCardProps = {
  eyebrow: string;
  heading: { lead: string; accent: string };
  /** Whose showcase photo to show. */
  photo: BusinessSlug;
  path: string;
};

/** Branded share card: the company name and headline on navy, beside one company photo shown whole. */
export function shareCard({ eyebrow, heading, photo, path }: ShareCardProps) {
  const { feature } = SKYLINE.find((item) => item.href === `#${photo}`)!;

  // Fit the photo inside the right-hand column at its own aspect ratio, so nothing is cropped.
  const box = { width: 500, height: 470 };
  const scale = Math.min(box.width / feature.src.width, box.height / feature.src.height);
  const frame = { width: Math.round(feature.src.width * scale), height: Math.round(feature.src.height * scale) };

  // Word by word, so the headline wraps naturally with its accent phrase in brand blue.
  const words = [
    ...heading.lead.split(" ").map((word) => ({ word, accent: false })),
    ...heading.accent.split(" ").map((word) => ({ word, accent: true })),
  ];
  const host = new URL(SITE_URL).host;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 64,
          gap: 40,
          color: "white",
          fontFamily: "Plus Jakarta Sans",
          backgroundColor: NAVY,
          backgroundImage: `radial-gradient(circle at 0% 100%, ${BLUE_GLOW}0.34), transparent 55%), radial-gradient(circle at 100% 0%, ${BLUE_GLOW}0.25), transparent 50%)`,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 68,
                height: 68,
                borderRadius: 18,
                backgroundColor: "white",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- next/og renders plain <img> */}
              <img src={logo} width={50} height={50} alt="" />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 32, fontWeight: 800, letterSpacing: 1.6, lineHeight: 1 }}>BAHERAN</span>
              <span style={{ fontSize: 19, fontWeight: 600, color: SUBTLE, marginTop: 6 }}>Trading PLC</span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: 3.5, color: BLUE_LIGHT }}>
              {eyebrow.toUpperCase()}
            </span>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                marginTop: 18,
                fontSize: 56,
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: -1.5,
              }}
            >
              {words.map(({ word, accent }, i) => (
                <span key={i} style={{ marginRight: 15, color: accent ? BLUE_LIGHT : "white" }}>
                  {word}
                </span>
              ))}
            </div>
          </div>

          <span style={{ fontSize: 22, fontWeight: 600, color: SUBTLE }}>{host + (path === "/" ? "" : path)}</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", width: box.width }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- next/og renders plain <img> */}
          <img
            src={photos[photo]}
            alt=""
            width={frame.width}
            height={frame.height}
            style={{
              borderRadius: 24,
              border: "2px solid rgba(255, 255, 255, 0.14)",
              boxShadow: "0 24px 60px rgba(0, 0, 0, 0.35)",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    ),
    {
      ...SHARE_CARD_SIZE,
      fonts: [
        { name: "Plus Jakarta Sans", data: extraBold, weight: 800, style: "normal" },
        { name: "Plus Jakarta Sans", data: semiBold, weight: 600, style: "normal" },
      ],
    },
  );
}

const labelOf = (slug: BusinessSlug) => SKYLINE.find((item) => item.href === `#${slug}`)!.label;

/** Share card for a business page: its label, its headline and its showcase photo. */
export function businessShareCard(slug: BusinessSlug) {
  return shareCard({ eyebrow: labelOf(slug), heading: BUSINESS_PAGES[slug].heading, photo: slug, path: `/${slug}` });
}

export function businessShareAlt(slug: BusinessSlug) {
  const { lead, accent } = BUSINESS_PAGES[slug].heading;
  return `Baheran Trading PLC, ${labelOf(slug).toLowerCase()}: ${lead} ${accent}`;
}
