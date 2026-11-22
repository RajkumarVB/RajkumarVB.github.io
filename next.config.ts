import type { NextConfig } from "next";

// Static export: `next build` writes plain HTML/CSS/JS to ./out,
// which GitHub Pages serves. No server, so no API routes or SSR.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true, // /about -> /about/index.html, which Pages serves cleanly
  images: { unoptimized: true }, // Next's image optimizer needs a server
};

export default nextConfig;
