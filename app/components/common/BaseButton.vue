<script setup lang="ts">
const props = withDefaults(defineProps<{
  /** 지정하면 링크(NuxtLink)로, 없으면 button으로 렌더링한다. */
  to?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'outline-light' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  block?: boolean
  newTab?: boolean
  type?: 'button' | 'submit'
}>(), {
  to: undefined,
  variant: 'primary',
  size: 'md',
  type: 'button',
})

const variantClass = {
  'primary': 'bg-primary text-white shadow-sm hover:bg-primary-dark',
  'secondary': 'bg-secondary text-white hover:bg-secondary-light',
  'outline': 'border border-border bg-white text-text hover:border-primary hover:text-primary',
  'outline-light': 'border border-white/30 text-white hover:border-white/60 hover:bg-white/10',
  'ghost': 'text-primary hover:bg-primary-soft',
}

const sizeClass = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-5 text-[15px]',
  lg: 'h-14 px-7 text-base',
}

const classes = computed(() => [
  'inline-flex items-center justify-center gap-2 rounded-md font-semibold whitespace-nowrap transition-colors',
  variantClass[props.variant],
  sizeClass[props.size],
  props.block && 'w-full',
])
</script>

<template>
  <NuxtLink
    v-if="to"
    :to="to"
    :class="classes"
    :target="newTab ? '_blank' : undefined"
    :rel="newTab ? 'noopener noreferrer' : undefined"
  >
    <slot />
  </NuxtLink>
  <button
    v-else
    :type="type"
    :class="classes"
  >
    <slot />
  </button>
</template>
