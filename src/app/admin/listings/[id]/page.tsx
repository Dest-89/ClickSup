import { protectAdmin } from "@/lib/auth";
import { getListing } from "@/lib/githubDb";
import ListingForm from "@/components/admin/ListingForm";
import { notFound } from "next/navigation";

export default async function EditListing({ params }: { params: { id: string } }) {
  await protectAdmin();
  const listing = await getListing(params.id);
  if (!listing) notFound();

  return <ListingForm initialData={listing} />;
}
