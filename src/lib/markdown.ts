/* blog/src/lib/markdown.ts
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */
/* src/lib/markdown.ts
 * The markdown renderer and its extensions. Kept apart from posts.ts because
 * `marked.use()` mutates the shared instance — doing that once, at import time,
 * from a single module keeps the configuration predictable.
 */
import { marked, type TokenizerAndRendererExtension } from "marked";

/**
 * Discord-style subtext: a line beginning with `-# ` renders small and muted,
 * for asides and footnotes under the main text.
 *
 * This has to be an extension rather than a post-processing pass, because
 * marked would otherwise read `-# note` as a bullet list whose item holds an
 * `# note` heading. Custom tokenizers run ahead of the built-in ones.
 */
const subtext: TokenizerAndRendererExtension = {
  name: "subtext",
  level: "block",
  start(src) {
    return src.match(/^-# /m)?.index;
  },
  tokenizer(src) {
    const m = /^-#[ \t]+([^\n]*)(?:\n|$)/.exec(src);
    if (!m) return;
    return {
      type: "subtext",
      raw: m[0],
      // Inline tokens, so **bold**, links and the rest still work inside it.
      tokens: this.lexer.inlineTokens(m[1].trim()),
    };
  },
  renderer(token) {
    return `<p class="subtext">${this.parser.parseInline(token.tokens ?? [])}</p>\n`;
  },
};

marked.use({ extensions: [subtext] });

/** Render a post body to HTML. */
export function renderMarkdown(markdown: string): string {
  return marked.parse(markdown, { async: false });
}
