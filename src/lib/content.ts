import { marked } from "marked";

/**
 * Minimal YAML frontmatter parser. Handles `key: "value"` and `key: value`
 * pairs (no nesting, no arrays). Sufficient for our content schema and avoids
 * pulling Node-only deps into the Cloudflare Worker bundle.
 */
function parseFrontmatter(raw: string): { data: Record<string, string>; content: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!match) return { data: {}, content: raw };
  const [, fm, body] = match;
  const data: Record<string, string> = {};
  for (const line of fm.split(/\r?\n/)) {
    const m = /^([A-Za-z0-9_-]+)\s*:\s*(.*)$/.exec(line);
    if (!m) continue;
    let value = m[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[m[1]] = value;
  }
  return { data, content: body };
}

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  /** First image found in the post body — used for listings and social previews. */
  leadImage?: { src: string; alt: string };
}

export interface Post extends PostMeta {
  html: string;
  readingMinutes: number;
}

export interface PageDoc {
  slug: string;
  title: string;
  description: string;
  html: string;
}

// Eager-load all markdown at build time so it ships in the bundle (works on
// edge runtimes where there is no filesystem). `?raw` gives us the file text.
const POST_FILES = import.meta.glob("/content/posts/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const PAGE_FILES = import.meta.glob("/content/pages/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

// Eager-load post images so Vite emits them as hashed assets and gives us
// the public URL to substitute into rendered Markdown. Markdown authors
// reference images using the source path (e.g. `/src/assets/posts/foo.jpg`
// or `/src/assets/post-bar.jpg` under `src/assets/`).
const POST_IMAGES_IN_POSTS_DIR = import.meta.glob("/src/assets/posts/*.{jpg,jpeg,png,webp,avif}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;
const POST_IMAGES_IN_ASSETS_ROOT = import.meta.glob("/src/assets/post-*.{jpg,jpeg,png,webp,avif}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;
const POST_IMAGES = { ...POST_IMAGES_IN_POSTS_DIR, ...POST_IMAGES_IN_ASSETS_ROOT };

function slugFromPath(path: string): string {
  const file = path.split("/").pop() ?? "";
  return file.replace(/\.md$/, "");
}

function configureMarked() {
  marked.setOptions({ gfm: true, breaks: false });
}
configureMarked();

/**
 * Rewrites `src` attributes that point at source-tree image paths to the
 * Vite-bundled URL for the same asset. Leaves external URLs and already-
 * resolved hashed asset URLs untouched.
 */
function rewriteImageSources(html: string): string {
  return html.replace(
    /<img\b([^>]*?)\bsrc\s*=\s*["']([^"']+)["']([^>]*)>/gi,
    (full, pre, src, post) => {
      const resolved = POST_IMAGES[src];
      if (!resolved) return full;
      return `<img${pre}src="${resolved}"${post}>`;
    },
  );
}

function estimateReadingMinutes(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

/**
 * Extracts the first <img> tag from rendered HTML so listings can show a
 * preview without needing a separate `cover:` frontmatter field. Returns the
 * src and alt text, or undefined if the post has no images.
 */
function extractLeadImage(html: string): { src: string; alt: string } | undefined {
  const imgMatch = /<img\b[^>]*>/i.exec(html);
  if (!imgMatch) return undefined;
  const tag = imgMatch[0];
  const srcMatch = /\bsrc\s*=\s*["']([^"']+)["']/i.exec(tag);
  if (!srcMatch) return undefined;
  const altMatch = /\balt\s*=\s*["']([^"']*)["']/i.exec(tag);
  return { src: srcMatch[1], alt: altMatch?.[1] ?? "" };
}

let cachedPosts: Post[] | null = null;

export function getAllPosts(): Post[] {
  if (cachedPosts) return cachedPosts;
  const posts: Post[] = Object.entries(POST_FILES).map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw);
    const slug = slugFromPath(path);
    const html = rewriteImageSources(marked.parse(content) as string);
    return {
      slug,
      title: data.title ?? slug,
      description: data.description ?? "",
      date: data.date ?? "",
      author: data.author ?? "Techno Homesteading",
      category: data.category ?? "Resource",
      leadImage: extractLeadImage(html),
      html,
      readingMinutes: estimateReadingMinutes(content),
    };
  });
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  cachedPosts = posts;
  return posts;
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getAllPostSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

let cachedPages: Map<string, PageDoc> | null = null;

function loadPages(): Map<string, PageDoc> {
  if (cachedPages) return cachedPages;
  const map = new Map<string, PageDoc>();
  for (const [path, raw] of Object.entries(PAGE_FILES)) {
    const { data, content } = parseFrontmatter(raw);
    const slug = slugFromPath(path);
    map.set(slug, {
      slug,
      title: data.title ?? slug,
      description: data.description ?? "",
      html: marked.parse(content) as string,
    });
  }
  cachedPages = map;
  return map;
}

export function getPage(slug: string): PageDoc | undefined {
  return loadPages().get(slug);
}

export function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
