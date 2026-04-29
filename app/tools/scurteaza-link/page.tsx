import type { Metadata } from "next";
import ShortenForm from "./ShortenForm";

export const metadata: Metadata = {
  title: "Scurtează link – DOTTO TV Tools",
  description: "Generează linkuri scurte go.dottotv.ro pentru articolele DOTTO TV.",
};

export default function ScurteazaLinkPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl">
        <div className="text-center mb-6">
          <p className="text-xs font-semibold tracking-[0.2em] text-brand-blue uppercase mb-2">
            DOTTO TV — Tools
          </p>
          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Scurtează link
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Lipește URL-ul lung și primești un link <span className="font-mono text-brand-blue">go.dottotv.ro</span>
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 sm:p-8">
          <ShortenForm />
        </div>

        <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-6">
          Doar URL-uri de pe <span className="font-medium">dottotv.ro</span> pot fi scurtate.
        </p>
      </div>
    </div>
  );
}
