'use client';

import { useState } from 'react';
import { PlannerForm } from '@/components/planner/PlannerForm';
import { ItineraryDisplay } from '@/components/planner/ItineraryDisplay';
import { type PlannerFormData, type ItineraryResponse } from '@/types/planner';
import { useTripsStore } from '@/store/tripsStore';
import { useToast } from '@OmarZambranoDev/portfolio-ui';

export default function PlanPage() {
  const [itinerary, setItinerary] = useState<ItineraryResponse | null>(null);
  const [streaming, setStreaming] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveTrip = useTripsStore((s) => s.saveTrip);
  const deleteTrip = useTripsStore((s) => s.deleteTrip);
  const trips = useTripsStore((s) => s.trips);
  const { toast } = useToast();

  const handleSubmit = async (data: PlannerFormData) => {
    setLoading(true);
    setError(null);
    setItinerary({
      destination: data.destination,
      duration: data.duration,
      travelStyle: data.travelStyle,
      budget: data.budget,
      content: '',
    });

    try {
      const res = await fetch('/api/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok || !res.body) throw new Error('Failed to generate itinerary');

      setLoading(false);
      setStreaming(true);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setItinerary((prev) => (prev ? { ...prev, content: prev.content + chunk } : null));
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(message);
      setLoading(false);
      setItinerary(null);
    } finally {
      setStreaming(false);
    }
  };

  const handleSave = (itinerary: ItineraryResponse) => {
    const existing = trips.find(
      (t) =>
        t.destination === itinerary.destination &&
        t.duration === itinerary.duration &&
        t.travelStyle === itinerary.travelStyle &&
        t.budget === itinerary.budget
    );

    if (existing) {
      deleteTrip(existing.id);
      toast({
        title: 'Trip removed',
        description: `Your ${itinerary.destination} itinerary has been removed.`,
        variant: 'info',
      });
    } else {
      saveTrip(itinerary);
      toast({
        title: 'Trip saved',
        description: `Your ${itinerary.destination} itinerary has been saved.`,
        variant: 'success',
      });
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-earth-forest">AI Trip Planner</h1>
        <p className="text-secondary mt-1">
          Describe your preferences and get a personalized itinerary in seconds.
        </p>
        {error && (
          <div className="p-4 rounded-xl border border-danger/30 bg-danger/5 text-danger text-sm">
            {error}
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="md:sticky md:top-24" data-testid="planner-form">
          <PlannerForm onSubmit={handleSubmit} loading={loading} />
        </div>
        <div>
          {itinerary && (streaming || itinerary.content) ? (
            <ItineraryDisplay itinerary={itinerary} streaming={streaming} onSave={handleSave} />
          ) : (
            <div
              className="flex flex-col items-center justify-center gap-4 py-16 text-center"
              data-testid="planner-empty"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <span className="text-3xl">✈️</span>
              </div>
              <div>
                <p className="font-semibold text-earth-forest">Your itinerary will appear here</p>
                <p className="text-sm text-secondary mt-1">
                  Fill in the form and click Generate to get started.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
