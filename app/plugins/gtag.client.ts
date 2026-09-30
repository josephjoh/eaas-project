/**
 * Google Analytics 4
 * NUXT_PUBLIC_GA_ID가 설정된 경우에만 gtag.js를 로드한다.
 */
export default defineNuxtPlugin((nuxtApp) => {
  const { gaId } = useRuntimeConfig().public
  if (!gaId) return

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    // gtag.js는 배열이 아닌 arguments 객체를 그대로 받아야 동작한다.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  // 클라이언트 라우팅마다 직접 page_view를 보내기 위해 자동 전송은 끈다.
  window.gtag('config', gaId, { send_page_view: false })

  useHead({
    script: [{ src: `https://www.googletagmanager.com/gtag/js?id=${gaId}`, async: true }],
  })

  const router = useRouter()
  let lastPath = ''

  function sendPageView() {
    const path = router.currentRoute.value.fullPath
    if (path === lastPath) return
    lastPath = path
    window.gtag?.('event', 'page_view', {
      page_path: path,
      page_location: window.location.href,
    })
  }

  // 최초 진입(app:suspense:resolve)과 이후 페이지 이동(page:finish) 모두 처리한다.
  // head(title) 갱신 이후에 전송되도록 다음 tick으로 미룬다.
  nuxtApp.hook('app:suspense:resolve', () => {
    setTimeout(sendPageView, 0)
  })
  nuxtApp.hook('page:finish', () => {
    setTimeout(sendPageView, 0)
  })
})
