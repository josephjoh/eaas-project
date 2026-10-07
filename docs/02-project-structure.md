# 2. 프로젝트 구조

## 2.1 전체 트리

```text
eaas-project/
├─ app/                          # 애플리케이션 소스 (Nuxt 4 srcDir, 별칭 ~/)
│  ├─ app.vue                    # 최상위 컴포넌트 (NuxtLayout + NuxtPage)
│  ├─ error.vue                  # 404 / 오류 페이지
│  ├─ assets/css/
│  │  ├─ main.css                # Tailwind 진입점, 공통 유틸리티
│  │  ├─ variables.css           # 디자인 토큰 (@theme, :root)
│  │  └─ reset.css               # 기본 스타일 보정
│  ├─ components/
│  │  ├─ common/                 # 공통 UI · 레이아웃 컴포넌트
│  │  ├─ home/                   # 메인 페이지 섹션
│  │  ├─ services/               # 서비스(Package) 관련
│  │  └─ inquiry/                # 상담 신청
│  ├─ composables/               # 재사용 로직 (자동 import)
│  │  ├─ usePageSeo.ts
│  │  └─ useAnalytics.ts
│  ├─ data/                      # 화면 콘텐츠 (문구·목록)
│  │  ├─ site.ts  services.ts  packages.ts  process.ts  faq.ts  home.ts
│  ├─ layouts/default.vue        # 공통 레이아웃 (Header / main / Footer)
│  ├─ pages/                     # 파일 기반 라우팅
│  ├─ plugins/gtag.client.ts     # GA4 로더 (브라우저 전용)
│  └─ types/gtag.d.ts            # window.gtag 전역 타입
├─ server/routes/                # 빌드 시 prerender되는 정적 파일 생성기
│  ├─ sitemap.xml.ts
│  └─ robots.txt.ts
├─ public/                       # 그대로 복사되는 정적 파일 (URL 루트)
│  ├─ favicon.svg
│  └─ images/  logo.svg · og-image.png · og-image.svg
├─ docs/                         # 문서 (이 폴더)
├─ nuxt.config.ts                # Nuxt 설정
├─ amplify.yml                   # AWS Amplify 빌드 설정
├─ eslint.config.mjs  tsconfig.json  package.json
├─ .env.example  .nvmrc  .gitignore  .gitattributes
└─ README.md
```

자동 생성되어 Git에 올리지 않는 디렉터리:

| 경로 | 생성 시점 | 내용 |
|---|---|---|
| `node_modules/` | `npm install` | 의존성 |
| `.nuxt/` | `nuxt prepare` / `dev` / `build` | 자동 생성 타입, tsconfig, ESLint 설정 |
| `.output/` | `npm run generate` | 배포 산출물 (`.output/public/`) |

## 2.2 설정 파일

| 파일 | 역할 |
|---|---|
| `nuxt.config.ts` | 모듈(`@nuxt/eslint`), 컴포넌트 자동 import 규칙, 기본 `<head>`(lang, favicon, 폰트), 전역 CSS, `runtimeConfig`, prerender 대상, Vite 플러그인(Tailwind), TS strict |
| `package.json` | 의존성과 npm 스크립트 (`dev`, `generate`, `lint`, `typecheck` 등). `postinstall`에서 `nuxt prepare` 실행 |
| `tsconfig.json` | `.nuxt/`가 생성한 tsconfig들(app/server/shared/node)을 참조만 함 |
| `eslint.config.mjs` | `.nuxt/eslint.config.mjs`(Nuxt 규칙 + stylistic)를 불러옴 |
| `amplify.yml` | Amplify 빌드 단계: Node 22 → `npm ci` → `npm run generate` → `.output/public` 배포 |
| `.env.example` | 환경변수 템플릿. 복사해 `.env`로 사용 (`.env`는 Git 제외) |
| `.nvmrc` | 권장 Node 버전 (22) |
| `.gitattributes` | 저장소 줄바꿈을 LF로 통일, 이미지 binary 처리 |

## 2.3 `app/` 상세

### pages — 라우트

