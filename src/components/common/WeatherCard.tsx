'use client';

import { useEffect, useState } from 'react';
import { Thermometer, Droplets, Wind, CloudSun } from 'lucide-react';
import { StatCard, Skeleton } from '@OmarZambranoDev/portfolio-ui';
import { type WeatherData } from '@/types/weather';
import { mockWeatherData } from '@/data/mockWeather';

interface WeatherCardProps {
  city: string;
  useMock?: boolean;
}

export function WeatherCard({ city, useMock = false }: WeatherCardProps) {
  const [weather, setWeather] = useState<WeatherData | null>(
    useMock ? mockWeatherData : null
  );
  const [loading, setLoading] = useState(!useMock);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (useMock) return;

    async function fetchWeather() {
      try {
        const res = await fetch(`/api/weather/${encodeURIComponent(city)}`);
        if (!res.ok) throw new Error('Failed to fetch weather');
        const data: WeatherData = await res.json();
        setWeather(data);
      } catch {
        setError('Unable to load weather data');
      } finally {
        setLoading(false);
      }
    }

    void fetchWeather();
  }, [city, useMock]);

  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        <Skeleton variant="text" className="h-5 w-32" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} variant="rounded" className="h-24" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="p-4 rounded-xl border border-earth-stone/30 bg-white text-secondary text-sm">
        {error ?? 'Weather unavailable'}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <CloudSun className="w-5 h-5 text-accent" />
        <h3 className="text-lg font-semibold text-earth-forest">
          Current Weather
        </h3>
        <span className="text-sm text-secondary capitalize">
          — {weather.current.description}
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={Thermometer}
          value={`${weather.current.temp}°F`}
          label="Temperature"
        />
        <StatCard
          icon={Thermometer}
          value={`${weather.current.feelsLike}°F`}
          label="Feels Like"
        />
        <StatCard
          icon={Droplets}
          value={`${weather.current.humidity}%`}
          label="Humidity"
        />
        <StatCard
          icon={Wind}
          value={`${weather.current.windSpeed} mph`}
          label="Wind Speed"
        />
      </div>
    </div>
  );
}