import { Container } from "./Container";

type Step = { title: string; text: string };

export function Steps({ title, steps }: { title: string; steps: Step[] }) {
  return (
    <section className="bg-white">
      <Container className="py-10 sm:py-12">
        <h2 className="text-xl font-bold tracking-tight text-navy sm:text-2xl">{title}</h2>
        <ol className="mt-6 grid gap-6 sm:grid-cols-3 sm:gap-8">
          {steps.map((step, index) => (
            <li key={step.title} className="flex gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-soft text-sm font-semibold text-cta">
                {index + 1}
              </span>
              <div>
                <h3 className="text-[0.9375rem] font-semibold text-navy">{step.title}</h3>
                <p className="mt-1 text-sm leading-6 text-muted">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
