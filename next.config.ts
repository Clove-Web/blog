/* blog/next.config.ts
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */
import type { NextConfig } from "next";
import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

/* Compiles .css.ts files to static CSS at build time — zero runtime. `mode:
 * "auto"` enables the Turbopack integration on Next >= 16 (and falls back to
 * webpack below that), so `dev`/`build` run under Turbopack while `dev:webpack`
 * stays available as an escape hatch. */
const withVanillaExtract = createVanillaExtractPlugin({
  unstable_turbopack: {
    mode: "auto",
  },
});

const nextConfig: NextConfig = {
  /* Fully static export → `next build` writes a plain HTML/CSS/JS site to
   * `out/`, which is what Cloudflare Pages serves directly (no Node runtime).
   * Every route is pre-rendered at build time via generateStaticParams. */
  output: "export",

  /* CF Pages serves static files, so Next's on-demand image optimizer isn't
   * available. The site uses plain <img> already, but this keeps next/image
   * safe if it's ever added. */
  images: { unoptimized: true },

  /* Emit /post/index.html instead of /post.html so clean URLs resolve on
   * Pages without extra redirect rules. */
  trailingSlash: true,

  reactStrictMode: true,
};

export default withVanillaExtract(nextConfig);
