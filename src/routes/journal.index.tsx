import { createFileRoute, Link } from "@tanstack/react-router";
import { getAllPosts, formatDate } from "@/lib/content";

export const Route = createFileRoute("/journal/")({
  head: () => ({
    meta: [
      { title: "The Journal — Atelier" },
      {
        name: "description",
        content:
          "Every story Atelier has published — features on architecture, interiors, gardens, and the craftspeople behind them.",
      },
      { property: "og:title", content: "The Journal — Atelier" },
      {
        property: "og:description",
        content:
          "Every story Atelier has published — features on architecture, interiors, gardens, and the craftspeople behind them.",
      },
    ],
  }),
  loader: () => ({ posts: getAllPosts() }),
  component: JournalIndex,
});

function JournalIndex() {
  const { posts } = Route.useLoaderData();
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
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              to="/journal/$slug"
              params={{ slug: post.slug }}
              className="group grid gap-8 py-10 md:grid-cols-12 md:gap-10"
            >
              <div className="md:col-span-5">
                {post.coverUrl && (
                  <img
                    src={post.coverUrl}
                    alt={post.title}
                    loading="lazy"
                    width={1400}
                    height={1000}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-[1.02]"
                  />
                )}
              </div>
              <div className="flex flex-col justify-center md:col-span-7">
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
