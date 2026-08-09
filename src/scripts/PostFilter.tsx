/* blog/src/scripts/PostFilter.tsx
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */
/* src/scripts/PostFilter.tsx
 * Client-side tag filter for the blog index. Renders a chip bar plus the card
 * grid, and narrows the visible cards to the selected tag. The initial tag is
 * read from the ?tag= query after mount, so the index page itself stays static.
 */

"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { PostMeta } from "@lib/posts"; // type-only: erased at build, no fs pulled client-side
import { tagSlug, tagHash } from "@lib/tags";

const ALL = "all";

export default function PostFilter({
  posts,
  categories,
}: {
  posts: PostMeta[];
  categories: readonly string[];
}) {
  const [active, setActive] = useState<string>(ALL);

  // Seed from ?tag= after mount (keeps first render identical to the server's).
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("tag");
    if (t) setActive(t);
  }, []);

  // Chips: canonical categories first, then any extra tags posts actually use.
  const chips = useMemo(() => {
    const seen = new Map<string, string>(); // slug -> label
    for (const c of categories) seen.set(tagSlug(c), c);
    for (const p of posts) {
      for (const t of p.tags) {
        const s = tagSlug(t);
        if (!seen.has(s)) seen.set(s, t);
      }
    }
    return [...seen.entries()].map(([slug, label]) => ({ slug, label }));
  }, [posts, categories]);

  const visible =
    active === ALL
      ? posts
      : posts.filter((p) => p.tags.map(tagSlug).includes(active));

  function select(slug: string) {
    setActive(slug);
    const url = slug === ALL ? "/" : `/?tag=${slug}`;
    window.history.replaceState(null, "", url);
  }

  return (
    <>
      <div className="filter-bar" role="group" aria-label="Filter posts by tag">
        <button
          type="button"
          className={active === ALL ? "filter-chip is-active" : "filter-chip"}
          aria-pressed={active === ALL}
          onClick={() => select(ALL)}
        >
          All
        </button>
        {chips.map(({ slug, label }) => (
          <button
            key={slug}
            type="button"
            className={active === slug ? "filter-chip is-active" : "filter-chip"}
            aria-pressed={active === slug}
            onClick={() => select(slug)}
          >
            {label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div id="blog-cards">
          <p className="blog-empty">Nothing tagged that yet — check back soon!</p>
        </div>
      ) : (
        <div id="blog-cards">
          {visible.map((post) => (
            <Link key={post.slug} className="blog-card" href={`/${post.slug}`}>
              <div className="blog-card-body">
                <time className="blog-card-date" dateTime={post.date.iso}>
                  {post.date.label} · {post.readingMinutes} min read
                </time>
                <h3 className="blog-card-title">{post.title}</h3>
                {post.excerpt ? (
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                ) : null}
                {post.sensitive ? (
                  <span className="blog-card-flag">⚠ Sensitive</span>
                ) : null}
                {post.tags.length > 0 ? (
                  <div className="blog-tags">
                    {post.tags.map((t) => (
                      <span key={t} className="blog-tag">
                        {tagHash(t)}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
