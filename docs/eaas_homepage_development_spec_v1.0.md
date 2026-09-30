# EaaS Homepage 개발 스펙 v1.0

작성 기준일: 2026-09-22

## 1. 문서 목적

본 문서는 EaaS(Engineering as a Service) 비즈니스의 초기 홈페이지 MVP를 실제 개발할 수 있도록 최근 논의한 기술 스택, 페이지 구조, 컴포넌트, 인프라, 배포 방식을 정리한 개발 스펙이다.

현재 홈페이지의 핵심 목적은 다음과 같다.

- EaaS 서비스 소개
- 타깃 고객의 Pain Point 전달
- 서비스 패키지 소개
- 운영 방식 및 System Discovery 설명
- 보안/신뢰성 설명
- 상담 신청(Lead Generation)

초기에는 고객 Portal, Backend, DB, AI Agent 등을 구현하지 않는다.

## 2. 핵심 개발 방향

- 정적 홈페이지 중심으로 개발
- DB 연결 없음
- 별도 Backend 없음
- Nuxt SSG(Static Site Generation) 사용
- 문의는 Google Form 사용
- GitHub 기반 소스 관리
- AWS Amplify Hosting으로 배포
- 서버 직접 운영은 하지 않음
- 향후 Customer Portal / Backend / AI Platform으로 확장 가능한 구조 유지

## 3. 기술 스택

| 영역 | 기술 |
|---|---|
| Framework | Nuxt 4 |
| UI Framework | Vue 3 |
| Language | TypeScript |
| Build | Vite |
| CSS | Tailwind CSS 권장 |
| State Management | 필요 시 Pinia |
| Validation | Zod 등 필요 시 적용 |
| Lint | ESLint |
| SEO | Nuxt SEO / Head 관리 |
| Analytics | Google Analytics 4 |
| Inquiry | Google Forms |
| Database | 없음 |
| Backend | 없음 |
| Source Control | GitHub |
| Hosting | AWS Amplify Hosting |
| CDN | Amplify 관리 CloudFront |
| Domain | Route 53 또는 기존 DNS |
| SSL | Amplify 관리 HTTPS |
| Server | 없음 |

## 4. AWS EC2 대신 Amplify를 사용하는 이유

초기 EaaS 홈페이지는 정적 사이트이므로 EC2 + Nginx를 직접 운영할 필요성이 낮다.

### EC2 방식

```text
GitHub
   ↓
Build
   ↓
EC2
   ↓
Nginx
   ↓
Static Files
```

직접 관리해야 하는 항목:

- EC2
- OS
- Nginx
- SSL
- 보안
- 배포
- 서버 장애
- 서버 업데이트

### Amplify 방식

```text
GitHub
   ↓
AWS Amplify
   ↓
Build
   ↓
Deploy
   ↓
CDN / HTTPS
   ↓
사용자
```

장점:

- 서버 운영 불필요
- Git push 기반 자동 배포
- HTTPS 관리
- CDN 제공
- 정적 사이트에 적합
- 초기 운영 복잡도 감소
- 홈페이지 개발에 집중 가능

따라서 현재 EaaS Homepage MVP에서는 AWS Amplify Hosting을 기본 배포 방식으로 사용한다.

## 5. 전체 인프라

```text
                    Internet
                       │
                       ▼
                Custom Domain
                       │
                       ▼
             AWS Amplify Hosting
                       │
              ┌────────┴────────┐
              │                 │
          Build/Deploy          CDN
              │                 │
              └────────┬────────┘
                       ▼
                  Nuxt SSG
                       │
                       ▼
                  사용자 브라우저
```

문의:

```text
Homepage
   │
   ▼
Google Form
   │
   ▼
Google Sheet
```

현재 EC2, Nginx, DB, Backend는 사용하지 않는다.

## 6. 프로젝트 구조

Nuxt 4 기준 권장 구조:

