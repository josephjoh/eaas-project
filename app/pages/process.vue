<script setup lang="ts">
import { engagementSteps, onboardingSteps, operationSteps, reportItems } from '~/data/process'

usePageSeo({
  title: '진행 방식',
  description:
    '상담 신청부터 계약, System Discovery, Engineering, QA, 배포, 리포트까지. EaaS가 일하는 방식을 소개합니다.',
})

const portalFeatures = ['Task', 'Deployment', 'History', 'Report', 'Question']
</script>

<template>
  <div>
    <PageHero
      eyebrow="How It Works"
      :title="'상담부터 리포트까지,\n투명하게 진행합니다'"
      description="EaaS는 기존 시스템을 이해하는 것에서 시작해, 정해진 절차에 따라 개발·검증·배포하고 그 결과를 정기적으로 공유합니다."
    />

    <section class="section-y">
      <div class="container-page">
        <SectionTitle
          eyebrow="Engagement"
          title="전체 진행 단계"
        />
        <ol class="relative mt-12 max-w-3xl">
          <li
            v-for="(step, index) in engagementSteps"
            :key="step.name"
            class="relative flex gap-5 pb-10 last:pb-0"
          >
            <span
              v-if="index < engagementSteps.length - 1"
              aria-hidden="true"
              class="absolute top-11 bottom-1 left-[1.375rem] w-px bg-border"
            />
            <span
              :class="[
                'relative flex size-11 shrink-0 items-center justify-center rounded-full border text-sm font-bold tabular-nums',
                step.highlight ? 'border-primary bg-primary text-white' : 'border-border bg-white text-primary',
              ]"
            >
              {{ String(index + 1).padStart(2, '0') }}
            </span>
            <div class="pt-2">
              <h3 class="text-lg font-bold">
                {{ step.name }}
                <span class="ml-1.5 text-sm font-medium text-muted">{{ step.title }}</span>
              </h3>
              <p class="mt-1.5 leading-relaxed text-muted">
                {{ step.description }}
              </p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <section class="section-y bg-surface">
      <div class="container-page space-y-16">
        <div>
          <SectionTitle
            eyebrow="Onboarding"
            title="계약 이후 온보딩"
            description="계약 후 필요한 계정 정보를 전달받아 최소 범위로 시스템에 접근하고, System Discovery를 거쳐 업무를 시작합니다."
          />
          <FlowSteps
            :steps="onboardingSteps"
            class="mt-8"
          />
        </div>
        <div>
          <SectionTitle
            eyebrow="Operation"
            title="작업 요청 처리 방식"
            description="모든 요청은 분류와 산정, 고객 승인을 거쳐 개발되며, QA를 통과한 뒤 배포됩니다."
          />
          <FlowSteps
            :steps="operationSteps"
            class="mt-8"
          />
        </div>
      </div>
    </section>

    <section class="section-y">
      <div class="container-page">
        <SectionTitle
          eyebrow="Communication"
          title="커뮤니케이션과 리포트"
        />
        <div class="mt-10 grid gap-5 lg:grid-cols-2">
          <BaseCard class="md:p-9">
            <BaseBadge tone="accent">
              현재
            </BaseBadge>
            <h3 class="mt-4 text-xl font-bold">
              이메일 · Slack 커뮤니케이션
            </h3>
            <p class="mt-2 leading-relaxed text-muted">
              요청 접수와 진행 상황 공유는 이메일과 Slack을 통해 이루어지며, 다음 항목을 정리해 전달합니다.
            </p>
            <ul class="mt-6 grid grid-cols-2 gap-3">
              <li
                v-for="item in reportItems"
                :key="item"
                class="flex items-center gap-2 text-[15px] font-medium"
              >
                <BaseIcon
                  name="check"
                  class="size-4 shrink-0 text-accent"
                />
                {{ item }}
              </li>
            </ul>
          </BaseCard>
          <BaseCard
            tone="surface"
            class="md:p-9"
          >
            <BaseBadge tone="neutral">
              준비 중
            </BaseBadge>
            <h3 class="mt-4 text-xl font-bold">
              Customer Portal
            </h3>
            <p class="mt-2 leading-relaxed text-muted">
              향후 Customer Portal에서 작업, 배포, 이력, 리포트, 질문을 한 곳에서 확인할 수 있도록 준비하고 있습니다.
            </p>
            <ul class="mt-6 flex flex-wrap gap-2">
              <li
                v-for="feature in portalFeatures"
                :key="feature"
                class="rounded-md border border-border bg-white px-3.5 py-2 text-sm font-medium text-muted"
              >
                {{ feature }}
              </li>
            </ul>
          </BaseCard>
        </div>
      </div>
    </section>

    <CtaBanner location="process" />
  </div>
</template>
