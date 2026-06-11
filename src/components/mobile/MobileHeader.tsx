import Link from 'next/link';
import { Plane } from 'lucide-react';

export function MobileHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-earth-stone/30 bg-white">
      <div className="h-14 flex items-center px-4">
        <Link href="/" className="flex items-center gap-2 text-primary font-bold text-lg">
          <Plane className="w-4 h-4" />
          Travel
        </Link>
      </div>
    </header>
  );
}
