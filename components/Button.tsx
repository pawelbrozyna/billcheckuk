import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRightIcon } from "./icons";

type ButtonVariant = "primary" | "outline" | "secondary";
type ButtonSize = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-[color,background-color,border-color,transform] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-cta text-white hover:bg-cta-hover active:bg-brand-dark",
  outline: "border border-cta bg-white text-cta hover:bg-brand-soft active:bg-blue-100",
  secondary:
    "border border-line bg-white text-navy hover:border-brand hover:text-brand-dark active:border-brand active:bg-surface",
};

const sizes: Record<ButtonSize, string> = {
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-13 px-8 text-base",
};

export function buttonStyles(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
): string {
  return `${base} ${variants[variant]} ${sizes[size]}`;
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  arrow?: boolean;
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  className = "",
}: ButtonLinkProps) {
  return (
    <Link href={href} className={`${buttonStyles(variant, size)} ${className}`}>
      {children}
      {arrow && <ArrowRightIcon className="h-[1.1em] w-[1.1em] shrink-0" />}
    </Link>
  );
}
