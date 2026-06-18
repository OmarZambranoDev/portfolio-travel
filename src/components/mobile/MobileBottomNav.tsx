'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MapPin, Bot, Heart } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Destinations', href: '/destinations', icon: MapPin },
  { label: 'Plan', href: '/plan', icon: Bot },
  { label: 'Trips', href: '/trips', icon: Heart },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-muted/30">
      <div className="flex items-center justify-around h-16 px-2">
        {NAV_LINKS.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                isActive ? 'text-primary' : 'text-secondary'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
