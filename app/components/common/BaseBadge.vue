<script setup lang="ts">
withDefaults(defineProps<{
  tone?: 'primary' | 'accent' | 'neutral' | 'dark'
  size?: 'sm' | 'md' | 'lg'
}>(), {
  tone: 'primary',
  size: 'sm',
})

const sizeClass = {
  sm: 'px-3 py-1 text-xs',
  md: 'px-4 py-1.5 text-sm',
  lg: 'px-5 py-2 text-base',
}

const toneClass = {
  primary: 'bg-primary-soft text-primary',
  accent: 'bg-accent/10 text-accent-dark',
  neutral: 'border border-border bg-white text-muted',
  dark: 'bg-white/10 text-white/90 ring-1 ring-white/15 ring-inset',
}
</script>

<template>
  <span :class="['inline-flex items-center rounded-full font-semibold tracking-wide', sizeClass[size], toneClass[tone]]">
    <slot />
  </span>
</template>
