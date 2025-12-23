import { getPost } from "@/lib/githubDb";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import matter from "gray-matter";
import Link from "next/link";

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const rawContent = await getPost(params.slug);

  if (!rawContent) {
    notFound();
  }

  const { content, data } = matter(rawContent);

  return (
    <div className="min-h-screen bg-white py-12">
      <article className="container mx-auto px-4 max-w-3xl">
        <Link href="/blog" className="text-blue-600 hover:underline mb-8 block">
          ← Back to Blog
        </Link>
        
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
          <div className="text-gray-500">
            Published on {new Date(data.updatedAt || data.createdAt).toLocaleDateString()}
          </div>
        </header>

        <div className="prose prose-blue max-w-none">
          <MDXRemote source={content} />
        </div>
      </article>
    </div>
  );
}
