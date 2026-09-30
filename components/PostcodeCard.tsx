"use client";

import { useState, type FormEvent } from "react";
import { buttonStyles } from "./Button";
import { ArrowRightIcon, LockIcon } from "./icons";

const UK_POSTCODE = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;

type Message = { type: "error" | "info"; text: string };

export function PostcodeCard({ buttonLabel }: { buttonLabel: string }) {
  const [message, setMessage] = useState<Message | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const postcode = String(new FormData(event.currentTarget).get("postcode") ?? "").trim();

    setMessage(
      UK_POSTCODE.test(postcode)
        ? { type: "info", text: "Comparison is coming soon. We're working on connecting live deals." }
        : { type: "error", text: "Please enter a valid UK postcode, e.g. SW1A 1AA." },
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="max-w-xl rounded-xl border border-line bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-5"
    >
      <label htmlFor="postcode" className="text-sm font-medium text-navy">
        Your postcode
      </label>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <input
          id="postcode"
          name="postcode"
          type="text"
          autoComplete="postal-code"
          placeholder="e.g. SW1A 1AA"
          maxLength={10}
          aria-invalid={message?.type === "error"}
          aria-describedby={message ? "postcode-message" : undefined}
          onChange={() => setMessage(null)}
          className={`h-12 w-full min-w-0 shrink-0 rounded-md sm:flex-1 border bg-white px-4 text-base text-navy placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 ${
            message?.type === "error" ? "border-red-500" : "border-line"
          }`}
        />
        <button type="submit" className={`${buttonStyles("primary", "md")} h-12 sm:px-6`}>
          {buttonLabel}
          <ArrowRightIcon className="h-[1.1em] w-[1.1em] shrink-0" />
        </button>
      </div>

      {message && (
        <p
          id="postcode-message"
          role={message.type === "error" ? "alert" : "status"}
          className={`mt-3 text-sm font-medium ${
            message.type === "error" ? "text-red-700" : "text-brand-dark"
          }`}
        >
          {message.text}
        </p>
      )}

      <p className="mt-3 flex items-center gap-2 text-xs text-muted">
        <LockIcon className="h-3.5 w-3.5" />
        We don&apos;t store your postcode
      </p>
    </form>
  );
}
