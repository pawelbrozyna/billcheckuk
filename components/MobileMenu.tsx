"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import type { NavLink } from "@/lib/site";
import {
  BoltIcon,
  ChevronRightIcon,
  CloseIcon,
  MailIcon,
  MenuIcon,
  SpeedometerIcon,
  WifiIcon,
} from "./icons";

const ICON_CLASS = "h-[1.125rem] w-[1.125rem]";

const linkIcons: Record<string, ReactNode> = {
  "/energy": <BoltIcon className={ICON_CLASS} />,
  "/broadband": <WifiIcon className={ICON_CLASS} />,
  "/broadband/speed-test": <SpeedometerIcon className={ICON_CLASS} />,
  "/contact": <MailIcon className={ICON_CLASS} />,
};

export function MobileMenu({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const active = links
    .filter((link) => pathname === link.href || pathname.startsWith(`${link.href}/`))
    .sort((a, b) => b.href.length - a.href.length)[0]?.href;

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        rootRef.current?.querySelector<HTMLElement>("button")?.focus();
        return;
      }
      if (event.key !== "Tab" || !rootRef.current) return;

      const focusable = rootRef.current.querySelectorAll<HTMLElement>("button, a[href]");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const desktop = window.matchMedia("(min-width: 768px)");
    const onBreakpoint = () => desktop.matches && setOpen(false);

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div ref={rootRef} className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="-mr-2 flex h-11 w-11 items-center justify-center rounded-md text-navy hover:bg-surface active:bg-slate-100"
      >
        {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
      </button>

      {open && (
        <>
          {createPortal(
            <div aria-hidden="true" onClick={close} className="fixed inset-0 z-40 bg-black/20 md:hidden" />,
            document.body,
          )}
          <nav
            id="mobile-menu"
            aria-label="Main"
            className="absolute right-4 top-[calc(100%+0.5rem)] w-[17rem] max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-line bg-white p-1.5 shadow-[0_8px_24px_rgba(15,23,42,0.08)]"
          >
            <ul className="divide-y divide-line/70">
              {links.map((link) => {
                const isActive = link.href === active;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={close}
                      aria-current={isActive ? "page" : undefined}
                      className={`my-0.5 flex min-h-12 items-center gap-3 rounded-md px-3 py-3.5 text-base font-medium text-navy transition-colors hover:bg-surface active:bg-surface ${
                        isActive ? "bg-surface" : ""
                      }`}
                    >
                      <span className={isActive ? "text-cta" : "text-brand"}>{linkIcons[link.href]}</span>
                      <span className="flex-1 truncate">{link.label}</span>
                      <ChevronRightIcon className="h-4 w-4 shrink-0 text-slate-400" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}
