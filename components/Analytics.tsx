"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";
import { canLoadAnalytics, subscribeAnalyticsPreference } from "@/lib/analytics";

// Statistics only: advertising storage, ad personalisation and Google Signals stay off.
const gaInit = (gaId: string) =>
  [
    "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}",
    "gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'granted'});",
    "gtag('js',new Date());",
    `gtag('config',${JSON.stringify(gaId)},{allow_google_signals:false,allow_ad_personalization_signals:false});`,
  ].join("");

export function Analytics({ gaId }: { gaId: string }) {
  const enabled = useSyncExternalStore(subscribeAnalyticsPreference, canLoadAnalytics, () => false);

  if (!enabled) return null;

  return (
    <>
      <Script id="ga-init" strategy="afterInteractive">
        {gaInit(gaId)}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
    </>
  );
}
