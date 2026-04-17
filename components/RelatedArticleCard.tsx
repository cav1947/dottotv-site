import Image from "next/image";
import Link from "next/link";
import type { PostCard } from "@/lib/wordpress";

const CATEGORY_COLORS: Record<string, string> = {
  actualitate: "#1565C0",
  politica: "#C62828",
  sport: "#2E7D32",
  economie: "#E65100",
  externe: "#6A1B9A",
  sanatate: "#00695C",
  constanta: "#00838F",
  interne: "#283593",
};

export default function RelatedArticleCard({ post }: { post: PostCard }) {
  const imageUrl = post.featuredImage?.node?.sourceUrl;
  const imageAlt = post.featuredImage?.node?.altText || post.title.replace(/<[^>]*>/g, "");
  const categoryColor = post.category
    ? (CATEGORY_COLORS[post.category.slug] ?? "#1565C0")
    : "#1565C0";

  return (
    <Link href={`/articol/${post.slug}`} className="block not-prose my-6">
      <div
        style={{
          border: "1px solid #1565C0",
          background: "#F0F4FF",
          borderRadius: 10,
          padding: "12px 14px",
          display: "flex",
          gap: 14,
          alignItems: "center",
        }}
      >
        {imageUrl && (
          <div
            style={{
              flexShrink: 0,
              borderRadius: 6,
              overflow: "hidden",
              background: "#DBEAFE",
            }}
            className="w-[100px] h-[70px] md:w-[120px] md:h-[85px]"
          >
            <Image
              src={imageUrl}
              alt={imageAlt}
              width={120}
              height={85}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div style={{ flex: 1, minWidth: 0 }}>
          {post.category && (
            <span
              style={{
                display: "inline-block",
                backgroundColor: categoryColor,
                color: "#fff",
                fontSize: 10,
                fontWeight: 700,
                padding: "2px 8px",
                borderRadius: 20,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: 5,
              }}
            >
              {post.category.name}
            </span>
          )}
          <p
            style={{ fontWeight: 600, lineHeight: 1.4, color: "#1a2033", margin: 0 }}
            className="text-[14px] md:text-[15px] line-clamp-4 md:line-clamp-3"
            dangerouslySetInnerHTML={{ __html: post.title }}
          />
        </div>

        {/* Chevron */}
        <svg
          style={{ flexShrink: 0, color: "#1565C0", opacity: 0.6 }}
          width={18}
          height={18}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
