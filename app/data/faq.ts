export interface FaqItem {
  question: string
  answer: string
}

export const faqItems: FaqItem[] = [
  {
    question: '개발팀이 있는데도 사용할 수 있나요?',
    answer:
      '네. EaaS는 기존 개발팀을 대체하는 것이 아니라 확장하는 서비스입니다. 유지보수와 Bug Fix처럼 개발팀의 시간을 많이 사용하는 업무를 맡거나 신규 기능 개발을 함께 수행해, 내부 팀이 핵심 업무에 집중할 수 있도록 지원합니다.',
  },
  {
    question: '기존 시스템 분석부터 진행하나요?',
    answer:
      '네. 계약 후 바로 요구사항을 처리하지 않고, System Discovery를 통해 Architecture, Repository, Database, Infrastructure, CI/CD 등을 먼저 파악합니다. 분석 결과는 이후 Engineering 작업의 기준이 됩니다.',
  },
  {
    question: '어떤 기술을 지원하나요?',
    answer:
      'Java, Spring Boot, Python, Angular, React, Next.js, Vue.js, Nuxt, RDBMS, NoSQL, Cloud, CI/CD 등 웹 서비스 환경을 중심으로 지원합니다. 목록에 없는 기술도 상담에서 고객사의 기술 환경을 확인한 뒤 지원 가능 여부를 안내해드립니다.',
  },
  {
    question: '신규 기능 개발도 가능한가요?',
    answer:
      '가능합니다. Engineering Growth와 Dedicated Engineering Package는 유지보수와 함께 신규 기능 개발을 포함합니다. 유지보수로 시작해 시스템을 충분히 이해한 뒤 개발 범위를 확장하는 방식도 가능합니다.',
  },
  {
    question: '개발자 파견 서비스인가요?',
    answer:
      '단순 인력 파견과는 다릅니다. EaaS는 기존 시스템에 대한 이해를 바탕으로 유지보수, 개발, QA, 배포, 리포트까지 Engineering 업무를 지속적으로 운영하는 서비스입니다. 작업 내용과 기술적 발견사항은 정기적으로 공유됩니다.',
  },
  {
    question: '유지보수 범위는 어디까지인가요?',
    answer:
      'Bug Fix, 라이브러리·프레임워크 업데이트, 운영 이슈 대응, 배포 등이 기본 범위입니다. 구체적인 범위와 업무 Capacity는 System Discovery 결과와 선택한 Package에 따라 계약 시 함께 정합니다.',
  },
  {
    question: '장애 대응은 어떻게 하나요?',
    answer:
      '장애 대응 범위와 응답 시간은 고객사의 서비스 특성과 Package에 따라 상담 시 협의합니다. 초기에는 이메일을 중심으로 이슈를 접수하고, 원인 분석과 조치 결과를 공유합니다.',
  },
  {
    question: '계약 기간은 어떻게 되나요?',
    answer:
      'EaaS는 지속적인 Engineering Service를 전제로 합니다. 최소 계약 기간 등 세부 조건은 업무 범위와 팀 구성에 따라 상담을 통해 결정합니다.',
  },
  {
    question: '보안과 접근 권한은 어떻게 관리하나요?',
    answer:
      '업무에 필요한 최소한의 권한만 요청하며, Repository와 Cloud 계정 등 접근 정보는 고객별로 분리해 관리합니다. 접근 범위와 관리 방식은 계약 시 고객사의 보안 정책에 맞춰 함께 확인합니다.',
  },
  {
    question: '어떤 Package를 선택해야 하나요?',
    answer:
      '기존 시스템의 안정적인 운영이 우선이라면 Engineering Maintenance, 유지보수와 신규 개발이 함께 필요하다면 Engineering Growth, 별도의 전담 팀이 필요하다면 Dedicated Engineering이 적합합니다. 판단이 어려우시다면 상담을 통해 함께 정해드립니다.',
  },
]
