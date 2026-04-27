import { getLatestPosts } from "@/lib/wordpress";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dottotv.ro";
const WINDOW_MS = 48 * 60 * 60 * 1000;

export const revalidate = 300;

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function decodeEntities(s: string): string {
  return s
    .replace(/&#8217;|&#8216;/g, "'")
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/&#8211;|&#8212;/g, "-")
    .replace(/&#8230;/g, "...")
    .replace(/&hellip;/g, "...")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'");
}

export async function GET() {
  const posts = await getLatestPosts(50).catch(() => []);
  const cutoff = Date.now() - WINDOW_MS;

  const recent = posts.filter((p) => {
    const t = new Date(p.date).getTime();
    return Number.isFinite(t) && t >= cutoff;
  });

  const urls = recent
    .map((p) => {
      const loc = `${SITE_URL}/articol/${p.slug}`;
      const pubDate = new Date(p.date).toISOString();
      const title = escapeXml(decodeEntities(p.title));
      return `  <url>
    <loc>${loc}</loc>
    <news:news>
      <news:publication>
        <news:name>DOTTO TV</news:name>
        <news:language>ro</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title>${title}</news:title>
    </news:news>
  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
