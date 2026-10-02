# 3. 컴포넌트 레퍼런스

모든 컴포넌트는 `app/components/` 아래에 있고, **폴더 prefix 없이 파일명으로 자동 import**된다(`<BaseButton>`, `<HeroSection>`).
props 표의 `?`는 선택 항목이다.

## 3.1 계층 구조

```text
app.vue
└─ layouts/default.vue
   ├─ AppHeader ─────────── BaseButton, BaseIcon
   ├─ <main> 페이지
   │   ├─ (메인) HeroSection … FaqSection, CtaBanner
   │   ├─ (하위) PageHero ── SectionTitle
   │   │         ServicePackageDetail ── PackageCard, CtaBanner
   │   │         InquiryForm / LegalDocument / FaqList / FlowSteps
   │   └─ 공통 부품: SectionTitle, BaseCard, BaseBadge, BaseButton, BaseIcon
   └─ AppFooter ─────────── BaseIcon
```

---

## 3.2 common — 레이아웃

### AppHeader
상단 고정(sticky) 헤더. 로고, 주요 메뉴(`mainNav`), 상담 신청 버튼, 모바일 햄버거 메뉴를 포함한다.
- props 없음
- 메뉴 항목은 `data/site.ts`의 `mainNav`에서 가져온다.
- 모바일 메뉴는 라우트가 바뀌면 자동으로 닫힌다.
- 현재 경로의 메뉴는 `text-primary`로 표시된다(하위 경로 포함).
- GA: `click_inquiry` (`location`: `header`, `mobile_menu`)

### AppFooter
하단 푸터. 브랜드 소개, 서비스 링크, 안내 링크, 문의처, 법적 고지 링크를 보여준다.
- props 없음
- 이메일·전화는 `runtimeConfig.public.contactEmail/contactPhone`이 있을 때만 표시한다.
- GA: `click_service`, `click_inquiry`, `click_email`, `click_phone` (`location: footer…`)

---

## 3.3 common — 기본 UI

### BaseButton
링크 또는 버튼. `to`가 있으면 `NuxtLink`, 없으면 `<button>`으로 렌더링한다.

| prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| `to?` | `string` | - | 이동 경로. 내부 경로, 외부 URL, `mailto:` 모두 가능 |
| `variant?` | `'primary' \| 'secondary' \| 'outline' \| 'outline-light' \| 'ghost'` | `'primary'` | `outline-light`는 어두운 배경용 |
| `size?` | `'sm' \| 'md' \| 'lg'` | `'md'` | 높이 40 / 48 / 56px |
| `block?` | `boolean` | `false` | 가로 100% |
| `newTab?` | `boolean` | `false` | 새 탭 열기 (`rel="noopener noreferrer"` 자동) |
| `type?` | `'button' \| 'submit'` | `'button'` | `to`가 없을 때만 적용 |

```vue
<BaseButton to="/inquiry" size="lg" @click="track('click_inquiry', { location: 'hero' })">
  EaaS 상담 신청 <BaseIcon name="arrow-right" class="size-5" />
</BaseButton>
```

> 내부적으로 `inline-flex`를 쓰므로 `class="hidden md:inline-flex"` 같은 display 덮어쓰기는 충돌한다. 반응형으로 숨기려면 바깥을 `<div class="hidden md:block">`로 감싼다.

### BaseCard
테두리와 둥근 모서리가 있는 카드 컨테이너.

| prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| `as?` | `string` | `'div'` | 렌더링 태그 (`article`, `li` 등) |
| `tone?` | `'default' \| 'surface' \| 'highlight' \| 'dark'` | `'default'` | 흰 배경 / 회색 배경 / 파란 강조 / 어두운 배경용 |

기본 padding은 `p-6 md:p-7`이다. `class="md:p-9"`처럼 덮어쓸 수 있다.

### BaseBadge
작은 라벨(pill).

| prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| `tone?` | `'primary' \| 'accent' \| 'neutral' \| 'dark'` | `'primary'` | 색상 |
| `size?` | `'sm' \| 'md' \| 'lg'` | `'sm'` | 글자 12 / 14 / 16px (Hero 배지는 `md`) |

### BaseIcon
인라인 SVG 아이콘 (24×24 viewBox, `stroke=currentColor`). 크기는 `class="size-4"`, 색은 `text-*`로 조절한다.

| prop | 타입 |
|---|---|
| `name` | `'arrow-right' \| 'check' \| 'chevron-down' \| 'close' \| 'external' \| 'mail' \| 'menu' \| 'phone' \| 'shield'` |

아이콘을 추가할 때는 `BaseIcon.vue`의 `IconName` 타입과 `paths` 객체에 path를 추가한다(Lucide 아이콘 path 형식).
`aria-hidden="true"`로 렌더링되므로, 아이콘만 있는 버튼에는 `aria-label`을 따로 준다.

---

