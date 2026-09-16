/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // Hosted as a GitHub Pages PROJECT site under /agencycalc/. Without these,
  // Next emits root-relative asset paths (/_next/...) and clean links (/about)
  // that 404 on Pages. assetPrefix carries every asset URL (including CSS);
  // basePath carries page links and metadata; trailingSlash emits index.html so
  // Pages can serve the cleaned URLs.
  basePath: "/agencycalc",
  assetPrefix: "/agencycalc/",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;