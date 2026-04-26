import { marked } from "marked";
import heroVilla from "@/assets/hero-villa.jpg";
import postLivingRoom from "@/assets/post-living-room.jpg";
import postCourtyard from "@/assets/post-courtyard.jpg";
import postStaircase from "@/assets/post-staircase.jpg";
import postKitchen from "@/assets/post-kitchen.jpg";

/**
 * Map of cover-image keys (referenced in markdown frontmatter) to bundled
 * asset URLs. Add a new entry here when adding a new image to src/assets.
 */
const COVER_IMAGES: Record<string, string> = {
  "hero-villa": heroVilla,
  "post-living-room": postLivingRoom,
  "post-courtyard": postCourtyard,
  "post-staircase": postStaircase,
  "post-kitchen": postKitchen,
};

export function resolveCover(key: string | undefined): string | undefined {
  if (!key) return undefined;
  return COVER_IMAGES[key];
}

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
      (value.startsWith("\"") && value.endsWith("\"")) ||
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
  cover?: string;
  coverUrl?: string;
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

function slugFromPath(path: string): string {
  const file = path.split("/").pop() ?? "";
  return file.replace(/\.md$/, "");
}

function configureMarked() {
  marked.setOptions({ gfm: true, breaks: false });
}
configureMarked();

function estimateReadingMinutes(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

let cachedPosts: Post[] | null = null;

export function getAllPosts(): Post[] {
  if (cachedPosts) return cachedPosts;
  const posts: Post[] = Object.entries(POST_FILES).map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw);
    const slug = slugFromPath(path);
    return {
      slug,
      title: data.title ?? slug,
      description: data.description ?? "",
      date: data.date ?? "",
      author: data.author ?? "Techno Homesteading",
      category: data.category ?? "Journal",
      cover: data.cover,
      coverUrl: resolveCover(data.cover),
      html: marked.parse(content) as string,
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