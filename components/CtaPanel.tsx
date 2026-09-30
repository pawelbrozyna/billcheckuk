import type { ReactNode } from "react";
import { ButtonLink } from "./Button";
import { Container } from "./Container";

type CtaPanelProps = {
  title: string;
  text: string;
  href: string;
  label: string;
  icon?: ReactNode;
};

export function CtaPanel({ title, text, href, label, icon }: CtaPanelProps) {
  return (
    <section className="bg-white">
      <Container className="py-6 sm:py-8">
        <div className="flex flex-col gap-4 rounded-xl border border-line bg-hero p-4 sm:p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            {icon && (
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-cta sm:h-14 sm:w-14">
                {icon}
              </span>
            )}
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-navy sm:text-xl">{title}</h2>
              <p className="mt-0.5 text-sm text-muted sm:text-base">{text}</p>
            </div>
          </div>
          <ButtonLink href={href} arrow className="w-full shrink-0 md:w-auto">
            {label}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
