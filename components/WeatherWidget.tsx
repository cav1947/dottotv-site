import type { WeatherData } from "@/lib/weather";

interface Props {
  weather: WeatherData;
}

export default function WeatherWidget({ weather }: Props) {
  return (
    <div className="bg-gradient-to-br from-brand-blue to-brand-blue-dark rounded-xl p-4 text-white shadow-md">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4 opacity-80" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-xs font-medium opacity-80">Constanța</span>
        </div>
        <span className="text-2xl">{weather.icon}</span>
      </div>

      <div className="flex items-end gap-2">
        <span className="text-4xl font-bold">{weather.temperature}°</span>
        <span className="text-sm opacity-80 mb-1">C</span>
      </div>

      <p className="text-sm opacity-90 mt-1">{weather.description}</p>

      <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/20">
        <div className="text-center">
          <p className="text-xs opacity-70">Simțită</p>
          <p className="text-sm font-semibold">{weather.feelsLike}°C</p>
        </div>
        <div className="text-center border-x border-white/20">
          <p className="text-xs opacity-70">Umiditate</p>
          <p className="text-sm font-semibold">{weather.humidity}%</p>
        </div>
        <div className="text-center">
          <p className="text-xs opacity-70">Vânt</p>
          <p className="text-sm font-semibold">{weather.windSpeed} km/h</p>
        </div>
      </div>
    </div>
  );
}
