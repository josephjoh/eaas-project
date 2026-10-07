export interface NavItem {
  label: string
  to: string
}

export const siteConfig = {
  name: 'EaaS',
  fullName: 'Engineering as a Service',
  description:
    '개발팀은 있지만 유지보수와 신규 개발을 동시에 수행하기 어려운 기업을 위해, 기존 시스템 분석부터 유지보수·Bug Fix·기능 개발·기술 개선까지 지속적으로 지원하는 Engineering Service입니다.',
}

/** 운영 회사 정보 (Footer 사업자 정보, 법적 고지에 사용) */
export const companyInfo = {
  name: '주식회사 솔루콘',
  businessNumber: '545-86-02505',
}

export const mainNav: NavItem[] = [
  { label: '서비스', to: '/services' },
  { label: '진행 방식', to: '/process' },
  { label: 'FAQ', to: '/faq' },
]

export const legalNav: NavItem[] = [
  { label: '개인정보처리방침', to: '/privacy' },
  { label: '이용약관', to: '/terms' },
]
