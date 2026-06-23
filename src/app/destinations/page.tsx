import type { Metadata } from 'next';
import { DestinationGrid } from '@/components/destinations/DestinationGrid';
import destinations from '@/data/destinations';

export const metadata: Metadata = {
  title: 'Destinations',
  description: 'Browse curated travel destinations across every continent.',
};

export default function DestinationsPage() {
  return (
    <div className="flex flex-col gap-8" data-testid="destinations-page">
      <div>
        <h1 className="text-3xl font-bold text-earth-forest">Destinations</h1>
        <p className="text-secondary mt-1">{destinations.length} destinations across 5 regions</p>
      </div>
      <DestinationGrid destinations={destinations} />
    </div>
  );
}
