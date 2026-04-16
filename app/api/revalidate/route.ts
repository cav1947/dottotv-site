import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

const VALID_SECRET = process.env.REVALIDATE_SECRET || "dottotv-revalidate";

function revalidateAll(slug?: string, type?: string) {
  revalidatePath("/");
  revalidatePath("/", "layout"); // actualizează și layout-ul (Breaking News ticker)

  if (slug) {
    revalidatePath(`/articol/${slug}`);
  }

  if (type === "post" || !type) {
    revalidatePath("/[category]", "page");
  }
}

// Apelat din browser manual: /api/revalidate?secret=...
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== VALID_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  try {
    revalidateAll();
    return NextResponse.json({ revalidated: true, now: Date.now(), slug: "all" });
  } catch (error) {
    return NextResponse.json(
      { error: "Revalidation failed", details: String(error) },
      { status: 500 }
    );
  }
}

// Apelat de WordPress când se publică/actualizează un articol
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== VALID_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const { slug, type } = body;

    revalidateAll(slug, type);

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      slug: slug || "all",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Revalidation failed", details: String(error) },
      { status: 500 }
    );
  }
}
