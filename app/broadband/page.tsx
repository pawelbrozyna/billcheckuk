import Link from "next/link";
import { Container } from "@/components/Container";
import { FeatureGrid } from "@/components/FeatureGrid";
import { Hero } from "@/components/Hero";
import { PostcodeCard } from "@/components/PostcodeCard";
import { ArrowRightIcon, PoundIcon, StarIcon, WifiIcon } from "@/components/icons";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Compare Broadband Deals | BillCheck UK",
  description:
    "Find broadband deals available in your area, including fibre and full fibre options.",
  path: "/broadband",
});

const features = [
  { icon: <WifiIcon />, title: "Find better deals", text: "Compare the latest offers in your area." },
  { icon: <PoundIcon />, title: "Simple and fast", text: "No sign up, just your postcode." },
  { icon: <StarIcon />, title: "Save money", text: "See if you could get a faster or cheaper deal." },
];

export default function BroadbandPage() {
  return (
    <>
      <Hero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Broadband" }]}
        title="Compare broadband deals."
        description="Find broadband deals available in your area, including fibre and full fibre options."
        image={{
          src: "/images/hero-broadband.webp",
          mobileSrc: "/images/hero-broadband-mobile.webp",
          alt: "A broadband router in a UK living room",
        }}
      >
        <PostcodeCard buttonLabel="Find broadband deals" />
      </Hero>

      <FeatureGrid title="Why compare?" features={features} />

      <section className="bg-white">
        <Container className="pb-12">
          <p className="border-t border-line pt-8 text-sm text-muted sm:text-base">
            Want to check your current connection?{" "}
            <Link
              href="/broadband/speed-test"
              className="inline-flex items-center gap-1 rounded-sm font-medium text-cta underline-offset-4 hover:underline"
            >
              Run a broadband speed test
              <ArrowRightIcon className="h-[1.1em] w-[1.1em]" />
            </Link>
          </p>
        </Container>
      </section>
    </>
  );
}
