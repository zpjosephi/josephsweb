import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 90 is for the people photos, which are already WhatsApp-compressed at the source
    qualities: [75, 90],
  },
};

export default nextConfig;
