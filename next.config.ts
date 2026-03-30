import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  /**
   * 不要使用 `output: "export"`：本项目包含 Route Handlers（`/api/*`）等，
   * 与静态导出不兼容。
   *
   * 生产部署：OpenNext + Cloudflare Workers（`npm run deploy`）。
   */
};

initOpenNextCloudflareForDev();

export default nextConfig;
