"use client";

import Link from "next/link";

interface Props {
  slot: string;
  width: number;
  height: number;
  className?: string;
}

// ── Per-slot visual themes ──────────────────────────────────────────
type Theme = {
  gradient: string;
  brand: string;
  initials: string;
  tagline: string;
  sub: string;
  cta: string;
  ctaHref?: string;
};

const THEMES: Record<string, Theme> = {
  "homepage-top": {
    gradient: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 55%, #0891b2 100%)",
    brand: "TechBrand",
    initials: "TB",
    tagline: "Soluții digitale pentru afacerea ta modernă",
    sub: "Consultanță IT · Dezvoltare Web · Cloud",
    cta: "Află mai mult",
  },
  "homepage-strip": {
    gradient: "linear-gradient(135deg, #6d28d9 0%, #7c3aed 45%, #db2777 100%)",
    brand: "StyleHub",
    initials: "SH",
    tagline: "Colecția nouă — reduceri până la 40%",
    sub: "Modă · Accesorii · Livrare gratuită",
    cta: "Cumpără acum",
  },
  "homepage-mid": {
    gradient: "linear-gradient(135deg, #065f46 0%, #059669 50%, #0d9488 100%)",
    brand: "EcoShop",
    initials: "ES",
    tagline: "Produse eco certificate · Livrare în 24h",
    sub: "Sustenabil · Natural · Verificat",
    cta: "Comandă acum",
  },
  "homepage-bottom": {
    gradient: "linear-gradient(135deg, #78350f 0%, #b45309 45%, #d97706 100%)",
    brand: "CasaMea",
    initials: "CM",
    tagline: "Imobiliare Constanța — casa perfectă te așteaptă",
    sub: "Vânzări · Închirieri · Evaluări gratuite",
    cta: "Vezi oferte",
  },
  "sidebar-top": {
    gradient: "linear-gradient(160deg, #1e3a8a 0%, #1d4ed8 55%, #2563eb 100%)",
    brand: "BancaVii",
    initials: "BV",
    tagline: "Credit rapid fără birocraţie",
    sub: "Aprobare în 24h · Dobândă fixă",
    cta: "Aplică acum",
  },
  "sidebar-bottom": {
    gradient: "linear-gradient(160deg, #881337 0%, #be123c 45%, #e11d48 75%, #f97316 100%)",
    brand: "FoodZone",
    initials: "FZ",
    tagline: "Livrare mâncare în Constanța",
    sub: "Peste 50 restaurante partenere",
    cta: "Comandă acum",
  },
  "article-pre-content": {
    gradient: "linear-gradient(135deg, #1e3a8a 0%, #1565C0 55%, #0891b2 100%)",
    brand: "DOTTO TV",
    initials: "DT",
    tagline: "Promovează-ți afacerea pe DOTTO TV",
    sub: "Spoturi TV · Bannere online · Advertoriale",
    cta: "Contactează-ne",
    ctaHref: "/publicitate",
  },
  "article-post-content": {
    gradient: "linear-gradient(135deg, #1e3a8a 0%, #1565C0 55%, #0891b2 100%)",
    brand: "DOTTO TV",
    initials: "DT",
    tagline: "Ajungeți la audiența din Constanța și Dobrogea",
    sub: "TV · Online · Social Media · Evenimente",
    cta: "Contactează-ne",
    ctaHref: "/publicitate",
  },
};

const DEFAULT_THEME: Theme = {
  gradient: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
  brand: "BrandCo",
  initials: "BC",
  tagline: "Publicitate pe DottoTV",
  sub: "Ajungeți la cititorii din Constanța",
  cta: "Contactați-ne",
};

// ── Decorative circles (pure visual) ───────────────────────────────
function Circles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full" />
      <div className="absolute -right-4 -bottom-6 w-24 h-24 bg-white/10 rounded-full" />
      <div className="absolute left-1/2 -top-10 w-20 h-20 bg-white/5 rounded-full" />
    </div>
  );
}

// ── Logo mark ───────────────────────────────────────────────────────
function Logo({ initials, size = "md" }: { initials: string; size?: "sm" | "md" | "lg" }) {
  const dim = size === "sm" ? "w-8 h-8 text-xs" : size === "lg" ? "w-16 h-16 text-2xl" : "w-11 h-11 text-sm";
  return (
    <div className={`${dim} flex-shrink-0 bg-white/25 border border-white/30 rounded-xl flex items-center justify-center`}>
      <span className="text-white font-black">{initials}</span>
    </div>
  );
}

