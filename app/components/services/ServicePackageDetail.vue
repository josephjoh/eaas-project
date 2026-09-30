<script setup lang="ts">
import { packageConsultationItems, servicePackages } from '~/data/packages'
import type { ServicePackage } from '~/data/packages'

const props = defineProps<{
  pkg: ServicePackage
}>()

const otherPackages = computed(() => servicePackages.filter(item => item.slug !== props.pkg.slug))
</script>

<template>
  <div>
    <PageHero
      :eyebrow="pkg.tagline"
      :title="pkg.name"
      :description="pkg.summary"
      :breadcrumbs="[{ label: '서비스', to: '/services' }, { label: pkg.name }]"
    >
      <div class="inline-flex items-center gap-3 rounded-md border border-primary/20 bg-white px-4 py-3 text-sm">
        <BaseBadge>목적</BaseBadge>
        <span class="font-medium">{{ pkg.purpose }}</span>
      </div>
    </PageHero>

    <section class="section-y">
      <div class="container-page">
        <SectionTitle
          eyebrow="Scope"
          title="주요 범위"
        />
        <ol class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <li
            v-for="(scope, index) in pkg.scopes"
            :key="scope.name"
          >
            <BaseCard class="h-full">
              <span class="text-sm font-bold text-primary">{{ String(index + 1).padStart(2, '0') }}</span>
              <h3 class="mt-2 text-lg font-bold">
                {{ scope.name }}
              </h3>
              <p class="mt-2 text-[15px] leading-relaxed text-muted">
                {{ scope.description }}
              </p>
            </BaseCard>
          </li>
        </ol>
      </div>
    </section>

    <section class="section-y bg-surface">
      <div class="container-page grid gap-8 lg:grid-cols-2">
        <BaseCard class="md:p-9">
          <h2 class="text-xl font-bold md:text-2xl">
            이런 기업에 적합합니다
          </h2>
          <ul class="mt-6 space-y-4">
            <li
              v-for="item in pkg.recommendedFor"
              :key="item"
              class="flex items-start gap-3"
            >
              <span class="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-dark">
                <BaseIcon
                  name="check"
                  class="size-3.5"
                />
              </span>
              <span class="leading-relaxed">{{ item }}</span>
            </li>
          </ul>
        </BaseCard>
        <BaseCard class="md:p-9">
          <h2 class="text-xl font-bold md:text-2xl">
            상담을 통해 함께 정하는 항목
          </h2>
          <p class="mt-2 text-[15px] text-muted">
            고객사의 시스템과 개발 조직에 맞춰 세부 조건을 설계합니다.
          </p>
          <ul class="mt-6 flex flex-wrap gap-2">
            <li
              v-for="item in packageConsultationItems"
              :key="item"
              class="rounded-md bg-surface px-3.5 py-2 text-sm font-medium"
            >
              {{ item }}
            </li>
          </ul>
        </BaseCard>
      </div>
    </section>

    <section class="section-y">
      <div class="container-page">
        <BaseCard
          tone="highlight"
          class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:p-10"
        >
          <div>
            <p class="text-sm font-semibold text-primary">
              System Discovery
            </p>
            <h2 class="mt-2 text-xl font-bold md:text-2xl">
              모든 작업은 기존 시스템을 이해하는 것에서 시작합니다
            </h2>
            <p class="mt-2 text-muted">
              Architecture, Repository, Database, Infrastructure를 먼저 분석한 뒤 작업을 진행합니다.
            </p>
          </div>
          <BaseButton
            to="/process"
            variant="outline"
            class="shrink-0"
          >
            진행 방식 보기
          </BaseButton>
        </BaseCard>

        <h2 class="mt-20 text-xl font-bold md:text-2xl">
          다른 Package 살펴보기
        </h2>
        <ul class="mt-6 grid gap-5 md:grid-cols-2">
          <li
            v-for="item in otherPackages"
            :key="item.slug"
          >
            <PackageCard
              :pkg="item"
              :location="`service_${pkg.slug}`"
            />
          </li>
        </ul>
      </div>
    </section>

    <CtaBanner
      :location="`service_${pkg.slug}`"
      :title="`${pkg.name},\n우리 팀에 맞을지 상담해보세요`"
    />
  </div>
</template>
