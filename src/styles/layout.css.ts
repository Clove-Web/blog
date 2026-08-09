/* blog/src/styles/layout.css.ts
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */
/* src/styles/layout.css.ts
 * Shared header chrome (.pfp / .hub-header / .pronouns), ported from the
 * personal site, plus a small top nav for the standalone blog.
 */
import { globalStyle, keyframes } from "@vanilla-extract/css";
import { vars } from "./themes.css";

// Shared trans-flag gradient title, uniform across every site.
const transSlide = keyframes({
  to: { backgroundPositionX: "200%" },
});

globalStyle(".pfp", {
  width: 96,
  height: 96,
  borderRadius: "50%",
  objectFit: "cover",
  border: `3px solid ${vars.warning}`,
  boxShadow: "0 4px 18px rgba(245, 194, 231, 0.25)",
  marginBottom: "0.75rem",
});

globalStyle(".hub-header", {
  textAlign: "center",
  marginBottom: "2.25rem",
});

globalStyle(".hub-header h1", {
  margin: 0,
  fontSize: "2rem",
  fontWeight: 700,
  letterSpacing: "-0.02em",
  backgroundImage:
    "linear-gradient(90deg, #5BCEFA, #F5A9B8, #ffffff, #F5A9B8, #5BCEFA, #5BCEFA)",
  backgroundSize: "200% 100%",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  animation: `${transSlide} 6s linear infinite`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  },
});

globalStyle(".tagline", {
  margin: "0.35rem 0 0",
  color: vars.textMuted,
  fontSize: "0.95rem",
  letterSpacing: "0.04em",
  textTransform: "uppercase",
});

globalStyle(".pronouns", {
  margin: "0.35rem 0 0",
  color: vars.accentAlt,
  fontSize: "0.95rem",
  letterSpacing: "0.04em",
  textTransform: "lowercase",
});

/* ---- page shell ----------------------------------------------------------- */

/**
 * body is `display:flex` (ported from the personal site, where the chrome is
 * position:fixed). Here the nav and main are ordinary in-flow elements, so
 * without a wrapper they'd lay out side-by-side as flex siblings. This column
 * shell makes body's single flex child full-width and stacks the nav above the
 * content.
 */
globalStyle(".page", {
  width: "100%",
  display: "flex",
  flexDirection: "column",
});

/* ---- standalone blog top nav ---------------------------------------------- */

globalStyle(".site-nav", {
  width: "100%",
  maxWidth: 680,
  margin: "0 auto 1.5rem",
  display: "flex",
  gap: "1rem",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.9rem",
  position: "relative",
  zIndex: 1,
});

globalStyle(".site-nav a", {
  color: vars.textMuted,
  textDecoration: "none",
  transition: "color 0.15s ease",
});

globalStyle(".site-nav a:hover", {
  color: vars.accent,
});