// ── LEADERBOARD — height ≤ 100 ──────────────────────────────────────
function HorizontalBanner({ theme, height }: { theme: Theme; height: number }) {
  return (
    <div
      className="relative rounded-lg overflow-hidden w-full flex items-center px-4 py-2 gap-3"
      style={{ background: theme.gradient, minHeight: height }}
    >
      <Circles />
      <Logo initials={theme.initials} size="sm" />
      <div className="hidden sm:flex items-center gap-3 flex-1 min-w-0">
        <div className="w-px h-8 bg-white/25 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-white font-bold text-sm leading-tight truncate">{theme.tagline}</p>
          <p className="text-white/60 text-[10px] truncate">{theme.sub}</p>
        </div>
      </div>
      <div className="flex-1 sm:hidden min-w-0">
        <p className="text-white font-bold text-xs leading-tight truncate">{theme.brand}</p>
        <p className="text-white/60 text-[10px] truncate">{theme.tagline}</p>
      </div>
      <div className="flex-shrink-0 flex flex-col items-end gap-1 z-10">
        {theme.ctaHref ? (
          <Link href={theme.ctaHref} className="bg-white/25 hover:bg-white/35 border border-white/40 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap">
            {theme.cta} →
          </Link>
        ) : (
          <button className="bg-white/25 hover:bg-white/35 border border-white/40 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap">
            {theme.cta} →
          </button>
        )}
        <span className="text-white/40 text-[9px] uppercase tracking-wider">publicitate</span>
      </div>
    </div>
  );
}

// ── RECTANGLE — 250 ≤ height < 600 ─────────────────────────────────
function RectangleBanner({ theme }: { theme: Theme }) {
  return (
    <div
      className="relative rounded-xl overflow-hidden w-full flex flex-col items-center justify-center text-center px-5 py-6 min-h-[180px] md:min-h-[250px]"
      style={{ background: theme.gradient }}
    >
      <Circles />
      <span className="text-white/50 text-[10px] uppercase tracking-widest mb-4 z-10">publicitate</span>
      <Logo initials={theme.initials} size="lg" />
      <p className="text-white font-black text-xl mt-3 z-10">{theme.brand}</p>
      <p className="text-white/70 text-xs mt-1 mb-5 leading-relaxed z-10">{theme.sub}</p>

      <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 mb-5 w-full z-10">
        <p className="text-white font-semibold text-sm leading-snug">{theme.tagline}</p>
      </div>

      {theme.ctaHref ? (
        <Link href={theme.ctaHref} className="z-10 bg-white text-gray-900 font-black text-sm px-6 py-2.5 rounded-full hover:bg-gray-100 transition-colors shadow-lg w-full text-center">
          {theme.cta} →
        </Link>
      ) : (
        <button className="z-10 bg-white text-gray-900 font-black text-sm px-6 py-2.5 rounded-full hover:bg-gray-100 transition-colors shadow-lg w-full">
          {theme.cta} →
        </button>
      )}
    </div>
  );
}

// ── HALF-PAGE — height ≥ 600 ────────────────────────────────────────
function TallBanner({ theme }: { theme: Theme }) {
  return (
    <div
      className="relative rounded-xl overflow-hidden w-full flex flex-col items-center text-center px-6 min-h-[220px] md:min-h-[600px]"
      style={{ background: theme.gradient }}
    >
      <Circles />

      {/* Top */}
      <div className="z-10 mt-8">
        <span className="text-white/50 text-[10px] uppercase tracking-widest">publicitate</span>
        <div className="flex justify-center mt-4">
          <Logo initials={theme.initials} size="lg" />
        </div>
        <p className="text-white font-black text-3xl mt-3">{theme.brand}</p>
        <p className="text-white/70 text-sm mt-1">{theme.sub}</p>
      </div>

      {/* Mid — decorative card */}
      <div className="z-10 w-full mt-8 bg-white/10 border border-white/20 rounded-2xl p-5">
        <p className="text-white font-bold text-base leading-snug">&ldquo;{theme.tagline}&rdquo;</p>
        <div className="flex justify-center gap-4 mt-4">
          {["✓ Rapid", "✓ Sigur", "✓ Eficient"].map((t) => (
            <span key={t} className="text-white/70 text-xs font-medium">{t}</span>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="z-10 grid grid-cols-3 gap-3 w-full mt-6">
        {[["10k+", "Clienți"], ["98%", "Satisfacție"], ["24h", "Suport"]].map(([val, lbl]) => (
          <div key={lbl} className="bg-white/10 rounded-xl py-3">
            <p className="text-white font-black text-lg">{val}</p>
            <p className="text-white/60 text-[10px]">{lbl}</p>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="z-10 w-full mt-auto pb-8 pt-8">
        <p className="text-white/80 text-sm mb-4">Primul pas e gratuit</p>
        {theme.ctaHref ? (
          <Link href={theme.ctaHref} className="bg-white text-gray-900 font-black text-sm px-8 py-3 rounded-full hover:bg-gray-100 transition-colors shadow-xl w-full text-center block">
            {theme.cta} →
          </Link>
        ) : (
          <button className="bg-white text-gray-900 font-black text-sm px-8 py-3 rounded-full hover:bg-gray-100 transition-colors shadow-xl w-full">
            {theme.cta} →
          </button>
        )}
        <p className="text-white/40 text-[10px] mt-3">dottotv.ro · publicitate</p>
      </div>
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────────
export default function AdBanner({ slot, width, height, className = "" }: Props) {
  const theme = THEMES[slot] ?? DEFAULT_THEME;

  return (
    <div className={`w-full ${className}`} data-ad-slot={slot}>
      {height >= 600 ? (
        <TallBanner theme={theme} />
      ) : height >= 200 ? (
        <RectangleBanner theme={theme} />
      ) : (
        <HorizontalBanner theme={theme} height={height} />
      )}
    </div>
  );
}