```text
eaas-homepage/
│
├─ app/
│  ├─ assets/
│  │  └─ css/
│  │     ├─ reset.css
│  │     ├─ variables.css
│  │     └─ main.css
│  │
│  ├─ components/
│  │  ├─ common/
│  │  │  ├─ AppHeader.vue
│  │  │  ├─ AppFooter.vue
│  │  │  ├─ BaseButton.vue
│  │  │  └─ SectionTitle.vue
│  │  │
│  │  ├─ home/
│  │  │  ├─ HeroSection.vue
│  │  │  ├─ PainPointSection.vue
│  │  │  ├─ ServiceSection.vue
│  │  │  ├─ TargetSection.vue
│  │  │  ├─ PackageSection.vue
│  │  │  ├─ ProcessSection.vue
│  │  │  ├─ SystemDiscoverySection.vue
│  │  │  ├─ SecuritySection.vue
│  │  │  └─ FaqSection.vue
│  │  │
│  │  └─ inquiry/
│  │     └─ InquiryForm.vue
│  │
│  ├─ data/
│  │  ├─ services.ts
│  │  ├─ packages.ts
│  │  ├─ process.ts
│  │  └─ faq.ts
│  │
│  ├─ layouts/
│  │  └─ default.vue
│  │
│  ├─ pages/
│  │  ├─ index.vue
│  │  ├─ services/
│  │  │  ├─ index.vue
│  │  │  ├─ maintenance.vue
│  │  │  ├─ growth.vue
│  │  │  └─ dedicated.vue
│  │  ├─ process.vue
│  │  ├─ inquiry.vue
│  │  ├─ faq.vue
│  │  ├─ privacy.vue
│  │  └─ terms.vue
│  │
│  └─ app.vue
│
├─ public/
│  ├─ favicon.ico
│  ├─ robots.txt
│  ├─ sitemap.xml
│  └─ images/
│
├─ nuxt.config.ts
├─ package.json
├─ tsconfig.json
├─ eslint.config.mjs
├─ .gitignore
├─ .env.example
└─ README.md
```

## 7. 페이지 구성

### `/`

EaaS 홈페이지 메인.

```text
Hero
Customer Pain
EaaS Service Definition
Target Customer
What We Do
Service Packages
How It Works
System Discovery
Why EaaS
Security
FAQ
Inquiry CTA
```

### `/services`

전체 서비스 소개.

- Engineering Maintenance
- Engineering Growth
- Dedicated Engineering

### `/services/maintenance`

- System Analysis
- Bug Fix
- Maintenance
- Deployment
- Monthly Report

목적: 기존 시스템의 안정적인 운영과 지속적인 유지보수.

### `/services/growth`

- Maintenance
- Feature Development
- Refactoring
- DevOps
- QA
- Deployment

목적: 유지보수뿐 아니라 지속적인 기능 개발과 기술 개선.

### `/services/dedicated`

- Dedicated Engineering Team
- Maintenance
- New Development
- Architecture
- DevOps
- QA
- Technical Improvement

목적: 고객사의 Engineering Capacity를 확장하는 외부 Engineering Team.

### `/process`

```text
01 Inquiry
   ↓
02 Consultation
   ↓
03 Contract
   ↓
04 System Onboarding
   ↓
05 System Discovery
   ↓
06 Engineering
   ↓
07 QA / Review
   ↓
08 Deployment
   ↓
09 Report
```

### `/inquiry`

상담 신청 페이지. 초기에는 Google Form으로 연결한다.

### `/faq`

예상 FAQ:

- 개발팀이 있는데도 사용할 수 있나요?
- 기존 시스템 분석부터 진행하나요?
- 어떤 기술을 지원하나요?
- 신규 기능 개발도 가능한가요?
- 개발자 파견 서비스인가요?
- 유지보수 범위는 어디까지인가요?
- 장애 대응은 어떻게 하나요?
- 계약 기간은 어떻게 되나요?
- 보안과 접근 권한은 어떻게 관리하나요?
- 어떤 Package를 선택해야 하나요?

### `/privacy`

개인정보처리방침.

### `/terms`

서비스 이용약관 또는 필요한 법적 고지.

## 8. 메인 페이지 상세 구조

### Hero

방문자가 첫 화면에서 EaaS의 핵심 가치를 이해하도록 한다.

