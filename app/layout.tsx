import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import Providers from "./providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BreakingNewsTicker from "@/components/BreakingNewsTicker";
import CookieBanner from "@/components/CookieBanner";
import BackToTop from "@/components/BackToTop";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { getCategories, getBreakingNews } from "@/lib/wordpress";
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
  const [categories, breakingNews] = await Promise.all([
    getCategories().catch(() => []),
    getBreakingNews().catch(() => []),
  ]);

  return (
    <html lang="ro" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Inter:wght@400;500;600;700&display=swap"
          as="style"
        />
        <meta name="theme-color" content="#3c68b2" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="dns-prefetch" href="//dottotv.ro" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
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
          <Header categories={categories} />
          {breakingNews.length > 0 && <BreakingNewsTicker posts={breakingNews} />}
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <CookieBanner />
          <BackToTop />
          {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
        </Providers>
      </body>
    </html>
  );
}
