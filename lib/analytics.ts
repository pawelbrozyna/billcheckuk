import { isOwnerBrowser } from "./owner";

const LOCAL_HOSTNAMES = new Set(["localhost", "127.0.0.1", "[::1]"]);

export const ANALYTICS_OPT_OUT_KEY = "bcuk_analytics_opt_out";
const PREFERENCE_EVENT = "bcuk:analytics-preference";

/** Returns the GA4 measurement ID only for production builds with a valid ID configured. */
export function getGaId(): string | null {
  const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim();
  if (process.env.NODE_ENV !== "production" || !gaId) return null;
  return /^G-[A-Z0-9]+$/.test(gaId) ? gaId : null;
}

/** True when this browser has opted out of statistical analytics. */
export function hasAnalyticsOptOut(): boolean {
  try {
    return window.localStorage.getItem(ANALYTICS_OPT_OUT_KEY) === "1";
  } catch {
    return false;
  }
}

/** Notifies subscribers when the preference changes in this tab or another tab. */
export function subscribeAnalyticsPreference(onChange: () => void): () => void {
  const onStorage = (event: StorageEvent) => {
    if (event.key === ANALYTICS_OPT_OUT_KEY) onChange();
  };
  window.addEventListener(PREFERENCE_EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(PREFERENCE_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

function setGaDisabled(disabled: boolean) {
  const gaId = getGaId();
  if (gaId) (window as unknown as Record<string, unknown>)[`ga-disable-${gaId}`] = disabled;
}

function deleteGaCookies() {
  const hostname = window.location.hostname;
  const domains = ["", hostname, `.${hostname.replace(/^www\./, "")}`];
  const names = document.cookie
    .split(";")
    .map((cookie) => cookie.split("=")[0].trim())
    .filter((name) => name === "_ga" || name.startsWith("_ga_"));

  for (const name of names) {
    for (const domain of domains) {
      const domainAttr = domain ? `; Domain=${domain}` : "";
      document.cookie = `${name}=; Max-Age=0; Path=/${domainAttr}`;
    }
  }
}

/**
 * Stores or clears the opt-out preference. It stays in this browser and is never
 * sent to Google Analytics.
 */
export function setAnalyticsOptOut(optOut: boolean): void {
  try {
    if (optOut) window.localStorage.setItem(ANALYTICS_OPT_OUT_KEY, "1");
    else window.localStorage.removeItem(ANALYTICS_OPT_OUT_KEY);
  } catch {
    return;
  }
  setGaDisabled(optOut);
  if (optOut) deleteGaCookies();
  window.dispatchEvent(new Event(PREFERENCE_EVENT));
}

export function canLoadAnalytics(): boolean {
  if (typeof window === "undefined") return false;
  if (LOCAL_HOSTNAMES.has(window.location.hostname)) return false;
  if (isOwnerBrowser()) return false;
  return !hasAnalyticsOptOut();
}
