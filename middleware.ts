import { NextRequest, NextResponse } from "next/server";

const FALLBACK_URL = "https://dottotv.ro";

interface ShortRecord {
  url: string;
  title?: string;
  description?: string;
  image?: string;
}

// Boți sociali care fetch-uiesc OG meta tags pentru preview
const BOT_REGEX =
  /facebookexternalhit|facebot|whatsapp|twitterbot|linkedinbot|slackbot|telegrambot|discordbot|pinterest|vkshare|yandex|bingbot|googlebot|applebot|skypeuripreview|embedly|redditbot|baiduspider|duckduckbot|mastodon|metaexternalagent|iframely|tumblrbot|qwantify/i;

function isBot(ua: string): boolean {
  return BOT_REGEX.test(ua);
}

function parseShortValue(raw: unknown): ShortRecord | null {
  if (typeof raw !== "string" || !raw) return null;
  if (raw.startsWith("{")) {
    try {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object" && typeof parsed.url === "string") {
        return parsed as ShortRecord;
      }
    } catch {
      /* fallthrough */
    }
  }
  return { url: raw };
}

async function lookupShortRecord(code: string): Promise<ShortRecord | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  try {
    const res = await fetch(`${url}/get/short:${encodeURIComponent(code)}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { result?: string | null };
    return parseShortValue(data.result);
  } catch {
    return null;
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderOgHtml(rec: ShortRecord): string {
  const title = rec.title || "DOTTO TV – Știri din Constanța și Dobrogea";
  const description =
    rec.description || "Televiziunea locală a județului Constanța.";
  const image = rec.image || "https://dottotv.ro/images/og-default.jpg";
  const target = rec.url;

  return `<!DOCTYPE html>
<html lang="ro">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}">
<meta name="robots" content="noindex, nofollow">
<link rel="canonical" href="${escapeHtml(target)}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="DOTTO TV">
<meta property="og:url" content="${escapeHtml(target)}">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:image" content="${escapeHtml(image)}">
<meta property="og:locale" content="ro_RO">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@dottotv">
<meta name="twitter:title" content="${escapeHtml(title)}">
<meta name="twitter:description" content="${escapeHtml(description)}">
<meta name="twitter:image" content="${escapeHtml(image)}">
<meta http-equiv="refresh" content="0; url=${escapeHtml(target)}">
</head>
<body style="font-family:system-ui,sans-serif;padding:2rem;color:#374151;">
<p>Redirecționare către <a href="${escapeHtml(target)}">${escapeHtml(title)}</a>…</p>
<script>window.location.replace(${JSON.stringify(target)});</script>
</body>
</html>`;
}

export async function middleware(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").toLowerCase();
  const subdomain = host.split(":")[0].split(".")[0];
  const url = request.nextUrl;

  // ── go.dottotv.ro/<cod> ─────────────────────────────────────────────
  if (subdomain === "go") {
    const code = url.pathname.slice(1).split("/")[0];

    if (!code || !/^[a-zA-Z0-9_-]{1,32}$/.test(code)) {
      return NextResponse.redirect(FALLBACK_URL, 307);
    }

    const record = await lookupShortRecord(code);
    if (!record) {
      return NextResponse.redirect(FALLBACK_URL, 307);
    }

    const ua = request.headers.get("user-agent") ?? "";
    if (isBot(ua)) {
      return new NextResponse(renderOgHtml(record), {
        status: 200,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          // CDN poate cache-ui — dar variază pe User-Agent (bot vs user)
          "Cache-Control": "public, max-age=300, s-maxage=600",
          Vary: "User-Agent",
          "X-Robots-Tag": "noindex, nofollow",
        },
      });
    }

    return NextResponse.redirect(record.url, 301);
  }

  // ── tools.dottotv.ro/* → rewrite intern către /tools/* ──────────────
  if (subdomain === "tools") {
    if (!url.pathname.startsWith("/tools") && !url.pathname.startsWith("/api")) {
      const rewriteUrl = url.clone();
      rewriteUrl.pathname = url.pathname === "/" ? "/tools" : `/tools${url.pathname}`;
      const response = NextResponse.rewrite(rewriteUrl);
      response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
      return response;
    }

    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    return response;
  }

  // ── dottotv.ro/tools/* → redirect la subdomeniul tools ──────────────
  if (url.pathname.startsWith("/tools")) {
    const newPath = url.pathname.replace(/^\/tools/, "") || "/";
    const target = new URL(`${newPath}${url.search}`, "https://tools.dottotv.ro");
    return NextResponse.redirect(target, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|news-sitemap.xml|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|woff|woff2|ttf|map)).*)",
  ],
};
