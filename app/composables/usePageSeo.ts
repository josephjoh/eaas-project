import { siteConfig } from '~/data/site'

interface PageSeoOptions {
  title: string
  description: string
  /** true면 "| EaaS" 접미사 없이 title을 그대로 사용한다. */
  rawTitle?: boolean
  /** public 기준 OG 이미지 경로 */
  image?: string
}

/**
 * 페이지별 title, description, canonical, Open Graph 메타를 설정한다.
 */
export function usePageSeo(options: PageSeoOptions) {
  const { siteUrl } = useRuntimeConfig().public
  const route = useRoute()

  const baseUrl = siteUrl.replace(/\/+$/, '')
  const path = route.path === '/' ? '/' : route.path.replace(/\/+$/, '')
  const canonical = `${baseUrl}${path}`
  const image = `${baseUrl}${options.image ?? '/images/og-image.png'}`
  const title = options.rawTitle ? options.title : `${options.title} | ${siteConfig.name}`

  useSeoMeta({
    title,
    description: options.description,
    ogType: 'website',
    ogSiteName: siteConfig.name,
    ogLocale: 'ko_KR',
    ogTitle: title,
    ogDescription: options.description,
    ogUrl: canonical,
    ogImage: image,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: options.description,
    twitterImage: image,
  })

  useHead({
    link: [{ rel: 'canonical', href: canonical }],
  })
}
