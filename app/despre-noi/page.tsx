import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Despre Noi",
  description:
    "DOTTO TV a luat naștere în 2013 când a obținut licența CNA. Suntem televiziunea locală a județului Constanța, cu obiectivul de a deveni televiziune regională în Dobrogea.",
};

const ACCENT = "#1565C0";
const ACCENT_LIGHT = "#1976D2";

const values = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Acuratețe",
    desc: "Verificăm fiecare informație înainte de publicare. Corectitudinea faptelor este fundamentul credibilității noastre.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
    title: "Imparțialitate",
    desc: "Prezentăm toate unghiurile unui eveniment fără preferințe politice sau de grup. Echidistanța este datoria noastră față de public.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Promptitudine",
    desc: "Informăm rapid, fără a sacrifica calitatea. Știrile importante ajung la public în timp real, cu context și claritate.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Comunitate",
    desc: "Suntem parte din comunitatea dobrogeneană. Știrile noastre reflectă preocupările și realitățile oamenilor din această regiune.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    title: "Transparență",
    desc: "Suntem deschiși față de sursele noastre și față de procesul editorial. Corectăm erorile imediat și public.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "Inovație",
    desc: "Adoptăm formatele digitale moderne — video scurt, live streaming, analize multimedia — pentru a livra informația acolo unde este publicul.",
  },
];

const timeline = [
  {
    year: "2013",
    title: "Înființare și licența CNA",
    desc: "DOTTO TV ia naștere în Constanța și obține licența Consiliului Național al Audiovizualului. Primele transmisii locale acoperă evenimentele esențiale din Dobrogea.",
  },
  {
    year: "2015",
    title: "Expansiunea redacției",
    desc: "Creștem echipa de jurnaliști și consolidăm acoperirea în județul Constanța — de la municipiul reședință la localitățile de pe litoral și din interior.",
  },
  {
    year: "2017",
    title: "Platforma digitală",
    desc: "Lansăm prezența online completă cu live streaming și arhivă video. Publicul din diaspora poate urmări evenimentele din Dobrogea în timp real.",
  },
  {
    year: "2019",
    title: "Jurnalism de impact",
    desc: "Investigațiile noastre despre administrație și mediu devin referință pentru presa regională. Colaborăm cu publicații naționale de prestigiu.",
  },
  {
    year: "2021",
    title: "Format video concis",
    desc: "Adoptăm formatul de știri video comprimate — esențialul în 90 de secunde. Audiența crește semnificativ pe platformele sociale.",
  },
  {
    year: "2027",
    title: "Obiectiv: televiziune regională",
    desc: "Pornim demersurile pentru extinderea licenței la nivel regional. Scopul: să devenim vocea întregii Dobrogii — Constanța, Tulcea și împrejurimi.",
  },
];

const coverage = [
  { name: "Municipiul Constanța", desc: "Reședința județului — principalul centru economic, cultural și media din regiune" },
  { name: "Mangalia", desc: "Cel mai sudic oraș al județului, port și stațiune la Marea Neagră" },
  { name: "Medgidia", desc: "Nod feroviar și industrial important al județului Constanța" },
  { name: "Cernavodă", desc: "Centru energetic strategic, gazda centralei nucleare a României" },
  { name: "Litoralul Mării Negre", desc: "Stațiunile județului — de la Năvodari la Vama Veche" },
  { name: "Județ Constanța", desc: "Toate localitățile și evenimentele de interes ale județului" },
];

