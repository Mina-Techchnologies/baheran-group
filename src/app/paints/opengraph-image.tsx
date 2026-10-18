import { SHARE_CARD_SIZE, businessShareAlt, businessShareCard } from "@/lib/share-card";

export const alt = businessShareAlt("paints");
export const size = SHARE_CARD_SIZE;
export const contentType = "image/png";

export default function Image() {
  return businessShareCard("paints");
}
