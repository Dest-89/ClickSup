import { MetadataRoute } from "next";
import { listListings, listPosts } from "@/lib/githubDb";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  
  const listings = await listListings();
  const posts = await listPosts();

  const listingUrls = listings
    .filter((l: any) => l.status === "published")
    .map((l: any) => ({
      url: `${baseUrl}/supplements/${l.id}`,
      lastModified: new Date(l.updatedAt),
    }));

  const postUrls = posts
    .filter((p: any) => p.status === "published")
    .map((p: any) => ({
      url: `${baseUrl}/blog/${p.slug}`,
      lastModified: new Date(p.updatedAt),
    }));

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/supplements`, lastModified: new Date() },
    { url: `${baseUrl}/blog`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
    { url: `${baseUrl}/newsletter`, lastModified: new Date() },
    ...listingUrls,
    ...postUrls,
  ];
}
