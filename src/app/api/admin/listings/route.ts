import { NextResponse } from "next/server";
import { protectAdmin } from "@/lib/auth";
import { upsertListing, deleteListing } from "@/lib/githubDb";
import { ListingSchema } from "@/lib/schemas";

export async function POST(req: Request) {
  await protectAdmin();
  try {
    const body = await req.json();
    const validated = ListingSchema.parse(body);
    await upsertListing(validated);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  await protectAdmin();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
  
  try {
    await deleteListing(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
