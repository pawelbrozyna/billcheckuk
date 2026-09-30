import type { ReactNode } from "react";
import { Container } from "./Container";

type ContentPageProps = {
  title: string;
  intro: string;
  children: ReactNode;
};

export function ContentPage({ title, intro, children }: ContentPageProps) {
  return (
    <section className="bg-white">
      <Container className="py-12 sm:py-16">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight text-navy sm:text-4xl">{title}</h1>
          <p className="mt-4 text-lg leading-8 text-muted">{intro}</p>
          <div className="mt-10 space-y-4 leading-7 text-muted [&_a]:font-medium [&_a]:text-brand-dark [&_a]:underline [&_a]:underline-offset-4 [&_h2]:pt-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-navy [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
            {children}
          </div>
        </div>
      </Container>
    </section>
  );
}
