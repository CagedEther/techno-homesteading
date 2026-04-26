import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getPost, formatDate } from "@/lib/content";

export const Route = createFileRoute("/journal/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Story not found — Techno Homesteading" }] };
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.title} — Techno Homesteading` },
        { name: "description", content: post.description },
        { name: "author", content: post.author },
        { property: "og:type", content: "article" },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.description },
        ...(post.coverUrl
          ? [
              { property: "og:image", content: post.coverUrl },
              { name: "twitter:image", content: post.coverUrl },
            ]
          : []),
        { property: "article:published_time", content: post.date },
        { property: "article:author", content: post.author },
        { property: "article:section", content: post.category },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <p className="eyebrow">Not found</p>
      <h1
        className="mt-4 text-4xl text-ink"
        style={{ fontFamily: "var(--font-serif)", fontWeight: 700 }}
      >
        That story has wandered off
      </h1>
      <Link
        to="/journal"
        className="mt-8 inline-flex border-b border-ink pb-1 text-xs font-semibold uppercase tracking-[0.22em] text-ink hover:text-primary hover:border-primary"
      >
        Browse the Journal →
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <p className="eyebrow">Error</p>
      <h1
        className="mt-4 text-3xl text-ink"
        style={{ fontFamily: "var(--font-serif)", fontWeight: 700 }}
      >
        Something went wrong
      </h1>
      <p className="mt-3 text-sm text-ink-soft">{error.message}</p>
    </div>
  ),
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData();
  return (
    <article>
      {/* Cover */}
      {post.coverUrl && (
        <div className="border-b border-rule">
          <img
            src={post.coverUrl}
            alt={post.title}
            width={1600}
            height={1100}
            className="aspect-[16/9] w-full object-cover"
          />
        </div>
      )}

      <div className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
        <p className="eyebrow text-center">{post.category}</p>
        <h1
          className="mt-5 text-center text-4xl leading-[1.05] text-ink md:text-5xl lg:text-6xl"
          style={{ fontFamily: "var(--font-serif)", fontWeight: 700 }}
        >
          {post.title}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg italic text-ink-soft" style={{ fontFamily: "var(--font-serif)" }}>
          {post.description}
        </p>
        <div className="mt-8 flex items-center justify-center gap-4 text-[0.7rem] uppercase tracking-[0.22em] text-ink-soft">
          <span>By {post.author}</span>
          <span className="h-px w-8 bg-rule" />
          <span>{formatDate(post.date)}</span>
          <span className="h-px w-8 bg-rule" />
          <span>{post.readingMinutes} min read</span>
        </div>

        <div className="rule my-12" />

        <div
          className="prose-editorial"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <div className="rule mt-16" />
        <div className="mt-10 text-center">
          <Link
            to="/journal"
            className="inline-flex border-b border-ink pb-1 text-xs font-semibold uppercase tracking-[0.22em] text-ink transition-colors hover:text-primary hover:border-primary"
          >
            ← Back to The Journal
          </Link>
        </div>
      </div>
    </article>
  );
}
