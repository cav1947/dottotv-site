// Helpers minime peste Upstash Redis REST API.
// Folosit atât în middleware (Edge runtime) cât și în route handlers.

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

export const SHORT_KEY_PREFIX = "short:";

export interface ShortLinkRecord {
  url: string;
  title?: string;
  description?: string;
  image?: string;
}

type RedisResponse<T> = { result?: T; error?: string };

async function redisCommand<T>(args: (string | number)[]): Promise<T> {
  if (!REDIS_URL || !REDIS_TOKEN) {
    throw new Error("UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN nu sunt setate.");
  }

  const res = await fetch(REDIS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Upstash Redis: HTTP ${res.status}`);
  }

  const data = (await res.json()) as RedisResponse<T>;
  if (data.error) throw new Error(data.error);
  return data.result as T;
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
