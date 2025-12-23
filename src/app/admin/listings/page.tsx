import { protectAdmin } from "@/lib/auth";
import { listListings } from "@/lib/githubDb";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default async function AdminListings() {
  await protectAdmin();
  const listings = await listListings();

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Listings</h1>
        <Link href="/admin/listings/new">
          <Button>Add New Listing</Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listings.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>
                  <Badge variant={item.status === "published" ? "default" : "secondary"}>
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>{item.featured ? "Yes" : "No"}</TableCell>
                <TableCell>{new Date(item.updatedAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <Link href={`/admin/listings/${item.id}`}>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
