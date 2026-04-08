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
};

function getCategoryColor(slug: string): string {
  return CATEGORY_COLORS[slug] || "bg-brand-blue";
}

function timeAgo(dateString: string): string {
  const diff = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);
  if (diff < 60) return "acum câteva secunde";
  if (diff < 3600) return `acum ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `acum ${Math.floor(diff / 3600)} ore`;
  if (diff < 604800) return `acum ${Math.floor(diff / 86400)} zile`;
  return new Date(dateString).toLocaleDateString("ro-RO", { day: "numeric", month: "short" });
}

function CategoryBadge({ category }: { category: { name: string; slug: string } }) {
  return (
    <span className={`inline-block ${getCategoryColor(category.slug)} text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide`}>
      {category.name}
    </span>
  );
}

export default function ArticleCard({ post, variant = "medium" }: Props) {
  const category = post.categories?.nodes?.[0];
  const imageUrl = post.featuredImage?.node?.sourceUrl;
  const imageAlt = post.featuredImage?.node?.altText || post.title;

  /* ── LIST ── */
  if (variant === "list") {
    return (
      <article className="flex gap-3 group py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
        {imageUrl && (
          <Link href={`/articol/${post.slug}`} className="flex-shrink-0">
            <div className="relative w-20 h-14 overflow-hidden rounded">
              <Image src={imageUrl} alt={imageAlt} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="80px" />
            </div>
          </Link>
        )}
        <div className="flex-1 min-w-0">
          {category && <CategoryBadge category={category} />}
          <Link href={`/articol/${post.slug}`}>
            <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200 group-hover:text-brand-blue dark:group-hover:text-brand-blue line-clamp-3 leading-snug mt-0.5 transition-colors"
              dangerouslySetInnerHTML={{ __html: post.title }} />
          </Link>
          <p className="text-[10px] text-gray-400 mt-1">{timeAgo(post.date)}</p>
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
            </div>
          </Link>
        )}
        <div className="flex-1 min-w-0 py-2 pr-3">
          {category && <CategoryBadge category={category} />}
          <Link href={`/articol/${post.slug}`}>
            <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-brand-blue dark:group-hover:text-brand-blue line-clamp-3 mt-0.5 leading-snug transition-colors"
              dangerouslySetInnerHTML={{ __html: post.title }} />
          </Link>
          <p className="hidden sm:block text-[10px] text-gray-400 mt-1">{timeAgo(post.date)}</p>
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
            {category && (
              <span className={`absolute top-2 left-2 ${getCategoryColor(category.slug)} text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase`}>
                {category.name}
              </span>
            )}
          </Link>
        )}
        <div className="p-3">
          <Link href={`/articol/${post.slug}`}>
            <h3 className="font-bold text-sm text-gray-800 dark:text-gray-200 group-hover:text-brand-blue line-clamp-3 leading-snug transition-colors"
              dangerouslySetInnerHTML={{ __html: post.title }} />
          </Link>
          <p className="hidden sm:block text-[10px] text-gray-400 mt-1.5">{timeAgo(post.date)}</p>
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
            {category && (
              <span className={`absolute top-3 left-3 ${getCategoryColor(category.slug)} text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wide`}>
                {category.name}
              </span>
            )}
          </Link>
        )}
        <div className="p-4">
          <Link href={`/articol/${post.slug}`}>
            <h2 className="font-playfair font-bold text-[17px] sm:text-xl text-gray-900 dark:text-white group-hover:text-brand-blue line-clamp-3 leading-tight transition-colors"
              dangerouslySetInnerHTML={{ __html: post.title }} />
          </Link>
          <div className="hidden sm:flex items-center justify-between mt-3">
            <span className="text-xs text-gray-400">{timeAgo(post.date)}</span>
            {post.author && <span className="text-xs text-gray-400">{post.author.node.name}</span>}
          </div>
        </div>
      </article>
    );
  }

  /* ── FEATURED (hero overlay) ── */
  if (variant === "featured") {
    return (
      <article className="group relative overflow-hidden rounded-xl aspect-[16/9]">
        {imageUrl ? (
          <Image src={imageUrl} alt={imageAlt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 66vw" priority />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue to-brand-blue-dark" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
          {category && (
            <span className={`inline-block ${getCategoryColor(category.slug)} text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wide mb-3`}>
              {category.name}
            </span>
          )}
          <Link href={`/articol/${post.slug}`}>
            <h2 className="font-playfair font-bold text-[22px] md:text-3xl lg:text-4xl text-white group-hover:text-blue-200 line-clamp-3 leading-tight transition-colors"
              dangerouslySetInnerHTML={{ __html: post.title }} />
          </Link>
          <div className="hidden md:block text-sm text-gray-300 mt-2 line-clamp-3"
            dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          <div className="flex items-center gap-3 mt-3">
            <span className="text-xs text-gray-300">{timeAgo(post.date)}</span>
            {post.author && <span className="text-xs text-gray-400">• {post.author.node.name}</span>}
          </div>
        </div>
      </article>
    );
  }

  /* ── MEDIUM (default) ── */
  return (
    <article className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700 hover:-translate-y-0.5">
      {imageUrl && (
        <Link href={`/articol/${post.slug}`} className="block relative aspect-video overflow-hidden">
          <Image src={imageUrl} alt={imageAlt} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw" />
          {category && (
            <span className={`absolute top-2 left-2 ${getCategoryColor(category.slug)} text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide`}>
              {category.name}
            </span>
          )}
        </Link>
      )}
      <div className="p-3">
        <Link href={`/articol/${post.slug}`}>
          <h3 className="font-bold text-[17px] sm:text-sm text-gray-800 dark:text-gray-200 group-hover:text-brand-blue dark:group-hover:text-brand-blue line-clamp-3 leading-snug transition-colors"
            dangerouslySetInnerHTML={{ __html: post.title }} />
        </Link>
        <div className="hidden sm:flex items-center justify-between mt-2">
          <span className="text-[10px] text-gray-400">{timeAgo(post.date)}</span>
          {post.author && <span className="text-[10px] text-gray-400">{post.author.node.name}</span>}
        </div>
      </div>
    </article>
  );
}
