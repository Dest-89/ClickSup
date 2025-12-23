import { getSettings, updateSettings, upsertListing, upsertPost } from "@/lib/githubDb";

export async function seedIfEmpty() {
  try {
    const settings = await getSettings();
    if (settings) return; // Already seeded

    console.log("Seeding initial data...");

    const initialSettings = {
      siteName: "ToriToriLand",
      clickBankId: "dst11",
      contactEmail: "admin@example.com",
      footerText: "© 2024 ClickBank Supplement Directory. All rights reserved.",
    };

    await updateSettings(initialSettings);

    const sampleListing = {
      id: "sample-supplement",
      name: "Sample Fat Burner",
      brand: "HealthPro",
      category: "fat-loss",
      shortDescription: "A high-quality fat burner for your daily routine.",
      longDescription: "This is a sample supplement listing to demonstrate the directory features.",
      ingredients: ["Green Tea Extract", "Caffeine", "L-Carnitine"],
      benefits: ["Boosts metabolism", "Increases energy"],
      warnings: ["Not for children", "Contains caffeine"],
      priceDisclaimer: "Prices may vary on ClickBank.",
      affiliateHoplink: "https://hop.clickbank.net/?affiliate=dst11&vendor=sample",
      rating: 4.5,
      tags: ["energy", "weight-loss"],
      imageUrl: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=800",
      featured: true,
      status: "published",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await upsertListing(sampleListing);

    const samplePost = {
      title: "Welcome to our Supplement Blog",
      slug: "welcome-to-our-blog",
      excerpt: "Learn how to choose the right supplements for your health goals.",
      status: "published",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      content: "---\ntitle: Welcome to our Supplement Blog\n---\n\n# Welcome\n\nThis is your first blog post. You can edit this in the admin dashboard.",
    };

    await upsertPost(samplePost.slug, samplePost.content, samplePost);

    console.log("Seeding complete.");
  } catch (error) {
    console.error("Seeding failed:", error);
  }
}
