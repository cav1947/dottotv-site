import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Politică de Cookies",
  description:
    "Politica de cookies a platformei DottoTV. Aflați ce tipuri de cookie-uri folosim, de ce le folosim și cum le puteți gestiona.",
  alternates: { canonical: `${SITE_URL}/politica-de-cookies` },
  openGraph: {
    siteName: "DOTTO TV",
    title: "Politică de Cookies | DOTTO TV",
    description: "Politica de cookies a platformei DottoTV. Aflați ce tipuri de cookie-uri folosim și cum le puteți gestiona.",
    url: `${SITE_URL}/politica-de-cookies`,
    type: "website",
    locale: "ro_RO",
    images: [{ url: `${SITE_URL}/images/og-default.jpg`, width: 1200, height: 630, alt: "DOTTO TV – Politică de Cookies" }],
  },
  twitter: {
    card: "summary",
    site: "@dottotv",
    title: "Politică de Cookies | DOTTO TV",
    description: "Aflați ce tipuri de cookie-uri folosim pe DottoTV și cum le puteți gestiona.",
  },
};

const ACCENT = "#1565C0";
const lastUpdated = "8 aprilie 2026";

const cookieTypes = [
  {
    id: "necesare",
    nume: "Cookie-uri Strict Necesare",
    necesitaConsimtamant: false,
    culoare: "green",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    descriere:
      "Aceste cookie-uri sunt indispensabile pentru funcționarea corectă a platformei dottotv.ro. Fără ele, anumite funcționalități esențiale ale site-ului nu ar putea opera. Nu colectează informații despre dvs. care ar putea fi utilizate în scop de publicitate și nu rețin paginile pe care le-ați vizitat pe internet.",
    scopuri: [
      "Menținerea sesiunii de navigare active pe durata vizitei",
      "Memorarea preferinței de temă (mod întunecat/luminos)",
      "Protecție împotriva atacurilor de tip CSRF (Cross-Site Request Forgery)",
      "Asigurarea funcționării corecte a playerului video LIVE",
      "Memorarea preferinței privind consimțământul pentru cookie-uri",
    ],
    cookies: [
      { nume: "theme_preference", durata: "1 an", furnizor: "dottotv.ro", scop: "Reține preferința de temă (dark/light mode)" },
      { nume: "cookie_consent", durata: "1 an", furnizor: "dottotv.ro", scop: "Reține alegerea dvs. privind cookie-urile" },
      { nume: "session_id", durata: "Sesiune", furnizor: "dottotv.ro", scop: "Identifică sesiunea curentă de navigare" },
    ],
  },
  {
    id: "functionale",
    nume: "Cookie-uri Funcționale",
    necesitaConsimtamant: true,
    culoare: "blue",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    descriere:
      "Cookie-urile funcționale permit platformei să memoreze alegerile pe care le-ați făcut în trecut (preferințe de regiune, setări de conținut) și să vă ofere funcționalități îmbunătățite și personalizate. Informațiile colectate de aceste cookie-uri pot fi anonimizate și nu pot urmări activitatea dvs. pe alte site-uri web.",
    scopuri: [
      "Memorarea preferințelor de conținut și regiune geografică",
      "Personalizarea experienței de navigare pe baza vizitelor anterioare",
      "Reținerea setărilor playerului video (volum, calitate)",
      "Afișarea conținutului relevant pentru zona geografică detectată",
    ],
    cookies: [
      { nume: "user_region", durata: "6 luni", furnizor: "dottotv.ro", scop: "Reține preferința de regiune geografică" },
      { nume: "player_volume", durata: "6 luni", furnizor: "dottotv.ro", scop: "Reține setările playerului video" },
      { nume: "content_pref", durata: "3 luni", furnizor: "dottotv.ro", scop: "Reține preferințele de afișare conținut" },
    ],
  },
  {
    id: "analitice",
    nume: "Cookie-uri Analitice (Google Analytics)",
    necesitaConsimtamant: true,
    culoare: "orange",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    descriere:
      "Folosim serviciul Google Analytics 4 (furnizat de Google LLC, SUA) pentru a înțelege cum utilizatorii interacționează cu platforma noastră. Datele colectate sunt agregate și anonimizate — adresele IP sunt trunchiate automat și nu pot fi utilizate pentru identificarea directă a persoanelor fizice. Aceste informații ne ajută să îmbunătățim continuu conținutul și experiența de navigare.",
    scopuri: [
      "Înțelegerea comportamentului de navigare pe platformă (pagini vizitate, timp petrecut, adâncime scroll)",
      "Analiza surselor de trafic (motoare de căutare, rețele sociale, acces direct)",
      "Identificarea paginilor cu performanță scăzută pentru îmbunătățire",
      "Măsurarea eficienței conținutului editorial publicat",
      "Analiza demografică agregată a audienței (țară, dispozitiv, browser)",
    ],
    cookies: [
      { nume: "_ga", durata: "2 ani", furnizor: "google.com", scop: "Distinge utilizatorii unici prin atribuirea unui ID anonim" },
      { nume: "_ga_XXXXXXXX", durata: "2 ani", furnizor: "google.com", scop: "Menține starea sesiunii Google Analytics 4" },
      { nume: "_gid", durata: "24 ore", furnizor: "google.com", scop: "Distinge utilizatorii — expiră în 24 ore" },
      { nume: "_gat", durata: "1 minut", furnizor: "google.com", scop: "Limitează rata de solicitări trimise către Google Analytics" },
    ],
    nota: "Datele colectate prin Google Analytics sunt transferate pe servere Google situate în SUA în temeiul Data Privacy Framework UE–SUA. Puteți opta out oricând.",
  },
  {
    id: "publicitare",
    nume: "Cookie-uri Publicitare și de Marketing",
    necesitaConsimtamant: true,
    culoare: "red",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
    descriere:
      "Cookie-urile publicitare sunt utilizate pentru a vă afișa reclame relevante pentru interesele dvs., atât pe platforma dottotv.ro, cât și pe alte site-uri și rețele de publicitate. Aceste cookie-uri urmăresc vizitele dvs. pe site-uri web și colectează informații pentru a personaliza publicitatea. Sunt plasate de parteneri terți (Google, Meta, TikTok) și pot fi distribuite altor organizații din rețelele de publicitate.",
    scopuri: [
      "Afișarea de reclame personalizate în funcție de comportamentul de navigare",
      "Limitarea numărului de afișări ale aceleiași reclame",
      "Măsurarea eficienței campaniilor publicitare (conversii, clicuri)",
      "Crearea de audiențe pentru remarketing pe rețelele sociale",
      "Atribuirea conversiilor campaniilor publicitare active",
    ],
    cookies: [
      { nume: "_fbp", durata: "3 luni", furnizor: "facebook.com", scop: "Facebook Pixel — identifică browserele pentru publicitate Meta" },
      { nume: "_ttp", durata: "13 luni", furnizor: "tiktok.com", scop: "TikTok Pixel — urmărește comportamentul utilizatorilor" },
      { nume: "IDE", durata: "13 luni", furnizor: "doubleclick.net", scop: "Google Ads — afișează reclame relevante și măsoară conversiile" },
      { nume: "test_cookie", durata: "15 minute", furnizor: "doubleclick.net", scop: "Verifică dacă browser-ul acceptă cookie-uri" },
      { nume: "fr", durata: "3 luni", furnizor: "facebook.com", scop: "Afișare și măsurare publicitate Facebook" },
    ],
  },
];

