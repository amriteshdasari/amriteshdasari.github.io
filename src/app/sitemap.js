import { SITE_URL } from './lib/site'

export const dynamic = 'force-static'

export default function sitemap() {
  return ['/', '/projects/'].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : 0.8,
  }))
}
