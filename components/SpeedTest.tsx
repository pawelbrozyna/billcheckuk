"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  isSpeedTestAllowed,
  startSpeedTest,
  type SpeedTestPhase,
  type SpeedTestProgress,
  type SpeedTestResult,
} from "@/lib/speedtest";
import { ButtonLink, buttonStyles } from "./Button";
import { DownloadIcon, PulseIcon, UploadIcon } from "./icons";
import { SpeedGauge } from "./SpeedGauge";

type Status = "idle" | "running" | "done" | "error";

const PHASES: { id: SpeedTestPhase; label: string; message: string }[] = [
  { id: "latency", label: "Latency", message: "Testing latency…" },
  { id: "download", label: "Download", message: "Testing download speed…" },
  { id: "upload", label: "Upload", message: "Testing upload speed…" },
];

/** Rough share of the whole test reached in each phase, for the progress bar only. */
const PHASE_PROGRESS = ["18%", "58%", "90%"];

const formatMbps = (mbps: number) => mbps.toFixed(1);
const formatMs = (ms: number) => Math.round(ms).toString();

function interpretDownload(mbps: number): string {
  if (mbps < 10) return "Your connection may struggle with multiple devices or high-quality streaming.";
  if (mbps < 30) return "Suitable for everyday browsing, video calls and HD streaming.";
  if (mbps < 100) return "Good for streaming, video calls and multiple connected devices.";
  if (mbps < 300) return "Fast connection suitable for multiple devices and 4K streaming.";
  return "Very fast connection suitable for demanding households and multiple high-bandwidth devices.";
}

