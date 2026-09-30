<script setup lang="ts">
withDefaults(defineProps<{
  eyebrow?: string
  /** 줄바꿈이 필요하면 \n을 사용한다. */
  title: string
  description?: string
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
  as?: 'h1' | 'h2'
  size?: 'md' | 'lg'
}>(), {
  eyebrow: undefined,
  description: undefined,
  align: 'left',
  tone: 'light',
  as: 'h2',
  size: 'md',
})
</script>

<template>
  <div :class="['max-w-3xl', align === 'center' && 'mx-auto text-center']">
    <p
      v-if="eyebrow"
      :class="['text-sm font-semibold tracking-wide', tone === 'dark' ? 'text-accent' : 'text-primary']"
    >
      {{ eyebrow }}
    </p>
    <component
      :is="as"
      :class="[
        'font-bold tracking-tight whitespace-pre-line',
        eyebrow && 'mt-3',
        size === 'lg' ? 'text-[2rem] leading-[1.3] md:text-5xl md:leading-[1.25]' : 'text-[1.75rem] leading-[1.35] md:text-4xl md:leading-[1.3]',
        tone === 'dark' ? 'text-white' : 'text-text',
      ]"
    >
      {{ title }}
    </component>
    <p
      v-if="description"
      :class="['mt-5 text-base leading-relaxed md:text-lg', tone === 'dark' ? 'text-white/70' : 'text-muted']"
    >
      {{ description }}
    </p>
    <slot />
  </div>
</template>
