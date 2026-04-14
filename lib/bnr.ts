export interface ExchangeRates {
  EUR: number | null;
  USD: number | null;
}

export async function getExchangeRates(): Promise<ExchangeRates> {
  try {
    const res = await fetch("https://www.bnr.ro/nbrfxrates.xml", {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return { EUR: null, USD: null };

    const xml = await res.text();

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
