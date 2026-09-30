<script setup lang="ts">
import { servicePackages } from '~/data/packages'
import { legalNav, mainNav, siteConfig } from '~/data/site'

const { contactEmail, contactPhone } = useRuntimeConfig().public
const { track } = useAnalytics()
const year = new Date().getFullYear()
const phoneHref = computed(() => `tel:${contactPhone.replace(/[^0-9+]/g, '')}`)
</script>

<template>
  <footer class="border-t border-border bg-surface">
    <div class="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:py-16">
      <div>
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2.5"
          :aria-label="`${siteConfig.name} 홈`"
        >
          <img
            src="/images/logo.svg"
            alt=""
            width="28"
            height="28"
            class="size-7"
          >
          <span class="text-base font-bold text-secondary">{{ siteConfig.name }}</span>
        </NuxtLink>
        <p class="mt-4 max-w-sm text-sm leading-relaxed text-muted">
          {{ siteConfig.fullName }}<br>
          기존 시스템의 유지보수부터 신규 기능 개발까지, 고객사의 Engineering Team을 확장합니다.
        </p>
      </div>

      <nav aria-label="서비스">
        <p class="text-sm font-semibold text-text">
          서비스
        </p>
        <ul class="mt-4 space-y-3 text-sm">
          <li
            v-for="pkg in servicePackages"
            :key="pkg.slug"
          >
            <NuxtLink
              :to="`/services/${pkg.slug}`"
              class="text-muted hover:text-primary"
              @click="track('click_service', { service: pkg.slug, location: 'footer' })"
            >
              {{ pkg.name }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <nav aria-label="안내">
        <p class="text-sm font-semibold text-text">
          안내
        </p>
        <ul class="mt-4 space-y-3 text-sm">
          <li
            v-for="item in mainNav"
            :key="item.to"
          >
            <NuxtLink
              :to="item.to"
              class="text-muted hover:text-primary"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/inquiry"
              class="text-muted hover:text-primary"
              @click="track('click_inquiry', { location: 'footer' })"
            >
              상담 신청
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <div>
        <p class="text-sm font-semibold text-text">
          문의
        </p>
        <ul class="mt-4 space-y-3 text-sm">
          <li v-if="contactEmail">
            <a
              :href="`mailto:${contactEmail}`"
              class="inline-flex items-center gap-2 text-muted hover:text-primary"
              @click="track('click_email', { location: 'footer' })"
            >
              <BaseIcon
                name="mail"
                class="size-4"
              />
              {{ contactEmail }}
            </a>
          </li>
          <li v-if="contactPhone">
            <a
              :href="phoneHref"
              class="inline-flex items-center gap-2 text-muted hover:text-primary"
              @click="track('click_phone', { location: 'footer' })"
            >
              <BaseIcon
                name="phone"
                class="size-4"
              />
              {{ contactPhone }}
            </a>
          </li>
          <li>
            <NuxtLink
              to="/inquiry"
              class="inline-flex items-center gap-1 font-semibold text-primary hover:text-primary-dark"
              @click="track('click_inquiry', { location: 'footer_contact' })"
            >
              온라인 상담 신청
              <BaseIcon
                name="arrow-right"
                class="size-4"
              />
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>

    <div class="border-t border-border">
      <div class="container-page flex flex-col gap-3 py-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>© {{ year }} {{ siteConfig.name }}. All rights reserved.</p>
        <ul class="flex gap-5">
          <li
            v-for="(item, index) in legalNav"
            :key="item.to"
          >
            <NuxtLink
              :to="item.to"
              :class="['hover:text-text', index === 0 && 'font-semibold text-text']"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>
