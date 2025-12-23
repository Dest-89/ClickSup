import { protectAdmin } from "@/lib/auth";
import ListingForm from "@/components/admin/ListingForm";

export default async function NewListing() {
  await protectAdmin();
  return <ListingForm />;
}
