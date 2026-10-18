import { BusinessPage, businessMetadata } from "@/components/BusinessPage";

export const metadata = businessMetadata("rental");

export default function Page() {
  return <BusinessPage slug="rental" />;
}
