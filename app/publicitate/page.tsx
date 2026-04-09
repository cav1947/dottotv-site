import type { Metadata } from "next";
import PublicitateForm from "@/components/PublicitateForm";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Publicitate",
  description:
    "Promovați-vă brandul pe DOTTO TV — televiziunea județului Constanța. Acoperire TV și digitală națională. Contactați directorul de publicitate pentru o ofertă personalizată.",
  alternates: { canonical: `${SITE_URL}/publicitate` },
};

const ACCENT = "#1565C0";
const ACCENT_LIGHT = "#E3EEFF";
const ACCENT_MID = "#1976D2";

// ─── date statistici ──────────────────────────────────────────────────────────

const socialStats = [
  {
    platform: "Facebook",
    color: "#1877F2",
    bg: "#EBF3FF",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    stats: [
      { label: "Urmăritori", value: "74.500", highlight: true },
      { label: "Creștere lunară", value: "+3.000" },
      { label: "Vizualizări / lună", value: "4,4 mil." },
      { label: "Interacțiuni / lună", value: "70.000" },
      { label: "Creștere urmăritori", value: "+149%" },
    ],
  },
  {
    platform: "YouTube",
    color: "#FF0000",
    bg: "#FFF0F0",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    stats: [
      { label: "Urmăritori", value: "7.000", highlight: true },
      { label: "Vizualizări / lună", value: "33.000" },
      { label: "Creștere", value: "+31%" },
    ],
  },
  {
    platform: "TikTok",
    color: "#000000",
    bg: "#F5F5F5",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
    stats: [
      { label: "Urmăritori", value: "7.800", highlight: true },
      { label: "Vizualizări / lună", value: "200.000" },
      { label: "Creștere", value: "+26%" },
    ],
  },
  {
    platform: "Instagram",
    color: "#E1306C",
    bg: "#FFF0F5",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
    stats: [
      { label: "Urmăritori", value: "2.200", highlight: true },
      { label: "Vizualizări / lună", value: "160.000" },
      { label: "Creștere", value: "+33%" },
    ],
  },
];

const tvProviders = [
  { name: "INTERSAT", position: "100", color: "#FF6B35" },
  { name: "GMB", position: "42", color: "#7B2D8B" },
  { name: "DIGI", position: "210", color: "#E30000" },
  { name: "Vodafone", position: "753", color: "#E60000" },
  { name: "Orange", position: "802", color: "#FF6600" },
];

const services = [
  {
    title: "Bannere publicitare pe site",
    desc: "Vizibilitate continuă pe dottotv.ro, cu targetare geografică în județul Constanța.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Spoturi TV",
    desc: "Difuzare în grila de programe DOTTO TV pe toate rețelele de cablu și satelit.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
      </svg>
    ),
  },
  {
    title: "Pachete combinate TV + online",
    desc: "Expunere maximă: spot TV plus bannere digitale plus social media într-un singur pachet.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    title: "Advertorial",
    desc: "Articol publicitar integrat editorial, distribuit pe site și social media.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 11v4M12 7h.01" />
      </svg>
    ),
  },
  {
    title: "Parteneriate media",
    desc: "Colaborare strategică pe termen lung cu mențiune constantă în toate materialele.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Realizare emisiuni",
    desc: "Concepem și producem emisiuni tematice adaptate brandului dvs.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
      </svg>
    ),
  },
  {
    title: "Închiriere studio fizic & virtual",
    desc: "Studio complet echipat disponibil pentru producții proprii cu sau fără echipă DottoTV.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 22V12h6v10" />
      </svg>
    ),
  },
  {
    title: "Transmisiuni live",
    desc: "Acoperire live a evenimentelor și conferințelor de presă cu difuzare pe toate platformele.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728M9 12a3 3 0 106 0 3 3 0 00-6 0m-3.536 5.196A6.97 6.97 0 015 12a6.97 6.97 0 01.464-2.536" />
      </svg>
    ),
  },
  {
    title: "Producție video publicitară",
    desc: "Clipuri publicitare și prezentări corporate produse de echipa DottoTV.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
      </svg>
    ),
  },
  {
    title: "Branded content",
    desc: "Articole și reportaje sponsorizate care prezintă brandul dvs. în context editorial.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    title: "Promovare social media",
    desc: "Conținut dedicat brandului dvs. distribuit pe canalele DottoTV cu 74.500+ fani.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
    ),
  },
  {
    title: "Ticker publicitar",
    desc: "Textul brandului rulează în ticker-ul de breaking news, cu vizibilitate maximă în timp real.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Sponsorizare emisiune",
    desc: "\"Emisiunea X este prezentată de Brandul Y\" — asociere directă cu conținut editorial de calitate.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    title: "Interviu corporate",
    desc: "Compania dvs. prezentată într-un interviu editorial de impact, difuzat TV și online.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
  },
  {
    title: "Eveniment mediatizat",
    desc: "DottoTV acoperă evenimentul dvs. și îl promovează pe toate canalele media.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Pachet digital complet",
    desc: "Banner site + social media + articol + spot TV — soluția all-in-one pentru impact maxim.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
];

