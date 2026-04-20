import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/lib/wordpress";

interface Props {
  post: Post;
  variant?: "featured" | "large" | "medium" | "small" | "list" | "horizontal";
}

const CATEGORY_COLORS: Record<string, string> = {
  actualitate: "bg-blue-600",
  politica: "bg-red-600",
  sport: "bg-green-600",
  economie: "bg-orange-500",
  externe: "bg-purple-600",
  sanatate: "bg-teal-600",
  constanta: "bg-cyan-600",
  interne: "bg-indigo-600",
  "tehnologie-media": "bg-violet-600",
  social: "bg-pink-600",
};

const HIDDEN_SLUGS = ["uncategorized", "necategorizat", "dotto-news", "breaking"];

function getCategoryColor(slug: string): string {
  return CATEGORY_COLORS[slug] || "bg-brand-blue";
}

function hasVideo(content: string): boolean {
  if (!content) return false;
  return (
    content.includes("<iframe") ||
    content.includes("youtube") ||
    content.includes("vimeo") ||
    content.includes("<video") ||
    content.includes("wp-block-video") ||
    content.includes("wp-block-embed")
  );
}

function PlayIcon() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-14 h-14 rounded-full bg-white/70 flex items-center justify-center backdrop-blur-sm shadow-md">
        <svg className="w-6 h-6 text-gray-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  );
}

function CategoryBadge({ category, className }: { category: { name: string; slug: string }; className?: string }) {
  return (
    <span className={`${getCategoryColor(category.slug)} text-white font-bold rounded uppercase ${className ?? "inline-block text-[10px] px-2 py-0.5 tracking-wide"}`}>
      {category.name}
    </span>
  );
}

