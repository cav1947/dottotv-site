# DottoTV Site - Setup Guide

## Cerințe

1. **WordPress** cu pluginuri:
   - [WPGraphQL](https://www.wpgraphql.com/) — endpoint GraphQL
   - [Yoast SEO](https://yoast.com/) + [WPGraphQL for Yoast SEO](https://github.com/ashhitch/wp-graphql-yoast-seo) — câmpuri SEO
   - [WP-PostViews](https://wordpress.org/plugins/wp-postviews/) — statistici vizualizări (opțional)

2. **Node.js** >= 18
3. **ANTHROPIC_API_KEY** de la [console.anthropic.com](https://console.anthropic.com)

## Instalare

```bash
cd dottotv-site
cp .env.local.example .env.local
# Editează .env.local cu valorile reale
npm install
npm run dev
```

## Variabile de mediu

```
WORDPRESS_API_URL=https://dottotv.ro/graphql
ANTHROPIC_API_KEY=sk-ant-...
NEXT_PUBLIC_SITE_URL=https://dottotv.ro
NEXT_PUBLIC_LIVE_STREAM_URL=https://stream.dottotv.ro/live/stream.m3u8
WEBHOOK_SECRET=secret-aleatoriu-sigur
REVALIDATE_SECRET=alt-secret-aleatoriu
```

## Funcționalități

### SEO Automat cu Claude API
La publicarea unui articol în WordPress, trimite un POST la:
```
POST https://dottotv.ro/api/generate-seo
Authorization: Bearer <WEBHOOK_SECRET>
Content-Type: application/json

{
  "title": "Titlul articolului",
  "excerpt": "Rezumatul",
  "content": "Conținutul complet",
  "category": "Constanța",
  "author": "Redacția",
  "publishDate": "2024-01-15T10:00:00Z",
  "slug": "titlul-articolului"
}
```

Răspuns:
```json
{
  "success": true,
  "seo": {
    "metaTitle": "...",
    "metaDescription": "...",
    "focusKeyword": "...",
    "ogTitle": "...",
    "schema": {...}
  }
}
```

Poți folosi pluginul **WP Webhooks** pentru a automatiza apelul la publicarea articolelor.

### Live TV
Setează `NEXT_PUBLIC_LIVE_STREAM_URL` cu URL-ul HLS (M3U8) al stream-ului live.
Instalează hls.js: `npm install hls.js @types/hls.js`

### Breaking News Ticker
Adaugă tag-ul `breaking-news` la articolele din WordPress pentru afișare în ticker.

### Bannere Publicitare
Înlocuiește placeholder-urile din `components/AdBanner.tsx` cu codul real AdSense.

### Revalidare Cache
La publicarea unui articol nou în WordPress, apelează:
```
POST https://dottotv.ro/api/revalidate?secret=<REVALIDATE_SECRET>
{"slug": "slug-articol", "type": "post"}
```

## Deploy pe Vercel

```bash
npm install -g vercel
vercel --prod
```

Configurează variabilele de mediu în Vercel Dashboard.

## Structura proiectului

```
app/
  layout.tsx          — Layout global (header, footer, breaking news)
  page.tsx            — Homepage
  [category]/page.tsx — Pagini categorii
  articol/[slug]/     — Pagini articole
  live/page.tsx       — LIVE TV
  api/
    generate-seo/     — Generare SEO cu Claude
    weather/          — API meteo
    revalidate/       — ISR revalidation
components/
  Header.tsx          — Navigare cu categorii, search, dark mode
  Footer.tsx          — Footer complet
  ArticleCard.tsx     — Card articol (5 variante)
  NewsGrid.tsx        — Grid știri cu featured
  Sidebar.tsx         — Sidebar cu top citite, meteo, categorii
  BreakingNewsTicker  — Ticker animat
  WeatherWidget.tsx   — Meteo Constanța
  AdBanner.tsx        — Bannere cu scroll reveal
  LiveTVPlayer.tsx    — Player HLS
  ScrollReveal.tsx    — Animație la scroll
lib/
  wordpress.ts        — Queries GraphQL WordPress
  claude.ts           — Claude API pentru SEO
  weather.ts          — Open-Meteo API (gratuit, no key)
```
