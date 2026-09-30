<script setup lang="ts">
defineProps<{
  title: string
  effectiveDate: string
}>()
</script>

<template>
  <div>
    <PageHero :title="title">
      <p class="text-sm text-muted">
        시행일: {{ effectiveDate }}
      </p>
    </PageHero>
    <article class="section-y">
      <div class="legal-content container-page max-w-3xl!">
        <slot />
      </div>
    </article>
  </div>
</template>

<style scoped>
.legal-content :slotted(h2) {
  margin-top: 2.75rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text);
}

.legal-content :slotted(h2:first-child) {
  margin-top: 0;
}

.legal-content :slotted(p),
.legal-content :slotted(ul),
.legal-content :slotted(ol) {
  margin-top: 0.875rem;
  line-height: 1.8;
  color: var(--color-muted);
}

.legal-content :slotted(ul) {
  list-style: disc;
  padding-left: 1.25rem;
}

.legal-content :slotted(ol) {
  list-style: decimal;
  padding-left: 1.25rem;
}

.legal-content :slotted(li + li) {
  margin-top: 0.375rem;
}
</style>
