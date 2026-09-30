export type AnalyticsEvent
  = | 'click_hero_cta'
    | 'click_service'
    | 'click_inquiry'
    | 'click_email'
    | 'click_phone'
    | 'inquiry_start'
    | 'inquiry_complete'

export type AnalyticsParams = Record<string, string | number | boolean | undefined>

/**
 * GA4 커스텀 이벤트 전송. GA가 설정되지 않았거나 서버 렌더링 중이면 아무것도 하지 않는다.
 */
export function useAnalytics() {
  function track(event: AnalyticsEvent, params: AnalyticsParams = {}) {
    if (import.meta.server || typeof window.gtag !== 'function') return
    window.gtag('event', event, params)
  }

  return { track }
}
