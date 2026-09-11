import './globals.css';
import type { Metadata } from 'next';
import { MarketingMenu } from './components/marketing-menu';

export const metadata: Metadata = {
  title: 'VYRAL — Make your next move count.',
  description: 'VYRAL is a creator growth system for finding signals, building sharper short-form videos, and learning from performance.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><MarketingMenu />{children}</body></html>;
}
