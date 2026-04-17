export type ContentSegment =
  | { type: "html"; content: string }
  | { type: "related"; slug: string };

// Matches (in order of capture groups):
//   1. <!-- related:ID:SLUG --> shortcode comment
//   2. <p><a href="https://...dottotv.ro/articol/SLUG">…</a></p>  (paragraph with only a link)
//   3. <p>https://...dottotv.ro/articol/SLUG</p>                  (paragraph with only a bare URL)
const RELATED_RE =
  /(?:<!--\s*related:[^:]*:([a-zA-Z0-9-]+)\s*-->)|(?:<p>\s*<a[^>]*href="https?:\/\/(?:www\.)?dottotv\.ro\/articol\/([a-zA-Z0-9-]+)"[^>]*>[^<]*<\/a>\s*<\/p>)|(?:<p>\s*https?:\/\/(?:www\.)?dottotv\.ro\/articol\/([a-zA-Z0-9-]+)\s*<\/p>)/gi;

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

  while ((match = regex.exec(html)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: "html", content: html.slice(lastIndex, match.index) });
    }
    segments.push({ type: "related", slug: slugFromMatch(match) });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < html.length) {
    segments.push({ type: "html", content: html.slice(lastIndex) });
  }

  return segments;
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
