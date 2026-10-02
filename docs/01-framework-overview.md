# 1. 프레임워크 개요

## 1.1 한 줄 요약

**Nuxt 4로 작성한 Vue 페이지를 빌드 시점에 모두 HTML로 미리 만들어(SSG) AWS Amplify의 CDN에 올리는 정적 사이트**다.
운영 중인 서버, DB, Backend API는 없다. 상담 신청은 Google Form, 방문 분석은 GA4가 담당한다.

```text
[개발]  Vue 컴포넌트 + TypeScript + Tailwind CSS
          │  npm run generate (Nuxt 4 / Vite / Nitro)
          ▼
[산출물] .output/public/  ← HTML · JS · CSS · sitemap.xml · robots.txt
          │  git push → AWS Amplify 자동 빌드
          ▼
[운영]  Amplify Hosting (CloudFront CDN + HTTPS)
          │
          ├─ 상담 신청 → Google Form (iframe) → Google Sheet
          └─ 방문 분석 → Google Analytics 4
```

## 1.2 기술 스택

| 영역 | 기술 | 버전 | 이 프로젝트에서의 역할 |
|---|---|---|---|
| Framework | Nuxt | 4.5 | 라우팅, 렌더링(SSG), 자동 import, SEO head 관리, 빌드 |
| UI | Vue | 3.5 | 컴포넌트 작성 (`<script setup>` + Composition API) |
| Language | TypeScript | 5.9 | 전체 코드 타입 검사 (`strict: true`) |
| Build | Vite | Nuxt 내장 | 개발 서버(HMR), 클라이언트 번들링 |
| Server engine | Nitro | Nuxt 내장 | 빌드 시 prerender 수행 (운영 서버로는 쓰지 않음) |
| CSS | Tailwind CSS | 4.3 | 유틸리티 클래스 스타일링, 디자인 토큰 |
| Lint | ESLint + `@nuxt/eslint` | 10 / 1.17 | 코드 규칙 + 코드 스타일(stylistic) 통일 |
| Type check | vue-tsc | 3.3 | `.vue` 파일까지 포함한 타입 검사 |
| Analytics | Google Analytics 4 | - | page_view 및 전환 이벤트 수집 |
| Inquiry | Google Forms / Sheets | - | 상담 신청 접수·저장 |
| Hosting | AWS Amplify Hosting | - | Git 연동 자동 빌드·배포, CDN, HTTPS |
| Font | Pretendard (CDN) | 1.3.9 | 한글 웹폰트 |

> TypeScript는 7.x가 아닌 5.9를 사용한다. 7.x는 Go 기반으로 새로 구현된 버전이라 vue-tsc 호환성이 검증되지 않았기 때문이다.

## 1.3 렌더링 방식: SSG (Static Site Generation)

Nuxt는 SPA, SSR, SSG 방식을 모두 지원한다. 이 프로젝트는 **SSG**를 쓴다.

| 방식 | 동작 | 이 프로젝트 |
|---|---|---|
| SPA | 빈 HTML + JS가 브라우저에서 화면 생성 | ✗ (SEO 불리) |
| SSR | 요청마다 서버가 HTML 생성 | ✗ (서버 운영 필요) |
| **SSG** | **빌드 시 모든 페이지 HTML을 미리 생성** | **✔** |

`npm run generate`를 실행하면 다음 순서로 진행된다.

1. **Vite 빌드**: Vue 컴포넌트, CSS, TS를 번들링해 `_nuxt/*.js`, `*.css`를 만든다.
2. **Nitro prerender**: 내부 렌더러를 띄우고 `/`부터 시작해 페이지 안의 링크를 따라가며(`crawlLinks: true`) 모든 페이지를 HTML로 저장한다.
   `/sitemap.xml`, `/robots.txt`도 prerender 대상에 명시되어 정적 파일로 만들어진다.
3. **산출물**: `.output/public/` 아래에 페이지별 `index.html`, `_payload.json`, `200.html`, `404.html`이 생긴다.

브라우저는 먼저 완성된 HTML을 받아 바로 화면을 그린다(SEO 유리). 그 뒤 JS가 로드되면 Vue가 **hydration**(정적 HTML에 이벤트와 상태를 연결하는 과정)을 수행한다. 이후 페이지 이동은 SPA처럼 새로고침 없이 동작한다.

> **주의**: 빌드 시점에 HTML이 확정되므로, 환경변수(`NUXT_PUBLIC_*`)를 바꾸면 **다시 빌드해야** 반영된다.

## 1.4 Nuxt 핵심 개념

