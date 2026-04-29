import { NextRequest, NextResponse } from "next/server";
import { setShortLinkRecord, shortLinkExists } from "@/lib/redis";
import { fetchOgData } from "@/lib/og-extract";

// Alfabet fără caractere ambigue (0/O/I/l/1)
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
const ALLOWED_HOSTS = new Set(["dottotv.ro", "www.dottotv.ro"]);
const SHORT_DOMAIN = "https://go.dottotv.ro";

function generateCode(len = 6): string {
  const bytes = crypto.getRandomValues(new Uint8Array(len));
  let result = "";
  for (let i = 0; i < len; i++) {
    result += ALPHABET[bytes[i] % ALPHABET.length];
  }
  return result;
}

export async function POST(req: NextRequest) {
  let body: { url?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Cerere invalidă." }, { status: 400 });
  }

  const raw = typeof body.url === "string" ? body.url.trim() : "";
  if (!raw) {
    return NextResponse.json({ error: "Introdu un URL." }, { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    return NextResponse.json({ error: "URL invalid." }, { status: 400 });
  }

  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
    return NextResponse.json({ error: "URL invalid." }, { status: 400 });
  }

  if (!ALLOWED_HOSTS.has(parsed.hostname.toLowerCase())) {
    return NextResponse.json(
      { error: "Poți scurta doar linkuri de pe dottotv.ro" },
      { status: 400 }
    );
  }

  // Forțăm https și normalizăm la host-ul canonic (fără www)
  parsed.protocol = "https:";
  if (parsed.hostname.toLowerCase() === "www.dottotv.ro") {
    parsed.hostname = "dottotv.ro";
  }
  const longUrl = parsed.toString();

  let code = "";
  for (let attempt = 0; attempt < 6; attempt++) {
    const candidate = generateCode(6);
    try {
      if (!(await shortLinkExists(candidate))) {
        code = candidate;
        break;
      }
    } catch (err) {
      console.error("[api/shorten] Redis EXISTS error:", err);
      return NextResponse.json(
        { error: "Eroare la accesarea bazei de date." },
        { status: 500 }
      );
    }
  }

  if (!code) {
    return NextResponse.json(
      { error: "Nu am putut genera un cod unic. Încearcă din nou." },
      { status: 500 }
    );
  }

  // Fetch OG metadata în paralel cu logica de mai jos. Dacă pică, salvăm
  // doar URL-ul — bot-urile vor primi titlu/imagine fallback DOTTO TV.
  const og = await fetchOgData(longUrl).catch((err) => {
    console.error("[api/shorten] OG fetch error:", err);
    return {} as Awaited<ReturnType<typeof fetchOgData>>;
  });

  const record = {
    url: longUrl,
    title: og.title,
    description: og.description,
    image: og.image,
  };

  try {
    await setShortLinkRecord(code, record);
  } catch (err) {
    console.error("[api/shorten] Redis SET error:", err);
    return NextResponse.json(
      { error: "Eroare la salvarea link-ului." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    shortUrl: `${SHORT_DOMAIN}/${code}`,
    code,
    longUrl,
    preview: {
      title: record.title ?? null,
      description: record.description ?? null,
      image: record.image ?? null,
    },
  });
}
