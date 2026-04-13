import Link from "next/link";
import Image from "next/image";
import ArticleCard from "./ArticleCard";
import WeatherWidget from "./WeatherWidget";
import type { Post, Category } from "@/lib/wordpress";
import type { WeatherData } from "@/lib/weather";

interface Props {
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

export default function Sidebar({ categories, weather, latestPosts, evenimentePosts }: Props) {
  return (
    <aside className="space-y-4">
      {/* Weather Widget */}
      {weather && <WeatherWidget weather={weather} />}

      {/* EKARA — sidebar banner */}
      <a href="https://ekara.ro/" target="_blank" rel="noopener noreferrer sponsored" aria-label="Publicitate EKARA" className="block">
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

      {/* Via Dobrogetica — 300×600 */}
      <a
        href="https://viadobrogetica.ro"
        target="_blank"
        rel="noopener noreferrer sponsored"
        aria-label="Publicitate Via Dobrogetica"
        className="block group"
      >
        <div
          className="relative rounded-xl overflow-hidden flex flex-col"
          style={{
            background: "linear-gradient(180deg, #0c1a0c 0%, #1b2f14 25%, #243b1a 55%, #1a2a12 80%, #111a0b 100%)",
            minHeight: 600,
          }}
        >
          {/* Decorative glow top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full opacity-20 pointer-events-none"
            style={{ background: "radial-gradient(circle, #c0392b, transparent)" }} />

          {/* Decorative hills silhouette */}
          <svg className="absolute bottom-0 left-0 w-full opacity-10 pointer-events-none" viewBox="0 0 300 120" preserveAspectRatio="none">
            <path d="M0,120 L0,80 Q30,40 60,60 Q90,80 120,50 Q150,20 180,45 Q210,70 240,40 Q270,10 300,35 L300,120 Z" fill="#4a7c3f" />
            <path d="M0,120 L0,95 Q50,70 100,80 Q150,90 200,65 Q250,40 300,60 L300,120 Z" fill="#2d5a1e" />
          </svg>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center px-5 pt-8 pb-7 h-full" style={{ minHeight: 600 }}>

            {/* Logo */}
            <div className="bg-white shadow-xl shadow-black/40 mb-5 overflow-hidden" style={{ borderRadius: "50%", width: 96, height: 96 }}>
              <Image
                src="/logo%20viadobrogetica%201024PX.png"
                alt="Via DobroGetica"
                width={96}
                height={96}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Title */}
            <h3 className="font-playfair font-bold text-white text-center text-xl leading-tight mb-1">
              Via DobroGetica
            </h3>
            <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: "#c0392b" }}>
              Pași prin istorie!
            </p>

            {/* Divider */}
            <div className="w-10 h-px mb-5" style={{ background: "#c0392b" }} />

            {/* Description */}
            <p className="text-white/75 text-sm text-center leading-relaxed mb-6">
              Descoperă poveștile autentice ale Dobrogei — biserici vechi, sate tradiționale, oameni și obiceiuri care definesc acest loc unic.
            </p>

            {/* Features */}
            <div className="w-full space-y-2.5 mb-7">
              {[
                { icon: "🗺️", text: "5 trasee culturale" },
                { icon: "🏛️", text: "Situri arheologice" },
                { icon: "📍", text: "Plecare din Constanța" },
                { icon: "📱", text: "Aplicație mobilă" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                  <span className="text-base flex-shrink-0">{icon}</span>
                  <span className="text-white/80 text-xs font-medium">{text}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-auto w-full">
              <span
                className="block w-full text-center text-white font-bold text-sm py-3 rounded-xl transition-all group-hover:brightness-110 group-hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg, #c0392b 0%, #e74c3c 100%)" }}
              >
                Explorează rutele →
              </span>
              <p className="text-white/25 text-[9px] uppercase tracking-wider text-center mt-2">publicitate</p>
            </div>
          </div>
        </div>
      </a>
    </aside>
  );
}
