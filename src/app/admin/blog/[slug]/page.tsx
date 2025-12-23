import { protectAdmin } from "@/lib/auth";
import { getPost } from "@/lib/githubDb";
import PostForm from "@/components/admin/PostForm";
import { notFound } from "next/navigation";
import matter from "gray-matter";

export default async function EditPost({ params }: { params: { slug: string } }) {
  await protectAdmin();
  const raw = await getPost(params.slug);
  if (!raw) notFound();

  const { data, content } = matter(raw);

  return <PostForm initialData={data} rawContent={content} />;
}
