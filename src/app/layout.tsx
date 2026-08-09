/* blog/src/app/layout.tsx
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */
/* src/app/layout.tsx */

import type { Metadata, Viewport } from "next";
import Link from "next/link";
import SoundFX from "./SoundFX";
import { SITE_URL, SITE_NAME } from "@lib/site";
// One fixed palette. Importing for side effects emits the :root token block at
// build time; see src/styles/themes.css.ts. Import order IS the cascade order.
import "@styles/themes.css";
import "@styles/fonts.css";
import "@styles/base.css";
import "@styles/layout.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "The personal blog of Clove Twilight — life updates, thoughts, and the occasional deep-dive.",
  authors: [{ name: "Clove Twilight" }],
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
  alternates: { canonical: SITE_URL },
  icons: {
    icon: [{ url: "https://m.doughmination.gay/img/avatars/favicon.png", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_NAME,
    url: SITE_URL,
    locale: "en_GB",
    images: [{ url: "https://m.doughmination.gay/img/avatars/favicon.png", alt: "Clove Twilight logo" }],
  },
  twitter: {
    card: "summary",
    site: "@DoughminCEO",
    creator: "@DoughminCEO",
  },
};

export const viewport: Viewport = {
  themeColor: "#f5a9b8",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Comic Code is served from here (see styles/fonts.css.ts). Warming
            the connection early matters because the @font-face is only
            discovered once Next's CSS chunk has parsed. */}
        <link
          rel="preconnect"
          href="https://m.doughmination.gay"
          crossOrigin=""
        />
        <link rel="dns-prefetch" href="https://m.doughmination.gay" />
      </head>
      <body>
        <div className="page">
          <nav className="site-nav">
            <Link href="/">Home</Link>
            <a href="https://doughmination.gay">Main site</a>
          </nav>
          {children}
        </div>
        <SoundFX />
      </body>
    </html>
  );
}
