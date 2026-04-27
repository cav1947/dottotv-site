"use client";

import { useState, FormEvent } from "react";

const SERVICES = [
  "Bannere publicitare pe site",
  "Spoturi TV",
  "Pachete combinate TV și online",
  "Advertorial",
  "Parteneriate media",
  "Realizare emisiuni",
  "Închiriere studio fizic",
  "Închiriere studio virtual",
  "Transmisiuni live evenimente",
  "Transmisiuni conferințe de presă",
  "Producție video clipuri publicitare",
  "Producție prezentări corporate",
  "Branded content / articole sponsorizate",
  "Promovare pe social media DottoTV",
  "Ticker publicitar (breaking news)",
  "Sponsorizare emisiune",
  "Interviu corporate",
  "Eveniment mediatizat de DottoTV",
  "Pachet digital complet",
];

const ACCENT = "#1565C0";

export default function PublicitateForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({
    nume: "",
    companie: "",
    email: "",
    telefon: "",
    serviciu: "",
    mesaj: "",
  });
  const [website, setWebsite] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website, type: "publicitate" }),
      });
      setStatus("sent");
      setForm({ nume: "", companie: "", email: "", telefon: "", serviciu: "", mesaj: "" });
      setWebsite("");
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 transition";

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "#e8f5e9" }}
        >
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white font-playfair">Mesaj trimis cu succes!</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs">
          Lina Tudor vă va contacta în cel mai scurt timp cu o ofertă personalizată.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm font-medium hover:underline"
          style={{ color: ACCENT }}
        >
          Trimite un nou mesaj
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: "auto", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor="publicitate-website">Website (nu completați)</label>
        <input
          id="publicitate-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
            Nume *
          </label>
          <input
            type="text"
            name="nume"
            required
            value={form.nume}
            onChange={handleChange}
            placeholder="Numele dvs."
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
            Companie
          </label>
          <input
            type="text"
            name="companie"
            value={form.companie}
            onChange={handleChange}
            placeholder="Numele companiei"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
            Email *
          </label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="email@companie.ro"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
            Telefon
          </label>
          <input
            type="tel"
            name="telefon"
            value={form.telefon}
            onChange={handleChange}
            placeholder="07XX XXX XXX"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
          Serviciu dorit
        </label>
        <select
          name="serviciu"
          value={form.serviciu}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">— Selectați un serviciu —</option>
          {SERVICES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
          Mesaj *
        </label>
        <textarea
          name="mesaj"
          required
          rows={4}
          value={form.mesaj}
          onChange={handleChange}
          placeholder="Descrieți pe scurt obiectivele campaniei dvs. sau serviciile de care sunteți interesat..."
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 px-4 py-3 rounded-xl">
          A apărut o eroare. Vă rugăm să ne contactați direct la lina.tudor@dottotv.ro.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-3.5 px-6 rounded-xl text-white font-semibold text-sm tracking-wide transition-all disabled:opacity-70 hover:brightness-110 active:scale-[0.99]"
        style={{ backgroundColor: ACCENT }}
      >
        {status === "sending" ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Se trimite...
          </span>
        ) : (
          "Trimite mesajul"
        )}
      </button>

      <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
        Fără prețuri afișate — vă contactăm cu o ofertă personalizată în funcție de nevoile dvs.
      </p>
    </form>
  );
}
