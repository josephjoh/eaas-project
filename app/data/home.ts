export interface TitledItem {
  title: string
  description: string
}

export const painPoints: TitledItem[] = [
  {
    title: '유지보수 때문에 신규 개발이 지연됩니다',
    description: '운영 이슈와 요청 대응에 시간을 쓰다 보면 로드맵의 기능 개발이 계속 뒤로 밀립니다.',
  },
  {
    title: 'Bug Fix가 계속 쌓입니다',
    description: '우선순위에서 밀린 Bug가 백로그에 쌓이며 서비스 품질과 고객 경험에 영향을 줍니다.',
  },
  {
    title: '개발자 채용이 어렵습니다',
    description: '필요한 역량의 개발자를 적시에 채용하기 어렵고, 채용 이후에도 적응과 관리에 리더의 시간이 많이 듭니다.',
  },
  {
    title: '기존 시스템 파악에 오래 걸립니다',
    description: '문서가 부족하고 특정 개발자만 아는 시스템은 새로운 인력이 이해하는 데만 상당한 시간이 필요합니다.',
  },
  {
    title: '기술 부채로 작은 수정도 오래 걸립니다',
    description: '오래된 코드와 라이브러리가 쌓이면서 변경할 때마다 시간이 더 들고 장애 위험도 커집니다.',
  },
  {
    title: '외주는 끝나면 운영이 다시 내부 몫입니다',
    description: '프로젝트형 외주는 납품과 함께 끝나, 이후 유지보수와 개선은 다시 내부 개발팀이 떠안게 됩니다.',
  },
  {
    title: 'DevOps / QA / Architecture 역량이 부족합니다',
    description: '기능 개발 인력만으로는 배포 자동화, 품질 관리, 구조 개선까지 챙기기 어렵습니다.',
  },
  {
    title: '신규 프로젝트 팀을 꾸리기 어렵습니다',
    description: '기존 서비스를 운영하면서 새 프로젝트를 위한 팀을 따로 구성하기는 쉽지 않습니다.',
  },
]

export const definitionPoints: TitledItem[] = [
  {
    title: 'Engineering Capacity',
    description: '필요한 역량을 필요한 만큼. 고객사 개발팀의 처리 용량을 확장합니다.',
  },
  {
    title: '기존 시스템 이해',
    description: 'System Discovery로 시스템을 먼저 이해한 뒤 작업을 시작합니다.',
  },
  {
    title: '지속적인 운영',
    description: '일회성 프로젝트가 아닌, 지속적인 Engineering 운영을 제공합니다.',
  },
  {
    title: '유지보수 → 개발 확장',
    description: '유지보수로 시작해 기능 개발과 기술 개선까지 자연스럽게 확장합니다.',
  },
]

// 스펙 9장의 수치(회사 30~200명, 개발자 3~10명)는 내부 타깃 가설이므로 화면에는 자격 조건처럼 보이지 않도록 상황으로 표현한다.
export const targetProfile: { label: string, value: string, description: string }[] = [
  {
    label: '서비스',
    value: '자체 서비스 운영',
    description: '고객에게 직접 서비스를 제공하고 운영하는 기업',
  },
  {
    label: '개발 조직',
    value: '내부 개발팀 보유',
    description: '개발팀은 있지만 처리할 업무가 인력보다 많은 곳',
  },
  {
    label: '개발 상황',
    value: '운영과 개발 병행',
    description: '유지보수와 신규 개발을 동시에 감당해야 하는 곳',
  },
  {
    label: '성장 단계',
    value: '확장 준비 중',
    description: '새 기능이나 신규 프로젝트를 계획하고 있는 곳',
  },
]

export const techStacks: string[] = [
  'Java',
  'Spring Boot',
  'Python',
  'Angular',
  'React',
  'Next.js',
  'Vue.js',
  'Nuxt',
  'RDBMS',
  'NoSQL / 비정형 데이터',
  'Cloud',
  'API',
  'CI/CD',
]

export const discoveryTargets: TitledItem[] = [
  { title: 'Architecture', description: '서비스 구성과 모듈 간 관계' },
  { title: 'Technology Stack', description: '언어, 프레임워크, 라이브러리 버전' },
  { title: 'Repository', description: '코드 구조, 브랜치 전략, 개발 규칙' },
  { title: 'Database', description: '스키마, 데이터 흐름, 주요 쿼리' },
  { title: 'Infrastructure', description: 'Cloud 리소스와 네트워크 구성' },
  { title: 'Deployment / CI/CD', description: '빌드·배포 파이프라인과 절차' },
  { title: 'External API', description: '외부 연동 서비스와 의존성' },
  { title: 'Monitoring / Logging', description: '모니터링, 로그, 알림 체계' },
  { title: 'Known Issues', description: '알려진 장애와 반복되는 이슈' },
  { title: 'Technical Debt', description: '개선이 필요한 코드와 구조' },
]

export const discoveryOutcomes: TitledItem[] = [
  { title: '분석 결과 정리', description: '시스템 구조와 운영 방식을 문서로 정리합니다.' },
  { title: 'Engineering 작업 기준', description: '작업 범위와 우선순위를 정하는 기준이 됩니다.' },
  { title: 'Engineering Knowledge Base', description: '운영하며 쌓이는 시스템 지식을 지속적으로 축적합니다.' },
]

export const whyComparisons: { topic: string, common: string, eaas: string }[] = [
  {
    topic: '시작 방식',
    common: '요구사항을 전달받아 바로 작업에 투입',
    eaas: 'System Discovery로 기존 시스템을 먼저 이해',
  },
  {
    topic: '제공 범위',
    common: '개발 인력 제공',
    eaas: '유지보수부터 QA, 배포, 리포트까지 Engineering 운영',
  },
  {
    topic: '시스템 지식',
    common: '투입된 개인에게 남음',
    eaas: '분석 결과와 발견사항을 정리해 공유',
  },
  {
    topic: '확장성',
    common: '필요할 때마다 별도 계약',
    eaas: '유지보수에서 기능 개발, 전담 팀까지 단계적 확장',
  },
  {
    topic: '커뮤니케이션',
    common: '요청이 있을 때 비정기적으로 공유',
    eaas: '작업 현황과 이슈를 정기 리포트로 공유',
  },
]

export const securityPrinciples: TitledItem[] = [
  {
    title: '최소 권한 원칙',
    description: '업무에 필요한 최소한의 접근 권한만 요청하고 사용합니다.',
  },
  {
    title: '고객별 데이터 분리',
    description: '고객사별 정보와 작업 환경을 분리해 관리합니다.',
  },
  {
    title: 'Repository 접근 관리',
    description: '저장소 접근 권한을 담당자 단위로 관리하고, 종료 시 권한 회수 절차를 함께 진행합니다.',
  },
  {
    title: 'Cloud IAM 최소 권한',
    description: 'AWS IAM 등 Cloud 권한은 필요한 범위로 제한된 계정과 Role 사용을 원칙으로 합니다.',
  },
  {
    title: '접근 정보 별도 관리',
    description: '고객 시스템 접근 정보는 일반 업무 자료와 분리해 별도로 관리합니다.',
  },
  {
    title: '개인정보 최소 수집',
    description: '상담과 업무 수행에 필요한 최소한의 정보만 수집합니다.',
  },
]
