import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Pagina nu există",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <div className="max-w-md mx-auto">
        <div className="text-8xl mb-6">📰</div>
        <h1 className="font-playfair font-bold text-4xl text-gray-900 dark:text-white mb-4">
          404 - Pagina nu există
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
          Articolul sau pagina pe care o cauți nu mai există sau a fost mutată.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-brand-blue hover:bg-brand-blue-dark text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            ← Pagina Principală
          </Link>
          <Link
            href="/live"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 justify-center"
          >
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            LIVE TV
          </Link>
        </div>
      </div>
    </div>
  );
}
