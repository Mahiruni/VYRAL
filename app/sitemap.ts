import type { MetadataRoute } from 'next'

const baseUrl = 'https://vyral-swart.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/login`, changeFrequency: 'monthly', priority: 0.7 },
  ]
}
