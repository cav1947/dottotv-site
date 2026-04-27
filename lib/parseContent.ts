export type ContentSegment =
  | { type: "html"; content: string }
  | { type: "related"; slug: string };

// Matches (in order of capture groups):
//   1. <!-- related:ID:SLUG --> shortcode comment
//   2. <p …><a href="https://...dottotv.ro/articol/SLUG[/]">…</a></p>  (paragraph with only a link)
//   3. <p …>https://...dottotv.ro/articol/SLUG[/]</p>                  (paragraph with only a bare URL)
// Handles: optional trailing slash, <p> with attributes, single or double-quoted href, HTML in link text
const RELATED_RE =
  /(?:<!--\s*related:[^:]*:([a-zA-Z0-9-]+)\s*-->)|(?:<p[^>]*>\s*<a[^>]*href=["']https?:\/\/(?:www\.)?dottotv\.ro\/articol\/([a-zA-Z0-9-]+)\/?["'][^>]*>.*?<\/a>\s*<\/p>)|(?:<p[^>]*>\s*https?:\/\/(?:www\.)?dottotv\.ro\/articol\/([a-zA-Z0-9-]+)\/?\s*<\/p>)/gi;

function slugFromMatch(match: RegExpExecArray): string {
  return match[1] || match[2] || match[3];
}

/**
 * Splits an HTML string into segments, separating out:
 *   - <!-- related:ID:SLUG --> comments (from [articol_related] shortcode)
 *   - <p> tags containing only an internal dottotv.ro/articol/SLUG URL (bare or linked)
 */
export function parseContentSegments(html: string): ContentSegment[] {
  const segments: ContentSegment[] = [];
  const regex = new RegExp(RELATED_RE.source, "gi");
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  const matchedSlugs = new Set<string>();

  while ((match = regex.exec(html)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: "html", content: html.slice(lastIndex, match.index) });
    }
    const slug = slugFromMatch(match);
    matchedSlugs.add(slug);
    segments.push({ type: "related", slug });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < html.length) {
    segments.push({ type: "html", content: html.slice(lastIndex) });
  }

  // TEMP DEBUG — diagnostic pentru URL-uri interne ratate de RELATED_RE.
  // Setează DEBUG_RELATED=1 în .env.local ca să vezi log-urile în consola serverului.
  // Șterge acest bloc după ce diagnosticăm problema.
  if (process.env.DEBUG_RELATED === "1") {
    debugLogRelatedMisses(html, matchedSlugs);
  }

  return segments;
}

// TEMP DEBUG helper — scanează HTML-ul cu un pattern larg și compară cu ce a prins regex-ul principal.
function debugLogRelatedMisses(html: string, matched: Set<string>): void {
  const CANDIDATE_RE = /https?:\/\/(?:www\.)?dottotv\.ro\/articol\/[^\s"'<>]+/gi;
  const candidates: Array<{ url: string; slug: string; index: number }> = [];
  let m: RegExpExecArray | null;
  while ((m = CANDIDATE_RE.exec(html)) !== null) {
    const raw = m[0];
    const slugPart = raw.match(/\/articol\/([^/?#]+)/)?.[1] ?? "";
    candidates.push({ url: raw, slug: slugPart.replace(/\/$/, ""), index: m.index });
  }

  console.log(`[parseContent] matched slugs (${matched.size}):`, Array.from(matched));
  console.log(`[parseContent] candidate URLs found (${candidates.length}):`);
  for (const c of candidates) {
    const hit = matched.has(c.slug);
    const label = hit ? "HIT " : "MISS";
    console.log(`[parseContent]  ${label} slug="${c.slug}" url="${c.url}"`);
    if (!hit) {
      const start = Math.max(0, c.index - 60);
      const end = Math.min(html.length, c.index + c.url.length + 60);
      const context = html.slice(start, end).replace(/\s+/g, " ");
      console.log(`[parseContent]       context: …${context}…`);
    }
  }
}

/**
 * Extracts all unique slugs from related markers (shortcode comments + standalone internal URLs).
 */
export function extractRelatedSlugs(html: string): string[] {
  const slugs: string[] = [];
  const regex = new RegExp(RELATED_RE.source, "gi");
  let match: RegExpExecArray | null;
  while ((match = regex.exec(html)) !== null) {
    const slug = slugFromMatch(match);
    if (!slugs.includes(slug)) slugs.push(slug);
  }
  return slugs;
}
