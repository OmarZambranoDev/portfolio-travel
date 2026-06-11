export interface NavLink {
  label: string;
  href: string;
  icon: string; // Lucide icon name
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/', icon: 'Home' },
  { label: 'Destinations', href: '/destinations', icon: 'MapPin' },
  { label: 'Plan', href: '/plan', icon: 'Bot' },
  { label: 'Trips', href: '/trips', icon: 'Heart' },
  { label: 'Dashboard', href: '/dashboard', icon: 'BarChart2' },
];
