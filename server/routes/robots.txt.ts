/**
 * robots.txt
 * `nuxt generate` 시 prerender되어 정적 파일(.output/public/robots.txt)로 출력된다.
 */
export default defineEventHandler((event) => {
  const siteUrl = useRuntimeConfig().public.siteUrl.replace(/\/+$/, '')

  setResponseHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`
})
