// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Note on SSG: this project targets Cloudflare Workers, which renders every
// route on the edge with full SSR (meta tags, page HTML, content) on each
// request. That gives crawlers and social previews the same fully-rendered
// HTML they would get from a build-time prerender — content is bundled into
// the Worker via `import.meta.glob` so there is no runtime filesystem or
// database round-trip. Build-time prerender via the start plugin is not
// compatible with the Worker output target in this template.
export default defineConfig();
