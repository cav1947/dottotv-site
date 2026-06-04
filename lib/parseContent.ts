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

// Matches a whole Gutenberg file block: <div class="wp-block-file">…</div>.
// wp-block-file nu conține alte <div>-uri imbricate, deci match-ul non-greedy
// până la primul </div> acoperă blocul complet.
const WP_FILE_BLOCK_RE =
  /<div[^>]*\bclass=["'][^"']*\bwp-block-file\b[^"']*["'][^>]*>([\s\S]*?)<\/div>/gi;

// Primul href dintr-un fișier .pdf (cu eventual query/hash după extensie).
const PDF_HREF_RE = /href=["']([^"']+\.pdf(?:[?#][^"']*)?)["']/i;

// Butonul de descărcare original generat de WordPress (wp-block-file__button).
const FILE_BUTTON_RE =
  /<a[^>]*\bclass=["'][^"']*\bwp-block-file__button\b[^"']*["'][^>]*>[\s\S]*?<\/a>/i;

/**
 * Înlocuiește blocurile wp-block-file care conțin un PDF cu un viewer embedded
 * (iframe Google Docs Viewer) urmat de link-ul de descărcare original.
 * Alte tipuri de fișiere rămân neschimbate.
 */
export function transformPdfEmbeds(html: string): string {
  if (!html || !html.includes("wp-block-file")) return html;

  return html.replace(WP_FILE_BLOCK_RE, (block, inner) => {
    const urlMatch = inner.match(PDF_HREF_RE);
    if (!urlMatch) return block; // nu e PDF — lăsăm blocul neatins

    const pdfUrl = urlMatch[1];

    // Păstrăm butonul de descărcare original dacă există; altfel construim unul.
    const buttonMatch = inner.match(FILE_BUTTON_RE);
    const downloadLink =
      buttonMatch?.[0] ??
      `<a href="${pdfUrl}" class="wp-block-file__button wp-element-button" download>Descarcă PDF</a>`;

    // Embed nativ: <object> (randat de browser), cu fallback la <iframe> și
    // în final un link de descărcare dacă nici iframe-ul nu se încarcă.
    return (
      `<div class="pdf-embed">` +
      `<object class="pdf-embed__frame" data="${pdfUrl}#toolbar=1" type="application/pdf">` +
      `<iframe class="pdf-embed__frame" src="${pdfUrl}" title="Previzualizare PDF">` +
      `<p>PDF-ul nu poate fi afișat. <a href="${pdfUrl}">Descarcă PDF</a></p>` +
      `</iframe>` +
      `</object>` +
      `<div class="pdf-embed__download">${downloadLink}</div>` +
      `</div>`
    );
  });
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
