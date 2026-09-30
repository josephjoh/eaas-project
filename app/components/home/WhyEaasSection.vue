<script setup lang="ts">
import { whyComparisons } from '~/data/home'
</script>

<template>
  <section
    id="why-eaas"
    class="section-y"
  >
    <div class="container-page">
      <SectionTitle
        eyebrow="Why EaaS"
        :title="'단순 개발자 파견과는\n다르게 일합니다'"
        description="EaaS는 인력이 아니라 Engineering Capacity를 제공합니다."
        align="center"
      />

      <div class="mx-auto mt-12 max-w-5xl">
        <div
          class="hidden grid-cols-[160px_1fr_1fr] gap-4 px-6 pb-3 text-sm font-semibold md:grid"
          aria-hidden="true"
        >
          <span />
          <span class="text-muted">일반적인 개발 인력 지원</span>
          <span class="text-primary">EaaS</span>
        </div>
        <ul class="space-y-3">
          <li
            v-for="row in whyComparisons"
            :key="row.topic"
            class="grid gap-3 rounded-lg border border-border p-5 md:grid-cols-[160px_1fr_1fr] md:items-center md:gap-4 md:px-6"
          >
            <p class="font-bold">
              {{ row.topic }}
            </p>
            <p class="text-[15px] text-muted">
              <span class="mr-2 text-xs font-semibold md:hidden">일반</span>{{ row.common }}
            </p>
            <p class="flex items-start gap-2 text-[15px] font-semibold text-text">
              <BaseIcon
                name="check"
                class="mt-0.5 size-4 shrink-0 text-primary"
              />
              {{ row.eaas }}
            </p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
