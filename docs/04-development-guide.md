# 4. 개발 가이드

작업 유형별로 무엇을 어디서 고치는지 정리한다.

## 4.1 개발 환경

```bash
# Node 22 이상 권장 (.nvmrc), Nuxt 4 최소 요구: 20.19
npm install          # postinstall에서 nuxt prepare 자동 실행
npm run dev          # http://localhost:3000 (HMR)
```

로컬에서 환경변수가 필요하면 `.env.example`을 `.env`로 복사해 필요한 값만 채운다.
`.env`의 **빈 값도 기본값을 덮어쓰므로**, 쓰지 않는 항목은 줄 자체를 지우거나 주석 처리한다.

## 4.2 문구·콘텐츠 수정

대부분 `app/data/`에서 수정한다. 컴포넌트는 고칠 필요가 없다.

| 바꾸려는 것 | 파일 |
|---|---|
| 사이트 이름, 기본 설명, 메뉴 | `data/site.ts` |
| Hero 헤드라인·CTA·구조도 | `components/home/HeroSection.vue` |
| 고객 고민, EaaS 정의, 타깃, 기술 스택, 비교표, 보안 원칙, Discovery 항목 | `data/home.ts` |
| What We Do 업무 목록 | `data/services.ts` |
| Package 이름·설명·범위·적합 기업, 협의 항목 | `data/packages.ts` |
| 진행 단계, 온보딩·운영 흐름, 리포트 항목 | `data/process.ts` |
| FAQ | `data/faq.ts` (메인에는 앞 5개가 표시됨) |
| 섹션 제목·설명 | 각 섹션 컴포넌트의 `<SectionTitle>` props |
| 개인정보처리방침, 이용약관 | `pages/privacy.vue`, `pages/terms.vue` |
| 페이지 SEO title·description | 각 페이지의 `usePageSeo({...})` |

제목에 줄바꿈이 필요하면 `:title="'첫 줄\n둘째 줄'"`처럼 **JS 문자열로 바인딩**한다(`title="...\n..."`는 줄바꿈이 되지 않는다).

## 4.3 새 페이지 추가

예: `/about` 추가

1. **페이지 파일 생성**: `app/pages/about.vue`

   ```vue
   <script setup lang="ts">
   usePageSeo({
     title: '회사 소개',
     description: '페이지 설명 (검색 결과·SNS 공유에 표시, 80~120자 권장)',
   })
   </script>

   <template>
     <div>
       <PageHero eyebrow="About" title="회사 소개" description="..." />
       <section class="section-y">
         <div class="container-page">
           <!-- 본문 -->
         </div>
       </section>
       <CtaBanner location="about" />
     </div>
   </template>
   ```

   > 페이지 템플릿은 **루트 요소를 하나**(`<div>`)로 감싼다.

2. **메뉴 노출**(필요하면): `data/site.ts`의 `mainNav`에 `{ label: '회사 소개', to: '/about' }` 추가
3. **sitemap 등록**: `server/routes/sitemap.xml.ts`의 `pages` 배열에 추가
4. **prerender 확인**: 다른 페이지에서 링크로 연결되어 있으면 자동으로 크롤링되어 생성된다. 어디에서도 링크하지 않는 페이지는 `nuxt.config.ts`의 `nitro.prerender.routes`에 직접 추가한다.

## 4.4 GA4 이벤트 추가

현재 정의된 이벤트:

| 이벤트 | 파라미터 | 발생 |
|---|---|---|
| `page_view` | `page_path`, `page_location` | 모든 페이지 진입 (플러그인 자동) |
| `click_hero_cta` | `cta` | Hero 버튼 |
| `click_service` | `service`, `location` | Package 카드, Footer 서비스 링크 |
| `click_inquiry` | `location` | 모든 상담 신청 버튼·링크 |
| `click_email` / `click_phone` | `location` | 이메일·전화 링크 |
| `inquiry_start` | `source` | Form 작성 시작 |
| `inquiry_complete` | - | Form 제출 |

새 이벤트를 추가하는 순서:

1. `app/composables/useAnalytics.ts`의 `AnalyticsEvent` 타입에 이름을 추가한다(오타 방지).
2. 컴포넌트에서 호출한다.

   ```vue
   <script setup lang="ts">
   const { track } = useAnalytics()
   </script>

   <template>
     <BaseButton to="/process" @click="track('click_process', { location: 'home' })">…</BaseButton>
   </template>
   ```

3. 전환으로 볼 이벤트라면 GA4 관리 화면에서 "주요 이벤트"로 지정한다.

`location` 값은 `영역_위치` 형식의 snake_case로 쓴다(`home_bottom`, `service_growth`).

## 4.5 스타일 · 디자인 토큰

