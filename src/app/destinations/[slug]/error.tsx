'use client';

import { ErrorState } from '@OmarZambranoDev/portfolio-ui';

export default function DestinationError({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <div className="flex items-center justify-center py-16">
      <ErrorState
        error="Failed to load destination. Please try again."
        onRetry={reset}
      />
    </div>
  );
}
