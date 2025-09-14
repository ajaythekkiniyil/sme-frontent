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
    domains: ['127.0.0.1', 'localhost', 'api.myapp.com', "*"]
  }
};

export default nextConfig;
