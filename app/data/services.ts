export interface EngineeringService {
  name: string
  title: string
  description: string
}

/** What We Do: EaaS가 수행하는 Engineering 업무 */
export const engineeringServices: EngineeringService[] = [
  {
    name: 'System Discovery',
    title: '시스템 분석',
    description: 'Architecture, Repository, Database, Infrastructure를 먼저 분석해 작업의 기준을 만듭니다.',
  },
  {
    name: 'Bug Fix',
    title: '버그 수정',
    description: '쌓여 있는 Bug를 우선순위에 따라 분류하고 원인부터 해결합니다.',
  },
  {
    name: 'Maintenance',
    title: '유지보수',
    description: '라이브러리 업데이트, 운영 이슈 대응 등 시스템이 안정적으로 동작하도록 관리합니다.',
  },
  {
    name: 'Feature Development',
    title: '기능 개발',
    description: '기존 코드베이스와 개발 규칙을 존중하며 신규 기능을 개발합니다.',
  },
  {
    name: 'Refactoring',
    title: '리팩토링',
    description: '기술 부채를 줄이고 변경하기 쉬운 코드 구조로 개선합니다.',
  },
  {
    name: 'Architecture',
    title: '아키텍처',
    description: '확장과 운영을 고려한 구조를 설계하고 기술적 의사결정을 지원합니다.',
  },
  {
    name: 'DevOps',
    title: '운영 자동화',
    description: 'CI/CD, Cloud Infrastructure, Monitoring 환경을 구성하고 개선합니다.',
  },
  {
    name: 'QA',
    title: '품질 검증',
    description: 'Code Review와 테스트로 배포 전 품질을 검증합니다.',
  },
  {
    name: 'Deployment',
    title: '배포',
    description: '검증된 변경 사항을 안전하게 배포하고 결과를 확인합니다.',
  },
  {
    name: 'Monthly Report',
    title: '월간 리포트',
    description: '작업 현황, 배포 내역, 이슈와 기술적 발견사항을 정리해 공유합니다.',
  },
]
