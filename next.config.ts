import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // In dev, skip /_next/image optimization so replaced files in /public show immediately
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
