<script setup lang="ts">
import { faqItems } from '~/data/faq'
import { siteConfig } from '~/data/site'

usePageSeo({
  title: 'EaaS | 개발팀을 확장하는 Engineering as a Service',
  description: siteConfig.description,
  rawTitle: true,
})

const homeFaqItems = faqItems.slice(0, 5)
</script>

<template>
  <div>
    <HeroSection />
    <PainPointSection />
    <ServiceSection />
    <TargetSection />
    <WhatWeDoSection />
    <PackageSection />
    <ProcessSection />
    <SystemDiscoverySection />
    <WhyEaasSection />
    <SecuritySection />
    <FaqSection :items="homeFaqItems" />
    <CtaBanner location="home_bottom" />
  </div>
</template>
