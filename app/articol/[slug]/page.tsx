import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getPostBySlug, getAllPostSlugs, getMostViewedPosts, getCategories } from "@/lib/wordpress";
import { getWeatherConstanta } from "@/lib/weather";
import Sidebar from "@/components/Sidebar";
import AdBanner from "@/components/AdBanner";
import ScrollReveal from "@/components/ScrollReveal";
import ArticleCard from "@/components/ArticleCard";

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

  // Schema.org structured data
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

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Article */}
          <article className="lg:col-span-2">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Link href="/" className="hover:text-brand-blue transition-colors">
                Acasă
              </Link>
              {category && (
                <>
                  <span>/</span>
                  <Link
                    href={`/${category.slug}`}
                    className="hover:text-brand-blue transition-colors"
                  >
                    {category.name}
                  </Link>
                </>
              )}
              <span>/</span>
              <span className="text-gray-400 line-clamp-1">Articol</span>
            </nav>

            {/* Category tag */}
            {category && (
              <Link
                href={`/${category.slug}`}
                className="inline-block bg-brand-blue text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4 hover:bg-brand-blue-dark transition-colors"
              >
                {category.name}
              </Link>
            )}

            {/* Title */}
            <h1
              className="font-playfair font-bold text-3xl md:text-4xl text-gray-900 dark:text-white leading-tight mb-4"
              dangerouslySetInnerHTML={{ __html: post.title }}
            />

            {/* Excerpt */}
            <div
              className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6 font-medium border-l-4 border-brand-blue pl-4"
              dangerouslySetInnerHTML={{ __html: post.excerpt }}
            />

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 pb-4 border-b border-gray-200 dark:border-gray-700 mb-6">
              {post.author && (
                <div className="flex items-center gap-2">
                  {post.author.node.avatar?.url && (
                    <Image
                      src={post.author.node.avatar.url}
                      alt={post.author.node.name}
                      width={28}
                      height={28}
                      className="rounded-full"
                    />
                  )}
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {post.author.node.name}
                  </span>
                </div>
              )}
              <time
                dateTime={post.date}
                className="flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {formatDate(post.date)}
              </time>
              {post.modified !== post.date && (
                <span className="text-xs text-gray-400">
                  Actualizat: {formatDate(post.modified)}
                </span>
              )}
            </div>

            {/* Featured Image */}
            {post.featuredImage?.node?.sourceUrl && (
              <figure className="mb-6 rounded-xl overflow-hidden">
                <Image
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.featuredImage.node.altText || post.title}
                  width={800}
                  height={450}
                  className="w-full object-cover"
                  priority
                />
              </figure>
            )}

            {/* Ad before content */}
            <AdBanner slot="article-pre-content" width={728} height={90} className="mb-6" />

            {/* Article Content */}
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Ad after content */}
            <AdBanner slot="article-post-content" width={728} height={90} className="mt-6" />

            {/* Share buttons */}
            <div className="flex flex-wrap items-center gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Distribuie:
              </span>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition-colors"
              >
                📘 Facebook
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gray-900 hover:bg-black text-white text-sm px-4 py-2 rounded-lg transition-colors"
              >
                🐦 X
              </a>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + " " + articleUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-lg transition-colors"
              >
                💬 WhatsApp
              </a>
            </div>

            {/* Tags */}
            {post.categories?.nodes && post.categories.nodes.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {post.categories.nodes.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/${cat.slug}`}
                    className="text-xs bg-gray-100 dark:bg-gray-700 hover:bg-brand-blue hover:text-white dark:hover:bg-brand-blue text-gray-600 dark:text-gray-400 px-3 py-1.5 rounded-full transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </article>

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
    </>
  );
}
