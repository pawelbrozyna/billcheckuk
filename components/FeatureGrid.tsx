import type { ReactNode } from "react";
import { Container } from "./Container";

export type Feature = {
  icon: ReactNode;
  title: string;
  text: string;
};

export function FeatureGrid({ title, features }: { title?: string; features: Feature[] }) {
  return (
    <section className="bg-white">
      <Container className="py-10 sm:py-12">
        {title && (
          <h2 className="mb-6 text-xl font-bold tracking-tight text-navy sm:text-2xl">{title}</h2>
        )}
        <ul className="grid gap-6 sm:grid-cols-3 sm:gap-8">
          {features.map((feature) => (
            <li key={feature.title} className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-cta">
                {feature.icon}
              </span>
              <div>
                <h3 className="text-[0.9375rem] font-semibold text-navy">{feature.title}</h3>
                <p className="mt-1 text-sm leading-6 text-muted">{feature.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
