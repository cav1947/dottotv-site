import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dottotv.ro";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/_next/",
          "/wp-admin/",
          "/wp-login.php",
          "/cautare?*",
          "/breaking",
        ],
      },
      {
        // Permite Googlebot să acceseze tot
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/wp-admin/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