예시 방향:

> 개발팀은 있지만, 개발이 계속 밀리고 있습니까?

> 기존 시스템의 유지보수부터 신규 기능 개발까지 고객사의 Engineering Team을 확장해드립니다.

CTA:

```text
[ EaaS 상담 신청 ]
[ 서비스 알아보기 ]
```

### Customer Pain

- 유지보수 때문에 신규 개발이 지연됨
- Bug Fix가 계속 쌓임
- 개발자 채용이 어려움
- 개발자 관리 부담
- 기존 시스템을 이해하는 데 시간이 오래 걸림
- 특정 개발자에게 시스템 지식이 집중됨
- DevOps / QA / Architecture 역량 부족
- 신규 프로젝트를 위한 별도 팀 구성 어려움

### Service Definition

핵심 메시지 방향:

> 개발팀은 있지만, 유지보수와 신규 개발을 동시에 수행하기 어려운 기업을 위한 지속적인 Engineering Service

> 고객의 기존 시스템과 개발 환경을 분석하고 필요한 Engineering Resource를 제공하여 유지보수, Bug Fix, 기능 개발, 기술 개선까지 지속적으로 지원합니다.

단순 개발자 파견보다 다음을 강조한다.

- Engineering Capacity
- 기존 시스템 이해
- 지속적인 운영
- 유지보수 → 개발 확장

## 9. Target Customer

초기 타깃 가설:

```text
회사 규모: 30~200명
개발자: 3~10명
자체 서비스 운영
기존 개발팀 보유
```

주요 기술 환경 예:

- Java
- Spring Boot
- Python
- Angular
- React
- Vue.js
- RDBMS
- NoSQL / 비정형 데이터
- Cloud
- API
- CI/CD

기술 목록은 절대적인 지원 범위로 확정하지 않고 실제 상담/계약 과정에서 적합성을 판단한다.

## 10. Service Package

| Package | 목적 | 주요 범위 |
|---|---|---|
| Engineering Maintenance | 기존 시스템 안정적 운영 | System Analysis, Bug Fix, Maintenance, Deployment, Monthly Report |
| Engineering Growth | 유지보수 + 지속적인 개발 | Maintenance, Feature Development, Refactoring, DevOps, QA |
| Dedicated Engineering | 외부 Engineering Team 구성 | Dedicated Team, Maintenance, New Development, Architecture, DevOps, QA |

추후 상세 정의가 필요한 항목:

- 팀 구성
- 개발자 수
- PM / Tech Lead 포함 여부
- QA / DevOps 포함 여부
- 최소 계약 기간
- 고객사 개발팀과의 역할 분담
- 응답 시간
- 업무 Capacity
- 장애 대응 범위

## 11. System Discovery

EaaS의 핵심 차별화 요소 중 하나.

계약 후 바로 요구사항만 처리하는 것이 아니라 먼저 기존 시스템을 파악한다.

분석 대상:

```text
Architecture
Technology Stack
Repository
Database
Infrastructure
Deployment / CI/CD
External API
Monitoring / Logging
Known Issues
Technical Debt
```

System Discovery 결과는 이후 Engineering 작업의 기준이 된다.

장기적으로 이를 Engineering Knowledge Base로 발전시킨다.

## 12. 운영 프로세스

```text
Request
   ↓
Triage
   ↓
Estimate
   ↓
Approval
   ↓
Development
   ↓
Code Review
   ↓
QA
   ↓
Deploy
   ↓
Report
```

고객 onboarding:

```text
Contract
   ↓
Repository Access
   ↓
Infrastructure / Account Information
   ↓
Database Information
   ↓
System Discovery
   ↓
Engineering Start
```

초기에는 이메일을 주요 커뮤니케이션 수단으로 사용한다.

## 13. 고객 커뮤니케이션

초기 MVP:

```text
Customer
   ↓
Email
   ↓
Engineering Team
```

운영 결과:

- 작업 현황
- Bug Fix
- Deployment
- 이슈
- 다음 작업
- 기술적 발견사항

등을 이메일로 전달한다.

향후 Customer Portal로 전환:

