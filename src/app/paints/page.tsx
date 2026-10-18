import { BusinessPage, businessMetadata } from "@/components/BusinessPage";

export const metadata = businessMetadata("paints");

export default function Page() {
  return <BusinessPage slug="paints" />;
}
