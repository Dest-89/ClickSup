import Link from "next/link";
import { listListings, listPosts, getSettings } from "@/lib/githubDb";
import type { ReactNode } from "react";

// Category icons as SVG components
const CategoryIcons: Record<string, ReactNode> = {
  "fat-loss": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  "testosterone": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  "sleep": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  ),
  "nootropics": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  "joint": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  "gut": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
    </svg>
  ),
  "immune": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  "keto": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
    </svg>
  ),
};

const categoryLabels: Record<string, string> = {
  "fat-loss": "Weight Loss",
  "testosterone": "Men's Health",
  "sleep": "Sleep Support",
  "nootropics": "Brain Health",
  "joint": "Joint Care",
  "gut": "Gut Health",
  "immune": "Immunity",
  "keto": "Keto Diet",
};

export default async function Home() {
  const [listings, posts, settings] = await Promise.all([
    listListings(),
    listPosts(),
    getSettings(),
  ]);

  const featured = listings.filter((l: any) => l.featured && l.status === "published").slice(0, 6);
  const latestPosts = posts.filter((p: any) => p.status === "published").slice(0, 3);
  const categories = ["fat-loss", "testosterone", "sleep", "nootropics", "joint", "gut", "immune", "keto"];

  return (
    <main className="min-h-screen bg-cream">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-md border-b border-sand">
        <div className="container-wellness flex items-center justify-between h-16">
          <Link href="/" className="font-display text-xl font-medium text-charcoal">
            {settings?.siteName || "ToriToriLand"}
          </Link>
          <div className="flex items-center gap-8">
            <Link href="/supplements" className="text-stone hover:text-forest transition-colors text-sm font-medium">
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

      {/* Hero Section */}
      <section className="hero-section pt-16 relative noise-overlay">
        {/* Decorative Blobs */}
        <div className="organic-blob w-96 h-96 -top-20 -right-20 float-element" />
        <div className="organic-blob w-72 h-72 top-1/3 -left-20 float-element" style={{ animationDelay: "-3s" }} />
        <div className="organic-blob w-64 h-64 bottom-20 right-1/4 float-element" style={{ animationDelay: "-6s", background: "linear-gradient(135deg, var(--terracotta-light) 0%, var(--terracotta) 100%)" }} />

        <div className="container-wellness relative z-10">
          <div className="max-w-3xl stagger-fade-in py-20">
            <span className="section-label">Your Wellness Journey Starts Here</span>
            <h1 className="hero-title">
              Discover <span className="accent">Premium</span> Health Supplements
            </h1>
            <p className="hero-subtitle mb-8">
              Curated selection of top-rated supplements for weight loss, energy, sleep, brain health, and more. Expert reviews to help you make informed choices.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/supplements" className="btn-cta">
                Browse All Supplements
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/blog" className="btn-secondary">
                Read Health Insights
              </Link>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="container-wellness">
          <div className="section-header">
            <span className="section-label">Browse by Category</span>
            <h2 className="section-title">Find What You Need</h2>
            <p className="section-description">
              Explore our carefully organized supplement categories to find the perfect support for your health goals.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/supplements?category=${cat}`}
                className="group p-6 bg-cream rounded-2xl border border-sand hover:border-forest hover:shadow-medium transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-sage-light/50 flex items-center justify-center text-forest mb-4 group-hover:bg-forest group-hover:text-white transition-colors">
                  {CategoryIcons[cat] || (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  )}
                </div>
                <h3 className="font-display text-lg text-charcoal mb-1">{categoryLabels[cat] || cat}</h3>
                <p className="text-sm text-stone">
                  {listings.filter((l: any) => l.category === cat && l.status === "published").length} products
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Supplements */}
      <section className="py-20 bg-cream relative">
        <div className="container-wellness">
          <div className="section-header">
            <span className="section-label">Top Picks</span>
            <h2 className="section-title">Featured Supplements</h2>
            <p className="section-description">
              Hand-selected products that stand out for quality, effectiveness, and customer satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((item: any, index: number) => (
              <article
                key={item.id}
                className="product-card"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.featured && <span className="featured-badge">Featured</span>}
                <div className="product-card-image">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.name} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-sage-light to-sage">
                      <svg className="w-16 h-16 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

          <div className="text-center mt-12">
            <Link href="/supplements" className="btn-secondary">
              View All Supplements
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-white">
        <div className="container-wellness">
          <div className="section-header">
            <span className="section-label">Health Insights</span>
            <h2 className="section-title">From Our Blog</h2>
            <p className="section-description">
              Expert articles on supplements, nutrition, and healthy living to guide your wellness journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestPosts.map((post: any) => (
              <article key={post.slug} className="blog-card">
                <div className="h-48 bg-gradient-to-br from-forest-light to-forest flex items-center justify-center">
                  <svg className="w-12 h-12 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <div className="blog-card-content">
                  <span className="blog-card-date">
                    {new Date(post.updatedAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </span>
                  <h3 className="blog-card-title">
                    <Link href={`/blog/${post.slug}`} className="hover:text-forest transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="blog-card-excerpt line-clamp-3">{post.excerpt || "Explore our latest insights on health and wellness..."}</p>
                  <Link href={`/blog/${post.slug}`} className="link-wellness mt-4 inline-block">
                    Read Article
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {latestPosts.length > 0 && (
            <div className="text-center mt-12">
              <Link href="/blog" className="btn-secondary">
                View All Articles
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-forest relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-sage blur-3xl" />
        </div>
        <div className="container-wellness relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
              Stay Updated on Health & Wellness
            </h2>
            <p className="text-sage-light mb-8">
              Get the latest supplement reviews, health tips, and exclusive offers delivered to your inbox.
            </p>
            <Link href="/newsletter" className="inline-flex items-center gap-2 px-8 py-4 bg-terracotta text-white font-semibold rounded-xl hover:bg-terracotta-dark transition-colors">
              Subscribe to Newsletter
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-wellness">
        <div className="container-wellness">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <h3 className="footer-brand">{settings?.siteName || "ToriToriLand"}</h3>
              <p className="footer-tagline">
                Your trusted source for premium health supplements and wellness insights.
              </p>
            </div>
            <div className="footer-links space-y-3">
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <Link href="/supplements" className="block">Supplements</Link>
              <Link href="/blog" className="block">Blog</Link>
              <Link href="/contact" className="block">Contact</Link>
            </div>
            <div className="footer-links space-y-3">
              <h4 className="text-white font-semibold mb-4">Categories</h4>
              <Link href="/supplements?category=fat-loss" className="block">Weight Loss</Link>
              <Link href="/supplements?category=sleep" className="block">Sleep Support</Link>
              <Link href="/supplements?category=nootropics" className="block">Brain Health</Link>
            </div>
          </div>
          <div className="footer-bottom text-center">
            <p className="mb-2">{settings?.footerText}</p>
            <p className="text-sage-light/60 text-xs">
              Disclaimer: These statements have not been evaluated by the FDA. Products are not intended to diagnose, treat, cure, or prevent any disease.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
