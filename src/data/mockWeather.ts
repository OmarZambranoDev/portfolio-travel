import { type WeatherData } from '@/types/weather';

export const mockWeatherData: WeatherData = {
  current: {
    temp: 72,
    feelsLike: 70,
    humidity: 65,
    windSpeed: 8,
    description: 'partly cloudy',
    icon: '02d',
  },
  forecast: [
    { time: Date.now() / 1000 + 10800, temp: 74, description: 'sunny', icon: '01d' },
    { time: Date.now() / 1000 + 21600, temp: 71, description: 'cloudy', icon: '03d' },
    { time: Date.now() / 1000 + 32400, temp: 68, description: 'light rain', icon: '10d' },
    { time: Date.now() / 1000 + 43200, temp: 65, description: 'rain', icon: '10n' },
    { time: Date.now() / 1000 + 54000, temp: 67, description: 'partly cloudy', icon: '02n' },
  ],
};
