import { SHARE_CARD_SIZE, shareCard } from "@/lib/share-card";

export const alt = "Baheran Trading PLC: from sesame fields to the Addis skyline";
export const size = SHARE_CARD_SIZE;
export const contentType = "image/png";

export default function Image() {
  return shareCard({
    eyebrow: "Addis Ababa, Ethiopia · Since 2009",
    heading: { lead: "From sesame fields to the", accent: "Addis skyline" },
    // The hero showcase opens on the cargo fleet.
    photo: "fleet",
    path: "/",
  });
}
