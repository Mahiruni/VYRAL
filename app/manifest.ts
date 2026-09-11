import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'VYRAL — Creator Growth',
    short_name: 'VYRAL',
    description: 'Find the right idea, make it sharper, and learn what deserves another shot.',
    start_url: '/app',
    display: 'standalone',
    background_color: '#f4f3ee',
    theme_color: '#111113',
    orientation: 'portrait-primary',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' },
    ],
  }
}
