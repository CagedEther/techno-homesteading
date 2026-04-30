import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { getPage } from "@/lib/content";

export const Route = createFileRoute("/pages/$slug")({
  loader: ({ params }) => {
    const page = getPage(params.slug);
    if (!page) throw notFound();
    return { page };
  },
  head: ({ loaderData }) => {
    const page = loaderData?.page;
    const title = `${page?.title ?? "Page"} — Techno Homesteading`;
    const description = page?.description ?? "Techno Homesteading";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  errorComponent: ({ error, reset }) => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <p className="text-ink-soft">Something went wrong: {error.message}</p>
      <button onClick={reset} className="mt-4 underline">
        Retry
      </button>
    </div>
  ),
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="text-3xl text-ink" style={{ fontFamily: "var(--font-serif)" }}>
        Page not found
      </h1>
      <Link to="/" className="mt-6 inline-block underline text-ink-soft">
        Return home
      </Link>
    </div>
  ),
  component: PageRoute,
});

function PageRoute() {
  const { page } = Route.useLoaderData();
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 lg:py-28">
      <p className="eyebrow text-center">Resource</p>
      <h1
        className="mt-5 text-center text-5xl text-ink md:text-6xl"
        style={{ fontFamily: "var(--font-serif)", fontWeight: 700 }}
      >
        {page.title}
      </h1>
      {page.description && (
        <p
          className="mx-auto mt-6 max-w-2xl text-center text-lg italic text-ink-soft"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {page.description}
        </p>
      )}
      <div className="rule my-12" />
      <div className="prose-editorial" dangerouslySetInnerHTML={{ __html: page.html }} />
    </div>
  );
}
