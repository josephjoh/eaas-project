# EaaS Homepage

EaaS(Engineering as a Service) 홈페이지 MVP. 스펙: [`docs/eaas_homepage_development_spec_v1.0.md`](docs/eaas_homepage_development_spec_v1.0.md)

- 정적 사이트 (Nuxt 4 SSG) — DB / Backend / 서버 없음
- 상담 신청은 Google Form, 분석은 GA4
- AWS Amplify Hosting으로 배포

## 기술 스택

Nuxt 4 · Vue 3 · TypeScript · Tailwind CSS v4 · ESLint (`@nuxt/eslint`) · GA4 · Google Forms · AWS Amplify

## 시작하기

```bash
npm install
cp .env.example .env   # 값 채우기
npm run dev            # http://localhost:3000
```

| Script | 설명 |
|---|---|
| `npm run dev` | 개발 서버 |
| `npm run lint` / `lint:fix` | ESLint |
| `npm run typecheck` | 타입 검사 (vue-tsc) |
| `npm run generate` | 정적 생성 → `.output/public/` |
| `npx serve .output/public` | 생성 결과 로컬 확인 |

## 환경변수

모두 `NUXT_PUBLIC_*` 이며 **빌드 결과(브라우저)에 그대로 노출**된다. Secret은 절대 넣지 않는다.
정적 생성이므로 값은 `npm run generate` 시점에 반영된다 (Amplify 콘솔의 환경변수로 설정).

| 변수 | 용도 |
|---|---|
| `NUXT_PUBLIC_SITE_URL` | 운영 도메인. canonical, og:url, `sitemap.xml`, `robots.txt`에 사용 |
| `NUXT_PUBLIC_GA_ID` | GA4 측정 ID. 비어 있으면 GA 미로드 |
| `NUXT_PUBLIC_INQUIRY_FORM_URL` | 상담 신청 Google Form URL. 기본값은 `nuxt.config.ts`에 설정됨 (다른 Form으로 바꿀 때만 지정) |
| `NUXT_PUBLIC_CONTACT_EMAIL` | 문의 이메일 (비어 있으면 미표시) |
| `NUXT_PUBLIC_CONTACT_PHONE` | 문의 전화 (비어 있으면 미표시) |

## 프로젝트 구조

```text
app/
├─ assets/css/        main.css(Tailwind 진입점) · variables.css(디자인 토큰) · reset.css
├─ components/
│  ├─ common/         AppHeader, AppFooter, BaseButton, BaseCard, BaseBadge, BaseIcon,
│  │                  SectionTitle, PageHero, CtaBanner, FaqList, FlowSteps, LegalDocument
│  ├─ home/           메인 페이지 섹션 (Hero ~ FAQ)
│  ├─ services/       PackageCard, ServicePackageDetail
│  └─ inquiry/        InquiryForm (Google Form 임베드)
├─ composables/       usePageSeo, useAnalytics
├─ data/              화면 콘텐츠 (site, services, packages, process, faq, home)
├─ layouts/default.vue
├─ pages/             / · /services(/maintenance|growth|dedicated) · /process · /inquiry · /faq · /privacy · /terms
├─ plugins/gtag.client.ts
└─ error.vue          404 / 오류 페이지
server/routes/        sitemap.xml, robots.txt (generate 시 정적 파일로 prerender)
public/               favicon.svg, images/(logo.svg, og-image.png, og-image.svg)
```

- 컴포넌트는 폴더 prefix 없이 자동 import된다 (`nuxt.config.ts`의 `components.pathPrefix: false`).
- **문구 수정은 대부분 `app/data/*.ts`에서** 한다.
- 디자인 토큰은 `variables.css`의 `@theme`에 정의되어 CSS 변수와 Tailwind 유틸리티(`bg-primary`, `text-muted` 등)로 함께 쓰인다.
- Breakpoint: Mobile `< 768px` / Tablet `md: 768px` / Desktop `lg: 1200px`.
- OG 이미지는 `og-image.svg`가 원본이며, 수정 시 1200×630 PNG로 다시 내보낸다.

## Analytics (GA4)

`useAnalytics().track(event, params)` 로 전송한다. page_view는 플러그인이 라우트 이동마다 자동 전송한다.

| 이벤트 | 발생 위치 |
|---|---|
| `page_view` | 모든 페이지 진입 |
| `click_hero_cta` | Hero 버튼 (`cta`: inquiry / services) |
| `click_service` | Package 카드·푸터의 서비스 링크 (`service`, `location`) |
| `click_inquiry` | 상담 신청 버튼 전체 (`location`) |
| `click_email` / `click_phone` | 이메일·전화 링크 (`location`) |
| `inquiry_start` | Google Form에 포커스 또는 "새 창에서 작성" 클릭 |
| `inquiry_complete` | Google Form 제출 (iframe 두 번째 load로 추정) |

> `inquiry_complete`는 iframe 재로드로 제출을 추정한다. **Google Form은 섹션(페이지) 없이 한 페이지로 구성**해야 정확하다.
> 최종 신청 건수의 기준은 Google Sheet 응답 수로 삼는다.

## 배포 (AWS Amplify Hosting)

1. GitHub 저장소 생성 후 push
2. Amplify 콘솔 → *Deploy an app* → GitHub 저장소/브랜치 연결
3. 빌드 설정은 저장소의 `amplify.yml` 사용 (`npm run generate` → `.output/public`)
   - 앱이 SSR(Compute)로 감지되면 플랫폼을 정적 호스팅(`WEB`)으로 설정한다.
4. 환경변수 등록 (`NUXT_PUBLIC_SITE_URL` 등)
5. *Rewrites and redirects*에 404 규칙 추가: `/<*>` → `/404.html` (type: `404 (Rewrite)`)
6. Custom domain 연결 (Route 53 또는 기존 DNS) — HTTPS 인증서는 Amplify가 관리

## 런칭 전 체크리스트

- [ ] `privacy.vue`, `terms.vue`의 `[ ]` 항목(회사명, 시행일, 보유기간, 책임자) 교체 및 법률 검토
- [x] Google Form 생성 및 연결 (`nuxt.config.ts` → `runtimeConfig.public.inquiryFormUrl`)
- [ ] GA4 속성 생성 → `NUXT_PUBLIC_GA_ID`
- [ ] 운영 도메인 확정 → `NUXT_PUBLIC_SITE_URL`
- [ ] 문의 이메일/전화 → `NUXT_PUBLIC_CONTACT_*`
- [ ] 메인 페이지 실제 콘텐츠 최종 확정 (`app/data/*.ts`)
- [ ] 해상도별 확인 (375 / 390 / 430 / 768 / 1024 / 1280 / 1440px), Lighthouse
