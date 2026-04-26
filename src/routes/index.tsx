import { createFileRoute, Link } from "@tanstack/react-router";
import { getAllPosts, formatDate, type Post } from "@/lib/content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Atelier — A Quarterly Journal of Architecture & Interiors" },
      {
        name: "description",
        content:
          "Long-form features on the architects, designers, and craftspeople whose work rewards a second look.",
      },
      {
        property: "og:title",
        content: "Atelier — A Quarterly Journal of Architecture & Interiors",
      },
      {
        property: "og:description",
        content:
          "Long-form features on the architects, designers, and craftspeople whose work rewards a second look.",
      },
    ],
  }),
  loader: (): { posts: Post[] } => ({ posts: getAllPosts() }),
  component: Index,
});

function Index() {
  const { posts } = Route.useLoaderData();
  const [feature, ...rest] = posts;
  const secondary = rest.slice(0, 2);
  const grid = rest.slice(2);

  return (
    <div>
      {/* Masthead / Issue line */}
      <section className="border-b border-rule">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
          <p className="text-[0.7rem] uppercase tracking-[0.28em] text-ink-soft">
            Issue No. 04 · Spring 2025
          </p>
          <p className="hidden text-[0.7rem] uppercase tracking-[0.28em] text-ink-soft md:block">
            Architecture · Interiors · Gardens
          </p>
        </div>
      </section>

      {/* Hero feature */}
      {feature && (
        <section className="mx-auto max-w-7xl px-6 pt-10 pb-20 lg:px-12">
          <Link
            to="/journal/$slug"
            params={{ slug: feature.slug }}
            className="group grid gap-10 lg:grid-cols-12 lg:gap-14"
          >
            <div className="relative overflow-hidden lg:col-span-7">
              {feature.coverUrl && (
                <img
                  src={feature.coverUrl}
                  alt={feature.title}
                  width={1600}
                  height={1100}
                  className="aspect-[16/11] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.02]"
                />
              )}
            </div>
            <div className="flex flex-col justify-center lg:col-span-5">
              <p className="eyebrow">The Cover Story · {feature.category}</p>
              <h1
                className="mt-5 text-4xl leading-[1.05] text-ink md:text-5xl lg:text-6xl"
                style={{ fontFamily: "var(--font-serif)", fontWeight: 700 }}
              >
                {feature.title}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
                {feature.description}
              </p>
              <div className="mt-8 flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-ink-soft">
                <span>By {feature.author}</span>
                <span className="h-px w-6 bg-rule" />
                <span>{formatDate(feature.date)}</span>
              </div>
              <span className="mt-10 inline-flex items-center gap-3 self-start border-b border-ink pb-1 text-xs font-semibold uppercase tracking-[0.22em] text-ink transition-colors group-hover:text-primary group-hover:border-primary">
                Read the feature →
              </span>
            </div>
          </Link>
        </section>
      )}

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="rule" />
      </div>

      {/* Two-up secondary stories */}
      {secondary.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="eyebrow">Featured Stories</p>
              <h2
                className="mt-3 text-3xl text-ink md:text-4xl"
                style={{ fontFamily: "var(--font-serif)", fontWeight: 700 }}
              >
                Of particular note this issue
              </h2>
            </div>
          </div>
          <div className="grid gap-12 md:grid-cols-2">
            {secondary.map((post) => (
              <PostCard key={post.slug} post={post} large />
            ))}
          </div>
        </section>
      )}

      {/* Grid of remaining */}
      {grid.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-12">
          <div className="rule mb-12" />
          <p className="eyebrow mb-6">More from the Journal</p>
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {grid.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function PostCard({
  post,
  large = false,
}: {
  post: Post;
  large?: boolean;
}) {
  return (
    <Link
      to="/journal/$slug"
      params={{ slug: post.slug }}
      className="group block"
    >
      <div className="overflow-hidden">
        {post.coverUrl && (
          <img
            src={post.coverUrl}
            alt={post.title}
            loading="lazy"
            width={1400}
            height={1000}
            className={`w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03] ${
              large ? "aspect-[4/3]" : "aspect-[5/4]"
            }`}
          />
        )}
      </div>
      <p className="eyebrow mt-5">{post.category}</p>
      <h3
        className={`mt-3 text-ink transition-colors group-hover:text-primary ${
          large ? "text-2xl md:text-3xl" : "text-xl"
        }`}
        style={{ fontFamily: "var(--font-serif)", fontWeight: 600, lineHeight: 1.15 }}
      >
        {post.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">
        {post.description}
      </p>
      <p className="mt-4 text-[0.7rem] uppercase tracking-[0.2em] text-ink-soft">
        {post.author} · {formatDate(post.date)}
      </p>
    </Link>
  );
}
