<script setup lang="ts">
import { faqItems } from '~/data/faq'

usePageSeo({
  title: '자주 묻는 질문',
  description: 'EaaS의 서비스 범위, 기술 지원, 계약, 보안과 접근 권한 관리 등 자주 묻는 질문에 답변합니다.',
  breadcrumbs: [{ name: '자주 묻는 질문', path: '/faq' }],
})

useJsonLd({
  '@type': 'FAQPage',
  'mainEntity': faqItems.map(item => ({
    '@type': 'Question',
    'name': item.question,
    'acceptedAnswer': { '@type': 'Answer', 'text': item.answer },
  })),
})
</script>

<template>
  <div>
    <PageHero
      eyebrow="FAQ"
      title="자주 묻는 질문"
      description="EaaS에 대해 가장 많이 받는 질문을 모았습니다."
    />
    <section class="section-y">
      <div class="container-page max-w-4xl!">
        <FaqList :items="faqItems" />
      </div>
    </section>
    <CtaBanner
      location="faq"
      :title="'원하는 답을\n찾지 못하셨나요?'"
      description="궁금한 점을 남겨주시면 고객사의 상황에 맞춰 자세히 안내해드립니다."
    />
  </div>
</template>
