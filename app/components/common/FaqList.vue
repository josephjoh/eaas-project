<script setup lang="ts">
import type { FaqItem } from '~/data/faq'

defineProps<{
  items: FaqItem[]
}>()
</script>

<template>
  <div class="divide-y divide-border border-y border-border">
    <details
      v-for="item in items"
      :key="item.question"
      class="group"
    >
      <summary class="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-base font-semibold text-text md:text-lg [&::-webkit-details-marker]:hidden">
        <span>{{ item.question }}</span>
        <BaseIcon
          name="chevron-down"
          class="size-5 shrink-0 text-muted transition-transform group-open:rotate-180"
        />
      </summary>
      <p class="pr-2 pb-6 leading-relaxed text-muted md:pr-12">
        {{ item.answer }}
      </p>
    </details>
  </div>
</template>