// ─── helpers ──────────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-3">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-blue-200 dark:to-blue-900 max-w-[80px]" />
      <span
        className="text-xs font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full"
        style={{ color: ACCENT, backgroundColor: ACCENT_LIGHT }}
      >
        {children}
      </span>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-blue-200 dark:to-blue-900 max-w-[80px]" />
    </div>
  );
}

// ─── page ─────────────────────────────────────────────────────────────────────

export default function PublicitatePage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">

      {/* ═══════════════════════════════════════════
          1. HERO
      ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_MID} 60%, #2196F3 100%)` }}>
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Glow circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #90CAF9, transparent)" }} />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #BBDEFB, transparent)" }} />

        <div className="relative container mx-auto px-4 py-20 md:py-28 max-w-5xl text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
              style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#BBDEFB" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-200 animate-pulse" />
              DOTTO TV · Județul Constanța
            </div>
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
              style={{ backgroundColor: "rgba(255,215,0,0.2)", color: "#FFD700", border: "1px solid rgba(255,215,0,0.35)" }}
            >
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
              </svg>
              Singura televiziune din Constanța cu emisie continuă 24/7
            </div>
          </div>

          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Publicitatea care<br />
            <span style={{ color: "#90CAF9" }}>ajunge la oameni</span>
          </h1>

          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            DOTTO TV este vocea județului Constanța — prezentă pe cablul TV, pe internet și pe rețelele sociale,
            cu o acoperire digitală națională în continuă creștere.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-wider transition-all hover:brightness-110 hover:-translate-y-0.5 shadow-lg shadow-blue-900/40"
              style={{ backgroundColor: "#FFF", color: ACCENT }}
            >
              Solicită ofertă personalizată
            </a>
            <a
              href="#servicii"
              className="px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-wider border border-white/30 text-white hover:bg-white/10 transition-all"
            >
              Vezi serviciile
            </a>
          </div>

          {/* Quick stats strip */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { label: "Urmăritori Facebook", value: "74.500+" },
              { label: "Vizualizări FB / lună", value: "4,4 mil." },
              { label: "Rețele TV distribuite", value: "5" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl px-4 py-4 text-center"
                style={{ backgroundColor: "rgba(255,255,255,0.1)", backdropFilter: "blur(4px)" }}
              >
                <div className="text-2xl font-bold text-white mb-1">{s.value}</div>
                <div className="text-xs text-blue-200 leading-tight">{s.label}</div>
              </div>
            ))}

            {/* Aplicație mobilă */}
            <div
              className="rounded-xl px-4 py-4 text-center flex flex-col items-center justify-center gap-2"
              style={{ backgroundColor: "rgba(255,255,255,0.1)", backdropFilter: "blur(4px)" }}
            >
              <svg className="w-5 h-5 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <div className="text-xs text-blue-200 leading-snug">Aplicație mobilă</div>
              <div className="flex items-center gap-2">
                <a
                  href="https://apps.apple.com/us/app/dotto-tv/id1559000839"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-bold text-white bg-white/20 hover:bg-white/30 transition-colors px-2 py-0.5 rounded-md"
                >
                  App Store
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=dottotv.ro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-bold text-white bg-white/20 hover:bg-white/30 transition-colors px-2 py-0.5 rounded-md"
                >
                  Google Play
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-6xl space-y-20">

        {/* ═══════════════════════════════════════════
            2. CIFRE DE IMPACT — SOCIAL MEDIA
        ═══════════════════════════════════════════ */}
        <section>
          <div className="text-center mb-10">
            <SectionLabel>Cifre de impact</SectionLabel>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Prezența digitală DOTTO TV
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-xl mx-auto">
              Numere reale, creștere organică, audiență autentică — partenerul ideal pentru campaniile dvs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {socialStats.map((platform) => (
              <div
                key={platform.platform}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col gap-5 hover:shadow-md transition-shadow"
              >
                {/* Platform header */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                    style={{ backgroundColor: platform.color }}
                  >
                    {platform.icon}
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white">{platform.platform}</span>
                </div>

                {/* Stats */}
                <div className="space-y-3">
                  {platform.stats.map((stat) => (
                    <div key={stat.label} className="flex items-baseline justify-between gap-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400 leading-tight">{stat.label}</span>
                      <span
                        className={`font-bold text-sm flex-shrink-0 ${stat.highlight ? "text-lg" : ""}`}
                        style={{ color: stat.highlight ? platform.color : undefined }}
                      >
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Color bar */}
                <div className="h-1 rounded-full w-full mt-auto opacity-20" style={{ backgroundColor: platform.color }} />
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            3. DISTRIBUȚIE TV
        ═══════════════════════════════════════════ */}
        <section>
          <div className="text-center mb-10">
            <SectionLabel>Distribuție TV</SectionLabel>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              DOTTO TV în grila națională
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-xl mx-auto">
              Disponibil pe toate rețelele majore de cablu și satelit din România.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {tvProviders.map((p) => (
              <div
                key={p.name}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 text-center shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors group-hover:brightness-110"
                  style={{ backgroundColor: p.color }}
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="font-bold text-gray-900 dark:text-white mb-1">{p.name}</div>
                <div
                  className="text-2xl font-bold"
                  style={{ color: p.color }}
                >
                  {p.position}
                </div>
                <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">poziția în grilă</div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            4. AUDIENȚĂ
        ═══════════════════════════════════════════ */}
        <section>
          <div className="text-center mb-10">
            <SectionLabel>Audiența noastră</SectionLabel>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Cine urmărește DOTTO TV
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-xl mx-auto">
              O audiență valoroasă, loială și concentrată în principalele centre urbane din Dobrogea și nu numai.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Gen */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <svg className="w-5 h-5" style={{ color: ACCENT }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Distribuție gen
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Bărbați</span>
                    <span className="font-bold" style={{ color: ACCENT }}>59%</span>
                  </div>
                  <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: "59%", backgroundColor: ACCENT }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Femei</span>
                    <span className="font-bold text-pink-500">41%</span>
                  </div>
                  <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-pink-400" style={{ width: "41%" }} />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-4 justify-center">
                <div className="flex items-center gap-1.5 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: ACCENT }} />
                  <span className="text-gray-600 dark:text-gray-400">Bărbați 59%</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm">
                  <div className="w-3 h-3 rounded-full bg-pink-400" />
                  <span className="text-gray-600 dark:text-gray-400">Femei 41%</span>
                </div>
              </div>
            </div>

            {/* Vârstă */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <svg className="w-5 h-5" style={{ color: ACCENT }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Distribuție vârstă
              </h3>
              <div className="space-y-3">
                {[
                  { range: "18–24 ani", pct: 8 },
                  { range: "25–34 ani", pct: 15 },
                  { range: "35–44 ani", pct: 22 },
                  { range: "45–64 ani", pct: 50.8, highlight: true },
                  { range: "65+ ani", pct: 4.2 },
                ].map((row) => (
                  <div key={row.range}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className={`font-medium ${row.highlight ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400"}`}>
                        {row.range} {row.highlight && "★"}
                      </span>
                      <span className={`font-bold ${row.highlight ? "" : "text-gray-500 dark:text-gray-400"}`} style={row.highlight ? { color: ACCENT } : {}}>
                        {row.pct}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${row.pct}%`, backgroundColor: row.highlight ? ACCENT : "#94A3B8" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Locații */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <svg className="w-5 h-5" style={{ color: ACCENT }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Orașe principale
              </h3>
              <div className="space-y-3">
                {[
                  { city: "Constanța", rank: 1, primary: true },
                  { city: "București", rank: 2, primary: false },
                  { city: "Tulcea", rank: 3, primary: false },
                ].map((loc) => (
                  <div
                    key={loc.city}
                    className={`flex items-center gap-4 p-4 rounded-xl ${loc.primary ? "border-2" : "border border-gray-100 dark:border-gray-800"}`}
                    style={loc.primary ? { borderColor: ACCENT, backgroundColor: ACCENT_LIGHT } : { backgroundColor: "transparent" }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                      style={{ backgroundColor: loc.primary ? ACCENT : "#E2E8F0", color: loc.primary ? "#fff" : "#64748B" }}
                    >
                      {loc.rank}
                    </div>
                    <span
                      className={`font-semibold ${loc.primary ? "text-blue-800 dark:text-white" : "text-gray-700 dark:text-gray-300"}`}
                    >
                      {loc.city}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-5 leading-relaxed">
                Audiența primară este concentrată în județul Constanța, cu o prezență digitală națională în creștere.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            5. SERVICII
        ═══════════════════════════════════════════ */}
        <section id="servicii">
          <div className="text-center mb-10">
            <SectionLabel>Servicii</SectionLabel>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Ce vă oferim
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-xl mx-auto">
              De la spoturi TV clasice la campanii digitale integrate — soluții complete pentru fiecare obiectiv de marketing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md hover:-translate-y-0.5 transition-all group flex flex-col gap-3"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:brightness-110 transition-all"
                  style={{ backgroundColor: ACCENT }}
                >
                  {service.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1 leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA strip */}
          <div
            className="mt-8 rounded-2xl p-8 text-center"
            style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_MID} 100%)` }}
          >
            <p className="text-white font-semibold text-lg mb-2">
              Nu găsiți exact ce căutați?
            </p>
            <p className="text-blue-100 text-sm mb-5">
              Construim pachete personalizate adaptate bugetului și obiectivelor dvs. de comunicare.
            </p>
            <a
              href="#contact"
              className="inline-block px-8 py-3 rounded-xl font-bold text-sm text-blue-800 bg-white hover:bg-blue-50 transition-colors shadow-lg"
            >
              Discutăm despre nevoile dvs.
            </a>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            6. CONTACT
        ═══════════════════════════════════════════ */}
        <section id="contact">
          <div className="text-center mb-10">
            <SectionLabel>Contact publicitate</SectionLabel>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Hai să construim ceva împreună
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-xl mx-auto">
              Contactați-ne direct sau completați formularul — vă răspundem cu o ofertă personalizată.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

            {/* Contact info */}
            <div className="lg:col-span-2 flex flex-col gap-5">

              {/* Lina Tudor card */}
              <div
                className="rounded-2xl p-8 text-white relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_MID} 100%)` }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10" style={{ background: "radial-gradient(circle, white, transparent)", transform: "translate(30%, -30%)" }} />

                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-5">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>

                  <h3 className="font-playfair text-2xl font-bold mb-0.5">Lina Tudor</h3>
                  <p className="text-blue-200 text-sm font-medium mb-6">Director Publicitate · DOTTO TV</p>

                  <div className="space-y-4">
                    <a
                      href="mailto:lina.tudor@dottotv.ro"
                      className="flex items-center gap-3 group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0 group-hover:bg-white/25 transition-colors">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-[10px] text-blue-200 uppercase tracking-wider font-semibold">Email</div>
                        <div className="text-sm font-medium text-white group-hover:underline">lina.tudor@dottotv.ro</div>
                      </div>
                    </a>

                    <a
                      href="tel:0749040137"
                      className="flex items-center gap-3 group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0 group-hover:bg-white/25 transition-colors">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-[10px] text-blue-200 uppercase tracking-wider font-semibold">Telefon</div>
                        <div className="text-sm font-medium text-white group-hover:underline">0749 040 137</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              {/* Why choose DottoTV */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wider">
                  De ce DOTTO TV?
                </h3>
                <ul className="space-y-3">
                  {[
                    "Acoperire TV pe 5 rețele naționale",
                    "74.500+ urmăritori pe Facebook",
                    "4,4 milioane vizualizări / lună",
                    "Echipă locală, răspuns rapid",
                    "Oferte fără prețuri fixe — adaptate bugetului dvs.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: ACCENT_LIGHT }}>
                        <svg className="w-3 h-3" fill="none" stroke={ACCENT} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3 bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="mb-6">
                <h3 className="font-playfair text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  Solicită o ofertă
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Completați formularul și Lina Tudor vă va contacta cu o propunere personalizată.
                </p>
              </div>
              <PublicitateForm />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
