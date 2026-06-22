import type { Metadata } from 'next';
import { Home, Code, Newspaper, Music, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Profile',
};

const HOST_URL = process.env.NEXT_PUBLIC_HOST_URL || 'http://localhost:3000';
const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL || '';

interface Project {
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

const PROJECTS: Project[] = [
  {
    name: 'Social',
    description: 'Twitter-inspired social feed micro-frontend',
    href: `${HOST_URL}/social`,
    icon: Newspaper,
  },
  {
    name: 'Music Player',
    description: 'Spotify-inspired audio streaming demo',
    href: `${HOST_URL}/music`,
    icon: Music,
  },
  {
    name: 'Trading App',
    description: 'Stock trading dashboard with real-time data',
    href: `${HOST_URL}/trade`,
    icon: TrendingUp,
  },
];

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-6 p-2">
      <h1 className="text-xl font-bold text-earth-forest">Profile</h1>

      <div className="flex flex-col gap-2">
        <a
          href={HOST_URL}
          className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white border border-earth-stone/30 text-earth-forest hover:bg-earth-stone/10 transition-colors"
        >
          <Home className="w-5 h-5 text-primary" />
          <span className="font-medium">Omar&apos;s Portfolio</span>
        </a>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white border border-earth-stone/30 text-earth-forest hover:bg-earth-stone/10 transition-colors"
        >
          <Code className="w-5 h-5 text-primary" />
          <span className="font-medium">View Source on GitHub</span>
        </a>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold text-secondary uppercase tracking-wider">
          Other Projects
        </h2>
        <div className="flex flex-col gap-2">
          {PROJECTS.map((project) => (
            <a
              key={project.name}
              href={project.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white border border-earth-stone/30 hover:bg-earth-stone/10 transition-colors"
            >
              <project.icon className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="font-medium text-earth-forest">{project.name}</p>
                <p className="text-xs text-secondary">{project.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
