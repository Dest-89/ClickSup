import { getListing, getSettings, listListings } from "@/lib/githubDb";
import { notFound } from "next/navigation";
import Link from "next/link";

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

export async function generateStaticParams() {
  const listings = await listListings();
  return listings.map((l: any) => ({ id: l.id }));
}

export default async function SupplementDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [listing, settings] = await Promise.all([
    getListing(id),
    getSettings(),
  ]);

  if (!listing || listing.status !== "published") {
    notFound();
  }

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

      {/* Main Content */}
      <main className="pt-24 pb-20">
        <div className="container-wellness max-w-5xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-8">
            <Link href="/" className="text-stone hover:text-forest">Home</Link>
            <span className="text-sand">/</span>
            <Link href="/supplements" className="text-stone hover:text-forest">Supplements</Link>
            <span className="text-sand">/</span>
            <Link href={`/supplements?category=${listing.category}`} className="text-stone hover:text-forest">
              {categoryLabels[listing.category] || listing.category}
            </Link>
            <span className="text-sand">/</span>
            <span className="text-charcoal font-medium">{listing.name}</span>
          </nav>

          <div className="bg-white rounded-3xl border border-sand overflow-hidden">
            {/* Product Header */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative aspect-square lg:aspect-auto bg-cream-dark">
                {listing.imageUrl ? (
                  <img
                    src={listing.imageUrl}
                    alt={listing.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-gradient-to-br from-sage-light to-sage">
                    <svg className="w-32 h-32 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                )}
                {listing.featured && (
                  <span className="absolute top-6 left-6 px-4 py-2 bg-terracotta text-white text-sm font-semibold rounded-full">
                    Featured Product
                  </span>
                )}
              </div>

              {/* Details */}
              <div className="p-8 lg:p-12 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <span className="badge-wellness">
                    {categoryLabels[listing.category] || listing.category}
                  </span>
                  <span className="text-stone text-sm">{listing.brand}</span>
                </div>

                <h1 className="font-display text-3xl lg:text-4xl text-charcoal mb-4">
                  {listing.name}
                </h1>

                {/* Rating */}
                {listing.rating && (
                  <div className="flex items-center gap-2 mb-6">
                    <div className="rating-stars">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-5 h-5 ${i < Math.floor(listing.rating) ? 'fill-current' : 'fill-sand'}`} viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-charcoal font-semibold">{listing.rating}</span>
                    <span className="text-stone text-sm">/ 5.0</span>
                  </div>
                )}

                <p className="text-stone text-lg leading-relaxed mb-8 flex-1">
                  {listing.shortDescription}
                </p>

                {/* CTA */}
                <div className="space-y-4">
                  <a
                    href={listing.affiliateHoplink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-cta w-full text-center text-lg py-4"
                  >
                    Check Price & Availability
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  {listing.priceDisclaimer && (
                    <p className="text-center text-stone text-sm italic">{listing.priceDisclaimer}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="border-t border-sand p-8 lg:p-12">
              {/* About */}
              {listing.longDescription && (
                <section className="mb-12">
                  <h2 className="font-display text-2xl text-charcoal mb-6 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-sage-light/50 flex items-center justify-center">
                      <svg className="w-5 h-5 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    About This Supplement
                  </h2>
                  <div className="prose-wellness max-w-none whitespace-pre-line">
                    {listing.longDescription}
                  </div>
                </section>
              )}

              {/* Benefits & Ingredients Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Benefits */}
                <section className="bg-cream rounded-2xl p-6">
                  <h3 className="font-display text-xl text-charcoal mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-forest/10 flex items-center justify-center">
                      <svg className="w-4 h-4 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    Key Benefits
                  </h3>
                  <ul className="space-y-3">
                    {listing.benefits.map((benefit: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-sage-light flex items-center justify-center shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="text-charcoal">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Ingredients */}
                <section className="bg-cream rounded-2xl p-6">
                  <h3 className="font-display text-xl text-charcoal mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-forest/10 flex items-center justify-center">
                      <svg className="w-4 h-4 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </span>
                    Ingredients
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {listing.ingredients.map((ingredient: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-white border border-sand rounded-full text-sm text-charcoal"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </section>
              </div>

              {/* Warnings */}
              {listing.warnings && listing.warnings.length > 0 && (
                <section className="bg-terracotta-light/20 border border-terracotta-light rounded-2xl p-6 mb-12">
                  <h3 className="font-display text-xl text-terracotta-dark mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-terracotta-light/50 flex items-center justify-center">
                      <svg className="w-4 h-4 text-terracotta-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </span>
                    Safety Information
                  </h3>
                  <ul className="space-y-2">
                    {listing.warnings.map((warning: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-terracotta-dark">
                        <span className="text-terracotta">•</span>
                        {warning}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Disclaimer */}
              <section className="bg-cream-dark rounded-2xl p-6">
                <h4 className="font-semibold text-charcoal mb-3">Medical Disclaimer</h4>
                <p className="text-stone text-sm leading-relaxed">
                  The information provided on this website is for informational purposes only and is not intended as a substitute for advice from your physician or other health care professional. You should not use the information on this site for diagnosis or treatment of any health problem or for prescription of any medication or other treatment. Always consult with a healthcare professional before starting any supplement regimen.
                </p>
              </section>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-8 text-center">
            <Link href="/supplements" className="btn-secondary">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to All Supplements
            </Link>
          </div>
        </div>
      </main>

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
