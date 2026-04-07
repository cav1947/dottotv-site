import { NextRequest, NextResponse } from "next/server";
import { generateSEOForArticle } from "@/lib/claude";

// Webhook de la WordPress - se apelează la publicarea unui articol nou
// Configurează în WordPress: Settings > WPGraphQL > Webhooks sau folosește
// un plugin de webhook (WP Webhooks, etc.)

export async function POST(request: NextRequest) {
  // Verifică secret key pentru securitate
  const authHeader = request.headers.get("authorization");
  const expectedToken = `Bearer ${process.env.WEBHOOK_SECRET || "dottotv-seo-webhook"}`;

  if (authHeader !== expectedToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, excerpt, content, category, author, publishDate, slug } = body;

    if (!title || !slug) {
      return NextResponse.json(
        { error: "title și slug sunt obligatorii" },
        { status: 400 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dottotv.ro";
    const articleUrl = `${siteUrl}/articol/${slug}`;

    const seoData = await generateSEOForArticle({
      title,
      excerpt: excerpt || "",
      content: content || "",
      category: category || "Știri",
      author: author || "DottoTV",
      publishDate: publishDate || new Date().toISOString(),
      url: articleUrl,
    });

    return NextResponse.json({
      success: true,
      seo: seoData,
      slug,
    });
  } catch (error) {
    console.error("SEO generation error:", error);
    return NextResponse.json(
      { error: "Eroare la generarea SEO" },
      { status: 500 }
    );
  }
}

// GET pentru testare
export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "SEO Generator API - DottoTV",
    usage: "POST cu JSON: { title, excerpt, content, category, author, publishDate, slug }",
  });
}
