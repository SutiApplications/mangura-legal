import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const siteUrl = "https://sutiapplications.github.io/mangura-legal";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date("2026-08-06"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/privacy/`,
      lastModified: new Date("2026-08-06"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/terms/`,
      lastModified: new Date("2026-08-06"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/sources/`,
      lastModified: new Date("2026-09-19"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
