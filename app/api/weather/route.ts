import { NextResponse } from "next/server";
import { getWeatherConstanta } from "@/lib/weather";

export async function GET() {
  try {
    const weather = await getWeatherConstanta();
    return NextResponse.json(weather, {
      headers: {
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Nu s-au putut obține datele meteo" },
      { status: 500 }
    );
  }
}
