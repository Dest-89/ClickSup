import { listListings, getSettings } from "@/lib/githubDb";
import Link from "next/link";
import type { ReactNode } from "react";

const categoryLabels: Record<string, string> = {
  "fat-loss": "Weight Loss",
  "testosterone": "Men's Health",
  "sleep": "Sleep Support",
  "nootropics": "Brain Health",
  "joint": "Joint Care",
  "gut": "Gut Health",
  "immune": "Immunity",
  "keto": "Keto Diet",
  "other": "Other",
};

const CategoryIcons: Record<string, ReactNode> = {
  "fat-loss": (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  "testosterone": (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  "sleep": (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  ),
  "nootropics": (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  "joint": (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  "gut": (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
    </svg>
  ),
  "immune": (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  "keto": (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
    </svg>
  ),
};

export default async function SupplementsDirectory({
  searchParams,
}: {
  searchParams: { category?: string; q?: string };
}) {
  const [listings, settings] = await Promise.all([
    listListings(),
    getSettings(),
  ]);

  const filtered = listings.filter((item: any) => {
    if (item.status !== "published") return false;
    if (searchParams.category && item.category !== searchParams.category) return false;
    if (searchParams.q && !item.name.toLowerCase().includes(searchParams.q.toLowerCase())) return false;
    return true;
  });

  const categories = ["fat-loss", "testosterone", "sleep", "nootropics", "joint", "gut", "immune", "keto", "other"];

  return (
    <div className="min-h-screen bg-cream">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-md border-b border-sand">
        <div className="container-wellness flex items-center justify-between h-16">
          <Link href="/" className="font-display text-xl font-medium text-charcoal">
            {settings?.siteName || "ToriToriLand"}
          </Link>
          <div className="flex items-center gap-8">
            <Link href="/supplements" className="text-forest font-medium text-sm">
              Supplements
            </Link>
            <Link href="/blog" className="text-stone hover:text-forest transition-colors text-sm font-medium">
              Blog
            </Link>
            <Link href="/contact" className="text-stone hover:text-forest transition-colors text-sm font-medium">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-cream to-white">
        <div className="container-wellness">
          <div className="max-w-2xl">
            <Link href="/" className="inline-flex items-center gap-2 text-stone hover:text-forest mb-4 text-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
            <h1 className="font-display text-4xl md:text-5xl text-charcoal mb-4">
              {searchParams.category ? categoryLabels[searchParams.category] || searchParams.category : "All Supplements"}
            </h1>
            <p className="text-stone text-lg">
              {searchParams.category
                ? `Explore our selection of ${categoryLabels[searchParams.category]?.toLowerCase() || searchParams.category} supplements.`
                : "Browse our complete collection of premium health supplements."}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container-wellness">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-64 shrink-0">
              <div className="lg:sticky lg:top-24 space-y-8">
                {/* Categories */}
                <div className="bg-white rounded-2xl border border-sand p-6">
                  <h3 className="font-display text-lg text-charcoal mb-4">Categories</h3>
                  <div className="space-y-2">
                    <Link
                      href="/supplements"
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${
                        !searchParams.category
                          ? "bg-forest text-white"
                          : "text-stone hover:bg-cream-dark hover:text-charcoal"
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                      <span className="font-medium">All Categories</span>
                      <span className="ml-auto text-xs opacity-60">
                        {listings.filter((l: any) => l.status === "published").length}
                      </span>
                    </Link>
                    {categories.map((cat) => {
                      const count = listings.filter((l: any) => l.category === cat && l.status === "published").length;
                      if (count === 0) return null;
                      return (
                        <Link
                          key={cat}
                          href={`/supplements?category=${cat}`}
                          className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${
                            searchParams.category === cat
                              ? "bg-forest text-white"
                              : "text-stone hover:bg-cream-dark hover:text-charcoal"
                          }`}
                        >
                          {CategoryIcons[cat] || (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                            </svg>
                          )}
                          <span className="font-medium">{categoryLabels[cat] || cat}</span>
                          <span className="ml-auto text-xs opacity-60">{count}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Help Box */}
                <div className="bg-forest rounded-2xl p-6 text-white">
                  <h4 className="font-display text-lg mb-2">Need Help?</h4>
                  <p className="text-sage-light text-sm mb-4">
                    Not sure which supplement is right for you? Check out our guides.
                  </p>
                  <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-sage-light transition-colors">
                    Read Our Blog
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              {/* Results Count */}
              <div className="flex items-center justify-between mb-8">
                <p className="text-stone">
                  Showing <span className="font-semibold text-charcoal">{filtered.length}</span> supplements
                </p>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((item: any, index: number) => (
                  <article
                    key={item.id}
                    className="product-card animate-scale-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {item.featured && <span className="featured-badge">Featured</span>}
                    <div className="product-card-image">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.name} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-sage-light to-sage">
                          <svg className="w-12 h-12 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="product-card-content">
                      <span className="product-card-category">{categoryLabels[item.category] || item.category}</span>
                      <h3 className="product-card-title">{item.name}</h3>
                      <p className="product-card-description line-clamp-2">{item.shortDescription}</p>
                      <div className="product-card-footer">
                        <Link href={`/supplements/${item.id}`} className="link-wellness">
                          View Details
                        </Link>
                        <div className="rating-stars">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-4 h-4 ${i < Math.floor(item.rating || 4) ? 'fill-current' : 'fill-sand'}`} viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Empty State */}
              {filtered.length === 0 && (
                <div className="text-center py-20 bg-white rounded-2xl border border-sand">
                  <svg className="w-16 h-16 mx-auto text-sand mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="font-display text-xl text-charcoal mb-2">No supplements found</h3>
                  <p className="text-stone mb-6">Try adjusting your filters or browse all categories.</p>
                  <Link href="/supplements" className="btn-secondary">
                    View All Supplements
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-wellness">
        <div className="container-wellness">
          <div className="footer-bottom text-center">
            <p className="text-sage-light mb-2">{settings?.footerText}</p>
            <p className="text-sage-light/60 text-xs">
              Disclaimer: These statements have not been evaluated by the FDA.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
