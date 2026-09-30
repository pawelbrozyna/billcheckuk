export const SITE_URL = "https://billcheckuk.co.uk";
export const SITE_NAME = "BillCheck UK";
export type NavLink = { label: string; href: string };

export const mainNav: NavLink[] = [
  { label: "Energy", href: "/energy" },
  { label: "Broadband", href: "/broadband" },
  { label: "Speed Test", href: "/broadband/speed-test" },
  { label: "Contact", href: "/contact" },
];

export const privacyLink: NavLink = { label: "Privacy & Cookies", href: "/privacy" };

export const siteRoutes = [
  "/",
  "/energy",
  "/broadband",
  "/broadband/speed-test",
  "/contact",
  "/privacy",
];
