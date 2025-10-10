import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n-config.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    // @ts-expect-error: outputFileTracingInclude is not yet in type definitions
    outputFileTracingInclude: {
      // Ensure the SQLite DB is included in the serverless bundle
      "/api/**": ["./prisma/dev.db"],
    },
  },
};

export default withNextIntl(nextConfig);
