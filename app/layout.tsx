import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getSiteUrl, SITE_NAME } from "@/lib/site";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE_NAME} — Pricing and Planning Calculators for Freelancers`,
    template: `%s — ${SITE_NAME}`,
  },
  description:
    "Practical calculators and guides for freelance web developers and small agencies: project quotes, website maintenance pricing, and extra-scope change fees.",
  openGraph: {
    siteName: SITE_NAME,
    url: siteUrl,
    type: "website",
    title: `${SITE_NAME} — Pricing and Planning Calculators for Freelancers`,
    description:
      "Practical calculators and guides for freelance web developers and small agencies: project quotes, website maintenance pricing, and extra-scope change fees.",
  },
  // HilltopAds website verification tag. Rendered into <head> on every page,
  // including the homepage. Verification only — no ad-zone script yet.
  other: {
    "6eefe13dfbc5b13e0660bf3325dfbed78fb89807": "6eefe13dfbc5b13e0660bf3325dfbed78fb89807",
  },
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: siteUrl,
};

const webSiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: siteUrl,
};

const jsonLd = [organizationLd, webSiteLd];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}