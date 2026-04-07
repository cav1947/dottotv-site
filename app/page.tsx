import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import HeroCarousel from "@/components/HeroCarousel";
import Sidebar from "@/components/Sidebar";
import AdBanner from "@/components/AdBanner";
import ScrollReveal from "@/components/ScrollReveal";
import ParallaxBanner from "@/components/ParallaxBanner";
import {
  getLatestPosts,
  getMostViewedPosts,
  getCategories,
  getPostsByCategory,
} from "@/lib/wordpress";
import { getWeatherConstanta } from "@/lib/weather";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DottoTV - Știri din Constanța și România",
  description: "Cele mai recente știri din Constanța și România. Actualitate, politică, sport, economie și LIVE TV.",
};

export const revalidate = 60;

const SECTION_COLORS: Record<string, string> = {
  sport: "bg-green-600",
  politica: "bg-red-600",
  economie: "bg-orange-500",
  constanta: "bg-cyan-600",
  externe: "bg-purple-600",
};

function SectionHeader({ title, slug, color = "bg-brand-blue" }: { title: string; slug: string; color?: string }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-0">
        <div className={`${color} text-white font-bold text-sm px-3 py-1.5 rounded-l`}>{title}</div>
        <div className={`${color} h-[30px] w-3 [clip-path:polygon(0_0,0_100%,100%_50%)]`} />
      </div>
      <Link href={`/${slug}`} className="text-xs text-gray-500 hover:text-brand-blue transition-colors font-medium">
        Toate știrile →
      </Link>
    </div>
  );
}

