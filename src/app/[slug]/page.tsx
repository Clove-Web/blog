/* blog/src/app/[slug]/page.tsx
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */
/* src/app/[slug]/page.tsx — individual post */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SensitiveGate from "@scripts/SensitiveGate";
import Link from "next/link";
import { getPost, getPostSlugs } from "@lib/posts";
import { tagSlug, tagHash } from "@lib/tags";
import { SITE_URL, SITE_NAME, AVATAR } from "@lib/site";
import "@styles/pages/blog.css";

/** Pre-render every post at build time — the site is fully static. */
export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const url = `${SITE_URL}/${slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      siteName: SITE_NAME,
      title: post.title,
      description: post.excerpt,
      url,
      locale: "en_GB",
      images: [{ url: post.thumbnail ?? AVATAR, alt: `${post.title} thumbnail` }],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const body = (
    <>
      {post.disclaimer ? (
        <div
          className="disclaimer"
          dangerouslySetInnerHTML={{ __html: post.disclaimer }}
        />
      ) : null}
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </>
  );

  return (
    <main className="blog-contents">
      <header className="blog-header">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="pfp" src={AVATAR} alt="Clove Twilight avatar" />
        <h1>{post.title}</h1>
        <p className="blog-meta">
          {post.date.label} · {post.readingMinutes} min read
        </p>
        {post.tags.length > 0 ? (
          <div className="blog-tags blog-tags--header">
            {post.tags.map((t) => (
              <Link key={t} className="blog-tag" href={`/?tag=${tagSlug(t)}`}>
                {tagHash(t)}
              </Link>
            ))}
          </div>
        ) : null}
      </header>

      {post.sensitive ? (
        <SensitiveGate
          warning={
            <span
              dangerouslySetInnerHTML={{
                __html:
                  post.warning ??
                  "<b>⚠ Warning:</b> This post contains sensitive topics.",
              }}
            />
          }
        >
          {body}
        </SensitiveGate>
      ) : (
        body
      )}
    </main>
  );
}
