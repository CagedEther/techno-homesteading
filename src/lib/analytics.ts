export const GA_MEASUREMENT_ID = "G-DPS9836PYW";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackPageView(path: string) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("config", GA_MEASUREMENT_ID, { page_path: path });
}

export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean | undefined>,
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

/** GA4 recommended event for lead / contact form completion. */
export function trackLeadFormComplete(formId = "planning_chat") {
  trackEvent("generate_lead", {
    form_id: formId,
    method: "formspree",
  });
}