- 색상, radius, breakpoint를 바꿀 때는 `app/assets/css/variables.css`의 `@theme`만 수정한다. 해당 토큰을 쓰는 모든 유틸리티가 함께 바뀐다.
- 새 색상 토큰을 추가하면 곧바로 유틸리티로 쓸 수 있다.

  ```css
  @theme {
    --color-warning: #f59e0b;   /* → bg-warning, text-warning, border-warning/40 … */
  }
  ```

- 페이지 폭 컨테이너는 `container-page`, 섹션 상하 여백은 `section-y` 유틸리티를 쓴다.
- 반응형은 Mobile-first로 작성한다. 기본 스타일은 모바일이고, `md:`(768px~)와 `lg:`(1200px~)로 확장한다.
- 컴포넌트 전용 CSS가 필요하면 `<style scoped>`를 쓰고, 값은 `var(--color-*)` 토큰을 사용한다.

## 4.6 환경변수 추가

1. `nuxt.config.ts`의 `runtimeConfig.public`에 키와 기본값을 추가한다(예: `kakaoChannelUrl: ''`).
2. `.env.example`에 `NUXT_PUBLIC_KAKAO_CHANNEL_URL=`과 설명을 추가한다.
3. 코드에서 `useRuntimeConfig().public.kakaoChannelUrl`로 읽는다.
4. 운영 값은 Amplify 콘솔 환경변수에 등록한다. 빌드 시점에 반영되므로 등록 후 재배포가 필요하다.

> `public`은 브라우저에 노출된다. API Key, 토큰 같은 Secret은 넣지 않는다(스펙 20장).

## 4.7 Google Form 변경

- 같은 Form의 질문을 수정하는 경우: 사이트는 수정할 필요가 없다. 질문 구성이 크게 바뀌면 `pages/inquiry.vue`의 `formTopics`(왼쪽 안내 목록)를 맞춘다.
- 다른 Form으로 교체하는 경우: `nuxt.config.ts`의 `inquiryFormUrl`을 바꾸거나 `NUXT_PUBLIC_INQUIRY_FORM_URL`을 설정한다.
- Form은 **섹션 없이 한 페이지**로 유지하고, 로그인 요구와 조직 내 제한은 꺼 둔다.

## 4.8 검증

커밋 전에 실행한다.

```bash
npm run lint         # 스타일 오류는 npm run lint:fix 로 자동 수정
npm run typecheck
npm run generate     # 모든 페이지가 prerender되는지 확인
npx serve .output/public   # 산출물 로컬 확인 (기본 http://localhost:3000)
```

화면 확인 해상도(스펙 17장): 375 / 390 / 430 / 768 / 1024 / 1280 / 1440px

`npm run generate` 중 표시되는 `"H3Error", "H3Event" ... never used` 경고는 Nuxt 내부 패키지 경고이므로 무시해도 된다.

## 4.9 배포

1. `main` 브랜치에 push하면 Amplify가 자동으로 빌드·배포한다(`amplify.yml`).
2. 최초 설정(Amplify 콘솔):
   - GitHub 저장소 `josephjoh/eaas-project`의 `main` 브랜치 연결
   - 플랫폼: 정적 호스팅(`WEB`). SSR(Compute)로 감지되면 변경한다.
   - 환경변수: `NUXT_PUBLIC_SITE_URL`(운영 도메인), `NUXT_PUBLIC_GA_ID` 등
   - Rewrites and redirects: `/<*>` → `/404.html`, type `404 (Rewrite)`
   - Custom domain 연결 (HTTPS 인증서 자동)

## 4.10 자주 겪는 문제

| 증상 | 원인 / 해결 |
|---|---|
| 새 컴포넌트가 인식되지 않음 | dev 서버를 재시작하거나 `npx nuxt prepare`를 실행한다. 다른 폴더에 같은 파일명이 있는지 확인한다 |
| `.nuxt/eslint.config.mjs` 없음 오류 | `npx nuxt prepare` 실행 |
| 환경변수를 바꿨는데 반영 안 됨 | SSG이므로 다시 `generate`(배포 시 재빌드)해야 한다. 빈 값도 기본값을 덮어쓰는지 확인한다 |
| Tailwind 클래스가 적용되지 않음 | 클래스명을 문자열 조합(`'bg-' + color`)으로 만들면 스캔되지 않는다. 완성된 클래스명을 그대로 쓴다 |
| `class="hidden md:inline-flex"`가 무시됨 | 컴포넌트 내부 display 클래스와 충돌한다. 바깥 요소로 감싸서 제어한다 |
| 모바일에서 가로 스크롤 발생 | 고정 폭(`w-[500px]`) 요소나 긴 영문 단어를 확인한다. `min-w-0`, `truncate`, `break-all`을 활용한다 |
| 서버 라우트에서 h3 타입 오류 | h3 v1/v2 타입이 섞여 생기는 문제다. `useRuntimeConfig()`에 `event`를 넘기지 않는다(정적 prerender 용도라 불필요) |
