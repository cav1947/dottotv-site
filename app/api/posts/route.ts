import { NextRequest, NextResponse } from "next/server";
import { getPostsByCategory, getPostsByTag } from "@/lib/wordpress";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const category = searchParams.get("category") ?? "";
  const tag = searchParams.get("tag") ?? "";
  const after = searchParams.get("after") ?? undefined;
  const limit = Math.min(Number(searchParams.get("limit")) || 12, 24);

  const empty = { posts: [], pageInfo: { hasNextPage: false, endCursor: "" } };

  if (tag) {
    const result = await getPostsByTag(tag, limit, after).catch(() => empty);
    return NextResponse.json(result);
  }

  if (!category) return NextResponse.json(empty);

  const result = await getPostsByCategory(category, limit, after).catch(() => empty);
  return NextResponse.json(result);
}
