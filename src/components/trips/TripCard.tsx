'use client';

import { useState } from 'react';
import { Card, CardContent, CardFooter, Button, Chip, Modal, ModalContent, ModalHeader, ModalTitle, ModalBody, ModalDescription } from '@OmarZambranoDev/portfolio-ui';
import { Trash2, MapPin, Clock, Wallet, Sparkles, Calendar } from 'lucide-react';
import { type SavedTrip } from '@/store/tripsStore';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useRouter } from 'next/navigation';

interface TripCardProps {
  trip: SavedTrip;
  onDelete: (id: string) => void;
}

export function TripCard({ trip, onDelete }: TripCardProps) {
  const [open, setOpen] = useState(false);

  const isMobile = useIsMobile();
  const router = useRouter();

  const handleClick = () => {
    if (isMobile) {
      router.push(`/trips/${trip.id}`);
    } else {
      setOpen(true);
    }
  };

  const lines = trip.content.split('\n');

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
    if (line.match(/^-{3,}$/)) {
      return <div key={index} />;
    }
    if (line.startsWith('- ')) {
      return (
        <li key={index} className="text-sm text-earth-forest/90 leading-relaxed ml-4 list-disc">
          {renderInline(line.replace('- ', ''))}
        </li>
      );
    }
    if (line.trim() === '') {
      return <div key={index} className="h-2" />;
    }
    return (
      <p key={index} className="text-sm text-earth-forest/80 leading-relaxed">
        {renderInline(line)}
      </p>
    );
  };

  return (
    <>
      <Card variant="elevated" clickable onClick={handleClick}>
        <CardContent className="flex flex-col gap-3 p-5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-bold text-earth-forest">
              {trip.destination}
            </h3>
            <Chip variant="accent" size="sm">{trip.travelStyle}</Chip>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-secondary">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {trip.duration} {trip.duration === 1 ? 'day' : 'days'}
            </span>
            <span className="flex items-center gap-1">
              <Wallet className="w-3.5 h-3.5" />
              {trip.budget}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(trip.savedAt).toLocaleDateString()}
            </span>
          </div>
          <p className="text-xs text-secondary line-clamp-2">
            {trip.content.split('\n').find((l) => l.trim() && !l.startsWith('#'))}
          </p>
        </CardContent>
        <CardFooter className="flex items-center justify-between px-5 py-3">
          <span className="flex items-center gap-1 text-xs text-primary font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            View itinerary
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(trip.id);
            }}
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete
          </Button>
        </CardFooter>
      </Card>

      <Modal open={open} onOpenChange={setOpen}>
        <ModalContent size="lg">
          <ModalHeader>
            <ModalTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              {trip.destination}
            </ModalTitle>
            <ModalDescription>
              Saved on {new Date(trip.savedAt).toLocaleDateString()}
            </ModalDescription>
            <div className="flex flex-wrap gap-2 mt-2">
              <Chip variant="accent" size="sm">{trip.travelStyle}</Chip>
              <Chip variant="default" size="sm">
                {trip.duration} {trip.duration === 1 ? 'day' : 'days'}
              </Chip>
              <Chip variant="default" size="sm">{trip.budget}</Chip>
            </div>
          </ModalHeader>
          <ModalBody className="overflow-y-auto max-h-[60vh]">
            <div className="flex flex-col">
              {lines.map((line, index) => renderLine(line, index))}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
