import { NextResponse } from "next/server";
import { getRedisEnvStatus, pingRedis } from "@/lib/redis";

// GET /api/shorten/health — verifică conexiunea la Upstash Redis
// Returnează: env vars present, host, ping result.
export async function GET() {
  const env = getRedisEnvStatus();
  let ping: string | null = null;
  let error: string | null = null;

  if (env.hasUrl && env.hasToken) {
    try {
      ping = await pingRedis();
    } catch (err) {
      error = err instanceof Error ? err.message : String(err);
    }
  } else {
    error = "Variabile de mediu lipsă.";
  }

  return NextResponse.json({
    env,
    ping,
    ok: ping === "PONG",
    error,
    runtime: process.env.NEXT_RUNTIME ?? "unknown",
    vercelEnv: process.env.VERCEL_ENV ?? null,
  });
}
