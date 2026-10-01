import { Hero } from "@/components/Hero";
import { PostcodeCard } from "@/components/PostcodeCard";
import { Steps } from "@/components/Steps";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Compare Energy Deals | BillCheck UK",
  description:
    "Check available gas and electricity tariffs and see if you could pay less on your energy bills.",
  path: "/energy",
});

const steps = [
  { title: "Enter your postcode", text: "We check available tariffs in your area." },
  { title: "Compare deals", text: "See the latest gas and electricity tariffs side by side." },
  { title: "See your potential savings", text: "Find a cheaper deal if it's available." },
];

export default function EnergyPage() {
  return (
    <>
      <Hero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Energy" }]}
        title="Compare energy deals."
        description="Check available gas and electricity tariffs and see if you could pay less on your energy bills."
        image={{
          src: "/images/hero-energy.webp",
          mobileSrc: "/images/hero-energy-mobile.webp",
          alt: "A bright, modern UK living room",
        }}
        mobileDescriptionWidth="max-w-[75%]"
      >
        <PostcodeCard buttonLabel="Find energy deals" />
      </Hero>

      <Steps title="How it works" steps={steps} />
    </>
  );
}
