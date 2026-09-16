import { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  const staticRoutes = [
    "",
    "maintenance",
    "scope-creep",
    "tools",
    "guides",
    "about",
    "contact",
    "privacy",
    "terms",
    "disclaimer",
  ];

  const guideRoutes = [
    "how-to-price-a-website-project",
    "website-maintenance-pricing",
    "how-to-charge-for-extra-website-changes",
    "website-revision-policy",
    "fixed-price-vs-hourly-web-development",
    "late-payment-email-template",
  ];

  const allRoutes = [
    ...staticRoutes.map((route) => `${siteUrl}/${route}`),
    ...guideRoutes.map((route) => `${siteUrl}/guides/${route}`),
  ];

  const now = new Date();

  return allRoutes.map((url) => ({
    url,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: url === siteUrl ? 1 : 0.7,
  }));
}