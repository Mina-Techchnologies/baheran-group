import { BusinessPage, businessMetadata } from "@/components/BusinessPage";

export const metadata = businessMetadata("fleet");

export default function Page() {
  return <BusinessPage slug="fleet" />;
}
