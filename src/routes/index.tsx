import { createFileRoute, Link } from "@tanstack/react-router";
import { getAllPosts, formatDate, type Post } from "@/lib/content";
import homepageFeature from "@/assets/homepage-feature.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Techno Homesteading — Systems Guidance for Homestead Inventors" },
      {
        name: "description",
        content:
          "Practical guides for building resilient, grid-lite homestead systems across power, water, food, shelter, connectivity, and automation.",
      },
      {
        property: "og:title",
        content: "Techno Homesteading — Systems Guidance for Homestead Inventors",
      },
      {
        property: "og:description",
        content:
          "Practical guides for building resilient, grid-lite homestead systems across power, water, food, shelter, connectivity, and automation.",
      },
    ],
  }),
  loader: (): { posts: Post[] } => ({ posts: getAllPosts() }),
  component: Index,
});

function Index() {
  const { posts } = Route.useLoaderData();
  const [feature, ...rest] = posts as Post[];
  const secondary: Post[] = rest.slice(0, 2);
  const grid: Post[] = rest.slice(2);

  return (
    <div>
      {/* Masthead / Issue line */}
      <section className="border-b border-rule">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
          <p className="text-[0.7rem] uppercase tracking-[0.28em] text-ink-soft">
            Field Manual · Grid-Lite Resilience
          </p>
          <p className="hidden text-[0.7rem] uppercase tracking-[0.28em] text-ink-soft md:block">
            Power · Water · Networks · Food
          </p>
        </div>
      </section>

      {/* Hero feature */}
      {feature && (
        <section className="mx-auto max-w-7xl px-6 pt-10 pb-20 lg:px-12">
          <Link
            to="/guides/$slug"
            params={{ slug: feature.slug }}
            className="group grid gap-10 lg:grid-cols-12 lg:gap-14"
          >
            <div className="relative overflow-hidden lg:col-span-7">
              <img
                src={homepageFeature}
                alt="A practical homestead interior with natural materials and working infrastructure"
                width={1920}
                height={1080}
                className="aspect-[16/11] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.02]"
              />
            </div>
            <div className="flex flex-col justify-center lg:col-span-5">
              <p className="eyebrow">Start Here · {feature.category}</p>
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
                Read the guide →
              </span>
            </div>
          </Link>
        </section>
      )}

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="rule" />
      </div>

      {/* Two-up secondary guides */}
      {secondary.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="eyebrow">Core Systems</p>
              <h2
                className="mt-3 text-3xl text-ink md:text-4xl"
                style={{ fontFamily: "var(--font-serif)", fontWeight: 700 }}
              >
                Build for fewer single points of failure
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
          <p className="eyebrow mb-6">More Resource Guides</p>
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

function PostCard({ post, large = false }: { post: Post; large?: boolean }) {
  return (
    <Link to="/guides/$slug" params={{ slug: post.slug }} className="group block">
      <p className="eyebrow">{post.category}</p>
      <h3
        className={`mt-3 text-ink transition-colors group-hover:text-primary ${
          large ? "text-2xl md:text-3xl" : "text-xl"
        }`}
        style={{ fontFamily: "var(--font-serif)", fontWeight: 600, lineHeight: 1.15 }}
      >
        {post.title}
      </h3>
      <p className={`mt-3 leading-relaxed text-ink-soft ${large ? "text-base" : "text-sm"}`}>
        {post.description}
      </p>
      <p className="mt-4 text-[0.7rem] uppercase tracking-[0.2em] text-ink-soft">
        {post.author} · {formatDate(post.date)}
      </p>
    </Link>
  );
}
