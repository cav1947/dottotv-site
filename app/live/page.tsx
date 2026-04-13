import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getLatestPosts } from "@/lib/wordpress";
import { getTVSchedule } from "@/lib/tv-schedule";
import HLSPlayerWrapper from "@/components/HLSPlayerWrapper";
import TVSchedule from "@/components/TVSchedule";
import { SITE_URL, broadcastServiceSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "LIVE TV - DottoTV",
  description: "Urmărește DottoTV LIVE. Știri în direct din Constanța și România.",
  alternates: { canonical: `${SITE_URL}/live` },
  openGraph: {
    siteName: "DOTTO TV",
    title: "LIVE TV | DOTTO TV",
    description: "Urmărește DottoTV LIVE. Știri în direct din Constanța și România.",
    url: `${SITE_URL}/live`,
    type: "website",
    locale: "ro_RO",
    images: [{ url: `${SITE_URL}/images/og-default.jpg`, width: 1200, height: 630, alt: "DOTTO TV – LIVE TV" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@dottotv",
    title: "LIVE TV | DOTTO TV",
    description: "Urmărește DottoTV LIVE. Știri în direct din Constanța și România.",
    images: [`${SITE_URL}/images/og-default.jpg`],
  },
};

// Revalidare la 30 de minute — sincronizat cu fetch-ul programului TV
export const revalidate = 1800;

export default async function LivePage() {
  const [latestPosts, schedule] = await Promise.all([
    getLatestPosts(6).catch(() => []),
    getTVSchedule(),
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(broadcastServiceSchema) }} />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

        {/* ═══════════════════════════════════════
            HERO — player în fundal închis
        ═══════════════════════════════════════ */}
        <section className="bg-gray-950">
          <div className="container mx-auto px-4 max-w-[1200px] py-6">

            {/* Titlu + badge LIVE */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full shadow-lg shadow-red-600/30">
                <span className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
                <span className="font-bold text-sm tracking-wide">LIVE</span>
              </div>
              <h1 className="font-playfair font-bold text-2xl md:text-3xl text-white">
                DOTTO TV în direct
              </h1>
            </div>

            {/* Player */}
            <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-white/10">
              <HLSPlayerWrapper />
            </div>

          </div>
        </section>

        {/* ═══════════════════════════════════════
            CONȚINUT — program TV + știri
        ═══════════════════════════════════════ */}
        <div className="container mx-auto px-4 max-w-[1200px] py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">

            {/* ── Program TV ── */}
            <div>
              <TVSchedule schedule={schedule ?? []} />
            </div>

            {/* ── Ultimele știri ── */}
            <aside>
              <div className="sticky top-20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-6 bg-red-500 rounded-full" />
                  <h2 className="font-playfair font-bold text-xl text-gray-900 dark:text-white">
                    Ultimele știri
                  </h2>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm divide-y divide-gray-100 dark:divide-gray-800">
                  {latestPosts.map((post) => {
                    const imageUrl = post.featuredImage?.node?.sourceUrl;
                    const category = post.categories?.nodes?.[0];
                    return (
                      <article
                        key={post.id}
                        className="flex gap-3 p-4 group hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors"
                      >
                        {imageUrl && (
                          <Link href={`/articol/${post.slug}`} className="flex-shrink-0">
                            <div className="relative w-24 h-16 rounded-lg overflow-hidden">
                              <Image
                                src={imageUrl}
                                alt={post.featuredImage?.node?.altText || post.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                sizes="96px"
                              />
                            </div>
                          </Link>
                        )}
                        <div className="flex-1 min-w-0">
                          {category && (
                            <span className="text-[10px] font-bold text-brand-blue uppercase tracking-wide">
                              {category.name}
                            </span>
                          )}
                          <Link href={`/articol/${post.slug}`}>
                            <h3
                              className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-brand-blue dark:group-hover:text-brand-blue line-clamp-3 leading-snug mt-0.5 transition-colors"
                              dangerouslySetInnerHTML={{ __html: post.title }}
                            />
                          </Link>
                        </div>
                      </article>
                    );
                  })}
                </div>

                <Link
                  href="/"
                  className="flex items-center justify-center gap-2 mt-4 w-full py-3 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white text-sm font-semibold transition-colors"
                >
                  Toate știrile →
                </Link>
              </div>
            </aside>

          </div>
        </div>
      </div>
    </>
  );
}
