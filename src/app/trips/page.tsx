'use client';

import { useTripsStore } from '@/store/tripsStore';
import { TripCard } from '@/components/trips/TripCard';
import { EmptyState, Button } from '@OmarZambranoDev/portfolio-ui';
import { Heart } from 'lucide-react';
import Link from 'next/link';

export default function TripsPage() {
  const trips = useTripsStore((s) => s.trips);
  const deleteTrip = useTripsStore((s) => s.deleteTrip);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-earth-forest">Saved Trips</h1>
          <p className="text-secondary mt-1">
            {trips.length} {trips.length === 1 ? 'trip' : 'trips'} saved
          </p>
        </div>
        <Link href="/plan">
          <Button variant="primary" size="sm">
            Plan a new trip
          </Button>
        </Link>
      </div>

      {trips.length === 0 ? (
        <div className="flex items-center justify-center py-16">
          <EmptyState
            title="No saved trips yet"
            description="Generate an itinerary and save it to see it here."
            icon={Heart}
            action={{
              label: 'Plan a trip',
              onClick: () => (window.location.href = '/plan'),
            }}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} onDelete={deleteTrip} />
          ))}
        </div>
      )}
    </div>
  );
}
