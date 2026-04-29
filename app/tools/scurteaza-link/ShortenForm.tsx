"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

interface OgPreview {
  title: string | null;
  description: string | null;
  image: string | null;
}

export default function ShortenForm() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [preview, setPreview] = useState<OgPreview | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    setCopied(false);
    setPreview(null);

    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: longUrl.trim() }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Eroare necunoscută.");
        setStatus("error");
        return;
      }

      setShortUrl(data.shortUrl);
      setPreview(data.preview ?? null);
      setStatus("success");
    } catch {
      setError("Eroare de rețea. Încearcă din nou.");
      setStatus("error");
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback dacă clipboard nu e disponibil (HTTP, browser vechi)
      const input = document.createElement("input");
      input.value = shortUrl;
      document.body.appendChild(input);
      input.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        /* nimic */
      } finally {
        document.body.removeChild(input);
      }
    }
  }

  function handleReset() {
    setLongUrl("");
    setShortUrl("");
    setPreview(null);
    setError("");
    setStatus("idle");
    setCopied(false);
  }

  const hasPreview =
    preview && (preview.title || preview.description || preview.image);

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="longUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          URL lung <span className="text-red-500">*</span>
        </label>
        <input
          id="longUrl"
          name="longUrl"
          type="url"
          required
          value={longUrl}
          onChange={(e) => {
            setLongUrl(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="https://dottotv.ro/articol/..."
          autoComplete="off"
          spellCheck={false}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all text-sm"
        />
      </div>

      {status === "error" && error && (
        <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/40">
          <svg className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      {status === "success" && shortUrl && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-green-700 dark:text-green-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            Link generat cu succes
          </div>

          <div className="flex items-stretch gap-2">
            <div className="flex-1 min-w-0 px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-mono text-sm text-gray-900 dark:text-white truncate select-all">
              {shortUrl}
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className={`flex-shrink-0 px-4 py-3 rounded-xl text-white font-semibold text-sm transition-all flex items-center gap-2 ${
                copied ? "bg-green-600" : "bg-brand-blue hover:bg-brand-blue-dark"
              }`}
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  Copiat
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </>
              )}
            </button>
          </div>

          {hasPreview && (
            <div className="mt-2 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-gray-50 dark:bg-gray-800/50">
              <div className="px-4 pt-3 pb-1 flex items-center gap-2">
                <span className="text-[10px] font-semibold tracking-[0.18em] text-gray-500 dark:text-gray-400 uppercase">
                  Preview social
                </span>
                <span className="text-[10px] text-gray-400 dark:text-gray-500">
                  · așa va arăta când e dat share
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-0">
                {preview?.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={preview.image}
                    alt=""
                    className="w-full sm:w-40 h-32 sm:h-auto object-cover bg-gray-100 dark:bg-gray-900"
                    loading="lazy"
                  />
                )}
                <div className="flex-1 p-4 min-w-0">
                  {preview?.title ? (
                    <p className="font-semibold text-sm text-gray-900 dark:text-white line-clamp-2">
                      {preview.title}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-400 italic">
                      Titlu nedetectat
                    </p>
                  )}
                  {preview?.description && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                      {preview.description}
                    </p>
                  )}
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-2 uppercase tracking-wider">
                    dottotv.ro
                  </p>
                </div>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={handleReset}
            className="text-sm text-gray-500 hover:text-brand-blue transition-colors"
          >
            ← Scurtează alt link
          </button>
        </div>
      )}

      {status !== "success" && (
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-3.5 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold text-sm tracking-wide transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "loading" ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Se generează...
            </span>
          ) : (
            "Generează"
          )}
        </button>
      )}
    </form>
  );
}
