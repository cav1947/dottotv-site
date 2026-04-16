"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/wordpress";

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

const HIDDEN_SLUGS = ["uncategorized", "necategorizat", "dotto-news", "breaking"];

function getCategoryColor(slug: string) {
  return CATEGORY_COLORS[slug] || "bg-brand-blue";
}

export default function HeroCarousel({ posts }: { posts: Post[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartY = useRef<number | null>(null);
  // Ref pentru activeIndex — evită closure-uri stale în handlere native
  const activeIndexRef = useRef(0);
  const router = useRouter();

  const scrollToSlide = useCallback((index: number) => {
    const container = containerRef.current;
    if (!container) return;
    // Actualizează ref-ul sincron — evită stale closure la tap imediat după swipe
    activeIndexRef.current = index;
    setActiveIndex(index);
    container.scrollTo({ top: index * container.clientHeight, behavior: "smooth" });
  }, []);

  // touchmove non-pasiv: preventDefault blochează scroll-ul paginii în timpul
  // navigării între slide-uri. Pe ultimul slide + swipe-up NU apelăm preventDefault
  // → gestul trece instant la scroll-ul normal al paginii fără nicio pauză.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartY.current === null) return;
      const deltaY = touchStartY.current - e.touches[0].clientY;
      const isSwipeUp = deltaY > 0;
      const isLast = activeIndexRef.current === posts.length - 1;

      // Ultimul slide + swipe sus → lasă pagina să scrolleze
      if (isLast && isSwipeUp) return;

      // Toate celelalte cazuri → blochează scroll-ul paginii
      e.preventDefault();
    };

    container.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => container.removeEventListener("touchmove", handleTouchMove);
  }, [posts.length]);

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (touchStartY.current === null) return;
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      const absY = Math.abs(deltaY);
      touchStartY.current = null;

      const idx = activeIndexRef.current;

      // Tap (mișcare < 20px) → navighează la articol
      if (absY < 20) {
        router.push(`/articol/${posts[idx].slug}`);
        return;
      }

      const isSwipeUp = deltaY > 0;

      if (isSwipeUp && idx < posts.length - 1) {
        scrollToSlide(idx + 1);
      } else if (!isSwipeUp && idx > 0) {
        scrollToSlide(idx - 1);
      }
      // Ultimul slide + swipe sus: pagina deja scrollează natural, nimic de făcut
    },
    [posts, router, scrollToSlide]
  );

  return (
    <div
      ref={containerRef}
      className="h-[calc(100dvh-64px)] overflow-y-hidden scrollbar-none lg:hidden"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {posts.map((post, i) => {
        const category = post.categories?.nodes?.find((c) => !HIDDEN_SLUGS.includes(c.slug));
        const imageUrl = post.featuredImage?.node?.sourceUrl;
        const imageAlt = post.featuredImage?.node?.altText || post.title;

        return (
          <div
            key={post.id}
            className="h-[calc(100dvh-64px)] relative overflow-hidden bg-gray-900"
          >
            {/* Imagine full screen */}
            <div className="absolute inset-0">
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  priority={i === 0}
                  sizes="100vw"
                />
              )}
              {/* Gradient întunecat jos */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            </div>

            {/* Categorie — sus stânga */}
            {category && (
              <div className="absolute top-16 left-4">
                <span
                  className={`${getCategoryColor(category.slug)} text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide`}
                >
                  {category.name}
                </span>
              </div>
            )}

            {/* Indicatori slide — dreapta centru */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
              {posts.map((_, j) => (
                <div
                  key={j}
                  className={`w-1 rounded-full transition-all duration-300 ${
                    j === activeIndex ? "h-8 bg-white" : "h-2 bg-white/35"
                  }`}
                />
              ))}
            </div>

            {/* Titlu — jos */}
            <div className="absolute bottom-16 left-0 right-0 px-5 pb-4 pt-20">
              {/* stopPropagation previne hijack-ul de la onTouchEnd al containerului;
                  router.push asigură navigarea chiar dacă click-ul e supresat de touchmove */}
              <Link
                href={`/articol/${post.slug}`}
                onTouchEnd={(e) => {
                  e.stopPropagation();
                  router.push(`/articol/${post.slug}`);
                }}
              >
                <h2
                  className="text-white font-bold text-[30px] leading-snug"
                  dangerouslySetInnerHTML={{ __html: post.title }}
                />
              </Link>

              {/* Hint swipe */}
              {i < posts.length - 1 && (
                <div className="flex items-center gap-2 mt-5 text-white/50 text-xs">
                  <svg
                    className="w-4 h-4 animate-bounce"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                  Swipe sus pentru mai multe
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
