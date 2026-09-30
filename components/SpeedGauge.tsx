"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
}

/** Eases towards `target`; jumps straight to it when reduced motion is preferred. */
function useAnimatedValue(target: number | undefined): number | undefined {
  const reducedMotion = useReducedMotion();
  const [value, setValue] = useState(target);
  const valueRef = useRef(target);

  useEffect(() => {
    if (reducedMotion || target === undefined) return;
    const from = valueRef.current ?? target;
    const startedAt = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - startedAt) / 600);
      const next = from + (target - from) * (1 - (1 - t) ** 3);
      valueRef.current = next;
      setValue(next);
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, reducedMotion]);

  return reducedMotion || target === undefined ? target : value;
}

// Log scale so everyday speeds (10–100 Mbps) use most of the arc; 1 Gbps fills it.
const MAX_MBPS = 1000;
const gaugeFraction = (mbps: number) =>
  Math.min(1, Math.log10(1 + Math.max(0, mbps)) / Math.log10(1 + MAX_MBPS));

const ARC = "M 30.7 140 A 80 80 0 1 1 169.3 140";

type SpeedGaugeProps = {
  /** Value for the arc, in Mbps. */
  mbps?: number;
  /** Value shown in the centre; defaults to `mbps`. */
  display?: number;
  unit?: string;
  caption?: string;
  /** Text shown in the centre when there is no value yet. */
  idleText?: string;
  decimals?: number;
};

export function SpeedGauge({
  mbps,
  display = mbps,
  unit = "Mbps",
  caption,
  idleText,
  decimals = 1,
}: SpeedGaugeProps) {
  const animatedMbps = useAnimatedValue(mbps);
  const animatedDisplay = useAnimatedValue(display);
  const fraction = animatedMbps === undefined ? 0 : gaugeFraction(animatedMbps);

  return (
    <div className="relative mx-auto w-full max-w-[13rem] sm:max-w-[14rem]" aria-hidden="true">
      <svg viewBox="0 0 200 152" className="w-full">
        <path d={ARC} fill="none" stroke="#e8f1fe" strokeWidth="15" strokeLinecap="round" pathLength={100} />
        <path
          d={ARC}
          fill="none"
          stroke="var(--color-cta)"
          strokeWidth="15"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray={`${fraction * 100} 100`}
          opacity={fraction > 0 ? 1 : 0}
        />
      </svg>

      {animatedDisplay === undefined && !caption ? (
        <span className="absolute inset-x-0 top-[62%] -translate-y-1/2 text-lg font-semibold text-navy sm:text-xl">
          {idleText}
        </span>
      ) : (
        <div className="absolute inset-x-0 top-[30%] flex flex-col items-center">
          {animatedDisplay === undefined ? (
            <span className="text-sm font-medium text-muted">{idleText}</span>
          ) : (
            <>
              <span className="text-5xl font-bold leading-none tabular-nums tracking-tight text-navy">
                {animatedDisplay.toFixed(decimals)}
              </span>
              <span className="mt-1.5 text-xs font-medium text-muted">{unit}</span>
            </>
          )}
          {caption && (
            <span className="mt-2 text-xs font-semibold uppercase tracking-wider text-cta">{caption}</span>
          )}
        </div>
      )}
    </div>
  );
}
