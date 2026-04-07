"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import type { Category } from "@/lib/wordpress";

interface Props {
  categories: Category[];
}

export default function Header({ categories }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const mainCategories = categories.slice(0, 7);

  return (
    <header className="sticky top-0 z-50 shadow-md">
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
            <nav className="hidden md:flex items-center gap-1">
              {mainCategories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/${cat.slug}`}
                  className="text-white/90 hover:text-white hover:bg-white/20 px-3 py-2 rounded text-sm font-medium transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
              <Link
                href="/live"
                className="ml-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm font-bold transition-colors flex items-center gap-1"
              >
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                LIVE TV
              </Link>
            </nav>

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

          {/* Search bar */}
          {searchOpen && (
            <div className="pb-3">
              <form action="/cautare" method="get" className="flex gap-2">
                <input
                  type="text"
                  name="q"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Caută știri..."
                  className="flex-1 px-4 py-2 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                  autoFocus
                />
                <button
                  type="submit"
                  className="bg-white text-brand-blue px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  Caută
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

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
              href="/live"
              onClick={() => setMenuOpen(false)}
              className="text-red-400 hover:text-red-300 py-3 text-sm font-bold flex items-center gap-2"
            >
              <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
              LIVE TV
            </Link>
          </nav>
        </div>
      )}

      {/* Secondary nav / breadcrumb categories bar */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 h-10 overflow-x-auto scrollbar-none">
            <Link
              href="/"
              className="text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-blue text-xs font-medium whitespace-nowrap transition-colors"
            >
              Acasă
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/${cat.slug}`}
                className="text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-blue text-xs font-medium whitespace-nowrap transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
