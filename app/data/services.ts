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
    description: 'Architecture, Repository, Database, Infrastructure 등을 먼저 분석해 작업의 기준을 만듭니다.',
  },
  {
    name: 'Bug Fix',
    title: '버그 수정',
    description: '쌓여 있는 Bug를 우선순위에 따라 분류하고 원인부터 해결합니다.',
  },
  {
    name: 'Maintenance',
    title: '유지보수',
    description: '실시간 발생하는 운영 이슈 대응으로 시스템을 안정적으로 유지합니다.',
  },
  {
    name: 'Feature Development',
    title: '기능 개발',
    description: '기존 코드베이스와 개발 규칙을 기반으로 신규 기능을 개발합니다.',
  },
  {
    name: 'Refactoring',
    title: '리팩토링',
    description: '기능은 그대로 유지하면서 복잡한 코드 구조를 정리해, 이후 변경과 개발 속도를 높입니다.',
  },
  {
    name: 'Architecture',
    title: '아키텍처',
    description: '확장과 운영을 고려한 구조를 설계하고 기술적 의사결정을 지원합니다.',
  },
  {
    name: 'DevOps',
    title: '운영 자동화',
    description: 'CI/CD, Cloud Infrastructure 환경을 구성하고 개선합니다.',
  },
  {
    name: 'QA',
    title: '품질 검증',
    description: '개발된 사항을 먼저 개발서버에서 테스트를 거쳐서 실제 운영환경에서 문제를 최소한으로 줄입니다.',
  },
  {
    name: 'Deployment',
    title: '배포',
    description: '검증된 변경 사항을 안전하게 배포하고 결과를 확인합니다.',
  },
  {
    name: 'Report',
    title: '리포트',
    description: '작업 현황, 배포 내역, 이슈와 기술적 발견사항을 정리해 공유합니다.',
  },
]
