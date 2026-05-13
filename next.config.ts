import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  images: {
    /** W dev unikamy „zabetonowanego” podglądu po nadpisaniu tego samego pliku w `public/`. */
    ...(isDev ? { minimumCacheTTL: 0 } : {}),
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
