import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "workers.paper.design",
      },
      {
        protocol: "https",
        hostname: "v3b.fal.media",
      },
      {
        protocol: "https",
        hostname: "ivslfjtahzkpdgoqjobh.supabase.co",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
