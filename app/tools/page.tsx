import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DOTTO TV Tools",
  description: "Instrumente interne DOTTO TV",
};

export default function ToolsHomePage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-brand-blue uppercase mb-2">
            DOTTO TV — Tools
          </p>
          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Instrumente interne
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/scurteaza-link"
            className="group block bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:border-brand-blue hover:shadow-lg transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-blue/10 dark:bg-brand-blue/20 flex items-center justify-center mb-4 group-hover:bg-brand-blue group-hover:text-white transition-colors">
              <svg className="w-5 h-5 text-brand-blue group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <h2 className="font-semibold text-gray-900 dark:text-white mb-1">Scurtează link</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Generează linkuri scurte go.dottotv.ro pentru articolele de pe site.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
