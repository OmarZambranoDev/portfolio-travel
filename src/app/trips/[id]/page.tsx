'use client';

import React from 'react';
import { useTripsStore } from '@/store/tripsStore';
import { Chip, Button, EmptyState } from '@OmarZambranoDev/portfolio-ui';
import { MapPin, Clock, Wallet, Calendar, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Props {
  params: Promise<{ id: string }>;
}

export default function TripDetailPage({ params }: Props) {
  const router = useRouter();
  const trips = useTripsStore((s) => s.trips);
  const deleteTrip = useTripsStore((s) => s.deleteTrip);

  const [resolvedParams, setResolvedParams] = React.useState<{ id: string } | null>(null);

  React.useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  if (!resolvedParams) return null;

  const trip = trips.find((t) => t.id === resolvedParams.id);

  if (!trip) {
    return (
      <div className="flex flex-col gap-6">
        <Link href="/trips">
          <Button variant="outline" size="sm">
            ← Back
          </Button>
        </Link>
        <div className="flex items-center justify-center py-16">
          <EmptyState
            title="Trip not found"
            description="This trip may have been deleted."
            icon={MapPin}
            action={{
              label: 'View saved trips',
              onClick: () => router.push('/trips'),
            }}
          />
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    router.push('/trips');
    deleteTrip(trip.id);
  };

  const renderInline = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-semibold text-earth-forest">
            {part.replaceAll('**', '')}
          </strong>
        );
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return (
          <em key={i} className="italic text-secondary">
            {part.replaceAll('*', '')}
          </em>
        );
      }
      return part;
    });
  };

  const renderLine = (line: string, index: number) => {
    if (line.startsWith('### ')) {
      return (
        <h3 key={index} className="text-lg font-bold text-earth-forest mt-6 mb-2">
          {line.replace('### ', '')}
        </h3>
      );
    }
    if (line.startsWith('## ')) {
      return (
        <h2 key={index} className="text-xl font-bold text-earth-forest mt-4 mb-3">
          {line.replace('## ', '')}
        </h2>
      );
    }
    if (line.startsWith('# ')) {
      return (
        <h1 key={index} className="text-2xl font-bold text-earth-forest mt-4 mb-3">
          {line.replace('# ', '')}
        </h1>
      );
    }
    if (line.match(/^-{3,}$/)) return <div key={index} />;
    if (line.startsWith('- ')) {
      return (
        <li key={index} className="text-sm text-earth-forest/90 leading-relaxed ml-4 list-disc">
          {renderInline(line.replace('- ', ''))}
        </li>
      );
    }
    if (line.trim() === '') return <div key={index} className="h-2" />;
    return (
      <p key={index} className="text-sm text-earth-forest/80 leading-relaxed">
        {renderInline(line)}
      </p>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Link href="/trips">
          <Button variant="outline" size="sm">
            ← Back
          </Button>
        </Link>
        <Button variant="outline" size="sm" onClick={handleDelete}>
          <Trash2 className="w-3.5 h-3.5" />
          Delete
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-bold text-earth-forest flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          {trip.destination}
        </h1>
        <div className="flex flex-wrap gap-2">
          <Chip variant="accent" size="sm">
            {trip.travelStyle}
          </Chip>
          <Chip variant="default" size="sm">
            <Clock className="w-3 h-3" />
            {trip.duration} {trip.duration === 1 ? 'day' : 'days'}
          </Chip>
          <Chip variant="default" size="sm">
            <Wallet className="w-3 h-3" />
            {trip.budget}
          </Chip>
          <Chip variant="default" size="sm">
            <Calendar className="w-3 h-3" />
            {new Date(trip.savedAt).toLocaleDateString()}
          </Chip>
        </div>
      </div>

      <div className="flex flex-col bg-white rounded-2xl border border-earth-stone/30 p-5">
        {trip.content.split('\n').map((line, index) => renderLine(line, index))}
      </div>
    </div>
  );
}
