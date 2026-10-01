import { FeatureGrid } from "@/components/FeatureGrid";
import { Hero } from "@/components/Hero";
import { SpeedTest } from "@/components/SpeedTest";
import { DownloadIcon, PulseIcon, UploadIcon } from "@/components/icons";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Broadband Speed Test | Check Your Internet Speed | BillCheck UK",
  description:
    "Check your internet speed and see how fast your broadband connection really is.",
  path: "/broadband/speed-test",
});

const metrics = [
  {
    icon: <DownloadIcon />,
    title: "Download speed",
    text: "How quickly data reaches your device. Important for streaming, browsing and downloading.",
  },
  {
    icon: <UploadIcon />,
    title: "Upload speed",
    text: "How quickly data leaves your device. Important for video calls, cloud backups and uploading files.",
  },
  {
    icon: <PulseIcon />,
    title: "Latency",
    text: "The delay between your device and the network. Lower latency generally means a more responsive connection.",
  },
];

export default function SpeedTestPage() {
  return (
    <>
      <Hero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Broadband", href: "/broadband" },
          { label: "Speed Test" },
        ]}
        title="Check your internet speed."
        description="See how fast your broadband connection really is."
        image={{
          src: "/images/hero-speed-test.webp",
          mobileSrc: "/images/hero-speed-test-mobile.webp",
          alt: "Checking broadband speed on a laptop",
        }}
      >
        <SpeedTest />
      </Hero>

      <FeatureGrid title="What do the results mean?" features={metrics} />
    </>
  );
}
