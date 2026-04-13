// ─── Programul TV — Google Sheets → xlsx ─────────────────────────────────────
//
// Structura exactă a foii:
//   Rând 0   = header — fiecare celulă conține două ore separate de newline:
//              "HH:MM\nHH:MM"  (ora_start\nora_sfârsit a acelui slot de 30 min)
//   Rânduri 1-7 = zilele săptămânii (1=LUNI … 7=DUMINICĂ)
//              Fiecare celulă = numele emisiunii, poate conține newline-uri
//
// Logica de parsare:
//   1. Scanăm headerul: extragem perechi (startTime, endTime) per coloană
//   2. Pentru fiecare zi citim denumirile emisiunilor, înlocuind \n cu spațiu
//   3. Îmbinăm sloturile consecutive cu același nume → o singură emisiune
//      cu startTime din primul slot și endTime din ultimul slot al grupului
// ─────────────────────────────────────────────────────────────────────────────

import * as XLSX from "xlsx";

const SCHEDULE_URL =
  "https://docs.google.com/spreadsheets/d/1X7vutIe1Ss2qR2-7PDuPCIhkIOAUUh8XsqZrFFpCih0/export?format=xlsx&sheet=PRODUCTII%20PROPRII%20SI%20TERTI";

const DAY_NAMES = [
  "LUNI",
  "MARTI",
  "MIERCURI",
  "JOI",
  "VINERI",
  "SAMBATA",
  "DUMINICA",
] as const;

export type DayName = (typeof DAY_NAMES)[number];

export interface TVShow {
  name: string;
  startTime: string;
  endTime: string;
}

