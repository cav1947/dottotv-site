// Detectează dacă un articol conține video sau embed de social media care
// merită iconița play pe card. Acoperă:
//   • iframe-uri YouTube / youtube-nocookie / Vimeo (URL de tip /embed/ sau player)
//   • Embed-uri TikTok (blockquote.tiktok-embed sau URL cu /video/) — profilurile
//     simple (link <a> către tiktok.com/@user) NU se potrivesc
//   • Embed-uri Instagram (blockquote.instagram-media — Reels și posts)
//   • Embed-uri X / Twitter (blockquote.twitter-tweet)
//   • Facebook video (plugin video.php sau URL canonic /videos/) — postările
//     non-video (permalink, /posts) NU se potrivesc
//   • Upload-uri native: tag <video și blocul wp-block-video
const VIDEO_RE =
  /youtube(?:-nocookie)?\.com\/embed\/|player\.vimeo\.com\/video\/|class=["'][^"']*\b(?:tiktok-embed|instagram-media|twitter-tweet)\b|tiktok\.com\/[^"'\s<>]*\/video\/|facebook\.com\/plugins\/video\.php|facebook\.com\/[^"'\s<>]+\/videos\/|<video[\s>]|wp-block-video/i;

export function hasVideo(content: string | null | undefined): boolean {
  if (!content) return false;
  return VIDEO_RE.test(content);
}
