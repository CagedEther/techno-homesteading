import { useRouterState } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

import { trackPageView } from "@/lib/analytics";

/** Fires GA4 page_view on client-side route changes. */
export function GoogleAnalytics() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const search = useRouterState({ select: (state) => state.location.searchStr });
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Initial page view is handled by gtag('config', ...) in the root shell.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    trackPageView(`${pathname}${search}`);
  }, [pathname, search]);

  return null;
}
