import { notFound, permanentRedirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import {
  getPostBySlug,
  getPostSlugByOldSlug,
  getAllPostSlugs,
  getCategories,
  getPostsByCategory,
  getLatestPosts,
  getPostCardBySlug,
  type PostCard,
} from "@/lib/wordpress";
import { extractRelatedSlugs, parseContentSegments } from "@/lib/parseContent";
import { getWeatherConstanta } from "@/lib/weather";
import Sidebar from "@/components/Sidebar";
import AdBanner from "@/components/AdBanner";
import ArticleCard from "@/components/ArticleCard";
import ReadingProgress from "@/components/ReadingProgress";
import ShareButtons from "@/components/ShareButtons";
import RelatedArticleCard from "@/components/RelatedArticleCard";
import { generateSEOForArticle } from "@/lib/claude";
import {
  SITE_URL,
  buildNewsArticleSchema,
  buildBreadcrumbSchema,
  buildAltText,
} from "@/lib/seo";

const SocialEmbeds = dynamic(() => import("@/components/SocialEmbeds"));

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);
  if (!post) return { title: "Articol negăsit" };

  const articleUrl = `${SITE_URL}/articol/${slug}`;
  const imageUrl = post.featuredImage?.node?.sourceUrl;
  const cleanTitle = post.title.replace(/<[^>]*>/g, "");
  const cleanExcerpt = post.excerpt.replace(/<[^>]*>/g, "");
  const category = post.categories?.nodes?.[0];
  const authorName = post.author?.node?.name || "DottoTV";

  // Prioritate: Yoast SEO → Claude API → fallback simplu
  let seoTitle = post.seo?.title || "";
  let seoDesc = post.seo?.metaDesc || "";
  let focusKw = post.seo?.focusKw || "";

  if (!seoTitle || !seoDesc) {
    try {
      const generated = await generateSEOForArticle({
        title: cleanTitle,
        excerpt: cleanExcerpt,
        content: post.content,
        category: category?.name || "Știri",
        author: authorName,
        publishDate: post.date,
        url: articleUrl,
      });
      seoTitle = seoTitle || generated.metaTitle;
      seoDesc = seoDesc || generated.metaDescription;
      focusKw = focusKw || generated.focusKeyword;
    } catch {
      seoTitle = seoTitle || `${cleanTitle.slice(0, 55)} | DOTTO TV`;
      seoDesc = seoDesc || cleanExcerpt.slice(0, 155);
    }
  }

  // og:title — titlu complet fără sufix, max 100 caractere (limita Facebook)
  const ogTitle = cleanTitle.length > 100
    ? cleanTitle.slice(0, 97) + "..."
    : cleanTitle;

  const keywords = [
    ...(focusKw ? [focusKw] : []),
    "știri",
    "Constanța",
    "DOTTO TV",
    ...(category ? [category.name] : []),
  ];

  return {
    title: seoTitle,
    description: seoDesc,
    keywords,
    robots: { index: true, follow: true },
    alternates: {
      canonical: articleUrl,
      languages: { "ro-RO": articleUrl },
    },
    openGraph: {
      siteName: "DOTTO TV",
      title: ogTitle,
      description: seoDesc,
      url: articleUrl,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: [authorName],
      locale: "ro_RO",
      images: imageUrl
        ? [{ url: imageUrl, width: 1200, height: 630, alt: buildAltText(undefined, cleanTitle, category?.name) }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      site: "@dottotv",
      title: ogTitle,
      description: seoDesc,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs().catch(() => []);
  return slugs.slice(0, 500).map((slug) => ({ slug }));
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

function splitAfterFirstParagraph(html: string): [string, string] {
  const idx = html.indexOf("</p>");
  if (idx === -1) return [html, ""];
  return [html.slice(0, idx + 4), html.slice(idx + 4)];
}


export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  const [post, categories, weather, latestPosts] = await Promise.all([
    getPostBySlug(slug).catch(() => null),
    getCategories().catch(() => []),
    getWeatherConstanta().catch(() => null),
    getLatestPosts(5).catch(() => []),
  ]);

  if (!post) {
    // Fallback: poate e un slug vechi care a fost schimbat în WordPress.
    // Dacă găsim o potrivire în _wp_old_slug, redirect 308 la slug-ul curent.
    const newSlug = await getPostSlugByOldSlug(slug).catch(() => null);
    if (newSlug && newSlug !== slug) {
      permanentRedirect(`/articol/${newSlug}`);
    }
    notFound();
  }

  // Ultimele 4 articole, excluzând articolul curent
  const ultimaOra = latestPosts.filter((p) => p.slug !== slug).slice(0, 4);

  const [firstPara, restContent] = splitAfterFirstParagraph(post.content);

  const category = post.categories?.nodes?.[0];
  const articleUrl = `${SITE_URL}/articol/${slug}`;

  // Collect slugs from <!-- related:ID:SLUG --> comments in restContent
  const inlineSlugs = extractRelatedSlugs(restContent);

  const [relatedPosts, inlineCards] = await Promise.all([
    category
      ? getPostsByCategory(category.slug, 10)
          .then(({ posts }) => posts.filter((p) => p.slug !== slug).slice(0, 6))
          .catch(() => [] as typeof latestPosts)
      : Promise.resolve([] as typeof latestPosts),
    Promise.all(inlineSlugs.map((s) => getPostCardBySlug(s).catch(() => null))),
  ]);

  const inlineCardMap = new Map<string, PostCard>();
  inlineSlugs.forEach((s, i) => {
    const card = inlineCards[i];
    if (card) inlineCardMap.set(s, card);
  });

  const restSegments = parseContentSegments(restContent);

  const cleanTitle = post.title.replace(/<[^>]*>/g, "");
  const authorName = post.author?.node?.name || "DottoTV";

  const newsArticleSchema = buildNewsArticleSchema({
    title: cleanTitle,
    description: post.excerpt.replace(/<[^>]*>/g, "").slice(0, 160),
    url: articleUrl,
    imageUrl: post.featuredImage?.node?.sourceUrl,
    datePublished: post.date,
    dateModified: post.modified,
    authorName,
    content: post.content,
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Acasă", url: SITE_URL },
    ...(category ? [{ name: category.name, url: `${SITE_URL}/${category.slug}` }] : []),
    { name: cleanTitle.slice(0, 60), url: articleUrl },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <ReadingProgress />

      <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
        <div className="container mx-auto px-4 py-6 max-w-[1400px]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">

            {/* ── ARTICLE ── */}
            <article>

              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-gray-400 mb-5 flex-wrap">
                <Link href="/" className="hover:text-brand-blue transition-colors flex items-center gap-1">
                  <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Acasă
                </Link>
                {category && (
                  <>
                    <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <Link href={`/${category.slug}`} className="hover:text-brand-blue transition-colors">
                      {category.name}
                    </Link>
                  </>
                )}
                <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-gray-500 dark:text-gray-400 truncate max-w-[200px] sm:max-w-sm">
                  {cleanTitle.length > 55 ? cleanTitle.slice(0, 55) + "…" : cleanTitle}
                </span>
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
                    alt={buildAltText(post.featuredImage.node.altText, cleanTitle, category?.name)}
                    width={1200}
                    height={675}
                    className="w-full object-cover aspect-video"
                    priority
                  />
                </figure>
              )}

              {/* Banner susținere DOTTO TV */}
              <a
                href="/redirectionare-impozit"
                className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-5 px-7 py-6 rounded-2xl no-underline hover:opacity-95 transition-opacity"
                style={{ background: "linear-gradient(135deg, #1565C0 0%, #0d47a1 100%)" }}
              >
                <div className="text-center sm:text-left">
                  <p className="font-playfair font-bold text-white text-lg md:text-xl leading-snug mb-1">
                    Susții jurnalismul independent din Constanța
                  </p>
                  <p className="text-blue-200 text-sm">
                    Redirecționează 3,5% din impozitul pe venit.
                  </p>
                </div>
                <span className="flex-shrink-0 bg-white font-bold text-sm px-5 py-2.5 rounded-xl whitespace-nowrap" style={{ color: "#1565C0" }}>
                  Descoperă cum →
                </span>
              </a>

              {/* Article body */}
              <div id="article-body" className="article-content">
                {/* Primul paragraf */}
                <div dangerouslySetInnerHTML={{ __html: firstPara }} />

                {/* ── Ultima oră ── */}
                {ultimaOra.length > 0 && (
                  <div
                    className="not-prose my-5"
                    style={{
                      borderLeft: "3px solid #1565C0",
                      backgroundColor: "#EEF4FF",
                      borderRadius: "0 6px 6px 0",
                      padding: "10px 12px",
                    }}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-2"
                      style={{ color: "#1565C0" }}>
                      Ultima oră
                    </p>
                    <div>
                      {ultimaOra.map((p, i) => {
                        const img = p.featuredImage?.node?.sourceUrl;
                        return (
                          <Link
                            key={p.id}
                            href={`/articol/${p.slug}`}
                            className="flex items-center group"
                            style={{ gap: 8, paddingTop: i === 0 ? 0 : 6, paddingBottom: 6, borderTop: i === 0 ? "none" : "1px solid #dbeafe" }}
                          >
                            <div style={{ width: 48, height: 48, flexShrink: 0, borderRadius: 4, overflow: "hidden", background: "#dbeafe" }}>
                              {img ? (
                                <Image
                                  src={img}
                                  alt={p.featuredImage?.node?.altText || p.title}
                                  width={48}
                                  height={48}
                                  className="w-full h-full object-cover object-center"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <svg className="w-4 h-4" style={{ color: "#93c5fd" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                </div>
                              )}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <p
                                className="line-clamp-2 font-semibold group-hover:underline"
                                style={{ fontSize: 13, lineHeight: "1.35", color: "#1a1a1a", margin: 0 }}
                                dangerouslySetInnerHTML={{ __html: p.title }}
                              />
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Restul articolului — cu carduri related inline */}
                {restSegments.map((seg, i) =>
                  seg.type === "html" ? (
                    <div key={i} dangerouslySetInnerHTML={{ __html: seg.content }} />
                  ) : inlineCardMap.has(seg.slug) ? (
                    <RelatedArticleCard key={i} post={inlineCardMap.get(seg.slug)!} />
                  ) : null
                )}
              </div>

              <SocialEmbeds />

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

              {/* Post tags */}
              {post.tags?.nodes && post.tags.nodes.length > 0 && (
                <div className="mt-5 pt-5 border-t border-gray-100 dark:border-gray-800">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    Tag-uri
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.nodes.map((tag) => (
                      <Link
                        key={tag.id}
                        href={`/tag/${tag.slug}`}
                        className="inline-flex items-center gap-1 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-brand-blue hover:text-brand-blue dark:hover:border-brand-blue dark:hover:text-brand-blue text-gray-600 dark:text-gray-400 px-3 py-1.5 rounded-full transition-colors"
                      >
                        <span className="text-gray-400">#</span>{tag.name}
                      </Link>
                    ))}
                  </div>
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
