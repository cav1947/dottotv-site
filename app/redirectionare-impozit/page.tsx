import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";
import ScrollToFormButton from "./ScrollToFormButton";

export const metadata: Metadata = {
  title: "Redirecționează 3,5% din impozit către jurnalismul independent",
  description:
    "Susține DOTTO TV redirecționând 3,5% din impozitul pe venit. Nu te costă nimic în plus — banii oricum merg la stat. Ajută jurnalismul independent din Constanța.",
  alternates: { canonical: `${SITE_URL}/redirectionare-impozit` },
  openGraph: {
    siteName: "DOTTO TV",
    title: "Redirecționează 3,5% | DOTTO TV",
    description:
      "Susține jurnalismul independent din Constanța redirecționând 3,5% din impozitul pe venit. Nu te costă nimic în plus.",
    url: `${SITE_URL}/redirectionare-impozit`,
    type: "website",
    locale: "ro_RO",
    images: [{ url: `${SITE_URL}/images/og-default.jpg`, width: 1200, height: 630, alt: "Redirecționează impozit DOTTO TV" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@dottotv",
    title: "Redirecționează 3,5% din impozit | DOTTO TV",
    description: "Susține jurnalismul independent din Constanța. Nu te costă nimic în plus.",
    images: [`${SITE_URL}/images/og-default.jpg`],
  },
};

const ACCENT = "#1565C0";

const usageItems = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Echipa de jurnaliști",
    desc: "Finanțăm salariile reporterilor, redactorilor și operatorilor care muncesc zilnic pentru a aduce știri corecte din Constanța.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M15 10l4.553-2.069A1 1 0 0121 8.87V15.13a1 1 0 01-1.447.9L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    title: "Echipamente profesionale",
    desc: "Camere de filmat, echipamente de studio și infrastructură tehnică pentru transmisii live de calitate.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Independență editorială",
    desc: "Sprijinul tău ne ajută să rămânem independenți față de orice influență politică sau economică.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
    title: "Investigații locale",
    desc: "Investigații jurnalistice despre problemele reale ale Constanței — administrație, mediu, sănătate, siguranță publică.",
  },
];

