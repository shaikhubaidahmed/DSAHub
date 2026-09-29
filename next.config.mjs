// GitHub Pages serves the site from /<repo>, so the deploy workflow sets
// PAGES_BASE_PATH=/DSAHub. Local dev and preview builds leave it unset.
const basePath = process.env.PAGES_BASE_PATH ?? "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