## 3.4 common — 복합 UI

### SectionTitle
섹션 머리말: eyebrow(작은 영문 라벨) + 제목 + 설명.

| prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| `eyebrow?` | `string` | - | 제목 위 작은 라벨 |
| `title` | `string` | - | `\n`으로 줄바꿈 (`whitespace-pre-line`) |
| `description?` | `string` | - | 설명 문단 |
| `align?` | `'left' \| 'center'` | `'left'` | |
| `tone?` | `'light' \| 'dark'` | `'light'` | 어두운 섹션에서는 `dark` |
| `as?` | `'h1' \| 'h2'` | `'h2'` | 제목 태그 |
| `size?` | `'md' \| 'lg'` | `'md'` | `lg`는 페이지 제목 크기 |
| slot | default | | 설명 아래 추가 내용 |

```vue
<!-- 템플릿 속성값의 "\n"은 줄바꿈이 되지 않으므로 JS 문자열로 바인딩한다 -->
<SectionTitle eyebrow="FAQ" :title="'자주 묻는\n질문'" />
```

### PageHero
하위 페이지 상단 영역. 회색 배경 + 점 패턴 + `h1` 제목.

| prop | 타입 | 설명 |
|---|---|---|
| `eyebrow?` | `string` | |
| `title` | `string` | `h1`로 렌더링 |
| `description?` | `string` | |
| `breadcrumbs?` | `{ label: string, to?: string }[]` | `to`가 없는 항목은 현재 위치로 표시 |
| slot | default | 제목 아래 추가 요소 (예: 목적 배지, 시행일) |

### CtaBanner
페이지 하단의 상담 유도 배너(네이비 박스 + 상담 신청 / 이메일 문의 버튼).

| prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| `location` | `string` | - | **필수.** GA 이벤트 `location` 값 (예: `home_bottom`, `faq`) |
| `title?` | `string` | "우리 팀의 개발 문제,\nEaaS와 함께 정리해보세요" | |
| `description?` | `string` | 기본 문구 | |

- 이메일 버튼은 `contactEmail`이 있을 때만 표시한다.
- GA: `click_inquiry`, `click_email`

### FaqList
`<details>/<summary>` 기반 아코디언. JS 없이 열고 닫히며 키보드로도 접근할 수 있다.

| prop | 타입 |
|---|---|
| `items` | `FaqItem[]` (`{ question, answer }`) |

### FlowSteps
화살표로 이어진 단계 칩 목록. 화면 폭에 따라 줄바꿈된다.

| prop | 타입 | 설명 |
|---|---|---|
| `steps` | `ProcessStep[]` | `{ name, title, highlight? }`. `highlight`인 단계는 파란색으로 강조 |

### LegalDocument
개인정보처리방침·이용약관 공통 틀. slot 안의 `h2`, `p`, `ul`, `ol`에 문서 스타일(`:slotted`)을 적용한다.

| prop | 타입 |
|---|---|
| `title` | `string` |
| `effectiveDate` | `string` (시행일) |

---

## 3.5 home — 메인 페이지 섹션

모두 props가 없고(FaqSection 제외), `app/data/`에서 콘텐츠를 가져온다. 섹션마다 `id`가 있어 `/#packages`처럼 앵커로 이동할 수 있다.

| 컴포넌트 | id | 배경 | 데이터 | 내용 |
|---|---|---|---|---|
| **HeroSection** | - | 네이비 | 컴포넌트 내부 | 헤드라인, CTA 2개, 하이라이트 3개, (데스크톱 전용) Engineering Capacity 구조도 |
| **PainPointSection** | `pain-points` | 회색 | `home.painPoints` | 고객 고민 8개 카드 |
| **ServiceSection** | `service` | 흰색 | `home.definitionPoints` | EaaS 정의 문구 + 핵심 가치 4개 |
| **TargetSection** | `target` | 회색 | `home.targetProfile`, `techStacks` | 타깃 기업 프로필 + 기술 환경 칩 |
| **WhatWeDoSection** | `what-we-do` | 흰색 | `services.engineeringServices` | 제공 업무 10개 |
| **PackageSection** | `packages` | 회색 | `packages.servicePackages` | PackageCard 3개 |
| **ProcessSection** | `process` | 흰색 | `process.engagementSteps` | 9단계 카드 + `/process` 링크 |
| **SystemDiscoverySection** | `system-discovery` | 네이비 | `home.discoveryOutcomes`, `discoveryTargets` | 분석 결과 3단계 + 분석 대상 10개 |
| **WhyEaasSection** | `why-eaas` | 흰색 | `home.whyComparisons` | 일반 인력 지원 vs EaaS 비교표 (모바일은 카드형) |
| **SecuritySection** | `security` | 회색 | `home.securityPrinciples` | 보안 원칙 6개 |
| **FaqSection** | `faq` | 흰색 | props `items` | FAQ 일부 + "FAQ 전체 보기" 버튼 |