| 파일 | URL | 구성 |
|---|---|---|
| `index.vue` | `/` | Hero → Pain → Service → Target → WhatWeDo → Package → Process → SystemDiscovery → WhyEaaS → Security → FAQ(5개) → CTA |
| `services/index.vue` | `/services` | PageHero, PackageCard ×3, 협의 항목, WhatWeDoSection, CtaBanner |
| `services/maintenance.vue` | `/services/maintenance` | `ServicePackageDetail` (maintenance) |
| `services/growth.vue` | `/services/growth` | `ServicePackageDetail` (growth) |
| `services/dedicated.vue` | `/services/dedicated` | `ServicePackageDetail` (dedicated) |
| `process.vue` | `/process` | 9단계 타임라인, 온보딩·운영 흐름(FlowSteps), 커뮤니케이션, CtaBanner |
| `inquiry.vue` | `/inquiry` | 안내 사이드바 + `InquiryForm` (Google Form) |
| `faq.vue` | `/faq` | FaqList(전체) + FAQPage JSON-LD + CtaBanner |
| `privacy.vue` | `/privacy` | 개인정보처리방침 (`LegalDocument`) |
| `terms.vue` | `/terms` | 이용약관 (`LegalDocument`) |

모든 페이지는 상단 `<script setup>`에서 `usePageSeo()`를 호출해 SEO 메타를 설정한다.

### components — 컴포넌트
상세 설명은 [컴포넌트 레퍼런스](03-components.md)를 참고한다.

| 폴더 | 성격 | 컴포넌트 |
|---|---|---|
| `common/` | 레이아웃 | AppHeader, AppFooter |
| | 기본 UI | BaseButton, BaseCard, BaseBadge, BaseIcon |
| | 복합 UI | SectionTitle, PageHero, CtaBanner, FaqList, FlowSteps, LegalDocument |
| `home/` | 메인 섹션 | HeroSection, PainPointSection, ServiceSection, TargetSection, WhatWeDoSection, PackageSection, ProcessSection, SystemDiscoverySection, WhyEaasSection, SecuritySection, FaqSection |
| `services/` | 서비스 | PackageCard, ServicePackageDetail |
| `inquiry/` | 상담 | InquiryForm |

### data — 콘텐츠
화면 문구와 목록은 컴포넌트가 아니라 `data/`에 둔다. **문구 수정은 대부분 이 폴더에서 끝난다.**

| 파일 | export | 사용처 |
|---|---|---|
| `site.ts` | `siteConfig`(이름·설명), `companyInfo`(상호·사업자등록번호), `mainNav`, `legalNav` | Header, Footer, 메인 SEO |
| `services.ts` | `engineeringServices` (What We Do 10개) | WhatWeDoSection |
| `packages.ts` | `servicePackages`, `getPackage(slug)`, `packageConsultationItems`, 타입 `ServicePackage`·`PackageSlug` | PackageSection, PackageCard, 서비스 페이지, Footer |
| `process.ts` | `engagementSteps`(9단계), `onboardingSteps`, `operationSteps`, `reportItems` | ProcessSection, `/process` |
| `faq.ts` | `faqItems` (10개) | 메인 FAQ(앞 5개), `/faq` |
| `home.ts` | `painPoints`, `definitionPoints`, `targetProfile`, `techStacks`, `discoveryTargets`, `discoveryOutcomes`, `whyComparisons`, `securityPrinciples` | 메인 섹션들 |

### composables — 재사용 로직

| 파일 | 함수 | 설명 |
|---|---|---|
| `usePageSeo.ts` | `usePageSeo({ title, description, rawTitle?, image? })` | title(`"{title} \| EaaS"`), description, canonical, og:\*, twitter:\* 설정. canonical·og:url은 `siteUrl + 현재 경로`로 만든다 |
| `useAnalytics.ts` | `useAnalytics().track(event, params?)` | GA4 이벤트 전송. GA 미설정이거나 서버 렌더링 중이면 아무것도 하지 않음. 이벤트 이름은 `AnalyticsEvent` 타입으로 제한 |

### plugins / types

| 파일 | 설명 |
|---|---|
| `plugins/gtag.client.ts` | `gaId`가 있으면 gtag.js 로드, `send_page_view: false`로 초기화, `app:suspense:resolve`·`page:finish` 훅에서 page_view 전송(중복 경로는 무시) |
| `types/gtag.d.ts` | `window.dataLayer`, `window.gtag` 전역 타입 선언 |

