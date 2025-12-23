import { listPosts } from "@/lib/githubDb";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function BlogIndex() {
  const posts = await listPosts();
  const published = posts.filter((p: any) => p.status === "published");

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-12 text-center">Health & Wellness Blog</h1>
        
        <div className="space-y-8">
          {published.map((post: any) => (
            <Card key={post.slug} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="text-sm text-gray-500 mb-2">
                  {new Date(post.updatedAt).toLocaleDateString()}
                </div>
                <CardTitle className="text-2xl">
                  <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
                    {post.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="text-blue-600 font-medium">
                  Read Article →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {published.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500">No blog posts yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
