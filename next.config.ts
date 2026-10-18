import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Every page is static, so the site is exported as plain files and served
  // straight from cPanel's public_html. The host can't keep a Node container
  // running (CloudLinux with cgroup v2 breaks ea-podman's systemd services).
  // Cache Components is left off: it does nothing without a server, and it
  // rejects the `dynamic = "force-static"` that export mode needs on routes.
  output: "export",
  images: {
    // A static export has no server to resize images, so the photos are served
    // as they are. They are small already (400–1000px).
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