export default function RedirectionareImpozitPage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">

      {/* ── HERO ── */}
      <div className="relative overflow-hidden" style={{ backgroundColor: ACCENT }}>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative container mx-auto px-4 py-16 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/15 text-blue-100 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 bg-blue-200 rounded-full animate-pulse" />
            Asociația Centrul pentru Jurnalism Constanța
          </div>
          <h1 className="font-playfair text-3xl md:text-5xl font-bold text-white mb-5 leading-tight">
            Susține jurnalismul independent din Constanța
          </h1>
          <p className="text-blue-100 text-lg leading-relaxed">
            Presa locală liberă nu este un lux — este oxigenul democrației. Fără jurnaliști independenți care să
            verifice puterea, să dea voce cetățenilor și să aducă la lumină adevărul, comunitatea noastră pierde
            un scut esențial. Poți schimba asta <strong className="text-white">fără să scoți un leu în plus din buzunar</strong>.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">

        {/* ── SECȚIUNEA PF — CUM FUNCȚIONEAZĂ ── */}
        <section className="mb-12">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{ backgroundColor: ACCENT }}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h2 className="font-playfair text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  Persoane fizice — 3,5% din impozitul pe venit
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Simplu, gratuit și 100% legal
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                {
                  step: "1",
                  title: "Nu costă nimic",
                  desc: "Banii aceștia oricum merg la stat. Tu nu plătești nimic în plus — pur și simplu alegi unde se duc 3,5% din impozitul tău.",
                },
                {
                  step: "2",
                  title: "Completezi online",
                  desc: "Completezi formularul de mai jos direct pe această pagină. Durează 2 minute.",
                },
                {
                  step: "3",
                  title: "Impactul e real",
                  desc: "Banii ajung la Asociația Centrul pentru Jurnalism Constanța și finanțează jurnalismul independent local.",
                },
              ].map((item) => (
                <div key={item.step} className="flex flex-col gap-3 p-5 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-100 dark:border-blue-900/50">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                    style={{ backgroundColor: ACCENT }}
                  >
                    {item.step}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white mb-1">{item.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-800/40 flex items-start gap-3 mb-2">
              <svg className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-amber-800 dark:text-amber-300">
                <strong>Termen limită:</strong> Formularul poate fi depus până la <strong>25 mai</strong> pentru veniturile din anul anterior. Completează acum pentru a nu rata termenul!
              </p>
            </div>
          </div>
        </section>

        {/* ── IFRAME FORMULAR ── */}
        <section className="mb-12">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-100 dark:border-gray-800">
              <h2 className="font-playfair text-2xl font-bold text-gray-900 dark:text-white mb-1">
                Completează formularul
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Completează direct mai jos — formularul oficial de redirecționare pentru Asociația Centrul pentru Jurnalism Constanța.
              </p>
            </div>
            <div className="p-4 md:p-6">
              <iframe
                title="Formular redirecționare impozit — Asociația Centrul pentru Jurnalism Constanța"
                src="https://redirectioneazaimpozit.ro/asociatia-centrul-pentru-jurnalism-constanta"
                width="100%"
                height="700"
                style={{ border: 0, display: "block", borderRadius: "12px" }}
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* ── SECȚIUNEA FIRME ── */}
        <section className="mb-12">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{ backgroundColor: "#0d7e3e" }}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h2 className="font-playfair text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  Firme — Redirecționează până la 20% din impozitul pe profit
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Sponsorizare deductibilă fiscal — susține presa independentă și reducerea impozitului datorat către stat
                </p>
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Companiile plătitoare de impozit pe profit pot sponsoriza asociații nonprofit și să scadă suma direct
              din impozitul datorat. Suma maximă deductibilă este <strong>minimul dintre 0,75% din cifra de afaceri
              și 20% din impozitul pe profit datorat</strong>. Firma ta nu plătește nimic în plus — banii care
              altfel mergeau la stat ajung la jurnalismul independent din Constanța.
            </p>

            {/* Atenționare microîntreprinderi */}
            <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-xl border border-orange-200 dark:border-orange-800/40 flex items-start gap-3 mb-6">
              <svg className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
              <p className="text-sm text-orange-800 dark:text-orange-300">
                <strong>Atenție:</strong> Microîntreprinderile (impozit pe venit, nu pe profit) <strong>nu pot utiliza acest mecanism începând cu anul fiscal 2024</strong>. Mecanismul este disponibil exclusiv pentru societățile plătitoare de impozit pe profit.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Datele asociației */}
              <div className="p-5 bg-green-50 dark:bg-green-950/20 rounded-xl border border-green-100 dark:border-green-900/40">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Datele asociației
                </h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li>
                    <span className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide block mb-0.5">Denumire</span>
                    <strong>ASOCIATIA CENTRUL PENTRU JURNALISM CONSTANTA</strong>
                  </li>
                  <li>
                    <span className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide block mb-0.5">Județ</span>
                    Constanța, România
                  </li>
                </ul>
              </div>

              {/* Termen limită */}
              <div className="p-5 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-800/40">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Termen limită
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  <strong>25 iunie 2026</strong> — termen pentru depunerea Formularului 177 aferent impozitului pe profit din anul fiscal <strong>2025</strong>.
                </p>
                <p className="text-xs text-amber-700 dark:text-amber-400 mt-2 font-medium">
                  Nu rata termenul! Contactează-ne cât mai curând.
                </p>
              </div>
            </div>

            {/* Pași */}
            <div className="p-5 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-100 dark:border-blue-900/40 mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: ACCENT }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Cum procedezi — 4 pași simpli
              </h3>
              <ol className="space-y-3 text-sm text-gray-700 dark:text-gray-300 list-none">
                {[
                  { title: "Calculează suma disponibilă", desc: "Determină minimul dintre 0,75% din cifra de afaceri și 20% din impozitul pe profit datorat pentru anul 2025." },
                  { title: "Contactează-ne pentru contractul de sponsorizare", desc: "Trimite un email la office@dottotv.ro — îți trimitem contractul în maxim 24 de ore." },
                  { title: "Depune Formularul 177 prin SPV ANAF", desc: "Completezi și depui declarația de redirecționare direct în Spațiul Privat Virtual al ANAF." },
                  { title: "ANAF virează suma în contul asociației", desc: "Autoritatea fiscală transferă suma direct în 45 de zile calendaristice de la depunerea formularului." },
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5" style={{ backgroundColor: ACCENT }}>
                      {i + 1}
                    </span>
                    <div>
                      <span className="font-semibold text-gray-900 dark:text-white">{step.title}</span>
                      <span className="text-gray-600 dark:text-gray-400"> — {step.desc}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* CTA email firme */}
            <div className="p-6 rounded-xl border-2 border-dashed border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-950/20 text-center">
              <p className="text-gray-700 dark:text-gray-300 mb-1 font-medium">
                Pentru a iniția parteneriatul, trimite-ne un email și îți trimitem contractul de sponsorizare.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
                Echipa noastră îți răspunde în maxim 24 de ore cu toate documentele necesare.
              </p>
              <a
                href="mailto:office@dottotv.ro?subject=Solicitare%20contract%20sponsorizare%20-%20redirecționare%20impozit%20profit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-colors"
                style={{ backgroundColor: ACCENT }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Solicită contractul de sponsorizare
              </a>
              <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                <a href="mailto:office@dottotv.ro" className="hover:underline" style={{ color: ACCENT }}>
                  office@dottotv.ro
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* ── CU CE SE FAC BANII ── */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="font-playfair text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Cum folosim sprijinul tău
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Fiecare leu redirecționat ajunge direct în susținerea jurnalismului de calitate din Constanța.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {usageItems.map((item) => (
              <div
                key={item.title}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex gap-4"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                  style={{ backgroundColor: ACCENT }}
                >
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section>
          <div
            className="rounded-2xl p-8 md:p-10 text-center relative overflow-hidden"
            style={{ backgroundColor: ACCENT }}
          >
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "radial-gradient(circle at 70% 30%, white 1px, transparent 1px)",
                backgroundSize: "50px 50px",
              }}
            />
            <div className="relative">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-white mb-3">
                Împreună construim o presă locală puternică
              </h2>
              <p className="text-blue-100 mb-6 max-w-lg mx-auto leading-relaxed">
                Fiecare redirecționare contează. 3,5% din impozitul tău poate face diferența între un jurnalism
                dependent și unul cu adevărat liber în Constanța.
              </p>
              <ScrollToFormButton />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
