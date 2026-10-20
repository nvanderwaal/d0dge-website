import { type MetadataRoute } from 'next'

import { siteUrl } from '@/app/site'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/privacy/`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
