<script setup lang="ts">
import type { ServicePackage } from '~/data/packages'

defineProps<{
  pkg: ServicePackage
  /** GA 이벤트의 location 파라미터 */
  location: string
}>()

const { track } = useAnalytics()
</script>

<template>
  <article class="flex h-full flex-col rounded-lg border border-border bg-white p-7 transition hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
    <div>
      <BaseBadge>{{ pkg.badge }}</BaseBadge>
    </div>
    <h3 class="mt-4 text-xl font-bold">
      {{ pkg.name }}
    </h3>
    <p class="mt-1 text-sm font-semibold text-primary">
      {{ pkg.tagline }}
    </p>
    <p class="mt-4 text-[15px] leading-relaxed text-muted">
      {{ pkg.summary }}
    </p>
    <ul class="mt-6 space-y-2.5 border-t border-border pt-6">
      <li
        v-for="scope in pkg.scopes"
        :key="scope.name"
        class="flex items-center gap-2.5 text-[15px] font-medium"
      >
        <BaseIcon
          name="check"
          class="size-4 shrink-0 text-accent"
        />
        {{ scope.name }}
      </li>
    </ul>
    <div class="mt-auto pt-8">
      <BaseButton
        :to="`/services/${pkg.slug}`"
        variant="outline"
        block
        @click="track('click_service', { service: pkg.slug, location })"
      >
        자세히 보기
        <BaseIcon
          name="arrow-right"
          class="size-4"
        />
      </BaseButton>
    </div>
  </article>
</template>
