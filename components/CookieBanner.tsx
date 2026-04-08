"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const STORAGE_KEY = "dottotv_cookie_consent";

export type ConsentChoice = "all" | "necessary";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        // Slight delay so it doesn't flash on first paint
        const timer = setTimeout(() => setVisible(true), 600);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage unavailable (SSR guard, private mode)
    }
  }, []);

  function saveChoice(choice: ConsentChoice) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ choice, date: new Date().toISOString() }));
    } catch {
      // ignore
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Banner consimțământ cookie-uri"
      className="fixed bottom-0 left-0 right-0 z-[9999] px-4 pb-4 pt-0 md:pb-6"
      style={{ animation: "cookieBannerSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) both" }}
    >
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Blue accent bar */}
        <div className="h-1 w-full" style={{ backgroundColor: "#1565C0" }} />

        <div className="p-5 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-5">

            {/* Icon + text */}
            <div className="flex gap-4 flex-1 min-w-0">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ backgroundColor: "#1565C0" }}
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                  Acest site folosește cookie-uri
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl">
                  Folosim cookie-uri pentru a asigura funcționarea corectă a platformei, a analiza traficul
                  (Google Analytics) și a afișa publicitate relevantă. Puteți accepta toate cookie-urile sau
                  doar pe cele strict necesare.{" "}
                  <Link
                    href="/politica-de-cookies"
                    className="font-medium underline underline-offset-2 hover:no-underline transition-all"
                    style={{ color: "#1565C0" }}
                  >
                    Politica de Cookies
                  </Link>
                  {" "}·{" "}
                  <Link
                    href="/politica-de-confidentialitate"
                    className="font-medium underline underline-offset-2 hover:no-underline transition-all"
                    style={{ color: "#1565C0" }}
                  >
                    Politica de Confidențialitate
                  </Link>
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-2.5 flex-shrink-0 md:pl-4">
              <button
                onClick={() => saveChoice("necessary")}
                className="px-5 py-2.5 rounded-xl text-sm font-medium border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors whitespace-nowrap"
              >
                Doar necesare
              </button>
              <button
                onClick={() => saveChoice("all")}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90 whitespace-nowrap"
                style={{ backgroundColor: "#1565C0" }}
              >
                Acceptă toate
              </button>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @keyframes cookieBannerSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
