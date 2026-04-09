import Link from "next/link";
import ArticleCard from "./ArticleCard";
import WeatherWidget from "./WeatherWidget";
import AdBanner from "./AdBanner";
import type { Post, Category } from "@/lib/wordpress";
import type { WeatherData } from "@/lib/weather";

interface Props {
  mostViewed: Post[];
  categories: Category[];
  weather: WeatherData | null;
  latestPosts?: Post[];
  evenimentePosts?: Post[];
}

const CAT_COLORS: Record<string, string> = {
  actualitate: "bg-blue-600",
  politica: "bg-red-600",
  sport: "bg-green-600",
  economie: "bg-orange-500",
  externe: "bg-purple-600",
  sanatate: "bg-teal-600",
  constanta: "bg-cyan-600",
  interne: "bg-indigo-600",
};

export default function Sidebar({ mostViewed, categories, weather, latestPosts, evenimentePosts }: Props) {
  return (
    <aside className="space-y-4">
      {/* Weather Widget */}
      {weather && <WeatherWidget weather={weather} />}

      {/* EKARA — sidebar banner */}
      <a href="#" rel="noopener noreferrer sponsored" aria-label="Publicitate EKARA" className="block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/ads/EKARA.webp"
          alt="Publicitate"
          className="w-full h-auto block rounded-lg"
        />
      </a>

      {/* Evenimente */}
      {evenimentePosts && evenimentePosts.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm">
          <div className="flex items-center gap-2 px-3 py-2.5 bg-brand-blue">
            <svg className="w-4 h-4 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="font-bold text-white text-xs uppercase tracking-wider">Evenimente</h3>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {evenimentePosts.map((post) => (
              <div key={post.id} className="p-3 group hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                <Link href={`/articol/${post.slug}`}>
                  <h4
                    className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-brand-blue line-clamp-2 leading-snug transition-colors"
                    dangerouslySetInnerHTML={{ __html: post.title }}
                  />
                </Link>
                <p className="text-[10px] text-gray-400 mt-0.5">
                  {new Date(post.date).toLocaleDateString("ro-RO", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Categorii cu badge-uri colorate */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm">
        <div className="flex items-center gap-2 px-3 py-2.5 border-b border-gray-100 dark:border-gray-700">
          <h3 className="font-bold text-gray-800 dark:text-white text-xs uppercase tracking-wider">📰 Categorii</h3>
        </div>
        <div className="p-3 flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/${cat.slug}`}
              className={`inline-flex items-center gap-1 ${CAT_COLORS[cat.slug] || "bg-brand-blue"} hover:opacity-80 text-white text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wide transition-opacity`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Ultimele Știri compact */}
      {latestPosts && latestPosts.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-3 py-2.5 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <h3 className="font-bold text-gray-800 dark:text-white text-xs uppercase tracking-wider">Live Feed</h3>
            </div>
          </div>
          <div className="p-2">
            {latestPosts.map((post) => (
              <ArticleCard key={post.id} post={post} variant="list" />
            ))}
          </div>
        </div>
      )}

      {/* Second Ad */}
      <AdBanner slot="sidebar-bottom" width={300} height={600} />
    </aside>
  );
}
