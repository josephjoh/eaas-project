<script setup lang="ts">
import { discoveryOutcomes, discoveryTargets } from '~/data/home'
</script>

<template>
  <section
    id="system-discovery"
    class="section-y relative isolate overflow-hidden bg-secondary text-white"
  >
    <div
      aria-hidden="true"
      class="pointer-events-none absolute -top-40 -left-40 -z-10 size-[32rem] rounded-full bg-primary/30 blur-3xl"
    />
    <div class="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
      <div>
        <SectionTitle
          eyebrow="System Discovery"
          :title="'작업 전에,\n시스템을 먼저 이해합니다'"
          description="계약 후 바로 요구사항만 처리하지 않습니다. 기존 시스템을 먼저 분석하고, 그 결과를 이후 Engineering 작업의 기준으로 삼습니다."
          tone="dark"
        />
        <ol class="mt-10 space-y-3">
          <li
            v-for="(outcome, index) in discoveryOutcomes"
            :key="outcome.title"
            class="flex gap-4 rounded-md border border-white/10 bg-white/5 p-4"
          >
            <span class="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-secondary">
              {{ index + 1 }}
            </span>
            <div>
              <p class="font-semibold">
                {{ outcome.title }}
              </p>
              <p class="mt-0.5 text-sm text-white/65">
                {{ outcome.description }}
              </p>
            </div>
          </li>
        </ol>
      </div>

      <div>
        <p class="text-sm font-semibold text-white/60">
          분석 대상
        </p>
        <ul class="mt-4 grid gap-3 sm:grid-cols-2">
          <li
            v-for="target in discoveryTargets"
            :key="target.title"
            class="rounded-md border border-white/10 bg-white/[0.03] px-5 py-4 transition-colors hover:border-accent/50"
          >
            <p class="font-semibold">
              {{ target.title }}
            </p>
            <p class="mt-1 text-sm text-white/60">
              {{ target.description }}
            </p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
