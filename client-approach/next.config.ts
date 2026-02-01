import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'self' https://domain-1-client-approach.vercel.app https://domain-2-client-approach.vercel.app",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