export interface DaySchedule {
  dayName: DayName;
  /** 0 = Luni … 6 = Duminică */
  dayIndex: number;
  shows: TVShow[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Extrage "HH:MM" dintr-un șir care poate conține și secunde sau spații.
 * Normalizează ora la 2 cifre. Returnează null dacă nu găsește pattern.
 */
function extractTime(raw: string): string | null {
  const m = raw.trim().match(/^(\d{1,2}):(\d{2})/);
  if (!m) return null;
  const h = parseInt(m[1], 10);
  const min = m[2];
  // 24:00 → 00:00 (capătul zilei)
  if (h >= 24) return "00:00";
  return `${h.toString().padStart(2, "0")}:${min}`;
}

/**
 * Parsează o celulă de header care ar trebui să conțină "HH:MM\nHH:MM".
 * Returnează { startTime, endTime } sau null dacă celula nu are format valid.
 */
function parseHeaderCell(cell: unknown): { startTime: string; endTime: string } | null {
  if (cell === null || cell === undefined || cell === "") return null;

  const raw = String(cell);

  // Împărțim după orice tip de newline sau combinație de whitespace
  const lines = raw.split(/[\r\n]+/).map((l) => l.trim()).filter(Boolean);

  const t1 = lines[0] ? extractTime(lines[0]) : null;
  if (!t1) return null;

  const t2 = lines[1] ? extractTime(lines[1]) : null;

  // Dacă lipsește a doua linie (ex: header malformat), deducem end = start + 30 min
  const endTime = t2 ?? addMinutes(t1, 30);

  return { startTime: t1, endTime };
}

/** Adaugă `minutes` la un "HH:MM" și returnează "HH:MM" (wrap la 00:00 dacă depășește 24h). */
function addMinutes(time: string, minutes: number): string {
  const [h, m] = time.split(":").map(Number);
  const total = h * 60 + m + minutes;
  const hh = Math.floor(total / 60) % 24;
  const mm = total % 60;
  return `${hh.toString().padStart(2, "0")}:${mm.toString().padStart(2, "0")}`;
}

/**
 * Curăță conținutul unei celule de date.
 * - Normalizează Unicode la NFC (elimină diferențele invizibile între caractere identice vizual)
 * - Înlocuiește ORICE secvență de whitespace (\n, \r, \t, spații multiple, NBSP etc.) cu un singur spațiu
 * - Aplică trim la capete
 */
function cleanShowName(cell: unknown): string {
  if (cell === null || cell === undefined || cell === "") return "";
  return String(cell)
    .normalize("NFC")
    .replace(/\s+/g, " ")
    .trim();
}

// ─── Parser principal ─────────────────────────────────────────────────────────

interface SlotDef {
  col: number;
  startTime: string;
  endTime: string;
}

function parseRows(rows: unknown[][]): DaySchedule[] {
  if (!rows || rows.length < 2) return [];

  const header = rows[0] as unknown[];

  // ── Pas 1: construim harta sloturilor din header ───────────────────────────
  const slots: SlotDef[] = [];

  for (let col = 0; col < header.length; col++) {
    const parsed = parseHeaderCell(header[col]);
    if (parsed) {
      slots.push({ col, ...parsed });
    }
  }

  // Fallback dacă headerul nu a putut fi interpretat:
  // presupunem că sloturile sunt pe coloanele 1-48 cu orar 00:00-23:30
  if (slots.length === 0) {
    for (let i = 0; i < 48; i++) {
      const h = Math.floor((i * 30) / 60).toString().padStart(2, "0");
      const m = ((i * 30) % 60).toString().padStart(2, "0");
      const hEnd = Math.floor(((i + 1) * 30) / 60) % 24;
      const mEnd = ((i + 1) * 30) % 60;
      slots.push({
        col: i + 1,
        startTime: `${h}:${m}`,
        endTime: `${hEnd.toString().padStart(2, "0")}:${mEnd.toString().padStart(2, "0")}`,
      });
    }
  }

  const TOTAL_SLOTS = slots.length;

  // ── Pas 2: parsăm fiecare zi ───────────────────────────────────────────────
  const schedules: DaySchedule[] = [];

  for (let d = 0; d < 7; d++) {
    const row = (rows[d + 1] ?? []) as unknown[];

    // Citim denumirile emisiunilor pentru fiecare slot (în ordinea din `slots`)
    const names: string[] = slots.map((s) => cleanShowName(row[s.col]));

    // ── Pas 3: îmbinăm sloturile consecutive cu același nume ──────────────────
    const shows: TVShow[] = [];
    let i = 0;

    while (i < TOTAL_SLOTS) {
      const name = names[i];

      // Sărim sloturile goale
      if (!name) {
        i++;
        continue;
      }

      // Găsim până unde se extinde blocul cu același nume.
      // Celulele goale (blank) sunt tratate ca transparente — apare la export din
      // Excel când o celulă fuzionată span pe mai multe coloane: prima coloană
      // primește valoarea, restul rămân goale. Oprim doar la o altă emisiune nenulă.
      let j = i + 1;
      let lastMatch = i;

      while (j < TOTAL_SLOTS) {
        if (names[j] === name) {
          lastMatch = j;
          j++;
        } else if (names[j] === "") {
          // Slot gol = celulă fuzionată în Excel — face parte din blocul curent
          lastMatch = j;
          j++;
        } else {
          break; // altă emisiune nenulă — oprim
        }
      }

      shows.push({
        name,
        startTime: slots[i].startTime,
        endTime:   slots[lastMatch].endTime,
      });

      i = lastMatch + 1;
    }

    schedules.push({
      dayName:  DAY_NAMES[d],
      dayIndex: d,
      shows,
    });
  }

  return schedules;
}

// ─── Funcția publică ──────────────────────────────────────────────────────────

export async function getTVSchedule(): Promise<DaySchedule[] | null> {
  try {
    const res = await fetch(SCHEDULE_URL, {
      next: { revalidate: 1800 }, // ISR 30 minute
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const buffer   = await res.arrayBuffer();
    const workbook = XLSX.read(new Uint8Array(buffer), { type: "array" });

    // Google Sheets exportă un singur sheet când specificăm ?sheet=...
    const sheetName = workbook.SheetNames[0];
    if (!sheetName) throw new Error("Workbook gol — niciun sheet");

    const sheet = workbook.Sheets[sheetName];

    // raw:true (default) → valorile text vin ca string-uri exacte, fără artefacte
    // de formatare pe care raw:false le poate introduce în unele versiuni xlsx.
    const rows = XLSX.utils.sheet_to_json<unknown[]>(sheet, {
      header: 1,
      defval: null,
      raw:    true,
    }) as unknown[][];

    return parseRows(rows);
  } catch (err) {
    console.error("[TVSchedule] Eroare la încărcarea programului:", err);
    return null;
  }
}
