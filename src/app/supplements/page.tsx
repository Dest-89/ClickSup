import { listListings, getSettings } from "@/lib/githubDb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default async function SupplementsDirectory({
  searchParams,
}: {
  searchParams: { category?: string; q?: string };
}) {
  const listings = await listListings();
  const settings = await getSettings();

  const filtered = listings.filter((item: any) => {
    if (item.status !== "published") return false;
    if (searchParams.category && item.category !== searchParams.category) return false;
    if (searchParams.q && !item.name.toLowerCase().includes(searchParams.q.toLowerCase())) return false;
    return true;
  });

  const categories = ["fat-loss", "testosterone", "sleep", "nootropics", "joint", "gut", "immune", "keto"];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Supplements Directory</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full md:w-64 space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Categories</h3>
              <div className="space-y-2">
                <Link href="/supplements" className={`block text-sm ${!searchParams.category ? "text-blue-600 font-bold" : "text-gray-600"}`}>
                  All Categories
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    href={`/supplements?category=${cat}`}
                    className={`block text-sm capitalize ${searchParams.category === cat ? "text-blue-600 font-bold" : "text-gray-600"}`}
                  >
                    {cat.replace("-", " ")}
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item: any) => (
                <Card key={item.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <Badge variant="outline">{item.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{item.shortDescription}</p>
                    <Link href={`/supplements/${item.id}`} className="text-blue-600 font-medium hover:underline">
                      View Details →
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-20 bg-white rounded-lg border">
                <p className="text-gray-500">No supplements found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
