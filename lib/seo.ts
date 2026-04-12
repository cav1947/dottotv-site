// ─── SEO helpers centralizate pentru DottoTV ─────────────────────────────────

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dottotv.ro";
const SITE_NAME = "DOTTO TV";

// ─── Organization schema (folosit global) ────────────────────────────────────

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DOTTO TV",
  alternateName: "DottoTV",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/Sigla-DOTTO-TV---alb.png`,
    width: 480,
    height: 120,
  },
  foundingDate: "2013",
  description:
    "Televiziunea locală a județului Constanța. Știri corecte, rapide și imparțiale din Dobrogea.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Bd. Aurel Vlaicu nr. 144, etaj 1",
    addressLocality: "Constanța",
    addressRegion: "Constanța",
    addressCountry: "RO",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+40752230060",
    contactType: "customer service",
    availableLanguage: "Romanian",
  },
  sameAs: [
    "https://www.facebook.com/dottotv",
    "https://x.com/DOTTOTV",
    "https://www.instagram.com/dottotv.ro/",
    "https://www.youtube.com/@DottoTV4K",
    "https://www.tiktok.com/@dottotv.ro",
    "https://www.linkedin.com/company/dotto-tv/",
  ],
};

// ─── WebSite schema cu SearchAction ──────────────────────────────────────────

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "ro-RO",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/cautare?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

// ─── NewsArticle schema ───────────────────────────────────────────────────────

export function buildNewsArticleSchema(params: {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
  content: string;
}) {
  const { title, description, url, imageUrl, datePublished, dateModified, authorName, content } =
    params;
  const articleBody = content.replace(/<[^>]*>/g, "").slice(0, 200);

  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title.slice(0, 110),
    description,
    url,
    datePublished,
    dateModified,
    inLanguage: "ro-RO",
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/Sigla-DOTTO-TV---alb.png`,
        width: 480,
        height: 120,
      },
    },
    ...(imageUrl && {
      image: {
        "@type": "ImageObject",
        url: imageUrl,
        width: 1200,
        height: 630,
      },
    }),
    articleBody,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}

// ─── BreadcrumbList schema ────────────────────────────────────────────────────

export function buildBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ─── Alt text automat din titlu ───────────────────────────────────────────────

export function buildAltText(
  provided: string | undefined,
  title: string,
  categoryName?: string
): string {
  if (provided && provided.trim().length > 3) return provided;
  const clean = title.replace(/<[^>]*>/g, "").trim();
  return categoryName ? `${clean} – ${categoryName} | DOTTO TV` : `${clean} | DOTTO TV`;
}

// ─── LocalBusiness schema (pentru pagina Contact) ────────────────────────────

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#localbusiness`,
  name: "DOTTO TV",
  url: SITE_URL,
  image: `${SITE_URL}/images/og-default.jpg`,
  logo: `${SITE_URL}/Sigla-DOTTO-TV---alb.png`,
  description:
    "Televiziunea locală a județului Constanța. Știri corecte, rapide și imparțiale din Dobrogea.",
  telephone: "+40752230060",
  email: "redactie@dottotv.ro",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Bd. Aurel Vlaicu nr. 144, etaj 1",
    addressLocality: "Constanța",
    addressRegion: "Constanța",
    postalCode: "900165",
    addressCountry: "RO",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 44.18022,
    longitude: 28.61802,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  sameAs: [
    "https://www.facebook.com/dottotv",
    "https://x.com/DOTTOTV",
    "https://www.instagram.com/dottotv.ro/",
    "https://www.youtube.com/@DottoTV4K",
    "https://www.tiktok.com/@dottotv.ro",
    "https://www.linkedin.com/company/dotto-tv/",
  ],
};

// ─── BroadcastService schema (pentru pagina Live) ────────────────────────────

export const broadcastServiceSchema = {
  "@context": "https://schema.org",
  "@type": "BroadcastService",
  name: "DOTTO TV LIVE",
  url: `${SITE_URL}/live`,
  description:
    "Transmisie live DOTTO TV — știri în direct din Constanța și România.",
  broadcastDisplayName: "DOTTO TV",
  inLanguage: "ro-RO",
  broadcaster: {
    "@type": "Organization",
    name: "DOTTO TV",
    url: SITE_URL,
  },
};

// ─── WebPage schema (pentru pagini statice: termeni, politici etc.) ───────────

export function buildWebPageSchema(params: {
  url: string;
  name: string;
  description: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${params.url}#webpage`,
    url: params.url,
    name: params.name,
    description: params.description,
    inLanguage: "ro-RO",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    ...(params.dateModified && { dateModified: params.dateModified }),
  };
}

export { SITE_URL, SITE_NAME };
