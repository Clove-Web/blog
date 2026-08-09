/* blog/src/styles/fonts.css.ts
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */
/* src/styles/fonts.css.ts
 * Comic Code — the site's body/mono face, four cuts, served from the same CDN
 * as the personal site. (The DDN display fonts from the main site aren't used
 * here, so they're left out to avoid shipping unused @font-face rules.)
 */

import { globalFontFace } from "@vanilla-extract/css";

const CDN = "https://m.doughmination.gay/f";

const COMIC_CODE = [
  {
    file: "ComicCode-Regular",
    weight: 400,
    style: "normal",
  },
  {
    file: "ComicCode-Italic",
    weight: 400,
    style: "italic",
  },
  {
    file: "ComicCode-Medium",
    weight: 500,
    style: "normal",
  },
  {
    file: "ComicCode-Bold",
    weight: 700,
    style: "normal",
  },
] as const;

for (const { file, weight, style } of COMIC_CODE) {
  globalFontFace("Comic Code", {
    src: `url('${CDN}/Comic-Code/woff2/${file}.woff2') format('woff2'), url('${CDN}/Comic-Code/woff/${file}.woff') format('woff')`,
    fontWeight: weight,
    fontStyle: style,
    // swap: show fallback text immediately rather than blocking on the webfont.
    fontDisplay: "swap",
  });
}