export function SpeedTest() {
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState<SpeedTestProgress | null>(null);
  const [result, setResult] = useState<SpeedTestResult | null>(null);
  const [runId, setRunId] = useState(0);
  const runIdRef = useRef(0);
  const stopRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    return () => {
      runIdRef.current += 1;
      stopRef.current?.();
    };
  }, []);

  async function start() {
    if (!isSpeedTestAllowed()) return;

    stopRef.current?.();
    stopRef.current = null;
    const id = ++runIdRef.current;
    const isCurrent = () => id === runIdRef.current;

    setRunId(id);
    setResult(null);
    setProgress({ phase: "latency" });
    setStatus("running");

    if (!navigator.onLine) {
      setStatus("error");
      return;
    }

    try {
      const stop = await startSpeedTest({
        onProgress: (next) => {
          if (isCurrent()) setProgress(next);
        },
        onFinish: (final) => {
          if (!isCurrent()) return;
          setResult(final);
          setStatus("done");
        },
        onError: () => {
          if (isCurrent()) setStatus("error");
        },
      });
      if (isCurrent()) stopRef.current = stop;
      else stop();
    } catch {
      if (isCurrent()) setStatus("error");
    }
  }

  const phase = progress?.phase ?? "latency";
  const phaseIndex = PHASES.findIndex((item) => item.id === phase);

  return (
    <div className="max-w-2xl rounded-xl border border-line/80 bg-white p-6 shadow-[0_1px_3px_rgba(15,23,42,0.05),0_4px_16px_rgba(15,23,42,0.04)] sm:p-8">
      <div className="flex flex-col items-center text-center">
        {status === "idle" && (
          <>
            <SpeedGauge idleText="Ready" />
            <button
              type="button"
              onClick={start}
              className={`${buttonStyles("primary", "lg")} group mt-2 w-full gap-2.5 shadow-[0_8px_20px_-8px_rgba(11,107,255,0.65)] transition-[background-color,box-shadow,transform] hover:-translate-y-px hover:shadow-[0_12px_24px_-10px_rgba(11,107,255,0.75)] active:translate-y-0 sm:w-auto sm:min-w-64`}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 translate-x-px fill-white motion-safe:transition-transform motion-safe:group-hover:scale-110" aria-hidden="true">
                  <path d="M4.5 2.8v10.4a.8.8 0 0 0 1.2.7l8.3-5.2a.8.8 0 0 0 0-1.4L5.7 2.1a.8.8 0 0 0-1.2.7Z" />
                </svg>
              </span>
              Start speed test
            </button>
            <p className="mt-3 text-xs leading-5 text-slate-500">
              The test may use a small amount of data and takes around 20–30 seconds.
            </p>
          </>
        )}

        {status === "running" && (
          <>
            <RunningGauge key={`${runId}-${phase}`} progress={progress} />
            <p aria-live="polite" className="text-sm text-muted">
              {PHASES[phaseIndex].message}
            </p>
            <PhaseSteps phaseIndex={phaseIndex} />
            <div className="mt-5 h-1 w-full max-w-xs overflow-hidden rounded-full bg-brand-soft" aria-hidden="true">
              <div
                className="h-full rounded-full bg-cta transition-[width] duration-1000 ease-out motion-reduce:transition-none"
                style={{ width: PHASE_PROGRESS[phaseIndex] }}
              />
            </div>
          </>
        )}

        {status === "done" && result && <Results result={result} onRestart={start} />}

        {status === "error" && (
          <div role="alert" className="py-4">
            <p className="font-semibold text-navy">We couldn&apos;t complete the speed test.</p>
            <p className="mt-1 text-sm text-muted">Please check your connection and try again.</p>
            <button
              type="button"
              onClick={start}
              className={`${buttonStyles("primary", "lg")} mt-5 w-full sm:w-auto sm:min-w-64`}
            >
              Try again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function RunningGauge({ progress }: { progress: SpeedTestProgress | null }) {
  if (progress?.phase === "latency") {
    return (
      <SpeedGauge
        display={progress.latencyMs}
        unit="ms"
        decimals={0}
        caption="Latency"
        idleText="Starting…"
      />
    );
  }

  const isUpload = progress?.phase === "upload";
  const mbps = isUpload ? progress?.uploadMbps : progress?.downloadMbps;
  return <SpeedGauge mbps={mbps} caption={isUpload ? "Upload" : "Download"} idleText="Measuring…" />;
}

function PhaseSteps({ phaseIndex }: { phaseIndex: number }) {
  return (
    <ol className="mt-4 flex items-center justify-center rounded-full border border-line/70 bg-surface px-3.5 py-2 text-xs sm:px-5 sm:text-sm">
      {PHASES.map((item, index) => {
        const state = index < phaseIndex ? "done" : index === phaseIndex ? "current" : "waiting";
        return (
          <li key={item.id} className="flex items-center">
            {index > 0 && (
              <span
                aria-hidden="true"
                className={`mx-2 h-0.5 w-4 rounded-full sm:mx-3 sm:w-8 ${index <= phaseIndex ? "bg-success/50" : "bg-slate-200"}`}
              />
            )}
            <span className="flex items-center gap-1.5">
              <StepIndicator state={state} />
              <span
                className={
                  state === "current"
                    ? "font-semibold text-navy"
                    : state === "done"
                      ? "font-medium text-navy"
                      : "text-slate-400"
                }
              >
                {item.label}
              </span>
              <span className="sr-only">
                {state === "done" ? "(complete)" : state === "current" ? "(in progress)" : "(waiting)"}
              </span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function StepIndicator({ state }: { state: "done" | "current" | "waiting" }) {
  if (state === "done") {
    return (
      <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0" aria-hidden="true">
        <circle cx="8" cy="8" r="8" className="fill-success" />
        <path d="m4.8 8.2 2.1 2.1 4.3-4.4" fill="none" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (state === "current") {
    return (
      <span
        aria-hidden="true"
        className="h-4 w-4 shrink-0 rounded-full border-2 border-cta/25 border-t-cta motion-safe:animate-spin"
      />
    );
  }
  return <span aria-hidden="true" className="h-4 w-4 shrink-0 rounded-full border-2 border-slate-200" />;
}

function Results({ result, onRestart }: { result: SpeedTestResult; onRestart: () => void }) {
  const summary = `Test complete. Download ${formatMbps(result.downloadMbps)} megabits per second, upload ${formatMbps(result.uploadMbps)} megabits per second, latency ${formatMs(result.latencyMs)} milliseconds.`;

  return (
    <div className="w-full">
      <p role="status" className="sr-only">
        {summary}
      </p>

      <dl className="grid grid-cols-3 gap-2 sm:gap-4">
        <Metric
          icon={<DownloadIcon className="h-4 w-4" />}
          label="Download"
          value={formatMbps(result.downloadMbps)}
          unit="Mbps"
          featured
        />
        <Metric icon={<UploadIcon className="h-4 w-4" />} label="Upload" value={formatMbps(result.uploadMbps)} unit="Mbps" />
        <Metric
          icon={<PulseIcon className="h-4 w-4" />}
          label="Latency"
          value={formatMs(result.latencyMs)}
          unit="ms"
          extra={result.jitterMs !== undefined ? `Jitter ${formatMs(result.jitterMs)} ms` : undefined}
        />
      </dl>

      <p className="mx-auto mt-5 max-w-md text-[0.9375rem] leading-6 text-navy">
        {interpretDownload(result.downloadMbps)}
      </p>
      <p className="mt-1 text-xs text-slate-600">General guidance based on your download speed.</p>

      <div className="mt-6 rounded-lg bg-surface p-4 text-left sm:flex sm:items-center sm:justify-between sm:gap-4 sm:p-5">
        <div>
          <h2 className="font-semibold text-navy">Could your broadband be faster?</h2>
          <p className="mt-0.5 text-sm text-muted">Compare broadband deals available in your area.</p>
        </div>
        <ButtonLink href="/broadband" arrow className="mt-3 w-full shrink-0 sm:mt-0 sm:w-auto">
          Check broadband deals
        </ButtonLink>
      </div>

      <button
        type="button"
        onClick={onRestart}
        className="mt-4 rounded-md px-3 py-2 text-sm font-medium text-brand-dark underline-offset-4 hover:underline active:text-navy"
      >
        Test again
      </button>
    </div>
  );
}

function Metric({
  icon,
  label,
  value,
  unit,
  extra,
  featured = false,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  unit: string;
  extra?: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center rounded-lg border px-1 py-4 sm:px-3 ${
        featured ? "border-cta/30 bg-brand-soft" : "border-line bg-white"
      }`}
    >
      <dt className="flex flex-col items-center gap-1.5 text-xs font-semibold text-slate-700 sm:text-sm">
        <span
          className={`flex h-7 w-7 items-center justify-center rounded-full ${
            featured ? "bg-cta text-white" : "bg-brand-soft text-cta"
          }`}
        >
          {icon}
        </span>
        {label}
      </dt>
      <dd className="mt-1.5">
        <span
          className={`block font-extrabold leading-none tabular-nums tracking-tight text-slate-950 ${
            featured ? "text-[1.75rem] sm:text-4xl" : "text-2xl sm:text-3xl"
          }`}
        >
          {value}
        </span>
        <span className="mt-1 block text-xs font-semibold text-slate-600">{unit}</span>
      </dd>
      {extra && <dd className="mt-1 text-[0.6875rem] font-medium text-slate-600 sm:text-xs">{extra}</dd>}
    </div>
  );
}
