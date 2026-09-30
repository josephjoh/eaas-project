<script setup lang="ts">
withDefaults(defineProps<{
  tone?: 'primary' | 'accent' | 'neutral' | 'dark'
}>(), {
  tone: 'primary',
})

const toneClass = {
  primary: 'bg-primary-soft text-primary',
  accent: 'bg-accent/10 text-accent-dark',
  neutral: 'border border-border bg-white text-muted',
  dark: 'bg-white/10 text-white/90 ring-1 ring-white/15 ring-inset',
}
</script>

<template>
  <span :class="['inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide', toneClass[tone]]">
    <slot />
  </span>
</template>
