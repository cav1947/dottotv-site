import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

// Apelat de WordPress când se publică/actualizează un articol
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== (process.env.REVALIDATE_SECRET || "dottotv-revalidate")) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const { slug, type } = body;

    // Revalidează pagini relevante
    revalidatePath("/");
    revalidatePath("/", "layout"); // actualizează și layout-ul (Breaking News ticker)

    if (slug) {
      revalidatePath(`/articol/${slug}`);
    }

    if (type === "post" || !type) {
      revalidatePath("/[category]", "page");
    }

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
