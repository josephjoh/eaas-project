<script setup lang="ts">
withDefaults(defineProps<{
  /** GA 이벤트의 location 파라미터 */
  location: string
  title?: string
  description?: string
}>(), {
  title: '우리 팀의 개발 문제,\nEaaS와 함께 정리해보세요',
  description: '현재 개발 환경과 고민을 알려주시면, 적합한 지원 방식과 Package를 제안해드립니다.',
})

const { contactEmail } = useRuntimeConfig().public
const { track } = useAnalytics()
</script>

<template>
  <section class="section-y">
    <div class="container-page">
      <div class="relative isolate overflow-hidden rounded-lg bg-secondary px-6 py-14 text-center text-white md:px-12 md:py-20">
        <div
          aria-hidden="true"
          class="pointer-events-none absolute inset-0 -z-10"
        >
          <div class="absolute -top-24 -right-24 size-80 rounded-full bg-primary/50 blur-3xl" />
          <div class="absolute -bottom-32 -left-20 size-72 rounded-full bg-accent/25 blur-3xl" />
        </div>
        <h2 class="text-2xl leading-snug font-bold tracking-tight whitespace-pre-line md:text-4xl">
          {{ title }}
        </h2>
        <p class="mx-auto mt-4 max-w-2xl leading-relaxed text-white/70 md:text-lg">
          {{ description }}
        </p>
        <div class="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <BaseButton
            to="/inquiry"
            size="lg"
            @click="track('click_inquiry', { location })"
          >
            EaaS 상담 신청
            <BaseIcon
              name="arrow-right"
              class="size-5"
            />
          </BaseButton>
          <BaseButton
            v-if="contactEmail"
            :to="`mailto:${contactEmail}`"
            size="lg"
            variant="outline-light"
            @click="track('click_email', { location })"
          >
            이메일 문의
          </BaseButton>
        </div>
      </div>
    </div>
  </section>
</template>
