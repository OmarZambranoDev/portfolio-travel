'use client';

import { Chip } from '@OmarZambranoDev/portfolio-ui';
import { type Category, type Region } from '@/data/destinations';

const CATEGORIES: { label: string; value: Category }[] = [
  { label: 'Beach', value: 'beach' },
  { label: 'City', value: 'city' },
  { label: 'Nature', value: 'nature' },
  { label: 'Culture', value: 'culture' },
  { label: 'Adventure', value: 'adventure' },
];

const REGIONS: { label: string; value: Region }[] = [
  { label: 'Europe', value: 'europe' },
  { label: 'Asia', value: 'asia' },
  { label: 'Americas', value: 'americas' },
  { label: 'Africa', value: 'africa' },
  { label: 'Oceania', value: 'oceania' },
];

interface DestinationFiltersProps {
  selectedCategory: Category | null;
  selectedRegion: Region | null;
  onCategoryChange: (category: Category | null) => void;
  onRegionChange: (region: Region | null) => void;
}

export function DestinationFilters({
  selectedCategory,
  selectedRegion,
  onCategoryChange,
  onRegionChange,
}: DestinationFiltersProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-secondary uppercase tracking-wide">Category</p>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(({ label, value }) => (
            <Chip
              key={value}
              variant={selectedCategory === value ? 'selected' : 'default'}
              clickable
              onClick={() =>
                onCategoryChange(selectedCategory === value ? null : value)
              }
            >
              {label}
            </Chip>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-secondary uppercase tracking-wide">Region</p>
        <div className="flex flex-wrap gap-2">
          {REGIONS.map(({ label, value }) => (
            <Chip
              key={value}
              variant={selectedRegion === value ? 'selected' : 'default'}
              clickable
              onClick={() =>
                onRegionChange(selectedRegion === value ? null : value)
              }
            >
              {label}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  );
}
