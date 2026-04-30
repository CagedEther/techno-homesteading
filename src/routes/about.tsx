import { createFileRoute } from "@tanstack/react-router";
import { getPage } from "@/lib/content";

export const Route = createFileRoute("/about")({
  loader: () => {
    const page = getPage("about");
    return { page };
  },
  head: ({ loaderData }) => {
    const page = loaderData?.page;
    return {
      meta: [
        { title: `${page?.title ?? "About"} — Techno Homesteading` },
        {
          name: "description",
          content:
            page?.description ??
            "About Techno Homesteading — practical systems guidance for homestead inventors.",
        },
        { property: "og:title", content: `${page?.title ?? "About"} — Techno Homesteading` },
        {
          property: "og:description",
          content:
            page?.description ??
            "About Techno Homesteading — practical systems guidance for homestead inventors.",
        },
      ],
    };
  },
  component: AboutPage,
});

function AboutPage() {
  const { page } = Route.useLoaderData();
  if (!page) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <p className="text-ink-soft">Page content not found.</p>
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 lg:py-28">
      <p className="eyebrow text-center">About</p>
      <h1
        className="mt-5 text-center text-5xl text-ink md:text-6xl"
        style={{ fontFamily: "var(--font-serif)", fontWeight: 700 }}
      >
        {page.title}
      </h1>
      <p
        className="mx-auto mt-6 max-w-2xl text-center text-lg italic text-ink-soft"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {page.description}
      </p>
      <div className="rule my-12" />
      <div className="prose-editorial" dangerouslySetInnerHTML={{ __html: page.html }} />
    </div>
  );
}