### assets/css — 스타일

| 파일 | 내용 |
|---|---|
| `main.css` | `@import 'tailwindcss'` → variables → reset 순으로 불러온다. `@utility container-page`(최대 1200px 컨테이너, 좌우 여백), `@utility section-y`(섹션 상하 여백) |
| `variables.css` | `@theme`: 폰트, 색상, radius, breakpoint(md 768 / lg 1200). `:root`: spacing(xs~xl), `--layout-max-width`, `--header-height` |
| `reset.css` | smooth scroll, `word-break: keep-all`(한글 줄바꿈), focus-visible outline, reduced-motion 대응 |

#### 디자인 토큰

| 토큰 | 값 | 용도 |
|---|---|---|
| `primary` / `primary-dark` / `primary-soft` | `#2459e0` / `#1b45b3` / `#eaf0ff` | 주요 버튼, 강조, 연한 배경 |
| `secondary` / `secondary-light` | `#0c1a36` / `#16284d` | 네이비 배경(Hero, Discovery, CTA) |
| `accent` / `accent-dark` | `#12b3a0` / `#0b7d70` | 체크 아이콘, 강조 포인트 (밝은 배경의 작은 글씨는 `accent-dark`) |
| `text` / `muted` | `#0f172a` / `#5b6577` | 본문 / 보조 텍스트 |
| `background` / `surface` / `border` | `#fff` / `#f5f7fb` / `#e2e8f0` | 배경 / 구분 섹션 배경 / 테두리 |
| `radius-sm/md/lg` | 0.375 / 0.75 / 1.25rem | 모서리 |
| `--spacing-xs~xl` | 0.5 / 0.75 / 1.25 / 2 / 3rem | 컨테이너 여백 등 (CSS 변수로만 사용) |

## 2.4 server / public

| 경로 | 설명 |
|---|---|
| `server/routes/sitemap.xml.ts` | 10개 페이지의 `<loc>`, `<priority>`를 `NUXT_PUBLIC_SITE_URL` 기준으로 생성. **페이지를 추가하면 여기 목록에도 추가해야 한다** |
| `server/routes/robots.txt.ts` | 전체 허용 + Sitemap 경로 |
| `public/favicon.svg` | 파비콘 |
| `public/images/logo.svg` | Header·Footer 로고 |
| `public/images/og-image.png` | SNS 공유 이미지 (1200×630). 원본은 `og-image.svg` |

`public/` 파일은 URL 루트에 그대로 서빙된다 (`public/images/logo.svg` → `/images/logo.svg`).

## 2.5 데이터 흐름

```text
app/data/*.ts  ──import──▶  섹션/페이지 컴포넌트  ──props──▶  공통 컴포넌트(Base*, SectionTitle…)
                                   │
                                   ├─ usePageSeo()   → <head> 메타 (prerender 시 HTML에 포함)
                                   └─ useAnalytics() → window.gtag (브라우저에서만)

nuxt.config.ts runtimeConfig.public  ◀── NUXT_PUBLIC_* (빌드 시점)
        │
        └─ useRuntimeConfig().public → siteUrl, gaId, inquiryFormUrl, contactEmail, contactPhone
```

## 2.6 환경변수

| 변수 | 기본값 | 사용처 |
|---|---|---|
| `NUXT_PUBLIC_SITE_URL` | `http://localhost:3000` | canonical, og:url/og:image, sitemap, robots |
| `NUXT_PUBLIC_GA_ID` | (없음) | GA4 로드 여부 |
| `NUXT_PUBLIC_INQUIRY_FORM_URL` | 연결된 Google Form URL | InquiryForm |
| `NUXT_PUBLIC_CONTACT_EMAIL` | `soluconlab@gmail.com` | Footer, CtaBanner, inquiry 페이지 (비어 있으면 숨김) |
| `NUXT_PUBLIC_CONTACT_PHONE` | (없음) | Footer, inquiry 페이지 (비어 있으면 숨김) |

> 빈 값으로 설정한 환경변수도 기본값을 덮어쓴다. 기본값을 쓰려면 변수를 **아예 정의하지 않는다.**
