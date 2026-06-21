'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@OmarZambranoDev/portfolio-ui';
import { type Destination } from '@/data/destinations';

const MapView = dynamic(() => import('./MapView').then((mod) => mod.MapView), {
  ssr: false,
  loading: () => <Skeleton variant="rounded" className="w-full h-64 md:h-96" />,
});

interface MapViewDynamicProps {
  destination: Pick<Destination, 'name' | 'country' | 'coordinates'>;
}

export function MapViewDynamic({ destination }: MapViewDynamicProps) {
  return <MapView destination={destination} />;
}
