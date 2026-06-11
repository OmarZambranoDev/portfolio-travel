export interface WeatherCurrent {
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
}

export interface WeatherForecastItem {
  time: number;
  temp: number;
  description: string;
  icon: string;
}

export interface WeatherData {
  current: WeatherCurrent;
  forecast: WeatherForecastItem[];
}
