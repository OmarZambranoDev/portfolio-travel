import { describe, it, expect, beforeEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useTripsStore } from '@/store/tripsStore';
import { type ItineraryResponse } from '@/types/planner';

const mockItinerary: ItineraryResponse = {
  destination: 'Tokyo',
  duration: 5,
  travelStyle: 'Cultural',
  budget: 'Mid-range',
  content: 'Day 1: Explore Shibuya...',
};

describe('tripsStore', () => {
  beforeEach(() => {
    act(() => {
      useTripsStore.setState({ trips: [] });
    });
  });

  it('should start with empty trips', () => {
    const { result } = renderHook(() => useTripsStore());
    expect(result.current.trips).toHaveLength(0);
  });

  it('should save a trip', () => {
    const { result } = renderHook(() => useTripsStore());
    act(() => {
      result.current.saveTrip(mockItinerary);
    });
    expect(result.current.trips).toHaveLength(1);
    expect(result.current.trips[0].destination).toBe('Tokyo');
  });

  it('should assign a unique id and savedAt when saving', () => {
    const { result } = renderHook(() => useTripsStore());
    act(() => {
      result.current.saveTrip(mockItinerary);
    });
    expect(result.current.trips[0].id).toBeDefined();
    expect(result.current.trips[0].savedAt).toBeGreaterThan(0);
  });

  it('should save multiple trips', () => {
    const { result } = renderHook(() => useTripsStore());
    act(() => {
      result.current.saveTrip(mockItinerary);
      result.current.saveTrip({ ...mockItinerary, destination: 'Paris' });
    });
    expect(result.current.trips).toHaveLength(2);
  });

  it('should prepend new trips to the list', () => {
    const { result } = renderHook(() => useTripsStore());
    act(() => {
      result.current.saveTrip(mockItinerary);
      result.current.saveTrip({ ...mockItinerary, destination: 'Paris' });
    });
    expect(result.current.trips[0].destination).toBe('Paris');
  });

  it('should delete a trip by id', () => {
    const { result } = renderHook(() => useTripsStore());
    act(() => {
      result.current.saveTrip(mockItinerary);
    });
    const id = result.current.trips[0].id;
    act(() => {
      result.current.deleteTrip(id);
    });
    expect(result.current.trips).toHaveLength(0);
  });

  it('should only delete the matching trip', () => {
    const { result } = renderHook(() => useTripsStore());
    act(() => {
      result.current.saveTrip(mockItinerary);
      result.current.saveTrip({ ...mockItinerary, destination: 'Paris' });
    });
    const id = result.current.trips[1].id;
    act(() => {
      result.current.deleteTrip(id);
    });
    expect(result.current.trips).toHaveLength(1);
    expect(result.current.trips[0].destination).toBe('Paris');
  });
});
