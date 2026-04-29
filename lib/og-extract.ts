// Fetch un URL și extrage tag-urile OG/Twitter/title fără dependențe externe.
// Citește incremental și se oprește când întâlnește </head> sau atinge limita.

export interface OgData {
  title?: string;
  description?: string;
  image?: string;
}

const MAX_BYTES = 256 * 1024; // 256KB e mai mult decât suficient pentru <head>
const FETCH_TIMEOUT_MS = 6000;

export async function fetchOgData(targetUrl: string): Promise<OgData> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(targetUrl, {
      signal: controller.signal,
      headers: {
        // UA generos — unele site-uri servesc OG diferit pentru boți
        "User-Agent":
          "Mozilla/5.0 (compatible; DottoTV-LinkPreview/1.0; +https://dottotv.ro)",
        Accept: "text/html,application/xhtml+xml",
      },
      redirect: "follow",
    });

    if (!res.ok || !res.body) return {};

    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let html = "";
    let bytesRead = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) {
        bytesRead += value.length;
        html += decoder.decode(value, { stream: true });
      }
      if (html.includes("</head>") || bytesRead >= MAX_BYTES) {
        try {
          await reader.cancel();
        } catch {
          /* nimic */
        }
        break;
      }
    }
    html += decoder.decode();

    return extractAll(html);
  } catch {
    return {};
  } finally {
    clearTimeout(timer);
  }
}

function extractMetaContent(
  html: string,
  attr: "property" | "name",
  value: string
): string | undefined {
  // Două variante: atributul (property/name) înaintea content, și invers
  const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re1 = new RegExp(
    `<meta[^>]*\\b${attr}\\s*=\\s*["']${escaped}["'][^>]*\\bcontent\\s*=\\s*["']([^"']*)["']`,
    "i"
  );
  const re2 = new RegExp(
    `<meta[^>]*\\bcontent\\s*=\\s*["']([^"']*)["'][^>]*\\b${attr}\\s*=\\s*["']${escaped}["']`,
    "i"
  );
  return html.match(re1)?.[1] ?? html.match(re2)?.[1];
}

function extractTitle(html: string): string | undefined {
  return html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim();
}

function extractAll(html: string): OgData {
  const title =
    extractMetaContent(html, "property", "og:title") ??
    extractMetaContent(html, "name", "twitter:title") ??
    extractTitle(html);

  const description =
    extractMetaContent(html, "property", "og:description") ??
    extractMetaContent(html, "name", "twitter:description") ??
    extractMetaContent(html, "name", "description");

  const image =
    extractMetaContent(html, "property", "og:image") ??
    extractMetaContent(html, "name", "twitter:image") ??
    extractMetaContent(html, "property", "og:image:url");

  return {
    title: clean(decodeHtmlEntities(title)),
    description: clean(decodeHtmlEntities(description)),
    image: clean(decodeHtmlEntities(image)),
  };
}

function clean(s: string | undefined): string | undefined {
  if (!s) return undefined;
  const trimmed = s.replace(/\s+/g, " ").trim();
  return trimmed || undefined;
}

function decodeHtmlEntities(s: string | undefined): string | undefined {
  if (!s) return s;
  return s
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, code) =>
      String.fromCharCode(parseInt(code, 16))
    )
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#039;/g, "'");
}
