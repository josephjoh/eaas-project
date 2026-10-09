import { siteConfig } from '~/data/site'

interface Breadcrumb {
  name: string
  path: string
}

interface PageSeoOptions {
  title: string
  description: string
  /** true면 "| EaaS" 접미사 없이 title을 그대로 사용한다. */
  rawTitle?: boolean
  /** public 기준 OG 이미지 경로 */
  image?: string
  /** 홈 이후의 경로 (BreadcrumbList 구조화 데이터). 홈은 자동으로 앞에 붙는다. */
  breadcrumbs?: Breadcrumb[]
}

/**
 * 페이지별 title, description, canonical, Open Graph 메타를 설정한다.
 */
export function usePageSeo(options: PageSeoOptions) {
  const route = useRoute()

  const baseUrl = useSiteUrl()
  const path = route.path === '/' ? '/' : route.path.replace(/\/+$/, '')
  const canonical = `${baseUrl}${path}`
  const image = `${baseUrl}${options.image ?? '/images/og-image.png'}`
  const title = options.rawTitle ? options.title : `${options.title} | ${siteConfig.name}`

  useSeoMeta({
    title,
    description: options.description,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
    ogType: 'website',
    ogSiteName: siteConfig.name,
    ogLocale: 'ko_KR',
    ogTitle: title,
    ogDescription: options.description,
    ogUrl: canonical,
    ogImage: image,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: `${siteConfig.name} - ${siteConfig.fullName}`,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: options.description,
    twitterImage: image,
  })

  useHead({
    link: [{ rel: 'canonical', href: canonical }],
  })

  if (options.breadcrumbs?.length) {
    const items = [{ name: '홈', path: '/' }, ...options.breadcrumbs]
    useJsonLd({
      '@type': 'BreadcrumbList',
      'itemListElement': items.map((item, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': item.name,
        'item': `${baseUrl}${item.path}`,
      })),
    })
  }
}
