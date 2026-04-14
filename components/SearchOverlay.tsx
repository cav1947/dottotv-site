"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

interface SearchResult {
  slug: string;
  title: string;
  date: string;
  image: string | null;
  category: { name: string; slug: string } | null;
}

interface Props {
  onClose: () => void;
}

export default function SearchOverlay({ onClose }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus fallback pentru browsere care ignoră autoFocus
  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, []);

  // Escape închide
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Blochează scroll body când overlay-ul e deschis
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Căutare cu debounce 300ms
  useEffect(() => {
    if (query.length < 3) {
      setResults([]);
      setSearched(false);
      setError(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error("search failed");
        const data: SearchResult[] = await res.json();
        setResults(data);
        setSearched(true);
      } catch {
        setResults([]);
        setSearched(true);
        setError(true);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleClose = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm flex flex-col md:items-center md:pt-20 md:px-4"
      onClick={handleClose}
    >
      {/* Panel */}
      <div
        className="w-full md:max-w-2xl bg-white dark:bg-gray-900 md:rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        style={{ maxHeight: "calc(100dvh - 0px)", }}
        // pe desktop: max-height limitat de pt-20
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
          {loading ? (
            <div className="w-5 h-5 border-2 border-brand-blue border-t-transparent rounded-full animate-spin flex-shrink-0" />
          ) : (
            <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}

          <input
            ref={inputRef}
            type="search"
            autoFocus
            inputMode="search"
            enterKeyHint="search"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Caută articole..."
            className="flex-1 text-[17px] text-gray-900 dark:text-white bg-transparent outline-none placeholder-gray-400 [&::-webkit-search-cancel-button]:hidden"
          />

          <button
            onClick={onClose}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500"
            aria-label="Închide căutarea"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Rezultate */}
        <div className="overflow-y-auto flex-1">

          {/* Hint minim 3 caractere */}
          {query.length < 3 && (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <svg className="w-14 h-14 mb-4 text-gray-200 dark:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                Scrie cel puțin <span className="text-brand-blue font-bold">3 caractere</span> pentru a căuta
              </p>
            </div>
          )}

          {/* Eroare de rețea */}
          {searched && error && !loading && (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <svg className="w-14 h-14 mb-4 text-gray-200 dark:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
              <p className="text-gray-700 dark:text-gray-300 font-semibold">Eroare la căutare</p>
              <p className="text-gray-400 text-sm mt-1">Verifică conexiunea și încearcă din nou</p>
            </div>
          )}

          {/* Niciun rezultat */}
          {searched && !error && results.length === 0 && !loading && (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <svg className="w-14 h-14 mb-4 text-gray-200 dark:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-700 dark:text-gray-300 font-semibold">
                Niciun rezultat pentru „{query}"
              </p>
              <p className="text-gray-400 text-sm mt-1">Încearcă un alt termen de căutare</p>
            </div>
          )}

          {/* Lista rezultate */}
          {results.length > 0 && (
            <ul>
              {results.map((result) => (
                <li key={result.slug}>
                  <Link
                    href={`/articol/${result.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-4 px-4 py-3.5 hover:bg-blue-50 dark:hover:bg-blue-950/30 border-b border-gray-50 dark:border-gray-800/60 last:border-0 group transition-colors"
                  >
                    {/* Thumbnail */}
                    <div className="flex-shrink-0 w-[72px] h-[50px] rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                      {result.image ? (
                        <Image
                          src={result.image}
                          alt=""
                          width={72}
                          height={50}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <h4
                        className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-brand-blue dark:group-hover:text-brand-blue line-clamp-2 leading-snug transition-colors"
                        dangerouslySetInnerHTML={{ __html: result.title }}
                      />
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        {result.category && (
                          <span className="text-[10px] font-bold text-brand-blue uppercase tracking-wide leading-none">
                            {result.category.name}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Săgeată */}
                    <svg className="w-4 h-4 text-gray-300 group-hover:text-brand-blue flex-shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer hints — doar desktop */}
        <div className="hidden md:flex items-center gap-5 px-4 py-2.5 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex-shrink-0">
          <span className="text-[11px] text-gray-400 flex items-center gap-1.5">
            <kbd className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-1.5 py-0.5 rounded text-gray-500 dark:text-gray-400 font-mono text-[10px] shadow-sm">Esc</kbd>
            pentru a închide
          </span>
          <span className="text-[11px] text-gray-400 flex items-center gap-1.5">
            <kbd className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-1.5 py-0.5 rounded text-gray-500 dark:text-gray-400 font-mono text-[10px] shadow-sm">↵</kbd>
            pentru a deschide articolul
          </span>
        </div>
      </div>
    </div>
  );
}
