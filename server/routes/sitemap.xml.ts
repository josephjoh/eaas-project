/**
 * sitemap.xml
 * `nuxt generate` 시 prerender되어 정적 파일(.output/public/sitemap.xml)로 출력된다.
 * 도메인은 NUXT_PUBLIC_SITE_URL을 사용한다.
 */
const pages: { path: string, priority: string }[] = [
  { path: '/', priority: '1.0' },
  { path: '/services', priority: '0.9' },
  { path: '/services/maintenance', priority: '0.8' },
  { path: '/services/growth', priority: '0.8' },
  { path: '/services/dedicated', priority: '0.8' },
  { path: '/process', priority: '0.7' },
  { path: '/inquiry', priority: '0.8' },
  { path: '/faq', priority: '0.6' },
  { path: '/privacy', priority: '0.2' },
  { path: '/terms', priority: '0.2' },
]

export default defineEventHandler((event) => {
  const siteUrl = useRuntimeConfig().public.siteUrl.replace(/\/+$/, '')
  // 정적 사이트이므로 빌드(배포) 날짜를 lastmod로 사용한다.
  const lastmod = new Date().toISOString().slice(0, 10)

  const urls = pages
    .map(page => [
      '  <url>',
      `    <loc>${siteUrl}${page.path}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <priority>${page.priority}</priority>`,
      '  </url>',
    ].join('\n'))
    .join('\n')

  setResponseHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
})