```text
Email
  ↓
Customer Portal
  ↓
Task
Deployment
History
Report
Question
```

## 14. Inquiry / Google Form

Google Form에서 수집할 항목:

- 회사명
- 담당자
- 이메일
- 연락처
- 개발팀 규모
- 서비스 소개
- 기술 스택
- 현재 가장 큰 개발 문제
- 희망 지원 형태
- 개발팀의 시간을 가장 많이 사용하는 업무
- Cloud / Infrastructure 환경
- 현재 개발 backlog
- 외부 개발 지원 여부
- 희망 시작 시점
- 선호 Package (선택)
- 기타

업무 유형 예:

```text
Maintenance
Bug Fix
Incident Response
New Feature Development
Operations
DevOps
QA
Other
```

이 데이터는 초기 영업뿐 아니라 향후 타깃 고객 검증에도 활용한다.

## 15. Analytics

Google Analytics 4 사용.

최소 이벤트:

```text
page_view
click_hero_cta
click_service
click_inquiry
click_email
click_phone
inquiry_start
inquiry_complete
```

핵심 Funnel:

```text
방문
 ↓
서비스 조회
 ↓
상담 버튼 클릭
 ↓
Google Form
 ↓
상담 신청
```

## 16. SEO

각 페이지에 다음 정보를 관리한다.

- title
- description
- canonical
- og:title
- og:description
- og:image

기본 파일:

```text
robots.txt
sitemap.xml
favicon
OG Image
```

## 17. Responsive Design

최소 3단계 기준:

```text
Desktop
1200px 이상

Tablet
768px ~ 1199px

Mobile
375px ~ 767px
```

주요 검증 해상도:

```text
375px
390px
430px
768px
1024px
1280px
1440px
```

Mobile-first를 기본으로 하되 Desktop 화면의 정보 구조도 충분히 고려한다.

## 18. Design System

초기부터 최소한의 디자인 토큰을 만든다.

```css
:root {
  --color-primary: ...;
  --color-secondary: ...;
  --color-text: ...;
  --color-muted: ...;
  --color-background: ...;

  --spacing-xs: ...;
  --spacing-sm: ...;
  --spacing-md: ...;
  --spacing-lg: ...;
  --spacing-xl: ...;

  --radius-sm: ...;
  --radius-md: ...;
  --radius-lg: ...;
}
```

공통 Component:

```text
BaseButton
BaseCard
SectionTitle
Badge
Input
```

## 19. 이미지 및 Static Asset

권장 포맷:

- SVG
- WebP
- AVIF

예:

```text
public/
└─ images/
   ├─ logo.svg
   ├─ hero.webp
   ├─ og-image.webp
   └─ ...
```

## 20. 환경변수

현재는 환경변수가 많지 않다.

```env
NUXT_PUBLIC_GA_ID=
NUXT_PUBLIC_SITE_URL=
```

원칙:

> Frontend에 Secret을 넣지 않는다.

현재 Backend가 없기 때문에 API Secret이나 AWS Secret 등을 브라우저에 노출해서는 안 된다.

## 21. package.json Script

```json
{
  "scripts": {
    "dev": "nuxt dev",
    "build": "nuxt build",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "lint": "eslint .",
    "typecheck": "nuxt typecheck"
  }
}
```

개발:

```bash
npm run dev
```

검증:

```bash
npm run lint
npm run typecheck
```

정적 생성:

```bash
npm run generate
```

결과:

```text
.output/public/
```

## 22. CI/CD

초기에는 AWS Amplify의 Git 연동을 사용한다.

```text
Developer
   ↓
git push
   ↓
GitHub
   ↓
AWS Amplify
   ↓
Build
   ↓
Deploy
```

초기에는 별도의 GitHub Actions 배포 파이프라인을 만들지 않아도 된다.

## 23. 현재 구현하지 않는 기능

```text
DB
Backend API
회원가입
로그인
Customer Portal
Admin Portal
AI Agent
자체 CMS
자체 문의 API
실시간 채팅
Jira 연동
GitHub 연동
AWS 계정 연동
고객별 시스템 분석 기능
```

