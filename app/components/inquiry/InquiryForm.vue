<script setup lang="ts">
/**
 * 상담 신청 Google Form 임베드.
 * NUXT_PUBLIC_INQUIRY_FORM_URL이 없으면 이메일 안내로 대체한다.
 */
const { inquiryFormUrl, contactEmail } = useRuntimeConfig().public
const { track } = useAnalytics()

const embedUrl = computed(() => {
  if (!inquiryFormUrl) return ''
  try {
    const url = new URL(inquiryFormUrl)
    url.searchParams.set('embedded', 'true')
    return url.toString()
  }
  catch {
    return ''
  }
})

const iframeRef = ref<HTMLIFrameElement | null>(null)
let loadCount = 0
let started = false

function markStarted(source: 'embed' | 'new_window') {
  if (started) return
  started = true
  track('inquiry_start', { source })
}

// 첫 load는 폼 표시, 이후 load는 제출 완료 화면으로 간주한다.
// (Google Form을 섹션 없이 한 페이지로 구성해야 정확하다. README 참고)
function onIframeLoad() {
  loadCount += 1
  if (loadCount < 2) return
  track('inquiry_complete')
  iframeRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// iframe 내부 클릭은 감지할 수 없으므로, 포커스가 iframe으로 이동하는 시점을 작성 시작으로 본다.
function onWindowBlur() {
  if (iframeRef.value && document.activeElement === iframeRef.value) markStarted('embed')
}

onMounted(() => window.addEventListener('blur', onWindowBlur))
onBeforeUnmount(() => window.removeEventListener('blur', onWindowBlur))
</script>

<template>
  <div class="overflow-hidden rounded-lg border border-border bg-white shadow-sm">
    <template v-if="embedUrl">
      <div class="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
        <p class="font-semibold">
          EaaS 상담 신청서
        </p>
        <a
          :href="inquiryFormUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-dark"
          @click="markStarted('new_window')"
        >
          새 창에서 작성
          <BaseIcon
            name="external"
            class="size-4"
          />
        </a>
      </div>
      <!-- load 이벤트를 놓치지 않도록 iframe은 hydration 이후 클라이언트에서만 렌더링한다. -->
      <ClientOnly>
        <iframe
          ref="iframeRef"
          :src="embedUrl"
          title="EaaS 상담 신청서 (Google Form)"
          class="block h-[1800px] w-full"
          @load="onIframeLoad"
        >
          불러오는 중…
        </iframe>
        <template #fallback>
          <div class="flex h-[1800px] justify-center pt-24 text-sm text-muted">
            신청서를 불러오는 중입니다…
          </div>
        </template>
      </ClientOnly>
    </template>

    <div
      v-else
      class="px-6 py-14 text-center md:px-10"
    >
      <p class="text-lg font-bold">
        온라인 신청서를 준비하고 있습니다
      </p>
      <p class="mx-auto mt-3 max-w-md leading-relaxed text-muted">
        회사와 개발 환경, 현재 겪고 있는 개발 문제를 이메일로 보내주시면 확인 후 연락드리겠습니다.
      </p>
      <BaseButton
        v-if="contactEmail"
        :to="`mailto:${contactEmail}`"
        class="mt-8"
        @click="track('click_email', { location: 'inquiry_fallback' })"
      >
        <BaseIcon
          name="mail"
          class="size-4"
        />
        {{ contactEmail }}
      </BaseButton>
    </div>
  </div>
</template>