export default async function HomePage() {
  const [allPosts, mostViewed, categories, weather, sportPosts, politicaPosts, economiePosts, constanta, externePosts] =
    await Promise.all([
      getLatestPosts(35).catch(() => []),
      getMostViewedPosts(5).catch(() => []),
      getCategories().catch(() => []),
      getWeatherConstanta().catch(() => null),
      getPostsByCategory("sport", 5).catch(() => ({ posts: [] })),
      getPostsByCategory("politica", 5).catch(() => ({ posts: [] })),
      getPostsByCategory("economie", 4).catch(() => ({ posts: [] })),
      getPostsByCategory("constanta", 5).catch(() => ({ posts: [] })),
      getPostsByCategory("externe", 4).catch(() => ({ posts: [] })),
    ]);

  const heroPost = allPosts[0];
  const hero2 = allPosts[1];
  const hero3 = allPosts[2];
  const hero4 = allPosts[3];
  const hero5 = allPosts[4];
  const latestRow = allPosts.slice(5, 9);    // 4 cards
  const latestRow2 = allPosts.slice(9, 13);   // 4 cards
  const latestRow3 = allPosts.slice(13, 17);  // 4 cards

  const carouselPosts = [heroPost, hero2, hero3, hero4, hero5].filter(
    (p): p is NonNullable<typeof p> => !!p
  );

  return (
    <div className="bg-gray-100 dark:bg-gray-950 min-h-screen">

      {/* MOBILE: carousel full-width, în afara containerului */}
      <HeroCarousel posts={carouselPosts} />

      <div className="container mx-auto px-3 py-4 max-w-[1400px]">

        {/* ── TOP AD ── */}
        <div className="mb-4 hidden lg:block">
          <AdBanner slot="homepage-top" width={970} height={90} />
        </div>

        {/* ════════════════════════════════════════════════
            HERO BLOCK — desktop only
        ════════════════════════════════════════════════ */}

        {/* DESKTOP: hero mare + 2 coloane dreapta */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-3 mb-3">
          <div className="lg:col-span-6 xl:col-span-7">
            {heroPost && <ArticleCard post={heroPost} variant="featured" />}
          </div>
          <div className="lg:col-span-3 xl:col-span-3 flex flex-col gap-3">
            {hero2 && <ArticleCard post={hero2} variant="small" />}
            {hero3 && <ArticleCard post={hero3} variant="small" />}
          </div>
          <div className="lg:col-span-3 xl:col-span-2 flex flex-col gap-3">
            {hero4 && <ArticleCard post={hero4} variant="small" />}
            {hero5 && <ArticleCard post={hero5} variant="small" />}
          </div>
        </div>

        {/* ── LATEST ROW 1 (4 carduri) ── */}
        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
            {latestRow.map(p => <ArticleCard key={p.id} post={p} variant="medium" />)}
          </div>
        </ScrollReveal>

        {/* ── AD strip ── */}
        <div className="mb-4">
          <AdBanner slot="homepage-strip" width={728} height={90} />
        </div>

        {/* ════════════════════════════════════════════════
            GRID PRINCIPAL + SIDEBAR
        ════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-4">

          {/* LEFT — conținut principal */}
          <div className="space-y-6">

            {/* ── LATEST ROW 2 ── */}
            <ScrollReveal>
              <div>
                <SectionHeader title="Ultimele Știri" slug="actualitate" color="bg-brand-blue" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {latestRow2.map(p => <ArticleCard key={p.id} post={p} variant="medium" />)}
                </div>
              </div>
            </ScrollReveal>

            {/* ── AD mid — parallax reveal (iese de sub secțiunea de deasupra) ── */}
            <ParallaxBanner />

            {/* ── SPORT + POLITICĂ side by side ── */}
            <ScrollReveal delay={50}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* SPORT */}
                <div>
                  <SectionHeader title="Sport" slug="sport" color={SECTION_COLORS.sport} />
                  <div className="space-y-0">
                    {sportPosts.posts[0] && (
                      <div className="mb-2">
                        <ArticleCard post={sportPosts.posts[0]} variant="large" />
                      </div>
                    )}
                    {sportPosts.posts.slice(1, 4).map(p => (
                      <ArticleCard key={p.id} post={p} variant="horizontal" />
                    ))}
                  </div>
                </div>

                {/* POLITICĂ */}
                <div>
                  <SectionHeader title="Politică" slug="politica" color={SECTION_COLORS.politica} />
                  <div className="space-y-0">
                    {politicaPosts.posts[0] && (
                      <div className="mb-2">
                        <ArticleCard post={politicaPosts.posts[0]} variant="large" />
                      </div>
                    )}
                    {politicaPosts.posts.slice(1, 4).map(p => (
                      <ArticleCard key={p.id} post={p} variant="horizontal" />
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* ── LATEST ROW 3 (4 carduri) ── */}
            <ScrollReveal delay={100}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {latestRow3.map(p => <ArticleCard key={p.id} post={p} variant="medium" />)}
              </div>
            </ScrollReveal>

            {/* ── CONSTANȚA ── */}
            {constanta.posts.length > 0 && (
              <ScrollReveal delay={120}>
                <div>
                  <SectionHeader title="Constanța" slug="constanta" color={SECTION_COLORS.constanta} />
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                    {constanta.posts[0] && (
                      <div className="md:col-span-5">
                        <ArticleCard post={constanta.posts[0]} variant="large" />
                      </div>
                    )}
                    <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {constanta.posts.slice(1, 5).map(p => (
                        <ArticleCard key={p.id} post={p} variant="small" />
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* ── ECONOMIE + EXTERNE side by side ── */}
            <ScrollReveal delay={150}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <SectionHeader title="Economie" slug="economie" color={SECTION_COLORS.economie} />
                  <div className="space-y-2">
                    {economiePosts.posts.slice(0, 4).map(p => (
                      <ArticleCard key={p.id} post={p} variant="horizontal" />
                    ))}
                  </div>
                </div>
                <div>
                  <SectionHeader title="Externe" slug="externe" color={SECTION_COLORS.externe} />
                  <div className="space-y-2">
                    {externePosts.posts.slice(0, 4).map(p => (
                      <ArticleCard key={p.id} post={p} variant="horizontal" />
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* ── LIVE TV PROMO ── */}
            <ScrollReveal delay={180}>
              <Link href="/live" className="group block relative overflow-hidden rounded-xl bg-gradient-to-r from-gray-900 to-brand-blue-dark p-6 text-white hover:shadow-2xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-red-400 font-bold text-sm uppercase tracking-wider">Acum LIVE</span>
                    </div>
                    <h3 className="font-playfair font-bold text-2xl md:text-3xl">
                      DottoTV în Direct
                    </h3>
                    <p className="text-gray-300 text-sm mt-1">
                      Urmărește știrile în direct din Constanța și România
                    </p>
                  </div>
                  <div className="hidden md:flex items-center justify-center w-20 h-20 bg-red-600 rounded-full group-hover:scale-110 transition-transform">
                    <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </Link>
            </ScrollReveal>

            {/* ── BOTTOM AD ── */}
            <ScrollReveal delay={200}>
              <AdBanner slot="homepage-bottom" width={970} height={90} />
            </ScrollReveal>
          </div>

          {/* ── SIDEBAR ── */}
          <aside className="space-y-4">
            <div className="sticky top-20">
              <Sidebar
                mostViewed={mostViewed}
                categories={categories}
                weather={weather}
                latestPosts={allPosts.slice(0, 6)}
              />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
