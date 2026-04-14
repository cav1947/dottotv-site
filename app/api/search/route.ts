import { NextRequest, NextResponse } from "next/server";
import { searchPosts } from "@/lib/wordpress";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q") ?? "";
  if (q.trim().length < 3) return NextResponse.json([]);

  const posts = await searchPosts(q.trim(), 7).catch(() => []);

  return NextResponse.json(
    posts.map((p) => ({
      slug: p.slug,
      title: p.title,
      date: p.date,
      image: p.featuredImage?.node?.sourceUrl ?? null,
      category: p.categories?.nodes?.[0]
        ? { name: p.categories.nodes[0].name, slug: p.categories.nodes[0].slug }
        : null,
    }))
  );
}
