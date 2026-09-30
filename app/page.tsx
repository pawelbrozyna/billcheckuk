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
        <div className="mx-auto flex h-14 max-w-5xl items-center px-4 sm:px-6">
          <span className="text-xl font-semibold tracking-tight text-slate-900">
            BillCheck<span className="text-blue-700">UK</span>
          </span>
        </div>
      </header>

      <main className="flex-1 bg-slate-50">
        <section className="mx-auto max-w-5xl px-4 pb-10 pt-16 text-center sm:px-6 sm:py-14">
          <h1 className="whitespace-nowrap text-[6vw] font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Check your bills. <span className="text-blue-700">Pay less.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-6 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8">
            We&apos;re building simple tools to help UK households check their
            energy and broadband costs and find better deals.
          </p>

          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-4 sm:mt-10 sm:gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="flex flex-col items-center rounded-xl border border-slate-200 bg-white px-4 py-6 shadow-sm transition-colors hover:border-blue-300 sm:p-8"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700 sm:h-12 sm:w-12">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    aria-hidden="true"
                  >
                    {service.icon}
                  </svg>
                </div>
                <h2 className="mt-3 text-base font-semibold text-slate-900 sm:mt-5 sm:text-xl">
                  {service.title}
                </h2>
                <p className="mt-2 text-[13px] leading-5 text-slate-600 sm:text-base">
                  {service.description}
                </p>
                <span className="mt-3 whitespace-nowrap rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600 sm:mt-6 sm:px-3 sm:text-xs">
                  Coming soon
                </span>
              </div>
            ))}
          </div>

          <p className="mt-8 text-sm text-slate-500 sm:mt-10">
            More household bill checks{" "}
            <span className="font-medium text-blue-700">coming soon</span>.
          </p>
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