### 파일 기반 라우팅
`app/pages/` 아래 파일 경로가 곧 URL이다. 라우터 설정 파일은 없다.

```text
app/pages/index.vue               →  /
app/pages/services/index.vue      →  /services
app/pages/services/growth.vue     →  /services/growth
app/pages/faq.vue                 →  /faq
```

### 자동 import (Auto-imports)
다음 항목은 `import` 문 없이 바로 쓸 수 있다.

| 대상 | 예 |
|---|---|
| Vue API | `ref`, `computed`, `watch`, `onMounted` |
| Nuxt API | `useRoute`, `useRuntimeConfig`, `useHead`, `useSeoMeta`, `defineNuxtPlugin` |
| `app/composables/` | `usePageSeo`, `useAnalytics` |
| `app/components/` | `<BaseButton>`, `<HeroSection>` 등 모든 컴포넌트 |

컴포넌트는 `nuxt.config.ts`의 `components: [{ path: '~/components', pathPrefix: false }]` 설정 때문에 **폴더명 prefix 없이 파일명 그대로** 쓴다.
예를 들어 `components/common/AppHeader.vue`는 `<AppHeader />`로 쓴다(기본값이면 `<CommonAppHeader />`). 따라서 **컴포넌트 파일명은 폴더가 달라도 겹치면 안 된다.**

`app/data/*.ts`는 자동 import 대상이 아니므로 `import { faqItems } from '~/data/faq'`처럼 직접 import한다.

### 경로 별칭
| 별칭 | 가리키는 곳 |
|---|---|
| `~/` | `app/` |
| `~~/` | 프로젝트 루트 |
| `#app` | Nuxt 런타임 타입 (예: `NuxtError`) |

### 레이아웃 · 앱 셸
- `app/app.vue`: 최상위 컴포넌트. `<NuxtLayout>` 안에 `<NuxtPage>`(현재 라우트의 페이지)를 렌더링한다.
- `app/layouts/default.vue`: 모든 페이지 공통 틀(Header / main / Footer).
- `app/error.vue`: 404 등 오류 화면. SSG에서는 `404.html`로 생성된다.

### runtimeConfig (환경변수)
`nuxt.config.ts`의 `runtimeConfig.public`에 선언한 키는 같은 이름의 `NUXT_PUBLIC_*` 환경변수로 덮어쓸 수 있다.

```ts
runtimeConfig: { public: { siteUrl: 'http://localhost:3000', gaId: '' } }
// NUXT_PUBLIC_SITE_URL, NUXT_PUBLIC_GA_ID 로 덮어씀 (camelCase → SNAKE_CASE)
```

코드에서는 `useRuntimeConfig().public.siteUrl`로 읽는다. `public` 값은 브라우저에 그대로 노출되므로 **Secret을 절대 넣지 않는다.**

### 플러그인
`app/plugins/*.ts`는 앱이 시작할 때 실행된다. 파일명에 `.client`가 붙으면 브라우저에서만 실행된다(`gtag.client.ts`).

### server/ 디렉터리
`server/routes/`의 파일은 Nitro 서버 라우트다. 이 프로젝트는 운영 서버가 없으므로 **빌드 시 prerender되어 정적 파일을 만드는 용도로만** 쓴다(`sitemap.xml`, `robots.txt`).
API 엔드포인트를 추가해도 정적 호스팅에서는 동작하지 않는다.

### SEO / Head
`useSeoMeta()`, `useHead()`로 페이지별 `<title>`, `<meta>`, `<link>`를 선언하면 prerender 결과 HTML에 포함된다. 이 프로젝트는 이를 감싼 `usePageSeo()`를 쓴다.

## 1.5 Vue 3 작성 규칙

모든 컴포넌트는 `<script setup lang="ts">` + Composition API로 작성한다.

```vue
<script setup lang="ts">
const props = withDefaults(defineProps<{
  variant?: 'primary' | 'outline'
}>(), { variant: 'primary' })

const isOpen = ref(false)
const classes = computed(() => props.variant === 'primary' ? 'bg-primary' : 'border')
</script>

<template>
  <button :class="classes" @click="isOpen = !isOpen">
    <slot />
  </button>
</template>
```

- props는 타입 기반 `defineProps<{...}>()`로 선언하고, 기본값은 `withDefaults`로 준다.
- 루트 요소가 하나인 컴포넌트는 부모가 넘긴 `class`, `@click` 등이 자동으로 루트에 붙는다(attribute fallthrough). `BaseButton`의 클릭 추적은 이 동작을 활용한다.

## 1.6 Tailwind CSS v4

