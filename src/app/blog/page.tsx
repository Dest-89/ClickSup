import { listPosts, getSettings } from "@/lib/githubDb";
import Link from "next/link";

export default async function BlogIndex() {
  const [posts, settings] = await Promise.all([
    listPosts(),
    getSettings(),
  ]);

  const published = posts.filter((p: any) => p.status === "published");

  return (
    <div className="min-h-screen bg-cream">
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
            <Link href="/blog" className="text-forest font-medium text-sm">
              Blog
            </Link>
            <Link href="/contact" className="text-stone hover:text-forest transition-colors text-sm font-medium">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-cream to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-30" />
        <div className="container-wellness relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <span className="section-label">Health Insights</span>
            <h1 className="font-display text-4xl md:text-5xl text-charcoal mb-4">
              Our Wellness Blog
            </h1>
            <p className="text-stone text-lg">
              Expert guides, research insights, and practical tips to support your health journey.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container-wellness max-w-4xl">
          {published.length > 0 ? (
            <div className="space-y-8">
              {published.map((post: any, index: number) => (
                <article
                  key={post.slug}
                  className="group bg-white rounded-2xl border border-sand overflow-hidden hover:shadow-medium transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image Placeholder */}
                    <div className="w-full md:w-64 h-48 md:h-auto bg-gradient-to-br from-forest-light to-forest flex items-center justify-center shrink-0">
                      <svg className="w-12 h-12 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8 flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <time className="text-sm text-stone">
                          {new Date(post.updatedAt).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric"
                          })}
                        </time>
                        {post.tags && post.tags.length > 0 && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-sand" />
                            <span className="badge-wellness text-xs">{post.tags[0]}</span>
                          </>
                        )}
                      </div>

                      <h2 className="font-display text-2xl text-charcoal mb-3 group-hover:text-forest transition-colors">
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h2>

                      <p className="text-stone mb-6 line-clamp-2">
                        {post.excerpt || "Discover insights and expert advice on health, supplements, and wellness in this comprehensive guide."}
                      </p>

                      <Link href={`/blog/${post.slug}`} className="link-wellness inline-flex items-center gap-2">
                        Read Article
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-sand">
              <svg className="w-16 h-16 mx-auto text-sand mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <h3 className="font-display text-xl text-charcoal mb-2">No blog posts yet</h3>
              <p className="text-stone mb-6">Check back soon for health insights and wellness guides.</p>
              <Link href="/supplements" className="btn-secondary">
                Browse Supplements
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-forest">
        <div className="container-wellness">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl text-white mb-4">
              Get Health Tips in Your Inbox
            </h2>
            <p className="text-sage-light mb-8">
              Subscribe to receive the latest supplement guides, wellness tips, and exclusive content.
            </p>
            <Link href="/newsletter" className="inline-flex items-center gap-2 px-8 py-4 bg-terracotta text-white font-semibold rounded-xl hover:bg-terracotta-dark transition-colors">
              Subscribe Now
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
