import { createFileRoute, Link } from "@tanstack/react-router";
import { getAllPosts, formatDate, type Post } from "@/lib/content";

export const Route = createFileRoute("/guides/")({
  head: () => ({
    meta: [
      { title: "Resource Guides — Techno Homesteading" },
      {
        name: "description",
        content:
          "Practical guides for inventor-homesteaders building resilient systems for power, water, food, shelter, connectivity, and automation.",
      },
      { property: "og:title", content: "Resource Guides — Techno Homesteading" },
      {
        property: "og:description",
        content:
          "Practical guides for inventor-homesteaders building resilient systems for power, water, food, shelter, connectivity, and automation.",
      },
    ],
  }),
  loader: (): { posts: Post[] } => ({ posts: getAllPosts() }),
  component: GuidesIndex,
});

function GuidesIndex() {
  const { posts } = Route.useLoaderData();
  const list = posts as Post[];
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-24">
      <header className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">Resource Guides</p>
        <h1
          className="mt-5 text-5xl text-ink md:text-6xl"
          style={{ fontFamily: "var(--font-serif)", fontWeight: 700 }}
        >
          Systems guidance for homestead inventors
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ink-soft">
          Practical field notes for reducing single points of failure across energy, water,
          networks, shelter, food systems, sensing, and automation.
        </p>
      </header>

      <div className="rule mt-16" />

      <ul className="divide-y divide-rule">
        {list.map((post) => (
          <li key={post.slug}>
            <Link to="/guides/$slug" params={{ slug: post.slug }} className="group block py-10">
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
