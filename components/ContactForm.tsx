"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ nume: "", email: "", subiect: "", mesaj: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type: "contact" }),
      });
      if (!res.ok) throw new Error("server error");
      setStatus("sent");
      setForm({ nume: "", email: "", subiect: "", mesaj: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "#1565C0" }}>
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Mesaj trimis!</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Vă mulțumim. Vă vom răspunde în cel mai scurt timp.</p>
        <button
          onClick={() => setStatus("idle")}
          className="px-6 py-2 rounded-lg text-white font-medium transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#1565C0" }}
        >
          Trimite alt mesaj
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="nume" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Nume <span className="text-red-500">*</span>
          </label>
          <input
            id="nume"
            name="nume"
            type="text"
            required
            value={form.nume}
            onChange={handleChange}
            placeholder="Numele dvs."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all text-sm"
            onFocus={(e) => { e.target.style.boxShadow = "0 0 0 2px #1565C0"; }}
            onBlur={(e) => { e.target.style.boxShadow = ""; }}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="email@exemplu.ro"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none transition-all text-sm"
            onFocus={(e) => { e.target.style.boxShadow = "0 0 0 2px #1565C0"; }}
            onBlur={(e) => { e.target.style.boxShadow = ""; }}
          />
        </div>
      </div>

      <div>
        <label htmlFor="subiect" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Subiect <span className="text-red-500">*</span>
        </label>
        <input
          id="subiect"
          name="subiect"
          type="text"
          required
          value={form.subiect}
          onChange={handleChange}
          placeholder="Subiectul mesajului"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none transition-all text-sm"
          onFocus={(e) => { e.target.style.boxShadow = "0 0 0 2px #1565C0"; }}
          onBlur={(e) => { e.target.style.boxShadow = ""; }}
        />
      </div>

      <div>
        <label htmlFor="mesaj" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Mesaj <span className="text-red-500">*</span>
        </label>
        <textarea
          id="mesaj"
          name="mesaj"
          required
          rows={6}
          value={form.mesaj}
          onChange={handleChange}
          placeholder="Scrieți mesajul dvs. aici..."
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none transition-all text-sm resize-none"
          onFocus={(e) => { e.target.style.boxShadow = "0 0 0 2px #1565C0"; }}
          onBlur={(e) => { e.target.style.boxShadow = ""; }}
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 px-4 py-3 rounded-xl">
          A apărut o eroare. Vă rugăm să ne contactați direct la <a href="mailto:office@dottotv.ro" className="underline">office@dottotv.ro</a>.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-3.5 rounded-xl text-white font-semibold text-sm tracking-wide transition-all hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ backgroundColor: "#1565C0" }}
      >
        {status === "sending" ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Se trimite...
          </span>
        ) : (
          "Trimite mesaj"
        )}
      </button>
    </form>
  );
}
