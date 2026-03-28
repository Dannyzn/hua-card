import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for Cloudflare Pages with @cloudflare/next-on-pages
  output: "export",
};

export default nextConfig;
