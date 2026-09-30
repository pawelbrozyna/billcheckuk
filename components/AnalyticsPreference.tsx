"use client";

import { useSyncExternalStore } from "react";
import {
  hasAnalyticsOptOut,
  setAnalyticsOptOut,
  subscribeAnalyticsPreference,
} from "@/lib/analytics";
import { buttonStyles } from "./Button";

export function AnalyticsPreference() {
  const optedOut = useSyncExternalStore<boolean | null>(
    subscribeAnalyticsPreference,
    hasAnalyticsOptOut,
    () => null,
  );

  return (
    <div className="rounded-md border border-line bg-surface p-4 sm:flex sm:items-center sm:justify-between sm:gap-6">
      <p aria-live="polite" className="text-sm leading-6 text-navy">
        {optedOut === null
          ? "Checking your analytics preference…"
          : optedOut
            ? "You have opted out of analytics in this browser."
            : "Analytics is allowed in this browser."}
      </p>
      <button
        type="button"
        disabled={optedOut === null}
        onClick={() => setAnalyticsOptOut(!optedOut)}
        className={`${buttonStyles(optedOut ? "primary" : "outline", "md")} mt-3 w-full shrink-0 sm:mt-0 sm:w-auto`}
      >
        {optedOut ? "Turn analytics back on" : "Opt out of analytics"}
      </button>
    </div>
  );
}
