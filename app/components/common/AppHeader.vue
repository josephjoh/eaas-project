<script setup lang="ts">
import { mainNav, siteConfig } from '~/data/site'

const route = useRoute()
const { track } = useAnalytics()
const isMenuOpen = ref(false)

watch(() => route.fullPath, () => {
  isMenuOpen.value = false
})

function onInquiryClick(location: string) {
  track('click_inquiry', { location })
}
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-border/80 bg-white/90 backdrop-blur-md">
    <div class="container-page flex h-(--header-height) items-center justify-between gap-6">
      <NuxtLink
        to="/"
        class="flex items-center gap-2.5"
        :aria-label="`${siteConfig.name} 홈`"
      >
        <img
          src="/images/logo.svg"
          alt=""
          width="32"
          height="32"
          class="size-8"
        >
        <span class="text-lg font-bold tracking-tight text-secondary">{{ siteConfig.name }}</span>
      </NuxtLink>

      <nav
        class="hidden md:block"
        aria-label="주요 메뉴"
      >
        <ul class="flex items-center gap-8">
          <li
            v-for="item in mainNav"
            :key="item.to"
          >
            <NuxtLink
              :to="item.to"
              class="text-[15px] font-medium text-muted transition-colors hover:text-text"
              active-class="text-primary!"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="flex items-center gap-2">
        <BaseButton
          to="/inquiry"
          size="sm"
          @click="onInquiryClick('header')"
        >
          상담 신청
        </BaseButton>
        <button
          type="button"
          class="-mr-2 inline-flex size-10 items-center justify-center rounded-md text-text hover:bg-surface md:hidden"
          :aria-expanded="isMenuOpen"
          aria-controls="mobile-menu"
          :aria-label="isMenuOpen ? '메뉴 닫기' : '메뉴 열기'"
          @click="isMenuOpen = !isMenuOpen"
        >
          <BaseIcon
            :name="isMenuOpen ? 'close' : 'menu'"
            class="size-6"
          />
        </button>
      </div>
    </div>

    <div
      v-show="isMenuOpen"
      id="mobile-menu"
      class="border-t border-border bg-white md:hidden"
    >
      <nav
        class="container-page py-4"
        aria-label="모바일 메뉴"
      >
        <ul class="flex flex-col">
          <li
            v-for="item in mainNav"
            :key="item.to"
          >
            <NuxtLink
              :to="item.to"
              class="block rounded-md px-2 py-3 text-base font-medium text-text hover:bg-surface"
              active-class="text-primary!"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
        <BaseButton
          to="/inquiry"
          block
          class="mt-3"
          @click="onInquiryClick('mobile_menu')"
        >
          EaaS 상담 신청
        </BaseButton>
      </nav>
    </div>
  </header>
</template>
