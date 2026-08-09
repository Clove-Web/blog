/* blog/src/app/page.tsx
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */
/* src/app/page.tsx — blog index */

import PostFilter from "@scripts/PostFilter";
import { listPosts } from "@lib/posts";
import { CATEGORIES } from "@lib/tags";
import { SITE_TAGLINE, AVATAR } from "@lib/site";
import "@styles/pages/blog.css";

export default function BlogIndexPage() {
  const posts = listPosts();

  return (
    <main>
      <header className="hub-header">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="pfp" src={AVATAR} alt="Clove Twilight avatar" />
        <h1>Blog</h1>
        <p className="pronouns">{SITE_TAGLINE}</p>
      </header>

      <PostFilter posts={posts} categories={CATEGORIES} />
    </main>
  );
}
