"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import ThemeToggle from "./ThemeToggle";
import SearchOverlay from "./SearchOverlay";
import type { Category } from "@/lib/wordpress";
import type { ExchangeRates } from "@/lib/bnr";

interface Props {
  categories: Category[];
  rates?: ExchangeRates;
}

export default function Header({ categories, rates }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY.current && currentY > 60 && !menuOpen) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  const allowedSlugs = ["actualitate", "news", "interne", "externe", "sport", "politica", "sanatate"];
  const mainCategories = allowedSlugs
    .map((slug) => categories.find((c) => c.slug === slug))
    .filter(Boolean) as typeof categories;

  return (
    <header className={`fixed top-0 left-0 right-0 w-full z-50 shadow-md transition-transform duration-300 ${hidden ? "-translate-y-full" : "translate-y-0"}`}>
      {/* Top bar */}
      <div className="bg-brand-blue dark:bg-brand-blue-dark">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/Sigla-DOTTO-TV---alb.png"
                alt="DottoTV"
                height={120}
                width={480}
                className="h-24 md:h-[120px]"
                style={{ width: "auto" }}
                priority
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1 overflow-x-auto scrollbar-none">
              {mainCategories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/${cat.slug}`}
                  className="text-white/90 hover:text-white hover:bg-white/20 px-3 py-2 rounded text-sm font-medium transition-colors whitespace-nowrap"
                >
                  {cat.name}
                </Link>
              ))}
              <Link
                href="/utilitare"
                className="text-white/90 hover:text-white hover:bg-white/20 px-3 py-2 rounded text-sm font-medium transition-colors whitespace-nowrap"
              >
                Utilitare
              </Link>
              <Link
                href="/live"
                className="ml-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm font-bold transition-colors flex items-center gap-1 whitespace-nowrap"
              >
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                LIVE TV
              </Link>
            </nav>

            {/* Exchange rates — desktop only */}
            {rates && (rates.EUR !== null || rates.USD !== null) && (
              <div className="hidden md:flex items-center gap-3 text-xs text-white/75 border-l border-white/20 pl-3 ml-1">
                {rates.EUR !== null && (
                  <span className="flex items-center gap-1.5 whitespace-nowrap">
                    {/* EU flag clipped to circle via CSS */}
                    <span className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-white/20" aria-label="Euro">
                      <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <rect width="20" height="20" fill="#003399"/>
                        <g transform="translate(10,10)">
                          {Array.from({ length: 12 }, (_, i) => {
                            const a = (i * 30 - 90) * (Math.PI / 180);
                            return <circle key={i} cx={+(Math.cos(a) * 6.2).toFixed(3)} cy={+(Math.sin(a) * 6.2).toFixed(3)} r="1.15" fill="#FFCC00"/>;
                          })}
                        </g>
                      </svg>
                    </span>
                    <b className="font-semibold text-white/90">{rates.EUR.toFixed(4)}</b>
                  </span>
                )}
                {rates.USD !== null && (
                  <span className="flex items-center gap-1.5 whitespace-nowrap">
                    {/* US flag clipped to circle via CSS */}
                    <span className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-white/20" aria-label="Dolar SUA">
                      <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        {/* 13 stripes: red base + 6 white stripes */}
                        <rect width="20" height="20" fill="#B22234"/>
                        <rect y="1.54" width="20" height="1.54" fill="white"/>
                        <rect y="4.61" width="20" height="1.54" fill="white"/>
                        <rect y="7.69" width="20" height="1.54" fill="white"/>
                        <rect y="10.77" width="20" height="1.54" fill="white"/>
                        <rect y="13.85" width="20" height="1.54" fill="white"/>
                        <rect y="16.92" width="20" height="1.54" fill="white"/>
                        {/* Blue canton */}
                        <rect width="9" height="7.69" fill="#3C3B6E"/>
                      </svg>
                    </span>
                    <b className="font-semibold text-white/90">{rates.USD.toFixed(4)}</b>
                  </span>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                aria-label="Caută"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              <ThemeToggle />

              {/* Mobile menu button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                aria-label="Meniu"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {menuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Search overlay — portal la body ca să scape din transform-ul header-ului */}
      {searchOpen && createPortal(
        <SearchOverlay onClose={() => setSearchOpen(false)} />,
        document.body
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-brand-blue-dark dark:bg-gray-900 border-t border-white/10">
          <nav className="container mx-auto px-4 py-2 flex flex-col">
            {mainCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/${cat.slug}`}
                onClick={() => setMenuOpen(false)}
                className="text-white/90 hover:text-white py-3 text-sm font-medium border-b border-white/10 last:border-0"
              >
                {cat.name}
              </Link>
            ))}
            <Link
              href="/utilitare"
              onClick={() => setMenuOpen(false)}
              className="text-white/90 hover:text-white py-3 text-sm font-medium border-b border-white/10"
            >
              Utilitare
            </Link>
            <Link
              href="/live"
              onClick={() => setMenuOpen(false)}
              className="text-red-400 hover:text-red-300 py-3 text-sm font-bold flex items-center gap-2"
            >
              <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
              LIVE TV
            </Link>
            {/* Exchange rates in mobile menu */}
            {rates && (rates.EUR !== null || rates.USD !== null) && (
              <div className="flex items-center gap-4 pt-3 mt-1 border-t border-white/10">
                {rates.EUR !== null && (
                  <span className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-white/20" aria-label="Euro">
                      <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <rect width="20" height="20" fill="#003399"/>
                        <g transform="translate(10,10)">
                          {Array.from({ length: 12 }, (_, i) => {
                            const a = (i * 30 - 90) * (Math.PI / 180);
                            return <circle key={i} cx={+(Math.cos(a) * 6.2).toFixed(3)} cy={+(Math.sin(a) * 6.2).toFixed(3)} r="1.15" fill="#FFCC00"/>;
                          })}
                        </g>
                      </svg>
                    </span>
                    <b className="text-xs font-semibold text-white/90">{rates.EUR.toFixed(4)}</b>
                  </span>
                )}
                {rates.USD !== null && (
                  <span className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-white/20" aria-label="Dolar SUA">
                      <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <rect width="20" height="20" fill="#B22234"/>
                        <rect y="1.54" width="20" height="1.54" fill="white"/>
                        <rect y="4.61" width="20" height="1.54" fill="white"/>
                        <rect y="7.69" width="20" height="1.54" fill="white"/>
                        <rect y="10.77" width="20" height="1.54" fill="white"/>
                        <rect y="13.85" width="20" height="1.54" fill="white"/>
                        <rect y="16.92" width="20" height="1.54" fill="white"/>
                        <rect width="9" height="7.69" fill="#3C3B6E"/>
                      </svg>
                    </span>
                    <b className="text-xs font-semibold text-white/90">{rates.USD.toFixed(4)}</b>
                  </span>
                )}
              </div>
            )}
          </nav>
        </div>
      )}

    </header>
  );
}
