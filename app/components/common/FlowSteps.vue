<script setup lang="ts">
import type { ProcessStep } from '~/data/process'

defineProps<{
  steps: ProcessStep[]
}>()
</script>

<template>
  <ol class="flex flex-wrap items-center gap-x-2 gap-y-3">
    <li
      v-for="(step, index) in steps"
      :key="step.name"
      class="flex items-center gap-2"
    >
      <div
        :class="[
          'rounded-md border px-4 py-2.5',
          step.highlight ? 'border-primary bg-primary text-white' : 'border-border bg-white',
        ]"
      >
        <p class="text-sm font-semibold">
          {{ step.name }}
        </p>
        <p :class="['text-xs', step.highlight ? 'text-white/80' : 'text-muted']">
          {{ step.title }}
        </p>
      </div>
      <BaseIcon
        v-if="index < steps.length - 1"
        name="arrow-right"
        class="size-4 shrink-0 text-muted/60"
      />
    </li>
  </ol>
</template>
