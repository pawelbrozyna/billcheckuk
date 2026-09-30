import type { ConfigOptions, MeasurementConfig, Results } from "@cloudflare/speedtest";

export type SpeedTestPhase = "latency" | "download" | "upload";

export type SpeedTestProgress = {
  phase: SpeedTestPhase;
  downloadMbps?: number;
  uploadMbps?: number;
  latencyMs?: number;
};

export type SpeedTestResult = {
  downloadMbps: number;
  uploadMbps: number;
  latencyMs: number;
  jitterMs?: number;
};

type SpeedTestHandlers = {
  onProgress: (progress: SpeedTestProgress) => void;
  onFinish: (result: SpeedTestResult) => void;
  onError: () => void;
};

/**
 * Third-party measurement gate. The test is only ever started by an explicit
 * user click; if a consent manager is added later, return its decision here.
 */
export function isSpeedTestAllowed(): boolean {
  return true;
}

const TIMEOUT_MS = 150_000;

// Based on Cloudflare's default sequence, ordered so each phase runs once
// (latency, download, upload), without packet loss or the 250 MB round. A size
// round always completes before the engine stops, so the rounds that are slow on
// ~10/1 Mbps lines use fewer requests to keep the test well inside the timeout.
const MEASUREMENTS: MeasurementConfig[] = [
  { type: "latency", numPackets: 20 },
  { type: "download", bytes: 1e5, count: 1, bypassMinDuration: true },
  { type: "download", bytes: 1e5, count: 9 },
  { type: "download", bytes: 1e6, count: 8 },
  { type: "download", bytes: 1e7, count: 4 },
  { type: "download", bytes: 2.5e7, count: 4 },
  { type: "download", bytes: 1e8, count: 3 },
  { type: "upload", bytes: 1e5, count: 8 },
  { type: "upload", bytes: 1e6, count: 4 },
  { type: "upload", bytes: 1e7, count: 4 },
  { type: "upload", bytes: 2.5e7, count: 4 },
  { type: "upload", bytes: 5e7, count: 3 },
];

const CONFIG: ConfigOptions = {
  autoStart: false,
  measurements: MEASUREMENTS,
  // Results stay in the browser: nothing is logged to Cloudflare's results API.
  logAimApiUrl: null,
  logMeasurementApiUrl: null,
  measureDownloadLoadedLatency: false,
  measureUploadLoadedLatency: false,
};

const toMbps = (bps: number | undefined) => (bps === undefined ? undefined : bps / 1e6);

function readProgress(results: Results, phase: SpeedTestPhase): SpeedTestProgress {
  return {
    phase,
    downloadMbps: toMbps(results.getDownloadBandwidth()),
    uploadMbps: toMbps(results.getUploadBandwidth()),
    latencyMs: results.getUnloadedLatency(),
  };
}

/**
 * Loads the Cloudflare engine on demand and runs a single measurement.
 * Returns a function that stops the test and silences any further callbacks.
 */
export async function startSpeedTest(handlers: SpeedTestHandlers): Promise<() => void> {
  const { default: SpeedTest } = await import("@cloudflare/speedtest");
  const engine = new SpeedTest(CONFIG);

  let active = true;
  let phase: SpeedTestPhase = "latency";

  const stop = () => {
    if (!active) return;
    active = false;
    clearTimeout(timeout);
    engine.pause();
  };

  const fail = () => {
    if (!active) return;
    stop();
    handlers.onError();
  };

  const timeout = setTimeout(fail, TIMEOUT_MS);

  engine.onPhaseChange = ({ measurement }) => {
    if (!active || measurement.type === "packetLoss") return;
    phase = measurement.type;
    handlers.onProgress(readProgress(engine.results, phase));
  };

  engine.onResultsChange = () => {
    if (active) handlers.onProgress(readProgress(engine.results, phase));
  };

  engine.onError = fail;

  engine.onFinish = (results) => {
    if (!active) return;
    const downloadMbps = toMbps(results.getDownloadBandwidth());
    const uploadMbps = toMbps(results.getUploadBandwidth());
    const latencyMs = results.getUnloadedLatency();
    const jitterMs = results.getUnloadedJitter();

    if (downloadMbps === undefined || uploadMbps === undefined || latencyMs === undefined) {
      fail();
      return;
    }

    stop();
    handlers.onFinish({
      downloadMbps,
      uploadMbps,
      latencyMs,
      jitterMs: typeof jitterMs === "number" ? jitterMs : undefined,
    });
  };

  engine.play();
  return stop;
}
