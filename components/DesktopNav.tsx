"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavLink } from "@/lib/site";

export function DesktopNav({ links }: { links: NavLink[] }) {
  const pathname = usePathname();
  const active = links
    .filter((link) => pathname === link.href || pathname.startsWith(`${link.href}/`))
    .sort((a, b) => b.href.length - a.href.length)[0]?.href;

  return (
    <nav aria-label="Main" className="hidden h-full md:block">
      <ul className="flex h-full items-center gap-10">
        {links.map((link) => {
          const isActive = link.href === active;
          return (
            <li key={link.href} className="relative flex h-full items-center">
              {isActive && (
                <span className="absolute inset-x-0 top-0 h-0.5 rounded-b bg-cta" aria-hidden="true" />
              )}
              <Link
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-sm text-base font-medium transition-colors hover:text-navy ${
                  isActive ? "text-navy" : "text-slate-600"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
