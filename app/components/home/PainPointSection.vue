<script setup lang="ts">
import { painPoints } from '~/data/home'
</script>

<template>
  <section
    id="pain-points"
    class="section-y bg-surface"
  >
    <div class="container-page">
      <SectionTitle
        eyebrow="Customer Pain"
        :title="'개발팀이 있어도,\n개발은 계속 밀립니다'"
        description="많은 기업이 비슷한 이유로 개발 속도를 잃고 있습니다. 혹시 이런 상황이 익숙하신가요?"
      />
      <ul class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <li
          v-for="(item, index) in painPoints"
          :key="item.title"
        >
          <BaseCard class="h-full">
            <span class="text-sm font-bold text-primary">{{ String(index + 1).padStart(2, '0') }}</span>
            <h3 class="mt-3 text-lg leading-snug font-semibold">
              {{ item.title }}
            </h3>
            <p class="mt-2 text-[15px] leading-relaxed text-muted">
              {{ item.description }}
            </p>
          </BaseCard>
        </li>
      </ul>
    </div>
  </section>
</template>
