<script setup lang="ts">
import { engagementSteps } from '~/data/process'
</script>

<template>
  <section
    id="process"
    class="section-y"
  >
    <div class="container-page">
      <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionTitle
          eyebrow="How It Works"
          :title="'상담부터 리포트까지,\n9단계로 진행합니다'"
        />
        <BaseButton
          to="/process"
          variant="ghost"
          class="self-start md:self-auto"
        >
          진행 방식 자세히 보기
          <BaseIcon
            name="arrow-right"
            class="size-4"
          />
        </BaseButton>
      </div>
      <ol class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <li
          v-for="(step, index) in engagementSteps"
          :key="step.name"
        >
          <BaseCard
            :tone="step.highlight ? 'highlight' : 'default'"
            class="flex h-full gap-4 md:p-6"
          >
            <span class="text-2xl leading-none font-bold text-primary/80 tabular-nums">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
            <div>
              <h3 class="font-bold">
                {{ step.name }}
                <span class="ml-1 text-sm font-medium text-muted">{{ step.title }}</span>
              </h3>
              <p class="mt-1.5 text-sm leading-relaxed text-muted">
                {{ step.description }}
              </p>
            </div>
          </BaseCard>
        </li>
      </ol>
    </div>
  </section>
</template>
