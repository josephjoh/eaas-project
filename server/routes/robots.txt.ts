/**
 * robots.txt
 * `nuxt generate` 시 prerender되어 정적 파일(.output/public/robots.txt)로 출력된다.
 * 검색엔진과 AI 검색·답변 서비스의 크롤러를 명시적으로 허용한다.
 */
const aiCrawlers = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
]

export default defineEventHandler((event) => {
  const siteUrl = useRuntimeConfig().public.siteUrl.replace(/\/+$/, '')

  const aiRules = aiCrawlers.map(agent => `User-agent: ${agent}\nAllow: /`).join('\n\n')

  setResponseHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return `User-agent: *
Allow: /

${aiRules}

Sitemap: ${siteUrl}/sitemap.xml
`
})
