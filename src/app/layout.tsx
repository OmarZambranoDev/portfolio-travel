import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { Navbar } from '@/components/common/Navbar';
import { MobileHeader } from '@/components/mobile/MobileHeader';
import { MobileBottomNav } from '@/components/mobile/MobileBottomNav';
import '@OmarZambranoDev/portfolio-ui/dist/index.css';
import './globals.css';
import { Providers } from '@/components/common/Providers';

const geist = Geist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Travel',
    template: '%s | Travel',
  },
  description: 'Discover destinations, plan itineraries with AI, and save your dream trips.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={geist.className}>
        {/* Desktop layout */}
        <div className="max-md:hidden md:flex md:flex-col md:min-h-screen app-bg">
          <Navbar />
          <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
            <Providers>{children}</Providers>
          </main>
        </div>

        {/* Mobile layout */}
        <div className="max-md:flex md:hidden flex-col min-h-screen app-bg">
          <MobileHeader />
          <main className="flex-1 px-4 py-6 pb-24">
            <Providers>{children}</Providers>
          </main>
          <MobileBottomNav />
        </div>
      </body>
    </html>
  );
}