### HeroSection 상세
- 왼쪽: 배지, `h1` 헤드라인, 설명, CTA("EaaS 상담 신청" → `/inquiry`, "서비스 알아보기" → `/services`), 하이라이트 체크 3개
- 오른쪽(`lg` 이상에서만 표시): **Engineering Capacity 구조도**
  - 고객사 개발팀(`customerTeamFocus`) + EaaS Team(`eaasTeamScope`) → 흐름(`operatingFlow`)
  - 장식용이므로 `aria-hidden="true"`
- GA: `click_hero_cta` (`cta`: `inquiry`/`services`), 상담 버튼은 `click_inquiry`(`location: hero`)도 함께 전송

### FaqSection

| prop | 타입 | 설명 |
|---|---|---|
| `items` | `FaqItem[]` | 메인에서는 `faqItems.slice(0, 5)` 전달 |

---

## 3.6 services

### PackageCard
서비스 Package 요약 카드. 배지, 이름, 태그라인, 요약, 범위 체크리스트, "자세히 보기" 버튼으로 구성된다.

| prop | 타입 | 설명 |
|---|---|---|
| `pkg` | `ServicePackage` | `data/packages.ts`의 Package 객체 |
| `location` | `string` | GA `click_service` 이벤트의 `location` |

사용처: 메인 PackageSection, `/services`, 상세 페이지의 "다른 Package 살펴보기"

### ServicePackageDetail
서비스 상세 페이지 전체 본문. `/services/maintenance|growth|dedicated` 세 페이지가 공유한다.

| prop | 타입 |
|---|---|
| `pkg` | `ServicePackage` |

구성: PageHero(breadcrumb, 목적 배지) → 주요 범위 카드 → 적합한 기업 / 상담으로 정하는 항목 → System Discovery 안내 → 다른 Package 2개 → CtaBanner

```vue
<!-- pages/services/growth.vue -->
<script setup lang="ts">
import { getPackage } from '~/data/packages'
const pkg = getPackage('growth')
usePageSeo({ title: pkg.name, description: `${pkg.purpose}. ${pkg.summary}` })
</script>

<template>
  <ServicePackageDetail :pkg="pkg" />
</template>
```

---

## 3.7 inquiry

### InquiryForm
Google Form 임베드. props는 없다.

- `runtimeConfig.public.inquiryFormUrl`에 `embedded=true`를 붙여 iframe으로 삽입한다(높이 1800px). 상단에 "새 창에서 작성" 링크가 있다.
- URL이 없거나 잘못되었으면 이메일 안내 화면을 대신 표시한다.
- iframe은 `<ClientOnly>`로 **hydration 이후에만** 렌더링한다. SSR HTML에 iframe이 있으면 첫 load 이벤트를 놓치기 때문이다.
- GA 이벤트
  - `inquiry_start`: iframe에 포커스가 들어가거나(`window blur` 감지) "새 창에서 작성"을 클릭할 때 (1회)
  - `inquiry_complete`: iframe의 **두 번째 load**(제출 후 확인 화면)를 감지할 때
- **제약**: Google Form에 섹션(페이지 나눔)을 추가하면 페이지 이동도 load로 잡혀 `inquiry_complete`가 잘못 집계된다. Form은 한 페이지로 유지한다.

---

## 3.8 페이지 외 앱 파일

| 파일 | 설명 |
|---|---|
| `app.vue` | `<NuxtLayout><NuxtPage /></NuxtLayout>` |
| `layouts/default.vue` | "본문 바로가기" 스킵 링크, AppHeader, `<main id="main">`, AppFooter |
| `error.vue` | 상태 코드, 안내 문구, "홈으로 이동"(`clearError({ redirect: '/' })`). `noindex` 메타 |

## 3.9 컴포넌트 작성 규칙

- `<script setup lang="ts">`와 타입 기반 `defineProps`를 쓴다.
- **콘텐츠(문구, 목록)는 `app/data/`에 두고** 컴포넌트는 표현만 담당한다. 단, 한 컴포넌트에서만 쓰는 짧은 장식용 데이터는 컴포넌트 안에 둘 수 있다(예: HeroSection의 구조도 항목).
- 스타일은 Tailwind 유틸리티와 디자인 토큰(`bg-primary`, `text-muted` 등)을 쓴다. hex 색상을 직접 쓰지 않는다.
- 여러 번 반복되는 UI는 `common/`에 컴포넌트로 추출한다.
- 파일명은 폴더가 달라도 겹치지 않게 짓는다(prefix 없는 자동 import). 한 단어 이름은 ESLint 규칙상 쓸 수 없다(`Badge` ✗ → `BaseBadge` ✔). 단, pages·layouts는 예외다.
- 전환에 영향을 주는 링크·버튼에는 `useAnalytics().track()`을 연결하고 `location` 값을 준다.
