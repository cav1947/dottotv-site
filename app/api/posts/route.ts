import { NextRequest, NextResponse } from "next/server";
import { getPostsByCategory } from "@/lib/wordpress";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const category = searchParams.get("category") ?? "";
  const after = searchParams.get("after") ?? undefined;
  const limit = Math.min(Number(searchParams.get("limit")) || 12, 24);

  if (!category) return NextResponse.json({ posts: [], pageInfo: { hasNextPage: false, endCursor: "" } });

  const result = await getPostsByCategory(category, limit, after).catch(() => ({
    posts: [],
    pageInfo: { hasNextPage: false, endCursor: "" },
  }));

  return NextResponse.json(result);
}
