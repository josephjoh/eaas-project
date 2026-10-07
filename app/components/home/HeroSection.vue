<script setup lang="ts">
const { track } = useAnalytics()

// 우측 비주얼: 고객사 개발팀 + EaaS Team = 확장된 Engineering Capacity
const customerTeamFocus = ['제품 로드맵', '핵심 기능 개발', '기술 의사결정']
const eaasTeamScope = ['유지보수', 'Bug Fix', '기능 개발', 'DevOps', 'QA', '배포 · 리포트']

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
        <BaseBadge
          tone="dark"
          size="md"
        >
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
      </div>

      <div
        aria-hidden="true"
        class="hidden lg:block"
      >
        <div class="rounded-lg border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/30 backdrop-blur md:p-6">
          <div class="flex items-center gap-2">
            <span class="size-2.5 rounded-full bg-accent" />
            <p class="text-sm font-semibold">
              Engineering Capacity
            </p>
          </div>

          <div class="mt-5 rounded-md border border-white/10 bg-secondary/70 p-4">
            <p class="mt-0.5 font-semibold">
              고객사 개발팀
            </p>
            <ul class="mt-3 flex flex-wrap gap-1.5">
              <li
                v-for="item in customerTeamFocus"
                :key="item"
                class="rounded-full bg-white/10 px-2.5 py-1 text-xs text-white/80"
              >
                {{ item }}
              </li>
            </ul>
          </div>

          <div class="relative flex h-12 items-center justify-center">
            <span class="absolute inset-y-0 left-1/2 w-px bg-white/15" />
            <span class="relative flex size-8 items-center justify-center rounded-full bg-accent text-lg leading-none font-bold text-secondary">+</span>
          </div>

          <div class="rounded-md border border-primary/60 bg-primary/25 p-4">
            <p class="text-xs font-medium text-white/60">
              EaaS Team
            </p>
            <p class="mt-0.5 font-semibold">
              개발팀의 시간을 가져가는 업무를 맡습니다
            </p>
            <ul class="mt-3 grid grid-cols-3 gap-1.5">
              <li
                v-for="item in eaasTeamScope"
                :key="item"
                class="rounded-md bg-white/10 px-2 py-1.5 text-center text-xs font-medium"
              >
                {{ item }}
              </li>
            </ul>
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
