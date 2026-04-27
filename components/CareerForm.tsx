"use client";

import { useState, useRef } from "react";

const JOBS = [
  "Jurnalist",
  "Reporter",
  "Prezentator TV",
  "Cameraman",
  "Editor video",
  "Producător",
  "Social Media Manager",
  "Redactor online",
  "Grafician",
  "IT și Tehnic",
  "Account Manager Publicitate",
  "Operator studio",
];

const ACCENT = "#1565C0";

export default function CareerForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    nume: "",
    email: "",
    telefon: "",
    pozitie: "",
    mesaj: "",
  });
  const [website, setWebsite] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (file && file.size > 5 * 1024 * 1024) {
      setErrorMsg("CV-ul nu poate depăși 5MB.");
      setCvFile(null);
      e.target.value = "";
      return;
    }
    setErrorMsg("");
    setCvFile(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const data = new FormData();
      data.append("type", "cariere");
      data.append("nume", form.nume);
      data.append("email", form.email);
      data.append("telefon", form.telefon);
      data.append("pozitie", form.pozitie);
      data.append("mesaj", form.mesaj);
      data.append("website", website);
      if (cvFile) data.append("cv", cvFile);

      const res = await fetch("/api/contact", { method: "POST", body: data });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error ?? "server error");
      }
      setStatus("sent");
      setForm({ nume: "", email: "", telefon: "", pozitie: "", mesaj: "" });
      setWebsite("");
      setCvFile(null);
      if (fileRef.current) fileRef.current.value = "";
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "A apărut o eroare.");
      setStatus("error");
    }
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition";

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
        <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "#e8f5e9" }}>
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white font-playfair">Aplicație trimisă!</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs">
          Îți mulțumim pentru interes. Echipa DOTTO TV te va contacta dacă profilul tău corespunde nevoilor noastre.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm font-medium hover:underline"
          style={{ color: ACCENT }}
        >
          Trimite o altă aplicație
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: "auto", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor="cariere-website">Website (nu completați)</label>
        <input
          id="cariere-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
            Nume complet *
          </label>
          <input type="text" name="nume" required value={form.nume} onChange={handleChange}
            placeholder="Numele tău complet" className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
            Email *
          </label>
          <input type="email" name="email" required value={form.email} onChange={handleChange}
            placeholder="email@exemplu.ro" className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
            Telefon
          </label>
          <input type="tel" name="telefon" value={form.telefon} onChange={handleChange}
            placeholder="07XX XXX XXX" className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
            Poziția dorită *
          </label>
          <select name="pozitie" required value={form.pozitie} onChange={handleChange} className={inputClass}>
            <option value="">— Selectează poziția —</option>
            {JOBS.map((j) => <option key={j} value={j}>{j}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
          Mesaj motivațional *
        </label>
        <textarea name="mesaj" required rows={5} value={form.mesaj} onChange={handleChange}
          placeholder="Spune-ne de ce vrei să faci parte din echipa DOTTO TV și ce experiență ai relevant..."
          className={`${inputClass} resize-none`} />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
          CV <span className="normal-case font-normal text-gray-400">(PDF, DOC, DOCX — max 5MB)</span>
        </label>
        <div
          className="w-full px-4 py-4 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-center cursor-pointer hover:border-blue-400 transition-colors"
          onClick={() => fileRef.current?.click()}
        >
          {cvFile ? (
            <div className="flex items-center justify-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="truncate max-w-[200px]">{cvFile.name}</span>
              <button type="button" onClick={(ev) => { ev.stopPropagation(); setCvFile(null); if (fileRef.current) fileRef.current.value = ""; }}
                className="text-gray-400 hover:text-red-500 ml-1">✕</button>
            </div>
          ) : (
            <div className="text-sm text-gray-400">
              <svg className="w-8 h-8 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span>Click pentru a încărca CV-ul</span>
            </div>
          )}
          <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" onChange={handleFile} className="hidden" />
        </div>
      </div>

      {(status === "error" || errorMsg) && (
        <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 px-4 py-3 rounded-xl">
          {errorMsg || "A apărut o eroare. Încearcă din nou sau trimite CV-ul direct la office@dottotv.ro."}
        </p>
      )}

      <button type="submit" disabled={status === "sending"}
        className="w-full py-3.5 px-6 rounded-xl text-white font-semibold text-sm tracking-wide transition-all disabled:opacity-70 hover:brightness-110 active:scale-[0.99]"
        style={{ backgroundColor: ACCENT }}>
        {status === "sending" ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Se trimite...
          </span>
        ) : "Trimite aplicația"}
      </button>
    </form>
  );
}
