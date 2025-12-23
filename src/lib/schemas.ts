import { z } from "zod";

export const ListingSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  brand: z.string().min(1),
  category: z.enum(["fat-loss", "testosterone", "sleep", "nootropics", "joint", "gut", "immune", "keto", "other"]),
  shortDescription: z.string().min(1),
  longDescription: z.string().optional(),
  ingredients: z.array(z.string()).default([]),
  benefits: z.array(z.string()).default([]),
  warnings: z.array(z.string()).default([]),
  priceDisclaimer: z.string().optional(),
  affiliateHoplink: z.string().url(),
  rating: z.number().min(0).max(5).optional(),
  tags: z.array(z.string()).default([]),
  imageUrl: z.string().url().optional().or(z.literal("")),
  featured: z.boolean().default(false),
  status: z.enum(["draft", "published"]).default("draft"),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Listing = z.infer<typeof ListingSchema>;

export const ListingIndexSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  featured: z.boolean(),
  status: z.enum(["draft", "published"]),
  updatedAt: z.string(),
});

export type ListingIndex = z.infer<typeof ListingIndexSchema>;

export const BlogPostSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().optional(),
  coverImage: z.string().optional(),
  tags: z.array(z.string()).default([]),
  status: z.enum(["draft", "published"]).default("draft"),
  createdAt: z.string(),
  updatedAt: z.string(),
  content: z.string(), // Body markdown
});

export type BlogPost = z.infer<typeof BlogPostSchema>;

export const BlogIndexSchema = z.object({
  slug: z.string(),
  title: z.string(),
  status: z.enum(["draft", "published"]),
  updatedAt: z.string(),
});

export type BlogIndex = z.infer<typeof BlogIndexSchema>;

export const SiteSettingsSchema = z.object({
  siteName: z.string().default("ToriToriLand"),
  clickBankId: z.string().default("dst11"),
  contactEmail: z.string().email().optional(),
  footerText: z.string().optional(),
});

export type SiteSettings = z.infer<typeof SiteSettingsSchema>;
