import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politică de Confidențialitate",
  description:
    "Politica de confidențialitate a platformei DottoTV, operată de S.C. DOTTO TV MEDIA SRL. Aflați cum colectăm, utilizăm și protejăm datele dvs. cu caracter personal.",
};

const ACCENT = "#1565C0";
const lastUpdated = "8 aprilie 2026";

const sections = [
  {
    id: "operator",
    title: "1. Cine Suntem — Datele Operatorului",
    content: (
      <>
        <p>
          Prezenta Politică de Confidențialitate descrie modul în care <strong>S.C. DOTTO TV MEDIA S.R.L.</strong>,
          în calitate de <strong>operator de date cu caracter personal</strong>, colectează, utilizează, stochează și
          protejează informațiile dvs. personale atunci când accesați și utilizați platforma{" "}
          <strong>www.dottotv.ro</strong>.
        </p>
        <div className="my-5 p-5 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 space-y-1.5 text-sm">
          <p><strong>Denumire:</strong> S.C. DOTTO TV MEDIA S.R.L.</p>
          <p><strong>Cod Unic de Înregistrare (CUI):</strong> 46123400</p>
          <p><strong>Formă juridică:</strong> Societate cu Răspundere Limitată</p>
          <p><strong>Sediul social:</strong> Bd. Aurel Vlaicu nr. 144, etaj 1, Constanța, județul Constanța, România</p>
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:office@dottotv.ro" className="text-blue-700 dark:text-blue-400 hover:underline">
              office@dottotv.ro
            </a>
          </p>
          <p>
            <strong>Website:</strong>{" "}
            <a href="https://www.dottotv.ro" className="text-blue-700 dark:text-blue-400 hover:underline">
              www.dottotv.ro
            </a>
          </p>
        </div>
        <p>
          Prelucrarea datelor cu caracter personal se efectuează în conformitate cu{" "}
          <strong>Regulamentul (UE) 2016/679</strong> al Parlamentului European și al Consiliului din 27 aprilie 2016
          (GDPR), cu <strong>Legea nr. 190/2018</strong> privind măsurile de punere în aplicare a GDPR și cu celelalte
          acte normative aplicabile în vigoare.
        </p>
        <p className="mt-3">
          S.C. DOTTO TV MEDIA S.R.L. nu a desemnat un Responsabil cu Protecția Datelor (DPO) întrucât nu se
          încadrează în categoriile prevăzute la art. 37 din GDPR. Pentru orice solicitare legată de protecția datelor,
          vă rugăm să contactați direct societatea la adresa de email indicată mai sus.
        </p>
      </>
    ),
  },
  {
    id: "date-colectate",
    title: "2. Ce Date Colectăm și de Ce",
    content: (
      <>
        <p>
          Colectăm date cu caracter personal în mod direct (furnizate de dvs.) și indirect (generate automat prin
          utilizarea platformei). Mai jos sunt detaliate categoriile de date, scopul și modalitatea de colectare.
        </p>

        <h4 className="font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          2.1. Date colectate prin formularul de contact
        </h4>
        <p>
          Atunci când completați formularul de contact disponibil pe pagina{" "}
          <Link href="/contact" className="text-blue-700 dark:text-blue-400 hover:underline">
            dottotv.ro/contact
          </Link>
          , colectăm:
        </p>
        <div className="mt-3 overflow-x-auto rounded-xl border border-gray-100 dark:border-gray-700">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800 text-left">
                <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Dată</th>
                <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Scop</th>
                <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Obligatoriu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {[
                ["Nume și prenume", "Identificarea expeditorului și personalizarea răspunsului", "Da"],
                ["Adresă de email", "Trimiterea răspunsului la solicitare", "Da"],
                ["Subiect mesaj", "Direcționarea solicitării către departamentul competent", "Da"],
                ["Conținutul mesajului", "Soluționarea solicitării", "Da"],
              ].map(([d, s, o]) => (
                <tr key={d} className="bg-white dark:bg-gray-900">
                  <td className="px-4 py-3 text-gray-800 dark:text-gray-200 font-medium">{d}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{s}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${o === "Da" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"}`}>
                      {o}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h4 className="font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          2.2. Date colectate automat la navigarea pe site
        </h4>
        <p>
          La accesarea platformei, sistemele noastre colectează automat anumite informații tehnice necesare pentru
          funcționarea corectă a site-ului și pentru analiza comportamentului de navigare:
        </p>
        <ul className="mt-3 space-y-1.5 list-disc list-inside text-sm marker:text-blue-600">
          <li>Adresa IP a dispozitivului utilizat pentru accesarea platformei;</li>
          <li>Tipul și versiunea browser-ului web;</li>
          <li>Sistemul de operare al dispozitivului;</li>
          <li>Paginile accesate, ordinea de navigare și timpul petrecut pe fiecare pagină;</li>
          <li>URL-ul de proveniență (site-ul de pe care ați accesat platforma noastră);</li>
          <li>Data și ora accesului;</li>
          <li>Rezoluția ecranului și tipul dispozitivului (desktop, mobil, tabletă);</li>
          <li>Preferințe de limbă ale browser-ului.</li>
        </ul>
        <p className="mt-3">
          Aceste date sunt colectate prin intermediul fișierelor cookie și al serviciului{" "}
          <strong>Google Analytics 4</strong> (detaliat la Secțiunea 7), și nu sunt utilizate pentru identificarea
          directă a persoanelor fizice, ci exclusiv în scop statistic și pentru îmbunătățirea experienței de utilizare.
        </p>

        <h4 className="font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          2.3. Date colectate prin servicii terțe încorporate
        </h4>
        <p>
          Platforma integrează servicii și conținut oferit de terți (Google Maps, YouTube, rețele sociale), care pot
          colecta date despre dvs. conform propriilor politici de confidențialitate. Vă recomandăm să consultați aceste
          politici:
        </p>
        <ul className="mt-3 space-y-1.5 list-disc list-inside text-sm marker:text-gray-400">
          <li>Google LLC — politica de confidențialitate aplicabilă Google Analytics, Google Maps și YouTube;</li>
          <li>Meta Platforms Inc. — politica de confidențialitate aplicabilă Facebook Pixel și butoanelor de distribuire;</li>
          <li>TikTok Inc. — politica de confidențialitate aplicabilă butonului de distribuire TikTok.</li>
        </ul>

        <h4 className="font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          2.4. Date colectate prin newsletter
        </h4>
        <p>
          Dacă vă abonați la newsletter-ul DottoTV, colectăm <strong>adresa dvs. de email</strong> în scopul
          transmiterii de buletine informative periodice cu conținut editorial selectat. Abonarea este voluntară și vă
          puteți dezabona în orice moment prin linkul de dezabonare inclus în fiecare email sau prin trimiterea unei
          solicitări la{" "}
          <a href="mailto:office@dottotv.ro" className="text-blue-700 dark:text-blue-400 hover:underline">
            office@dottotv.ro
          </a>
          . Prelucrarea datelor în scop de newsletter are la bază <strong>consimțământul</strong> explicit al
          abonatului (art. 6 alin. 1 lit. a din GDPR).
        </p>
      </>
    ),
  },
  {
    id: "baza-legala",
    title: "3. Baza Legală pentru Prelucrare",
    content: (
      <>
        <p>
          Prelucrăm datele dvs. cu caracter personal numai atunci când există o bază legală valabilă, în conformitate
          cu art. 6 din GDPR. Tabelul de mai jos prezintă bazele legale utilizate pentru fiecare categorie de
          prelucrare:
        </p>
        <div className="mt-5 space-y-4">
          {[
            {
              activitate: "Răspuns la solicitările trimise prin formularul de contact",
              baza: "Executarea unui contract sau a unor măsuri precontractuale (art. 6 alin. 1 lit. b GDPR) și interesul legitim al operatorului (art. 6 alin. 1 lit. f GDPR)",
              interes: "Asigurarea comunicării cu utilizatorii și soluționarea solicitărilor",
            },
            {
              activitate: "Analiza statistică a traficului (Google Analytics)",
              baza: "Consimțământul utilizatorului (art. 6 alin. 1 lit. a GDPR), exprimat prin acceptarea cookie-urilor de analiză",
              interes: "Îmbunătățirea platformei și a experienței utilizatorilor",
            },
            {
              activitate: "Transmiterea newsletter-ului",
              baza: "Consimțământul explicit al abonatului (art. 6 alin. 1 lit. a GDPR)",
              interes: "Informarea abonaților cu privire la conținutul editorial nou",
            },
            {
              activitate: "Asigurarea securității platformei și prevenirea fraudelor",
              baza: "Interesul legitim al operatorului (art. 6 alin. 1 lit. f GDPR)",
              interes: "Protejarea platformei și a utilizatorilor împotriva accesului neautorizat și a abuzurilor",
            },
            {
              activitate: "Respectarea obligațiilor legale",
              baza: "Obligație legală (art. 6 alin. 1 lit. c GDPR)",
              interes: "Conformarea cu cerințele legislației române și europene aplicabile",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700"
            >
              <p className="font-semibold text-sm text-gray-900 dark:text-white mb-1">{item.activitate}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong className="text-gray-700 dark:text-gray-300">Baza legală:</strong> {item.baza}
              </p>
              {item.interes && (
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  <strong>Interes legitim urmărit:</strong> {item.interes}
                </p>
              )}
            </div>
          ))}
        </div>
        <p className="mt-5">
          Atunci când prelucrarea se bazează pe consimțământul dvs., aveți dreptul de a vă retrage consimțământul în
          orice moment, fără ca aceasta să afecteze legalitatea prelucrării efectuate înainte de retragere.
        </p>
      </>
    ),
  },
  {
    id: "durata-pastrare",
    title: "4. Cât Timp Păstrăm Datele",
    content: (
      <>
        <p>
          Datele cu caracter personal sunt păstrate numai atât timp cât este necesar pentru îndeplinirea scopurilor
          pentru care au fost colectate, cu respectarea termenelor impuse de legislația aplicabilă. La expirarea
          perioadei de retenție, datele sunt șterse sau anonimizate ireversibil.
        </p>
        <div className="mt-5 overflow-x-auto rounded-xl border border-gray-100 dark:border-gray-700">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800 text-left">
                <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Categorie de date</th>
                <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Perioadă de retenție</th>
                <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Justificare</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {[
                ["Date formular de contact", "12 luni de la data primirii solicitării", "Termen rezonabil pentru soluționarea litigiilor conexe"],
                ["Corespondență email", "3 ani de la data ultimului schimb de mesaje", "Prescripție extinctivă generală (Cod Civil)"],
                ["Date newsletter", "Pe durata abonamentului + 30 de zile după dezabonare", "Confirmarea procesării dezabonării"],
                ["Date Google Analytics (anonimizate)", "26 de luni (configurat în GA4)", "Analiză tendințe pe termen mediu"],
                ["Log-uri server (adrese IP)", "90 de zile", "Securitate și investigare incidente"],
                ["Cookie-uri de sesiune", "La închiderea browser-ului", "Funcționare platformă"],
                ["Cookie-uri persistente", "Conform duratei specificate (max. 24 luni)", "Preferințe utilizator"],
              ].map(([cat, per, just]) => (
                <tr key={cat} className="bg-white dark:bg-gray-900">
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">{cat}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{per}</td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-500 text-xs">{just}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4">
          În cazul în care suntem obligați prin lege să păstrăm anumite date pentru o perioadă mai lungă (de ex. în
          cazul unui litigiu sau al unei obligații fiscale), vom respecta termenul legal, după care datele vor fi
          șterse sau anonimizate.
        </p>
      </>
    ),
  },
  {
    id: "destinatari",
    title: "5. Cui Transmitem Datele",
    content: (
      <>
        <p>
          S.C. DOTTO TV MEDIA S.R.L. nu vinde, nu închiriază și nu comercializează datele dvs. cu caracter personal
          către terți. Datele pot fi comunicate sau accesate de următoarele categorii de destinatari, strict în
          limitele necesare îndeplinirii scopurilor descrise în prezenta politică:
        </p>

        <h4 className="font-semibold text-gray-900 dark:text-white mt-5 mb-3">5.1. Furnizori de servicii (persoane împuternicite)</h4>
        <p>
          Colaborăm cu furnizori de servicii care prelucrează date în numele nostru, exclusiv conform instrucțiunilor
          noastre și pe baza unor contracte de prelucrare a datelor (DPA) conforme cu art. 28 din GDPR:
        </p>
        <div className="mt-3 space-y-3">
          {[
            {
              furnizor: "Google LLC (SUA)",
              serviciu: "Google Analytics 4, Google Maps, YouTube",
              transfer: "Transfer către SUA — pe baza Deciziei de Adecvare UE-SUA (Data Privacy Framework) și a Clauzelor Contractuale Standard",
            },
            {
              furnizor: "Furnizor servicii de hosting",
              serviciu: "Găzduire web și baze de date",
              transfer: "Stocare pe servere situate în Uniunea Europeană / Spațiul Economic European",
            },
            {
              furnizor: "Furnizor servicii email marketing",
              serviciu: "Trimitere newsletter (dacă este cazul)",
              transfer: "Conform politicii furnizorului ales, cu garanții adecvate de transfer",
            },
          ].map((item) => (
            <div
              key={item.furnizor}
              className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700"
            >
              <p className="font-semibold text-sm text-gray-900 dark:text-white">{item.furnizor}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                <strong>Serviciu:</strong> {item.serviciu}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
                <strong>Transfer internațional:</strong> {item.transfer}
              </p>
            </div>
          ))}
        </div>

        <h4 className="font-semibold text-gray-900 dark:text-white mt-6 mb-3">5.2. Autorități publice</h4>
        <p>
          Datele cu caracter personal pot fi divulgate autorităților publice competente (Poliție, Parchet, instanțe
          judecătorești, ANSPDCP, ANAF) atunci când suntem obligați prin lege sau în urma unor solicitări legale
          justificate, în limitele și în condițiile prevăzute de legislația aplicabilă.
        </p>

        <h4 className="font-semibold text-gray-900 dark:text-white mt-6 mb-3">5.3. Transferuri internaționale de date</h4>
        <p>
          Unii dintre furnizorii noștri de servicii sunt situați în afara Spațiului Economic European (SEE), în
          principal în Statele Unite ale Americii (Google LLC). Aceste transferuri sunt efectuate cu respectarea
          garanțiilor adecvate prevăzute de Capitolul V din GDPR, respectiv pe baza:
        </p>
        <ul className="mt-3 space-y-1.5 list-disc list-inside text-sm marker:text-blue-600">
          <li>Deciziei de adecvare a Comisiei Europene privind cadrul UE–SUA pentru protecția datelor (Data Privacy Framework);</li>
          <li>Clauzelor Contractuale Standard adoptate de Comisia Europeană (art. 46 alin. 2 lit. c din GDPR).</li>
        </ul>
      </>
    ),
  },
  {
    id: "drepturi",
    title: "6. Drepturile Dvs. Conform GDPR",
    content: (
      <>
        <p>
          În calitate de persoană vizată, beneficiați de toate drepturile prevăzute de Capitolul III din GDPR.
          Aceste drepturi pot fi exercitate oricând, gratuit, prin transmiterea unei solicitări scrise la adresa{" "}
          <a href="mailto:office@dottotv.ro" className="text-blue-700 dark:text-blue-400 hover:underline font-medium">
            office@dottotv.ro
          </a>
          . Vom răspunde solicitărilor în termen de <strong>maximum 30 de zile calendaristice</strong>, cu posibilitatea
          de prelungire cu încă 60 de zile în cazuri complexe, cu notificarea prealabilă a persoanei vizate.
        </p>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              titlu: "Dreptul de acces (art. 15 GDPR)",
              desc: "Aveți dreptul de a obține confirmarea că datele dvs. sunt prelucrate și, dacă da, o copie a datelor prelucrate, împreună cu informații despre scopul prelucrării, destinatari, perioadă de retenție și garanții pentru transferuri internaționale.",
              icon: "🔍",
            },
            {
              titlu: "Dreptul la rectificare (art. 16 GDPR)",
              desc: "Aveți dreptul de a solicita corectarea fără întârziere a datelor inexacte și/sau completarea datelor incomplete care vă privesc.",
              icon: "✏️",
            },
            {
              titlu: "Dreptul la ștergere (art. 17 GDPR)",
              desc: "Aveți dreptul de a solicita ștergerea datelor dvs. atunci când: nu mai sunt necesare scopului pentru care au fost colectate; v-ați retras consimțământul; v-ați opus prelucrării; datele au fost prelucrate ilegal.",
              icon: "🗑️",
            },
            {
              titlu: "Dreptul la restricționare (art. 18 GDPR)",
              desc: "Aveți dreptul de a solicita restricționarea prelucrării datelor dvs. în anumite condiții, de ex. când contestați exactitatea datelor sau când v-ați opus prelucrării și se verifică dacă interesele operatorului prevalează.",
              icon: "⏸️",
            },
            {
              titlu: "Dreptul la portabilitate (art. 20 GDPR)",
              desc: "Aveți dreptul de a primi datele pe care le-ați furnizat, într-un format structurat, utilizat frecvent și care poate fi citit automat (ex. JSON, CSV), și de a le transmite unui alt operator, atunci când prelucrarea se bazează pe consimțământ sau contract și se efectuează prin mijloace automate.",
              icon: "📤",
            },
            {
              titlu: "Dreptul la opoziție (art. 21 GDPR)",
              desc: "Aveți dreptul de a vă opune în orice moment prelucrărilor bazate pe interesul legitim al operatorului, inclusiv creării de profiluri. Vă puteți opune oricând prelucrării în scop de marketing direct, inclusiv profilării legate de marketing.",
              icon: "🚫",
            },
            {
              titlu: "Dreptul de a nu face obiectul unei decizii automate (art. 22 GDPR)",
              desc: "Aveți dreptul de a nu face obiectul unei decizii bazate exclusiv pe prelucrarea automată, inclusiv profilarea, care produce efecte juridice sau vă afectează în mod semnificativ. DottoTV nu utilizează în prezent sisteme de decizie automatizată.",
              icon: "🤖",
            },
            {
              titlu: "Dreptul de a retrage consimțământul",
              desc: "Atunci când prelucrarea se bazează pe consimțământul dvs. (ex. newsletter, cookie-uri de analiză), aveți dreptul de a vă retrage consimțământul în orice moment, fără a afecta legalitatea prelucrării anterioare retragerii.",
              icon: "↩️",
            },
          ].map((drept) => (
            <div
              key={drept.titlu}
              className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5">{drept.icon}</span>
                <div>
                  <p className="font-semibold text-sm text-gray-900 dark:text-white mb-1">{drept.titlu}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{drept.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-5 rounded-xl border-l-4 bg-blue-50 dark:bg-blue-950/20 border-blue-400 dark:border-blue-600">
          <p className="font-semibold text-sm text-blue-900 dark:text-blue-200 mb-2">
            Dreptul de a depune plângere la ANSPDCP
          </p>
          <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
            Dacă considerați că drepturile dvs. au fost încălcate, aveți dreptul de a depune o plângere la{" "}
            <strong>Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP)</strong>:
          </p>
          <ul className="mt-2 text-sm text-blue-700 dark:text-blue-400 space-y-1">
            <li><strong>Adresă:</strong> Bd. G-ral. Gheorghe Magheru nr. 28–30, Sector 1, 010336 București</li>
            <li><strong>Telefon:</strong> +40.318.059.211</li>
            <li>
              <strong>Website:</strong>{" "}
              <span className="font-medium">www.dataprotection.ro</span>
            </li>
            <li>
              <strong>Email:</strong>{" "}
              <span className="font-medium">anspdcp@dataprotection.ro</span>
            </li>
          </ul>
          <p className="text-xs text-blue-600 dark:text-blue-500 mt-2">
            Vă încurajăm să ne contactați în prealabil pentru soluționarea amiabilă a oricărei situații.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "google-analytics",
    title: "7. Google Analytics și Măsurarea Audienței",
    content: (
      <>
        <p>
          Platforma <strong>www.dottotv.ro</strong> utilizează serviciul <strong>Google Analytics 4 (GA4)</strong>,
          furnizat de <strong>Google LLC</strong> (1600 Amphitheatre Parkway, Mountain View, CA 94043, SUA), pentru
          analiza statistică a traficului și a comportamentului utilizatorilor.
        </p>

        <h4 className="font-semibold text-gray-900 dark:text-white mt-5 mb-2">
          Ce date colectează Google Analytics?
        </h4>
        <ul className="space-y-1.5 list-disc list-inside text-sm marker:text-gray-400">
          <li>Date despre sesiunile de navigare (pagini vizitate, durata vizitei, adâncimea de scroll);</li>
          <li>Date tehnice despre dispozitiv (tip dispozitiv, sistem de operare, browser, rezoluție);</li>
          <li>Localizare geografică aproximativă (țară, regiune, oraș — pe baza adresei IP, care este anonimizată);</li>
          <li>Sursa de trafic (motor de căutare, rețea socială, acces direct, link extern);</li>
          <li>Evenimente de interacțiune (click-uri, vizionări video, descărcări);</li>
          <li>Date demografice și de interes (furnizate de Google pe baza activității utilizatorilor în ecosistemul Google — numai cu consimțământ).</li>
        </ul>

        <h4 className="font-semibold text-gray-900 dark:text-white mt-5 mb-2">
          Anonimizarea adresei IP
        </h4>
        <p>
          Google Analytics 4 anonimizează adresele IP implicit, prin trunchiere, astfel încât adresa IP completă nu
          este stocată pe serverele Google. Datele colectate sunt agregate și nu permit identificarea directă a
          utilizatorilor individuali.
        </p>

        <h4 className="font-semibold text-gray-900 dark:text-white mt-5 mb-2">Transfer de date către SUA</h4>
        <p>
          Prin utilizarea Google Analytics, datele de navigare sunt transferate și prelucrate pe servere Google situate
          în SUA. Acest transfer este legal în temeiul{" "}
          <strong>Data Privacy Framework UE–SUA</strong> și al{" "}
          <strong>Clauzelor Contractuale Standard</strong> (Standard Contractual Clauses — SCC) adoptate de Comisia
          Europeană. S.C. DOTTO TV MEDIA S.R.L. a încheiat cu Google LLC un acord de prelucrare a datelor (DPA) în
          conformitate cu art. 28 din GDPR.
        </p>

        <h4 className="font-semibold text-gray-900 dark:text-white mt-5 mb-2">Cum puteți refuza urmărirea?</h4>
        <p>
          Puteți refuza colectarea datelor prin Google Analytics prin oricare dintre următoarele metode:
        </p>
        <ul className="mt-3 space-y-1.5 list-disc list-inside text-sm marker:text-blue-600">
          <li>Refuzând cookie-urile de analiză prin banner-ul de consimțământ afișat la prima vizită;</li>
          <li>Instalând extensia de browser <strong>Google Analytics Opt-out Browser Add-on</strong> (disponibilă pe tools.google.com/dlpage/gaoptout);</li>
          <li>Activând setarea „Do Not Track" (Nu urmări) în browser-ul dvs.;</li>
          <li>Utilizând un browser sau extensie de tip ad-blocker care blochează scripturile de tracking.</li>
        </ul>
        <p className="mt-3">
          Pentru informații complete despre modul în care Google utilizează datele colectate, consultați{" "}
          <strong>Politica de Confidențialitate Google</strong> la adresa{" "}
          <span className="font-medium">policies.google.com/privacy</span>.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "8. Politica de Cookies",
    content: (
      <>
        <p>
          Platforma <strong>www.dottotv.ro</strong> utilizează fișiere cookie și tehnologii similare în conformitate
          cu <strong>Legea nr. 506/2004</strong> privind prelucrarea datelor cu caracter personal în sectorul
          comunicațiilor electronice (astfel cum a fost modificată prin Legea nr. 235/2015) și cu{" "}
          <strong>Directiva 2009/136/CE</strong> (Directiva ePrivacy).
        </p>

        <h4 className="font-semibold text-gray-900 dark:text-white mt-5 mb-3">Tipuri de cookie-uri utilizate</h4>
        <div className="space-y-3">
          {[
            {
              tip: "Cookie-uri strict necesare",
              necesita: "Nu — nu necesită consimțământ",
              culoare: "green",
              desc: "Esențiale pentru funcționarea tehnică a platformei: menținerea sesiunii de navigare, memorarea preferințelor de temă (dark/light mode), setări de securitate (protecție CSRF). Fără acestea, platforma nu poate funcționa corect.",
              exemple: "session_id, theme_preference, csrf_token",
            },
            {
              tip: "Cookie-uri de performanță și analiză",
              necesita: "Da — necesită consimțământ",
              culoare: "blue",
              desc: "Colectează informații despre modul în care utilizatorii interacționează cu platforma. Datele sunt agregate și anonimizate. Utilizăm Google Analytics 4 pentru această categorie.",
              exemple: "_ga, _ga_XXXXXXXX, _gid",
            },
            {
              tip: "Cookie-uri funcționale",
              necesita: "Da — necesită consimțământ",
              culoare: "blue",
              desc: "Permit platformei să memoreze alegerile dvs. (preferințe de conținut, regiune) pentru a oferi funcționalități îmbunătățite și personalizate.",
              exemple: "user_region, content_pref",
            },
            {
              tip: "Cookie-uri de publicitate și marketing",
              necesita: "Da — necesită consimțământ",
              culoare: "orange",
              desc: "Utilizate pentru afișarea de publicitate relevantă și pentru limitarea frecvenței de afișare a anunțurilor. Pot fi plasate de parteneri terți: Google Ads, Facebook Pixel, TikTok Pixel.",
              exemple: "_fbp, _ttp, IDE, test_cookie",
            },
          ].map((cookie) => (
            <div
              key={cookie.tip}
              className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <p className="font-semibold text-sm text-gray-900 dark:text-white">{cookie.tip}</p>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    cookie.culoare === "green"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : cookie.culoare === "orange"
                      ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                      : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                  }`}
                >
                  {cookie.necesita}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{cookie.desc}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5">
                <strong>Exemple:</strong> {cookie.exemple}
              </p>
            </div>
          ))}
        </div>

        <h4 className="font-semibold text-gray-900 dark:text-white mt-6 mb-2">Gestionarea consimțământului</h4>
        <p>
          La prima vizită pe platformă, vi se afișează un banner de consimțământ pentru cookie-uri prin care puteți
          accepta, refuza sau personaliza categoriile de cookie-uri pe care le permiteți. Puteți reveni oricând
          asupra alegerii dvs. accesând setările de cookie-uri ale platformei.
        </p>
        <p className="mt-3">
          Independent de setările din banner, puteți gestiona sau șterge cookie-urile și din browser-ul dvs.
          Instrucțiuni detaliate sunt disponibile în documentația fiecărui browser:
        </p>
        <ul className="mt-2 space-y-1 list-disc list-inside text-sm marker:text-gray-400">
          <li>Google Chrome: Setări → Confidențialitate și securitate → Cookie-uri</li>
          <li>Mozilla Firefox: Setări → Confidențialitate și securitate → Cookie-uri și date de site</li>
          <li>Microsoft Edge: Setări → Cookie-uri și permisiuni de site</li>
          <li>Apple Safari: Preferințe → Confidențialitate → Gestionare date de site</li>
        </ul>
      </>
    ),
  },
  {
    id: "securitate",
    title: "9. Securitatea Datelor",
    content: (
      <>
        <p>
          S.C. DOTTO TV MEDIA S.R.L. implementează măsuri tehnice și organizatorice adecvate pentru protejarea datelor
          cu caracter personal împotriva distrugerii accidentale sau ilegale, pierderii, modificării, divulgării
          neautorizate sau accesului neautorizat, în conformitate cu art. 32 din GDPR. Printre măsurile implementate se
          numără:
        </p>
        <ul className="mt-4 space-y-1.5 list-disc list-inside text-sm marker:text-blue-600">
          <li>Criptarea traficului prin protocol <strong>HTTPS/TLS</strong> (certificat SSL activ);</li>
          <li>Accesul restricționat la datele cu caracter personal, bazat pe principiul necesității (need-to-know);</li>
          <li>Utilizarea unor parole complexe și autentificare în doi pași pentru accesul la sisteme;</li>
          <li>Actualizarea periodică a software-ului și a componentelor de securitate;</li>
          <li>Monitorizarea continuă a platformei pentru detectarea activităților anormale sau tentativelor de acces neautorizat;</li>
          <li>Efectuarea periodică de copii de siguranță (backup) ale datelor;</li>
          <li>Contracte de prelucrare a datelor (DPA) cu toți furnizorii terți care au acces la datele dvs.</li>
        </ul>
        <p className="mt-4">
          În eventualitatea unui incident de securitate (breșă de date) care prezintă un risc pentru drepturile și
          libertățile persoanelor fizice, vom notifica <strong>ANSPDCP în termen de 72 de ore</strong> de la luarea la
          cunoștință a incidentului, în conformitate cu art. 33 din GDPR. Atunci când incidentul prezintă un risc
          ridicat pentru persoanele vizate, acestea vor fi notificate individual, conform art. 34 din GDPR.
        </p>
      </>
    ),
  },
  {
    id: "minori",
    title: "10. Protecția Datelor Minorilor",
    content: (
      <>
        <p>
          Platforma <strong>www.dottotv.ro</strong> este destinată utilizatorilor cu vârsta de cel puțin{" "}
          <strong>16 ani</strong>. Nu colectăm în mod intenționat date cu caracter personal de la persoane cu vârsta
          sub 16 ani fără consimțământul părintelui sau al tutorelui legal, în conformitate cu art. 8 din GDPR și cu
          Legea nr. 190/2018.
        </p>
        <p className="mt-3">
          Dacă aveți cunoștință că un minor cu vârsta sub 16 ani ne-a furnizat date cu caracter personal fără acordul
          unui adult responsabil, vă rugăm să ne contactați la{" "}
          <a href="mailto:office@dottotv.ro" className="text-blue-700 dark:text-blue-400 hover:underline font-medium">
            office@dottotv.ro
          </a>{" "}
          pentru a proceda la ștergerea imediată a acelor date.
        </p>
      </>
    ),
  },
  {
    id: "modificari",
    title: "11. Modificarea Politicii de Confidențialitate",
    content: (
      <>
        <p>
          S.C. DOTTO TV MEDIA S.R.L. își rezervă dreptul de a actualiza și modifica prezenta Politică de
          Confidențialitate ori de câte ori este necesar, pentru a reflecta modificările legislative, schimbările în
          practicile de prelucrare a datelor sau pentru a răspunde cerințelor autorităților de supraveghere.
        </p>
        <p className="mt-3">
          Versiunea actualizată va fi publicată pe această pagină, cu indicarea datei ultimei modificări în antetul
          documentului. Modificările de fond vor fi comunicate, acolo unde este posibil, prin afișarea unui banner
          informativ pe platformă sau prin email (pentru abonații la newsletter).
        </p>
        <p className="mt-3">
          Continuarea utilizării platformei <strong>www.dottotv.ro</strong> după publicarea modificărilor constituie
          acceptarea tacită a noii versiuni a Politicii de Confidențialitate. Dacă nu sunteți de acord cu modificările,
          vă rugăm să încetați utilizarea platformei și să solicitați ștergerea datelor dvs.
        </p>
      </>
    ),
  },
  {
    id: "contact-dpo",
    title: "12. Contact pentru Protecția Datelor",
    content: (
      <>
        <p>
          Pentru exercitarea drepturilor dvs. prevăzute de GDPR sau pentru orice întrebare, nelămurire sau sesizare
          legată de prelucrarea datelor dvs. cu caracter personal, ne puteți contacta prin:
        </p>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Email protecția datelor", value: "office@dottotv.ro", href: "mailto:office@dottotv.ro" },
            { label: "Email redacție", value: "redactie@dottotv.ro", href: "mailto:redactie@dottotv.ro" },
            { label: "Adresă corespondență", value: "Bd. Aurel Vlaicu nr. 144, etaj 1, Constanța" },
            { label: "Formular de contact", value: "dottotv.ro/contact", href: "/contact" },
          ].map((item) => (
            <div
              key={item.label}
              className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                {item.label}
              </p>
              {item.href ? (
                <a href={item.href} className="text-sm font-medium text-blue-700 dark:text-blue-400 hover:underline">
                  {item.value}
                </a>
              ) : (
                <p className="text-sm font-medium text-gray-900 dark:text-white">{item.value}</p>
              )}
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm text-gray-500 dark:text-gray-400">
          Răspundem la solicitările privind protecția datelor în termen de maximum{" "}
          <strong>30 de zile calendaristice</strong> de la primire, în conformitate cu art. 12 alin. 3 din GDPR.
          Serviciul este gratuit. Dacă solicitările sunt vădit nefondate sau excesive, ne rezervăm dreptul de a
          percepe o taxă administrativă rezonabilă sau de a refuza să le dăm curs, justificând decizia.
        </p>
      </>
    ),
  },
];

export default function PoliticaConfidentialitatePage() {
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
            Politică de Confidențialitate
          </h1>
          <p className="text-blue-100 text-base max-w-2xl mx-auto leading-relaxed">
            Protecția datelor dvs. cu caracter personal reprezintă o prioritate pentru S.C. DOTTO TV MEDIA S.R.L.
            Această politică explică transparent cum colectăm, utilizăm și protejăm informațiile dvs.
          </p>
          <p className="text-blue-300 text-sm mt-4">Ultima actualizare: {lastUpdated} · Conformă cu GDPR (UE) 2016/679</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Sidebar TOC */}
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
                <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <p className="text-xs text-gray-400 dark:text-gray-600 leading-relaxed">
                    Conformă cu GDPR, Legea nr. 190/2018 și Legea nr. 506/2004.
                  </p>
                </div>
              </div>
            </aside>

            {/* Main */}
            <main className="flex-1 min-w-0">

              {/* GDPR badge */}
              <div className="mb-8 p-5 rounded-2xl bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50 flex gap-4 items-start">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: ACCENT }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-sm text-blue-900 dark:text-blue-200 mb-1">
                    Angajamentul nostru față de confidențialitate
                  </p>
                  <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
                    Nu vindem, nu închiriem și nu comercializăm datele dvs. cu terții. Colectăm exclusiv datele
                    necesare funcționării platformei și le prelucrăm cu respectarea deplină a drepturilor dvs. în
                    temeiul Regulamentului General privind Protecția Datelor (GDPR).
                  </p>
                </div>
              </div>

              {/* Sections */}
              <div className="space-y-8">
                {sections.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 scroll-mt-28"
                  >
                    <h2 className="font-playfair text-xl font-bold text-gray-900 dark:text-white mb-5 pb-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
                      <span
                        className="w-1 h-6 rounded-full flex-shrink-0 inline-block"
                        style={{ backgroundColor: ACCENT }}
                      />
                      {section.title}
                    </h2>
                    <div className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed space-y-3">
                      {section.content}
                    </div>
                  </section>
                ))}
              </div>

              {/* Footer note */}
              <div className="mt-8 p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  © {new Date().getFullYear()} S.C. DOTTO TV MEDIA S.R.L. — CUI 46123400 — Constanța, România
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">
                  Ultima actualizare: {lastUpdated} · Conformă cu Regulamentul (UE) 2016/679 (GDPR)
                </p>
                <div className="flex flex-wrap justify-center gap-6 mt-4">
                  <Link href="/contact" className="text-sm hover:underline" style={{ color: ACCENT }}>Contact</Link>
                  <Link href="/termeni-si-conditii" className="text-sm hover:underline" style={{ color: ACCENT }}>Termeni și Condiții</Link>
                  <Link href="/" className="text-sm hover:underline" style={{ color: ACCENT }}>Acasă</Link>
                </div>
              </div>

            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
