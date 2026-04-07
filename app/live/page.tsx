import type { Metadata } from "next";
import Link from "next/link";
import { getLatestPosts, getMostViewedPosts, getCategories } from "@/lib/wordpress";
import { getWeatherConstanta } from "@/lib/weather";
import Sidebar from "@/components/Sidebar";
import ArticleCard from "@/components/ArticleCard";
import AdBanner from "@/components/AdBanner";
import ScrollReveal from "@/components/ScrollReveal";
import LiveTVPlayerWrapper from "@/components/LiveTVPlayerWrapper";

export const metadata: Metadata = {
  title: "LIVE TV - DottoTV",
  description:
    "Urmărește DottoTV LIVE. Știri în direct din Constanța și România.",
  openGraph: {
    title: "LIVE TV | DottoTV",
    description: "Urmărește DottoTV LIVE. Știri în direct.",
  },
};

export const revalidate = 60;

export default async function LivePage() {
  const [latestPosts, mostViewed, categories, weather] = await Promise.all([
    getLatestPosts(6).catch(() => []),
    getMostViewedPosts(5).catch(() => []),
    getCategories().catch(() => []),
    getWeatherConstanta().catch(() => null),
  ]);

  return (
    <div className="container mx-auto px-4 py-6">
      <ScrollReveal>
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full">
            <span className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
            <span className="font-bold text-sm">LIVE TV</span>
          </div>
          <h1 className="font-playfair font-bold text-2xl text-gray-900 dark:text-white">
            DottoTV în Direct
          </h1>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Player */}
          <ScrollReveal>
            <LiveTVPlayerWrapper />
          </ScrollReveal>

          {/* Stream info */}
          <ScrollReveal delay={100}>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
              <h2 className="font-playfair font-bold text-lg text-gray-900 dark:text-white mb-2">
                📺 DottoTV - Televiziunea Constanței
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Urmărești DottoTV în direct — televiziunea cu cele mai importante știri
                din Constanța, Dobrogea și România. Emisiuni live, interviuri și
                reportaje în timp real.
              </p>
              <div className="flex flex-wrap gap-3 mt-4">
                <span className="text-xs bg-brand-blue/10 text-brand-blue px-3 py-1.5 rounded-full">
                  📍 Constanța, România
                </span>
                <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-3 py-1.5 rounded-full">
                  🔴 Transmisie 24/7
                </span>
                <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-3 py-1.5 rounded-full">
                  📺 HD Stream
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Ad */}
          <ScrollReveal delay={150}>
            <AdBanner slot="live-page-mid" width={728} height={90} />
          </ScrollReveal>

          {/* Latest news while watching */}
          {latestPosts.length > 0 && (
            <ScrollReveal delay={200}>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-6 bg-brand-blue rounded-full" />
                  <h2 className="font-playfair font-bold text-xl text-gray-900 dark:text-white">
                    Urmărește și citește
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {latestPosts.map((post) => (
                    <ArticleCard key={post.id} post={post} variant="medium" />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <Sidebar
              mostViewed={mostViewed}
              categories={categories}
              weather={weather}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