실제 고객과 운영 데이터를 확보한 이후 단계적으로 개발한다.

## 24. 향후 확장 구조

### Phase 0 — Homepage

```text
Homepage
   ↓
Google Form
   ↓
상담
```

### Phase 1 — 실제 EaaS 운영

```text
Homepage
   ↓
상담
   ↓
Contract
   ↓
System Discovery
   ↓
Engineering Service
   ↓
Email Report
```

### Phase 2 — Customer Portal

```text
Homepage
   ↓
Customer Portal
   ↓
Backend
   ↓
Database
```

고객별 Task, Bug Fix, Deployment, History, Report, Question을 관리한다.

### Phase 3 — AI Intelligence

```text
Customer Portal
       ↓
Engineering Platform
       ↓
AI Agent
       ↓
Git
AWS
Issue
Logs
Deployment
```

기능:

- 자동 보고서
- 시스템 분석
- 고객 Q&A
- 이슈 분석

### Phase 4 — AI Engineering Agent

```text
Requirement
   ↓
Analysis
   ↓
Plan
   ↓
Code
   ↓
Test
   ↓
PR
   ↓
Human Review
   ↓
Deploy
```

### Phase 5 — Engineering Operating Platform

장기적으로 EaaS를 단순 외주 서비스가 아니라:

> Human Engineers + AI Agents + Engineering Platform

으로 발전시킨다.

## 25. 보안 원칙

- HTTPS
- 최소 권한
- 고객별 데이터 분리
- Repository 접근 권한 관리
- AWS IAM 최소 권한
- Secret의 frontend 노출 금지
- 개인정보 최소 수집
- 고객 시스템 접근 정보 별도 관리

향후 실제 고객 시스템에 접근할 때는 고객별 권한 분리, IAM Role, OAuth/API Token, 최소 권한, 접근 기록, Repository 권한 관리 등을 구체화한다.

## 26. 개발 우선순위

### 1단계

```text
Nuxt 4
Vue 3
TypeScript
Tailwind CSS
ESLint
GitHub
```

### 2단계

```text
Header
Footer
Button
Card
SectionTitle
```

### 3단계

```text
Hero
Pain Point
Service
Target
Package
Process
System Discovery
Security
FAQ
CTA
```

### 4단계

```text
/services
/services/maintenance
/services/growth
/services/dedicated
/process
/inquiry
/faq
```

### 5단계

```text
SEO
OG Image
Sitemap
Robots
GA4
```

### 6단계

```text
GitHub
   ↓
AWS Amplify
   ↓
Custom Domain
   ↓
HTTPS
```

### 7단계

- Desktop
- Tablet
- Mobile
- 주요 Browser
- SEO
- Lighthouse
- 문의 Form
- Analytics
- 도메인
- HTTPS

## 27. MVP 핵심 개발 원칙

홈페이지의 기술적 완성도보다 다음을 우선한다.

```text
고객 문제 이해
       ↓
EaaS 가치 전달
       ↓
서비스 패키지 이해
       ↓
운영 방식에 대한 신뢰
       ↓
상담 신청
```

핵심 목표:

> EaaS가 무엇인지 이해하고, 우리 회사의 개발 문제를 해결할 수 있는 서비스라고 판단한 기업이 상담을 신청하도록 만드는 것.

## 28. 다음 개발 단계

기술 인프라는 다음과 같이 확정하는 것을 권장한다.

```text
Nuxt 4
+
Vue 3
+
TypeScript
+
Tailwind CSS
+
GitHub
+
AWS Amplify Hosting
+
Google Form
+
GA4
```

그리고 다음 작업은 코딩보다 먼저 아래 순서로 진행한다.

```text
1. Sitemap 확정
2. Main Page Section 확정
3. 각 Section의 실제 콘텐츠 확정
4. Page별 Component 정의
5. Responsive UI 기준 정의
6. SEO Metadata 정의
7. 프로젝트 생성
8. 개발
9. Amplify 배포
```

특히 가장 먼저 확정해야 할 것은 **메인 `/` 페이지의 실제 화면 구성과 콘텐츠**다.
