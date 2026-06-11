import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Chip } from '@OmarZambranoDev/portfolio-ui';
import { MapPin, Calendar, DollarSign, Globe, Clock } from 'lucide-react';
import { getDestinationBySlug } from '@/data/destinations';
import destinations from '@/data/destinations';
import { WeatherCard } from '@/components/common/WeatherCard';
import { MapViewDynamic } from '@/components/common/MapViewDynamic';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);
  if (!destination) return {};
  return {
    title: destination.name,
    description: destination.description,
  };
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);

  if (!destination) notFound();

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {destination.categories.map((cat) => (
            <Chip key={cat} variant="default" size="sm">
              {cat}
            </Chip>
          ))}
          <Chip variant="outline" size="sm">
            {destination.region}
          </Chip>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-earth-forest">
          {destination.name}
        </h1>
        <p className="text-secondary text-lg">{destination.country}</p>
        <p className="text-earth-forest/80 max-w-2xl leading-relaxed">
          {destination.description}
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex flex-col gap-1 p-4 bg-white rounded-xl border border-earth-stone/30">
          <div className="flex items-center gap-2 text-secondary">
            <Calendar className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-wide">
              Best Time
            </span>
          </div>
          <p className="text-sm font-semibold text-earth-forest">
            {destination.bestMonths}
          </p>
        </div>
        <div className="flex flex-col gap-1 p-4 bg-white rounded-xl border border-earth-stone/30">
          <div className="flex items-center gap-2 text-secondary">
            <DollarSign className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-wide">
              Daily Cost
            </span>
          </div>
          <p className="text-sm font-semibold text-earth-forest">
            ~${destination.avgDailyCostUSD}/day
          </p>
        </div>
        <div className="flex flex-col gap-1 p-4 bg-white rounded-xl border border-earth-stone/30">
          <div className="flex items-center gap-2 text-secondary">
            <Globe className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-wide">
              Language
            </span>
          </div>
          <p className="text-sm font-semibold text-earth-forest">
            {destination.language}
          </p>
        </div>
        <div className="flex flex-col gap-1 p-4 bg-white rounded-xl border border-earth-stone/30">
          <div className="flex items-center gap-2 text-secondary">
            <Clock className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-wide">
              Timezone
            </span>
          </div>
          <p className="text-sm font-semibold text-earth-forest">
            {destination.timezone}
          </p>
        </div>
      </div>

      {/* Highlights */}
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-bold text-earth-forest flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Highlights
        </h2>
        <div className="flex flex-wrap gap-2">
          {destination.highlights.map((highlight) => (
            <Chip key={highlight} variant="accent" size="md">
              {highlight}
            </Chip>
          ))}
        </div>
      </div>

      {/* Weather */}
      <WeatherCard city={destination.weatherCity} />

      {/* Map */}
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-bold text-earth-forest">Location</h2>
        <MapViewDynamic destination={destination} />
      </div>
    </div>
  );
}
