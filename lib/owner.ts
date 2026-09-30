export const OWNER_COOKIE = "bcuk_owner";

const OWNER_PARAM = "owner";
const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

function readOwnerParam(): "true" | "false" | null {
  const value = new URLSearchParams(window.location.search).get(OWNER_PARAM);
  return value === "true" || value === "false" ? value : null;
}

function hasOwnerCookie(): boolean {
  return document.cookie
    .split(";")
    .some((cookie) => cookie.trim() === `${OWNER_COOKIE}=1`);
}

/** True when this browser belongs to the site owner and should be excluded from analytics. */
export function isOwnerBrowser(): boolean {
  const param = readOwnerParam();
  if (param) return param === "true";
  return hasOwnerCookie();
}

/** Applies ?owner=true / ?owner=false to the owner cookie, then removes the param from the URL. */
export function syncOwnerParam(): void {
  const param = readOwnerParam();
  if (!param) return;

  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  const maxAge = param === "true" ? ONE_YEAR_IN_SECONDS : 0;
  document.cookie = `${OWNER_COOKIE}=1; Max-Age=${maxAge}; Path=/; SameSite=Lax${secure}`;

  const url = new URL(window.location.href);
  url.searchParams.delete(OWNER_PARAM);
  window.history.replaceState(
    window.history.state,
    "",
    `${url.pathname}${url.search}${url.hash}`,
  );
}
