<script setup lang="ts">
type IconName = 'arrow-right' | 'check' | 'chevron-down' | 'close' | 'external' | 'mail' | 'menu' | 'phone' | 'shield'

defineProps<{
  name: IconName
}>()

const paths: Record<IconName, string[]> = {
  'arrow-right': ['M5 12h14', 'm12 5 7 7-7 7'],
  'check': ['M20 6 9 17l-5-5'],
  'chevron-down': ['m6 9 6 6 6-6'],
  'close': ['M18 6 6 18', 'm6 6 12 12'],
  'external': ['M15 3h6v6', 'M10 14 21 3', 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6'],
  'mail': ['M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'm22 6-10 7L2 6'],
  'menu': ['M4 6h16', 'M4 12h16', 'M4 18h16'],
  'phone': [
    'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z',
  ],
  'shield': ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', 'm9 12 2 2 4-4'],
}
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path
      v-for="d in paths[name]"
      :key="d"
      :d="d"
    />
  </svg>
</template>
