import type { MetadataRoute } from "next";
import { getAllPostSlugs, getCategories } from "@/lib/wordpress";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dottotv.ro";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [slugs, categories] = await Promise.all([
    getAllPostSlugs().catch(() => []),
    getCategories().catch(() => []),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/live`,
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 0.9,
    },
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${SITE_URL}/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "hourly" as const,
    priority: 0.8,
  }));

  const articlePages: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${SITE_URL}/articol/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...categoryPages, ...articlePages];
}
