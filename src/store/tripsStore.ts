import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type ItineraryResponse } from '@/types/planner';

export interface SavedTrip extends ItineraryResponse {
  id: string;
  savedAt: number;
}

interface TripsStore {
  trips: SavedTrip[];
  saveTrip: (itinerary: ItineraryResponse) => void;
  deleteTrip: (id: string) => void;
}

export const useTripsStore = create<TripsStore>()(
  persist(
    (set) => ({
      trips: [],
      saveTrip: (itinerary) =>
        set((state) => ({
          trips: [
            {
              ...itinerary,
              id: crypto.randomUUID(),
              savedAt: Date.now(),
            },
            ...state.trips,
          ],
        })),
      deleteTrip: (id) =>
        set((state) => ({
          trips: state.trips.filter((t) => t.id !== id),
        })),
    }),
    { name: 'travel-trips' }
  )
);
