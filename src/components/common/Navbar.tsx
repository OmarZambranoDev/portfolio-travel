'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MapPin, Bot, Heart, Plane, Code, Home } from 'lucide-react';

const HOST_URL = process.env.NEXT_PUBLIC_HOST_URL || 'http://localhost:3000';
const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL || '';

const NAV_LINKS = [
  { label: 'Destinations', href: '/destinations', icon: MapPin },
  { label: 'Plan', href: '/plan', icon: Bot },
  { label: 'Trips', href: '/trips', icon: Heart },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-earth-stone/30 bg-white">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary font-bold text-xl">
          <Plane className="w-5 h-5" />
          Travel
        </Link>
        <nav className="flex items-center gap-1">
          {NAV_LINKS.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href || pathname.startsWith(href + '/');
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-earth-moss hover:bg-muted/10 hover:text-primary'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            );
          })}
          <div className="border-l border-earth-stone/30 flex items-center gap-1">
            <a
              href={HOST_URL}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-earth-moss hover:bg-muted/10 hover:text-primary transition-colors"
            >
              <Home className="w-4 h-4" />
              Portfolio
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-earth-moss hover:bg-muted/10 hover:text-primary transition-colors"
            >
              <Code className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
