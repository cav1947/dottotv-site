import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  getCategoryBySlug,
  getPostsByCategory,
  getMostViewedPosts,
  getCategories,
} from "@/lib/wordpress";
import { getWeatherConstanta } from "@/lib/weather";
import ArticleCard from "@/components/ArticleCard";
import Sidebar from "@/components/Sidebar";
import AdBanner from "@/components/AdBanner";
import ScrollReveal from "@/components/ScrollReveal";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dottotv.ro";

// Sluguri rezervate (nu sunt categorii)
const RESERVED_SLUGS = ["live", "cautare", "articol", "despre-noi", "contact", "sitemap.xml"];

interface Props {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ pagina?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categorySlug } = await params;
  if (RESERVED_SLUGS.includes(categorySlug)) return {};

  const category = await getCategoryBySlug(categorySlug).catch(() => null);
  if (!category) return { title: "Categorie negăsită" };

  return {
    title: `${category.name} - Știri | DottoTV`,
    description:
      category.description ||
      `Cele mai recente știri din categoria ${category.name} pe DottoTV.`,
    openGraph: {
      title: `${category.name} | DottoTV`,
      url: `${SITE_URL}/${categorySlug}`,
    },
    alternates: {
      canonical: `${SITE_URL}/${categorySlug}`,
    },
  };
}

export const revalidate = 120;

export default async function CategoryPage({ params, searchParams }: Props) {
  const { category: categorySlug } = await params;
  const { pagina } = await searchParams;

  if (RESERVED_SLUGS.includes(categorySlug)) notFound();

  const page = Number(pagina) || 1;
  const postsPerPage = 12;

  const [category, mostViewed, categories, weather] = await Promise.all([
    getCategoryBySlug(categorySlug).catch(() => null),
    getMostViewedPosts(5).catch(() => []),
    getCategories().catch(() => []),
    getWeatherConstanta().catch(() => null),
  ]);

  if (!category) notFound();

  const { posts, pageInfo } = await getPostsByCategory(
    categorySlug,
    postsPerPage
  ).catch(() => ({ posts: [], pageInfo: { hasNextPage: false, endCursor: "" } }));

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Category header */}
      <ScrollReveal>
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-brand-blue transition-colors">
              Acasă
            </Link>
            <span>/</span>
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              {category.name}
            </span>
          </nav>

          <div className="flex items-center gap-4">
            <div className="w-1.5 h-10 bg-brand-blue rounded-full" />
            <div>
              <h1 className="font-playfair font-bold text-3xl text-gray-900 dark:text-white">
                {category.name}
              </h1>
              {category.description && (
                <p className="text-gray-500 text-sm mt-1">{category.description}</p>
              )}
              {category.count > 0 && (
                <p className="text-xs text-gray-400 mt-0.5">
                  {category.count} articole
                </p>
              )}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Ad top */}
      <ScrollReveal>
        <AdBanner slot={`category-${categorySlug}-top`} width={728} height={90} className="mb-6" />
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Posts */}
        <div className="lg:col-span-2">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-4xl mb-4">📰</p>
              <p className="text-gray-500">Nu există articole în această categorie.</p>
              <Link
                href="/"
                className="mt-4 inline-block text-brand-blue hover:underline"
              >
                ← Înapoi la pagina principală
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {posts.map((post, index) => (
                  <ScrollReveal key={post.id} delay={Math.min(index * 40, 200)}>
                    <ArticleCard
                      post={post}
                      variant={index === 0 ? "large" : "medium"}
                    />
                  </ScrollReveal>
                ))}
              </div>

              {/* Pagination */}
              {pageInfo.hasNextPage && (
                <div className="mt-8 flex justify-center">
                  <Link
                    href={`/${categorySlug}?pagina=${page + 1}`}
                    className="bg-brand-blue hover:bg-brand-blue-dark text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Pagina următoare →
                  </Link>
                </div>
              )}
            </>
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
