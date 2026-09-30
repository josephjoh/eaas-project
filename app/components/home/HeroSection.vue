<script setup lang="ts">
const { track } = useAnalytics()

type Status = 'done' | 'review' | 'progress'

// 우측 비주얼용 예시 작업 목록 (장식용)
const boardItems: { type: string, title: string, status: string, tone: Status }[] = [
  { type: 'Discovery', title: '레거시 API 구조 분석', status: 'Done', tone: 'done' },
  { type: 'Bug Fix', title: '결제 모듈 간헐적 오류 수정', status: 'Deployed', tone: 'done' },
  { type: 'Feature', title: '관리자 통계 대시보드 개발', status: 'In Review', tone: 'review' },
  { type: 'DevOps', title: 'CI/CD 파이프라인 개선', status: 'In Progress', tone: 'progress' },
]

const statusClass: Record<Status, string> = {
  done: 'bg-accent/15 text-accent',
  review: 'bg-primary/25 text-[#9db8ff]',
  progress: 'bg-white/10 text-white/70',
}

const highlights = ['System Discovery부터 시작', '유지보수 → 기능 개발까지 확장', '정기 리포트로 투명하게 공유']

function onCtaClick(cta: 'inquiry' | 'services') {
  track('click_hero_cta', { cta })
  if (cta === 'inquiry') track('click_inquiry', { location: 'hero' })
}
</script>

<template>
  <section class="relative isolate overflow-hidden bg-secondary text-white">
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 -z-10"
    >
      <div class="absolute -top-48 right-[-10%] size-[36rem] rounded-full bg-primary/40 blur-3xl" />
      <div class="absolute -bottom-48 left-[-15%] size-[30rem] rounded-full bg-accent/15 blur-3xl" />
      <div class="hero-grid absolute inset-0" />
    </div>

    <div class="container-page grid items-center gap-14 py-20 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-32">
      <div>
        <BaseBadge tone="dark">
          Engineering as a Service
        </BaseBadge>
        <h1 class="mt-6 text-[2.125rem] leading-[1.28] font-bold tracking-tight md:text-5xl md:leading-[1.22] lg:text-[3.5rem]">
          개발팀은 있지만,<br>
          개발이 계속 <span class="text-accent">밀리고</span> 있습니까?
        </h1>
        <p class="mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
          기존 시스템의 유지보수부터 신규 기능 개발까지,
          고객사의 Engineering Team을 확장해드립니다.
        </p>
        <div class="mt-10 flex flex-col gap-3 sm:flex-row">
          <BaseButton
            to="/inquiry"
            size="lg"
            @click="onCtaClick('inquiry')"
          >
            EaaS 상담 신청
            <BaseIcon
              name="arrow-right"
              class="size-5"
            />
          </BaseButton>
          <BaseButton
            to="/services"
            size="lg"
            variant="outline-light"
            @click="onCtaClick('services')"
          >
            서비스 알아보기
          </BaseButton>
        </div>
        <ul class="mt-10 flex flex-col gap-2.5 text-sm text-white/65 sm:flex-row sm:flex-wrap sm:gap-x-6">
          <li
            v-for="item in highlights"
            :key="item"
            class="flex items-center gap-2"
          >
            <BaseIcon
              name="check"
              class="size-4 text-accent"
            />
            {{ item }}
          </li>
        </ul>
      </div>

      <div
        aria-hidden="true"
        class="hidden md:block"
      >
        <div class="rounded-lg border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/30 backdrop-blur md:p-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="size-2.5 rounded-full bg-accent" />
              <p class="text-sm font-semibold">
                Engineering Board
              </p>
            </div>
            <span class="text-xs text-white/50">This week</span>
          </div>
          <ul class="mt-5 space-y-3">
            <li
              v-for="item in boardItems"
              :key="item.title"
              class="flex items-center justify-between gap-4 rounded-md border border-white/10 bg-secondary/70 px-4 py-3"
            >
              <div class="min-w-0">
                <p class="text-xs font-medium text-white/50">
                  {{ item.type }}
                </p>
                <p class="mt-0.5 truncate text-sm font-medium">
                  {{ item.title }}
                </p>
              </div>
              <span :class="['shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold', statusClass[item.tone]]">
                {{ item.status }}
              </span>
            </li>
          </ul>
          <div class="mt-5 flex items-center justify-between gap-4 rounded-md bg-primary/25 px-4 py-3">
            <div>
              <p class="text-xs text-white/60">
                Monthly Report
              </p>
              <p class="text-sm font-semibold">
                작업 현황 · 배포 · 이슈 · 다음 작업
              </p>
            </div>
            <span class="text-xs font-semibold text-accent">Sent</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-grid {
  background-image:
    linear-gradient(to right, rgb(255 255 255 / 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(255 255 255 / 0.05) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse at 70% 40%, black, transparent 75%);
}
</style>
