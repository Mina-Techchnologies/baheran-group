import { SHARE_CARD_SIZE, businessShareAlt, businessShareCard } from "@/lib/share-card";

export const alt = businessShareAlt("real-estate");
export const size = SHARE_CARD_SIZE;
export const contentType = "image/png";
// The site is a static export, which only writes out route handlers marked static.
export const dynamic = "force-static";

export default function Image() {
  return businessShareCard("real-estate");
}
