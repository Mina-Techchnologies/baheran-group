import { Building2, Container, KeyRound, PaintBucket, Ship, Truck, type LucideIcon } from "lucide-react";

/** One line icon per business, keyed by its section anchor. */
export const BUSINESS_ICONS: Record<string, LucideIcon> = {
  "#export": Ship,
  "#import": Container,
  "#fleet": Truck,
  "#rental": KeyRound,
  "#paints": PaintBucket,
  "#real-estate": Building2,
};
