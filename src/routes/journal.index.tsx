import { createFileRoute, Link } from "@tanstack/react-router";
import { getAllPosts, formatDate, type Post } from "@/lib/content";

export const Route = createFileRoute("/journal/")({
  head: () => ({
    meta: [
      { title: "The Journal — Techno Homesteading" },
      {
        name: "description",
        content:
          "Every story Techno Homesteading has published — features on architecture, interiors, gardens, and the craftspeople behind them.",
      },
      { property: "og:title", content: "The Journal — Techno Homesteading" },
      {
        property: "og:description",
        content:
          "Every story Techno Homesteading has published — features on architecture, interiors, gardens, and the craftspeople behind them.",
      },
    ],
  }),
  loader: (): { posts: Post[] } => ({ posts: getAllPosts() }),
  component: JournalIndex,
});

function JournalIndex() {
  const { posts } = Route.useLoaderData();
  const list = posts as Post[];
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-24">
      <header className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">The Journal</p>
        <h1
          className="mt-5 text-5xl text-ink md:text-6xl"
          style={{ fontFamily: "var(--font-serif)", fontWeight: 700 }}
        >
          Every story, in one place
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ink-soft">
          Long-form features on the houses, rooms, and gardens we couldn't stop
          thinking about. Reported in person; published slowly, on purpose.
        </p>
      </header>

      <div className="rule mt-16" />

      <ul className="divide-y divide-rule">
        {list.map((post) => (
          <li key={post.slug}>
            <Link
              to="/journal/$slug"
              params={{ slug: post.slug }}
              className="group block py-10"
            >
              <div className="mx-auto max-w-3xl">
                <p className="eyebrow">{post.category}</p>
                <h2
                  className="mt-3 text-3xl text-ink transition-colors group-hover:text-primary md:text-4xl"
                  style={{ fontFamily: "var(--font-serif)", fontWeight: 600, lineHeight: 1.1 }}
                >
                  {post.title}
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
                  {post.description}
                </p>
                <p className="mt-5 text-[0.7rem] uppercase tracking-[0.22em] text-ink-soft">
                  {post.author} · {formatDate(post.date)} · {post.readingMinutes} min read
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
