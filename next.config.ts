import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
  },
  async redirects() {
    return [
      { source: "/about-samuel", destination: "/about", permanent: true },
      {
        source: "/meet-alice-and-james",
        destination: "/alice-and-james",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
