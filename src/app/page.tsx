import Link from "next/link";
import { listListings, listPosts, getSettings } from "@/lib/githubDb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function Home() {
  const [listings, posts, settings] = await Promise.all([
    listListings(),
    listPosts(),
    getSettings(),
  ]);

  const featured = listings.filter((l: any) => l.featured && l.status === "published");
  const latestPosts = posts.filter((p: any) => p.status === "published").slice(0, 3);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-white border-b py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{settings?.siteName || "Supplement Directory"}</h1>
          <p className="text-xl text-gray-600 mb-8">Discover top-rated health supplements and expert advice.</p>
          <Link href="/supplements" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700">
            Browse Supplements
          </Link>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">Featured Supplements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((item: any) => (
            <Card key={item.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <Badge>{item.category}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.shortDescription}</p>
                <Link href={`/supplements/${item.id}`} className="text-blue-600 font-medium hover:underline">
                  View Details →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Latest Blog */}
      <section className="py-16 bg-white border-t">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Latest from the Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestPosts.map((post: any) => (
              <div key={post.slug}>
                <h3 className="text-xl font-semibold mb-2">
                  <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  {new Date(post.updatedAt).toLocaleDateString()}
                </p>
                <Link href={`/blog/${post.slug}`} className="text-blue-600 text-sm font-medium">
                  Read More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">{settings?.footerText}</p>
          <p className="text-gray-500 text-sm">ClickBank ID: {settings?.clickBankId || "dst11"}</p>
          <div className="mt-8 flex justify-center space-x-6 text-sm text-gray-400">
            <Link href="/contact">Contact</Link>
            <Link href="/newsletter">Newsletter</Link>
            <Link href="/admin">Admin</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
