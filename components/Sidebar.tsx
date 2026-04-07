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

export default function Sidebar({ mostViewed, categories, weather, latestPosts }: Props) {
  return (
    <aside className="space-y-4">
      {/* Weather Widget */}
      {weather && <WeatherWidget weather={weather} />}

      {/* Ad Banner Sidebar */}
      <AdBanner slot="sidebar-top" width={300} height={250} />

      {/* Top Citite */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm">
        <div className="flex items-center gap-2 px-3 py-2.5 bg-brand-blue">
          <svg className="w-4 h-4 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
          </svg>
          <h3 className="font-bold text-white text-xs uppercase tracking-wider">🔥 Top Citite</h3>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {mostViewed.map((post, index) => (
            <div key={post.id} className="flex gap-2.5 p-3 group hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
              <span className={`flex-shrink-0 w-6 h-6 rounded text-white text-xs font-bold flex items-center justify-center ${index === 0 ? "bg-red-500" : index === 1 ? "bg-orange-500" : index === 2 ? "bg-yellow-500" : "bg-gray-400"}`}>
                {index + 1}
              </span>
              <div className="flex-1 min-w-0">
                <Link href={`/articol/${post.slug}`}>
                  <h4 className="text-xs font-semibold text-gray-800 dark:text-gray-200 group-hover:text-brand-blue line-clamp-2 leading-snug transition-colors"
                    dangerouslySetInnerHTML={{ __html: post.title }} />
                </Link>
                <p className="text-[10px] text-gray-400 mt-0.5">
                  {new Date(post.date).toLocaleDateString("ro-RO", { day: "numeric", month: "short" })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

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
              <span className="opacity-70 font-normal">({cat.count})</span>
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
