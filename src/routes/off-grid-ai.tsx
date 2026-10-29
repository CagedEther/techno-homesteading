import { createFileRoute } from "@tanstack/react-router";
import { getPage } from "@/lib/content";

const FALLBACK_TITLE = "Off-grid AI";
const FALLBACK_DESCRIPTION =
  "Running useful AI on a small computer in a solar-powered cabin, and what we're learning about power losses along the way.";

export const Route = createFileRoute("/off-grid-ai")({
  loader: () => ({ page: getPage("off-grid-ai") }),
  head: ({ loaderData }) => {
    const page = loaderData?.page;
    const title = `${page?.title ?? FALLBACK_TITLE} — Techno Homesteading`;
    const description = page?.description ?? FALLBACK_DESCRIPTION;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
    };
  },
  component: OffGridAIPage,
});

function OffGridAIPage() {
  const { page } = Route.useLoaderData();
  if (!page) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <p className="text-ink-soft">Page content not found.</p>
      </div>
    );
  }
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
      <p className="eyebrow text-center">Off-Grid AI · Field Notes</p>
      <h1
        className="mt-5 text-center text-4xl leading-[1.05] text-ink md:text-5xl lg:text-6xl"
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
    </article>
  );
}
