import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getPostBySlug,
  getAllPostSlugs,
  getMostViewedPosts,
  getCategories,
  getPostsByCategory,
} from "@/lib/wordpress";
import { getWeatherConstanta } from "@/lib/weather";
import Sidebar from "@/components/Sidebar";
import AdBanner from "@/components/AdBanner";
import ArticleCard from "@/components/ArticleCard";
import ReadingProgress from "@/components/ReadingProgress";
import ShareButtons from "@/components/ShareButtons";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dottotv.ro";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);
  if (!post) return { title: "Articol negăsit" };

  const imageUrl = post.featuredImage?.node?.sourceUrl;
  const seoTitle = post.seo?.title || `${post.title} | DottoTV`;
  const seoDesc =
    post.seo?.metaDesc || post.excerpt.replace(/<[^>]*>/g, "").slice(0, 160);

  return {
    title: seoTitle,
    description: seoDesc,
    keywords: post.seo?.focusKw
      ? [post.seo.focusKw, "știri", "DottoTV"]
      : ["știri", "DottoTV"],
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      url: `${SITE_URL}/articol/${slug}`,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: [post.author?.node?.name || "DottoTV"],
      images: imageUrl
        ? [{ url: imageUrl, width: 1200, height: 630 }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDesc,
      images: imageUrl ? [imageUrl] : undefined,
    },
    alternates: {
      canonical: `${SITE_URL}/articol/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs().catch(() => []);
  return slugs.slice(0, 100).map((slug) => ({ slug }));
}

export const revalidate = 300;

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}


export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  const [post, mostViewed, categories, weather] = await Promise.all([
    getPostBySlug(slug).catch(() => null),
    getMostViewedPosts(5).catch(() => []),
    getCategories().catch(() => []),
    getWeatherConstanta().catch(() => null),
  ]);

  if (!post) notFound();

  const category = post.categories?.nodes?.[0];
  const articleUrl = `${SITE_URL}/articol/${slug}`;
  const relatedPosts = category
    ? await getPostsByCategory(category.slug, 10)
        .then(({ posts }) => posts.filter((p) => p.slug !== slug).slice(0, 6))
        .catch(() => [])
    : [];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.excerpt.replace(/<[^>]*>/g, ""),
    image: post.featuredImage?.node?.sourceUrl,
    datePublished: post.date,
    dateModified: post.modified,
    author: {
      "@type": "Person",
      name: post.author?.node?.name || "DottoTV",
    },
    publisher: {
      "@type": "Organization",
      name: "DottoTV",
      url: "https://dottotv.ro",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <ReadingProgress />

      <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
        <div className="container mx-auto px-4 py-6 max-w-[1400px]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">

            {/* ── ARTICLE ── */}
            <article>

              {/* Breadcrumb */}
              <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-5">
                <Link href="/" className="hover:text-brand-blue transition-colors">Acasă</Link>
                {category && (
                  <>
                    <span>/</span>
                    <Link href={`/${category.slug}`} className="hover:text-brand-blue transition-colors">
                      {category.name}
                    </Link>
                  </>
                )}
                <span>/</span>
                <span className="text-gray-300 dark:text-gray-600 line-clamp-1">Articol</span>
              </nav>

              {/* Category badge */}
              {category && (
                <Link
                  href={`/${category.slug}`}
                  className="inline-block bg-brand-blue text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 hover:bg-brand-blue-dark transition-colors"
                >
                  {category.name}
                </Link>
              )}

              {/* Title */}
              <h1
                className="font-playfair font-bold text-3xl md:text-[2.6rem] text-gray-900 dark:text-white leading-tight mb-5"
                dangerouslySetInnerHTML={{ __html: post.title }}
              />

              {/* Author + Meta bar */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pb-5 border-b border-gray-200 dark:border-gray-700 mb-6">
                {post.author && (
                  <div className="flex items-center gap-2.5">
                    {post.author.node.avatar?.url ? (
                      <Image
                        src={post.author.node.avatar.url}
                        alt={post.author.node.name}
                        width={40}
                        height={40}
                        className="rounded-full ring-2 ring-brand-blue/20"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center text-white font-bold text-sm">
                        {post.author.node.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 leading-none">
                        {post.author.node.name}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5">Autor</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <time dateTime={post.date} className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(post.date)}
                  </time>

                </div>

                {post.modified !== post.date && (
                  <span className="text-xs text-gray-400 italic">
                    Actualizat: {formatDate(post.modified)}
                  </span>
                )}
              </div>

              {/* Featured image — full width pe mobile (-mx-4), normal pe desktop */}
              {post.featuredImage?.node?.sourceUrl && (
                <figure className="-mx-4 md:mx-0 mb-8 md:rounded-2xl overflow-hidden shadow-md">
                  <Image
                    src={post.featuredImage.node.sourceUrl}
                    alt={post.featuredImage.node.altText || post.title}
                    width={1200}
                    height={675}
                    className="w-full object-cover aspect-video"
                    priority
                  />
                </figure>
              )}

              {/* Ad before content */}
              <AdBanner slot="article-pre-content" width={728} height={90} className="mb-8" />

              {/* Article body */}
              <div id="article-body" className="article-content">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>

              {/* Ad after content */}
              <AdBanner slot="article-post-content" width={728} height={90} className="mt-8" />

              {/* Share buttons */}
              <ShareButtons url={articleUrl} title={post.title.replace(/<[^>]*>/g, "")} />

              {/* Category tags */}
              {post.categories?.nodes && post.categories.nodes.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {post.categories.nodes.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/${cat.slug}`}
                      className="text-xs bg-gray-100 dark:bg-gray-800 hover:bg-brand-blue hover:text-white dark:hover:bg-brand-blue text-gray-600 dark:text-gray-400 px-3 py-1.5 rounded-full transition-colors"
                    >
                      #{cat.name}
                    </Link>
                  ))}
                </div>
              )}

              {/* Related articles */}
              {relatedPosts.length > 0 && (
                <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <h2 className="font-playfair font-bold text-2xl text-gray-900 dark:text-white mb-5">
                    Articole înrudite
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {relatedPosts.map((p) => (
                      <ArticleCard key={p.id} post={p} variant="small" />
                    ))}
                  </div>
                </section>
              )}
            </article>

            {/* ── SIDEBAR ── */}
            <aside>
              <div className="sticky top-20">
                <Sidebar
                  mostViewed={mostViewed}
                  categories={categories}
                  weather={weather}
                />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
