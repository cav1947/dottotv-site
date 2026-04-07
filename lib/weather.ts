// Coordonate Constanța, România
const CONSTANTA_LAT = 44.1733;
const CONSTANTA_LON = 28.6383;

export interface WeatherData {
  temperature: number;
  weatherCode: number;
  windSpeed: number;
  humidity: number;
  description: string;
  icon: string;
  feelsLike: number;
}

const WMO_CODES: Record<number, { description: string; icon: string }> = {
  0: { description: "Cer senin", icon: "☀️" },
  1: { description: "Cer predominant senin", icon: "🌤️" },
  2: { description: "Parțial noros", icon: "⛅" },
  3: { description: "Noros", icon: "☁️" },
  45: { description: "Ceață", icon: "🌫️" },
  48: { description: "Ceață cu chiciură", icon: "🌫️" },
  51: { description: "Burniță ușoară", icon: "🌦️" },
  53: { description: "Burniță moderată", icon: "🌦️" },
  55: { description: "Burniță densă", icon: "🌧️" },
  61: { description: "Ploaie ușoară", icon: "🌧️" },
  63: { description: "Ploaie moderată", icon: "🌧️" },
  65: { description: "Ploaie abundentă", icon: "🌧️" },
  71: { description: "Ninsoare ușoară", icon: "🌨️" },
  73: { description: "Ninsoare moderată", icon: "❄️" },
  75: { description: "Ninsoare abundentă", icon: "❄️" },
  80: { description: "Averse ușoare", icon: "🌦️" },
  81: { description: "Averse moderate", icon: "🌧️" },
  82: { description: "Averse puternice", icon: "⛈️" },
  95: { description: "Furtună", icon: "⛈️" },
  96: { description: "Furtună cu grindină", icon: "⛈️" },
  99: { description: "Furtună cu grindină mare", icon: "⛈️" },
};

export async function getWeatherConstanta(): Promise<WeatherData> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${CONSTANTA_LAT}&longitude=${CONSTANTA_LON}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=Europe%2FBucharest`;

  const res = await fetch(url, {
    next: { revalidate: 1800 }, // revalidate la 30 minute
  });

  if (!res.ok) {
    throw new Error("Weather API error");
  }

  const data = await res.json();
  const current = data.current;
  const code = current.weather_code as number;
  const weatherInfo = WMO_CODES[code] || { description: "Necunoscut", icon: "🌡️" };

  return {
    temperature: Math.round(current.temperature_2m),
    weatherCode: code,
    windSpeed: Math.round(current.wind_speed_10m),
    humidity: current.relative_humidity_2m,
    feelsLike: Math.round(current.apparent_temperature),
    description: weatherInfo.description,
    icon: weatherInfo.icon,
  };
}
