<script setup lang="ts">
withDefaults(defineProps<{
  as?: string
  tone?: 'default' | 'surface' | 'highlight' | 'dark'
}>(), {
  as: 'div',
  tone: 'default',
})

const toneClass = {
  default: 'border-border bg-white',
  surface: 'border-transparent bg-surface',
  highlight: 'border-primary/30 bg-primary-soft',
  dark: 'border-white/10 bg-white/5 text-white',
}
</script>

<template>
  <component
    :is="as"
    :class="['rounded-lg border p-6 md:p-7', toneClass[tone]]"
  >
    <slot />
  </component>
</template>
