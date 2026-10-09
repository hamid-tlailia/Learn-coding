import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML in `out/`: deployable to Vercel as-is and bundled inside the Android app (Capacitor).
  output: "export",
  trailingSlash: true,
};

export default nextConfig;
