'use client';

import { useState } from 'react';
import {
  Label,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Button,
} from '@OmarZambranoDev/portfolio-ui';
import { Bot } from 'lucide-react';
import destinations from '@/data/destinations';
import { type PlannerFormData, type TravelStyle, type BudgetTier } from '@/types/planner';

const TRAVEL_STYLES: TravelStyle[] = [
  'Adventure',
  'Cultural',
  'Relaxation',
  'Foodie',
  'Budget',
  'Luxury',
  'Sports & Events',
];

const BUDGET_TIERS: { label: string; value: BudgetTier }[] = [
  { label: 'Budget (under $100/day)', value: 'Budget' },
  { label: 'Mid-range ($100–$250/day)', value: 'Mid-range' },
  { label: 'Luxury ($250+/day)', value: 'Luxury' },
];

const DURATIONS = Array.from({ length: 7 }, (_, i) => i + 1);

interface PlannerFormProps {
  onSubmit: (data: PlannerFormData) => void;
  loading: boolean;
}

export function PlannerForm({ onSubmit, loading }: PlannerFormProps) {
  const [destinationSlug, setDestinationSlug] = useState('');
  const [duration, setDuration] = useState(3);
  const [travelStyle, setTravelStyle] = useState<TravelStyle>('Cultural');
  const [budget, setBudget] = useState<BudgetTier>('Mid-range');

  const selectedDestination = destinations.find((d) => d.slug === destinationSlug);

  const handleSubmit = () => {
    if (!selectedDestination) return;
    onSubmit({
      destination: selectedDestination.name,
      destinationSlug,
      duration,
      travelStyle,
      budget,
    });
  };

  return (
    <div className="flex flex-col gap-6 bg-white rounded-2xl border border-earth-stone/30 p-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold text-earth-forest">Plan Your Trip</h2>
        <p className="text-sm text-secondary">
          Fill in your preferences and let AI craft your perfect itinerary.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {/* Destination */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="destination">Destination</Label>
          <Select value={destinationSlug} onValueChange={setDestinationSlug}>
            <SelectTrigger id="destination">
              <SelectValue placeholder="Select a destination" />
            </SelectTrigger>
            <SelectContent>
              {destinations.map((d) => (
                <SelectItem key={d.slug} value={d.slug}>
                  {d.name}, {d.country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Duration */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="duration">Duration</Label>
          <Select value={String(duration)} onValueChange={(val) => setDuration(Number(val))}>
            <SelectTrigger id="duration">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              {DURATIONS.map((d) => (
                <SelectItem key={d} value={String(d)}>
                  {d} {d === 1 ? 'day' : 'days'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Travel Style */}
        <div className="flex flex-col gap-1.5">
          <Label>Travel Style</Label>
          <div className="flex flex-wrap gap-2">
            {TRAVEL_STYLES.map((style) => (
              <Button
                key={style}
                variant={travelStyle === style ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setTravelStyle(style)}
              >
                {style}
              </Button>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="budget">Budget</Label>
          <Select value={budget} onValueChange={(val) => setBudget(val as BudgetTier)}>
            <SelectTrigger id="budget">
              <SelectValue placeholder="Select budget" />
            </SelectTrigger>
            <SelectContent>
              {BUDGET_TIERS.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        variant="primary"
        size="lg"
        onClick={handleSubmit}
        disabled={!destinationSlug || loading}
        loading={loading}
        className="w-full"
      >
        <Bot className="w-4 h-4" />
        {loading ? 'Generating itinerary...' : 'Generate Itinerary'}
      </Button>
    </div>
  );
}
