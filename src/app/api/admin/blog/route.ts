import { NextResponse } from "next/server";
import { protectAdmin } from "@/lib/auth";
import { upsertPost, deletePost } from "@/lib/githubDb";
import { BlogPostSchema } from "@/lib/schemas";

export async function POST(req: Request) {
  await protectAdmin();
  try {
    const body = await req.json();
    const validated = BlogPostSchema.parse(body);
    await upsertPost(validated.slug, validated.content, validated);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  await protectAdmin();
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "Slug required" }, { status: 400 });
  
  try {
    await deletePost(slug);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
