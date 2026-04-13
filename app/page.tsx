import Link from "next/link";
import Image from "next/image";
import ArticleCard from "@/components/ArticleCard";
import HeroCarousel from "@/components/HeroCarousel";
import Sidebar from "@/components/Sidebar";
import ScrollReveal from "@/components/ScrollReveal";
import ParallaxBanner from "@/components/ParallaxBanner";
import {
  getLatestPosts,
  getCategories,
  getPostsByCategory,
} from "@/lib/wordpress";
import { getWeatherConstanta } from "@/lib/weather";
import { websiteSchema, SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DOTTO TV - Știri din Constanța și Dobrogea",
  description: "Televiziunea locală a județului Constanța. Știri corecte, rapide și imparțiale din Dobrogea. Urmărește LIVE TV.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: SITE_URL,
    languages: { "ro-RO": SITE_URL },
  },
  openGraph: {
    siteName: "DOTTO TV",
    title: "DOTTO TV – Știri din Constanța și Dobrogea",
    description: "Televiziunea locală a județului Constanța. Știri corecte, rapide și imparțiale din Dobrogea. Urmărește LIVE TV.",
    url: SITE_URL,
    locale: "ro_RO",
    type: "website",
    images: [{ url: `${SITE_URL}/images/og-default.jpg`, width: 1200, height: 630, alt: "DOTTO TV – Televiziunea Dobrogei" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@dottotv",
    title: "DOTTO TV – Știri din Constanța și Dobrogea",
    description: "Televiziunea locală a județului Constanța. Urmărește LIVE TV.",
    images: [`${SITE_URL}/images/og-default.jpg`],
  },
};

export const revalidate = 60;

const SECTION_COLORS: Record<string, string> = {
  sport: "bg-green-600",
  politica: "bg-red-600",
  economie: "bg-orange-500",
  constanta: "bg-cyan-600",
  externe: "bg-purple-600",
  sanatate: "bg-teal-600",
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
  const [allPosts, categories, weather, sportPosts, politicaPosts, sanatateaLaZiPosts, constanta,
    externeLatest, interneLatest, utilitareLatest, culturaLatest, evenimentePosts, breakingPosts] =
    await Promise.all([
      getLatestPosts(35).catch(() => []),
      getCategories().catch(() => []),
      getWeatherConstanta().catch(() => null),
      getPostsByCategory("sport", 5).catch(() => ({ posts: [] })),
      getPostsByCategory("politica", 5).catch(() => ({ posts: [] })),
      getPostsByCategory("sanatate", 4).catch(() => ({ posts: [] })),
      getPostsByCategory("constanta", 5).catch(() => ({ posts: [] })),
      getPostsByCategory("externe", 3).catch(() => ({ posts: [] })),
      getPostsByCategory("interne", 3).catch(() => ({ posts: [] })),
      getPostsByCategory("utilitare", 5).catch(() => ({ posts: [] })),
      getPostsByCategory("cultura", 1).catch(() => ({ posts: [] })),
      getPostsByCategory("evenimente", 5).catch(() => ({ posts: [] })),
      getPostsByCategory("breaking", 10).catch(() => ({ posts: [] })),
    ]);

  // Elimină duplicate după id — același articol poate fi în mai multe categorii
  function dedup<T extends { id: string }>(arr: T[]): T[] {
    const seen = new Set<string>();
    return arr.filter((p) => {
      if (seen.has(p.id)) return false;
      seen.add(p.id);
      return true;
    });
  }

  const uniquePosts        = dedup(allPosts);
  const sportUnique        = dedup(sportPosts.posts);
  const politicaUnique     = dedup(politicaPosts.posts);
  const constanțaUnique    = dedup(constanta.posts);
  const sanatateUnique     = dedup(sanatateaLaZiPosts.posts);
  const utilitareUnique    = dedup(utilitareLatest.posts);

  // Logică sticky: dacă există un articol cu isSticky: true în breaking, îl punem primul
  const breakingList = breakingPosts.posts;
  const stickyIndex = breakingList.findIndex((p) => p.isSticky);
  let heroPosts: typeof breakingList;
  if (stickyIndex > 0) {
    const sticky = breakingList[stickyIndex];
    const rest = breakingList.filter((_, i) => i !== stickyIndex);
    heroPosts = [sticky, ...rest].slice(0, 5);
  } else {
    heroPosts = breakingList.slice(0, 5);
  }

  const heroPost = heroPosts[0];
  const hero2 = heroPosts[1];
  const hero3 = heroPosts[2];
  const hero4 = heroPosts[3];
  const hero5 = heroPosts[4];
  const latestRow = uniquePosts.slice(5, 9);

  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
    <div className="bg-gray-100 dark:bg-gray-950 min-h-screen">

      {/* MOBILE: carousel full-width, în afara containerului */}
      <HeroCarousel posts={heroPosts} />

      <div className="container mx-auto px-3 py-4 max-w-[1400px]">

        {/* ── TOP AD — VIVO CT ── */}
        <div
          className="mb-4 flex justify-center items-center py-2 rounded-xl"
          style={{ background: "linear-gradient(135deg, #f0f4ff 0%, #e8f0fe 50%, #f5f7ff 100%)" }}
        >
          <a href="https://vivo-shopping.com/ro/constanta" target="_blank" rel="noopener noreferrer sponsored" aria-label="Publicitate VIVO CT" className="block w-full md:w-auto md:flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/ads/VIVO_CT_LOCAL-DISPLAY_728x90px.gif"
              alt="Publicitate"
              width={728}
              height={90}
              style={{ display: "block", objectFit: "contain" }}
              className="w-full h-auto md:w-[728px] md:h-[90px]"
            />
          </a>
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

        {/* ── AD strip — Confort Urban ── */}
        <div
          className="mb-4 flex justify-center items-center py-2 rounded-xl"
          style={{ background: "linear-gradient(135deg, #f0f4ff 0%, #e8f0fe 50%, #f5f7ff 100%)" }}
        >
          <a href="https://conforturban-ct.ro/" target="_blank" rel="noopener noreferrer sponsored" aria-label="Publicitate Confort Urban" className="block w-full md:w-auto md:flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/ads/Confort%20urban728x90.webp"
              alt="Publicitate"
              width={728}
              height={90}
              style={{ display: "block", objectFit: "contain" }}
              className="w-full h-auto md:w-[728px] md:h-[90px]"
            />
          </a>
        </div>

        {/* ════════════════════════════════════════════════
            GRID PRINCIPAL + SIDEBAR
        ════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-4">

          {/* LEFT — conținut principal */}
          <div className="space-y-6">

            {/* ── ULTIMELE ȘTIRI (câte 1 din: Externe, Interne, Utilitare, Cultură) ── */}
            <ScrollReveal>
              <div>
                <SectionHeader title="Ultimele Știri" slug="actualitate" color="bg-brand-blue" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { post: externeLatest.posts[0],   label: "Externe",   slug: "externe" },
                    { post: interneLatest.posts[0],   label: "Interne",   slug: "interne" },
                    { post: utilitareLatest.posts[0], label: "Utilitare", slug: "utilitare" },
                    { post: culturaLatest.posts[0],   label: "Cultură",   slug: "cultura" },
                  ].map(({ post, label, slug }) =>
                    post ? (
                      // key pe slug (nu post.id) — garantat unic chiar dacă același articol e în 2 categorii
                      <ArticleCard key={slug} post={post} variant="medium" />
                    ) : (
                      <div
                        key={slug}
                        className="bg-white dark:bg-gray-900 rounded-xl border border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center gap-2 p-6 min-h-[180px] text-center"
                      >
                        <svg className="w-7 h-7 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11v4M12 7h.01" />
                        </svg>
                        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500">{label}</p>
                        <p className="text-[11px] text-gray-300 dark:text-gray-600">Niciun articol</p>
                      </div>
                    )
                  )}
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
                    {sportUnique[0] && (
                      <div className="mb-2">
                        <ArticleCard post={sportUnique[0]} variant="large" />
                      </div>
                    )}
                    {sportUnique.slice(1, 4).map(p => (
                      <ArticleCard key={p.id} post={p} variant="horizontal" />
                    ))}
                  </div>
                </div>

                {/* POLITICĂ */}
                <div>
                  <SectionHeader title="Politică" slug="politica" color={SECTION_COLORS.politica} />
                  <div className="space-y-0">
                    {politicaUnique[0] && (
                      <div className="mb-2">
                        <ArticleCard post={politicaUnique[0]} variant="large" />
                      </div>
                    )}
                    {politicaUnique.slice(1, 4).map(p => (
                      <ArticleCard key={p.id} post={p} variant="horizontal" />
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* ── EXTERNE (2) + INTERNE (2) — fără duplicat față de Ultimele Știri ── */}
            <ScrollReveal delay={100}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {dedup([
                  ...externeLatest.posts.slice(1, 3),
                  ...interneLatest.posts.slice(1, 3),
                ]).map(p => <ArticleCard key={p.id} post={p} variant="medium" />)}
              </div>
            </ScrollReveal>

            {/* ── CONSTANȚA ── */}
            {constanțaUnique.length > 0 && (
              <ScrollReveal delay={120}>
                <div>
                  <SectionHeader title="Constanța" slug="constanta" color={SECTION_COLORS.constanta} />
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                    {constanțaUnique[0] && (
                      <div className="md:col-span-5">
                        <ArticleCard post={constanțaUnique[0]} variant="large" />
                      </div>
                    )}
                    <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {constanțaUnique.slice(1, 5).map(p => (
                        <ArticleCard key={p.id} post={p} variant="small" />
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* ── SĂNĂTATEA LA ZI + UTILITARE side by side ── */}
            <ScrollReveal delay={150}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <SectionHeader title="Sănătatea la Zi" slug="sanatate" color={SECTION_COLORS.sanatate} />
                  <div className="space-y-2">
                    {sanatateUnique.slice(0, 4).map(p => (
                      <ArticleCard key={p.id} post={p} variant="horizontal" />
                    ))}
                  </div>
                </div>
                <div>
                  <SectionHeader title="Utilitare" slug="utilitare" color="bg-amber-600" />
                  <div className="space-y-2">
                    {/* slice(1) exclude primul articol deja afișat în Ultimele Știri */}
                    {utilitareUnique.slice(1, 5).map(p => (
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
                      DOTTO TV în direct
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

            {/* ── BANNER SANSELO ── */}
            <ScrollReveal delay={200}>
              <a
                href="https://www.sanselo.com"
                target="_blank"
                rel="noopener noreferrer sponsored"
                aria-label="Publicitate Sanselo"
                className="block group"
              >
                <div className="relative rounded-xl overflow-hidden" style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #111827 50%, #0d1117 100%)" }}>
                  {/* Decorative blobs */}
                  <div className="absolute -left-8 -top-8 w-40 h-40 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #2ea3f2, transparent)" }} />
                  <div className="absolute right-1/3 -bottom-10 w-32 h-32 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #2ea3f2, transparent)" }} />

                  <div className="relative flex flex-col sm:flex-row items-center gap-4 sm:gap-6 px-6 py-5 sm:py-4">

                    {/* Logo */}
                    <div className="flex-shrink-0">
                      <Image
                        src="/sanselo_logo.png"
                        alt="Sanselo Web Solutions"
                        width={160}
                        height={48}
                        className="object-contain"
                        style={{ filter: "brightness(1.1)" }}
                      />
                    </div>

                    {/* Divider */}
                    <div className="hidden sm:block w-px h-10 bg-white/10 flex-shrink-0" />

                    {/* Tagline + services */}
                    <div className="flex-1 text-center sm:text-left">
                      <p className="text-white font-bold text-sm sm:text-base leading-tight">
                        The Future of your Business
                      </p>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-x-3 gap-y-0.5 mt-1">
                        {["Web Design", "Mobile Apps", "UX/UI", "Branding", "Marketing Digital"].map((s) => (
                          <span key={s} className="text-[10px] text-white/50 font-medium">{s}</span>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex-shrink-0 flex flex-col items-center sm:items-end gap-1">
                      <span
                        className="px-5 py-2 rounded-lg text-white font-bold text-sm transition-all group-hover:brightness-110 group-hover:scale-105"
                        style={{ background: "#2ea3f2" }}
                      >
                        Descoperă →
                      </span>
                      <span className="text-[9px] text-white/30 uppercase tracking-wider">publicitate</span>
                    </div>
                  </div>
                </div>
              </a>
            </ScrollReveal>
          </div>

          {/* ── SIDEBAR ── */}
          <aside className="space-y-4">
            <div className="sticky top-20">
              <Sidebar
                categories={categories}
                weather={weather}
                latestPosts={uniquePosts.slice(0, 6)}
                evenimentePosts={evenimentePosts.posts}
              />
            </div>
          </aside>
        </div>
      </div>
    </div>
    </>
  );
}
