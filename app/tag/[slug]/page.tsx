import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getTagBySlug, getPostsByTag } from "@/lib/wordpress";
import ArticleCard from "@/components/ArticleCard";
import AdBanner from "@/components/AdBanner";
import { SITE_URL, buildBreadcrumbSchema } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = await getTagBySlug(slug).catch(() => null);
  if (!tag) return { title: "Tag negăsit" };

  const tagUrl = `${SITE_URL}/tag/${slug}`;
  const desc = tag.description || `Articole etichetate cu "${tag.name}" — DOTTO TV, televiziunea locală a județului Constanța.`;

  return {
    title: `${tag.name} – Știri | DOTTO TV`,
    description: desc,
    robots: { index: true, follow: true },
    alternates: {
      canonical: tagUrl,
      languages: { "ro-RO": tagUrl },
    },
    openGraph: {
      siteName: "DOTTO TV",
      title: `${tag.name} | DOTTO TV`,
      description: desc,
      url: tagUrl,
      type: "website",
      locale: "ro_RO",
      images: [{ url: `${SITE_URL}/images/og-default.jpg`, width: 1200, height: 630, alt: `${tag.name} | DOTTO TV` }],
    },
  };
}

export const revalidate = 300;

export default async function TagPage({ params }: Props) {
  const { slug } = await params;

  const [tag, { posts }] = await Promise.all([
    getTagBySlug(slug).catch(() => null),
    getPostsByTag(slug, 24).catch(() => ({ posts: [], pageInfo: { hasNextPage: false, endCursor: "" } })),
  ]);

  if (!tag) notFound();

  const tagUrl = `${SITE_URL}/tag/${slug}`;
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Acasă", url: SITE_URL },
    { name: tag.name, url: tagUrl },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

        {/* Header tag */}
        <div className="bg-brand-blue dark:bg-brand-blue-dark">
          <div className="container mx-auto px-4 max-w-[1200px] py-10 md:py-12">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-white/60 mb-4">
              <Link href="/" className="hover:text-white transition-colors">Acasă</Link>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-white/90">{tag.name}</span>
            </nav>

            <div className="flex items-center gap-3 mb-2">
              <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <h1 className="font-playfair font-bold text-3xl md:text-5xl text-white">
                {tag.name}
              </h1>
            </div>

            {tag.description && (
              <p className="text-white/70 text-sm md:text-base max-w-xl mt-2">{tag.description}</p>
            )}

            {tag.count > 0 && (
              <p className="text-white/50 text-xs mt-3">{tag.count} {tag.count === 1 ? "articol" : "articole"}</p>
            )}
          </div>
        </div>

        {/* Conținut */}
        <div className="container mx-auto px-4 max-w-[1200px] py-8">
          <div className="mb-8">
            <AdBanner slot="article-pre-content" width={728} height={90} />
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <svg className="w-12 h-12 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-sm">Nu există articole cu acest tag.</p>
              <Link href="/" className="inline-block mt-4 text-brand-blue hover:underline text-sm">
                Înapoi la pagina principală
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {posts.map((post) => (
                <ArticleCard key={post.id} post={post} variant="medium" />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
