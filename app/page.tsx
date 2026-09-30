const services = [
  {
    title: "Energy",
    description: "Check your energy costs and compare available tariffs.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"
      />
    ),
  },
  {
    title: "Broadband",
    description: "Check your broadband speed, availability and deals.",
    icon: (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2 8.8a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"
        />
        <circle cx="12" cy="19.5" r="1" fill="currentColor" />
      </>
    ),
  },
];

export default function Home() {
  return (
    <>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-center px-6 sm:justify-start">
          <span className="text-xl font-semibold tracking-tight text-slate-900">
            BillCheck<span className="text-blue-700">UK</span>
          </span>
        </div>
      </header>

      <main className="flex-1 bg-slate-50">
        <section className="mx-auto max-w-5xl px-6 py-10 text-center sm:py-14">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Check your bills. <span className="text-blue-700">Pay less.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            We&apos;re building simple tools to help UK households check their
            energy and broadband costs and find better deals.
          </p>

          <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
            {services.map((service) => (
              <div
                key={service.title}
                className="flex flex-col items-center rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition-colors hover:border-blue-300"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="h-6 w-6"
                    aria-hidden="true"
                  >
                    {service.icon}
                  </svg>
                </div>
                <h2 className="mt-5 text-xl font-semibold text-slate-900">
                  {service.title}
                </h2>
                <p className="mt-2 text-slate-600">{service.description}</p>
                <span className="mt-6 whitespace-nowrap rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  Coming soon
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-6 text-center text-sm text-slate-500">
          &copy; 2026 BillCheckUK
        </div>
      </footer>
    </>
  );
}
