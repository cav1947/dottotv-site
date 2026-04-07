import type { Metadata, Viewport } from "next";
import "./globals.css";
import Providers from "./providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BreakingNewsTicker from "@/components/BreakingNewsTicker";
import { getCategories, getBreakingNews } from "@/lib/wordpress";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dottotv.ro";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "DottoTV - Știri din Constanța și România",
    template: "%s | DottoTV",
  },
  description:
    "Știri de actualitate din Constanța și din toată România. Informații corecte, rapide și verificate. Urmărește LIVE TV.",
  keywords: ["știri", "Constanța", "România", "actualitate", "DottoTV", "live tv"],
  authors: [{ name: "DottoTV" }],
  creator: "DottoTV",
  publisher: "DottoTV",
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: SITE_URL,
    siteName: "DottoTV",
    title: "DottoTV - Știri din Constanța și România",
    description: "Știri de actualitate din Constanța și din toată România.",
    images: [
      {
        url: `${SITE_URL}/images/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "DottoTV",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DottoTV - Știri din Constanța și România",
    description: "Știri de actualitate din Constanța și din toată România.",
    images: [`${SITE_URL}/images/og-default.jpg`],
    creator: "@dottotv",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
    types: {
      "application/rss+xml": `${SITE_URL}/feed`,
    },
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [categories, breakingNews] = await Promise.all([
    getCategories().catch(() => []),
    getBreakingNews().catch(() => []),
  ]);

  return (
    <html lang="ro" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#3c68b2" />
      </head>
      <body>
        <Providers>
          <Header categories={categories} />
          {breakingNews.length > 0 && <BreakingNewsTicker posts={breakingNews} />}
          <main className="min-h-screen">{children}</main>
          <Footer categories={categories} />
        </Providers>
      </body>
    </html>
  );
}
