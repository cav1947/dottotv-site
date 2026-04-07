"use client";

import Link from "next/link";
import type { Post } from "@/lib/wordpress";

interface Props {
  posts: Pick<Post, "id" | "slug" | "title" | "date">[];
}

export default function BreakingNewsTicker({ posts }: Props) {
  if (!posts.length) return null;

  // Triplicăm pentru scroll neîntrerupt
  const items = [...posts, ...posts, ...posts];

  return (
    <div className="bg-red-600 text-white overflow-hidden border-b-2 border-red-800 shadow-sm">
      <div className="flex items-stretch">
        {/* Label fix */}
        <div className="flex-shrink-0 flex items-center gap-1.5 bg-red-800 px-3 py-2 z-10">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <span className="font-black text-xs uppercase tracking-widest whitespace-nowrap">Breaking</span>
        </div>

        {/* Separator triunghi */}
        <div className="flex-shrink-0 w-0 h-0 border-t-[32px] border-b-0 border-l-[12px] border-t-red-800 border-l-transparent self-center" style={{ borderBottomWidth: 0, borderTopWidth: "2rem", borderLeftWidth: "0.75rem" }} />

        {/* Ticker scroll */}
        <div className="overflow-hidden flex-1 relative py-1">
          <div className="flex items-center animate-ticker whitespace-nowrap">
            {items.map((post, i) => (
              <span key={`${post.id}-${i}`} className="inline-flex items-center">
                <Link
                  href={`/articol/${post.slug}`}
                  className="inline-block mx-6 text-sm font-semibold hover:underline hover:text-red-100 transition-colors"
                  dangerouslySetInnerHTML={{ __html: post.title }}
                />
                <span className="text-red-300 text-lg">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
