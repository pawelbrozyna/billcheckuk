import fs from "node:fs";
import path from "node:path";
import Image, { getImageProps } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "./Container";

export type Breadcrumb = { label: string; href?: string };

type HeroProps = {
  title: string;
  description: string;
  breadcrumbs?: Breadcrumb[];
  /** `mobileSrc` is an optional portrait photo used below the md breakpoint. */
  image?: { src: string; alt: string; mobileSrc?: string };
  /** "side" places the photo on the right; "bottom" runs it along the bottom edge. */
  imageLayout?: "side" | "bottom";
  size?: "default" | "large";
  /** Mobile width of the description when a side photo backdrop is shown. */
  mobileDescriptionWidth?: string;
  children?: ReactNode;
};

function imageExists(src: string): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", src));
}

const imageLayouts = {
  side: {
    wrapper:
      "absolute inset-y-0 right-0 hidden w-[62%] lg:block [mask-image:linear-gradient(to_right,transparent,black_38%)]",
    frame: "absolute inset-0",
    image: "object-cover object-center",
    sizes: "62vw",
  },
  /* Below md the photo sits behind the heading as a faded backdrop; from md up it runs along the bottom. */
  bottom: {
    wrapper:
      "absolute inset-x-0 top-0 h-[420px] [mask-image:linear-gradient(to_bottom,black_75%,transparent)] md:top-auto md:bottom-0 md:h-[18.75rem] md:[mask-image:linear-gradient(to_bottom,transparent,black_60%)]",
    frame:
      "absolute inset-y-0 right-0 left-[20%] [mask-image:linear-gradient(to_right,transparent,black_30%)] md:left-0 md:[mask-image:none]",
    image: "object-cover object-bottom",
    sizes: "100vw",
  },
};

export function Hero({
  title,
  description,
  breadcrumbs,
  image,
  imageLayout = "side",
  size = "default",
  mobileDescriptionWidth = "max-w-[62%]",
  children,
}: HeroProps) {
  const layout = imageLayouts[imageLayout];
  const showImage = image && imageExists(image.src);
  const mobileBackdrop = showImage && imageLayout === "bottom";
  const mobileSrc = image?.mobileSrc && imageExists(image.mobileSrc) ? image.mobileSrc : null;
  const hasMobileSrc = mobileSrc !== null;

  return (
    <section className="relative overflow-hidden border-b border-line bg-hero">
      {mobileSrc && imageLayout === "side" && (
        <div className="absolute -top-24 bottom-0 right-0 aspect-[9/16] [mask-image:linear-gradient(to_right,transparent,black_45%)] lg:hidden">
          <Image
            src={mobileSrc}
            alt=""
            fill
            loading="eager"
            sizes="(min-width: 768px) 40vw, 80vw"
            className="object-cover object-right opacity-80"
          />
        </div>
      )}
      {mobileSrc && imageLayout === "side" && (
        <div className="absolute inset-0 bg-linear-to-r from-hero from-30% via-hero/70 via-60% to-transparent lg:hidden" />
      )}
      {showImage && (
        <div className={layout.wrapper}>
          <div className={`${layout.frame} opacity-80`}>
            {imageLayout === "bottom" && mobileSrc ? (
              <ArtDirectedImage
                src={image.src}
                mobileSrc={mobileSrc}
                alt={image.alt}
                sizes={layout.sizes}
                className={layout.image}
              />
            ) : (
              <Image
                src={image.src}
                alt={image.alt}
                fill
                preload
                sizes={layout.sizes}
                className={layout.image}
              />
            )}
          </div>
          {mobileBackdrop && (
            <>
              <div className="absolute inset-0 bg-linear-to-r from-hero from-0% via-hero/70 via-40% to-transparent to-75% md:hidden" />
              <div className="absolute inset-0 bg-linear-to-b from-hero/80 to-transparent to-45% md:hidden" />
            </>
          )}
        </div>
      )}

      <Container
        className={`relative pt-8 pb-8 sm:pt-12 sm:pb-12 md:min-h-[23.75rem] lg:pt-14 ${
          showImage && imageLayout === "bottom" ? "md:pb-56" : "lg:pb-14"
        }`}
      >
        {breadcrumbs && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-muted sm:text-sm">
              {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                  <li key={crumb.label} className="flex items-center gap-2">
                    {crumb.href && !isLast ? (
                      <Link href={crumb.href} className="rounded-sm hover:text-navy">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span aria-current={isLast ? "page" : undefined}>{crumb.label}</span>
                    )}
                    {!isLast && <span aria-hidden="true">›</span>}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}

        <h1
          className={`font-bold tracking-tight text-navy ${
            size === "large"
              ? "max-w-[20rem] text-[2.25rem] leading-[1.1] sm:max-w-md sm:text-5xl lg:text-[3.25rem]"
              : "max-w-xl text-[1.75rem] leading-tight sm:text-4xl lg:text-[2.5rem]"
          }`}
        >
          {title}
        </h1>
        <p
          className={`mt-3 text-[0.9375rem] leading-6 text-muted sm:max-w-md sm:text-lg sm:leading-7 ${
            mobileBackdrop ? "max-w-[60vw]" : hasMobileSrc ? mobileDescriptionWidth : "max-w-md"
          }`}
        >
          {description}
        </p>
        {children && (
          <div className={mobileBackdrop ? "mt-20 md:mt-7" : "mt-6 sm:mt-7"}>{children}</div>
        )}
      </Container>
    </section>
  );
}

function ArtDirectedImage({
  src,
  mobileSrc,
  alt,
  sizes,
  className,
}: {
  src: string;
  mobileSrc: string;
  alt: string;
  sizes: string;
  className: string;
}) {
  const common = { alt, sizes, fill: true, fetchPriority: "high" as const };
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ ...common, src });
  const { props: mobileProps } = getImageProps({ ...common, src: mobileSrc });

  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktopSrcSet} sizes={sizes} />
      <img {...mobileProps} alt={alt} className={className} />
    </picture>
  );
}