const sections = [
  { id: "ce-sunt", title: "1. Ce Sunt Cookie-urile?" },
  { id: "de-ce", title: "2. De Ce Folosim Cookie-uri?" },
  { id: "necesare", title: "3. Cookie-uri Strict Necesare" },
  { id: "functionale", title: "4. Cookie-uri Funcționale" },
  { id: "analitice", title: "5. Cookie-uri Analitice (Google Analytics)" },
  { id: "publicitare", title: "6. Cookie-uri Publicitare" },
  { id: "gestionare", title: "7. Cum Să Gestionați Cookie-urile" },
  { id: "drepturi", title: "8. Drepturile Dvs." },
  { id: "contact", title: "9. Contact" },
];

function ColorBadge({ necesita, culoare }: { necesita: boolean; culoare: string }) {
  if (!necesita) {
    return (
      <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
        Nu necesită consimțământ
      </span>
    );
  }
  const map: Record<string, string> = {
    blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    orange: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    red: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };
  return (
    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${map[culoare] ?? map.blue}`}>
      Necesită consimțământ
    </span>
  );
}

export default function PoliticaCookiesPage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ backgroundColor: ACCENT }}>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative container mx-auto px-4 py-14 text-center">
          <p className="text-blue-200 text-sm font-medium uppercase tracking-widest mb-3">DottoTV</p>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
            Politică de Cookies
          </h1>
          <p className="text-blue-100 text-base max-w-2xl mx-auto leading-relaxed">
            Transparență completă despre cookie-urile utilizate pe platforma <strong>www.dottotv.ro</strong> —
            ce sunt, de ce le folosim și cum le puteți controla.
          </p>
          <p className="text-blue-300 text-sm mt-4">Ultima actualizare: {lastUpdated}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="sticky top-24 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
                  Cuprins
                </p>
                <nav className="space-y-1">
                  {sections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-400 py-1.5 px-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors leading-snug"
                    >
                      {s.title}
                    </a>
                  ))}
                </nav>
                <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800 space-y-2">
                  <Link
                    href="/politica-de-confidentialitate"
                    className="block text-xs text-center py-2 px-3 rounded-lg font-medium text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: ACCENT }}
                  >
                    Politică Confidențialitate
                  </Link>
                  <Link
                    href="/termeni-si-conditii"
                    className="block text-xs text-center py-2 px-3 rounded-lg font-medium border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    Termeni și Condiții
                  </Link>
                </div>
              </div>
            </aside>

            {/* Main */}
            <main className="flex-1 min-w-0 space-y-8">

              {/* Ce sunt */}
              <section id="ce-sunt" className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 scroll-mt-28">
                <h2 className="font-playfair text-xl font-bold text-gray-900 dark:text-white mb-5 pb-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
                  <span className="w-1 h-6 rounded-full flex-shrink-0" style={{ backgroundColor: ACCENT }} />
                  1. Ce Sunt Cookie-urile?
                </h2>
                <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                  <p>
                    Cookie-urile sunt fișiere text de mici dimensiuni (de obicei câteva kilobytes) pe care un site
                    web le plasează pe dispozitivul dvs. — calculator, tabletă sau smartphone — atunci când îl
                    vizitați. Aceste fișiere sunt stocate de browser-ul dvs. web și conțin informații specifice
                    site-ului care le-a creat.
                  </p>
                  <p>
                    La fiecare vizită ulterioară pe același site, browser-ul dvs. trimite automat cookie-urile
                    corespunzătoare înapoi la server, permițând site-ului să vă recunoască, să rețină preferințele
                    dvs. și să ofere o experiență personalizată.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                    {[
                      {
                        titlu: "Cookie-uri de sesiune",
                        desc: "Sunt temporare și se șterg automat când închideți browser-ul. Sunt utilizate pentru menținerea sesiunii active pe durata navigării.",
                      },
                      {
                        titlu: "Cookie-uri persistente",
                        desc: "Rămân pe dispozitivul dvs. după ce închideți browser-ul, pentru o perioadă determinată. Sunt utilizate pentru reținerea preferințelor pe termen lung.",
                      },
                      {
                        titlu: "Cookie-uri primare (first-party)",
                        desc: "Sunt plasate direct de site-ul pe care îl vizitați (dottotv.ro) și pot fi citite numai de acesta.",
                      },
                      {
                        titlu: "Cookie-uri terțe (third-party)",
                        desc: "Sunt plasate de domenii externe (ex. Google, Facebook) încorporate în site și pot urmări comportamentul pe mai multe site-uri web.",
                      },
                    ].map((item) => (
                      <div key={item.titlu} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                        <p className="font-semibold text-gray-900 dark:text-white mb-1">{item.titlu}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                  <p>
                    Pe lângă cookie-uri clasice, platforma poate utiliza și tehnologii similare precum{" "}
                    <strong>Local Storage</strong>, <strong>Session Storage</strong> și{" "}
                    <strong>pixel tags (web beacons)</strong> — mici imagini invizibile care ajută la măsurarea
                    comportamentului utilizatorilor. Toate acestea sunt tratate în mod similar cookie-urilor în
                    contextul prezentei politici.
                  </p>
                </div>
              </section>

              {/* De ce */}
              <section id="de-ce" className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 scroll-mt-28">
                <h2 className="font-playfair text-xl font-bold text-gray-900 dark:text-white mb-5 pb-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
                  <span className="w-1 h-6 rounded-full flex-shrink-0" style={{ backgroundColor: ACCENT }} />
                  2. De Ce Folosim Cookie-uri?
                </h2>
                <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed space-y-3">
                  <p>
                    S.C. DOTTO TV MEDIA S.R.L. utilizează cookie-uri în conformitate cu{" "}
                    <strong>Legea nr. 506/2004</strong> privind prelucrarea datelor cu caracter personal în sectorul
                    comunicațiilor electronice (modificată prin Legea nr. 235/2015) și cu{" "}
                    <strong>Directiva 2009/136/CE</strong> (Directiva ePrivacy), pentru următoarele scopuri principale:
                  </p>
                  <ul className="space-y-2 list-disc list-inside marker:text-blue-600">
                    <li><strong>Funcționare tehnică</strong> — asigurarea funcționării corecte a tuturor elementelor platformei;</li>
                    <li><strong>Personalizare</strong> — reținerea preferințelor dvs. pentru vizitele viitoare;</li>
                    <li><strong>Analiză și statistici</strong> — înțelegerea modului în care utilizatorii navighează pe platformă pentru a o îmbunătăți continuu;</li>
                    <li><strong>Publicitate relevantă</strong> — afișarea de reclame adaptate intereselor dvs. (numai cu consimțământul dvs.);</li>
                    <li><strong>Securitate</strong> — protejarea platformei și a utilizatorilor împotriva accesului neautorizat și a fraudelor.</li>
                  </ul>
                  <p>
                    Cookie-urile strict necesare sunt activate automat, deoarece sunt esențiale pentru funcționarea
                    site-ului. Toate celelalte categorii de cookie-uri sunt activate numai cu{" "}
                    <strong>consimțământul dvs. explicit</strong>, pe care vi-l solicităm prin bannerul de cookie-uri
                    afișat la prima vizită.
                  </p>
                </div>
              </section>

              {/* Cookie type sections */}
              {cookieTypes.map((tip) => (
                <section
                  key={tip.id}
                  id={tip.id}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 scroll-mt-28"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-5 pb-4 border-b border-gray-100 dark:border-gray-800">
                    <h2 className="font-playfair text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                      <span className="w-1 h-6 rounded-full flex-shrink-0" style={{ backgroundColor: ACCENT }} />
                      {tip.id === "necesare" ? "3" : tip.id === "functionale" ? "4" : tip.id === "analitice" ? "5" : "6"}. {tip.nume}
                    </h2>
                    <ColorBadge necesita={tip.necesitaConsimtamant} culoare={tip.culoare} />
                  </div>

                  <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                    <div className="flex gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: ACCENT }}
                      >
                        {tip.icon}
                      </div>
                      <p className="leading-relaxed">{tip.descriere}</p>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white mb-2">Scopuri specifice:</p>
                      <ul className="space-y-1.5 list-disc list-inside marker:text-blue-600">
                        {tip.scopuri.map((s) => <li key={s}>{s}</li>)}
                      </ul>
                    </div>

                    {tip.nota && (
                      <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/40 text-xs text-orange-800 dark:text-orange-300">
                        <strong>Notă privind transferul internațional:</strong> {tip.nota}
                      </div>
                    )}

                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white mb-3">Cookie-uri utilizate:</p>
                      <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-gray-700">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="bg-gray-50 dark:bg-gray-800 text-left">
                              <th className="px-4 py-2.5 font-semibold text-gray-600 dark:text-gray-300">Nume cookie</th>
                              <th className="px-4 py-2.5 font-semibold text-gray-600 dark:text-gray-300">Furnizor</th>
                              <th className="px-4 py-2.5 font-semibold text-gray-600 dark:text-gray-300">Durată</th>
                              <th className="px-4 py-2.5 font-semibold text-gray-600 dark:text-gray-300">Scop</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {tip.cookies.map((c) => (
                              <tr key={c.nume} className="bg-white dark:bg-gray-900">
                                <td className="px-4 py-2.5 font-mono text-gray-800 dark:text-gray-200 font-medium">{c.nume}</td>
                                <td className="px-4 py-2.5 text-gray-500 dark:text-gray-400">{c.furnizor}</td>
                                <td className="px-4 py-2.5 text-gray-500 dark:text-gray-400 whitespace-nowrap">{c.durata}</td>
                                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">{c.scop}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </section>
              ))}

              {/* Gestionare */}
              <section id="gestionare" className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 scroll-mt-28">
                <h2 className="font-playfair text-xl font-bold text-gray-900 dark:text-white mb-5 pb-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
                  <span className="w-1 h-6 rounded-full flex-shrink-0" style={{ backgroundColor: ACCENT }} />
                  7. Cum Să Gestionați Cookie-urile
                </h2>
                <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed space-y-5">
                  <p>
                    Aveți mai multe opțiuni pentru a controla și gestiona cookie-urile utilizate de platforma
                    dottotv.ro. Vă reamintim că dezactivarea anumitor cookie-uri poate afecta funcționalitatea
                    site-ului.
                  </p>

                  <div className="space-y-4">
                    {[
                      {
                        titlu: "1. Prin bannerul de consimțământ DottoTV",
                        desc: "La prima vizită pe platformă, vi se afișează un banner prin care puteți alege să acceptați toate cookie-urile sau numai pe cele strict necesare. Preferința dvs. este salvată și bannerul nu va mai apărea la vizitele ulterioare. Puteți reveni oricând pentru a vă modifica preferințele ștergând datele de navigare din browser.",
                      },
                      {
                        titlu: "2. Prin setările browser-ului",
                        desc: "Fiecare browser oferă opțiuni de gestionare a cookie-urilor. Puteți configura browser-ul să blocheze toate cookie-urile, să le accepte pe toate sau să vă notifice înainte de stocarea fiecărui cookie.",
                      },
                      {
                        titlu: "3. Prin instrumentul Google Analytics Opt-out",
                        desc: "Pentru a vă opune colectării datelor prin Google Analytics, puteți instala extensia oficială Google Analytics Opt-out Browser Add-on, disponibilă pe tools.google.com/dlpage/gaoptout, compatibilă cu Chrome, Firefox, Edge, Safari și Opera.",
                      },
                      {
                        titlu: "4. Prin setările de publicitate ale platformelor",
                        desc: "Puteți gestiona preferințele de publicitate personalizată direct pe platformele partenere: Google (adssettings.google.com), Facebook (facebook.com/settings/?tab=ads), TikTok (setările contului → Confidențialitate → Publicitate).",
                      },
                    ].map((item) => (
                      <div key={item.titlu} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                        <p className="font-semibold text-gray-900 dark:text-white mb-1.5">{item.titlu}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white mb-3">Instrucțiuni specifice pentru fiecare browser:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { browser: "Google Chrome", cale: "Setări → Confidențialitate și securitate → Cookie-uri și alte date de site" },
                        { browser: "Mozilla Firefox", cale: "Setări → Confidențialitate și securitate → Cookie-uri și date de site" },
                        { browser: "Microsoft Edge", cale: "Setări → Cookie-uri și permisiuni de site → Cookie-uri și date de site" },
                        { browser: "Apple Safari", cale: "Preferințe → Confidențialitate → Gestionare date de site-uri web" },
                        { browser: "Opera", cale: "Setări → Confidențialitate și securitate → Cookie-uri" },
                        { browser: "Samsung Internet", cale: "Setări → Confidențialitate → Cookie-uri" },
                      ].map((b) => (
                        <div key={b.browser} className="p-3 rounded-lg bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700">
                          <p className="font-semibold text-xs text-gray-900 dark:text-white">{b.browser}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{b.cale}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Drepturi */}
              <section id="drepturi" className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 scroll-mt-28">
                <h2 className="font-playfair text-xl font-bold text-gray-900 dark:text-white mb-5 pb-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
                  <span className="w-1 h-6 rounded-full flex-shrink-0" style={{ backgroundColor: ACCENT }} />
                  8. Drepturile Dvs.
                </h2>
                <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed space-y-3">
                  <p>
                    În măsura în care cookie-urile implică prelucrarea datelor cu caracter personal, beneficiați de
                    toate drepturile prevăzute de <strong>GDPR (Regulamentul UE 2016/679)</strong>: dreptul de
                    acces, rectificare, ștergere, restricționare, portabilitate și opoziție.
                  </p>
                  <p>
                    Aveți dreptul de a vă retrage consimțământul pentru cookie-urile non-esențiale în orice moment,
                    fără consecințe, prin metoda cea mai comodă pentru dvs. (banner, setările browser-ului sau
                    contactând-ne direct).
                  </p>
                  <p>
                    Dacă considerați că drepturile dvs. privind protecția datelor au fost încălcate, aveți dreptul
                    de a depune o plângere la{" "}
                    <strong>
                      Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP)
                    </strong>
                    , Bd. G-ral. Gheorghe Magheru nr. 28–30, Sector 1, București,{" "}
                    <span className="font-medium">www.dataprotection.ro</span>.
                  </p>
                  <p>
                    Pentru detalii complete despre drepturile dvs. și modul de exercitare a acestora, consultați{" "}
                    <Link
                      href="/politica-de-confidentialitate"
                      className="font-medium hover:underline"
                      style={{ color: ACCENT }}
                    >
                      Politica noastră de Confidențialitate
                    </Link>
                    .
                  </p>
                </div>
              </section>

              {/* Contact */}
              <section id="contact" className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 scroll-mt-28">
                <h2 className="font-playfair text-xl font-bold text-gray-900 dark:text-white mb-5 pb-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
                  <span className="w-1 h-6 rounded-full flex-shrink-0" style={{ backgroundColor: ACCENT }} />
                  9. Contact
                </h2>
                <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed space-y-3">
                  <p>
                    Pentru orice întrebări privind utilizarea cookie-urilor pe platforma <strong>www.dottotv.ro</strong>,
                    ne puteți contacta la:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {[
                      { label: "Operator", value: "S.C. DOTTO TV MEDIA S.R.L." },
                      { label: "CUI", value: "46123400" },
                      { label: "Email juridic", value: "office@dottotv.ro", href: "mailto:office@dottotv.ro" },
                      { label: "Sediul social", value: "Bd. Aurel Vlaicu nr. 144, etaj 1, Constanța" },
                    ].map((item) => (
                      <div key={item.label} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">{item.label}</p>
                        {"href" in item && item.href ? (
                          <a href={item.href} className="text-sm font-medium hover:underline" style={{ color: ACCENT }}>{item.value}</a>
                        ) : (
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{item.value}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Footer note */}
              <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  © {new Date().getFullYear()} S.C. DOTTO TV MEDIA S.R.L. — CUI 46123400 — Constanța, România
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">
                  Ultima actualizare: {lastUpdated} · Conformă cu Legea nr. 506/2004 și Directiva 2009/136/CE
                </p>
                <div className="flex flex-wrap justify-center gap-6 mt-4">
                  <Link href="/politica-de-confidentialitate" className="text-sm hover:underline" style={{ color: ACCENT }}>
                    Politică de Confidențialitate
                  </Link>
                  <Link href="/termeni-si-conditii" className="text-sm hover:underline" style={{ color: ACCENT }}>
                    Termeni și Condiții
                  </Link>
                  <Link href="/contact" className="text-sm hover:underline" style={{ color: ACCENT }}>
                    Contact
                  </Link>
                </div>
              </div>

            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
