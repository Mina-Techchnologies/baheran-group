import { BusinessPage, businessMetadata } from "@/components/BusinessPage";

export const metadata = businessMetadata("import");

export default function Page() {
  return <BusinessPage slug="import" />;
}
