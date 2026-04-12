"use client";

import { useEffect, useState } from "react";
import type { DaySchedule, TVShow } from "@/lib/tv-schedule";

// ─── Tipuri ───────────────────────────────────────────────────────────────────

interface BucharestNow {
  /** 0 = Luni … 6 = Duminică */
  dayIndex: number;
  hour: number;
  minute: number;
  day: number;
  month: number; // 0-based
  year: number;
}

// ─── Oră curentă în fusul Europe/Bucharest ───────────────────────────────────

function getBucharestNow(): BucharestNow {
  const now = new Date();

  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Bucharest",
    weekday: "short",
    hour:    "2-digit",
    minute:  "2-digit",
    day:     "2-digit",
    month:   "2-digit",
    year:    "numeric",
    hour12:  false,
  }).formatToParts(now);

  const get = (type: string) =>
    parts.find((p) => p.type === type)?.value ?? "0";

  const weekday = get("weekday"); // "Mon" "Tue" etc.
  const hour    = parseInt(get("hour"),   10);
  const minute  = parseInt(get("minute"), 10);
  const day     = parseInt(get("day"),    10);
  const month   = parseInt(get("month"),  10) - 1;
  const year    = parseInt(get("year"),   10);

  // en-GB short: Mon Tue Wed Thu Fri Sat Sun
  const weekdayMap: Record<string, number> = {
    Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 0,
  };
  const jsDay    = weekdayMap[weekday] ?? 0;
  const dayIndex = jsDay === 0 ? 6 : jsDay - 1; // 0=Luni … 6=Duminică

  return { dayIndex, hour, minute, day, month, year };
}

// ─── Helpers timp ─────────────────────────────────────────────────────────────

function toMinutes(hhmm: string): number {
  const [hStr, mStr] = hhmm.split(":");
  return parseInt(hStr ?? "0", 10) * 60 + parseInt(mStr ?? "0", 10);
}

function isActive(show: TVShow, hour: number, minute: number): boolean {
  const now   = hour * 60 + minute;
  const start = toMinutes(show.startTime);
  const end   = toMinutes(show.endTime) || 24 * 60; // "00:00" → miezul nopții
  return now >= start && now < end;
}

function isPast(show: TVShow, hour: number, minute: number): boolean {
  const now = hour * 60 + minute;
  const end = toMinutes(show.endTime) || 24 * 60;
  return now >= end;
}

// ─── Etichete UI ──────────────────────────────────────────────────────────────

const DAY_LABELS: Record<number, string> = {
  0: "Luni", 1: "Marți", 2: "Miercuri", 3: "Joi",
  4: "Vineri", 5: "Sâmbătă", 6: "Duminică",
};

const MONTHS = [
  "Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie",
  "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie",
];

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

// ─── Componentă ───────────────────────────────────────────────────────────────

interface Props {
  schedule: DaySchedule[];
}

export default function TVSchedule({ schedule }: Props) {
  const [now, setNow] = useState<BucharestNow | null>(null);

  // Hidratare + actualizare la fiecare minut.
  // La trecerea peste miezul nopții dayIndex se actualizează automat.
  useEffect(() => {
    setNow(getBucharestNow());
    const id = setInterval(() => setNow(getBucharestNow()), 60_000);
    return () => clearInterval(id);
  }, []);

  // ── Lipsă date ───────────────────────────────────────────────────────────
  if (!schedule || schedule.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8 text-center">
        <svg
          className="w-10 h-10 mx-auto mb-3 text-gray-300 dark:text-gray-600"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <p className="text-sm text-gray-400">Programul TV nu este disponibil momentan.</p>
      </div>
    );
  }

  const dayIndex  = now?.dayIndex ?? 0;
  const nowHour   = now?.hour   ?? 0;
  const nowMinute = now?.minute ?? 0;
  const shows     = schedule[dayIndex]?.shows ?? [];
  const activeIdx = shows.findIndex((s) => isActive(s, nowHour, nowMinute));

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">

      {/* ── Header: titlu + dată + oră curentă ── */}
      <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between gap-3">

          <div className="flex items-center gap-3">
            <div className="w-1 h-7 rounded-full flex-shrink-0" style={{ backgroundColor: "#1565C0" }} />
            <div>
              <h2 className="font-playfair font-bold text-lg text-gray-900 dark:text-white leading-tight">
                Program TV
              </h2>
              {now && (
                <p className="text-xs text-gray-400 mt-0.5">
                  {DAY_LABELS[dayIndex]}, {now.day} {MONTHS[now.month]} {now.year}
                </p>
              )}
            </div>
          </div>

          {now && (
            <span className="font-mono font-bold text-2xl tabular-nums flex-shrink-0"
              style={{ color: "#1565C0" }}>
              {pad(now.hour)}:{pad(now.minute)}
            </span>
          )}

        </div>
      </div>

      {/* ── Lista completă a zilei — fără scroll, toate vizibile ── */}
      <div>
        {shows.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-8">
            Nu există emisiuni programate pentru azi.
          </p>
        )}

        {shows.map((show, idx) => {
          const active = now ? isActive(show, nowHour, nowMinute) : false;
          const past   = now ? isPast(show,   nowHour, nowMinute) : false;
          const next   = !active && !past && activeIdx !== -1 && idx === activeIdx + 1;

          return (
            <div
              key={idx}
              className={[
                "flex items-center gap-3 px-4 py-2",
                // Separator subțire între rânduri
                idx < shows.length - 1
                  ? active
                    ? "border-b border-blue-700/30"
                    : "border-b border-gray-100 dark:border-gray-800/60"
                  : "",
                // Fundal
                active ? "" : past ? "opacity-70" : "",
              ].join(" ")}
              style={active ? { backgroundColor: "#1565C0" } : undefined}
            >
              {/* Interval orar */}
              <span
                className={[
                  "font-mono text-xs tabular-nums flex-shrink-0 w-[82px]",
                  active ? "text-blue-100" : "text-gray-400 dark:text-gray-500",
                ].join(" ")}
              >
                {show.startTime}–{show.endTime}
              </span>

              {/* Titlu emisiune */}
              <span
                className={[
                  "flex-1 text-sm min-w-0 truncate",
                  active
                    ? "font-semibold text-white"
                    : next
                    ? "font-bold text-gray-900 dark:text-white"
                    : past
                    ? "text-gray-400 dark:text-gray-600"
                    : "text-gray-700 dark:text-gray-300",
                ].join(" ")}
              >
                {show.name}
              </span>

              {/* Badge ACUM — doar pe rândul activ */}
              {active && (
                <span className="flex-shrink-0 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-white/80">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  Acum
                </span>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
