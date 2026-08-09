/* blog/src/styles/base.css.ts
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */
/* src/styles/base.css.ts
 * Global reset, the custom cursor set, and the background watermark layers.
 * Ported from the personal site so the blog shares the same feel.
 */
import { globalStyle } from "@vanilla-extract/css";
import { vars } from "./themes.css";

const cursor = (file: string, fallback: string, hotspot = "") =>
  `url('https://m.doughmination.gay/img/cursor/${file}.png')${hotspot ? " " + hotspot : ""}, ${fallback}`;

const PAGE_BG = `linear-gradient(135deg, ${vars.bg} 0%, ${vars.bgRaised} 60%, ${vars.bgDeep} 100%)`;

/* ---- reset ---------------------------------------------------------------- */

globalStyle("*", {
  boxSizing: "border-box",
});

/**
 * The default cursor lives on <html> so it INHERITS down the tree. Setting it on
 * `*` would paint it directly onto every element, which beats inheritance and
 * makes children of links/buttons fall back to the default cursor.
 */
globalStyle("html", {
  cursor: cursor("default_0", "auto", "3 3"),
  background: PAGE_BG,
});

globalStyle("html, body", {
  height: "100%",
  overflowX: "hidden",
  overflowY: "auto",
});

globalStyle("body", {
  fontFamily: "'Comic Code', sans-serif",
  display: "flex",
  justifyContent: "center",
  // `safe` stops centred content being clipped when it overflows the viewport.
  alignItems: "safe center",
  minHeight: ["100vh", "100dvh"],
  margin: 0,
  padding: "1.5rem 1rem",
  background: PAGE_BG,
  color: vars.text,
});

/* ---- custom cursors ------------------------------------------------------- */

globalStyle(
  'a, button, [role="button"], [role="link"], [data-href], label[for], select, summary',
  { cursor: cursor("pointer_0", "pointer") },
);

globalStyle(
  'input:not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]',
  { cursor: cursor("text_0", "text") },
);

globalStyle(".is-loading", { cursor: "wait" });
globalStyle(".is-progress", { cursor: "progress" });

globalStyle('[title]:not(a):not(button), .help', {
  cursor: cursor("help_0", "help"),
});

globalStyle(':disabled, [disabled], [aria-disabled="true"]', {
  cursor: cursor("not-allowed_0", "not-allowed"),
});

/* ---- background watermarks ------------------------------------------------ */

/** Estrogen watermark blended into the background. */
globalStyle("body::before", {
  content: '""',
  position: "fixed",
  inset: 0,
  background: "url(https://m.doughmination.gay/img/bg/estrogen.svg) center / cover no-repeat",
  filter:
    "invert(86%) sepia(8%) saturate(900%) hue-rotate(190deg) brightness(105%)",
  opacity: 0.05,
  pointerEvents: "none",
  zIndex: 0,
});

/** Miku chibi tucked into the bottom-right corner. */
globalStyle("body::after", {
  content: '""',
  position: "fixed",
  right: "0.5rem",
  bottom: "0.5rem",
  width: "clamp(96px, 14vw, 168px)",
  aspectRatio: "564 / 547",
  background: "url(https://m.doughmination.gay/img/bg/miku.png) center / contain no-repeat",
  opacity: 0.18,
  pointerEvents: "none",
  zIndex: 0,
});
