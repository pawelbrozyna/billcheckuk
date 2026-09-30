"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import {
  CONTACT_LIMITS,
  validateContact,
  type ContactErrors,
  type ContactInput,
} from "@/lib/contact";
import { buttonStyles } from "./Button";
import { CheckCircleIcon } from "./icons";

type Status = "idle" | "submitting" | "success" | "error";

type ApiResponse = { ok?: boolean; error?: string; errors?: ContactErrors };

const inputClasses =
  "block w-full rounded-md border bg-white px-3.5 py-2.5 text-base text-navy placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [formError, setFormError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const input: ContactInput = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };

    const found = validateContact(input);
    setErrors(found);
    setFormError("");

    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...input, website: String(data.get("website") ?? "") }),
      });
      const result = (await response.json().catch(() => ({}))) as ApiResponse;

      if (!response.ok) {
        if (result.errors) setErrors(result.errors);
        setFormError(result.error ?? "Sorry, something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      setFormError("We couldn't reach the server. Please check your connection and try again.");
      setStatus("error");
    }
  }

  function clearError(field: keyof ContactInput) {
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-lg border border-success/30 bg-success/5 p-6">
        <div className="flex gap-3">
          <CheckCircleIcon className="h-6 w-6 shrink-0 text-success" />
          <div>
            <h2 className="font-semibold text-navy">Thanks, your message has been sent.</h2>
            <p className="mt-1 text-muted">We&apos;ll get back to you as soon as we can.</p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-4 rounded-sm text-sm font-medium text-brand-dark underline-offset-4 hover:underline"
            >
              Send another message
            </button>
          </div>
        </div>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className="relative space-y-5">
      <Field label="Name" name="name" error={errors.name}>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          maxLength={CONTACT_LIMITS.name}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          onChange={() => clearError("name")}
          className={`${inputClasses} ${errors.name ? "border-red-500" : "border-line"}`}
        />
      </Field>

      <Field label="Email" name="email" error={errors.email}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={CONTACT_LIMITS.email}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          onChange={() => clearError("email")}
          className={`${inputClasses} ${errors.email ? "border-red-500" : "border-line"}`}
        />
      </Field>

      <Field label="Message" name="message" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={6}
          maxLength={CONTACT_LIMITS.message}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          onChange={() => clearError("message")}
          className={`${inputClasses} resize-y ${errors.message ? "border-red-500" : "border-line"}`}
        />
      </Field>

      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {formError && (
        <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className={`${buttonStyles("primary", "md")} w-full sm:w-auto`}
      >
        {submitting ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-navy">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
