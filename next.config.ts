import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "form-action 'self' https://*.netlify.app",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
