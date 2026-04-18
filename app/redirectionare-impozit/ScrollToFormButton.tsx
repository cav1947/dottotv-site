"use client";

const ACCENT = "#1565C0";

export default function ScrollToFormButton() {
  return (
    <a
      href="#formular"
      onClick={(e) => {
        e.preventDefault();
        document.querySelector("iframe")?.scrollIntoView({ behavior: "smooth", block: "center" });
      }}
      className="inline-flex w-full sm:w-auto justify-center items-center gap-2 bg-white font-bold px-6 py-3 rounded-xl transition-opacity hover:opacity-90"
      style={{ color: ACCENT }}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
      </svg>
      Completează formularul acum
    </a>
  );
}
