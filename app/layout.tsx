import './globals.css'
import type { Metadata, Viewport } from 'next'
import { MarketingMenu } from './components/marketing-menu'
import { PageLoader } from './components/page-loader'

const siteUrl = 'https://vyral-swart.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'VYRAL — Make work people notice.',
    template: '%s — VYRAL',
  },
  description: 'VYRAL helps creators find the right idea, make it sharper and understand what deserves another shot.',
  applicationName: 'VYRAL',
  generator: 'Next.js',
  keywords: ['VYRAL', 'creator growth', 'content strategy', 'TikTok growth', 'social media growth', 'creator analytics'],
  authors: [{ name: 'VYRAL' }],
  creator: 'VYRAL',
  publisher: 'VYRAL',
  alternates: { canonical: siteUrl },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-icon.svg', type: 'image/svg+xml' }],
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'VYRAL',
    title: 'VYRAL — Make work people notice.',
    description: 'Find the right idea. Make it sharper. Learn what deserves another shot.',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VYRAL — Make work people notice.',
    description: 'Find the right idea. Make it sharper. Learn what deserves another shot.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
}

export const viewport: Viewport = {
  themeColor: '#111113',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><PageLoader /><MarketingMenu />{children}</body></html>
}
