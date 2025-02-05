import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "p2.trrsf.com",
      },
      {
        protocol: "https",
        hostname: "static.itdg.com.br",
      },
      {
        protocol: "https",
        hostname: "blog.gen.com.br",
      },
    ],
  },
};

export default nextConfig;
