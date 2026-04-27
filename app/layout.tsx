import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

// Self-hosted prin next/font — elimină round-trip la fonts.googleapis.com
// și @import blocking din CSS. `display: 'swap'` previne FOIT.
//
// Weight-urile sunt cele efectiv folosite în UI:
//   Inter:    400 (default), 500 (font-medium), 600 (font-semibold),
//             700 (font-bold), 900 (font-black — branding AdBanner/Ticker)
//   Playfair: 600 (font-semibold — h3 din articole), 700 (font-bold — titluri)
// Lipsa unui weight forțează browser-ul la faux-bold sintetic, vizibil diferit.
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "900"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-playfair",
});
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BreakingNewsTicker from "@/components/BreakingNewsTicker";
import CookieBanner from "@/components/CookieBanner";
import BackToTop from "@/components/BackToTop";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { Analytics } from "@vercel/analytics/react";
import { getCategories, getBreakingNews } from "@/lib/wordpress";
import { getExchangeRates } from "@/lib/bnr";
import { organizationSchema, SITE_URL } from "@/lib/seo";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "DOTTO TV – Știri din Constanța și Dobrogea",
    template: "%s | DOTTO TV",
  },
  description:
    "Televiziunea locală a județului Constanța. Știri corecte, rapide și imparțiale din Dobrogea. Urmărește LIVE TV.",
  keywords: ["știri", "Constanța", "Dobrogea", "actualitate", "DOTTO TV", "live tv", "televiziune locală"],
  authors: [{ name: "DOTTO TV", url: SITE_URL }],
  creator: "DOTTO TV",
  publisher: "DOTTO TV",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
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
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: SITE_URL,
    siteName: "DOTTO TV",
    title: "DOTTO TV – Știri din Constanța și Dobrogea",
    description: "Televiziunea locală a județului Constanța. Știri corecte și imparțiale.",
    images: [
      {
        url: `${SITE_URL}/images/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "DOTTO TV – Televiziunea Dobrogei",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@dottotv",
    creator: "@dottotv",
    title: "DOTTO TV – Știri din Constanța și Dobrogea",
    description: "Televiziunea locală a județului Constanța.",
    images: [`${SITE_URL}/images/og-default.jpg`],
  },
  alternates: {
    canonical: SITE_URL,
    languages: { "ro-RO": SITE_URL },
    types: { "application/rss+xml": `${SITE_URL}/feed` },
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [categories, breakingNews, rates] = await Promise.all([
    getCategories().catch(() => []),
    getBreakingNews().catch(() => []),
    getExchangeRates().catch(() => ({ EUR: null, USD: null })),
  ]);

  return (
    <html lang="ro" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#3c68b2" />
        <meta name="format-detection" content="telephone=no" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body suppressHydrationWarning>
        <Script
          src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
          strategy="afterInteractive"
          defer
        />
        <Script id="onesignal-init" strategy="afterInteractive">
          {`
            window.OneSignalDeferred = window.OneSignalDeferred || [];
            window.OneSignalDeferred.push(function(OneSignal) {
              OneSignal.init({ appId: "291514f1-1094-448d-b1ef-96331a4fd342" });
            });
          `}
        </Script>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        )}
        <Providers>
          <Header categories={categories} rates={rates} />
          <div className="h-16" aria-hidden="true" />
          {breakingNews.length > 0 && <BreakingNewsTicker posts={breakingNews} />}
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <CookieBanner />
          <BackToTop />
          {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
