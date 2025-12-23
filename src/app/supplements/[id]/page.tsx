import { getListing, getSettings, listListings } from "@/lib/githubDb";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export async function generateStaticParams() {
  const listings = await listListings();
  return listings.map((l: any) => ({ id: l.id }));
}

export default async function SupplementDetail({ params }: { params: { id: string } }) {
  const listing = await getListing(params.id);
  const settings = await getSettings();

  if (!listing || listing.status !== "published") {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/supplements" className="text-blue-600 hover:underline mb-6 block">
          ← Back to Directory
        </Link>

        <div className="bg-white rounded-xl shadow-sm border p-8">
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            {listing.imageUrl && (
              <div className="w-full md:w-1/3">
                <img src={listing.imageUrl} alt={listing.name} className="w-full rounded-lg border" />
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Badge>{listing.category}</Badge>
                <span className="text-sm text-gray-500">{listing.brand}</span>
              </div>
              <h1 className="text-3xl font-bold mb-4">{listing.name}</h1>
              <p className="text-gray-600 mb-6">{listing.shortDescription}</p>
              
              <a href={listing.affiliateHoplink} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full md:w-auto bg-orange-600 hover:bg-orange-700">
                  Check Price on ClickBank
                </Button>
              </a>
              {listing.priceDisclaimer && (
                <p className="text-xs text-gray-400 mt-2 italic">{listing.priceDisclaimer}</p>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold mb-3">About this Supplement</h2>
              <div className="prose max-w-none text-gray-700">
                {listing.longDescription}
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section>
                <h3 className="font-bold mb-2">Key Benefits</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {listing.benefits.map((b: string) => <li key={b}>{b}</li>)}
                </ul>
              </section>
              <section>
                <h3 className="font-bold mb-2">Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {listing.ingredients.map((i: string) => (
                    <Badge key={i} variant="secondary">{i}</Badge>
                  ))}
                </div>
              </section>
            </div>

            {listing.warnings.length > 0 && (
              <section className="bg-red-50 p-4 rounded-lg border border-red-100">
                <h3 className="font-bold text-red-800 mb-2">Safety Warnings</h3>
                <ul className="list-disc list-inside space-y-1 text-red-700 text-sm">
                  {listing.warnings.map((w: string) => <li key={w}>{w}</li>)}
                </ul>
              </section>
            )}

            <section className="border-t pt-8 mt-8">
              <div className="bg-gray-100 p-6 rounded-lg text-sm text-gray-600">
                <h4 className="font-bold mb-2">Medical Disclaimer</h4>
                <p>
                  The information provided on this website is for informational purposes only and is not intended as a substitute for advice from your physician or other health care professional. You should not use the information on this site for diagnosis or treatment of any health problem or for prescription of any medication or other treatment.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
