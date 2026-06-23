import { useSyncExternalStore } from 'react';

export function useIsMobile(breakpoint: number = 768): boolean {
  const query = `(max-width: ${breakpoint - 1}px)`;

  return useSyncExternalStore(
    (callback) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', callback);
      return () => mql.removeEventListener('change', callback);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}
