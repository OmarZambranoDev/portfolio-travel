import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'Weather API key not configured' }, { status: 500 });
  }

  try {
    const [currentRes, forecastRes] = await Promise.all([
      fetch(`${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=imperial&appid=${apiKey}`, {
        next: { revalidate: 1800 },
      }),
      fetch(
        `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=imperial&cnt=5&appid=${apiKey}`,
        { next: { revalidate: 1800 } }
      ),
    ]);

    if (!currentRes.ok || !forecastRes.ok) {
      return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 502 });
    }

    const [current, forecast] = await Promise.all([currentRes.json(), forecastRes.json()]);

    return NextResponse.json({
      current: {
        temp: Math.round(current.main.temp),
        feelsLike: Math.round(current.main.feels_like),
        humidity: current.main.humidity,
        windSpeed: Math.round(current.wind.speed),
        description: current.weather[0].description,
        icon: current.weather[0].icon,
      },
      forecast: forecast.list.map(
        (item: {
          dt: number;
          main: { temp: number };
          weather: { description: string; icon: string }[];
        }) => ({
          time: item.dt,
          temp: Math.round(item.main.temp),
          description: item.weather[0].description,
          icon: item.weather[0].icon,
        })
      ),
    });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
