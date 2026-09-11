import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'VYRAL — Engineer the opportunity', description: 'AI growth co-pilot for TikTok creators.' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }