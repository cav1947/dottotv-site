"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/wordpress";

interface PageInfo {
  hasNextPage: boolean;
  endCursor: string;
}

interface Props {
  initialPosts: Post[];
  initialPageInfo: PageInfo;
  categorySlug: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  actualitate: "bg-blue-600",
  news: "bg-brand-blue",
  sport: "bg-green-600",
  politica: "bg-red-600",
  externe: "bg-purple-600",
  sanatate: "bg-teal-600",
  interne: "bg-indigo-600",
  economie: "bg-orange-500",
};

function getCatColor(slug: string) {
  return CATEGORY_COLORS[slug] ?? "bg-brand-blue";
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

function timeAgo(dateString: string): string {
  const diff = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);
  if (diff < 60) return "acum câteva secunde";
  if (diff < 3600) return `acum ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `acum ${Math.floor(diff / 3600)} ore`;
  if (diff < 604800) return `acum ${Math.floor(diff / 86400)} zile`;
  return new Date(dateString).toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" });
}

function ArticleGridCard({ post }: { post: Post }) {
  const category = post.categories?.nodes?.[0];
  const imageUrl = post.featuredImage?.node?.sourceUrl;
  const imageAlt = post.featuredImage?.node?.altText || post.title;
  const isVideo = hasVideo(post.content);

  return (
    <article className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:-translate-y-1 flex flex-col">
      {/* Imagine */}
      <Link href={`/articol/${post.slug}`} className="block relative aspect-video overflow-hidden flex-shrink-0">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {/* Category badge pe imagine */}
        {category && (
          <span className={`absolute top-3 left-3 ${getCatColor(category.slug)} text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide`}>
            {category.name}
          </span>
        )}
        {isVideo && <PlayIcon />}
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/articol/${post.slug}`} className="flex-1">
          <h3
            className="font-bold text-[17px] leading-snug text-gray-900 dark:text-white group-hover:text-brand-blue dark:group-hover:text-brand-blue line-clamp-3 transition-colors mb-3"
            dangerouslySetInnerHTML={{ __html: post.title }}
          />
        </Link>

        {/* Meta: autor + dată */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2 min-w-0">
            {post.author?.node?.avatar?.url ? (
              <Image
                src={post.author.node.avatar.url}
                alt={post.author.node.name}
                width={24}
                height={24}
                className="rounded-full flex-shrink-0"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-brand-blue flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                {post.author?.node?.name?.charAt(0) ?? "D"}
              </div>
            )}
            <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {post.author?.node?.name ?? "DottoTV"}
            </span>
          </div>
          <time className="text-xs text-gray-400 flex-shrink-0 ml-2" dateTime={post.date}>
            {timeAgo(post.date)}
          </time>
        </div>
      </div>
    </article>
  );
}

export default function CategoryInfiniteGrid({ initialPosts, initialPageInfo, categorySlug }: Props) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [pageInfo, setPageInfo] = useState<PageInfo>(initialPageInfo);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !pageInfo.hasNextPage) return;
    loadingRef.current = true;
    setLoading(true);
    try {
      const res = await fetch(
        `/api/posts?category=${encodeURIComponent(categorySlug)}&after=${encodeURIComponent(pageInfo.endCursor)}&limit=12`
      );
      const data = await res.json();
      setPosts((prev) => [...prev, ...data.posts]);
      setPageInfo(data.pageInfo);
    } catch {
      // silently fail
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [pageInfo, categorySlug]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { rootMargin: "300px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [loadMore]);

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <svg className="w-16 h-16 text-gray-200 dark:text-gray-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
        <p className="text-gray-500 dark:text-gray-400 font-medium">Nu există articole în această categorie.</p>
        <Link href="/" className="mt-4 text-brand-blue hover:underline text-sm">← Înapoi la pagina principală</Link>
      </div>
    );
  }

  return (
    <>
      {/* Grid articole */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post) => (
          <ArticleGridCard key={post.id} post={post} />
        ))}
      </div>

      {/* Sentinel — IntersectionObserver îl observă */}
      <div ref={sentinelRef} className="h-4 mt-4" />

      {/* Loading spinner */}
      {loading && (
        <div className="flex items-center justify-center py-10 gap-3">
          <div className="w-6 h-6 border-3 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin" />
          <span className="text-sm text-gray-500 dark:text-gray-400">Se încarcă mai multe articole...</span>
        </div>
      )}

      {/* Sfârșit conținut */}
      {!pageInfo.hasNextPage && posts.length > 0 && !loading && (
        <div className="flex items-center gap-4 py-10">
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
          <span className="text-xs text-gray-400 dark:text-gray-600 font-medium uppercase tracking-widest">
            Toate articolele au fost afișate
          </span>
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
        </div>
      )}
    </>
  );
}