export default function ArticleCard({ post, variant = "medium" }: Props) {
  const category = post.categories?.nodes?.find((c) => !HIDDEN_SLUGS.includes(c.slug));
  const imageUrl = post.featuredImage?.node?.sourceUrl;
  const imageAlt = post.featuredImage?.node?.altText || post.title;
  const isVideo = hasVideo(post.content);


  /* ── LIST ── */
  if (variant === "list") {
    return (
      <article className="flex gap-3 group py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
        {imageUrl && (
          <Link href={`/articol/${post.slug}`} className="flex-shrink-0">
            <div className="relative w-20 h-14 overflow-hidden rounded">
              <Image src={imageUrl} alt={imageAlt} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="80px" />
              {isVideo && <PlayIcon />}
            </div>
          </Link>
        )}
        <div className="flex-1 min-w-0">
          {category && <CategoryBadge category={category} />}
          <Link href={`/articol/${post.slug}`}>
            <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200 group-hover:text-brand-blue dark:group-hover:text-brand-blue line-clamp-3 leading-snug mt-0.5 transition-colors"
              dangerouslySetInnerHTML={{ __html: post.title }} />
          </Link>
        </div>
      </article>
    );
  }

  /* ── HORIZONTAL ── */
  if (variant === "horizontal") {
    return (
      <article className="flex gap-3 group bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
        {imageUrl && (
          <Link href={`/articol/${post.slug}`} className="flex-shrink-0">
            <div className="relative w-28 h-20 overflow-hidden">
              <Image src={imageUrl} alt={imageAlt} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="112px" />
              {isVideo && <PlayIcon />}
            </div>
          </Link>
        )}
        <div className="flex-1 min-w-0 py-2 pr-3">
          {category && <CategoryBadge category={category} />}
          <Link href={`/articol/${post.slug}`}>
            <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-brand-blue dark:group-hover:text-brand-blue line-clamp-3 mt-0.5 leading-snug transition-colors"
              dangerouslySetInnerHTML={{ __html: post.title }} />
          </Link>
        </div>
      </article>
    );
  }

  /* ── SMALL ── */
  if (variant === "small") {
    return (
      <article className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
        {imageUrl && (
          <Link href={`/articol/${post.slug}`} className="block relative aspect-video overflow-hidden">
            <Image src={imageUrl} alt={imageAlt} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 50vw, 25vw" />
            {category && <CategoryBadge category={category} className="absolute top-2 left-2 text-[10px] px-2 py-0.5" />}
            {isVideo && <PlayIcon />}
          </Link>
        )}
        <div className="p-3">
          <Link href={`/articol/${post.slug}`}>
            <h3 className="font-bold text-sm sm:text-base text-gray-800 dark:text-gray-200 group-hover:text-brand-blue line-clamp-3 leading-snug transition-colors"
              dangerouslySetInnerHTML={{ __html: post.title }} />
          </Link>
        </div>
      </article>
    );
  }

  /* ── LARGE ── */
  if (variant === "large") {
    return (
      <article className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 dark:border-gray-700">
        {imageUrl && (
          <Link href={`/articol/${post.slug}`} className="block relative aspect-video overflow-hidden">
            <Image src={imageUrl} alt={imageAlt} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 100vw, 50vw" />
            {category && <CategoryBadge category={category} className="absolute top-3 left-3 text-xs px-3 py-1 tracking-wide" />}
            {isVideo && <PlayIcon />}
          </Link>
        )}
        <div className="p-4">
          <Link href={`/articol/${post.slug}`}>
            <h2 className="font-playfair font-bold text-[17px] sm:text-xl text-gray-900 dark:text-white group-hover:text-brand-blue line-clamp-3 leading-tight transition-colors"
              dangerouslySetInnerHTML={{ __html: post.title }} />
          </Link>
          {post.author && (
            <div className="mt-3">
              <span className="text-xs text-gray-400">{post.author.node.name}</span>
            </div>
          )}
        </div>
      </article>
    );
  }

  /* ── FEATURED (hero overlay) ── */
  if (variant === "featured") {
    return (
      <Link href={`/articol/${post.slug}`} className="group relative overflow-hidden rounded-xl aspect-[16/9] block">
        {imageUrl ? (
          <Image src={imageUrl} alt={imageAlt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 66vw" priority />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue to-brand-blue-dark" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />
        {isVideo && <PlayIcon />}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
          {category && <CategoryBadge category={category} className="inline-block text-xs px-3 py-1 tracking-wide mb-3" />}
          <h2 className="font-playfair font-bold text-[22px] md:text-3xl lg:text-4xl text-white group-hover:text-blue-200 line-clamp-3 leading-tight transition-colors"
            dangerouslySetInnerHTML={{ __html: post.title }} />
          <div className="hidden md:block text-sm text-gray-300 mt-2 line-clamp-3"
            dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          {post.author && (
            <div className="mt-3">
              <span className="text-xs text-gray-400">{post.author.node.name}</span>
            </div>
          )}
        </div>
      </Link>
    );
  }

  /* ── MEDIUM (default) ── */
  return (
    <article className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700 hover:-translate-y-0.5">
      {imageUrl && (
        <Link href={`/articol/${post.slug}`} className="block relative aspect-video overflow-hidden">
          <Image src={imageUrl} alt={imageAlt} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw" />
          {category && <CategoryBadge category={category} className="absolute top-2 left-2 text-[10px] px-2 py-0.5 tracking-wide" />}
          {isVideo && <PlayIcon />}
        </Link>
      )}
      <div className="p-3">
        <Link href={`/articol/${post.slug}`}>
          <h3 className="font-bold text-[17px] sm:text-base text-gray-800 dark:text-gray-200 group-hover:text-brand-blue dark:group-hover:text-brand-blue line-clamp-3 leading-snug transition-colors"
            dangerouslySetInnerHTML={{ __html: post.title }} />
        </Link>
        {post.author && (
          <div className="mt-2">
            <span className="text-[10px] text-gray-400">{post.author.node.name}</span>
          </div>
        )}
      </div>
    </article>
  );
}
