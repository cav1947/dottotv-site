export type ContentSegment =
  | { type: "html"; content: string }
  | { type: "related"; slug: string };

/**
 * Splits an HTML string into segments, separating out <!-- related:ID:SLUG --> comments
 * emitted by the [articol_related slug="..."] WordPress shortcode.
 */
export function parseContentSegments(html: string): ContentSegment[] {
  const segments: ContentSegment[] = [];
  const regex = /<!--\s*related:[^:]*:([a-zA-Z0-9-]+)\s*-->/gi;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(html)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: "html", content: html.slice(lastIndex, match.index) });
    }
    segments.push({ type: "related", slug: match[1] });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < html.length) {
    segments.push({ type: "html", content: html.slice(lastIndex) });
  }

  return segments;
}

/**
 * Extracts all unique slugs from <!-- related:ID:SLUG --> HTML comments.
 */
export function extractRelatedSlugs(html: string): string[] {
  const slugs: string[] = [];
  const regex = /<!--\s*related:[^:]*:([a-zA-Z0-9-]+)\s*-->/gi;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(html)) !== null) {
    if (!slugs.includes(match[1])) slugs.push(match[1]);
  }
  return slugs;
}
