import { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  const isProduction = process.env.NODE_ENV === "production";

  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/maintenance", "/scope-creep", "/tools", "/guides", "/about", "/contact", "/privacy", "/terms", "/disclaimer", "/guides/*"],
      disallow: isProduction ? [] : ["/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}