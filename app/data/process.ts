export interface ProcessStep {
  name: string
  title: string
  description?: string
  highlight?: boolean
}

/** 상담 신청부터 리포트까지 고객이 경험하는 전체 진행 단계 */
export const engagementSteps: ProcessStep[] = [
  {
    name: 'Inquiry',
    title: '상담 신청',
    description: '신청서를 통해 회사와 개발 환경, 현재 겪고 있는 개발 문제를 알려주세요.',
  },
  {
    name: 'Consultation',
    title: '상담',
    description: '개발 문제와 필요한 지원 형태를 함께 정리하고 적합한 Package를 제안합니다.',
  },
  {
    name: 'Contract',
    title: '계약',
    description: '업무 범위, 팀 구성, 기간 등 세부 조건을 확정합니다.',
  },
  {
    name: 'System Onboarding',
    title: '온보딩',
    description: 'Repository, Infrastructure, Database 등 업무에 필요한 접근 권한을 최소 범위로 전달받습니다.',
  },
  {
    name: 'System Discovery',
    title: '시스템 분석',
    description: '기존 시스템을 분석해 이후 Engineering 작업의 기준을 만듭니다.',
    highlight: true,
  },
  {
    name: 'Engineering',
    title: '개발 · 유지보수',
    description: '유지보수, Bug Fix, 기능 개발 등 합의된 업무를 수행합니다.',
  },
  {
    name: 'QA',
    title: '품질 검증',
    description: '개발 서버에서 테스트를 거쳐 변경 사항을 검증합니다.',
  },
  {
    name: 'Deployment',
    title: '배포',
    description: '검증된 변경 사항을 배포하고 결과를 확인합니다.',
  },
  {
    name: 'Report',
    title: '리포트',
    description: '작업 현황, 배포, 이슈, 다음 작업을 정리해 공유합니다.',
  },
]

/** 계약 이후 고객 onboarding 흐름 */
export const onboardingSteps: ProcessStep[] = [
  { name: 'Contract', title: '계약' },
  { name: 'Repository Access', title: '저장소 접근' },
  { name: 'Infrastructure / Account', title: '인프라 · 계정 정보' },
  { name: 'Database Information', title: '데이터베이스 정보' },
  { name: 'System Discovery', title: '시스템 분석', highlight: true },
  { name: 'Engineering Start', title: '업무 시작' },
]

/** 개별 작업 요청이 처리되는 운영 흐름 */
export const operationSteps: ProcessStep[] = [
  { name: 'Request', title: '요청 접수' },
  { name: 'Triage', title: '분류 · 우선순위' },
  { name: 'Estimate', title: '작업 규모 산정' },
  { name: 'Approval', title: '고객 승인' },
  { name: 'Development', title: '개발' },
  { name: 'QA', title: '품질 검증' },
  { name: 'Deploy', title: '배포' },
  { name: 'Report', title: '결과 보고' },
]

/** 이메일 리포트로 공유하는 항목 */
export const reportItems: string[] = [
  '작업 현황',
  'Bug Fix 내역',
  'Deployment 내역',
  '이슈',
  '다음 작업',
  '기술적 발견사항',
]
