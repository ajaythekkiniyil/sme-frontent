import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ❌ WARNING: This only disables during build, not dev
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ❌ WARNING: This allows production builds to succeed even if there are TS errors
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "*"
      },
      {
        protocol: "https",
        hostname: "**", // allows all HTTPS domains
      },
    ],
  }
};

export default nextConfig;
