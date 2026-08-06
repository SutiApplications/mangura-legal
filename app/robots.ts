import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: `${basePath}/`,
    },
    sitemap: "https://sutiapplications.github.io/mangura-legal/sitemap.xml",
  };
}
