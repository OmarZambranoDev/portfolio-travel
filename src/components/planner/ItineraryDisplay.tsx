'use client';

import { useEffect, useRef } from 'react';
import { Button } from '@OmarZambranoDev/portfolio-ui';
import { Heart } from 'lucide-react';
import { type ItineraryResponse } from '@/types/planner';

interface ItineraryDisplayProps {
  itinerary: ItineraryResponse;
  streaming: boolean;
  onSave: (itinerary: ItineraryResponse) => void;
}

export function ItineraryDisplay({
  itinerary,
  streaming,
  onSave,
}: ItineraryDisplayProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (streaming) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [itinerary.content, streaming]);

  const lines = itinerary.content.split('\n');

  const renderInline = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) =>
      part.startsWith('**') && part.endsWith('**') ? (
        <strong key={i} className="font-semibold text-earth-forest">
          {part.replaceAll('**', '')}
        </strong>
      ) : (
        part
      )
    );
  };

  const renderLine = (line: string, index: number) => {
    if (line.startsWith('# ')) {
      return (
        <h1 key={index} className="text-2xl font-bold text-earth-forest mt-4 mb-3">
          {line.replace('# ', '')}
        </h1>
      );
    }
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
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-earth-forest">
            Your Itinerary
          </h2>
          <p className="text-sm text-secondary">
            {itinerary.duration} days · {itinerary.travelStyle} · {itinerary.budget}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {!streaming && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onSave(itinerary)}
            >
              <Heart className="w-4 h-4" />
              Save Trip
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl border border-earth-stone/30 p-6">
        <div className="flex flex-col">
          {lines.map((line, index) => renderLine(line, index))}
          {streaming && (
            <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1 mt-1" />
          )}
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
