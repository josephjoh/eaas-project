export type PackageSlug = 'maintenance' | 'growth' | 'dedicated'

export interface PackageScope {
  name: string
  description: string
}

export interface ServicePackage {
  slug: PackageSlug
  name: string
  badge: string
  tagline: string
  purpose: string
  summary: string
  scopes: PackageScope[]
  recommendedFor: string[]
}

/** 모든 Package의 공통 시작 단계 */
const systemDiscoveryScope: PackageScope = {
  name: 'System Discovery',
  description: '작업 전 기존 시스템의 구조, 코드, 인프라를 분석해 Engineering 작업의 기준을 만듭니다.',
}

const packagesBySlug: Record<PackageSlug, ServicePackage> = {
  maintenance: {
    slug: 'maintenance',
    name: 'Engineering Maintenance',
    badge: 'Stability',
    tagline: '기존 시스템의 안정적인 운영',
    purpose: '기존 시스템의 안정적인 운영과 지속적인 유지보수',
    summary:
      '운영 중인 서비스를 이해하고, 쌓여 있는 Bug와 유지보수 업무를 지속적으로 처리해 내부 개발팀이 핵심 업무에 집중할 수 있도록 합니다.',
    scopes: [
      systemDiscoveryScope,
      { name: 'Bug Fix', description: '보고된 Bug를 분류하고 원인 분석부터 수정까지 처리합니다.' },
      { name: 'Maintenance', description: '운영 중 발생하는 이슈에 대응해 시스템을 안정적으로 유지합니다.' },
      { name: 'Deployment', description: '변경 사항을 검증된 절차에 따라 배포합니다.' },
      { name: 'Report', description: '작업 현황, 배포 내역, 이슈 내용 등을 보고합니다.' },
    ],
    recommendedFor: [
      '유지보수 업무 때문에 신규 개발이 계속 지연되는 팀',
      '처리되지 못한 Bug가 계속 쌓이고 있는 서비스',
      '시스템 지식이 특정 개발자에게 집중되어 있는 조직',
    ],
  },
  growth: {
    slug: 'growth',
    name: 'Engineering Growth',
    badge: 'Growth',
    tagline: '유지보수 + 지속적인 개발',
    purpose: '유지보수뿐 아니라 지속적인 기능 개발과 기술 개선',
    summary:
      '안정적인 유지보수를 기반으로 신규 기능 개발, 리팩토링, DevOps, QA까지 함께 수행해 서비스의 개발 속도를 높입니다.',
    scopes: [
      systemDiscoveryScope,
      { name: 'Maintenance', description: '기존 시스템의 유지보수와 Bug Fix를 지속적으로 수행합니다.' },
      { name: 'Feature Development', description: '백로그의 신규 기능을 설계하고 개발합니다.' },
      { name: 'Refactoring', description: '기능은 그대로 유지하면서 코드 구조를 정리해 개발 속도를 높입니다.' },
      { name: 'DevOps', description: 'CI/CD와 인프라 운영 환경을 개선합니다.' },
      { name: 'QA', description: '개발 서버에서 먼저 테스트해 운영 환경의 문제를 줄입니다.' },
      { name: 'Deployment', description: '검증된 변경 사항을 안전하게 배포합니다.' },
    ],
    recommendedFor: [
      '백로그는 쌓여 있지만 개발 인력이 부족한 팀',
      '유지보수와 신규 개발을 동시에 진행해야 하는 서비스',
      'DevOps / QA 역량을 보완하고 싶은 조직',
    ],
  },
  dedicated: {
    slug: 'dedicated',
    name: 'Dedicated Engineering',
    badge: 'Team',
    tagline: '외부 Engineering Team 구성',
    purpose: '고객사의 Engineering Capacity를 확장하는 외부 Engineering Team',
    summary:
      '고객사 전담 Engineering Team을 구성해 유지보수와 신규 개발, 아키텍처와 기술 개선까지 폭넓게 수행합니다.',
    scopes: [
      systemDiscoveryScope,
      { name: 'Dedicated Engineering Team', description: '고객사를 전담하는 Engineering Team을 구성합니다.' },
      { name: 'Maintenance', description: '운영 중인 시스템의 유지보수를 수행합니다.' },
      { name: 'New Development', description: '신규 서비스와 프로젝트 개발을 수행합니다.' },
      { name: 'Architecture', description: '확장성과 운영을 고려한 아키텍처를 설계합니다.' },
      { name: 'DevOps', description: 'Cloud Infrastructure와 배포 파이프라인을 구성하고 운영합니다.' },
      { name: 'QA', description: '테스트 전략을 수립하고 품질을 검증합니다.' },
      { name: 'Technical Improvement', description: '성능, 보안, 구조 등 기술적 개선 과제를 수행합니다.' },
    ],
    recommendedFor: [
      '신규 프로젝트를 위한 별도 팀 구성이 필요한 기업',
      '개발자 채용과 관리 부담을 줄이고 싶은 조직',
      'Architecture / DevOps / QA 역량이 함께 필요한 서비스',
    ],
  },
}

export const servicePackages: ServicePackage[] = [
  packagesBySlug.maintenance,
  packagesBySlug.growth,
  packagesBySlug.dedicated,
]

export function getPackage(slug: PackageSlug): ServicePackage {
  return packagesBySlug[slug]
}

/** Package 세부 조건 중 상담을 통해 고객사와 함께 정하는 항목 */
export const packageConsultationItems: string[] = [
  '팀 구성 및 개발자 수',
  'PM / Tech Lead 포함 여부',
  'QA / DevOps 포함 여부',
  '최소 계약 기간',
  '고객사 개발팀과의 역할 분담',
  '응답 시간 및 장애 대응 범위',
  '월 업무 Capacity',
]
