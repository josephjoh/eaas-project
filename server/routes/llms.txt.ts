import { faqItems } from '../../app/data/faq'
import { servicePackages } from '../../app/data/packages'
import { engagementSteps } from '../../app/data/process'
import { engineeringServices } from '../../app/data/services'
import { companyInfo, siteConfig } from '../../app/data/site'

/**
 * llms.txt (https://llmstxt.org)
 * ChatGPT, Claude, Perplexity 등 AI 답변 엔진이 사이트를 빠르게 이해하도록 핵심 내용을 Markdown으로 요약한다.
 * `nuxt generate` 시 prerender되어 정적 파일(.output/public/llms.txt)로 출력된다.
 */
export default defineEventHandler((event) => {
  const { siteUrl: rawSiteUrl, contactEmail } = useRuntimeConfig().public
  const siteUrl = rawSiteUrl.replace(/\/+$/, '')

  const packages = servicePackages
    .map(pkg => [
      `### ${pkg.name} (${pkg.tagline})`,
      '',
      `${pkg.purpose}. ${pkg.summary}`,
      '',
      `- 업무 범위: ${pkg.scopes.map(scope => scope.name).join(', ')}`,
      `- 추천 대상: ${pkg.recommendedFor.join(' / ')}`,
      `- 상세: ${siteUrl}/services/${pkg.slug}`,
    ].join('\n'))
    .join('\n\n')

  const services = engineeringServices
    .map(service => `- **${service.name} (${service.title})**: ${service.description}`)
    .join('\n')

  const steps = engagementSteps
    .map((step, index) => `${index + 1}. ${step.title} (${step.name})${step.description ? `: ${step.description}` : ''}`)
    .join('\n')

  const faq = faqItems
    .map(item => `### ${item.question}\n\n${item.answer}`)
    .join('\n\n')

  setResponseHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return `# ${siteConfig.name} (${siteConfig.fullName})

> ${siteConfig.description}

${siteConfig.name}는 ${companyInfo.name}에서 운영하는 B2B Engineering Service입니다. 개발팀을 대체하는 인력 파견이 아니라, 고객사의 기존 개발팀을 확장해 유지보수·Bug Fix·신규 기능 개발·DevOps·QA·배포·리포트까지 지속적으로 수행합니다. 모든 계약은 기존 시스템을 먼저 분석하는 System Discovery로 시작합니다.

- 운영사: ${companyInfo.name} (사업자등록번호 ${companyInfo.businessNumber})
- 문의: ${contactEmail}
- 상담 신청: ${siteUrl}/inquiry

## Pages

- [홈](${siteUrl}/): 서비스 개요
- [서비스](${siteUrl}/services): Package 비교
- [진행 방식](${siteUrl}/process): 상담부터 리포트까지의 진행 절차
- [자주 묻는 질문](${siteUrl}/faq): 서비스 범위, 기술, 계약, 보안 FAQ
- [상담 신청](${siteUrl}/inquiry): 상담 신청 양식

## Service Packages

${packages}

## Engineering 업무

${services}

## 진행 방식

${steps}

## FAQ

${faq}
`
})
