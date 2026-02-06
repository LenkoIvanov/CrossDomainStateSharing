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
              "frame-ancestors 'self' https://sub1.lenko.space https://sub2.lenko.space",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
