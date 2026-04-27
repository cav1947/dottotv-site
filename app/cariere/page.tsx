import type { Metadata } from "next";
import Link from "next/link";
import CareerForm from "@/components/CareerForm";
import { SITE_URL, buildJobPostingSchema } from "@/lib/seo";

// Refresh săptămânal — datePosted/validThrough din JobPosting sunt baked la
// build, deci fără revalidate ar deveni stale și Google ar marca anunțurile
// drept expirate.
export const revalidate = 604800;

export const metadata: Metadata = {
  title: "Cariere — Alătură-te echipei DOTTO TV",
  description: "Vrei să lucrezi la o televiziune locală din Constanța? Descoperă pozițiile disponibile la DOTTO TV și aplică acum.",
  alternates: { canonical: `${SITE_URL}/cariere` },
  openGraph: {
    siteName: "DOTTO TV",
    title: "Cariere | DOTTO TV",
    description: "Vrei să lucrezi la o televiziune locală din Constanța? Descoperă pozițiile disponibile la DOTTO TV și aplică acum.",
    url: `${SITE_URL}/cariere`,
    type: "website",
    locale: "ro_RO",
    images: [{ url: `${SITE_URL}/images/og-default.jpg`, width: 1200, height: 630, alt: "Cariere DOTTO TV" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@dottotv",
    title: "Cariere | DOTTO TV",
    description: "Vrei să lucrezi la o televiziune locală din Constanța? Aplică la DOTTO TV.",
    images: [`${SITE_URL}/images/og-default.jpg`],
  },
};

const JOBS = [
  {
    title: "Jurnalist",
    icon: "✍️",
    description: "Documentezi și redactezi știri despre evenimentele locale și naționale. Ești vocea informată a Constanței.",
  },
  {
    title: "Reporter",
    icon: "🎤",
    description: "Ești pe teren, la fața locului. Transmiți în direct, intervievezi surse și aduci știrea înainte de toți.",
  },
  {
    title: "Prezentator TV",
    icon: "📺",
    description: "Prezinți jurnalele de știri în fața camerei. Dicție clară, prezență puternică, naturalețe în fața publicului.",
  },
  {
    title: "Cameraman",
    icon: "🎥",
    description: "Captezi imaginile care spun povestea. Lucrezi atât în teren cât și în studio, cu echipamente profesionale.",
  },
  {
    title: "Editor video",
    icon: "🎬",
    description: "Montezi materialele video, subiectele de știri și producțiile speciale. Dai formă vizuală poveștilor noastre.",
  },
  {
    title: "Producător",
    icon: "🎙️",
    description: "Coordonezi echipele de producție, planifici emisiunile și te asiguri că totul iese pe post la timp și de calitate.",
  },
  {
    title: "Social Media Manager",
    icon: "📱",
    description: "Administrezi prezența DOTTO TV pe rețelele sociale. Creezi conținut, crești comunitatea și măsori impactul.",
  },
  {
    title: "Redactor online",
    icon: "🖊️",
    description: "Publici și optimizezi articolele pe site-ul dottotv.ro. Scrii pentru web, gândești SEO și servești cititorii digitali.",
  },
  {
    title: "Grafician",
    icon: "🎨",
    description: "Creezi identitatea vizuală a canalului — grafice de știri, bannere, materiale promoționale și animații.",
  },
  {
    title: "IT și Tehnic",
    icon: "🖥️",
    description: "Menții infrastructura tehnică a televiziunii — servere, rețele, echipamente broadcast și platforma online.",
  },
  {
    title: "Account Manager Publicitate",
    icon: "📊",
    description: "Construiești relații cu clienții de publicitate, propui pachete și contribui direct la sustenabilitatea DOTTO TV.",
  },
  {
    title: "Operator studio",
    icon: "🎚️",
    description: "Operezi echipamentele de studio — lumini, sunet, regie. Ești coloana vertebrală a fiecărei transmisii live.",
  },
];

const BENEFITS = [
  {
    icon: "⚡",
    title: "Mediu dinamic",
    description: "Niciun zi nu seamănă cu alta. Știrile nu dorm, iar tu ești în centrul acțiunii.",
  },
  {
    icon: "📡",
    title: "Expunere media",
    description: "Munca ta ajunge la mii de oameni din Constanța și Dobrogea în fiecare zi.",
  },
  {
    icon: "👥",
    title: "Echipă tânără",
    description: "Colegi entuziaști, o atmosferă deschisă și o cultură bazată pe colaborare și respect.",
  },
  {
    icon: "📈",
    title: "Dezvoltare profesională",
    description: "Înveți constant — de la tehnica broadcast până la storytelling digital și producție video.",
  },
  {
    icon: "🏖️",
    title: "Constanța — un avantaj",
    description: "Lucrezi într-un oraș cu mare, cu o comunitate vibrantă și povești care merită spuse.",
  },
  {
    icon: "🕐",
    title: "Flexibilitate",
    description: "Înțelegem că viața nu se oprește la program. Căutăm un echilibru sănătos pentru toată echipa.",
  },
];

export default function CarierePage() {
  const jobPostingSchema = buildJobPostingSchema(JOBS);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }}
      />

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0d1b3e 0%, #1565C0 55%, #1976d2 100%)" }}
      >
        {/* Pattern decorativ */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, white, transparent)" }} />

        <div className="relative container mx-auto px-4 max-w-[1100px] py-16 md:py-24">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-7">
            <Link href="/" className="hover:text-white transition-colors">Acasă</Link>
            <span>/</span>
            <span className="text-white font-medium">Cariere</span>
          </nav>

          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Recrutăm acum
            </span>
            <h1 className="font-playfair font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
              Alătură-te echipei<br />
              <span style={{ color: "#7ec8f7" }}>DOTTO TV</span>
            </h1>
            <p className="text-white/75 text-lg md:text-xl leading-relaxed mb-8">
              Lucrezi cu pasiune, spui povești care contează și ajungi la mii de oameni din Constanța și Dobrogea.
              La DOTTO TV, televiziunea locală în continuă creștere, fiecare voce face diferența.
            </p>
            <a
              href="#aplica"
              className="inline-flex items-center gap-2 bg-white text-blue-900 font-bold px-7 py-3.5 rounded-xl hover:bg-blue-50 transition-colors shadow-lg text-sm"
            >
              Aplică acum
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-[1100px]">

        {/* ── POZITII DISPONIBILE ── */}
        <section className="py-16">
          <div className="text-center mb-10">
            <h2 className="font-playfair font-bold text-3xl md:text-4xl text-gray-900 dark:text-white mb-3">
              Poziții disponibile
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
              Suntem mereu în căutare de oameni talentați pentru toate departamentele unei televiziuni moderne.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {JOBS.map((job) => (
              <div
                key={job.title}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className="text-3xl mb-4">{job.icon}</div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">{job.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{job.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── BENEFICII ── */}
        <section className="py-12 border-t border-gray-200 dark:border-gray-800">
          <div className="text-center mb-10">
            <h2 className="font-playfair font-bold text-3xl md:text-4xl text-gray-900 dark:text-white mb-3">
              De ce DOTTO TV?
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
              Mai mult decât un job — o șansă să fii parte dintr-un proiect media care pune Dobrogea pe hartă.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b) => (
              <div
                key={b.title}
                className="flex gap-4 bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm"
              >
                <span className="text-2xl flex-shrink-0 mt-0.5">{b.icon}</span>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">{b.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{b.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FORMULAR ── */}
        <section id="aplica" className="py-12 border-t border-gray-200 dark:border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* Intro stânga */}
            <div className="lg:col-span-2">
              <h2 className="font-playfair font-bold text-3xl text-gray-900 dark:text-white mb-4">
                Trimite-ne aplicația ta
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
                Completează formularul, atașează CV-ul și spune-ne de ce vrei să faci parte din echipa DOTTO TV.
                Toate aplicațiile sunt analizate cu atenție.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#e8f0fe" }}>
                    <svg className="w-4 h-4" style={{ color: "#1565C0" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span>office@dottotv.ro</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#e8f0fe" }}>
                    <svg className="w-4 h-4" style={{ color: "#1565C0" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span>Constanța, România</span>
                </div>
              </div>
            </div>

            {/* Formular dreapta */}
            <div className="lg:col-span-3 bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800">
              <CareerForm />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
