import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { OwnerMode } from "@/components/OwnerMode";
import { TouchFeedback } from "@/components/TouchFeedback";
import { getGaId } from "@/lib/analytics";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "BillCheck UK | Energy & Broadband Comparison",
  description:
    "Simple UK tools to check energy and broadband costs, compare options and find better deals.",
  applicationName: SITE_NAME,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const gaId = getGaId();

  return (
    <html lang="en-GB" className={`${geistSans.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-navy"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <OwnerMode />
        <TouchFeedback />
        {gaId && <Analytics gaId={gaId} />}
      </body>
    </html>
  );
}
