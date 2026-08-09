/* blog/src/styles/pages/blog.css.ts
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */
/* src/styles/pages/blog.css.ts
 * The /blog card grid and the individual post layout, ported from the personal
 * site, extended with markdown-body element styles and the sensitive-content
 * gate (warning + disclaimer + blur reveal).
 */
import { globalStyle } from "@vanilla-extract/css";
import { vars } from "../themes.css";

/* ---- index: tag filter bar ------------------------------------------------ */

globalStyle(".filter-bar", {
  display: "flex",
  flexWrap: "wrap",
  gap: "0.5rem",
  justifyContent: "center",
  width: "100%",
  maxWidth: 960,
  margin: "0 auto",
  padding: "0 0.25rem",
  position: "relative",
  zIndex: 1,
});

globalStyle(".filter-chip", {
  appearance: "none",
  cursor: "pointer",
  border: `1px solid ${vars.surfaceHigher}`,
  background: vars.bgRaised,
  color: vars.textMuted,
  fontFamily: "inherit",
  fontSize: "0.82rem",
  fontWeight: 600,
  letterSpacing: "0.01em",
  padding: "0.4rem 0.85rem",
  borderRadius: 999,
  transition: "color 0.15s ease, border-color 0.15s ease, background 0.15s ease",
});

globalStyle(".filter-chip:hover", {
  color: vars.text,
  borderColor: vars.accent,
});

globalStyle(".filter-chip.is-active", {
  color: vars.bgDeep,
  background: vars.accent,
  borderColor: vars.accent,
});

globalStyle(".filter-chip:focus-visible", {
  outline: `2px solid ${vars.accent}`,
  outlineOffset: 2,
});

/* ---- tag hashtags (cards + post header) ----------------------------------- */

globalStyle(".blog-tags", {
  display: "flex",
  flexWrap: "wrap",
  gap: "0.4rem",
  marginTop: "0.5rem",
});

globalStyle(".blog-tags--header", {
  justifyContent: "center",
});

globalStyle(".blog-tag", {
  fontSize: "0.78rem",
  color: vars.textDim,
  textDecoration: "none",
  transition: "color 0.15s ease",
});

globalStyle("a.blog-tag:hover", {
  color: vars.accent,
});

/* ---- index: card grid ----------------------------------------------------- */

globalStyle("#blog-cards", {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
  gap: "1.25rem",
  width: "100%",
  maxWidth: 960,
  margin: "1.5rem auto 0",
  padding: "0 0.25rem",
  position: "relative",
  zIndex: 1,
  "@media": {
    "(max-width: 480px)": { gridTemplateColumns: "1fr" },
  },
});

globalStyle(".blog-card", {
  display: "flex",
  flexDirection: "column",
  textDecoration: "none",
  color: vars.text,
  background: vars.bgRaised,
  border: `1px solid ${vars.surface}`,
  borderRadius: 14,
  overflow: "hidden",
  transition:
    "transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease",
});

globalStyle(".blog-card:hover, .blog-card:focus-visible", {
  transform: "translateY(-3px)",
  borderColor: vars.accent,
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.25)",
});

globalStyle(".blog-card:focus-visible", {
  outline: `2px solid ${vars.accent}`,
  outlineOffset: 2,
});

globalStyle(".blog-card-thumb", {
  width: "100%",
  aspectRatio: "16 / 9",
  overflow: "hidden",
  background: vars.bgDeep,
});

globalStyle(".blog-card-thumb img", {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
});

globalStyle(".blog-card-body", {
  display: "flex",
  flexDirection: "column",
  gap: "0.4rem",
  padding: "1rem 1.1rem 1.2rem",
});

globalStyle(".blog-card-date", {
  fontSize: "0.78rem",
  fontWeight: 600,
  letterSpacing: "0.02em",
  textTransform: "uppercase",
  color: vars.textMuted,
});

globalStyle(".blog-card-title", {
  margin: 0,
  fontSize: "1.15rem",
  lineHeight: 1.3,
  color: vars.text,
});

/** Clamped to 3 lines so cards stay a uniform height. */
globalStyle(".blog-card-excerpt", {
  margin: 0,
  fontSize: "0.92rem",
  lineHeight: 1.45,
  color: vars.textMuted,
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
});

/** Small pink "sensitive" flag on cards whose posts are gated. */
globalStyle(".blog-card-flag", {
  alignSelf: "flex-start",
  marginTop: "0.15rem",
  padding: "0.15rem 0.5rem",
  borderRadius: 999,
  fontSize: "0.7rem",
  fontWeight: 700,
  letterSpacing: "0.03em",
  textTransform: "uppercase",
  color: vars.danger,
  border: `1px solid ${vars.danger}`,
  background: "rgba(209, 95, 140, 0.12)",
});

globalStyle(".blog-empty", {
  gridColumn: "1 / -1",
  textAlign: "center",
  padding: "2rem 1rem",
  color: vars.textMuted,
  fontSize: "0.95rem",
});

/* ---- individual post ------------------------------------------------------ */

globalStyle("body:has(.blog-contents)", {
  height: "auto",
  minHeight: "100dvh",
  overflowY: "auto",
  alignItems: "flex-start",
  paddingTop: "2.5rem",
  paddingBottom: "2.5rem",
});

globalStyle(".blog-header", {
  width: "100%",
  maxWidth: 680,
  margin: "0 auto 2rem",
  textAlign: "center",
});

globalStyle(".blog-header h1", {
  margin: 0,
  fontSize: "2rem",
  fontWeight: 700,
  color: vars.accent,
});

