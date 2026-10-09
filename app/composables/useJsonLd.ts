import type { ServicePackage } from '~/data/packages'
import { companyInfo, siteConfig } from '~/data/site'

type JsonLd = Record<string, unknown>

/**
 * schema.org 구조화 데이터(JSON-LD)를 <head>에 추가한다.
 * 검색엔진 리치 결과와 AI 검색(답변 엔진)이 페이지 내용을 정확히 이해하는 데 사용된다.
 */
export function useJsonLd(schema: JsonLd | JsonLd[]) {
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(Array.isArray(schema) ? { '@context': 'https://schema.org', '@graph': schema } : { '@context': 'https://schema.org', ...schema }),
      },
    ],
  })
}

/** 사이트 기준 URL (끝 / 제거) */
export function useSiteUrl() {
  return useRuntimeConfig().public.siteUrl.replace(/\/+$/, '')
}

/** 여러 스키마에서 같은 Organization을 참조하기 위한 @id */
export function organizationId(siteUrl: string) {
  return `${siteUrl}/#organization`
}

/** 사이트 전역 Organization + WebSite 스키마 */
export function buildSiteSchemas(siteUrl: string): JsonLd[] {
  const { contactEmail, contactPhone } = useRuntimeConfig().public

  return [
    {
      '@type': 'Organization',
      '@id': organizationId(siteUrl),
      'name': companyInfo.name,
      'alternateName': ['Solucon', 'Soluconlab', siteConfig.name, siteConfig.fullName],
      'url': `${siteUrl}/`,
      'logo': `${siteUrl}/images/logo.svg`,
      'description': siteConfig.description,
      'taxID': companyInfo.businessNumber,
      'contactPoint': {
        '@type': 'ContactPoint',
        'contactType': 'sales',
        'email': contactEmail,
        ...(contactPhone ? { telephone: contactPhone } : {}),
        'availableLanguage': ['Korean', 'English'],
        'areaServed': 'KR',
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      'name': `${siteConfig.name} - ${siteConfig.fullName}`,
      'url': `${siteUrl}/`,
      'inLanguage': 'ko-KR',
      'publisher': { '@id': organizationId(siteUrl) },
    },
  ]
}

/** Package 상세 페이지의 Service 스키마 */
export function useServiceJsonLd(pkg: ServicePackage) {
  const siteUrl = useSiteUrl()

  useJsonLd({
    '@type': 'Service',
    'name': pkg.name,
    'serviceType': siteConfig.fullName,
    'description': `${pkg.purpose}. ${pkg.summary}`,
    'url': `${siteUrl}/services/${pkg.slug}`,
    'provider': { '@id': organizationId(siteUrl) },
    'areaServed': { '@type': 'Country', 'name': 'KR' },
    'audience': { '@type': 'BusinessAudience', 'audienceType': pkg.recommendedFor.join(', ') },
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': `${pkg.name} 업무 범위`,
      'itemListElement': pkg.scopes.map(scope => ({
        '@type': 'Offer',
        'itemOffered': { '@type': 'Service', 'name': scope.name, 'description': scope.description },
      })),
    },
  })
}
