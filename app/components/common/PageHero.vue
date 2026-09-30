<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  description?: string
  breadcrumbs?: { label: string, to?: string }[]
}>()
</script>

<template>
  <section class="relative isolate overflow-hidden border-b border-border bg-surface">
    <div
      aria-hidden="true"
      class="page-hero-pattern absolute inset-0 -z-10"
    />
    <div class="container-page py-16 md:py-20 lg:py-24">
      <nav
        v-if="breadcrumbs?.length"
        aria-label="현재 위치"
        class="mb-6 text-sm text-muted"
      >
        <ol class="flex flex-wrap items-center gap-2">
          <li
            v-for="(crumb, index) in breadcrumbs"
            :key="crumb.label"
            class="flex items-center gap-2"
          >
            <NuxtLink
              v-if="crumb.to"
              :to="crumb.to"
              class="hover:text-primary"
            >
              {{ crumb.label }}
            </NuxtLink>
            <span
              v-else
              aria-current="page"
              class="font-medium text-text"
            >{{ crumb.label }}</span>
            <span
              v-if="index < breadcrumbs.length - 1"
              aria-hidden="true"
            >/</span>
          </li>
        </ol>
      </nav>
      <SectionTitle
        as="h1"
        size="lg"
        :eyebrow="eyebrow"
        :title="title"
        :description="description"
      />
      <div
        v-if="$slots.default"
        class="mt-8"
      >
        <slot />
      </div>
    </div>
  </section>
</template>

<style scoped>
.page-hero-pattern {
  background-image: radial-gradient(var(--color-border) 1px, transparent 1px);
  background-size: 22px 22px;
  mask-image: linear-gradient(to bottom left, black, transparent 70%);
}
</style>