globalStyle(".blog-header .blog-meta", {
  marginTop: "0.35rem",
  color: vars.textMuted,
  fontSize: "0.85rem",
  letterSpacing: "0.02em",
});

globalStyle(".blog-contents", {
  width: "100%",
  maxWidth: 680,
  margin: "0 auto",
  padding: "0 0.5rem",
  textAlign: "left",
  color: vars.text,
  lineHeight: 1.7,
  position: "relative",
  zIndex: 1,
});

/* ---- markdown body elements ----------------------------------------------- */

globalStyle(".blog-contents p", { margin: "0 0 1.1rem" });

globalStyle(".blog-contents img", {
  maxWidth: "100%",
  borderRadius: 12,
  margin: "1rem 0",
});

globalStyle(".blog-contents h2, .blog-contents h3", {
  color: vars.accent,
  margin: "1.6rem 0 0.6rem",
});

globalStyle(".blog-contents h2", { fontSize: "1.5rem" });
globalStyle(".blog-contents h3", { fontSize: "1.2rem" });

globalStyle(".blog-contents a", { color: vars.info });
globalStyle(".blog-contents a:hover", { textDecoration: "underline" });

globalStyle(".blog-contents ul, .blog-contents ol", {
  margin: "0 0 1.1rem",
  paddingLeft: "1.4rem",
});

globalStyle(".blog-contents li", { margin: "0.3rem 0" });

globalStyle(".blog-contents blockquote", {
  margin: "1.2rem 0",
  padding: "0.5rem 1.1rem",
  borderLeft: `4px solid ${vars.accentAlt}`,
  background: "rgba(255, 255, 255, 0.03)",
  color: vars.textSoft,
  fontStyle: "italic",
});

globalStyle(".blog-contents code", {
  fontFamily: "'Comic Code', monospace",
  fontSize: "0.9em",
  background: vars.surface,
  padding: "0.15rem 0.4rem",
  borderRadius: 6,
});

globalStyle(".blog-contents pre", {
  margin: "1.2rem 0",
  padding: "1rem 1.1rem",
  background: vars.bgDeep,
  border: `1px solid ${vars.surface}`,
  borderRadius: 10,
  overflowX: "auto",
  lineHeight: 1.5,
});

globalStyle(".blog-contents pre code", {
  background: "none",
  padding: 0,
  fontSize: "0.85rem",
});

globalStyle(".blog-contents hr", {
  border: "none",
  borderTop: `1px solid ${vars.surface}`,
  margin: "2rem 0",
});

/* ---- sensitive-content warning callout ------------------------------------ */

/**
 * A high-visibility content warning shown before sensitive posts. Uses the
 * danger token, a thick left rule, and a tinted panel so it clearly reads as a
 * "stop and read this first" block rather than body copy.
 */
globalStyle(".warning", {
  width: "100%",
  maxWidth: 680,
  margin: "2.5rem auto 2.5rem",
  padding: "1.15rem 1.25rem",
  borderRadius: 12,
  border: `1px solid ${vars.danger}`,
  borderLeft: `6px solid ${vars.danger}`,
  background: "rgba(209, 95, 140, 0.12)",
  color: vars.text,
  fontSize: "0.95rem",
  lineHeight: 1.6,
  boxShadow: "0 4px 16px rgba(209, 95, 140, 0.2)",
  /* Keeps the callout clear of the top when linked via #content-warning. */
  scrollMarginTop: "2rem",
});

globalStyle(".warning b", {
  color: vars.danger,
  letterSpacing: "0.01em",
});

globalStyle(".warning-actions", {
  marginTop: "1rem",
});

globalStyle(".warning-proceed", {
  appearance: "none",
  cursor: "pointer",
  border: `1px solid ${vars.danger}`,
  background: vars.danger,
  color: "#ffffff",
  fontWeight: 700,
  fontSize: "0.9rem",
  padding: "0.6rem 1.15rem",
  borderRadius: 999,
  transition: "transform 0.15s ease, opacity 0.15s ease",
});

globalStyle(".warning-proceed:hover", {
  transform: "translateY(-1px)",
  opacity: 0.92,
});

globalStyle(".warning-proceed:focus-visible", {
  outline: `2px solid ${vars.accent}`,
  outlineOffset: 2,
});

/* ---- blurred gate for sensitive post bodies ------------------------------- */

/**
 * The post body is blurred and non-interactive until the reader clicks
 * "proceed" in the content warning, at which point `.is-revealed` clears it.
 */
globalStyle(".blog-gate-body", {
  filter: "blur(12px)",
  pointerEvents: "none",
  userSelect: "none",
  transition: "filter 0.4s ease",
});

globalStyle(".blog-gate-body.is-revealed", {
  filter: "none",
  pointerEvents: "auto",
  userSelect: "auto",
});

/* ---- GitHub-style "transparency note" disclaimer callout ------------------ */

/**
 * A low-key informational callout in the style of GitHub's `> [!NOTE]` blocks:
 * a tinted panel with a coloured left rule and a small label above the text.
 */
globalStyle(".disclaimer", {
  width: "100%",
  maxWidth: 680,
  margin: "1.5rem auto",
  padding: "0.85rem 1.1rem",
  borderRadius: 8,
  borderLeft: `4px solid ${vars.info}`,
  background: "rgba(154, 163, 194, 0.12)",
  color: vars.textMuted,
  fontSize: "0.88rem",
  lineHeight: 1.55,
});

globalStyle(".disclaimer::before", {
  content: '"ℹ Transparency Note"',
  display: "block",
  marginBottom: "0.3rem",
  fontWeight: 700,
  fontSize: "0.82rem",
  letterSpacing: "0.02em",
  color: vars.info,
});
