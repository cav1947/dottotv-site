import ArticleCard from "./ArticleCard";
import type { Post } from "@/lib/wordpress";

interface Props {
  posts: Post[];
  title?: string;
  showFeatured?: boolean;
}

export default function NewsGrid({ posts, title, showFeatured = false }: Props) {
  if (!posts.length) return null;

  const [featuredPost, ...restPosts] = posts;
  const secondaryPosts = restPosts.slice(0, 3);
  const remainingPosts = restPosts.slice(3);

  return (
    <section>
      {title && (
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-6 bg-brand-blue rounded-full" />
          <h2 className="font-playfair font-bold text-xl text-gray-900 dark:text-white">
            {title}
          </h2>
        </div>
      )}

      {showFeatured && featuredPost ? (
        <>
          {/* ── MOBILE: primele 5 articole, câte unul pe rând, overlay style ── */}
          <div className="lg:hidden flex flex-col gap-4 mb-4">
            <ArticleCard post={featuredPost} variant="featured" />
            {restPosts.slice(0, 4).map((post) => (
              <ArticleCard key={post.id} post={post} variant="featured" />
            ))}
          </div>

          {/* MOBILE: restul articolelor, 2 coloane */}
          {restPosts.length > 4 && (
            <div className="lg:hidden grid grid-cols-2 gap-3">
              {restPosts.slice(4).map((post) => (
                <ArticleCard key={post.id} post={post} variant="medium" />
              ))}
            </div>
          )}

          {/* ── DESKTOP: hero 2/3 + sidebar 1/3 ── */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-4 mb-4">
            <div className="lg:col-span-2">
              <ArticleCard post={featuredPost} variant="featured" />
            </div>
            <div className="flex flex-col gap-4">
              {secondaryPosts.map((post) => (
                <ArticleCard key={post.id} post={post} variant="small" />
              ))}
            </div>
          </div>

          {/* DESKTOP: restul articolelor */}
          {remainingPosts.length > 0 && (
            <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {remainingPosts.map((post) => (
                <ArticleCard key={post.id} post={post} variant="medium" />
              ))}
            </div>
          )}
        </>
      ) : (
        /* Secțiuni de jos — 2 coloane pe mobil */
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-4">
          {posts.map((post, index) => (
            <ArticleCard
              key={post.id}
              post={post}
              variant={index === 0 ? "large" : "medium"}
            />
          ))}
        </div>
      )}
    </section>
  );
}
