import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Termeni și Condiții",
  description: "Termenii și condițiile de utilizare a platformei DottoTV, operată de S.C. DOTTO TV MEDIA SRL, CUI 46123400, Constanța.",
  alternates: { canonical: `${SITE_URL}/termeni-si-conditii` },
  openGraph: {
    siteName: "DOTTO TV",
    title: "Termeni și Condiții | DOTTO TV",
    description: "Termenii și condițiile de utilizare a platformei DottoTV, operată de S.C. DOTTO TV MEDIA SRL, Constanța.",
    url: `${SITE_URL}/termeni-si-conditii`,
    type: "website",
    locale: "ro_RO",
    images: [{ url: `${SITE_URL}/images/og-default.jpg`, width: 1200, height: 630, alt: "DOTTO TV – Termeni și Condiții" }],
  },
  twitter: {
    card: "summary",
    site: "@dottotv",
    title: "Termeni și Condiții | DOTTO TV",
    description: "Termenii și condițiile de utilizare a platformei DottoTV.",
  },
};

const ACCENT = "#1565C0";

const sections = [
  {
    id: "operator",
    title: "1. Date despre Operator",
    content: (
      <>
        <p>
          Prezentul site web, disponibil la adresa <strong>www.dottotv.ro</strong>, este operat de:
        </p>
        <div className="my-5 p-5 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 space-y-1.5 text-sm">
          <p><strong>Denumire:</strong> S.C. DOTTO TV MEDIA S.R.L.</p>
          <p><strong>Cod Unic de Înregistrare (CUI):</strong> 46123400</p>
          <p><strong>Formă juridică:</strong> Societate cu Răspundere Limitată</p>
          <p><strong>Sediul social:</strong> Bd. Aurel Vlaicu nr. 144, etaj 1, Constanța, județul Constanța, România</p>
          <p><strong>Email juridic:</strong> <a href="mailto:office@dottotv.ro" className="text-blue-700 dark:text-blue-400 hover:underline">office@dottotv.ro</a></p>
          <p><strong>Email redacție:</strong> <a href="mailto:redactie@dottotv.ro" className="text-blue-700 dark:text-blue-400 hover:underline">redactie@dottotv.ro</a></p>
        </div>
        <p>
          S.C. DOTTO TV MEDIA S.R.L. este înregistrată la Registrul Comerțului și funcționează în conformitate cu legislația română în vigoare, inclusiv Legea nr. 31/1990 privind societățile comerciale, cu modificările și completările ulterioare.
        </p>
      </>
    ),
  },
  {
    id: "obiect",
    title: "2. Obiectul de Activitate",
    content: (
      <>
        <p>
          S.C. DOTTO TV MEDIA S.R.L. desfășoară activități de producție și difuzare de conținut audiovizual, jurnalism online și televiziune digitală, cu sediul în Constanța, județul Constanța. Principalele activități includ:
        </p>
        <ul className="mt-4 space-y-2 list-none">
          {[
            "Producție, editare și publicare de conținut editorial și jurnalistic de știri locale, regionale și naționale;",
            "Difuzare de conținut audiovizual în regim LIVE și la cerere (on-demand) prin intermediul platformei online dottotv.ro;",
            "Activități de informare și comunicare publică prin mijloace electronice;",
            "Producție de reportaje, interviuri, emisiuni și materiale multimedia;",
            "Activități de publicitate și marketing digital în scopul finanțării activității redacționale;",
            "Orice alte activități conexe și complementare celor enumerate mai sus, permise de legislația română în vigoare.",
          ].map((item, i) => (
            <li key={i} className="flex gap-3 text-sm">
              <span className="mt-0.5 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: ACCENT }}>{i + 1}</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4">
          Platforma dottotv.ro constituie principalul canal de distribuție a conținutului editorial produs de societate și reprezintă o publicație online în înțelesul Legii nr. 8/1996 privind dreptul de autor și drepturile conexe, cu modificările și completările ulterioare.
        </p>
      </>
    ),
  },
  {
    id: "drepturi-autor",
    title: "3. Drepturi de Autor și Proprietate Intelectuală",
    content: (
      <>
        <p>
          Întregul conținut publicat pe platforma <strong>www.dottotv.ro</strong> — incluzând, dar fără a se limita la: articole, știri, reportaje, fotografii, imagini, videoclipuri, transmisii LIVE, grafice, logouri, denumiri comerciale, elemente de design, cod sursă și baze de date — constituie proprietatea exclusivă a S.C. DOTTO TV MEDIA S.R.L. sau a furnizorilor de conținut cu care societatea a încheiat acorduri de licențiere și este protejat în temeiul:
        </p>
        <ul className="mt-4 mb-4 space-y-1.5 list-disc list-inside text-sm marker:text-blue-600">
          <li>Legii nr. 8/1996 privind dreptul de autor și drepturile conexe, cu modificările și completările ulterioare;</li>
          <li>Directivei (UE) 2019/790 privind dreptul de autor și drepturile conexe pe piața digitală unică;</li>
          <li>Regulamentului (UE) nr. 1257/2012 și a altor reglementări europene aplicabile;</li>
          <li>Convențiilor internaționale la care România este parte (Convenția de la Berna, Convenția de la Roma etc.).</li>
        </ul>
        <p>
          <strong>Este strict interzis</strong>, fără acordul prealabil scris al S.C. DOTTO TV MEDIA S.R.L.:
        </p>
        <ul className="mt-3 mb-4 space-y-1.5 list-disc list-inside text-sm marker:text-red-500">
          <li>Reproducerea, copierea, distribuirea sau transmiterea oricărui conținut în scop comercial;</li>
          <li>Modificarea, adaptarea sau crearea de opere derivate din conținutul publicat;</li>
          <li>Descărcarea sistematică a conținutului în scopul constituirii unor baze de date concurente;</li>
          <li>Utilizarea conținutului în scopuri care ar putea aduce prejudicii de imagine societății sau autorilor;</li>
          <li>Publicarea, republica sau redistribuirea conținutului pe alte platforme fără mențiunea sursei și link activ către articolul original.</li>
        </ul>
        <p>
          Se permite citarea de scurte extrase din conținutul editorial, cu condiția menționării exprese a sursei (<em>„Sursa: DottoTV — www.dottotv.ro"</em>) și inserării unui link activ (hyperlink) către pagina originală. Citarea nu poate depăși 20% din conținutul articolului original.
        </p>
        <p className="mt-3">
          Orice încălcare a drepturilor de proprietate intelectuală va fi urmărită în conformitate cu legislația română și europeană în vigoare, inclusiv prin acțiuni civile și penale.
        </p>
      </>
    ),
  },
  {
    id: "conditii-utilizare",
    title: "4. Condiții de Utilizare a Site-ului",
    content: (
      <>
        <p>
          Accesarea și utilizarea platformei <strong>www.dottotv.ro</strong> sunt supuse respectării integrale a prezentelor Termeni și Condiții. Prin simpla accesare a site-ului, utilizatorul declară că a citit, înțeles și acceptat în totalitate prezentele condiții.
        </p>
        <h4 className="font-semibold text-gray-900 dark:text-white mt-5 mb-2">4.1. Utilizare permisă</h4>
        <p>Utilizatorii au dreptul să:</p>
        <ul className="mt-2 mb-4 space-y-1.5 list-disc list-inside text-sm marker:text-green-600">
          <li>Acceseze și navigheze pe platformă în scop personal, necomercial;</li>
          <li>Vizualizeze conținutul editorial publicat, inclusiv transmisiunile LIVE;</li>
          <li>Distribuie linkuri (URL-uri) ale articolelor pe rețelele de socializare sau prin alte mijloace;</li>
          <li>Citeze extrase conform condițiilor prevăzute la Secțiunea 3.</li>
        </ul>
        <h4 className="font-semibold text-gray-900 dark:text-white mt-5 mb-2">4.2. Utilizare interzisă</h4>
        <p>Este interzisă utilizarea platformei în scopuri care:</p>
        <ul className="mt-2 mb-4 space-y-1.5 list-disc list-inside text-sm marker:text-red-500">
          <li>Încalcă orice prevedere legală aplicabilă în România sau Uniunea Europeană;</li>
          <li>Sunt frauduloase sau au potențialul de a produce prejudicii altor persoane;</li>
          <li>Implică transmiterea de materiale nesolicitate cu caracter publicitar (spam);</li>
          <li>Perturbă, deteriorează sau afectează funcționalitatea platformei sau a infrastructurii tehnice;</li>
          <li>Implică accesul neautorizat la sisteme informatice, date sau conturi ale altor utilizatori;</li>
          <li>Implică colectarea automată de date (scraping, crawling) fără acordul prealabil scris al operatorului;</li>
          <li>Presupun utilizarea unor sisteme automatizate (boți, scripturi) pentru accesarea platformei în mod abuziv.</li>
        </ul>
        <h4 className="font-semibold text-gray-900 dark:text-white mt-5 mb-2">4.3. Conținut generat de utilizatori</h4>
        <p>
          În măsura în care platforma permite comentarii sau alte forme de conținut generat de utilizatori, aceștia sunt exclusiv responsabili pentru conținutul publicat. S.C. DOTTO TV MEDIA S.R.L. își rezervă dreptul de a modera, edita sau șterge orice conținut care încalcă prezentele condiții, bunele moravuri sau legislația în vigoare, fără obligația de a justifica această decizie.
        </p>
        <p className="mt-3">
          Prin publicarea unui comentariu sau alt conținut pe platformă, utilizatorul acordă S.C. DOTTO TV MEDIA S.R.L. o licență neexclusivă, gratuită, transferabilă, de a utiliza acel conținut în orice scop editorial legitim.
        </p>
      </>
    ),
  },
  {
    id: "raspundere",
    title: "5. Limitarea Răspunderii",
    content: (
      <>
        <p>
          S.C. DOTTO TV MEDIA S.R.L. depune toate eforturile rezonabile pentru a asigura acuratețea, actualitatea și completitudinea informațiilor publicate pe platforma <strong>www.dottotv.ro</strong>. Cu toate acestea, operatorul <strong>nu garantează</strong> și <strong>nu răspunde</strong> pentru:
        </p>
        <ul className="mt-4 mb-4 space-y-2 list-disc list-inside text-sm marker:text-gray-400">
          <li>Eventualele erori, omisiuni sau inexactități în conținutul publicat, indiferent de cauza acestora;</li>
          <li>Întreruperile, defecțiunile tehnice sau indisponibilitatea temporară a platformei, indiferent de cauza acestora;</li>
          <li>Orice prejudicii directe, indirecte, incidentale sau consecvente rezultate din utilizarea sau incapacitatea de utilizare a platformei;</li>
          <li>Conținutul site-urilor terțe accesate prin linkuri publicate pe platformă — operatorul nu controlează și nu este responsabil pentru conținutul acestora;</li>
          <li>Virușii informatici sau alte componente dăunătoare care pot afecta echipamentele utilizatorilor ca urmare a accesării platformei, în condițiile în care operatorul a luat măsuri rezonabile de securitate;</li>
          <li>Pierderile sau daunele cauzate de utilizarea necorespunzătoare a platformei sau de nerespectarea prezentelor Termeni și Condiții;</li>
          <li>Declarațiile, opiniile și pozițiile exprimate în materialele cu caracter de opinie sau editorial — acestea reprezintă exclusiv punctul de vedere al autorilor.</li>
        </ul>
        <p>
          Operatorul nu poate fi ținut responsabil pentru nicio pierdere sau daună care rezultă din încrederea acordată conținutului publicat. Utilizatorii sunt sfătuiți să verifice informațiile de importanță majoră din surse oficiale înainte de a lua decizii bazate pe acestea.
        </p>
        <p className="mt-3">
          În nicio circumstanță răspunderea S.C. DOTTO TV MEDIA S.R.L. față de un utilizator nu va depăși suma de 0 (zero) lei, în măsura permisă de legislația română aplicabilă.
        </p>
      </>
    ),
  },
  {
    id: "drepturi-utilizatori",
    title: "6. Drepturile Utilizatorilor",
    content: (
      <>
        <p>
          În calitate de utilizatori ai platformei <strong>www.dottotv.ro</strong>, beneficiați de următoarele drepturi garantate de legislația română și europeană:
        </p>
        <h4 className="font-semibold text-gray-900 dark:text-white mt-5 mb-2">6.1. Drepturi în calitate de consumator</h4>
        <p>
          În măsura în care utilizarea platformei implică o relație de consum (în sensul OG nr. 21/1992 privind protecția consumatorilor, republicată), utilizatorii beneficiază de toate drepturile prevăzute de legislația privind protecția consumatorilor, inclusiv dreptul la informare corectă și completă.
        </p>
        <h4 className="font-semibold text-gray-900 dark:text-white mt-5 mb-2">6.2. Drepturi privind datele cu caracter personal</h4>
        <p>
          Conform Regulamentului (UE) 2016/679 (GDPR) și Legii nr. 190/2018 privind măsurile de punere în aplicare a GDPR, utilizatorii ale căror date personale sunt prelucrate de S.C. DOTTO TV MEDIA S.R.L. beneficiază de:
        </p>
        <ul className="mt-3 mb-4 space-y-1.5 list-disc list-inside text-sm marker:text-blue-600">
          <li><strong>Dreptul de acces</strong> — de a obține confirmarea că datele dvs. sunt prelucrate și o copie a acestora;</li>
          <li><strong>Dreptul la rectificare</strong> — de a solicita corectarea datelor inexacte sau incomplete;</li>
          <li><strong>Dreptul la ștergere</strong> („dreptul de a fi uitat") — de a solicita ștergerea datelor în condițiile prevăzute de GDPR;</li>
          <li><strong>Dreptul la restricționarea prelucrării</strong> — în condițiile art. 18 din GDPR;</li>
          <li><strong>Dreptul la portabilitatea datelor</strong> — de a primi datele într-un format structurat, uzual și care poate fi citit automat;</li>
          <li><strong>Dreptul la opoziție</strong> — de a vă opune prelucrării datelor în anumite circumstanțe;</li>
          <li><strong>Dreptul de a nu face obiectul unei decizii automate</strong> — inclusiv crearea de profiluri.</li>
        </ul>
        <p>
          Pentru exercitarea acestor drepturi, vă rugăm să ne contactați la adresa de email <a href="mailto:office@dottotv.ro" className="text-blue-700 dark:text-blue-400 hover:underline font-medium">office@dottotv.ro</a>. Veți primi un răspuns în termen de maximum 30 de zile calendaristice de la primirea solicitării.
        </p>
        <p className="mt-3">
          Aveți dreptul de a depune o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP), cu sediul în Bd. G-ral. Gheorghe Magheru nr. 28-30, sector 1, București, website: <span className="font-medium">www.dataprotection.ro</span>.
        </p>
        <h4 className="font-semibold text-gray-900 dark:text-white mt-5 mb-2">6.3. Dreptul la informare audiovizuală</h4>
        <p>
          Utilizatorii au dreptul de a accesa informații corecte, echilibrate și verificate, în conformitate cu standardele deontologice jurnalistice și cu prevederile Legii audiovizualului nr. 504/2002, cu modificările și completările ulterioare. Conținutul editorial publicat de DottoTV respectă principiile libertății de exprimare garantate de art. 30 din Constituția României și de art. 10 din Convenția Europeană a Drepturilor Omului.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "7. Politica privind Cookie-urile",
    content: (
      <>
        <p>
          Platforma <strong>www.dottotv.ro</strong> utilizează fișiere de tip cookie și tehnologii similare (pixel tags, web beacons, local storage) în conformitate cu Legea nr. 506/2004 privind prelucrarea datelor cu caracter personal și protecția vieții private în sectorul comunicațiilor electronice, cu modificările aduse prin Legea nr. 235/2015, și cu Directiva 2009/136/CE (Directiva e-Privacy).
        </p>
        <h4 className="font-semibold text-gray-900 dark:text-white mt-5 mb-2">7.1. Ce sunt cookie-urile?</h4>
        <p>
          Cookie-urile sunt fișiere text de mici dimensiuni pe care un site web le stochează pe dispozitivul dvs. (calculator, tabletă, telefon mobil) atunci când accesați platforma. Acestea permit site-ului să vă recunoască la vizitele ulterioare și să memoreze anumite preferințe.
        </p>
        <h4 className="font-semibold text-gray-900 dark:text-white mt-5 mb-2">7.2. Tipuri de cookie-uri utilizate</h4>
        <div className="mt-3 space-y-3">
          {[
            { tip: "Cookie-uri strict necesare", desc: "Indispensabile pentru funcționarea corectă a platformei (autentificare, preferințe de sesiune, setări de securitate). Nu pot fi dezactivate fără a afecta funcționalitatea site-ului." },
            { tip: "Cookie-uri de performanță și analiză", desc: "Colectează informații anonime despre modul în care utilizatorii interacționează cu platforma (pagini vizitate, timp petrecut, erori întâlnite). Utilizăm instrumente precum Google Analytics în acest scop." },
            { tip: "Cookie-uri funcționale", desc: "Memorează preferințele dvs. (limbă, temă, regiune) pentru a vă oferi o experiență personalizată." },
            { tip: "Cookie-uri de publicitate și targeting", desc: "Utilizate pentru a vă afișa publicitate relevantă, atât pe platforma noastră, cât și pe alte site-uri. Pot fi plasate de parteneri terți (Google Ads, Facebook Pixel etc.)." },
          ].map((c) => (
            <div key={c.tip} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
              <p className="font-semibold text-sm text-gray-900 dark:text-white mb-1">{c.tip}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{c.desc}</p>
            </div>
          ))}
        </div>
        <h4 className="font-semibold text-gray-900 dark:text-white mt-5 mb-2">7.3. Gestionarea cookie-urilor</h4>
        <p>
          Prin continuarea navigării pe platformă fără modificarea setărilor browser-ului, vă exprimați consimțământul pentru utilizarea cookie-urilor descrise mai sus. Puteți gestiona sau dezactiva cookie-urile prin setările browser-ului dvs. Rețineți că dezactivarea anumitor cookie-uri poate afecta funcționalitatea și experiența de utilizare a platformei.
        </p>
        <p className="mt-3">
          Pentru detalii complete privind prelucrarea datelor cu caracter personal, vă rugăm să consultați <Link href="/politica-de-confidentialitate" className="text-blue-700 dark:text-blue-400 hover:underline font-medium">Politica de Confidențialitate</Link>.
        </p>
      </>
    ),
  },
  {
    id: "disponibilitate",
    title: "8. Disponibilitatea Platformei",
    content: (
      <>
        <p>
          S.C. DOTTO TV MEDIA S.R.L. depune eforturi rezonabile pentru a asigura disponibilitatea platformei <strong>www.dottotv.ro</strong> în mod continuu. Cu toate acestea, operatorul nu garantează accesibilitatea neîntreruptă a platformei și nu poate fi ținut răspunzător pentru:
        </p>
        <ul className="mt-4 mb-4 space-y-1.5 list-disc list-inside text-sm marker:text-gray-400">
          <li>Întreruperi temporare cauzate de lucrări de mentenanță programată sau neprogramată;</li>
          <li>Defecțiuni ale infrastructurii de telecomunicații sau ale furnizorilor de servicii de hosting;</li>
          <li>Atacuri informatice (DDoS, hacking) sau alte evenimente de securitate;</li>
          <li>Circumstanțe de forță majoră sau cazuri fortuite, în sensul Codului Civil Român.</li>
        </ul>
        <p>
          Operatorul își rezervă dreptul de a suspenda temporar sau definitiv accesul la platformă sau la anumite funcționalități ale acesteia, pentru motive tehnice, juridice sau editoriale, fără obligația de a notifica în prealabil utilizatorii.
        </p>
      </>
    ),
  },
  {
    id: "linkuri-externe",
    title: "9. Linkuri către Site-uri Terțe",
    content: (
      <>
        <p>
          Platforma <strong>www.dottotv.ro</strong> poate conține linkuri către site-uri web operate de terți. Aceste linkuri sunt furnizate exclusiv pentru informarea utilizatorilor și nu reprezintă o endorsare sau o asumare a responsabilității de către S.C. DOTTO TV MEDIA S.R.L. pentru conținutul, politicile de confidențialitate sau practicile site-urilor respective.
        </p>
        <p className="mt-3">
          S.C. DOTTO TV MEDIA S.R.L. nu exercită niciun control asupra conținutului site-urilor terțe și nu poate fi ținută responsabilă pentru daunele sau prejudiciile rezultate din accesarea acestora. Utilizatorii accesează site-urile terțe pe propria răspundere și sunt sfătuiți să consulte termenii și condițiile acestora înainte de utilizare.
        </p>
      </>
    ),
  },
  {
    id: "modificari",
    title: "10. Modificarea Termenilor și Condițiilor",
    content: (
      <>
        <p>
          S.C. DOTTO TV MEDIA S.R.L. își rezervă dreptul de a modifica, actualiza sau completa prezentele Termeni și Condiții în orice moment, fără notificare prealabilă, cu excepția cazurilor în care legea impune altfel.
        </p>
        <p className="mt-3">
          Modificările vor intra în vigoare la data publicării versiunii actualizate pe platformă. Data ultimei actualizări va fi indicată în antetul documentului. Continuarea utilizării platformei după publicarea modificărilor constituie acceptarea tacită a noii versiuni a Termenilor și Condițiilor.
        </p>
        <p className="mt-3">
          Utilizatorii sunt încurajați să verifice periodic această pagină pentru a fi la curent cu eventualele modificări. În cazul în care nu sunteți de acord cu noii termeni, aveți obligația de a înceta utilizarea platformei.
        </p>
        <p className="mt-3">
          S.C. DOTTO TV MEDIA S.R.L. poate, de asemenea, modifica sau întrerupe (temporar sau permanent) orice aspect al platformei fără notificare prealabilă.
        </p>
      </>
    ),
  },
  {
    id: "legislatie",
    title: "11. Legislație Aplicabilă și Jurisdicție",
    content: (
      <>
        <p>
          Prezentele Termeni și Condiții sunt guvernate, interpretate și aplicate în conformitate cu <strong>legislația română în vigoare</strong>, inclusiv, dar fără a se limita la:
        </p>
        <ul className="mt-4 mb-4 space-y-1.5 list-disc list-inside text-sm marker:text-blue-600">
          <li>Codul Civil al României (Legea nr. 287/2009, republicată);</li>
          <li>Legea nr. 365/2002 privind comerțul electronic, cu modificările și completările ulterioare;</li>
          <li>Legea nr. 8/1996 privind dreptul de autor și drepturile conexe;</li>
          <li>Legea nr. 506/2004 privind prelucrarea datelor cu caracter personal în sectorul comunicațiilor electronice;</li>
          <li>Legea nr. 190/2018 privind măsurile de punere în aplicare a Regulamentului (UE) 2016/679 (GDPR);</li>
          <li>Legea audiovizualului nr. 504/2002, cu modificările și completările ulterioare;</li>
          <li>OG nr. 21/1992 privind protecția consumatorilor, republicată;</li>
          <li>Directivele și regulamentele Uniunii Europene aplicabile, cu efect direct în ordinea juridică română.</li>
        </ul>
        <p>
          Orice litigiu izvorât din sau în legătură cu prezentele Termeni și Condiții, inclusiv cele privind interpretarea, validitatea, executarea sau rezilierea acestora, va fi supus spre soluționare instanțelor judecătorești competente din <strong>municipiul Constanța, România</strong>.
        </p>
        <p className="mt-3">
          Înainte de a recurge la instanța de judecată, părțile se angajează să încerce soluționarea amiabilă a litigiului, prin negociere directă, în termen de 30 de zile calendaristice de la notificarea scrisă a celeilalte părți.
        </p>
        <p className="mt-3">
          Consumatorii din Uniunea Europeană au, de asemenea, posibilitatea de a recurge la platforma europeană de soluționare online a litigiilor (SOL), accesibilă la adresa: <span className="font-medium">ec.europa.eu/consumers/odr</span>.
        </p>
      </>
    ),
  },
  {
    id: "contact-juridic",
    title: "12. Contact Juridic",
    content: (
      <>
        <p>
          Pentru orice întrebări, sesizări sau solicitări legate de prezentele Termeni și Condiții, de drepturile dvs. legale sau de activitatea platformei <strong>www.dottotv.ro</strong>, ne puteți contacta prin:
        </p>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Email juridic", value: "office@dottotv.ro", href: "mailto:office@dottotv.ro" },
            { label: "Email redacție", value: "redactie@dottotv.ro", href: "mailto:redactie@dottotv.ro" },
            { label: "Adresă corespondență", value: "Bd. Aurel Vlaicu nr. 144, etaj 1, Constanța" },
            { label: "Pagina de contact", value: "dottotv.ro/contact", href: "/contact" },
          ].map((item) => (
            <div key={item.label} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">{item.label}</p>
              {item.href ? (
                <a
                  href={item.href}
                  className="text-sm font-medium text-blue-700 dark:text-blue-400 hover:underline"
                  {...(item.href.startsWith("mailto") ? {} : {})}
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-sm font-medium text-gray-900 dark:text-white">{item.value}</p>
              )}
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm text-gray-500 dark:text-gray-400">
          Solicitările vor fi soluționate în termen de maximum <strong>30 de zile calendaristice</strong> de la primire. Pentru urgențe juridice, vă rugăm să menționați caracterul urgent în subiectul email-ului.
        </p>
      </>
    ),
  },
];

export default function TermeniPage() {
  const lastUpdated = "8 aprilie 2026";

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
            Termeni și Condiții
          </h1>
          <p className="text-blue-100 text-base max-w-2xl mx-auto leading-relaxed">
            Vă rugăm să citiți cu atenție prezentele Termeni și Condiții înainte de a utiliza platforma <strong>www.dottotv.ro</strong>.
            Accesarea site-ului implică acceptarea integrală a acestora.
          </p>
          <p className="text-blue-300 text-sm mt-4">Ultima actualizare: {lastUpdated}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Sidebar — Table of contents */}
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
              </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 min-w-0">

              {/* Notice banner */}
              <div className="mb-8 p-5 rounded-2xl border-l-4 bg-amber-50 dark:bg-amber-950/20 border-amber-400 dark:border-amber-600">
                <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
                  <strong>Important:</strong> Prezentele Termeni și Condiții constituie un acord juridic obligatoriu între dvs. și S.C. DOTTO TV MEDIA S.R.L. Dacă nu sunteți de acord cu acești termeni, vă rugăm să nu utilizați platforma <strong>www.dottotv.ro</strong>.
                </p>
              </div>

              {/* Sections */}
              <div className="space-y-8">
                {sections.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 scroll-mt-28"
                  >
                    <h2
                      className="font-playfair text-xl font-bold text-gray-900 dark:text-white mb-5 pb-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3"
                    >
                      <span
                        className="w-1 h-6 rounded-full flex-shrink-0 inline-block"
                        style={{ backgroundColor: ACCENT }}
                      />
                      {section.title}
                    </h2>
                    <div className="prose-custom text-gray-700 dark:text-gray-300 text-sm leading-relaxed space-y-3">
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
                  Ultima actualizare: {lastUpdated} · Versiunea 1.0
                </p>
                <div className="flex justify-center gap-6 mt-4">
                  <Link href="/contact" className="text-sm hover:underline" style={{ color: ACCENT }}>Contact</Link>
                  <Link href="/politica-de-confidentialitate" className="text-sm hover:underline" style={{ color: ACCENT }}>Politică de Confidențialitate</Link>
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
