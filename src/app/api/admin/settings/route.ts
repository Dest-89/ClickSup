import { NextResponse } from "next/server";
import { protectAdmin } from "@/lib/auth";
import { updateSettings } from "@/lib/githubDb";
import { SiteSettingsSchema } from "@/lib/schemas";

export async function POST(req: Request) {
  await protectAdmin();
  try {
    const body = await req.json();
    const validated = SiteSettingsSchema.parse(body);
    await updateSettings(validated);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
