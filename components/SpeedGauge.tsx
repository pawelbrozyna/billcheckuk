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

const CX = 100;
const CY = 100;
const RADIUS = 80;
const SWEEP = 240;
const START_ANGLE = 210;
const SEGMENT_COUNT = 30;
const SEGMENT_GAP = 2.4;
const UNLIT_COLOUR = "#e9eef5";

const point = (angle: number) => {
  const radians = (angle * Math.PI) / 180;
  return `${(CX + RADIUS * Math.cos(radians)).toFixed(2)} ${(CY - RADIUS * Math.sin(radians)).toFixed(2)}`;
};

const SEGMENTS = Array.from({ length: SEGMENT_COUNT }, (_, index) => {
  const span = SWEEP / SEGMENT_COUNT;
  const from = START_ANGLE - index * span - SEGMENT_GAP / 2;
  const to = from - span + SEGMENT_GAP;
  const hue = Math.round((index / (SEGMENT_COUNT - 1)) * 135);
  return {
    key: index,
    threshold: index / SEGMENT_COUNT,
    d: `M ${point(from)} A ${RADIUS} ${RADIUS} 0 0 1 ${point(to)}`,
    colour: `hsl(${hue} 72% 46%)`,
  };
});

type SpeedGaugeProps = {
  /** Value that lights the arc, in Mbps. */
  mbps?: number;
  /** Value shown in the readout; defaults to `mbps`. */
  display?: number;
  unit?: string;
  caption?: string;
  /** Text shown in the readout when there is no value yet. */
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
  const fraction = animatedMbps === undefined || animatedMbps <= 0 ? -1 : gaugeFraction(animatedMbps);

  return (
    <div className="relative mx-auto w-full max-w-[15rem] sm:max-w-[16.5rem]" aria-hidden="true">
      <svg viewBox="0 6 200 142" className="w-full">
        {SEGMENTS.map((segment) => (
          <path
            key={segment.key}
            d={segment.d}
            fill="none"
            strokeWidth="14"
            stroke={segment.threshold <= fraction ? segment.colour : UNLIT_COLOUR}
            className="motion-safe:transition-[stroke] motion-safe:duration-200"
          />
        ))}
      </svg>

      <div className="absolute inset-x-0 top-[64%] flex -translate-y-1/2 flex-col items-center">
        {animatedDisplay === undefined ? (
          <span className={caption ? "text-sm font-medium text-muted" : "text-xl font-semibold text-navy"}>
            {idleText}
          </span>
        ) : (
          <>
            <span className="text-[2.5rem] font-bold leading-none tabular-nums tracking-tight text-navy sm:text-[2.75rem]">
              {animatedDisplay.toFixed(decimals)}
            </span>
            <span className="mt-1 text-sm font-medium text-muted">{unit}</span>
          </>
        )}
        {caption && (
          <span className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-cta">{caption}</span>
        )}
      </div>
    </div>
  );
}
