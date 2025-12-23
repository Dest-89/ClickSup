import { protectAdmin } from "@/lib/auth";
import { listListings, listPosts, getSettings } from "@/lib/githubDb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AdminDashboard() {
  await protectAdmin();
  
  const [listings, posts, settings] = await Promise.all([
    listListings(),
    listPosts(),
    getSettings(),
  ]);

  const stats = [
    { label: "Total Listings", value: listings.length, href: "/admin/listings" },
    { label: "Published Posts", value: posts.filter((p: any) => p.status === "published").length, href: "/admin/blog" },
    { label: "Draft Posts", value: posts.filter((p: any) => p.status === "draft").length, href: "/admin/blog" },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Overview</h1>
        <div className="space-x-4">
          <Link href="/">
            <Button variant="outline">View Site</Button>
          </Link>
          <form action="/api/admin/logout" method="POST" className="inline">
            <Button variant="destructive" type="submit">Logout</Button>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="hover:border-blue-500 transition-colors">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-500">{stat.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/admin/listings/new" className="block">
              <Button className="w-full justify-start">Add New Supplement</Button>
            </Link>
            <Link href="/admin/blog/new" className="block">
              <Button className="w-full justify-start" variant="outline">Write Blog Post</Button>
            </Link>
            <Link href="/admin/settings" className="block">
              <Button className="w-full justify-start" variant="ghost">Site Settings</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Site Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><strong>Site Name:</strong> {settings?.siteName}</p>
            <p><strong>ClickBank ID:</strong> {settings?.clickBankId}</p>
            <p><strong>Contact Email:</strong> {settings?.contactEmail}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
