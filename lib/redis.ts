// Helpers minime peste Upstash Redis REST API.
// Folosit atât în middleware (Edge runtime) cât și în route handlers.
//
// Vercel KV / integrarea Upstash provisionează variabilele cu prefix KV_*.
// Acceptăm și UPSTASH_* ca fallback pentru setup manual / dev local.

const REDIS_URL = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

export const SHORT_KEY_PREFIX = "short:";

export interface ShortLinkRecord {
  url: string;
  title?: string;
  description?: string;
  image?: string;
}

type RedisResponse<T> = { result?: T; error?: string };

async function redisCommand<T>(args: (string | number)[]): Promise<T> {
  const missing: string[] = [];
  if (!REDIS_URL) missing.push("KV_REST_API_URL");
  if (!REDIS_TOKEN) missing.push("KV_REST_API_TOKEN");
  if (missing.length) {
    throw new Error(`Variabile de mediu Upstash/KV lipsă: ${missing.join(", ")}`);
  }

  const command = String(args[0] ?? "");
  let res: Response;
  try {
    res = await fetch(REDIS_URL!, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${REDIS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
      cache: "no-store",
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new Error(`Upstash fetch eșuat (${command}): ${msg}`);
  }

  if (!res.ok) {
    let body = "";
    try {
      body = (await res.text()).slice(0, 500);
    } catch {
      body = "<corp ne-citibil>";
    }
    throw new Error(`Upstash HTTP ${res.status} pe ${command}: ${body}`);
  }

  let data: RedisResponse<T>;
  try {
    data = (await res.json()) as RedisResponse<T>;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new Error(`Upstash răspuns ne-JSON pe ${command}: ${msg}`);
  }

  if (data.error) {
    throw new Error(`Upstash error pe ${command}: ${data.error}`);
  }
  return data.result as T;
}

export function getRedisEnvStatus(): { hasUrl: boolean; hasToken: boolean; urlHost: string | null } {
  let urlHost: string | null = null;
  if (REDIS_URL) {
    try {
      urlHost = new URL(REDIS_URL).host;
    } catch {
      urlHost = "<URL invalid>";
    }
  }
  return {
    hasUrl: Boolean(REDIS_URL),
    hasToken: Boolean(REDIS_TOKEN),
    urlHost,
  };
}

export async function pingRedis(): Promise<string> {
  return redisCommand<string>(["PING"]);
}

// Parse-uiește valoarea brută din Redis. Acceptă și formatul vechi
// (string plain cu URL) pentru linkuri create înainte de migrare.
export function parseShortLinkValue(raw: string | null | undefined): ShortLinkRecord | null {
  if (typeof raw !== "string" || !raw) return null;
  if (raw.startsWith("{")) {
    try {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object" && typeof parsed.url === "string") {
        return parsed as ShortLinkRecord;
      }
    } catch {
      /* fallthrough la string plain */
    }
  }
  return { url: raw };
}

export async function getShortLinkRecord(code: string): Promise<ShortLinkRecord | null> {
  const result = await redisCommand<string | null>(["GET", `${SHORT_KEY_PREFIX}${code}`]);
  return parseShortLinkValue(result);
}

export async function shortLinkExists(code: string): Promise<boolean> {
  const result = await redisCommand<number>(["EXISTS", `${SHORT_KEY_PREFIX}${code}`]);
  return result === 1;
}

export async function setShortLinkRecord(code: string, record: ShortLinkRecord): Promise<void> {
  await redisCommand<string>(["SET", `${SHORT_KEY_PREFIX}${code}`, JSON.stringify(record)]);
}
