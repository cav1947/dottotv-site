import type { MetadataRoute } from "next";
import { getAllPostSlugs, getCategories } from "@/lib/wordpress";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dottotv.ro";

const STATIC_PAGES: MetadataRoute.Sitemap = [
  { url: SITE_URL,                                     priority: 1.0, changeFrequency: "hourly"  },
  { url: `${SITE_URL}/live`,                           priority: 0.9, changeFrequency: "always"  },
  { url: `${SITE_URL}/despre-noi`,                     priority: 0.7, changeFrequency: "monthly" },
  { url: `${SITE_URL}/contact`,                        priority: 0.6, changeFrequency: "monthly" },
  { url: `${SITE_URL}/publicitate`,                    priority: 0.5, changeFrequency: "monthly" },
  { url: `${SITE_URL}/termeni-si-conditii`,            priority: 0.4, changeFrequency: "yearly"  },
  { url: `${SITE_URL}/politica-de-confidentialitate`,  priority: 0.4, changeFrequency: "yearly"  },
  { url: `${SITE_URL}/politica-de-cookies`,            priority: 0.4, changeFrequency: "yearly"  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [slugs, categories] = await Promise.all([
    getAllPostSlugs().catch(() => [] as string[]),
    getCategories().catch(() => []),
  ]);

  const now = new Date();

  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${SITE_URL}/${cat.slug}`,
    lastModified: now,
    changeFrequency: "hourly" as const,
    priority: 0.6,
  }));

  const articlePages: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${SITE_URL}/articol/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const staticWithDate: MetadataRoute.Sitemap = STATIC_PAGES.map((p) => ({
    ...p,
    lastModified: now,
  }));

  return [...staticWithDate, ...categoryPages, ...articlePages];
}
