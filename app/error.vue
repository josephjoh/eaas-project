<script setup lang="ts">
import type { NuxtError } from '#app'
import { siteConfig } from '~/data/site'

const props = defineProps<{
  error: NuxtError
}>()

const is404 = computed(() => props.error.statusCode === 404)

useSeoMeta({
  title: () => `${is404.value ? '페이지를 찾을 수 없습니다' : '오류가 발생했습니다'} | ${siteConfig.name}`,
  robots: 'noindex',
})

function goHome() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <NuxtLayout>
    <section class="section-y">
      <div class="container-page py-10 text-center">
        <p class="text-6xl font-bold text-primary md:text-7xl">
          {{ error.statusCode }}
        </p>
        <h1 class="mt-6 text-2xl font-bold md:text-3xl">
          {{ is404 ? '페이지를 찾을 수 없습니다' : '일시적인 오류가 발생했습니다' }}
        </h1>
        <p class="mt-3 text-muted">
          {{ is404 ? '주소가 변경되었거나 삭제된 페이지입니다.' : '잠시 후 다시 시도해주세요.' }}
        </p>
        <BaseButton
          class="mt-10"
          @click="goHome"
        >
          홈으로 이동
        </BaseButton>
      </div>
    </section>
  </NuxtLayout>
</template>
