import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getCategoryBySlug, getPostsByCategory } from "@/lib/wordpress";
import AdBanner from "@/components/AdBanner";
import CategoryInfiniteGrid from "@/components/CategoryInfiniteGrid";
import { SITE_URL, buildBreadcrumbSchema } from "@/lib/seo";

const RESERVED_SLUGS = ["live", "cautare", "articol", "despre-noi", "contact", "sitemap.xml"];

// Gradient per categorie pentru header
const HEADER_GRADIENTS: Record<string, string> = {
  actualitate:  "linear-gradient(135deg, #1e3a6e 0%, #3c68b2 100%)",
  news:         "linear-gradient(135deg, #1e3a6e 0%, #2d5090 100%)",
  sport:        "linear-gradient(135deg, #14532d 0%, #16a34a 100%)",
  politica:     "linear-gradient(135deg, #7f1d1d 0%, #dc2626 100%)",
  externe:      "linear-gradient(135deg, #3b0764 0%, #7c3aed 100%)",
  sanatate:     "linear-gradient(135deg, #042f2e 0%, #0d9488 100%)",
  interne:      "linear-gradient(135deg, #1e1b4b 0%, #4f46e5 100%)",
  economie:     "linear-gradient(135deg, #7c2d12 0%, #f97316 100%)",
  cultura:      "linear-gradient(135deg, #4a1942 0%, #a855f7 100%)",
  meteo:        "linear-gradient(135deg, #0c4a6e 0%, #0284c7 100%)",
};
const DEFAULT_GRADIENT = "linear-gradient(135deg, #2d5090 0%, #3c68b2 100%)";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categorySlug } = await params;
  if (RESERVED_SLUGS.includes(categorySlug)) return {};

  const category = await getCategoryBySlug(categorySlug).catch(() => null);
  if (!category) return { title: "Categorie negăsită" };

  const catUrl = `${SITE_URL}/${categorySlug}`;
  const desc =
    category.description ||
    `Ultimele știri din categoria ${category.name} — DOTTO TV, televiziunea locală a județului Constanța.`;

  return {
    title: `${category.name} – Ultimele Știri | DOTTO TV`,
    description: desc,
    robots: { index: true, follow: true },
    alternates: {
      canonical: catUrl,
      languages: { "ro-RO": catUrl },
    },
    openGraph: {
      siteName: "DOTTO TV",
      title: `${category.name} | DOTTO TV`,
      description: desc,
      url: catUrl,
      type: "website",
      locale: "ro_RO",
    },
    twitter: {
      card: "summary",
      site: "@dottotv",
      title: `${category.name} | DOTTO TV`,
      description: desc,
    },
  };
}

export const revalidate = 120;

export default async function CategoryPage({ params }: Props) {
  const { category: categorySlug } = await params;

  if (RESERVED_SLUGS.includes(categorySlug)) notFound();

  const [category, { posts, pageInfo }] = await Promise.all([
    getCategoryBySlug(categorySlug).catch(() => null),
    getPostsByCategory(categorySlug, 12).catch(() => ({
      posts: [],
      pageInfo: { hasNextPage: false, endCursor: "" },
    })),
  ]);

  if (!category) notFound();

  const gradient = HEADER_GRADIENTS[categorySlug] ?? DEFAULT_GRADIENT;

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Acasă", url: SITE_URL },
    { name: category.name, url: `${SITE_URL}/${categorySlug}` },
  ]);

  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

      {/* ── HEADER CATEGORIE ── */}
      <div style={{ background: gradient }} className="relative overflow-hidden">
        {/* Pattern decorativ */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        <div className="relative container mx-auto px-4 max-w-[1200px] py-10 md:py-14">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-5">
            <Link href="/" className="hover:text-white transition-colors">Acasă</Link>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white font-medium">{category.name}</span>
          </nav>

          {/* Nume categorie */}
          <h1 className="font-playfair font-bold text-4xl md:text-6xl text-white leading-tight mb-3">
            {category.name}
          </h1>

          {/* Descriere dacă există */}
          {category.description && (
            <p className="text-white/70 text-base md:text-lg max-w-xl leading-relaxed">
              {category.description}
            </p>
          )}

          {/* Număr articole */}
          <div className="flex items-center gap-3 mt-5">
            <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              Cele mai recente știri
            </div>
            <div className="flex items-center gap-1.5 text-white/60 text-sm">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              Actualizat continuu
            </div>
          </div>
        </div>
      </div>

      {/* ── CONȚINUT ── */}
      <div className="container mx-auto px-4 max-w-[1200px] py-8">

        {/* Ad top */}
        <div className="mb-8">
          <AdBanner slot={`category-${categorySlug}-top`} width={728} height={90} />
        </div>

        {/* Grid cu infinite scroll */}
        <CategoryInfiniteGrid
          initialPosts={posts}
          initialPageInfo={pageInfo}
          categorySlug={categorySlug}
        />
      </div>
    </div>
    </>
  );
}
