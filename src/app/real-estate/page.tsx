import { BusinessPage, businessMetadata } from "@/components/BusinessPage";

export const metadata = businessMetadata("real-estate");

export default function Page() {
  return <BusinessPage slug="real-estate" />;
}