Tailwind v4는 `tailwind.config.js`를 쓰지 않는다. **CSS 파일 안에서 설정한다.**

- 진입점: `app/assets/css/main.css`의 `@import 'tailwindcss';`
- Vite 플러그인(`@tailwindcss/vite`)이 프로젝트 파일을 자동 스캔해, 실제로 쓴 클래스만 CSS로 생성한다.
- **디자인 토큰**은 `variables.css`의 `@theme { ... }`에 정의한다. `@theme`에 쓴 변수는 두 가지로 동시에 쓸 수 있다.
  1. CSS 변수: `var(--color-primary)`
  2. Tailwind 유틸리티: `bg-primary`, `text-primary`, `border-primary/30`, `rounded-md`
- 사용자 정의 유틸리티는 `@utility`로 만든다(`container-page`, `section-y`).
- v4 문법 참고
  - important: 클래스 뒤에 `!` → `text-primary!`, `max-w-3xl!`
  - CSS 변수 값: `h-(--header-height)`
  - 투명도: `bg-primary/20`

### 반응형 기준 (스펙 17장)

| 구간 | 폭 | Tailwind prefix |
|---|---|---|
| Mobile | ~767px | (prefix 없음, 기본) |
| Tablet | 768px~1199px | `md:` |
| Desktop | 1200px~ | `lg:` |

`lg`는 Tailwind 기본값(1024px)이 아니라 **1200px로 재정의**되어 있다(`--breakpoint-lg: 75rem`). `sm:`(640px), `xl:`(1280px)은 기본값 그대로다.
Mobile-first이므로 prefix 없는 클래스가 모바일 스타일이고, `md:`/`lg:`로 큰 화면 스타일을 덧붙인다.

## 1.7 코드 품질 도구

| 명령 | 도구 | 검사 내용 |
|---|---|---|
| `npm run lint` | ESLint (`@nuxt/eslint`) | Vue/TS 규칙 + stylistic(세미콜론 없음, 작은따옴표, 2칸 들여쓰기, trailing comma 등) |
| `npm run lint:fix` | ESLint | 자동 수정 가능한 항목 수정 |
| `npm run typecheck` | vue-tsc | `.vue` 포함 전체 타입 검사 |

ESLint 설정은 `nuxt prepare` 때 `.nuxt/eslint.config.mjs`로 생성되고, 루트 `eslint.config.mjs`가 이를 불러온다. `npm install`의 `postinstall`에서 `nuxt prepare`가 자동 실행된다.

## 1.8 외부 서비스 연동

### Google Form (상담 신청)
- `/inquiry` 페이지의 `InquiryForm` 컴포넌트가 Form URL에 `embedded=true`를 붙여 iframe으로 삽입한다.
- 응답은 Google Sheet에 저장된다. 사이트는 응답 데이터에 접근하지 않는다.
- Form URL 기본값은 `nuxt.config.ts`의 `runtimeConfig.public.inquiryFormUrl`에 있다.

### Google Analytics 4
- `NUXT_PUBLIC_GA_ID`가 있을 때만 `gtag.client.ts` 플러그인이 gtag.js를 로드한다.
- 클라이언트 라우팅마다 `page_view`를 직접 보낸다(자동 전송 off).
- 전환 이벤트는 `useAnalytics().track()`으로 보낸다. 이벤트 목록은 [개발 가이드](04-development-guide.md#44-ga4-이벤트-추가)를 참고한다.

## 1.9 배포: AWS Amplify Hosting

```text
git push (main) → Amplify가 변경 감지 → amplify.yml 실행
  preBuild: nvm use 22 → npm ci
  build:    npm run generate
  artifacts: .output/public/** → CDN 배포 (HTTPS 자동)
```

- 환경변수는 Amplify 콘솔에 등록한다(빌드 시점에 반영).
- 404 처리를 위해 Amplify Rewrites에 `/<*>` → `/404.html` (404 Rewrite) 규칙이 필요하다.
- 서버를 운영하지 않으므로 EC2, Nginx, OS 관리가 없다(스펙 4장).

## 1.10 확장 방향

현재는 정적 사이트(Phase 0)다. 이후 스펙 24장 로드맵에 따라 Customer Portal, Backend, DB가 추가될 수 있다.

- 페이지, 콘텐츠, 컴포넌트가 분리되어 있어 Portal을 별도 앱으로 만들거나 Nuxt SSR로 전환하기 쉽다.
- 서버 기능이 필요해지면 Amplify SSR(Compute)이나 별도 Backend를 도입해야 한다. 이때 `server/` 디렉터리와 Nitro를 그대로 활용할 수 있다.
