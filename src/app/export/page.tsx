import { BusinessPage, businessMetadata } from "@/components/BusinessPage";

export const metadata = businessMetadata("export");

export default function Page() {
  return <BusinessPage slug="export" />;
}
