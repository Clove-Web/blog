/* blog/src/lib/posts.ts
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */
/* src/lib/posts.ts
 * Markdown-file content pipeline. Posts live in content/posts/<slug>.md, where
 * the slug is DDMMYYYY-name (the date is parsed from it, mirroring the original
 * site's convention). Frontmatter carries the rest of the metadata.
 *
 * Server-only: this reads the filesystem, so it must never be imported into a
 * "use client" module.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** Raw frontmatter as authored in the .md files. */
export interface PostFrontmatter {
  title?: string;
  excerpt?: string;
  thumbnail?: string;
  tags?: string[];
  /** When true, the body is gated behind a content warning + blur. */
  sensitive?: boolean;
  /** Warning body shown in the gate (supports inline HTML). */
  warning?: string;
  /** Optional "Transparency Note" callout rendered above the body. */
  disclaimer?: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  thumbnail?: string;
  tags: string[];
  sensitive: boolean;
  warning?: string;
  disclaimer?: string;
  /** Parsed from the slug. */
  date: { day: number; month: number; year: number; iso: string; label: string };
  timestamp: number;
  readingMinutes: number;
}

export interface Post extends PostMeta {
  /** Rendered HTML of the markdown body. */
  html: string;
}

function parseSlugDate(slug: string): PostMeta["date"] & { timestamp: number } {
  const m = /^(\d{2})(\d{2})(\d{4})-/.exec(slug);
  if (!m) {
    // Undated slug — fall back to epoch so it sorts last but never crashes.
    return { day: 0, month: 0, year: 0, iso: "", label: "", timestamp: 0 };
  }
  const [, dd, mm, yyyy] = m;
  const day = parseInt(dd, 10);
  const month = parseInt(mm, 10);
  const year = parseInt(yyyy, 10);
  const iso = `${yyyy}-${mm}-${dd}`;
  const label = `${day} ${MONTHS[month - 1] ?? ""} ${year}`;
  return {
    day,
    month,
    year,
    iso,
    label,
    timestamp: new Date(year, month - 1, day).getTime(),
  };
}

function titleFromSlug(slug: string): string {
  return slug
    .replace(/^\d{8}-/, "")
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function readingMinutes(markdown: string): number {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** All slugs (filenames without the .md extension). */
export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

function readRaw(slug: string): { data: PostFrontmatter; content: string } | null {
  const file = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  return { data: data as PostFrontmatter, content };
}

function toMeta(slug: string, fm: PostFrontmatter, content: string): PostMeta {
  const { timestamp, ...date } = parseSlugDate(slug);
  const excerpt =
    fm.excerpt ??
    content.replace(/[#>*_`~-]/g, "").trim().split("\n")[0]?.slice(0, 160) ??
    "";
  return {
    slug,
    title: fm.title ?? titleFromSlug(slug),
    excerpt,
    thumbnail: fm.thumbnail,
    tags: fm.tags ?? [],
    sensitive: fm.sensitive ?? false,
    warning: fm.warning,
    disclaimer: fm.disclaimer,
    date,
    timestamp,
    readingMinutes: readingMinutes(content),
  };
}

/** Every post's metadata, newest first. */
export function listPosts(): PostMeta[] {
  return getPostSlugs()
    .map((slug) => {
      const raw = readRaw(slug);
      return raw ? toMeta(slug, raw.data, raw.content) : null;
    })
    .filter((p): p is PostMeta => p !== null)
    .sort((a, b) => b.timestamp - a.timestamp);
}

/** A single post with its body rendered to HTML, or null if it doesn't exist. */
export function getPost(slug: string): Post | null {
  const raw = readRaw(slug);
  if (!raw) return null;
  const meta = toMeta(slug, raw.data, raw.content);
  const html = marked.parse(raw.content, { async: false });
  return { ...meta, html };
}
