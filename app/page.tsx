import Image from "next/image";
import { ButtonLink } from "@/components/Button";
import { CtaPanel } from "@/components/CtaPanel";
import { Hero } from "@/components/Hero";
import {
  BoltIcon,
  ClockIcon,
  ShieldIcon,
  UsersIcon,
  WifiIcon,
} from "@/components/icons";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata({
  title: "BillCheck UK | Energy & Broadband Comparison",
  description:
    "Simple UK tools to check energy and broadband costs, compare options and find better deals.",
  path: "/",
});

const options = [
  {
    label: "Energy",
    text: "Compare energy tariffs and see potential savings.",
    href: "/energy",
    cta: "Check energy",
    variant: "primary" as const,
    icon: <BoltIcon fill="currentColor" strokeWidth={1.5} className="h-6 w-6 sm:h-7 sm:w-7" />,
    iconStyle: "bg-amber-100 text-amber-500",
  },
  {
    label: "Broadband",
    text: "Find better broadband deals in your area.",
    href: "/broadband",
    cta: "Check broadband",
    variant: "primary" as const,
    icon: <WifiIcon strokeWidth={2.4} className="h-6 w-6 sm:h-7 sm:w-7" />,
    iconStyle: "bg-blue-100 text-cta",
  },
];

const trustPoints = [
  { Icon: ShieldIcon, title: "Independent tools", text: "Simple and straightforward." },
  { Icon: ClockIcon, title: "Up to date", text: "Built around current UK information." },
  { Icon: UsersIcon, title: "Built for UK households", text: "Simple and fast to use." },
];

export default function Home() {
  return (
    <>
      <Hero
        size="large"
        title="Check your household bills."
        description="Simple tools to compare energy and broadband deals and see if you could pay less."
        image={{
          src: "/images/hero-home.webp",
          mobileSrc: "/images/hero-home-mobile.webp",
          alt: "A row of British terraced houses",
        }}
        imageLayout="bottom"
      >
        <ul className="grid max-w-[56rem] grid-cols-2 gap-3 md:gap-4">
          {options.map(({ label, text, href, cta, variant, icon, iconStyle }) => (
            <li
              key={href}
              className="flex flex-col rounded-xl border border-line bg-white p-3 shadow-[0_1px_2px_rgba(15,23,42,0.04)] md:grid md:grid-cols-[auto_1fr] md:gap-x-4 md:p-6"
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-xl sm:h-14 sm:w-14 ${iconStyle}`}
              >
                {icon}
              </span>
              <div className="mt-3 flex-1 md:mt-0">
                <h2 className="text-lg font-semibold text-navy">{label}</h2>
                <p className="mt-1 text-[0.8125rem] leading-5 text-muted">{text}</p>
              </div>
              <ButtonLink
                href={href}
                variant={variant}
                arrow
                className="mt-4 w-full whitespace-nowrap max-md:gap-1 max-md:px-1 max-md:text-[0.8125rem] md:col-start-2"
              >
                {cta}
              </ButtonLink>
            </li>
          ))}
        </ul>

        <ul className="mt-8 grid max-w-[56rem] grid-cols-3 gap-3 sm:gap-6">
          {trustPoints.map(({ Icon, title, text }) => (
            <li key={title} className="flex items-start gap-2 sm:gap-3">
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-navy" />
              <div>
                <p className="text-[0.8125rem] font-semibold leading-5 text-navy sm:text-sm">{title}</p>
                <p className="text-xs leading-5 text-muted">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Hero>

      <CtaPanel
        title="Check your internet speed"
        text="See how fast your broadband connection really is."
        href="/broadband/speed-test"
        label="Start speed test"
        icon={
          <Image
            src="/images/icon-speedometer.webp"
            alt=""
            width={160}
            height={108}
            className="h-auto w-8 sm:w-9"
          />
        }
      />
    </>
  );
}
