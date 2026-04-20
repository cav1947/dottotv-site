import https from "https";
import { unstable_cache } from "next/cache";

export interface ExchangeRates {
  EUR: number | null;
  USD: number | null;
}

function fetchBNRXml(): Promise<string> {
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: "www.bnr.ro",
        path: "/nbrfxrates.xml",
        method: "GET",
        // BNR's certificate occasionally expires; allow fetching public rate data regardless.
        rejectUnauthorized: false,
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve(data));
      }
    );
    req.on("error", reject);
    req.end();
  });
}

async function fetchRates(): Promise<ExchangeRates> {
  try {
    const xml = await fetchBNRXml();
    const eurMatch = xml.match(/<Rate currency="EUR">([\d.]+)<\/Rate>/);
    const usdMatch = xml.match(/<Rate currency="USD">([\d.]+)<\/Rate>/);
    return {
      EUR: eurMatch ? parseFloat(eurMatch[1]) : null,
      USD: usdMatch ? parseFloat(usdMatch[1]) : null,
    };
  } catch {
    return { EUR: null, USD: null };
  }
}

export const getExchangeRates = unstable_cache(fetchRates, ["bnr-rates"], {
  revalidate: 86400,
});
