/* blog/src/styles/themes.css.ts
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */
/* src/styles/themes.css.ts
 * Shared palette, ported verbatim from the doughmination.gay personal site so
 * the blog reads as part of the same family.
 */

import {
  createGlobalTheme,
  createGlobalThemeContract,
  globalStyle,
} from "@vanilla-extract/css";

/** Token -> literal CSS custom-property name (accentAlt => var(--accent-alt)). */
export const vars = createGlobalThemeContract({
  accent: "accent",
  accentAlt: "accent-alt",
  success: "success",
  danger: "danger",
  warning: "warning",
  info: "info",
  rosewater: "rosewater",
  maroon: "maroon",
  peach: "peach",
  teal: "teal",
  sky: "sky",
  sapphire: "sapphire",
  lavender: "lavender",
  bgDeep: "bg-deep",
  bgRaised: "bg-raised",
  bg: "bg",
  surface: "surface",
  surfaceHi: "surface-hi",
  surfaceHigher: "surface-higher",
  textFaint: "text-faint",
  textDim: "text-dim",
  textMuted: "text-muted",
  textSoft: "text-soft",
  text: "text",
});

/**
 * One palette, applied globally — the info site's dark trans palette. Extra
 * shades are derived from seven core colours (bg #0a0b10, surface #12141c,
 * surfaceHover #1b1e2a, text #f4f6fb, muted #9aa3c2, border #232838, accent
 * #f5a9b8) so the whole thing reads as one uniform, pink-accented dark theme.
 */
createGlobalTheme(":root", vars, {
  accent: "#f5a9b8",
  accentAlt: "#d15f8c",
  success: "#f5a9b8",
  danger: "#d15f8c",
  warning: "#f5a9b8",
  info: "#9aa3c2",
  rosewater: "#f7d6e0",
  maroon: "#d15f8c",
  peach: "#f5a9b8",
  teal: "#9aa3c2",
  sky: "#9aa3c2",
  sapphire: "#6b7391",
  lavender: "#f5a9b8",
  bgDeep: "#05060a",
  bgRaised: "#0e1017",
  bg: "#0a0b10",
  surface: "#12141c",
  surfaceHi: "#1b1e2a",
  surfaceHigher: "#232838",
  textFaint: "#5b6480",
  textDim: "#6b7391",
  textMuted: "#9aa3c2",
  textSoft: "#c9cfe0",
  text: "#f4f6fb",
});
globalStyle(":root", { colorScheme: "dark" });
