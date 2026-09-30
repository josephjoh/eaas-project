<script setup lang="ts">
import type { FaqItem } from '~/data/faq'

defineProps<{
  items: FaqItem[]
}>()
</script>

<template>
  <section
    id="faq"
    class="section-y"
  >
    <div class="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
      <div>
        <SectionTitle
          eyebrow="FAQ"
          title="자주 묻는 질문"
          description="EaaS에 대해 가장 많이 받는 질문을 모았습니다."
        />
        <BaseButton
          to="/faq"
          variant="outline"
          class="mt-8"
        >
          FAQ 전체 보기
        </BaseButton>
      </div>
      <FaqList :items="items" />
    </div>
  </section>
</template>