export default function DespreNoiPage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden" style={{ backgroundColor: ACCENT }}>
        {/* decorative grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* diagonal accent */}
        <div
          className="absolute -bottom-1 left-0 right-0 h-16"
          style={{
            background: "linear-gradient(to bottom right, transparent 49.9%, #f9fafb 50%)",
          }}
        />
        <div className="relative container mx-auto px-4 py-20 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-white/15 text-blue-100 mb-5">
            Din 2013, vocea Dobrogei
          </span>
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Despre DOTTO TV
          </h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Sursa de știri și analize video concise și imparțiale din Constanța și Dobrogea.
            Extragem esențialul și comprimăm informația corectă, prompt, rapid și cu sens.
          </p>
        </div>
      </div>

      {/* ── Intro / Povestea noastră ── */}
      <section className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>
              Povestea noastră
            </p>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              O televiziune locală cu misiune națională
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
              <p>
                <strong className="text-gray-900 dark:text-white">DOTTO TV</strong> a luat naștere în{" "}
                <strong className="text-gray-900 dark:text-white">2013</strong>, când a obținut licența
                Consiliului Național al Audiovizualului. De atunci, am crescut alături de comunitatea
                dobrogeană, documentând evenimentele care contează cu acuratețe și responsabilitate.
              </p>
              <p>
                Într-o lume în care informația circulă cu viteza luminii, noi am ales să nu sacrificăm
                calitatea pentru viteză. La DOTTO TV,{" "}
                <strong className="text-gray-900 dark:text-white">extragem esențialul</strong> și comprimăm
                informația corectă — prompt, rapid și cu sens.
              </p>
              <p>
                Știrile despre cele mai importante evenimente ale zilei sunt abordate din{" "}
                <strong className="text-gray-900 dark:text-white">toate unghiurile</strong> și privite
                din perspectiva impactului asupra oamenilor — nu al politicienilor, nu al grupurilor
                de interese, ci al cetățenilor.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-5">
            {[
              { num: "2013", label: "Anul înființării" },
              { num: "CNA", label: "Licență televiziune" },
              { num: "CT", label: "Județul Constanța" },
              { num: "100%", label: "Angajament față de adevăr" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 text-center"
              >
                <div
                  className="font-playfair text-4xl font-bold mb-2"
                  style={{ color: ACCENT }}
                >
                  {stat.num}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Misiune ── */}
      <section
        className="relative py-16 overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #0d47a1 100%)` }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative container mx-auto px-4 max-w-4xl text-center">
          <p className="text-blue-200 text-xs font-semibold uppercase tracking-widest mb-4">Misiunea noastră</p>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-8 leading-snug">
            „Informăm, nu influențăm. Documentăm, nu manipulăm."
          </h2>
          <p className="text-blue-100 text-lg leading-relaxed max-w-3xl mx-auto">
            Misiunea DOTTO TV este să fie vocea credibilă a comunității dobrogene — să aducă zilnic
            informații verificate, prezentate imparțial, în formate video accesibile și concise.
            Credem că jurnalismul de calitate este un serviciu public esențial și că fiecare cetățean
            merită acces la informație corectă, indiferent de apartenența politică sau socială.
          </p>
        </div>
      </section>

      {/* ── Valori ── */}
      <section className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>
            Ce ne definește
          </p>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Valorile noastre
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v) => (
            <div
              key={v.title}
              className="bg-white dark:bg-gray-900 rounded-2xl p-7 shadow-sm border border-gray-100 dark:border-gray-800 group hover:shadow-md transition-shadow"
            >
              <div
                className="w-13 h-13 w-12 h-12 rounded-xl flex items-center justify-center text-white mb-5"
                style={{ backgroundColor: ACCENT }}
              >
                {v.icon}
              </div>
              <h3 className="font-playfair text-xl font-bold text-gray-900 dark:text-white mb-2">
                {v.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Viziune ── */}
      <section className="bg-white dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Visual accent */}
            <div className="relative">
              <div
                className="rounded-3xl p-10 text-white relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #0d47a1 100%)` }}
              >
                <div
                  className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10"
                  style={{ backgroundColor: "white" }}
                />
                <div
                  className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full opacity-10"
                  style={{ backgroundColor: "white" }}
                />
                <svg className="w-16 h-16 mb-6 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4}
                    d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <p className="font-playfair text-2xl font-bold mb-3 leading-snug">
                  De la televiziune locală la televiziune regională
                </p>
                <p className="text-blue-100 text-sm leading-relaxed">
                  Deținem licență de televiziune locală și țintim să devenim televiziune regională
                  în viitorul apropiat, acoperind întreaga regiune Sud-Est a României.
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>
                Viziunea noastră
              </p>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Dobrogea merită o televiziune regională puternică
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                <p>
                  Viziunea noastră pe termen lung este să fim <strong className="text-gray-900 dark:text-white">
                  cel mai de încredere furnizor de știri video</strong> din Sud-Estul României,
                  recunoscut pentru integritate editorială și relevanță locală.
                </p>
                <p>
                  Credem că o regiune cu o identitate atât de bogată — de la portul Constanța la
                  Delta Dunării, de la peisajele dobrogene la multiculturalismul unic al comunităților
                  locale — merită o televiziune pe măsura ei.
                </p>
                <p>
                  Prin formatul nostru video concis și distribuit pe toate platformele digitale,
                  aducem Dobrogea pe harta jurnalismului românesc de calitate.
                </p>
              </div>

              {/* targets */}
              <div className="mt-8 space-y-3">
                {[
                  "Obținerea licenței de televiziune regională",
                  "Extinderea rețelei de corespondenți în toată Dobrogea",
                  "Producție de emisiuni tematice de analiză și dezbatere",
                  "Parteneriate cu media europene specializate în știri regionale",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: ACCENT }}
                    >
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Istorie / Timeline ── */}
      <section className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>
            Un deceniu de jurnalism
          </p>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Istoria noastră
          </h2>
        </div>

        <div className="relative">
          {/* vertical line */}
          <div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ backgroundColor: "#dbeafe" }}
          />

          <div className="space-y-8">
            {timeline.map((item, i) => (
              <div
                key={item.year}
                className={`relative flex flex-col md:flex-row gap-6 md:gap-0 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Year bubble */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white text-xs font-bold z-10 shadow-md"
                  style={{ backgroundColor: ACCENT }}>
                  {item.year.slice(-2)}
                </div>

                {/* Content card */}
                <div className={`ml-20 md:ml-0 md:w-5/12 ${i % 2 === 0 ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"}`}>
                  <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
                    <span
                      className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3"
                      style={{ backgroundColor: "#dbeafe", color: ACCENT }}
                    >
                      {item.year}
                    </span>
                    <h3 className="font-playfair text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Acoperire geografică ── */}
      <section className="bg-white dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>
              Județul Constanța
            </p>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Acoperire geografică
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-sm leading-relaxed">
              Emitem în prezent ca televiziune locală în județul Constanța, acoperind evenimentele care contează
              pentru comunitatea constănțeană. Extinderea la nivel regional — Dobrogea — este obiectivul nostru pe termen mediu.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {coverage.map((place) => (
              <div
                key={place.name}
                className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 hover:border-blue-200 dark:hover:border-blue-900 transition-colors"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: ACCENT }}
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{place.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">{place.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Coverage callout */}
          <div
            className="rounded-2xl p-8 text-center"
            style={{ background: `linear-gradient(135deg, ${ACCENT}15 0%, #0d47a115 100%)` }}
          >
            <svg
              className="w-10 h-10 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ color: ACCENT }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6}
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="font-playfair text-xl font-bold text-gray-900 dark:text-white mb-2">
              Constanța azi, Dobrogea mâine
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm max-w-lg mx-auto">
              Suntem astăzi televiziunea locală a județului Constanța. Ne pregătim să devenim vocea
              întregii Dobrogii — o regiune unică, la intersecția Europei de Est și de Vest,
              cu o istorie milenară și o bogăție culturală ieșită din comun.
            </p>
          </div>
        </div>
      </section>

      {/* ── Angajament față de informație ── */}
      <section className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>
              Standardele noastre editoriale
            </p>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Angajamentul față de informația corectă
            </h2>
            <div className="space-y-5">
              {[
                {
                  title: "Verificare multi-sursă",
                  desc: "Orice informație publicată este verificată din minimum două surse independente. Nu publicăm zvonuri sau informații neconfirmate.",
                },
                {
                  title: "Separarea știrii de opinie",
                  desc: "Menținem o linie clară între jurnalismul de informare și cel de opinie. Publicul trebuie să știe întotdeauna cu ce tip de conținut interacționează.",
                },
                {
                  title: "Dreptul la replică",
                  desc: "Orice persoană sau instituție vizată negativ într-un material are dreptul garantat la replică înainte de publicare.",
                },
                {
                  title: "Corectarea erorilor",
                  desc: "Greșelile se corectează imediat și transparent. Publicăm errata vizibilă, fără a șterge sau a ascunde conținutul original.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: `${ACCENT}15` }}
                  >
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ACCENT }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-800">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6"
              style={{ backgroundColor: ACCENT }}
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="font-playfair text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Licența CNA
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
              DOTTO TV funcționează în baza licenței acordate de Consiliul Național al Audiovizualului
              (CNA), organism de reglementare independent al audiovizualului din România.
            </p>
            <div className="space-y-3">
              {[
                "Respectarea Codului Audiovizualului",
                "Monitorizare și raportare periodică CNA",
                "Standarde de protecție a minorilor",
                "Respectarea drepturilor omului în conținut",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <svg className="w-4 h-4 flex-shrink-0" style={{ color: ACCENT }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-16"
        style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #0d47a1 100%)` }}
      >
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4">
            Fii parte din comunitatea noastră
          </h2>
          <p className="text-blue-100 mb-8 leading-relaxed">
            Urmărește DOTTO TV pentru cele mai recente știri din județul Constanța.
            Împreună, construim o comunitate informată.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-sm font-semibold rounded-xl hover:bg-blue-50 transition-colors"
              style={{ color: ACCENT }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Pagina principală
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border-2 border-white/40 text-white text-sm font-semibold rounded-xl hover:bg-white/10 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contactează-ne
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
