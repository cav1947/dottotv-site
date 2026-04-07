import type { Post, Category } from "./wordpress";

export const MOCK_CATEGORIES: Category[] = [
  { id: "1", name: "Actualitate", slug: "actualitate", count: 24, description: "Știri de ultimă oră din România și lume" },
  { id: "2", name: "Politică", slug: "politica", count: 18, description: "Politica românească și internațională" },
  { id: "3", name: "Sport", slug: "sport", count: 31, description: "Fotbal, tenis și toate sporturile" },
  { id: "4", name: "Economie", slug: "economie", count: 15, description: "Finanțe, afaceri și economie" },
  { id: "5", name: "Externe", slug: "externe", count: 20, description: "Știri din întreaga lume" },
  { id: "6", name: "Sănătate", slug: "sanatate", count: 12, description: "Sănătate, medicină și stil de viață" },
  { id: "7", name: "Constanța", slug: "constanta", count: 27, description: "Știri locale din Constanța și Dobrogea" },
  { id: "8", name: "Interne", slug: "interne", count: 22, description: "Știri din toată România" },
];

const AUTHORS = [
  { name: "Mihai Popescu", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&q=80" },
  { name: "Ana Constantin", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&q=80" },
  { name: "Bogdan Ionescu", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&q=80" },
  { name: "Elena Dumitrescu", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&h=96&fit=crop&q=80" },
  { name: "Redacția DottoTV", avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=96&h=96&fit=crop&q=80" },
  { name: "Cristian Marin", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&q=80" },
];

function author(index: number) {
  const a = AUTHORS[index % AUTHORS.length];
  return { node: { name: a.name, avatar: { url: a.avatar } } };
}

function cat(id: string) {
  const c = MOCK_CATEGORIES.find(x => x.id === id)!;
  return { nodes: [{ id: c.id, name: c.name, slug: c.slug }] };
}

function img(seed: string) {
  return { node: { sourceUrl: `https://picsum.photos/seed/${seed}/800/450`, altText: "" } };
}

function ago(hours: number): string {
  const d = new Date(Date.now() - hours * 3_600_000);
  return d.toISOString();
}

export const MOCK_POSTS: Post[] = [
  // ── ACTUALITATE ─────────────────────────────────────────────────────────
  {
    id: "1", slug: "premierul-a-anuntat-noi-masuri-economice-pentru-2025",
    title: "Premierul a anunțat noi măsuri economice pentru 2025: scutiri de taxe pentru IMM-uri și creșteri de salarii",
    excerpt: "<p>Guvernul pregătește un pachet amplu de măsuri fiscale pentru stimularea economiei românești, cu accent pe sprijinul pentru micile afaceri și creșterea puterii de cumpărare.</p>",
    content: "<p>Premierul României a prezentat astăzi un pachet de măsuri economice ambițios pentru anul 2025...</p>",
    date: ago(1), modified: ago(1),
    featuredImage: img("gov-measures"),
    categories: cat("1"), author: author(0),
  },
  {
    id: "2", slug: "inundatii-in-sudul-tarii-sute-de-persoane-evacuate",
    title: "Inundații grave în sudul țării: sute de persoane evacuate, drumuri naționale blocate",
    excerpt: "<p>Ploile torențiale din ultimele 48 de ore au provocat inundații severe în județele Olt, Dolj și Teleorman. Autoritățile au declarat stare de urgență.</p>",
    content: "<p>Sistemele de avertizare hidrologică au emis cod roșu pentru mai multe bazine hidrografice...</p>",
    date: ago(2), modified: ago(2),
    featuredImage: img("flood-rescue"),
    categories: cat("1"), author: author(1),
  },
  {
    id: "3", slug: "record-de-temperatura-in-romania-43-grade-la-umbra",
    title: "Record de temperatură în România: 43 de grade la umbră în Oltenia, ANM avertizează",
    excerpt: "<p>România traversează cel mai fierbinte val de căldură din ultimii 20 de ani. Meteorologii anunță că temperaturile vor rămâne ridicate până la sfârșitul săptămânii.</p>",
    content: "<p>Administrația Națională de Meteorologie a emis cod portocaliu de caniculă...</p>",
    date: ago(3), modified: ago(3),
    featuredImage: img("heatwave"),
    categories: cat("1"), author: author(2),
  },
  {
    id: "4", slug: "greva-generala-in-invatamant-zeci-de-mii-de-elevi-acasa",
    title: "Grevă generală în învățământ: zeci de mii de elevi rămân acasă, profesorii cer majorări salariale",
    excerpt: "<p>Sindicatele din educație au declanșat greva generală după eșuarea negocierilor cu Ministerul Educației privind creșterile salariale promise.</p>",
    content: "<p>Aproximativ 180.000 de cadre didactice participă la grevă...</p>",
    date: ago(4), modified: ago(4),
    featuredImage: img("education-strike"),
    categories: cat("1"), author: author(3),
  },

  // ── POLITICĂ ────────────────────────────────────────────────────────────
  {
    id: "5", slug: "alegeri-prezidentiale-sondaj-surpriza-candidat-independent-in-turul-2",
    title: "Sondaj surpriză: candidat independent intră în turul 2 al alegerilor prezidențiale cu 23% din voturi",
    excerpt: "<p>Un nou sondaj de opinie plasează un candidat independent pe locul 2, depășind candidații marilor partide. Rezultatul a șocat clasa politică românească.</p>",
    content: "<p>Institutul de Sondare CURS a publicat astăzi un studiu care arată o reconfigurare dramatică...</p>",
    date: ago(2), modified: ago(2),
    featuredImage: img("elections-vote"),
    categories: cat("2"), author: author(0),
  },
  {
    id: "6", slug: "coalitia-de-guvernare-se-rupe-ministrii-usrplus-demisioneaza",
    title: "Coaliția de guvernare se rupe: miniștrii USR Plus demisionează în bloc, criză politică majoră",
    excerpt: "<p>Tensiunile din coaliție au atins punctul de ruptură după disputele legate de bugetul pe 2025. România intră într-o nouă criză politică.</p>",
    content: "<p>Ministrul Finanțelor a anunțat că nu mai poate colabora cu partenerii de coaliție...</p>",
    date: ago(5), modified: ago(5),
    featuredImage: img("parliament-ro"),
    categories: cat("2"), author: author(4),
  },
  {
    id: "7", slug: "parlamentul-a-votat-noua-lege-a-pensiilor-cresteri-de-30-la-suta",
    title: "Parlamentul a votat noua lege a pensiilor: creșteri de 30% pentru pensionarii cu venituri mici",
    excerpt: "<p>Camera Deputaților a adoptat cu largă majoritate noua lege a pensiilor, care prevede indexarea automată și creșteri semnificative pentru pensiile sub 1.500 lei.</p>",
    content: "<p>Legea pensiilor, cel mai dezbătut act normativ al acestui an...</p>",
    date: ago(6), modified: ago(6),
    featuredImage: img("parliament2"),
    categories: cat("2"), author: author(1),
  },

  // ── SPORT ───────────────────────────────────────────────────────────────
  {
    id: "8", slug: "fcsb-a-castigat-campionatul-romaniei-titlul-27-din-istorie",
    title: "FCSB a câștigat Campionatul României! Titlul 27 din istorie, după un sezon dramatic",
    excerpt: "<p>Echipa lui Gigi Becali a cucerit titlul de campioană după o victorie cu 3-1 în ultima etapă în fața celor de la CFR Cluj. Scene de nedescris pe Național Arena.</p>",
    content: "<p>O sărbătoare fără precedent a cuprins capitala după ce FCSB a asigurat matematic titlul...</p>",
    date: ago(3), modified: ago(3),
    featuredImage: img("football-stadium"),
    categories: cat("3"), author: author(2),
  },
  {
    id: "9", slug: "simona-halep-revine-pe-terenul-de-tenis-la-wimbledon-2025",
    title: "Simona Halep revine spectaculos la Wimbledon 2025! Prima victorie după suspendare",
    excerpt: "<p>Jucătoarea română a câștigat în trei seturi în primul tur al turneului de la Wimbledon, oferind un moment emoționant fanilor prezenți pe gazon.</p>",
    content: "<p>Simona Halep a demonstrat că nu a uitat să joace tenis de clasă mondială...</p>",
    date: ago(7), modified: ago(7),
    featuredImage: img("tennis-match"),
    categories: cat("3"), author: author(3),
  },
  {
    id: "10", slug: "nationala-romaniei-calificata-la-euro-2026-victorie-dramatica",
    title: "Naționala României, calificată la EURO 2026! Victorie dramatică cu Elveția în ultimul minut",
    excerpt: "<p>Golul lui Denis Drăguș în minutul 93 a adus victoria cu 2-1 și calificarea istorică la Campionatul European de Fotbal din Germania.</p>",
    content: "<p>Un stadion plin ochi a asistat la una dintre cele mai tensionate partide din istoria fotbalului românesc...</p>",
    date: ago(8), modified: ago(8),
    featuredImage: img("football-field"),
    categories: cat("3"), author: author(0),
  },
  {
    id: "11", slug: "sport-constanta-fc-farul-in-europa-league",
    title: "FC Farul Constanța a ajuns în grupele Europa League! Victorie cu Sparta Praga",
    excerpt: "<p>Echipa lui Hagi a scris istorie calificându-se în grupele Europa League după o prestație remarcabilă în turul playoff.</p>",
    content: "<p>Farul Constanța a realizat cel mai mare rezultat din istoria clubului dobrogenean...</p>",
    date: ago(10), modified: ago(10),
    featuredImage: img("farul-sport"),
    categories: cat("3"), author: author(5),
  },

  // ── ECONOMIE ────────────────────────────────────────────────────────────
  {
    id: "12", slug: "banca-nationala-a-romaniei-a-redus-dobanda-cheie",
    title: "BNR a redus dobânda cheie la 5,75%: ce înseamnă asta pentru credite și depozite",
    excerpt: "<p>Consiliul de Administrație al Băncii Naționale a României a decis reducerea ratei dobânzii de politică monetară, prima scădere din ultimii trei ani.</p>",
    content: "<p>Decizia BNR vine în contextul temperării inflației și al presiunilor recesioniste din zona euro...</p>",
    date: ago(5), modified: ago(5),
    featuredImage: img("finance-bnr"),
    categories: cat("4"), author: author(1),
  },
  {
    id: "13", slug: "amazon-deschide-centru-logistic-la-timisoara-5000-de-locuri-de-munca",
    title: "Amazon deschide cel mai mare centru logistic din Europa de Est la Timișoara: 5.000 de locuri de muncă",
    excerpt: "<p>Gigantul american de e-commerce investește 800 milioane de euro în România, construind un complex de depozitare și distribuție care va deveni hub regional.</p>",
    content: "<p>Anunțul a fost făcut în prezența premierului României și a reprezentanților Amazon...</p>",
    date: ago(9), modified: ago(9),
    featuredImage: img("amazon-warehouse"),
    categories: cat("4"), author: author(2),
  },
  {
    id: "14", slug: "cursul-euro-a-depasit-5-lei-pentru-prima-data",
    title: "Cursul euro a depășit 5 lei pentru prima dată în istorie: BNR intervine pe piață",
    excerpt: "<p>Moneda națională a atins un nou minim istoric față de euro, în contextul turbulențelor geopolitice și al deficitului bugetar în creștere.</p>",
    content: "<p>Analiștii financiari atribuie deprecierea leului mai multor factori structurali...</p>",
    date: ago(11), modified: ago(11),
    featuredImage: img("currency-euro"),
    categories: cat("4"), author: author(4),
  },

  // ── EXTERNE ─────────────────────────────────────────────────────────────
  {
    id: "15", slug: "razboiul-din-ucraina-trupe-nato-la-granita-romaniei",
    title: "Conflictul din Ucraina: NATO suplimentează trupele la granița României, alertă ridicată",
    excerpt: "<p>Alianța Nord-Atlantică a decis triplarea contingentului militar la frontiera estică, ca răspuns la escaladarea ostilităților din Ucraina.</p>",
    content: "<p>Decizia NATO vine după consultări urgente ale Consiliului Nord-Atlantic...</p>",
    date: ago(1), modified: ago(1),
    featuredImage: img("nato-military"),
    categories: cat("5"), author: author(0),
  },
  {
    id: "16", slug: "alegerile-din-franta-marine-le-pen-cstigatoare-in-primul-tur",
    title: "Alegeri în Franța: Marine Le Pen câștigătoare în primul tur cu 34%, stânga franceză în criză",
    excerpt: "<p>Rezultatele primului tur al alegerilor legislative franceze au produs un val de șoc în Europa. Extrema dreaptă ar putea forma guvernul pentru prima dată.</p>",
    content: "<p>Franța trăiește cea mai importantă răscruce politică din ultimele decenii...</p>",
    date: ago(4), modified: ago(4),
    featuredImage: img("france-election"),
    categories: cat("5"), author: author(3),
  },
  {
    id: "17", slug: "cutremur-puternic-in-turcia-7-2-pe-scara-richter",
    title: "Cutremur devastator în Turcia: magnitudine 7,2, zeci de clădiri prăbușite în Istanbul",
    excerpt: "<p>Un seism puternic a lovit vestul Turciei în primele ore ale dimineții. Echipele de salvare caută supraviețuitori sub dărâmături.</p>",
    content: "<p>Serviciile de urgență turcești au mobilizat mii de salvatori în zonele afectate...</p>",
    date: ago(6), modified: ago(6),
    featuredImage: img("earthquake-rescue"),
    categories: cat("5"), author: author(1),
  },
  {
    id: "18", slug: "inteligenta-artificiala-chatgpt-6-lansat",
    title: "OpenAI lansează ChatGPT-6: gândire la nivel uman în toate domeniile, teste impresionante",
    excerpt: "<p>Cel mai avansat model de inteligență artificială creat vreodată poate rezolva probleme matematice olimpice și scrie cod la nivel de expert.</p>",
    content: "<p>Lansarea ChatGPT-6 redefinește limitele inteligenței artificiale generative...</p>",
    date: ago(12), modified: ago(12),
    featuredImage: img("ai-technology"),
    categories: cat("5"), author: author(2),
  },

  // ── SĂNĂTATE ────────────────────────────────────────────────────────────
  {
    id: "19", slug: "vaccinul-anti-cancer-mrna-rezultate-revolutionare-studiu-clinicpg",
    title: "Vaccinul anti-cancer ARNm: rezultate revoluționare în studiile clinice, 90% rată de supraviețuire",
    excerpt: "<p>Cercetătorii de la BioNTech și Moderna au publicat rezultatele studiului de faza 3 pentru vaccinul personalizat împotriva melanomului malign.</p>",
    content: "<p>Medicina oncologică intră într-o nouă eră după publicarea acestor rezultate...</p>",
    date: ago(8), modified: ago(8),
    featuredImage: img("medical-vaccine"),
    categories: cat("6"), author: author(4),
  },
  {
    id: "20", slug: "ministerul-sanatatii-program-national-screening-cancer-col-uterin",
    title: "Ministerul Sănătății lansează program național de screening: testare gratuită pentru 500.000 de femei",
    excerpt: "<p>România pornește cel mai amplu program de prevenție din ultimii 20 de ani, cu scopul de a reduce mortalitatea prin cancer de col uterin cu 40%.</p>",
    content: "<p>Programul național va acoperi femeile cu vârste între 25 și 64 de ani...</p>",
    date: ago(14), modified: ago(14),
    featuredImage: img("health-screening"),
    categories: cat("6"), author: author(3),
  },

  // ── CONSTANȚA ────────────────────────────────────────────────────────────
  {
    id: "21", slug: "portul-constanta-devine-cel-mai-mare-port-din-marea-neagra",
    title: "Portul Constanța devine cel mai mare port din Marea Neagră după investiții de 2 miliarde euro",
    excerpt: "<p>Lucrările de modernizare și extindere a Portului Constanța sunt aproape finalizate. Noul terminal de containere va putea procesa 3 milioane de unități pe an.</p>",
    content: "<p>Portul Constanța, poarta României la Marea Neagră, intră într-o nouă eră...</p>",
    date: ago(2), modified: ago(2),
    featuredImage: img("constanta-port"),
    categories: cat("7"), author: author(5),
  },
  {
    id: "22", slug: "mamaia-sezon-record-2-milioane-turisti-in-iulie",
    title: "Sezon record la Mamaia: 2 milioane de turiști în iulie, hotelurile complet ocupate",
    excerpt: "<p>Stațiunea Mamaia a înregistrat în luna iulie cel mai ridicat grad de ocupare din ultimii 30 de ani. Prețurile au crescut cu 25% față de vara trecută.</p>",
    content: "<p>Litoralul românesc trăiește un boom turistic fără precedent...</p>",
    date: ago(3), modified: ago(3),
    featuredImage: img("mamaia-beach"),
    categories: cat("7"), author: author(0),
  },
  {
    id: "23", slug: "autostrada-constanta-bucuresti-inaugurata-oficial",
    title: "Autostrada Constanța–București complet finalizată! Inaugurarea oficială, drum în 1h45min",
    excerpt: "<p>Ultimul tronson al autostrăzii A2 a fost dat în circulație, conectând capitala de litoral în mai puțin de două ore. Evenimentul a atras mii de constănțeni.</p>",
    content: "<p>România marchează un moment de referință în infrastructura de transport...</p>",
    date: ago(5), modified: ago(5),
    featuredImage: img("highway-road"),
    categories: cat("7"), author: author(1),
  },
  {
    id: "24", slug: "delfini-gasiti-morti-pe-plaja-tomis-ingrijorare-ecologista",
    title: "Alarmă ecologică la Constanța: 12 delfini găsiți morți pe plaja Tomis, anchetă deschisă",
    excerpt: "<p>Autoritățile au deschis o anchetă după ce mai mulți delfini au fost găsiți morți pe plaja din centrul Constanței. Ecoloigiștii acuză poluarea marină.</p>",
    content: "<p>Institutul Național de Cercetare-Dezvoltare Marină Grigore Antipa a prelevat probe...</p>",
    date: ago(7), modified: ago(7),
    featuredImage: img("sea-dolphins"),
    categories: cat("7"), author: author(3),
  },

  // ── INTERNE ──────────────────────────────────────────────────────────────
  {
    id: "25", slug: "autostrada-moldova-primul-tronson-deschis-circulatiei",
    title: "Autostrada Moldovei: primul tronson de 45 km deschis circulației, Moldova iese din izolare",
    excerpt: "<p>Tronsonul Iași–Târgu Frumos al autostrăzii A8 a fost inaugurat astăzi. Este prima autostradă care trece prin Moldova și conectează provincia cu rețeaua europeană.</p>",
    content: "<p>Inaugurarea a reprezentat un moment emoționant pentru locuitorii Moldovei...</p>",
    date: ago(4), modified: ago(4),
    featuredImage: img("moldova-highway"),
    categories: cat("8"), author: author(2),
  },
  {
    id: "26", slug: "incendiu-la-spitalul-din-craiova-pacienti-evacuati",
    title: "Incendiu la Spitalul Județean Craiova: 60 de pacienți evacuați, pompieri în luptă cu flăcările",
    excerpt: "<p>Un incendiu puternic a izbucnit la secția de neurologie a spitalului. Toți pacienții au fost evacuați în siguranță, dar pagubele materiale sunt imense.</p>",
    content: "<p>Pompierii din Dolj au intervenit cu 8 autospeciale pentru stingerea incendiului...</p>",
    date: ago(6), modified: ago(6),
    featuredImage: img("hospital-fire"),
    categories: cat("8"), author: author(4),
  },
  {
    id: "27", slug: "transilvania-silicon-valley-100-de-companii-tech-la-cluj",
    title: "'Transilvania Silicon Valley': 100 de companii tech s-au mutat la Cluj în 2024",
    excerpt: "<p>Cluj-Napoca a depășit Bucureștiul ca destinație preferată a companiilor de tehnologie. Ecosistemul tech local depășește acum 200 de firme cu peste 15.000 de angajați.</p>",
    content: "<p>Clujul atrage în mod constant talente și investiții din întreaga lume...</p>",
    date: ago(10), modified: ago(10),
    featuredImage: img("tech-Cluj"),
    categories: cat("8"), author: author(0),
  },

  // ── extra pentru grid dens ───────────────────────────────────────────────
  {
    id: "28", slug: "romania-in-top-10-destinatii-turistice-europene-2025",
    title: "România în top 10 destinații turistice europene pentru 2025, premieră istorică",
    excerpt: "<p>Lonely Planet și National Geographic au inclus România în topul celor mai atractive destinații din Europa, cu accent pe Maramureș și Dobrogea.</p>",
    content: "<p>Turismul românesc crește cu 40% față de anul precedent...</p>",
    date: ago(13), modified: ago(13),
    featuredImage: img("romania-tourism"),
    categories: cat("1"), author: author(5),
  },
  {
    id: "29", slug: "hagi-noul-selectioner-al-nationalei-romaniei",
    title: "Hagi, noul selecționer al naționalei României! Anunțul oficial al FRF",
    excerpt: "<p>Gheorghe Hagi a semnat un contract pe 4 ani cu Federația Română de Fotbal și va prelua echipa națională începând cu luna august.</p>",
    content: "<p>Întoarcerea Regelui pe banca tehnică a naționalei a generat entuziasm imens...</p>",
    date: ago(15), modified: ago(15),
    featuredImage: img("football-coach"),
    categories: cat("3"), author: author(1),
  },
  {
    id: "30", slug: "planul-national-de-redresare-15-miliarde-euro-absorbiti",
    title: "România a absorbit 15 miliarde euro din PNRR: cea mai mare performanță din UE în 2024",
    excerpt: "<p>Ministerul Investițiilor a anunțat că România a atins recordul de absorbție a fondurilor europene, depășind media UE pentru prima dată în 25 de ani.</p>",
    content: "<p>Performanța în absorbția fondurilor europene reprezintă un salt calitativ...</p>",
    date: ago(16), modified: ago(16),
    featuredImage: img("eu-funds"),
    categories: cat("4"), author: author(2),
  },
  {
    id: "31", slug: "super-luna-august-2025-fenomen-rar-vizibil-din-romania",
    title: "Super-Luna din august 2025: cel mai spectaculos fenomen astronomic al anului, vizibil din România",
    excerpt: "<p>Lunea plină va apărea cu 14% mai mare și cu 30% mai strălucitoare decât de obicei. Astronomii recomandă locurile cu cer senin pentru o priveliște de neuitat.</p>",
    content: "<p>Fenomenul astronomic va putea fi admirat fără echipamente speciale...</p>",
    date: ago(18), modified: ago(18),
    featuredImage: img("supermoon-night"),
    categories: cat("1"), author: author(3),
  },
  {
    id: "32", slug: "trenul-de-mare-viteza-bucuresti-brasov-se-face",
    title: "Trenul de mare viteză București–Brașov se face! Contract semnat cu companie chineză, 250 km/h",
    excerpt: "<p>Ministerul Transporturilor a semnat contractul pentru primul tren de mare viteză din România. Călătoria București–Brașov va dura 45 de minute.</p>",
    content: "<p>Proiectul feroviar de referință al României intră în linie dreaptă...</p>",
    date: ago(20), modified: ago(20),
    featuredImage: img("train-highspeed"),
    categories: cat("8"), author: author(4),
  },
  {
    id: "33", slug: "constanta-hub-energie-regenerabila-offshore",
    title: "Constanța devine hub de energie regenerabilă: 10 parcuri eoliene offshore aprobate în Marea Neagră",
    excerpt: "<p>Guvernul a aprobat construcția a 10 parcuri eoliene offshore în apele românești ale Mării Negre. Investiția totală depășește 8 miliarde de euro.</p>",
    content: "<p>Marea Neagră devine un câmp energetic strategic pentru România...</p>",
    date: ago(22), modified: ago(22),
    featuredImage: img("offshore-wind"),
    categories: cat("7"), author: author(5),
  },
  {
    id: "34", slug: "meci-fcsb-vs-manchester-city-champions-league",
    title: "FCSB vs Manchester City în Champions League! Tragerea la sorți a creat meci de vis",
    excerpt: "<p>FCSB a fost repartizată în grupa G a Ligii Campionilor alături de Manchester City, Bayern Munchen și Ajax. Prima partidă se va juca pe Național Arena.</p>",
    content: "<p>Fotbalul românesc revine pe scena europeană de top...</p>",
    date: ago(24), modified: ago(24),
    featuredImage: img("champions-league"),
    categories: cat("3"), author: author(0),
  },
  {
    id: "35", slug: "scandal-coruptie-ministerul-sanatii-achizitii-supraevaluate",
    title: "Scandal de corupție la Ministerul Sănătății: achiziții supraevaluate de 400 milioane euro, DNA anchetează",
    excerpt: "<p>Direcția Națională Anticorupție a deschis dosar penal după ce auditorii europeni au descoperit nereguli grave în achizițiile publice de echipamente medicale.</p>",
    content: "<p>Dosarul a ajuns pe masa procurorilor după un raport devastator al Curții de Conturi...</p>",
    date: ago(26), modified: ago(26),
    featuredImage: img("corruption-dna"),
    categories: cat("2"), author: author(1),
  },
];

// Articole "breaking news" (primele 5)
export const MOCK_BREAKING: Pick<Post, "id" | "slug" | "title" | "date">[] = [
  { id: "1", slug: "inundatii-in-sudul-tarii-sute-de-persoane-evacuate", title: "⚡ BREAKING: Inundații grave în sudul țării — sute de persoane evacuate", date: ago(2) },
  { id: "2", slug: "coalitia-de-guvernare-se-rupe-ministrii-usrplus-demisioneaza", title: "BREAKING: Coaliția de guvernare se rupe — miniștrii demisionează în bloc", date: ago(5) },
  { id: "3", slug: "razboiul-din-ucraina-trupe-nato-la-granita-romaniei", title: "LIVE: NATO suplimentează trupele la granița României", date: ago(1) },
  { id: "4", slug: "cursul-euro-a-depasit-5-lei-pentru-prima-data", title: "ALERTĂ: Euro a depășit 5 lei pentru prima dată în istorie", date: ago(11) },
  { id: "5", slug: "fcsb-a-castigat-campionatul-romaniei-titlul-27-din-istorie", title: "SPORT: FCSB campioană! Titlul 27 din istoria clubului roș-albastru", date: ago(3) },
];
