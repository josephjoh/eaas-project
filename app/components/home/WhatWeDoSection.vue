<script setup lang="ts">
import { engineeringServices } from '~/data/services'
</script>

<template>
  <section
    id="what-we-do"
    class="section-y"
  >
    <div class="container-page">
      <SectionTitle
        eyebrow="What We Do"
        :title="'시스템 분석부터\n배포와 리포트까지'"
        description="고객사 개발팀이 필요로 하는 Engineering 업무를 지속적으로 수행합니다."
      />
      <ul class="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <li
          v-for="service in engineeringServices"
          :key="service.name"
          class="rounded-lg border border-border p-5 transition-colors hover:border-primary/40"
        >
          <p class="text-xs font-semibold text-primary">
            {{ service.title }}
          </p>
          <h3 class="mt-1.5 text-base font-bold">
            {{ service.name }}
          </h3>
          <p class="mt-2 text-sm leading-relaxed text-muted">
            {{ service.description }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>
