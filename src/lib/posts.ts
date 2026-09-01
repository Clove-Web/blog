/* blog/src/lib/posts.ts
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */
/* src/lib/posts.ts
 * Markdown-file content pipeline. Posts live in content/posts/<slug>.md and the
 * filename is the URL — name it whatever reads well. Frontmatter carries the
 * metadata, including the publication `date`. A legacy DDMMYYYY-name slug still
 * supplies the date when a file has no `date:` of its own.
 *
 * Server-only: this reads the filesystem, so it must never be imported into a
 * "use client" module.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { renderMarkdown } from "./markdown";
import { AUTHOR } from "./site";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** Raw frontmatter as authored in the .md files. */
export interface PostFrontmatter {
  title?: string;
  excerpt?: string;
  /** Publication date. YAML parses an unquoted 2026-09-01 into a Date. */
  date?: string | Date;
  /** Who wrote the post. Falls back to AUTHOR when omitted. */
  user?: string;
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
  /** Byline — the frontmatter `user`, or AUTHOR when the post doesn't set one. */
  user: string;
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

type DatedMeta = PostMeta["date"] & { timestamp: number };

/** Sorts last and renders as nothing — used when a post has no usable date. */
const NO_DATE: DatedMeta = {
  day: 0,
  month: 0,
  year: 0,
  iso: "",
  label: "",
  timestamp: 0,
};

function makeDate(year: number, month: number, day: number): DatedMeta {
  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    day,
    month,
    year,
    iso: `${year}-${pad(month)}-${pad(day)}`,
    label: `${day} ${MONTHS[month - 1] ?? ""} ${year}`,
    // UTC so the sort key doesn't shift with the build machine's timezone.
    timestamp: Date.UTC(year, month - 1, day),
  };
}

/**
 * The frontmatter `date:`. YAML hands us a Date for an unquoted 2026-09-01 and a
 * string for a quoted one, so accept both.
 */
function parseFrontmatterDate(value: string | Date | undefined): DatedMeta | null {
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return null;
    // A date-only YAML value lands on UTC midnight; reading it back in UTC stops
    // a negative local offset rolling it to the previous day.
    return makeDate(
      value.getUTCFullYear(),
      value.getUTCMonth() + 1,
      value.getUTCDate(),
    );
  }
  if (typeof value === "string") {
    const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(value.trim());
    if (m) return makeDate(parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10));
  }
  return null;
}

/** Legacy DDMMYYYY-name slugs, still honoured so old files keep their dates. */
function parseSlugDate(slug: string): DatedMeta | null {
  const m = /^(\d{2})(\d{2})(\d{4})-/.exec(slug);
  if (!m) return null;
  const [, dd, mm, yyyy] = m;
  return makeDate(parseInt(yyyy, 10), parseInt(mm, 10), parseInt(dd, 10));
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
  const { timestamp, ...date } =
    parseFrontmatterDate(fm.date) ?? parseSlugDate(slug) ?? NO_DATE;
  const excerpt =
    fm.excerpt ??
    content.replace(/[#>*_`~-]/g, "").trim().split("\n")[0]?.slice(0, 160) ??
    "";
  return {
    slug,
    title: fm.title ?? titleFromSlug(slug),
    excerpt,
    user: fm.user?.trim() || AUTHOR,
    tags: (fm.tags ?? []).map((t) => String(t).trim()).filter(Boolean),
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
  const html = renderMarkdown(raw.content);
  return { ...meta, html };
}
