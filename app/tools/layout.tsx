import type { Metadata } from "next";

// noindex pe toate paginile sub /tools/* — acestea sunt servite pe tools.dottotv.ro
// Middleware-ul adaugă și header-ul X-Robots-Tag pentru defense in depth.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  alternates: {},
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
