<script setup lang="ts">
const { googleSiteVerification, naverSiteVerification } = useRuntimeConfig().public

// 검색엔진 소유 확인 (Google Search Console, 네이버 서치어드바이저). 값이 있을 때만 출력한다.
useHead({
  meta: [
    ...(googleSiteVerification ? [{ name: 'google-site-verification', content: googleSiteVerification }] : []),
    ...(naverSiteVerification ? [{ name: 'naver-site-verification', content: naverSiteVerification }] : []),
  ],
})

useJsonLd(buildSiteSchemas(useSiteUrl()))
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
