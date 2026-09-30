<script setup lang="ts">
usePageSeo({
  title: '상담 신청',
  description: '회사와 개발 환경, 현재 겪고 있는 개발 문제를 알려주세요. 적합한 지원 방식과 Package를 제안해드립니다.',
})

const { contactEmail, contactPhone } = useRuntimeConfig().public
const { track } = useAnalytics()

const formTopics = [
  '회사 및 담당자 정보',
  '개발팀 규모와 기술 스택',
  '현재 가장 큰 개발 문제',
  '개발팀의 시간을 가장 많이 쓰는 업무',
  'Cloud / Infrastructure 환경',
  '희망 지원 형태와 시작 시점',
]

const nextSteps = ['신청서 검토', '상담 일정 안내', '상담 및 Package 제안', '계약']
</script>

<template>
  <div>
    <PageHero
      eyebrow="Contact"
      title="EaaS 상담 신청"
      description="현재 개발 환경과 고민을 알려주시면, 적합한 지원 방식과 Package를 제안해드립니다."
    />

    <section class="section-y">
      <div class="container-page grid items-start gap-10 lg:grid-cols-[340px_1fr] lg:gap-14">
        <aside class="space-y-5 lg:sticky lg:top-[calc(var(--header-height)+2rem)]">
          <BaseCard tone="surface">
            <h2 class="text-lg font-bold">
              신청서에서 여쭤보는 내용
            </h2>
            <ul class="mt-4 space-y-2.5 text-[15px]">
              <li
                v-for="topic in formTopics"
                :key="topic"
                class="flex items-start gap-2"
              >
                <BaseIcon
                  name="check"
                  class="mt-1 size-4 shrink-0 text-accent"
                />
                {{ topic }}
              </li>
            </ul>
            <p class="mt-5 text-sm leading-relaxed text-muted">
              모든 항목을 정확히 작성하지 않으셔도 괜찮습니다. 알고 계신 범위에서 편하게 적어주세요.
            </p>
          </BaseCard>

          <BaseCard tone="surface">
            <h2 class="text-lg font-bold">
              신청 이후 진행
            </h2>
            <ol class="mt-4 space-y-2.5 text-[15px]">
              <li
                v-for="(step, index) in nextSteps"
                :key="step"
                class="flex items-center gap-3"
              >
                <span class="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                  {{ index + 1 }}
                </span>
                {{ step }}
              </li>
            </ol>
          </BaseCard>

          <div
            v-if="contactEmail || contactPhone"
            class="space-y-2 px-1 text-sm"
          >
            <p class="font-semibold">
              다른 방법으로 문의하기
            </p>
            <a
              v-if="contactEmail"
              :href="`mailto:${contactEmail}`"
              class="flex items-center gap-2 text-muted hover:text-primary"
              @click="track('click_email', { location: 'inquiry' })"
            >
              <BaseIcon
                name="mail"
                class="size-4"
              />
              {{ contactEmail }}
            </a>
            <a
              v-if="contactPhone"
              :href="`tel:${contactPhone.replace(/[^0-9+]/g, '')}`"
              class="flex items-center gap-2 text-muted hover:text-primary"
              @click="track('click_phone', { location: 'inquiry' })"
            >
              <BaseIcon
                name="phone"
                class="size-4"
              />
              {{ contactPhone }}
            </a>
          </div>

          <p class="px-1 text-xs leading-relaxed text-muted">
            수집된 정보는 상담 목적으로만 사용됩니다. 자세한 내용은
            <NuxtLink
              to="/privacy"
              class="underline underline-offset-2 hover:text-text"
            >개인정보처리방침</NuxtLink>을 확인해주세요.
          </p>
        </aside>

        <InquiryForm />
      </div>
    </section>
  </div>
</template>
