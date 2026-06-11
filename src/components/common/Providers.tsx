'use client';

import { ToastProvider, TooltipProvider } from '@OmarZambranoDev/portfolio-ui';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <TooltipProvider>
        {children}
      </TooltipProvider>
    </ToastProvider>
  );
}
