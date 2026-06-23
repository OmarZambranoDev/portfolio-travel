import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { WeatherCard } from '@/components/common/WeatherCard';
import { mockWeatherData } from '@/data/mockWeather';

describe('WeatherCard', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should render mock weather data without fetching', async () => {
    render(<WeatherCard city="Tokyo" useMock />);
    await waitFor(() => {
      expect(screen.getByText('Current Weather')).toBeInTheDocument();
    });
    expect(screen.getByText('Temperature')).toBeInTheDocument();
    expect(screen.getByText('Feels Like')).toBeInTheDocument();
    expect(screen.getByText('Humidity')).toBeInTheDocument();
    expect(screen.getByText('Wind Speed')).toBeInTheDocument();
  });

  it('should render correct temperature value', async () => {
    render(<WeatherCard city="Tokyo" useMock />);
    await waitFor(() => {
      expect(screen.getByText(`${mockWeatherData.current.temp}°F`)).toBeInTheDocument();
    });
  });

  it('should render correct humidity value', async () => {
    render(<WeatherCard city="Tokyo" useMock />);
    await waitFor(() => {
      expect(screen.getByText(`${mockWeatherData.current.humidity}%`)).toBeInTheDocument();
    });
  });

  it('should render correct wind speed value', async () => {
    render(<WeatherCard city="Tokyo" useMock />);
    await waitFor(() => {
      expect(screen.getByText(`${mockWeatherData.current.windSpeed} mph`)).toBeInTheDocument();
    });
  });

  it('should show error state when fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false } as Response));
    render(<WeatherCard city="Tokyo" />);
    await waitFor(() => {
      expect(screen.getByText('Unable to load weather data')).toBeInTheDocument();
    });
  });

  it('should show error state when fetch throws', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')));
    render(<WeatherCard city="Tokyo" />);
    await waitFor(() => {
      expect(screen.getByText('Unable to load weather data')).toBeInTheDocument();
    });
  });

  it('should show loading skeleton initially when not using mock', () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation(() => new Promise(() => {}))
    );
    render(<WeatherCard city="Tokyo" />);
    expect(screen.queryByText('Current Weather')).not.toBeInTheDocument();
  });
});
