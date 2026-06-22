'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  Chip,
  EmptyState,
} from '@OmarZambranoDev/portfolio-ui';
import { MapPin } from 'lucide-react';
import { DestinationFilters } from './DestinationFilters';
import { type Destination, type Category, type Region } from '@/data/destinations';
import Image from 'next/image';
import { getDestinationImage } from '@/data/destinations';

interface DestinationGridProps {
  destinations: Destination[];
}

export function DestinationGrid({ destinations }: DestinationGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);

  const filtered = destinations.filter((d) => {
    if (selectedCategory && !d.categories.includes(selectedCategory)) return false;
    if (selectedRegion && d.region !== selectedRegion) return false;
    return true;
  });

  return (
    <div className="flex flex-col gap-6">
      <DestinationFilters
        selectedCategory={selectedCategory}
        selectedRegion={selectedRegion}
        onCategoryChange={setSelectedCategory}
        onRegionChange={setSelectedRegion}
      />
      {filtered.length === 0 ? (
        <EmptyState
          title="No destinations found"
          description="Try adjusting your filters to find more destinations."
          icon={MapPin}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((destination, index) => (
            <Link key={destination.slug} href={`/destinations/${destination.slug}`}>
              <Card variant="elevated" clickable>
                <div className="relative w-full aspect-4/3 overflow-hidden bg-earth-stone/20">
                  {getDestinationImage(destination.slug) && (
                    <Image
                      src={getDestinationImage(destination.slug)!}
                      alt={destination.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      priority={index === 0}
                    />
                  )}
                </div>
                <CardContent className="flex flex-col gap-3 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {destination.categories.map((cat) => (
                        <Chip key={cat} variant="default" size="sm">
                          {cat}
                        </Chip>
                      ))}
                    </div>
                    <Chip variant="outline" size="sm">
                      {destination.region}
                    </Chip>
                  </div>
                  <div>
                    <CardTitle>{destination.name}</CardTitle>
                    <CardDescription className="text-primary">
                      {destination.country}
                    </CardDescription>
                  </div>
                  <p className="text-sm text-earth-moss line-clamp-2">{destination.tagline}</p>
                  <div className="flex items-center justify-between text-xs text-secondary pt-1 border-t border-earth-stone/30">
                    <span className="text-earth-moss">Best: {destination.bestMonths}</span>
                    <span className="text-earth-moss">~${destination.avgDailyCostUSD}/day</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
