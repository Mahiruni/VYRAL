import './globals.css';
import type { Metadata } from 'next';
import { MarketingMenu } from './components/marketing-menu';
import { PageLoader } from './components/page-loader';

export const metadata: Metadata = {
  title: 'VYRAL — Make your next move count.',
  description: 'VYRAL helps creators find the right idea, make it sharper and understand what deserves another shot.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><PageLoader /><MarketingMenu />{children}</body></html>;
}
